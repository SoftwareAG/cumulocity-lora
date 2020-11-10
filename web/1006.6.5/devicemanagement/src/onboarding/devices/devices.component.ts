import { _ } from '@c8y/ngx-components';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FetchClient, InventoryService, IdentityService, IManagedObject, IExternalIdentity } from '@c8y/client';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

/**
 * The DevicesComponent defines a few methods that can be
 * used to get, add and delete managedObjects as devices.
 * You can also create a deviceService (this would be a cleaner way)
 * that handles all these things and more. Then inject the new service
 * via constructor into this component.
 * For simple demonstration purpose we went without a service !
 */
@Component({
    selector: 'devices',
    templateUrl: './devices.component.html'
})
export class LoraDevicesComponent {
    devices: IManagedObject[];
    codecs: IManagedObject[];
    lnsProxies: IManagedObject[];
    lnsInstances: IManagedObject[];
    proxyMap: {};
    instanceMap: {};
    models: [];
    codecMap: {};
    devEUIs: {};
    informationText: string;
    fileContent: string[][];
    deviceToDelete: IManagedObject;
    @ViewChild("deleteDeviceModal", { static: false })
    deleteDeviceModal: TemplateRef<any>;
    deleteDeviceModalRef: BsModalRef;

    // The filter object will add query parameters
    // to the request which is made by the service.
    private loraDevicesFilter: object = {
        fragmentType: 'c8y_IsDevice',
        type: 'c8y_LoRaDevice',
        // paging information will be a part of the response now
        withTotalPages: true,
        pageSize: 100
    };

    private codecsFilter: object = {
        type: 'Device Codec',
        // paging information will be a part of the response now
        withTotalPages: true,
        pageSize: 100
    };

    private lnsProxyFilter: object = {
        type: 'LoRa Network Server agent',
        // paging information will be a part of the response now
        withTotalPages: true,
        pageSize: 100
    };

    private instanceFilter: object = {
        type: 'LNS Connector',
        // paging information will be a part of the response now
        withTotalPages: true,
        pageSize: 100
    };

    constructor(private inventory: InventoryService, private identity: IdentityService, private fetchClient: FetchClient, private modalService: BsModalService) {
        // _ annotation to mark this string as translatable string.
        this.informationText = _('Ooops! It seems that there is no device to display.');
        this.init();
    }

    async init() {
        await this.loadCodecs();
        await this.loadProxies();
        await this.loadInstances()
        await this.loadDevices();
    }

    // Promise-based usage of InventoryService.
    async loadDevices() {
        const { data, res, paging } = await this.inventory.list(this.loraDevicesFilter);
        this.devices = data;
        this.devEUIs = {};
        data.forEach(async device => this.devEUIs[device.id] = await this.getDevEUI(device));
    }

    async loadCodecs() {
        const { data, res, paging } = await this.inventory.list(this.codecsFilter);
        this.codecs = data;
        this.codecMap = {};
        data.forEach(codec => this.codecMap[codec.lora_codec_DeviceCodecRepresentation.id] = codec.lora_codec_DeviceCodecRepresentation);
        console.log("Codec Map:");
        console.log(this.codecMap);
    }

    async loadProxies() {
        const { data, res, paging } = await this.inventory.list(this.lnsProxyFilter);
        this.lnsProxies = data;
        this.proxyMap = {};
        data.forEach(proxy => this.proxyMap[proxy.lnsType] = proxy);
        console.log("Proxy Map:");
        console.log(this.proxyMap);
    }

    async loadInstances() {
        const { data, res, paging } = await this.inventory.list(this.instanceFilter);
        this.lnsInstances = data;
        this.instanceMap = {};
        data.forEach(instance => this.instanceMap[instance.id] = instance);
        console.log("Instance Map:");
        console.log(this.instanceMap);
    }

    // Add a managedObject (as device) to the database.
    async addDevice(name: string, devEUI: string, appEUI: string, appKey: string, type: string, model: string, instance: string) {

        if (instance) {
            this.provision({
                name,
                devEUI: devEUI.toLowerCase(),
                appEUI: appEUI.toLowerCase(),
                appKey: appKey.toLowerCase(),
                codec: type,
                model
            }, instance)
        } else {
            let device = {
                c8y_IsDevice: {},
                devEUI: devEUI.toLowerCase(),
                appEUI: appEUI.toLowerCase(),
                appKey: appKey.toLowerCase(),
                codec: type,
                type: 'c8y_LoRaDevice',
                c8y_Hardware: { model: model },
                c8y_LpwanDevice: { provisioned: false },
                c8y_SupportedOperations: ["c8y_Command"],
                battery: 100
            };

            if (name && name.length > 0) {
                device = Object.assign({ name }, device);
            }

            let createdDevice = (await this.inventory.create(device)).data;
            let deviceId = createdDevice.id;

            let extId: IExternalIdentity = {
                type: 'LoRa devEUI',
                externalId: devEUI.toLowerCase(),
                managedObject: {
                    id: deviceId
                }
            };
            await this.identity.create(extId);
        }
        this.loadDevices();
    }

    delete(device: IManagedObject) {
        this.deviceToDelete = device;
        this.deleteDeviceModalRef = this.modalService.show(this.deleteDeviceModal, { backdrop: true, ignoreBackdropClick: true });
    }

    async endDelete(deprovision: boolean) {
        if (deprovision) {
            await this.deprovision(this.deviceToDelete);
        }
        await this.inventory.delete(this.deviceToDelete);
        this.deleteDeviceModalRef.hide();
        this.loadDevices();
    }

    async getDevEUI(device) {
        let extIds = (await this.identity.list(device.id)).data.filter(extId => extId.type === "LoRa devEUI");
        let extId = "-";
        if (extIds.length > 0) {
            extId = extIds[0].externalId;
        }
        return extId;
    }

    async loadModels(codec) {
        const response = await this.fetchClient.fetch('service/lora-codec-' + codec + '/models');
        if (response) {
            try {
                this.models = await response.json();
            } catch (e) {
                this.models = [];
            }
        }
        else {
            this.models = [];
        }
    }

    changeListener(files: FileList) {
        console.log(files);
        if (files && files.length > 0) {
            let file: File = files.item(0);
            let reader: FileReader = new FileReader();
            reader.readAsText(file);
            reader.onload = (e) => {
                this.fileContent = [];
                let csv: string = reader.result as string;
                let lines = csv.split("\n");
                lines.forEach(line => {
                    this.fileContent.push(line.split(";"));
                });
            }
        }
    }

    addDevices() {
        this.fileContent.forEach(row => {
            console.log("Will add device: " + row);
            this.addDevice(row[3], row[0], row[1], row[2], row[4], row[5], row.length > 6 ? row[6] : null);
        })
    }

    async provision(deviceProvisioning: { name: string, devEUI: string, appEUI: string, appKey: string, codec: string, model: string, lat?: number, lng?: number }, instance: string): Promise<IManagedObject> {
        console.log("Will provision device on LNS instance " + instance);
        let lnsInstance: IManagedObject = this.instanceMap[instance];
        return (await (await this.fetchClient.fetch('service/lora-ns-' + lnsInstance.lnsType + '/' + instance + '/devices', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deviceProvisioning)
        })).json()).data;
    }

    async deprovision(device: IManagedObject) {
        await this.fetchClient.fetch('service/lora-ns-' + this.instanceMap[device.lnsConnectorId].lnsType + '/' + device.lnsConnectorId + '/devices/' + await this.getDevEUI(device), {
            method: "DELETE"
        });
    }
}
