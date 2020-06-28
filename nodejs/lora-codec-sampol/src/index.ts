import { DeviceCodec, CodecApp, C8YData, DownlinkData, MicroserviceSubscriptionService, DeviceOperation } from 'c8y-codec-interface';
import { IManagedObject, FetchClient, BasicAuth } from '@c8y/client';

class SampolCodec extends DeviceCodec {

    getId(): string {
        return "sampol";
    }
    getName(): string {
        return "Sampol";
    }
    getVersion(): string {
        return "1.0";
    }
    getModels(): string[] {
        let models: string[] = [];
        return models;
    }
    askDeviceConfig(devEui: string): DownlinkData {
        return null;
    }
    getAvailableOperations(model: string): Map<string, DeviceOperation> {
        let operations: Map<string, DeviceOperation> = new Map<string, DeviceOperation>();
        return operations;
    }

    signed(x, n) {
        return x >= 1 << (n - 1) ? x - (1 << n) : x
    }

    decoder(payload: Buffer) {
        let type = '';
        let decodedPayload: {
            type: string,
            idx: number,
            T: Date,
            D: number,
            Leq: number,
            Lmin: number,
            Lmax: number,
            L10: number,
            L50: number,
            L90: number,
            L95: number,
            nMeas: number,
            Temp: number,
            Vbat?: number,
            rndDel?: number
        };

        let offset = 0;
        let msgType = payload[offset++] >> 6;

        if (payload.length == 5) {
            type = 'boot'
        } else if (payload.length == 6) {
            type = 'config'
        } else if (payload.length == 18) {
            type = 'values';
            // offset = 4;

            decodedPayload = {
                type: type,
                idx: payload[offset++] | payload[offset++] << 8 | payload[offset++] << 16,
                T: new Date(1000 * (payload[offset++] << 24 | payload[offset++] << 16 | payload[offset++] << 8 | payload[offset++])),
                D: payload[offset++],
                Leq: (payload[offset++] | (payload[offset++] << 8)) / 10,
                Lmin: (payload[offset++] | (payload[offset++] << 8)) / 10,
                Lmax: (payload[offset++] | (payload[offset++] << 8)) / 10,
                L10: payload[offset++] / 2,
                L50: payload[offset++] / 2,
                L90: payload[offset++] / 2,
                L95: payload[offset++] / 2,
                nMeas: payload[offset++] | (payload[offset++] << 8),
                Temp: (32 + this.signed(payload[offset++], 8) / 2) * 1.25
            }
        } else if (payload.length >= 19) {

            decodedPayload = {
                type: 'values',
                idx: payload[offset++] | payload[offset++] << 8 | payload[offset++ << 16],
                T: new Date(1000 * (payload[offset++] << 24 | payload[offset++] << 16 | payload[offset++] << 8 | payload[offset++])),
                D: payload[offset++],
                Leq: (payload[offset++] | (payload[offset++] << 8)) / 10,
                Lmin: (payload[offset++] | (payload[offset++] << 8)) / 10,
                Lmax: (payload[offset++] | (payload[offset++] << 8)) / 10,
                L10: payload[offset++] / 2,
                L50: payload[offset++] / 2,
                L90: payload[offset++] / 2,
                L95: payload[offset++] / 2,
                nMeas: payload[offset++] | (payload[offset++] << 8),
                Temp: (32 + this.signed(payload[offset++], 8) / 2) * 1.25,
                Vbat: (1500 + 10 * payload[offset++]) / 1000,
                rndDel: payload[offset++] * 256 + payload[offset++]
            }
            if (msgType == 1) { // using time from the network
                decodedPayload.T = new Date(new Date().getTime() - 1000 * decodedPayload.rndDel);
            }
        }
        return decodedPayload;
    }

    protected _decode(mo: IManagedObject, model: string, fport: number, time: Date, payload: string): C8YData {
        let c8yData: C8YData = new C8YData();

        let result = this.decoder(Buffer.from(payload, "hex"));
        if (result.type === "values") {
            c8yData.addMeasurements(mo, "values",
            ["idx", "D", "Leq", "Lmin", "Lmax", "L10", "L50", "L90", "L95", "nMeas", "Temp"],
            ["", "", "", "", "", "", "", "", "", "", ""],
            [result.idx, result.D, result.Leq, result.Lmin, result.Lmax, result.L10, result.L50, result.L90, result.L95, result.nMeas, result.Temp],
            result.T)
            if (result.Vbat) {
                c8yData.addMeasurement(mo, "vBat", "vBat", "", result.Vbat, result.T);
            }
        }

        return c8yData;
    }
    protected _encode(mo: IManagedObject, model: string, operation: string): DownlinkData {
        return operation.includes("get config") ? this.askDeviceConfig(null) : null;
    }
}

new CodecApp(new SampolCodec(new MicroserviceSubscriptionService()));