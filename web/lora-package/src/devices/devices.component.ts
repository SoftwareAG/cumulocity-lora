import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import {
  EventService,
  IEvent,
  IManagedObject,
  IOperation,
  IdentityService,
  InventoryService,
  OperationService,
} from "@c8y/client";
import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { DeviceAdditionalProperty } from "src/service/DeviceAdditionalProperty";
import { DeviceOperation } from "../../src/onboarding/codecs/DeviceOperation";
import {
  DeviceOperationElement,
  ParamType,
} from "../../src/onboarding/codecs/DeviceOperationElement";
import { CodecService } from "../../src/service/CodecService";
import { LnsService } from "../../src/service/LnsService";

@Component({
  selector: "devices",
  templateUrl: "./devices.component.html",
})
export class DevicesComponent implements OnInit {
  commands: {};
  device: IManagedObject;
  selectedLnsConnectorId: string;
  model: string;
  codec: string;
  useGatewayPosition: boolean = true;
  previewCommand: { success: boolean; message: string; response: any };
  devEui: string;
  @ViewChild("errorModal", { static: false })
  errorModal: TemplateRef<any>;
  errorModalRef: BsModalRef;
  models: Map<string, string>;
  unprocessedPayloads: IEvent[];
  commandChoice: string;
  deviceProvisioningAdditionalProperties = {};
  properties: Array<DeviceAdditionalProperty>;

  form = new FormGroup({});
  parameterValues: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[][] = new Array<FormlyFieldConfig[]>();
  debugMode: boolean;
  storeLast: boolean;
  codecChanged: boolean;

  constructor(
    public route: ActivatedRoute,
    public lnsService: LnsService,
    public codecService: CodecService,
    private inventory: InventoryService,
    private identity: IdentityService,
    private operationService: OperationService,
    private modalService: BsModalService,
    private eventService: EventService
  ) {
    console.log(route.snapshot.parent.data.contextData.id);
  }

  async ngOnInit(): Promise<void> {
    await this.getCodecAndModel();
  }

  resetModel() {
    this.parameterValues = {};
  }

  async getCodecAndModel() {
    let deviceId: string = this.route.snapshot.parent.data.contextData.id;
    const { data, res, paging } = await this.inventory.detail(deviceId);
    this.device = data;
    if (this.device.c8y_Configuration && this.device.c8y_Configuration.config) {
      this.parameterValues = JSON.parse(this.device.c8y_Configuration.config);
    }
    this.debugMode = data.debug;
    this.storeLast = data.storeLast;
    this.selectedLnsConnectorId = this.device.lnsConnectorId;
    this.getUnprocessPayloads();
    if (this.device.codec) {
      this.codec = this.device.codec;
      await this.loadModels(this.device.codec);
    }
    if (this.device.useGatewayPosition === undefined) {
      this.useGatewayPosition = true;
    } else {
      this.useGatewayPosition = this.device.useGatewayPosition;
    }
    if (this.device.c8y_Hardware) {
      this.model = this.device.c8y_Hardware.model;
      await this.loadCommands();
    }
  }

  async loadCommands() {
    let deviceId: string = this.route.snapshot.parent.data.contextData.id;
    this.commands = await this.codecService.getOperations(
      this.device.codec,
      this.model
    );
    console.log(this.commands);
    this.fields = new Array<FormlyFieldConfig[]>();
    Object.keys(this.commands).forEach((command) => {
      this.fields[command] = this.getFields(this.commands[command]);
    });
    (await this.identity.list(deviceId)).data.forEach((extId) => {
      if (extId.type === "LoRa devEUI") {
        this.devEui = extId.externalId;
      }
    });
  }

  getFieldFromElement(element: DeviceOperationElement): FormlyFieldConfig {
    let field: FormlyFieldConfig = {
      key: element.id,
      templateOptions: { label: element.name },
    };
    if (element.value) {
      field.defaultValue = element.value;
    }

    switch (element.type) {
      case ParamType.STRING:
        field.type = "input";
        field.props.type = "text";
        field.props.required = element.required;
        break;
      case ParamType.INTEGER:
      case ParamType.FLOAT:
        field.type = "input";
        field.props.type = "number";
        field.props.required = element.required;
        field.props.min = element.min;
        field.props.max = element.max;
        break;
      case ParamType.BOOL:
        field.type = "checkbox";
        break;
      case ParamType.DATE:
        field.type = "input";
        field.props.type = "date";
        field.props.required = element.required;
        break;
      case ParamType.ENUM:
        field.type = "radio";
        if (element.value.length > 3) {
          field.type = "select";
        }
        field.props.options = element.value.map((e) => {
          return { label: e, value: e };
        });
        field.defaultValue = undefined;
        break;
      case ParamType.GROUP:
        if (element.dependsOnParam) {
          field.expressions = {
            hide: () => {
              return (
                this.parameterValues[element.dependsOnParamId] !=
                element.dependsOnParamValue
              );
            },
          };
        }
        if (element.repeatable) {
          field.type = "repeat";
          field.props.addText = "Add " + element.name;
          field.props.removeText = "Remove " + element.name;
          field.props.minOccur = element.minOccur;
          field.props.maxOccur = element.maxOccur;
          field.fieldArray = {
            props: { label: element.name },
            wrappers: ["panel"],
            fieldGroup: element.elements.map((e) =>
              this.getFieldFromElement(e)
            ),
          };
          if (element.minOccur > 0) {
            field.defaultValue = [];
            for (let i = 0; i < element.minOccur; i++) {
              field.defaultValue.push({});
            }
          }
        } else {
          field.wrappers = ["panel"];
          field.fieldGroup = element.elements.map((e) =>
            this.getFieldFromElement(e)
          );
        }
        break;
      case ParamType.ARRAY:
        field.wrappers = ["panel"];
        field.fieldGroup = new Array<FormlyFieldConfig>();
        for (let i = 0; i < element.maxOccur; i++) {
          field.fieldGroup.push({
            key: "" + i,
            type: "input",
            templateOptions: { type: "number", required: element.required },
          });
        }
    }

    return field;
  }

