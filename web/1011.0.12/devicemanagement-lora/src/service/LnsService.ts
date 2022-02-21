import { Injectable } from "@angular/core";
import { IManagedObject, InventoryService, IdentityService } from "@c8y/client";
import { FetchClient } from "@c8y/ngx-components/api";
import { DeviceProvisioning } from "./DeviceProvisioning";

@Injectable({
    providedIn: 'root'
})
export class LnsService {
    lnsProxies: IManagedObject[];
    lnsInstances: IManagedObject[];
    proxyMap: {};
    instanceMap: {};

    private lnsProxyFilter: object = {
        type: 'LoRa Network Server agent',
        // paging information will be a part of the response now
        withTotalPages: true,
        pageSize: 1000
    };

    private instanceFilter: object = {
        type: 'LNS Connector',
        // paging information will be a part of the response now
        withTotalPages: true,
        pageSize: 1000
    };

    constructor(private client: FetchClient, private inventory: InventoryService, private identityService: IdentityService) {
        this.loadProxies();
        this.loadInstances();
    }

    async loadProxies() {
        const { data, res, paging } = await this.inventory.list(this.lnsProxyFilter);
        this.lnsProxies = data;
        this.proxyMap = {};
        data.forEach(proxy => this.proxyMap[proxy.lnsType] = proxy);
    }

    async loadInstances() {
        const { data, res, paging } = await this.inventory.list(this.instanceFilter);
        this.lnsInstances = data;
        this.instanceMap = {};
        data.forEach(instance => this.instanceMap[instance.id] = instance);
    }

    async getDevEUI(device: Partial<IManagedObject>) {
        let extIds = (await this.identityService.list(device.id)).data.filter(extId => extId.type === "LoRa devEUI");
        let extId = "-";
        if (extIds.length > 0) {
            extId = extIds[0].externalId;
        }
        return extId;
    }

    async provisionDevice(deviceProvisioning: DeviceProvisioning, instance: string, additionalProperties): Promise<IManagedObject> {
        console.log("Will provision device on LNS instance " + instance);
        console.log({ ...deviceProvisioning, provisioningMode: "OTAA", additionalProperties: additionalProperties });
        let lnsInstance: IManagedObject = this.instanceMap[instance];
        return (await (await this.client.fetch('service/lora-ns-' + lnsInstance.lnsType + '/' + instance + '/devices', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...deviceProvisioning, provisioningMode: "OTAA", additionalProperties: additionalProperties })
        })).json()).data;
    }

    async deprovisionDevice(device: Partial<IManagedObject>) {
        await this.client.fetch('service/lora-ns-' + this.instanceMap[device.lnsConnectorId].lnsType + '/' + device.lnsConnectorId + '/devices/' + await this.getDevEUI(device), {
            method: "DELETE"
        });
    }

    async getDeviceProvisioningAdditionalProperties(instance: string): Promise<{
        properties: [{
            name: string;
            label: string;
            required: boolean;
            type: string;
            url: string;
            values: Map<string, string>;
        }?], values: {}
    }> {
        let props: {
            properties: [{
                name: string;
                label: string;
                required: boolean;
                type: string;
                url: string;
                values: Map<string, string>;
            }?], values: {}
        } = { properties: [], values: {} };
        let lnsInstance: IManagedObject = this.instanceMap[instance];
        const response = await this.client.fetch('service/lora-ns-' + lnsInstance.lnsType + '/deviceProvisioningAdditionalProperties');
        props.properties = await response.json();
        if (props.properties && props.properties.forEach) {
            console.log(props.properties);
            props.properties.forEach(async p => {
                if (p.type === "LIST") {
                    const values = await this.client.fetch('service/lora-ns-' + lnsInstance.lnsType + "/" + instance + p.url, {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });
                    p.values = await values.json();
                }
                props.values[p.name] = undefined;
            });
        }

        return props;
    }
}