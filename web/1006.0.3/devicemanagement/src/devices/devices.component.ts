import { _ } from '@c8y/ngx-components';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FetchClient, InventoryService, IManagedObject, IOperation, IdentityService, OperationService, IEvent, EventService } from '@c8y/client';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
    selector: 'devices',
    templateUrl: './devices.component.html'
})
export class DevicesComponent implements OnInit {
    async ngOnInit(): Promise<void> {

    }
    commands: [{}];
    device: IManagedObject;
    model: string;
    codec: string;
    previewCommand: { success: boolean, message: string, response: any };
    devEui: string;
    @ViewChild('errorModal', { static: false })
    errorModal: TemplateRef<any>;
    errorModalRef: BsModalRef;
    codecs: IManagedObject[];
    codecMap: {};
    models: [];
    unprocessedPayloads: IEvent[];


    private codecsFilter: object = {
        type: 'Device Codec',
        // paging information will be a part of the response now
        withTotalPages: true,
        pageSize: 100
    };

    constructor(public route: ActivatedRoute, private inventory: InventoryService, private identity: IdentityService, private operationService: OperationService, private fetch: FetchClient, private modalService: BsModalService, private eventService: EventService) {
        console.log(route.snapshot.parent.data.contextData.id);
        // _ annotation to mark this string as translatable string.
        this.loadCommands();
        this.loadCodecs();
    }

    async loadCommands() {
        let deviceId: string = this.route.snapshot.parent.data.contextData.id;
        const { data, res, paging } = await this.inventory.detail(deviceId);
        this.device = data;
        this.getUnprocessPayloads();
        if (this.device.codec) {
            this.codec = this.device.codec;
            this.loadModels(this.device.codec);
        }
        this.model = this.device.c8y_Hardware !== undefined ? this.device.c8y_Hardware.model || 'a' : 'a';
        let response = await this.fetch.fetch('service/lora-codec-' + this.device.codec + '/operations/' + this.model);
        this.commands = await response.json();
        (await this.identity.list(deviceId)).data.forEach(extId => {
            if (extId.type === 'LoRa devEUI') {
                this.devEui = extId.externalId;
            }
        });
    }

    async preview(command, parameters) {
        let params = parameters ? JSON.stringify(parameters) : "{}";
        let toEncode = {
            devEui: this.devEui,
            operation: '{"' + command + '":' + params + '}',
            model: this.device.c8y_Hardware !== undefined ? this.device.c8y_Hardware.model || 'a' : 'a'
        }
        console.log(toEncode);
        let response = await this.fetch.fetch('service/lora-codec-' + this.device.codec + '/encode', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(toEncode)
        });
        this.previewCommand = await response.json();
        if (!this.previewCommand.success) {
            this.errorModalRef = this.modalService.show(this.errorModal);
        }
    }

    async send(command, parameters) {
        let params = parameters ? JSON.stringify(parameters) : "{}";
        let operation: IOperation = {
            deviceId: this.device.id,
            c8y_Command: {
                text: '{"' + command + '":' + params + '}'
            },
            description: "Execute command " + command
        }
        this.operationService.create(operation);
    }

    async loadCodecs() {
        const { data, res, paging } = await this.inventory.list(this.codecsFilter);
        this.codecs = data;
        this.codecMap = {};
        data.forEach(codec => this.codecMap[codec.lora_codec_DeviceCodecRepresentation.id] = codec.lora_codec_DeviceCodecRepresentation);
    }

    async loadModels(codec) {
        console.log("Loading models for codec " + codec);
        const response = await this.fetch.fetch('service/lora-codec-' + codec + '/models');
        if (response && response.status == 200) {
            console.log(response);
            response.json().then(models => this.models = models).catch(e => {
                console.log(e);
                this.models = [];
            });
        }
        else {
            console.error(response);
            this.models = [];
        }
    }

    updateDeviceCodec() {
        let device: Partial<IManagedObject> = {
            id: this.device.id,
            codec: this.codec,
            c8y_Hardware: { model: this.model }
        }

        this.inventory.update(device);
        this.loadCommands();
    }

    getUnprocessPayloads() {
        this.unprocessedPayloads = new Array<IEvent>();
        this.eventService.list({ source: this.device.id, type: "LoRaPayload", pageSize: 1000 }).then(data => {
            data.data.forEach(event => {
                if (!event.processed) {
                    this.unprocessedPayloads.push(event);
                }
            })
        })
    }

    async processPayloads() {
        this.unprocessedPayloads.forEach(async event => {
            let toDecode = {
                deveui: this.devEui,
                model: this.model,
                fPort: event.port,
                payload: event.payload,
                updateTime: new Date(event.time).getTime()
            }
            console.log(toDecode);
            let response = await this.fetch.fetch('service/lora-codec-' + this.device.codec + '/decode', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(toDecode)
            });
            let decodeResult = await response.json();
            if (decodeResult.success) {
                event.processed = true;
                event.creationTime = null;
                event.time = null;
                event.type = null;
                event.source = null;
                await this.eventService.update(event);
            }
        });
        this.getUnprocessPayloads();
    }
}
