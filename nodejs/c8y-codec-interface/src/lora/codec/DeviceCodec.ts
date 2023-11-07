import {
  IManagedObject,
  Client,
  IExternalIdentity,
  IAlarm,
  IResultList,
  AlarmStatus,
} from "@c8y/client";
import { C8YData } from "./uplink/C8YData";
import { DownlinkData } from "./downlink/DownLinkData";
import { Component } from "../common/Component";
import { MicroserviceSubscriptionService } from "../common/MicroserviceSubscriptionService";
import { Decode } from "./uplink/Decode";
import { Encode } from "./downlink/Encode";
import { DeviceOperation } from "./downlink/DeviceOperation";
import { Result } from "./Result";
import { Logger } from "../common/Logger";

export abstract class DeviceCodec implements Component {
  abstract getId(): string;
  abstract getName(): string;
  abstract getVersion(): string;
  static DEVEUI_TYPE: string = "LoRa devEUI";
  static CODEC_TYPE: string = "Device Codec";
  static CODEC_ID: string = "Codec ID";

  protected abstract _decode(
    client: Client,
    mo: Partial<IManagedObject>,
    model: string,
    fport: number,
    time: Date,
    payload: string
  ): C8YData;
  protected abstract _encode(
    client: Client,
    mo: Partial<IManagedObject>,
    model: string,
    operation: string
  ): DownlinkData;
  abstract getModels(client: Client): Map<string, string>;
  abstract askDeviceConfig(devEui: string): DownlinkData;
  abstract getAvailableOperations(
    client: Client,
    model: string
  ): Map<string, DeviceOperation>;

  protected logger = Logger.getLogger("DeviceCodec");

  async decode(client: Client, decode: Decode): Promise<Result<string>> {
    let result: Result<string> = { success: true, message: "", response: null };
    try {
      this.logger.info(
        `Processing payload ${decode.payload} from port ${decode.fPort} for device ${decode.deveui} with time ${decode.updateTime}`
      );
      let datetime: Date;
      if (!decode.updateTime) {
        this.logger.info(
          "No timestamp received, server timestamp will be used instead."
        );
        datetime = new Date();
      } else {
        if (typeof decode.updateTime == "number") {
          datetime = new Date(decode.updateTime);
        } else {
          this.logger.error(
            "Bad type for time fields: " + typeof decode.updateTime
          );
          if (typeof decode.updateTime == "string") {
            this.logger.info("Will try to parse time field to a number.");
            datetime = new Date(parseInt(decode.updateTime));
          }
        }
      }
      if (!decode.payload) {
        this.logger.error("Payload is empty!");
        result.success = false;
        result.message += "Payload is empty!<br>";
      }
      var isHexa = decode.payload.match(/^[0-9a-fA-F]+$/);
      if (!isHexa || isHexa.length == 0) {
        this.logger.error("Payload is not in hexadecimal format!");
        result.success = false;
        result.message += "Payload is not in hexadecimal format!<br>";
      }
      let device: IManagedObject = await this.getDevice(
        client,
        decode.deveui.toLowerCase()
      );
      if (result.success) {
        if (!device) {
          this.logger.error(`There is no device with DevEUI ${decode.deveui}`);
          result.success = false;
          result.message += `There is no device with DevEUI ${decode.deveui}`;
        } else {
          let c8yData: C8YData = this._decode(
            client,
            device,
            decode.model,
            decode.fPort,
            datetime,
            decode.payload
          );
          if (device.debug) {
            client.event.create({
              source: device,
              type: "LoRaDecodedPayload",
              text: "LoRa decoded payload",
              DecodedPayload: c8yData,
              time: new Date().toISOString(),
            });
          }
          this.logger.info(c8yData);
          this.processData(client, device, c8yData);
          result.message = `Successfully processed payload ${decode.payload} from port ${decode.fPort} for device ${decode.deveui}`;
          result.response = "OK";
        }
      }
    } catch (e) {
      result.success = false;
      result.message += e.message;
    }
    return result;
  }

