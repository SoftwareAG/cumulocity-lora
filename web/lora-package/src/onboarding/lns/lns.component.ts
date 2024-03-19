import { Component, TemplateRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import {
  FetchClient,
  IManagedObject,
  IdentityService,
  InventoryService,
} from "@c8y/client";
import { AlertService, _ } from "@c8y/ngx-components";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

/**
 * The DevicesComponent defines a few methods that can be
 * used to get, add and delete managedObjects as devices.
 * You can also create a deviceService (this would be a cleaner way)
 * that handles all these things and more. Then inject the new service
 * via constructor into this component.
 * For simple demonstration purpose we went without a service !
 */
@Component({
  selector: "lns",
  templateUrl: "./lns.component.html",
})
export class LNSComponent {
  lnsProxies: IManagedObject[];
  lnsInstances: IManagedObject[];
  lnsToDelete: IManagedObject;
  @ViewChild("deleteLNSModal", { static: false })
  deleteLNSModal: TemplateRef<any>;
  deleteLNSModalRef: BsModalRef;
  proxyMap: {};
  informationText: string;
  properties: [
    {
      name: string;
      label: string;
      required: boolean;
      type: string;
      url: string;
      values: Map<string, string>;
    }?
  ];
  wizard: [
    {
      name: string;
      propertyDescriptions: [
        {
          name: string;
          label: string;
          required: boolean;
          type: string;
          url: string;
          values: Map<string, string>;
        }
      ];
    }
  ];
  currentStep = 0;
  stepValues = [];
  instanceProperties = { value: {} };
  allProperties = {};

  // The filter object will add query parameters
  // to the request which is made by the service.
  private lnsProxyFilter: object = {
    type: "LoRa Network Server agent",
    // paging information will be a part of the response now
    withTotalPages: true,
    pageSize: 100,
  };

  private instanceFilter: object = {
    type: "LNS Connector",
    // paging information will be a part of the response now
    withTotalPages: true,
    pageSize: 100,
  };

  constructor(
    private router: Router,
    private inventory: InventoryService,
    private identity: IdentityService,
    private fetchClient: FetchClient,
    private modalService: BsModalService,
    private alertService: AlertService
  ) {
    // _ annotation to mark this string as translatable string.
    this.informationText = _(
      "Ooops! It seems that there is no network server to display."
    );
    this.loadProxies();
    this.loadInstances();
  }

  // Promise-based usage of InventoryService.
  async loadProxies() {
    const { data, res, paging } = await this.inventory.list(
      this.lnsProxyFilter
    );
    this.lnsProxies = data;
    this.proxyMap = {};
    data.forEach((proxy) => {
      this.proxyMap[proxy.lnsType] = proxy;
    });
  }

  async loadInstances() {
    const { data, res, paging } = await this.inventory.list(
      this.instanceFilter
    );
    this.lnsInstances = data;
  }

  // Add a managedObject (as device) to the database.
  async addInstance(type: string, name: string, properties) {
    this.allProperties = { ...this.allProperties, ...properties };
    this.stepValues[this.currentStep] = properties;
    let instance = {
      properties: this.allProperties,
      name: name,
    };
    let response = await this.fetchClient.fetch(
      "service/lora-ns-" + type + "/lnsinstances",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(instance),
      }
    );
    if (response.ok) {
      this.loadInstances();
    } else {
      let error = await response.json();
      this.alertService.danger(error.message, error.detailedMessage);
    }
  }

  // Delete a managedObject (as device) with given id from database.
  async deleteDevice(id: string) {
    if (id && id.length > 0) {
      await this.inventory.delete(id);
      this.loadProxies();
    }
  }

  async getDevEUI(device) {
    let extIds = (await this.identity.list(device.id)).data.filter(
      (extId) => extId.type === "LoRa devEUI"
    );
    let extId = "-";
    if (extIds.length > 0) {
      extId = extIds[0].externalId;
    }
    console.log(extId);
    return extId;
  }

  async loadProperties(lnsProxyId) {
    this.properties = this.wizard[this.currentStep].propertyDescriptions;
    console.log(this.allProperties);
    this.properties.forEach(async (p) => {
      if (p.type === "LIST") {
        const values = await this.fetchClient.fetch(
          "service/lora-ns-" + lnsProxyId + p.url,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.allProperties),
          }
        );
        console.log(values);
        if (values.ok) {
          p.values = await values.json();
          console.log(p.values);
        } else {
          let error = await values.json();
          console.log(error);
          this.alertService.danger(error.message, error.detailedMessage);
        }
      }
    });
  }

  previousStep(lnsProxyId, properties) {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.instanceProperties.value = this.stepValues[this.currentStep];
      this.loadProperties(lnsProxyId);
    }
  }

  nextStep(lnsProxyId, properties) {
    this.allProperties = { ...this.allProperties, ...properties };
    this.stepValues[this.currentStep] = properties;
    if (this.currentStep < this.wizard.length) {
      this.currentStep++;
      this.loadProperties(lnsProxyId);
    }
  }

  async loadWizard(lnsProxyId) {
    this.currentStep = 0;
    if (lnsProxyId !== "") {
      const response = await this.fetchClient.fetch(
        "service/lora-ns-" + lnsProxyId + "/wizard"
      );
      this.wizard = await response.json();
      this.loadProperties(lnsProxyId);
    } else {
      this.properties = [];
    }
  }

  delete(lnsConnector: IManagedObject) {
    this.lnsToDelete = lnsConnector;
    this.deleteLNSModalRef = this.modalService.show(this.deleteLNSModal, {
      backdrop: true,
      ignoreBackdropClick: true,
    });
  }

  edit(lnsConnector: IManagedObject) {
    this.router.navigateByUrl("lns/" + lnsConnector.id);
  }

  async endDelete() {
    await this.inventory.delete(this.lnsToDelete);
    this.deleteLNSModalRef.hide();
    this.loadProxies();
    this.loadInstances();
  }
}
