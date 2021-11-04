import { DeviceOperationParam } from "./DeviceOperationParam";

export class DeviceOperation {
    id: string;
    name: string;
    params: Array<DeviceOperationParam> = new Array<DeviceOperationParam>();
}