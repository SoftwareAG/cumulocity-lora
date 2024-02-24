import {
  ActionControl,
  BuiltInActionType,
  BulkActionControl,
  Column,
  ColumnDataRecordClassName,
  Pagination,
  DataGridComponent,
  DataSourceModifier,
  FilteringActionType,
  ServerSideDataResult,
  _,
} from "@c8y/ngx-components";
import {
  Component,
  EventEmitter,
  Output,
  TemplateRef,
  ViewChild,
  Pipe,
  PipeTransform,
} from "@angular/core";
import {
  FetchClient,
  InventoryService,
  IdentityService,
  IManagedObject,
  QueriesUtil,
} from "@c8y/client";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FilteringModifier } from "@c8y/ngx-components/core/data-grid/column/filtering-form-renderer";
import { assign, transform } from "lodash-es";
import { LnsService } from "../../../src/service/LnsService";
import { CodecService } from "../../../src/service/CodecService";
import { DeviceAdditionalProperty } from "../../../src/service/DeviceAdditionalProperty";

@Pipe({ name: "property" })
export class PropertyPipe implements PipeTransform {
  transform(
    value: Array<any>,
    propertyName: string,
    propertyLabel: string
  ): string {
    console.log(value);
    return value
      ? value
          .map((v) => v[propertyName] + " (" + v[propertyLabel] + ")")
          .join(",\n")
      : "";
  }
}

/**
 * The DevicesComponent defines a few methods that can be
 * used to get, add and delete managedObjects as devices.
 * You can also create a deviceService (this would be a cleaner way)
 * that handles all these things and more. Then inject the new service
 * via constructor into this component.
 * For simple demonstration purpose we went without a service !
 */
@Component({
  selector: "devices",
  templateUrl: "./devices.component.html",
})
export class LoraDevicesComponent {
  devices: IManagedObject[];
  models: Map<string, Map<string, string>> = new Map<
    string,
    Map<string, string>
  >();
  devEUIs: {};
  informationText: string;
  fileContent: {
    name: string;
    devEUI: string;
    appEUI: string;
    appKey: string;
    type: string;
    codec: string;
    model: string;
    additionalProperties: any;
  }[];
  deviceToDelete: IManagedObject;
  deviceToChange: IManagedObject;
  properties: Array<DeviceAdditionalProperty>;
  bulkProperties: Array<DeviceAdditionalProperty>;
  deviceProvisioningAdditionalProperties = {};
  @ViewChild("deleteDeviceModal", { static: false })
  deleteDeviceModal: TemplateRef<any>;
  deleteDeviceModalRef: BsModalRef;
  @ViewChild("deleteDevicesModal", { static: false })
  deleteDevicesModal: TemplateRef<any>;
  deleteDevicesModalRef: BsModalRef;
  @ViewChild("changeDeviceTypeModal", { static: false })
  changeDeviceTypeModal: TemplateRef<any>;
  changeDeviceTypeModalRef: BsModalRef;
  @ViewChild("changeDevicesTypeModal", { static: false })
  changeDevicesTypeModal: TemplateRef<any>;
  changeDevicesTypeModalRef: BsModalRef;
  queriesUtil: QueriesUtil;
  columns: Column[] = [
    { name: "deveui", header: "Dev EUI", path: "id" },
    {
      name: "name",
      header: "Name",
      path: "name",
      cellCSSClassName: ColumnDataRecordClassName.Header,
      filterable: true,
    },
    {
      name: "type",
      header: "Type",
      path: "type",
    },
    {
      name: "codec",
      header: "Codec",
      path: "codec",
    },
    {
      name: "model",
      header: "Model",
      path: "c8y_Hardware.model",
    },
    { name: "lnstype", header: "LNS Type", path: "lnsConnectorId" },
    { name: "lnsname", header: "LNS Name", path: "lnsConnectorId" },
  ];
  pagination: Pagination = {
    pageSize: 30,
    currentPage: 1,
  };
  actionControls: ActionControl[] = [
    {
      type: BuiltInActionType.Delete,
      callback: (item) => this.delete(<IManagedObject>item),
    },
    {
      type: "CHANGE_TYPE",
      text: "Change Type",
      icon: "pencil",
      callback: (item) => this.changeType(<IManagedObject>item),
    },
  ];
  bulkActionControls: BulkActionControl[] = [
    {
      type: BuiltInActionType.Delete,
      callback: (selectedItemIds) => this.deleteAll(selectedItemIds),
    },
    {
      type: "CHANGE TYPE",
      text: "Change Type",
      icon: "pencil",
      callback: (selectedItemIds) => this.changeTypes(selectedItemIds),
    },
  ];

