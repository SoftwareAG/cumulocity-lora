import { DeviceCodec, CodecApp, C8YData, DownlinkData, MicroserviceSubscriptionService, DeviceOperation } from 'c8y-codec-interface';
import { Client, IManagedObject } from '@c8y/client';
const codec = require('@adeunis/codecs');
require('source-map-support').install();

class AdeunisCodec extends DeviceCodec {

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
    getModels(client: Client): string[] {
        let models: string[] = [];
        for (var model in codec.DecoderProducts) {
            models.push(model);
        }
        return models;
    }
    askDeviceConfig(devEui: string): DownlinkData {
        return {devEui: devEui, fport: 1, payload: "01"};
    }
    getAvailableOperations(client: Client, model: string): Map<string, DeviceOperation> {
        let operations: Map<string, DeviceOperation> = new Map<string, DeviceOperation>();
        operations.set("get config", {id: "get config", name: "get config", params: null});
        return operations;
    }
    protected _decode(client: Client, mo: IManagedObject, model: string, fport: number, time: Date, payload: string): C8YData {
        let c8yData: C8YData = new C8YData();
        this.decoder.setDeviceType(model);
        let result = this.decoder.decode(payload);
        console.log(result);
        if (result.temperatures) {
            result.temperatures.forEach(t => {
                c8yData.addMeasurement(mo, "Temperatures", t.name, t.unit, t.value, time);
            })
        }
        if (result.temperature) {
            c8yData.addMeasurement(mo, "c8y_TemperatureMeasurement", "T", result.temperature.unit, result.temperature.values[0], time);
        }
        if (result.humidity) {
            c8yData.addMeasurement(mo, "Humidity", "H", result.humidity.unit, result.humidity.values[0], time);
        }
        if (result.counterValues) {
            c8yData.addMeasurements(mo, "Pulse", ["Channel A", "Channel B"], ["", ""], [result.counterValues[0], result.counterValues[1]], time);
        }
        if (result.type && result.type.includes("configuration")) {
            mo["c8y_Configuration"] = JSON.stringify(result);
            if (result.calculatedSendingPeriod) {
                let requiredAvailability: number = result.calculatedSendingPeriod.value;
                if (result.calculatedSendingPeriod.unit === 's') {
                    requiredAvailability = requiredAvailability / 60.0;
                }
                mo["c8y_RequiredAvailability"] = requiredAvailability;
            }
            if (result.transmissionPeriod) {
                let requiredAvailability: number = result.transmissionPeriod.value;
                if (result.transmissionPeriod.unit === 's') {
                    requiredAvailability = requiredAvailability / 60.0;
                }
                mo["c8y_RequiredAvailability"] = requiredAvailability;
            }
            c8yData.morToUpdate = mo;
        }
        return c8yData;
    }
    protected _encode(client: Client, mo: IManagedObject, model: string, operation: string): DownlinkData {
        return operation.includes("get config") ? this.askDeviceConfig(null) : null;
    }
}

let microserviceSubscriptionService: MicroserviceSubscriptionService = new MicroserviceSubscriptionService();

new CodecApp(new AdeunisCodec(microserviceSubscriptionService), microserviceSubscriptionService);