import { Client, IManagedObject, Severity } from "@c8y/client";
import {
  C8YData,
  DeviceCodec,
  DeviceOperation,
  DownlinkData,
} from "lora-codec-interface";
const codec = require("@adeunis/codecs");
require("source-map-support").install();

export class AdeunisCodec extends DeviceCodec {
  private encoder = new codec.Encoder();
  private decoder = new codec.Decoder();

  getId(): string {
    return "adeunis";
  }
  getName(): string {
    return "Adeunis";
  }
  getVersion(): string {
    return "1.0";
  }
  getModels(client: Client): Map<string, string> {
    let models: Map<string, string> = new Map<string, string>();
    for (let model in codec.DecoderProducts) {
      models.set(model, model);
    }
    return models;
  }
  askDeviceConfig(devEui: string): DownlinkData {
    return { devEui: devEui, fport: 1, payload: "01" };
  }
  getAvailableOperations(
    client: Client,
    model: string
  ): Map<string, DeviceOperation> {
    let operations: Map<string, DeviceOperation> = new Map<
      string,
      DeviceOperation
    >();
    operations.set("get config", {
      id: "get config",
      name: "get config",
      elements: [],
    });
    return operations;
  }
  protected _decode(
    client: Client,
    mo: Partial<IManagedObject>,
    model: string,
    fport: number,
    time: Date,
    payload: string
  ): C8YData {
    let c8yData: C8YData = new C8YData();
    this.decoder.setDeviceType(model);
    let result = this.decoder.decode(payload);
    console.log(result);

    this.handleStatusByte(result.status, mo, time, c8yData);

    if (result.temperatures) {
      result.temperatures.forEach((t) => {
        c8yData.addMeasurement(
          mo,
          "Temperatures",
          t.name,
          t.unit,
          t.value,
          time
        );
      });
    }
    if (result.temperature) {
      c8yData.addMeasurement(
        mo,
        "c8y_TemperatureMeasurement",
        "T",
        result.temperature.unit,
        result.temperature.values[0],
        time
      );
    }
    if (result.humidity) {
      c8yData.addMeasurement(
        mo,
        "Humidity",
        "H",
        result.humidity.unit,
        result.humidity.values[0],
        time
      );
    }
    if (
      (result.type?.includes("0x5a") || result.type?.includes("0x5b")) &&
      result.counterValues
    ) {
      if (!mo.samplingPeriod) {
        console.error("Device must first retrieve its configuration.");
      }
      let samplingPeriod = mo.samplingPeriod.value;
      if (mo.samplingPeriod.unit === "m") {
        samplingPeriod = samplingPeriod * 60;
      }
      console.log("Sampling period: " + samplingPeriod);
      let channel = "Channel A";
      if (result.type?.includes("0x5b")) {
        channel = "Channel B";
      }
      result.counterValues.forEach((c, i) => {
        let datetime = new Date(time.getTime() - samplingPeriod * i * 1000);
        console.log("Time: " + datetime);
        c8yData.addMeasurement(
          mo,
          "Pulse",
          channel,
          "",
          c,
          new Date(time.getTime() - samplingPeriod * i * 1000)
        );
      });
    }
    if (result.type?.includes("configuration")) {
      mo["c8y_Configuration"] = { config: JSON.stringify(result) };
      if (result.samplingPeriod) {
        mo.samplingPeriod = result.samplingPeriod;
      }
      if (result.calculatedSendingPeriod) {
        let requiredAvailability: number = result.calculatedSendingPeriod.value;
        if (result.calculatedSendingPeriod.unit === "s") {
          requiredAvailability = requiredAvailability / 60.0;
        }
        mo["c8y_RequiredAvailability"] = {
          responseInterval: requiredAvailability,
        };
      }
      if (result.transmissionPeriod) {
        let requiredAvailability: number = result.transmissionPeriod.value;
        if (result.transmissionPeriod.unit === "s") {
          requiredAvailability = requiredAvailability / 60.0;
        }
        mo["c8y_RequiredAvailability"] = {
          responseInterval: requiredAvailability,
        };
      }
      c8yData.morToUpdate = mo;
    }
    // Analog
    if (result.type?.includes("0x42") && result.channels) {
      result.channels.forEach((channel) => {
        c8yData.addMeasurement(
          mo,
          channel.name,
          channel.name,
          channel.unit,
          channel.value,
          time
        );
      });
    }
    // Pulse historic data
    if (result.type?.includes("0x48") && result.channels) {
      result.channels.forEach((channel) => {
        channel.deltaValues.forEach((value, i) => {
          c8yData.addMeasurement(
            mo,
            channel.name,
            channel.name,
            "count",
            channel.index + value,
            new Date(time.getTime() + result.baseTime * i * 60000)
          );
        });
      });
    }
    // Pulse data
    if (result.type?.includes("0x46") && result.counterValues) {
      result.counterValues.forEach((value, i) => {
        c8yData.addMeasurement(
          mo,
          "Channel " + String.fromCharCode(65 + i),
          "Channel " + String.fromCharCode(65 + i),
          "count",
          value,
          time
        );
      });
    }
    return c8yData;
  }
  protected _encode(
    client: Client,
    mo: Partial<IManagedObject>,
    model: string,
    operation: string
  ): DownlinkData {
    return operation.includes("get config") ? this.askDeviceConfig(null) : null;
  }

  private handleStatusByte(
    status,
    mo: Partial<IManagedObject>,
    time: Date,
    c8yData: C8YData
  ) {
    if (status.hardwareError) {
      c8yData.addAlarm(
        mo,
        "HardwareErrorAlarm",
        "Hardware error",
        Severity.CRITICAL,
        time
      );
    } else {
      c8yData.clearAlarm("HardwareErrorAlarm");
    }

    if (status.lowBattery) {
      c8yData.addAlarm(
        mo,
        "LowBatteryAlarm",
        "Battery is low",
        Severity.MAJOR,
        time
      );
    } else {
      c8yData.clearAlarm("LowBatteryAlarm");
    }

    if (status.configurationDone) {
      c8yData.addEvent(
        mo,
        "ConfigurationDone",
        "Configuration is done",
        null,
        time
      );
    }

    if (status.configurationInconsistency) {
      c8yData.addAlarm(
        mo,
        "InconsistentConfigurationAlarm",
        "Configuration is inconsistent",
        Severity.MAJOR,
        time
      );
    } else {
      c8yData.clearAlarm("InconsistentConfigurationAlarm");
    }
  }
}