  @Output() onColumnsChange: EventEmitter<Column[]> = new EventEmitter<
    Column[]
  >();
  @Output() onDeviceQueryStringChange: EventEmitter<string> =
    new EventEmitter<string>();

  serverSideDataCallback: any;

  provisionDevice: any = {};
  bulkProvisionDevices: any = {};
  devicesToDelete: string[];
  devicesToChange: string[];

  async onDataSourceModifier(
    dataSourceModifier: DataSourceModifier
  ): Promise<ServerSideDataResult> {
    const { res, data, paging } = await this.loadDevices(
      dataSourceModifier.columns,
      dataSourceModifier.pagination
    );
    const filteredSize: number = await this.getDevicesCount(
      dataSourceModifier.columns,
      dataSourceModifier.pagination
    );
    const size: number = await this.getDevicesTotal();

    this.onColumnsChange.emit(dataSourceModifier.columns);
    this.onDeviceQueryStringChange.emit(
      this.getDeviceQueryString(dataSourceModifier.columns)
    );

    return {
      res,
      data,
      paging,
      filteredSize,
      size,
    };
  }

  updateFiltering(
    columnNames: string[],
    action: {
      type: FilteringActionType;
      payload?: { filteringModifier: FilteringModifier };
    }
  ) {
    const { type } = action;
    if (type === FilteringActionType.ResetFilter) {
      this.dataGrid.clearFilters();
    } else {
      this.dataGrid.updateFiltering(columnNames, action);
    }
  }

  @ViewChild(DataGridComponent, { static: true })
  dataGrid: DataGridComponent;

  constructor(
    public lnsService: LnsService,
    public codecService: CodecService,
    private inventory: InventoryService,
    private identityService: IdentityService,
    private fetchClient: FetchClient,
    private modalService: BsModalService
  ) {
    // _ annotation to mark this string as translatable string.
    this.informationText = _(
      "Ooops! It seems that there is no device to display."
    );
    this.serverSideDataCallback = this.onDataSourceModifier.bind(this);
    this.queriesUtil = new QueriesUtil();
  }

  getDeviceQueryString(columns: Column[]): string {
    //console.dir(this.getQueryObj(columns));
    let q = this.queriesUtil.buildQuery(this.getQueryObj(columns));
    console.log(q);
    return q;
  }

  private getDevicesFilters(columns: Column[], pagination: Pagination) {
    //let query = this.getDeviceQueryString(columns)
    //console.dir(query);
    return {
      q: this.getDeviceQueryString(columns),
      pageSize: pagination.pageSize,
      currentPage: pagination.currentPage,
      withTotalPages: true,
    };
  }

  private getQueryObj(columns: Column[]): any {
    return transform(
      columns,
      (query, column) => this.extendQueryByColumn(query, column),
      {
        //fragmentType: 'lora_ns_device_LoRaDevice',
        //__or: {type: 'c8y_LoRaDevice', fragmentType: 'lora_ns_device_LoRaDevice' },
        //has: 'lora_ns_device_LoRaDevice',
        __filter: {
          //__has: 'lora_ns_device_LoRaDevice'
          __or: [
            { __has: "lora_ns_device_LoRaDevice" },
            { type: "c8y_LoRaDevice" },
          ],
        },
        __orderby: [],
      }
    );
  }

  private extendQueryByColumn(query: any, column: Column): void {
    if (column.filterable && column.filterPredicate) {
      const queryObj: any = {};
      queryObj[column.path] = column.filterPredicate;
      assign(query.__filter, queryObj);
    }

    /*if (column.sortable && column.sortOrder) {
            const cs = {};
            forEach(column. sortingConfig.pathSortingConfigs, pathSortingConfig => {
                cs[pathSortingConfig.path] =
                    (column.sortOrder === 'asc' ? 1 : -1) * (pathSortingConfig.sortOrderModifier || 1);
            });
            query.__orderby.push(cs);
        }*/
    //console.dir(query);
    return query;
  }

  async getDevices(columns: Column[], pagination: Pagination) {
    const filters = {
      ...this.getDevicesFilters(columns, pagination),
      withParents: true,
    };
    return this.inventory.list(filters);
  }

