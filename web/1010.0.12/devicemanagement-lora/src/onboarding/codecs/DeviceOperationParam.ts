export class DeviceOperationParam {
    id: string;
    name: string;
    type: ParamType;
    value?: any;
}

export enum ParamType {
    STRING = "STRING", INTEGER = "INTEGER", FLOAT = "FLOAT", BOOL = "BOOL", DATE = "DATE", ENUM = "ENUM"
}
