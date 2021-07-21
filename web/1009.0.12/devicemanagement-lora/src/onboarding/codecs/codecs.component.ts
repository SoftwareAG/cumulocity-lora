import { Component } from "@angular/core";
import { FetchClient, InventoryService, IdentityService, IManagedObject, IExternalIdentity, QueriesUtil } from '@c8y/client';

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

    code: string = 'function x() {\nconsole.log("Hello world!");\n}';
    codeStart: string = `function decode(mo: IManagedObject, fport: number, time: Date, payload: string) {
    /*multiLineEditableArea#actualCode=`;
    codeEnd: string = `
*/
}`;

    uplink = "active";
    downlink = "";

    constructor(private inventory: InventoryService, private fetchClient: FetchClient) {
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
        this.currentCodec = codec;
        //this.code = this.codeStart + this.currentCodec.decodeString + this.codeEnd;
        this.code = this.codecs.get(this.currentCodec).decodeString;
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
        this.uplink = "active";
        this.downlink = "";
    }

    goToDownlink() {
        this.uplink = "";
        this.downlink = "active";
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
        this.codecs.get(this.currentCodec).decodeString = this.code;
        this.fetchClient.fetch('service/lora-codec-custom/model/decoder', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: this.currentCodec, decodeString: this.code })
        });
    }
}