  async getDevicesCount(columns: Column[], pagination: Pagination) {
    const filters = {
      ...this.getDevicesFilters(columns, pagination),
      pageSize: 1,
      currentPage: 1,
    };
    return (await this.inventory.list(filters)).paging.totalPages;
  }

  async getDevicesTotal(): Promise<number> {
    const filters = {
      query:
        "has(c8y_IsDevice) and (has(lora_ns_device_LoRaDevice) or type eq c8y_LoRaDevice)",
      pageSize: 1,
      withTotalPages: true,
    };
    return (await this.inventory.list(filters)).paging.totalPages;
  }

  async loadDevices(columns: Column[], pagination: Pagination) {
    let result = await this.getDevices(columns, pagination);
    this.devices = result.data;
    this.devEUIs = {};
    result.data.forEach(
      async (device) => (this.devEUIs[device.id] = await this.getDevEUI(device))
    );
    return result;
  }

  addDeviceFromForm() {
    this.addDevice(
      this.provisionDevice.deviceName,
      this.provisionDevice.devEUI,
      this.provisionDevice.appEUI,
      this.provisionDevice.appKey,
      this.provisionDevice.type,
      this.provisionDevice.codec,
      this.provisionDevice.model,
      this.provisionDevice.instanceSelect,
      this.provisionDevice.useGatewayPosition,
      this.deviceProvisioningAdditionalProperties
    );
  }

  // Add a managedObject (as device) to the database.
  async addDevice(
    name: string,
    devEUI: string,
    appEUI: string,
    appKey: string,
    type: string,
    codec: string,
    model: string,
    instance: string,
    useGatewayPosition: boolean,
    additionalProperties
  ) {
    if (instance) {
      this.lnsService
        .provisionDevice(
          {
            name: name,
            devEUI: devEUI.toLowerCase(),
            appEUI: appEUI ? appEUI.toLowerCase() : null,
            appKey: appKey ? appKey.toLowerCase() : null,
            codec: codec,
            model: model,
            type: type,
            useGatewayPosition: useGatewayPosition,
          },
          instance,
          additionalProperties
        )
        .then((data) => console.log(data));
    } else {
      let device = {
        c8y_IsDevice: {},
        lora_ns_device_LoRaDevice: {},
        devEUI: devEUI.toLowerCase(),
        appEUI: appEUI ? appEUI.toLowerCase() : null,
        appKey: appKey ? appKey.toLowerCase() : null,
        codec,
        type,
        c8y_Hardware: { model: model },
        c8y_LpwanDevice: { provisioned: false },
        c8y_SupportedOperations: ["c8y_Command", "c8y_Configuration"],
        battery: 100,
      };

      if (name && name.length > 0) {
        device = Object.assign({ name }, device);
      }

      let createdDevice = (await this.inventory.create(device)).data;
      let deviceId = createdDevice.id;

      await this.identityService.create({
        type: "LoRa devEUI",
        externalId: devEUI.toLowerCase(),
        managedObject: {
          id: deviceId,
        },
      });
      await this.identityService.create({
        type: "c8y_Serial",
        externalId: devEUI.toLowerCase(),
        managedObject: {
          id: deviceId,
        },
      });
    }
    this.dataGrid.reload();
    //this.loadDevices();
  }

  delete(device: IManagedObject) {
    this.deviceToDelete = device;
    this.deleteDeviceModalRef = this.modalService.show(this.deleteDeviceModal, {
      backdrop: true,
      ignoreBackdropClick: true,
    });
  }

  deleteAll(selectedIds: string[]) {
    this.devicesToDelete = selectedIds;
    this.deleteDevicesModalRef = this.modalService.show(
      this.deleteDevicesModal,
      { backdrop: true, ignoreBackdropClick: true }
    );
  }

  async endDelete(deprovision: boolean) {
    if (deprovision) {
      await this.lnsService.deprovisionDevice(this.deviceToDelete);
    }
    await this.inventory.delete(this.deviceToDelete);
    this.deleteDeviceModalRef.hide();
    this.dataGrid.reload();
    //this.loadDevices();
  }

  async endDeleteAll(deprovision: boolean) {
    this.devicesToDelete.forEach(async (id) => {
      if (deprovision) {
        await this.lnsService.deprovisionDevice({ id: id });
      }
      await this.inventory.delete(id);
    });
    this.deleteDevicesModalRef.hide();
    this.dataGrid.reload();
    //this.loadDevices();
  }

