export class DeviceOperationElement {
  id: string;
  name: string;
  type: ParamType;
  value: any;
  elements: Array<DeviceOperationElement> = new Array<DeviceOperationElement>();
  repeatable: boolean = false;
  minOccur: number = 1;
  maxOccur: number = 1;
  dependsOnParam: boolean = false;
  dependsOnParamId: string;
  dependsOnParamValue: string;
  required: boolean = true;
}

export enum ParamType {
  STRING = "STRING",
  INTEGER = "INTEGER",
  FLOAT = "FLOAT",
  BOOL = "BOOL",
  DATE = "DATE",
  ENUM = "ENUM",
  GROUP = "GROUP",
  ARRAY = "ARRAY",
}