  getFields(command: DeviceOperation): FormlyFieldConfig[] {
    return command && command.elements
      ? command.elements.map((e) => this.getFieldFromElement(e))
      : [];
  }

  async preview(command, parameters) {
    console.log(parameters);
    let params = parameters ? JSON.stringify(parameters) : "{}";
    let toEncode = {
      devEui: this.devEui,
      operation: '{"' + command + '":' + params + "}",
      model:
        this.device.c8y_Hardware !== undefined
          ? this.device.c8y_Hardware.model || "a"
          : "a",
    };
    console.log(toEncode);
    this.previewCommand = await this.codecService.encode(
      this.device.codec,
      toEncode
    );
    console.dir(this.previewCommand);
    if (!this.previewCommand.success) {
      this.errorModalRef = this.modalService.show(this.errorModal);
    }
  }

  async send(command, parameters) {
    let params = parameters ? JSON.stringify(parameters) : "{}";
    let operation: IOperation = {
      deviceId: this.device.id,
      c8y_Command: {
        text: '{"' + command + '":' + params + "}",
      },
      description: "Execute command " + command,
    };
    this.operationService.create(operation);
  }

  async loadModels(codec) {
    console.log("Loading models for codec " + codec);
    if (!this.device.codec || this.device.codec != codec) {
      this.codecChanged = true;
    }
    this.models = await this.codecService.getModels(codec);
    if (!this.models[this.model]) {
      this.model = undefined;
    }
    console.log(this.models);
    console.log(this.model);
  }

  updateDeviceCodec() {
    let device: Partial<IManagedObject> = {
      id: this.device.id,
      codec: this.codec,
      useGatewayPosition: this.useGatewayPosition,
      c8y_Hardware: { model: this.model },
    };

    this.inventory.update(device);
    this.device.codec = this.codec;
    this.device.c8y_Hardware = { model: this.model };
    this.codecChanged = false;
    this.loadCommands();
  }

  async getUnprocessPayloads() {
    this.unprocessedPayloads = new Array<IEvent>();
    let currentPage: number = 1;
    let pageSize: number = 100;
    let unprocessedPayloads = await this.eventService.list({
      source: this.device.id,
      fragmentType: "status",
      fragmentValue: "unprocessed",
      type: "LoRaPayload",
      pageSize: pageSize,
      withTotalPages: true,
    });
    console.log(unprocessedPayloads);
    this.unprocessedPayloads = new Array<IEvent>();
    this.unprocessedPayloads.push(...unprocessedPayloads.data);
    if (unprocessedPayloads.paging.totalPages > 1) {
      while (currentPage < unprocessedPayloads.paging.totalPages) {
        this.unprocessedPayloads.push(
          ...(
            await this.eventService.list({
              source: this.device.id,
              fragmentType: "status",
              fragmentValue: "unprocessed",
              type: "LoRaPayload",
              pageSize: pageSize,
              currentPage: ++currentPage,
            })
          ).data
        );
      }
    }
    console.log(this.unprocessedPayloads);
  }

  async processPayloads() {
    this.unprocessedPayloads.forEach(async (event) => {
      let toDecode = {
        deveui: this.devEui,
        model: this.model,
        fPort: event.port,
        payload: event.payload,
        updateTime: new Date(event.time).getTime(),
      };
      let decodeResult = await this.codecService.decode(
        this.device.codec,
        toDecode
      );
      if (decodeResult.success) {
        await this.eventService.update({
          id: event.id,
          processed: true,
          status: "processed",
        });
        this.unprocessedPayloads.splice(
          this.unprocessedPayloads.indexOf(event),
          1
        );
      }
    });
  }

  async loadProperties(instance: string) {
    let props = await this.lnsService.getDeviceProvisioningAdditionalProperties(
      instance
    );
    this.properties = props.properties;
    this.deviceProvisioningAdditionalProperties = props.values;
    console.dir(this.properties);
    console.dir(this.deviceProvisioningAdditionalProperties);
  }

  async updateConnector() {
    try {
      await this.lnsService.deprovisionDevice(this.device);
    } catch (e) {
      console.log(e);
    }
    try {
      let response = await this.lnsService.provisionDevice(
        {
          appEUI: this.device.appEUI,
          appKey: this.device.appKey,
          devEUI: this.devEui,
          codec: this.device.codec,
          model: this.device.c8y_Hardware.model,
          name: this.device.name,
          type: this.device.type,
          useGatewayPosition: this.device.useGatewayPosition,
        },
        this.selectedLnsConnectorId,
        this.deviceProvisioningAdditionalProperties
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
    this.device.lnsConnectorId = this.selectedLnsConnectorId;
  }

  async switchDebugMode() {
    let device: Partial<IManagedObject> = {
      id: this.device.id,
      debug: this.debugMode,
    };
    this.inventory.update(device);
  }

  async switchStoreLast() {
    let device: Partial<IManagedObject> = {
      id: this.device.id,
      storeLast: this.storeLast,
    };
    this.inventory.update(device);
  }
}