  async changeType(device: IManagedObject) {
    this.deviceToChange = device;
    this.changeDeviceTypeModalRef = this.modalService.show(
      this.changeDeviceTypeModal,
      { backdrop: true, ignoreBackdropClick: true }
    );
  }

  async changeTypes(selectedItemIds: string[]) {
    this.devicesToChange = selectedItemIds;
    this.changeDevicesTypeModalRef = this.modalService.show(
      this.changeDevicesTypeModal,
      { backdrop: true, ignoreBackdropClick: true }
    );
  }

  async endChangeDeviceType(type: string) {
    await this.inventory.update({
      id: this.deviceToChange.id,
      type: type,
      lora_ns_device_LoRaDevice: {},
    });
    this.changeDeviceTypeModalRef.hide();
    this.dataGrid.reload();
  }

  async endChangeDevicesType(type: string) {
    this.devicesToChange.forEach(async (id) => {
      await this.inventory.update({
        id: id,
        type: type,
        lora_ns_device_LoRaDevice: {},
      });
    });
    this.changeDevicesTypeModalRef.hide();
    this.dataGrid.reload();
  }

  async getDevEUI(device) {
    let extIds = (await this.identityService.list(device.id)).data.filter(
      (extId) => extId.type === "LoRa devEUI"
    );
    let extId = "-";
    if (extIds.length > 0) {
      extId = extIds[0].externalId;
    }
    return extId;
  }

  async loadModels(codec) {
    const response = await this.fetchClient.fetch(
      "service/lora-codec-" + codec + "/models"
    );
    if (response) {
      try {
        this.models[codec] = await response.json();
      } catch (e) {
        this.models[codec] = new Map<string, string>();
      }
    } else {
      this.models[codec] = new Map<string, string>();
    }
  }

  async loadProperties(instance) {
    let props = await this.lnsService.getDeviceProvisioningAdditionalProperties(
      instance
    );
    this.properties = props.properties;
    this.deviceProvisioningAdditionalProperties = props.values;
    console.dir(this.properties);
    console.dir(this.deviceProvisioningAdditionalProperties);
  }

  pdevices = [
    {
      deviceName: "",
      devEUI: "",
      appEUI: "",
      appKey: "",
      codec: "",
      model: "",
    },
  ];

  insertLine(index) {
    this.pdevices.splice(index + 1, 0, {
      deviceName: "",
      devEUI: "",
      appEUI: "",
      appKey: "",
      codec: "",
      model: "",
    });
    Object.assign(this.pdevices[index + 1], this.pdevices[index]);
    console.log(this.pdevices[index]);
    console.log(this.pdevices[index + 1]);
  }

  onPaste(e: ClipboardEvent, i: number) {
    let text: string = e.clipboardData.getData("text");
    console.log(text);
    let lines: string[] = text.trim().split("\r\n");
    if (lines[0].indexOf("\t") > 0) {
      e.stopPropagation();
      e.preventDefault();
      let c: number = i;
      console.log(lines);
      for (let l of lines) {
        let cells = l.split("\t");
        console.log(l);
        //if (this.pdevices.length <= c) {
        //}
        this.pdevices[c].deviceName = cells[0];
        this.pdevices[c].devEUI = cells[1];
        this.pdevices[c].appEUI = cells[2];
        this.pdevices[c].appKey = cells[3];
        if (lines.length - 1 > c - i) {
          this.insertLine(c);
        }
        c++;
      }
      console.log(this.pdevices);
    }
  }

  validateProvisioning() {
    let result = true;
    this.pdevices.forEach((pdevice) => {
      if (!pdevice.deviceName || pdevice.deviceName.length == 0) {
        result = false;
      }
      if (!pdevice.devEUI || !pdevice.devEUI.match("[a-fA-F0-9]{16}")) {
        result = false;
      }
    });

    return result;
  }

  provisionDevices() {
    this.pdevices.forEach((pdevice) => {
      this.addDevice(
        pdevice.deviceName,
        pdevice.devEUI,
        pdevice.appEUI,
        pdevice.appKey,
        "",
        pdevice.codec,
        pdevice.model,
        this.provisionDevice.instanceSelect,
        this.provisionDevice.useGatewayPosition,
        pdevice
      );
    });
  }
}
