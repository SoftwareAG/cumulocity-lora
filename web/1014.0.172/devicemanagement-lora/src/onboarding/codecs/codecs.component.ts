import { ChangeDetectorRef, Component } from "@angular/core";
import { FetchClient, IManagedObject, InventoryService } from '@c8y/client';
import { DeviceOperation } from "./DeviceOperation";
import { DeviceOperationElement, ParamType } from "./DeviceOperationElement";
import { C8YData } from "./C8YData";

@Component({
    selector: 'codecs',
    templateUrl: './codecs.component.html'
})
export class LoraCodecsComponent {
 
    private codecsFilter: object = {
        type: 'CustomCodec',
        // paging information will be a part of the response now
        withTotalPages: true,
        pageSize: 1000
    };

    private codecs: Map<string, IManagedObject> = new Map<string, IManagedObject>();
    private currentCodec: string;

    editorOptions = {
        theme: 'vs-dark',
        language: 'javascript',
        onMonacoLoad: () => {
            console.log("In monaco onload");
        }
    };

    resultOptions = {
        theme: 'vs-dark',
        language: 'json',
        readOnly: true
    };

    defaultDecodingScript: string = '/* Example of decoder:\nlet c8yData = new C8YData();\nlet buffer = Buffer.from(payload, "hex");\nc8yData.addMeasurement(device, "temperature", "T", "°C", buffer.readInt16BE(0) / 10.0, time);\nconsole.log(c8yData);\nreturn c8yData;*/';
    defaultEncodingScript: string = '/* Example of encoder:\nlet downlinkData = new DownlinkData();\nif (operation.SET_PERIODICITY) {\n\tdownlinkData = {fport: 1, payload: "01" + ("0"+(Number(operation.SET_PERIODICITY.PERIODICITY).toString(16))).slice(-2)};\n}\nconsole.log(downlinkData);\nreturn downlinkData;*/';
    decodingScript: string;
    encodingScript: string;
    operations: Array<DeviceOperation> = new Array();

    uplinkTab = "active";
    downlinkTab = "";
    operationsTab = "";

    decoded: string;

    constructor(private inventory: InventoryService, private fetchClient: FetchClient, private readonly changeDetectorRef: ChangeDetectorRef) {
        this.loadCodecs();
    }

    async loadCodecs() {
        (await this.inventory.list(this.codecsFilter)).data.forEach((mo) => {
            this.codecs.set(mo.id, mo);
        });
        if (this.codecs.size > 0) {
            this.changeCodec(this.codecs.values().next().value.id);
        }
    }

    changeCodec(codec: string) {
        console.log(codec);
        console.log(this.codecs.get(codec));
        this.currentCodec = codec;
        if (this.codecs.get(this.currentCodec) && this.codecs.get(this.currentCodec).decodeString) {
            this.decodingScript = this.codecs.get(this.currentCodec).decodeString;
        } else {
            this.decodingScript = this.defaultDecodingScript;
        }
        if (this.codecs.get(this.currentCodec) && this.codecs.get(this.currentCodec).encodeString) {
            this.encodingScript = this.codecs.get(this.currentCodec).encodeString;
        } else {
            this.encodingScript = this.defaultEncodingScript;
        }
        if (this.codecs.get(this.currentCodec) && this.codecs.get(this.currentCodec).operations) {
            this.operations = this.codecs.get(this.currentCodec).operations;
            if (!this.operations || !(this.operations instanceof Array)) {
                this.operations = [];
            }
            //backward compatibility
            if (this.operations) {
                this.operations.forEach(op => {
                    if (op['params']) {
                        op.elements = op['params'];
                    }
                })
            }
        } else {
            this.operations = [];
        }
    }

    async removeCodec() {
        console.log("Will delete codec " + this.codecs.get(this.currentCodec).name);
        await this.fetchClient.fetch('service/lora-codec-custom/model/' + this.codecs.get(this.currentCodec).name, {
            method: "DELETE"
        });
        this.codecs.delete(this.currentCodec);
        if (this.codecs.size > 0) {
            this.changeCodec(this.codecs.values().next().value.id);
        }
    }