  async encode(client: Client, encode: Encode): Promise<Result<DownlinkData>> {
    let result: Result<DownlinkData>;
    try {
      let data: DownlinkData = null;
      let mor: IManagedObject = await this.getDevice(
        client,
        encode.devEui.toLowerCase()
      );

      this.logger.info(
        `Processing operation ${encode.operation} for device ${encode.devEui}`
      );

      if (encode.operation.startsWith("raw ")) {
        let tokens: string[] = encode.operation.split(" ");
        data = {
          devEui: encode.devEui,
          fport: parseInt(tokens[1]),
          payload: tokens[2],
        };
      } else if (encode.operation.includes("get config")) {
        data = this.askDeviceConfig(encode.devEui);
      } else {
        data = this._encode(client, mor, encode.model, encode.operation);
        if (data) {
          data.devEui = encode.devEui;
        }
      }
      this.logger.info(
        `Will send to LNS ${data.payload} on port ${data.fport}`
      );
      result = {
        success: true,
        message: `Successfully processed ${encode.operation} for device ${encode.devEui}`,
        response: data,
      };
    } catch (e) {
      result = { success: false, message: e.message, response: null };
    }

    this.logger.info(result);

    return result;
  }

  constructor(subscriptionService: MicroserviceSubscriptionService) {
    subscriptionService?.on(
      "newMicroserviceSubscription",
      async (client: Client) => {
        try {
          let tenant: string = (await client.tenant.current()).data.name;
          this.logger.info(`New tenant subscription detected: ${tenant}`);
          let id: IExternalIdentity = await this.findExternalId(
            client,
            this.getId(),
            DeviceCodec.CODEC_ID
          );
          let mor: Partial<IManagedObject> = null;
          if (!id) {
            mor = {
              type: DeviceCodec.CODEC_TYPE,
              name: this.getName(),
              lora_codec_DeviceCodecRepresentation: {
                id: this.getId(),
                name: this.getName(),
                version: this.getVersion(),
              },
            };

            mor = (await client.inventory.create(mor)).data;

            id = {
              externalId: this.getId(),
              type: DeviceCodec.CODEC_ID,
              managedObject: {
                id: mor.id,
              },
            };
            this.logger.info(
              `Codec ${this.getName()} will be registered in tenant ${tenant}.`
            );
            await client.identity.create(id);
          } else {
            mor = {
              id: id.managedObject.id.toString(),
              lora_codec_DeviceCodecRepresentation: {
                id: this.getId(),
                name: this.getName(),
                version: this.getVersion(),
              },
            };
            this.logger.info(
              `Codec ${this.getName()} already registered in tenant ${tenant}.`
            );
            await client.inventory.update(mor);
          }
        } catch (e) {
          this.logger.error(e);
        }
      }
    );
  }

  protected processData(
    client: Client,
    device: IManagedObject,
    c8yData: C8YData
  ) {
    c8yData.measurements.forEach((m) => {
      client.measurement.create(m);
    });
    c8yData.events.forEach((e) => {
      client.event.create(e);
    });
    c8yData.alarms.forEach((a) => {
      client.alarm.create(a);
    });
    c8yData.alarmsToClear.forEach((a) => {
      this.clearAlarm(client, device, a);
    });
    if (c8yData.morToUpdate) {
      client.inventory.update(c8yData.morToUpdate);
    }
  }

  protected async findExternalId(
    client: Client,
    externalId: string,
    type: string
  ): Promise<IExternalIdentity> {
    try {
      return (
        await client.identity.detail({ type: type, externalId: externalId })
      ).data;
    } catch (e) {
      this.logger.error(e);
      return null;
    }
  }

  protected async getDevice(
    client: Client,
    devEui: string
  ): Promise<IManagedObject> {
    try {
      return (
        await client.inventory.detail(
          (
            await this.findExternalId(client, devEui, DeviceCodec.DEVEUI_TYPE)
          ).managedObject.id
        )
      ).data;
    } catch (e) {
      this.logger.error(e);
      return null;
    }
  }

  protected async clearAlarm(
    client: Client,
    device: IManagedObject,
    alarmType: string
  ) {
    this.logger.info(
      "Will clear alarms of type " + alarmType + " on device " + device.name
    );
    let alarms: IResultList<IAlarm> = await client.alarm.list({
      source: device.id,
      type: alarmType,
      status: AlarmStatus.ACTIVE,
    });
    if (alarms && alarms.data && alarms.data.length > 0) {
      alarms.data.forEach(async (alarm) => {
        this.logger.info("Found alarm:");
        this.logger.info(alarm);
        await client.alarm.update({
          id: alarm.id,
          status: AlarmStatus.CLEARED,
        });
      });
    } else {
      this.logger.info(
        "No alarms to update with type " +
          alarmType +
          " on device " +
          device.name
      );
    }
  }
}
