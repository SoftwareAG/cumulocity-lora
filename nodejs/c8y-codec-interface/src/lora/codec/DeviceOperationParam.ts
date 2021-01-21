export class DeviceOperationParam {
    id: string;
    name: string;
    type: ParamType;
    value: any;
}

export enum ParamType {
    STRING, INTEGER, FLOAT, BOOL, DATE, ENUM
}
