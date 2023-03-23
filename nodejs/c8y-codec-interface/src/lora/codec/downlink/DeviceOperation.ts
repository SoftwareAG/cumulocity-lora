import { DeviceOperationElement } from "./DeviceOperationElement";

export class DeviceOperation {
  id: string;
  name: string;
  elements: Array<DeviceOperationElement> = new Array<DeviceOperationElement>();
}
