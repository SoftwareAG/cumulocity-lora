import {
  DeviceCodec,
  CodecApp,
  C8YData,
  DownlinkData,
  MicroserviceSubscriptionService,
  DeviceOperation,
  DeviceOperationElement,
} from "lora-codec-interface";
import { Client, IManagedObject, Severity } from "@c8y/client";

class AtimAcwCodec extends DeviceCodec {
  getId(): string {
    return "atim-acw";
  }
  getName(): string {
    return "ATIM ACW";
  }
  getVersion(): string {
    return "1.0";
  }
  getModels(client: Client): Map<string, string> {
    let models: Map<string, string> = new Map<string, string>([
      ["default", "default"],
    ]);
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
      elements: new Array<DeviceOperationElement>(),
    });
    return operations;
  }
  protected _decode(
    client: Client,
    device: IManagedObject,
    model: string,
    fport: number,
    time: Date,
    payload: string
  ): C8YData {
    let c8yData: C8YData = new C8YData();
    let result: { historics: any[]; events: any[]; realTimes: any[] } = {
      historics: [],
      events: [],
      realTimes: [],
    };

    // Get message ID
    var header = parseInt(payload.substring(0, 2), 16);

    if (((header << 2) & 255) >> 7 == 1) {
      result = this.DecodeMesureFrame(payload, time, c8yData, device);
    } else {
      result = this.DecodeCommonFrame(payload, time, c8yData, device);
    }

    if (header == 129) {
      result.realTimes.push({
        tagRef: "p_batteryVoltage_empty",
        timestamp: time,
        tagValue: String(parseInt(payload.substr(2, 4), 16) / 1000),
      });
      result.realTimes.push({
        tagRef: "p_batteryVoltage_inCharge",
        timestamp: time,
        tagValue: String(parseInt(payload.substr(6, 4), 16) / 1000),
      });
    }

    c8yData.addEvent(device, "raw event", "raw event", result, time);

    return c8yData;
  }
  protected _encode(
    client: Client,
    mo: IManagedObject,
    model: string,
    operation: string
  ): DownlinkData {
    return operation.includes("get config")
      ? this.askDeviceConfig("")
      : new DownlinkData();
  }

  private DecodeCommonFrame(
    payload,
    time,
    c8yData: C8YData,
    device: IManagedObject
  ) {
    // Init result
    let result: {
      historics: any[];
      events: any[];
      realTimes: any[];
    } = {
      historics: [],
      events: [],
      realTimes: [],
    };

    // get bit values
    let horodatage = ((parseInt(payload.substring(0, 2), 16) << 1) & 255) >> 7;

    // calcul of the starting index
    let startingIndex = 2 + horodatage * 8;

    // get frame type
    let frameType = ((parseInt(payload.substring(0, 2), 16) << 4) & 255) >> 4;

    // keep alive frame
    if (frameType == 1) {
      result.realTimes.push({
        tagRef: "p_keepAlive",
        timestamp: time,
        tagValue: String(1),
      });
    }

    // threshold alarm
    if (frameType == 13 || frameType == 5) {
      while (startingIndex < payload.length) {
        // get header informations of each voie
        let header_voie = parseInt(
          payload.substring(startingIndex, startingIndex + 2),
          16
        );
        let alertType_voie = header_voie >> 6;
        let number_voie = ((header_voie << 2) & 255) >> 6;
        let mesureType_voie = ((header_voie << 4) & 255) >> 4;
        let mesureSize_voie = this.getMesureSize(mesureType_voie);

        // increase starting index
        startingIndex += 2;

        // check if the size is different than 0
        if (mesureSize_voie != 0) {
          // get mesure
          let mesure = parseInt(
            payload.substring(startingIndex, startingIndex + mesureSize_voie),
            16
          );

          // get calculated table of log
          let calculatedMesureTab = this.getCalculatedMesure(
            mesure,
            mesureType_voie,
            number_voie,
            horodatage
              ? new Date(parseInt(payload.substring(2, 10), 16) * 1000)
              : time,
            c8yData,
            device
          );

          // add table log into realtimes
          result.realTimes = result.realTimes.concat(calculatedMesureTab);

          // get calculated table of events
          let eventTab = this.getThresholdEvents(
            mesureType_voie,
            alertType_voie,
            number_voie,
            horodatage
              ? new Date(parseInt(payload.substring(2, 10), 16) * 1000)
              : time
          );

          // add table event into events
          result.events = result.events.concat(eventTab);

          // increase index
          startingIndex += mesureSize_voie;
        } else {
          return result;
        }
      }
    }

    // general alarm
    if (frameType == 14) {
      // get header informations of each voie
      let header_error = parseInt(
        payload.substring(startingIndex, startingIndex + 2),
        16
      );
      let length_error = ((header_error << 3) & 255) >> 3;

      // increase starting index
      startingIndex += 2;

      for (let e = 0; e < length_error; e++) {
        // get error and add log into realtimes table
        result.realTimes.push(
          this.getError(
            parseInt(payload.substring(startingIndex, startingIndex + 2), 16),
            new Date()
          )
        );

        // increase starting index
        startingIndex += 2;
      }
    }

    if (frameType == 15) {
      if (
        parseInt(payload.substring(startingIndex, startingIndex + 2), 16) == 28
      ) {
        // add wirecut into realtimes table
        result.realTimes.push({
          tagRef: "p_wirecut",
          timestamp: time,
          tagValue: String(
            parseInt(
              payload.substring(startingIndex + 2, startingIndex + 4),
              16
            ) == 1
              ? 0
              : 1
          ),
        });
      }
    }
    return result;
  }

  private DecodeMesureFrame(
    payload,
    time,
    c8yData: C8YData,
    device: IManagedObject
  ) {
    // Init result
    let result: {
      historics: any[];
      events: any[];
      realTimes: any[];
    } = {
      historics: [],
      events: [],
      realTimes: [],
    };

    // get bit values
    let horodatage = ((parseInt(payload.substring(0, 2), 16) << 1) & 255) >> 7;
    let profondeur =
      (((parseInt(payload.substring(0, 2), 16) << 3) & 255) >> 6) + 1;
    let nb_echantillons =
      (((parseInt(payload.substring(0, 2), 16) << 5) & 255) >> 5) + 1;
    let period =
      profondeur > 1 || nb_echantillons > 1
        ? parseInt(
            payload.substring(2 + horodatage * 8, 6 + horodatage * 8),
            16
          )
        : 0;

    // calcul of the starting index
    let startingIndex =
      2 + horodatage * 8 + (profondeur > 1 || nb_echantillons > 1 ? 1 : 0) * 4;

    while (startingIndex < payload.length) {
      // get header informations of each voie
      let header_voie = parseInt(
        payload.substring(startingIndex, startingIndex + 2),
        16
      );
      let number_voie = ((header_voie << 2) & 255) >> 6;
      let mesureType_voie = ((header_voie << 4) & 255) >> 4;
      let mesureSize_voie = this.getMesureSize(mesureType_voie);

      // increase starting index
      startingIndex += 2;

      // check if the size is different than 0
      if (mesureSize_voie != 0) {
        // iterate on each mesure
        for (let i = 0; i < profondeur * nb_echantillons; i++) {
          // get mesure
          let mesure = parseInt(
            payload.substring(startingIndex, startingIndex + mesureSize_voie),
            16
          );

          if (i == 0) {
            // get calculated table of log
            let calculatedMesureTab = this.getCalculatedMesure(
              mesure,
              mesureType_voie,
              number_voie,
              horodatage
                ? new Date(parseInt(payload.substring(2, 10), 16) * 1000)
                : time,
              c8yData,
              device
            );

            // add table log into realtimes
            result.realTimes = result.realTimes.concat(calculatedMesureTab);
          } else {
            // get calculated table of log
            let calculatedMesureTab = this.getCalculatedMesure(
              mesure,
              mesureType_voie,
              number_voie,
              horodatage
                ? new Date(
                    (parseInt(payload.substring(2, 10), 16) -
                      (period / nb_echantillons) * 60 * i) *
                      1000
                  )
                : new Date((time - (period / nb_echantillons) * 60 * i) * 1000),
              c8yData,
              device
            );

            // add table log into historics
            result.historics = result.historics.concat(calculatedMesureTab);
          }

          // increase index
          startingIndex += mesureSize_voie;
        }
      } else {
        return result;
      }
    }

    return result;
  }

  private getMesureSize(mesureType) {
    switch (mesureType) {
      case 1:
        return 2;
        break;
      case 2:
      case 3:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
        return 4;
        break;
      case 4:
        return 8;
        break;
      default:
        return 0;
    }
  }

  private getCalculatedMesure(
    mesure,
    mesureType,
    number_voie,
    date: Date,
    c8yData: C8YData,
    device: IManagedObject
  ) {
    switch (mesureType) {
      case 1:
      case 2:
        var tab: any[] = [];
        var mesureString = ("0000000" + mesure.toString(2)).slice(-8);
        for (let i = 1; i < mesureString.length + 1; i++) {
          tab.push({
            tagRef: "p_DI" + i + "_" + number_voie,
            timestamp: date,
            tagValue: String(mesureString[mesureString.length - i]),
          });
        }
        return tab;
        break;
      case 3:
      case 4:
        return [
          {
            tagRef: "p_count" + "_" + number_voie,
            timestamp: date,
            tagValue: String(mesure),
          },
        ];
        break;
      case 7:
        if (mesure >> 15 == 1) {
          return [
            {
              tagRef: "p_mm" + "_" + number_voie,
              timestamp: date,
              tagValue: String(((mesure ^ 65535) + 1) * -1),
            },
          ];
        } else {
          return [
            {
              tagRef: "p_mm" + "_" + number_voie,
              timestamp: date,
              tagValue: String(mesure),
            },
          ];
        }
        break;
      case 10:
        if (mesure >> 15 == 1) {
          return [
            {
              tagRef: "p_mV" + "_" + number_voie,
              timestamp: date,
              tagValue: String(((mesure ^ 65535) + 1) * -1),
            },
          ];
        } else {
          return [
            {
              tagRef: "p_mV" + "_" + number_voie,
              timestamp: date,
              tagValue: String(mesure),
            },
          ];
        }
        break;
      case 11:
        if (mesure >> 15 == 1) {
          return [
            {
              tagRef: "p_uA" + "_" + number_voie,
              timestamp: date,
              tagValue: String(((mesure ^ 65535) + 1) * -1),
            },
          ];
        } else {
          return [
            {
              tagRef: "p_uA" + "_" + number_voie,
              timestamp: date,
              tagValue: String(mesure),
            },
          ];
        }
        break;
      case 8:
        if (mesure >> 15 == 1) {
          c8yData.addMeasurement(
            device,
            "Temperature",
            "T" + number_voie,
            "°C",
            (((mesure ^ 65535) + 1) / 100) * -1,
            date
          );
          return [
            {
              tagRef: "p_temperature" + "_" + number_voie,
              timestamp: date,
              tagValue: String((((mesure ^ 65535) + 1) / 100) * -1),
            },
          ];
        } else {
          c8yData.addMeasurement(
            device,
            "Temperature",
            "T" + number_voie,
            "°C",
            mesure / 100,
            date
          );
          return [
            {
              tagRef: "p_temperature" + "_" + number_voie,
              timestamp: date,
              tagValue: String(mesure / 100),
            },
          ];
        }
        break;
      case 9:
        if (mesure >> 15 == 1) {
          c8yData.addMeasurement(
            device,
            "Humidity",
            "H" + number_voie,
            "%RH",
            (((mesure ^ 65535) + 1) / 100) * -1,
            date
          );
          return [
            {
              tagRef: "p_humidity" + "_" + number_voie,
              timestamp: date,
              tagValue: String((((mesure ^ 65535) + 1) / 100) * -1),
            },
          ];
        } else {
          c8yData.addMeasurement(
            device,
            "Humidity",
            "H" + number_voie,
            "%RH",
            mesure / 100,
            date
          );
          return [
            {
              tagRef: "p_humidity" + "_" + number_voie,
              timestamp: date,
              tagValue: String(mesure / 100),
            },
          ];
        }
        break;
      case 12:
        c8yData.addMeasurement(
          device,
          "COV",
          "COV" + number_voie,
          "",
          mesure,
          date
        );
        return [
          {
            tagRef: "p_COV_" + number_voie,
            timestamp: date,
            tagValue: String(mesure),
          },
        ];
        break;
      case 13:
        c8yData.addMeasurement(
          device,
          "CO2",
          "CO2" + number_voie,
          "ppm",
          mesure,
          date
        );
        return [
          {
            tagRef: "p_CO2_" + number_voie,
            timestamp: date,
            tagValue: String(mesure),
          },
        ];
        break;
      default:
        return [];
    }
  }

  private getThresholdEvents(mesureType, alertType, number_voie, date) {
    switch (mesureType) {
      case 3:
      case 4:
        return [
          {
            tagRef: "p_count" + "_" + number_voie + "_high_alm",
            timestamp: date,
            tagValue: String(alertType == 0 ? 0 : alertType == 1 ? 1 : 0),
            context: [],
          },
          {
            tagRef: "p_count" + "_" + number_voie + "_low_alm",
            timestamp: date,
            tagValue: String(alertType == 0 ? 0 : alertType == 2 ? 1 : 0),
            context: [],
          },
        ];
        break;
      case 7:
        return [
          {
            tagRef: "p_mm" + "_" + number_voie + "_high_alm",
            timestamp: date,
            tagValue: String(alertType == 0 ? 0 : alertType == 1 ? 1 : 0),
            context: [],
          },
          {
            tagRef: "p_mm" + "_" + number_voie + "_low_alm",
            timestamp: date,
            tagValue: String(alertType == 0 ? 0 : alertType == 2 ? 1 : 0),
            context: [],
          },
        ];
        break;
      case 10:
        return [
          {
            tagRef: "p_mV" + "_" + number_voie + "_high_alm",
            timestamp: date,
            tagValue: String(alertType == 0 ? 0 : alertType == 1 ? 1 : 0),
            context: [],
          },
          {
            tagRef: "p_mV" + "_" + number_voie + "_low_alm",
            timestamp: date,
            tagValue: String(alertType == 0 ? 0 : alertType == 2 ? 1 : 0),
            context: [],
          },
        ];
        break;
      case 11:
        return [
          {
            tagRef: "p_uA" + "_" + number_voie + "_high_alm",
            timestamp: date,
            tagValue: String(alertType == 0 ? 0 : alertType == 1 ? 1 : 0),
            context: [],
          },
          {
            tagRef: "p_uA" + "_" + number_voie + "_low_alm",
            timestamp: date,
            tagValue: String(alertType == 0 ? 0 : alertType == 2 ? 1 : 0),
            context: [],
          },
        ];
        break;
      case 8:
        return [
          {
            tagRef: "p_temperature" + "_" + number_voie + "_high_alm",
            timestamp: date,
            tagValue: String(alertType == 0 ? 0 : alertType == 1 ? 1 : 0),
            context: [],
          },
          {
            tagRef: "p_temperature" + "_" + number_voie + "_low_alm",
            timestamp: date,
            tagValue: String(alertType == 0 ? 0 : alertType == 2 ? 1 : 0),
            context: [],
          },
        ];
        break;
      case 9:
        return [
          {
            tagRef: "p_humidity" + "_" + number_voie + "_high_alm",
            timestamp: date,
            tagValue: String(alertType == 0 ? 0 : alertType == 1 ? 1 : 0),
            context: [],
          },
          {
            tagRef: "p_humidity" + "_" + number_voie + "_low_alm",
            timestamp: date,
            tagValue: String(alertType == 0 ? 0 : alertType == 2 ? 1 : 0),
            context: [],
          },
        ];
        break;
      default:
        return [];
    }
  }

  private getError(error_code, date) {
    let ref;
    switch (error_code) {
      case 0:
        ref = "p_ERR_BUF_SMALLER";
        break;
      case 1:
        ref = "p_ERR_DEPTH_HISTORIC_OUT_OF_RANGE";
        break;
      case 2:
        ref = "p_ERR_NB_SAMPLE_OUT_OF_RANGE";
        break;
      case 3:
        ref = "p_ERR_NWAY_OUT_OF_RANGE";
        break;
      case 4:
        ref = "p_ERR_TYPEWAY_OUT_OF_RANGE";
        break;
      case 5:
        ref = "p_ERR_SAMPLING_PERIOD";
        break;
      case 6:
        ref = "p_ERR_KEEP_ALIVE_PERIOD";
        break;
      case 7:
        ref = "p_ERR_SUBTASK_END";
        break;
      case 8:
        ref = "p_ERR_NULL_POINTER";
        break;
      case 9:
        ref = "p_ERR_BATTERY_LEVEL_LOW";
        break;
      case 10:
        ref = "p_ERR_BATTERY_LEVEL_DEAD";
        break;
      case 11:
        ref = "p_ERR_EEPROM";
        break;
      case 12:
        ref = "p_ERR_ROM";
        break;
      case 13:
        ref = "p_ERR_RAM";
        break;
      case 14:
        ref = "p_ERR_SENSORS_TIMEOUT";
        break;
      case 15:
        ref = "p_ERR_SENSOR_STOP";
        break;
      case 16:
        ref = "p_ERR_SENSORS_FAIL";
        break;
      case 17:
        ref = "p_ERR_ARM_INIT_FAIL";
        break;
      case 18:
        ref = "p_ERR_ARM_PAYLOAD_BIGGER";
        break;
      case 19:
        ref = "p_ERR_ARM_BUSY";
        break;
      case 20:
        ref = "p_ERR_ARM_BRIDGE_ENABLE";
        break;
      case 21:
        ref = "p_ERR_ARM_TRANSMISSION";
        break;
      case 22:
        ref = "p_ERR_RADIO_QUEUE_FULL";
        break;
      case 23:
        ref = "p_ERR_CFG_BOX_INIT_FAIL";
        break;
      case 24:
        ref = "p_ERR_BOX_OPENED";
        break;
      default:
        return undefined;
    }

    return {
      tagRef: ref,
      timestamp: date,
      tagValue: String(1),
    };
  }
}

let microserviceSubscriptionService: MicroserviceSubscriptionService =
  new MicroserviceSubscriptionService();

new CodecApp(
  new AtimAcwCodec(microserviceSubscriptionService),
  microserviceSubscriptionService
);