    onUploadEditorLoad(e) {
        console.log("In onUploadEditorLoad");
        console.log(e);
        /*monaco.languages.typescript.javascriptDefaults.addExtraLib(`
        class IManagedObject {
          id: string;
          name: string;
        }
        let mo: IManagedObject;
        let payload: string;
        let time: Date;
        let fport: number;
        class C8YData {
          morToUpdate?: IManagedObject;
          addMeasurement(mor: IManagedObject, fragment: string, series: string, unit: string, value: number, time: Date): void;
          addMeasurements(mor: IManagedObject, fragment: string, serieses: string[], units: string[], values: number[], time: Date): void;
          addEvent(mor: IManagedObject, eventType: string, eventText: string, properties: {}, dateTime: Date): void;
          addAlarm(mor: IManagedObject, alarmType: string, alarmText: string, severity: Severity, dateTime: Date): void;
          clearAlarm(alarmType: string): void;
        }`);*/
    }

    goToUplink() {
        this.uplinkTab = "active";
        this.downlinkTab = "";
        this.operationsTab = "";
    }

    goToDownlink() {
        this.uplinkTab = "";
        this.downlinkTab = "active";
        this.operationsTab = "";
    }

    goToOperations() {
        this.uplinkTab = "";
        this.downlinkTab = "";
        this.operationsTab = "active";
    }

    async createCodec(name: string) {
        console.log("Will create new codec " + name);
        try {
            let codec: IManagedObject = await (await this.fetchClient.fetch('service/lora-codec-custom/model', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ name: name })
            })).json();
            this.codecs.set(codec.id, codec);
            this.changeCodec(codec.id);
        } catch (e) {
            console.error(e);
        }
    }

    saveDecoder() {
        this.codecs.get(this.currentCodec).decodeString = this.decodingScript;
        this.fetchClient.fetch('service/lora-codec-custom/model/decoder', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: this.currentCodec, decodeString: this.decodingScript })
        });
    }

    saveEncoder() {
        this.codecs.get(this.currentCodec).encodeString = this.encodingScript;
        this.fetchClient.fetch('service/lora-codec-custom/model/encoder', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: this.currentCodec, encodeString: this.encodingScript })
        });
    }

    saveOperations() {
        this.codecs.get(this.currentCodec).operations = this.operations;
        this.fetchClient.fetch('service/lora-codec-custom/model/operation', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: this.currentCodec, operations: this.operations })
        });
    }

    deleteOperation(operation) {
        this.operations.splice(this.operations.indexOf(operation));
    }

    addOperation() {
        this.operations.push(new DeviceOperation());
    }

    deleteElement(operation: DeviceOperation, element: DeviceOperationElement) {
        operation.elements.splice(operation.elements.indexOf(element));
    }

    addParam(operation: DeviceOperation) {
        operation.elements.push(new DeviceOperationElement());
    }

    addGroup(operation: DeviceOperation) {
        let element: DeviceOperationElement = new DeviceOperationElement();
        element.type = ParamType.GROUP;
        operation.elements.push(element);
    }

    addValue(param: DeviceOperationElement) {
        if (!param.value) {
            param.value = [];
        }
        param.value.push("");
        console.log(param.value);
    }

    deleteValue(param: DeviceOperationElement, value: string) {
        param.value.splice(param.value.indexOf(value));
        console.log(param.value);
    }

    trackByIdx(index: number, obj: any): any {
        return index;
    }

    isParam(element: DeviceOperationElement): boolean {
        return !element.type || element.type != ParamType.GROUP;
    }

    isGroup(element: DeviceOperationElement): boolean {
        return element.type && element.type == ParamType.GROUP;
    }

    decode(payload: string, fport: number) {
        let time = new Date();
        let device = {};
        let localDecode = Function("device", "fport", "time", "payload", "C8YData", "Buffer", this.decodingScript);
        console.log(localDecode);
        this.decoded = JSON.stringify(localDecode({}, fport, new Date(), payload, C8YData, Buffer), null, '\t');
    }
}
