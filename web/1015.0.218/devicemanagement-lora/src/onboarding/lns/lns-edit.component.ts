import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IManagedObject, InventoryService, TenantOptionsService, ITenantOption, FetchClient } from "@c8y/client";

@Component({
    selector: 'lns-edit',
    templateUrl: './lns-edit.component.html'
})
export class LNSEditComponent {
    currentLns: IManagedObject;
    properties: [{
        name: string;
        label: string;
        required: boolean;
        type: string;
        url: string;
        values: [];
        encrypted: boolean;
    }?];
    wizard: [{name: string, propertyDescriptions: [{
        name: string;
        label: string;
        required: boolean;
        type: string;
        url: string;
        values: [];
        encrypted: boolean;
    }]}];
    currentStep = 0;
    stepValues = [];
    instanceProperties = {value: {}};
    allProperties = {};
    modifiedProperties = {};

    constructor(private fetchClient: FetchClient, private router: Router, private route: ActivatedRoute, private inventory: InventoryService, private tenantOptions: TenantOptionsService) {
        this.route.params.subscribe( params => this.editLns(params['lnsid']) );
    }

    async editLns(lnsid: string) {
        this.currentLns = (await this.inventory.detail(lnsid)).data;
        this.loadWizard();
    }

    back() {
        this.router.navigateByUrl("lns");
    }

    async loadProperties() {
        this.properties = this.wizard[this.currentStep].propertyDescriptions;
        console.log(this.allProperties);
        this.properties.forEach(async p => {
            if (p.type === "LIST") {
                const values = await this.fetchClient.fetch('service/lora-ns-' + this.currentLns.lnsType + "/" + this.currentLns.id + p.url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                      },
                    body: JSON.stringify(this.modifiedProperties)
                });
                try {
                    p.values = await values.json();
                } catch(e) {
                    p.values = [];
                }
            }
            let key: string = p.name;
            if (p.encrypted) {
                key = "credentials." + key;
            }
            if (!this.modifiedProperties[p.name]) {
                try {
                    let option: ITenantOption = (await this.tenantOptions.detail({category: this.currentLns.id, key: key})).data;
                    console.log(option);
                    this.allProperties[p.name] = option.value;
                } catch(e) {
                    console.error(e);
                    this.allProperties[p.name] = "<empty>";
                }
            }
        });
    }

    previousStep(properties) {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.instanceProperties.value = this.stepValues[this.currentStep];
            this.loadProperties();
        }
    }

    updateModifiedProperties(properties) {
        this.properties.forEach(p => {
            console.log(p);
            if (this.allProperties[p.name] && properties[p.name] != this.allProperties[p.name]) {
                this.modifiedProperties[p.name] = properties[p.name];
            }
            if (this.modifiedProperties[p.name] && properties[p.name] == this.allProperties[p.name]) {
                delete this.modifiedProperties[p.name];
            }
        });
    }

    nextStep(properties) {
        console.log(properties);
        this.updateModifiedProperties(properties);
        console.log(this.modifiedProperties);
        this.allProperties = {...this.allProperties, ...properties};
        this.stepValues[this.currentStep] = properties;
        if (this.currentStep < this.wizard.length) {
            this.currentStep++;
            this.loadProperties();
        }
    }

    async updateConnector(properties) {
        this.updateModifiedProperties(properties);
        console.log(this.modifiedProperties);
        let updatedConnector: Partial<IManagedObject> = {id: this.currentLns.id, name: this.currentLns.name};
        console.log(updatedConnector);
        await this.inventory.update(updatedConnector);
        await this.fetchClient.fetch('service/lora-ns-' + this.currentLns.lnsType + "/lnsinstances/" + this.currentLns.id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(this.modifiedProperties)
        });
        this.back();
    }

    async loadWizard() {
        this.currentStep = 0;
        const response = await this.fetchClient.fetch('service/lora-ns-' + this.currentLns.lnsType + '/wizard');
        this.wizard = await response.json();
        this.loadProperties();
    }
}