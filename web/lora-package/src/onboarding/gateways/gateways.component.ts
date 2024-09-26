import {
    ActionControl,
    BuiltInActionType,
    BulkActionControl,
    Column,
    ColumnDataRecordClassName,
    Pagination,
    DataGridComponent, DataSourceModifier, FilteringActionType, ServerSideDataResult, _,
    DeviceStatusComponent
} from '@c8y/ngx-components';
import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { FetchClient, InventoryService, IdentityService, IManagedObject, QueriesUtil } from '@c8y/client';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FilteringModifier } from '@c8y/ngx-components/core/data-grid/column/filtering-form-renderer';
import { assign, transform } from 'lodash-es';
import { LnsService } from '../../../src/service/LnsService';

/**
 * The GatewaysComponent defines a few methods that can be
 * used to get, add and delete managedObjects as gateways.
 * You can also create a gatewayService (this would be a cleaner way)
 * that handles all these things and more. Then inject the new service
 * via constructor into this component.
 * For simple demonstration purpose we went without a service !
 */
@Component({
    selector: 'gateways',
    templateUrl: './gateways.component.html'
})
export class LoraGatewaysComponent {
    gateways: IManagedObject[];
    lnsProxies: IManagedObject[];
    lnsInstances: IManagedObject[];
    proxyMap: {};
    instanceMap: {};
    ids: {};
    informationText: string;
    fileContent: { name: string, id: string, type: string, additionalProperties: any }[];
    gatewayToDelete: IManagedObject;
    gatewaysToDelete : string[];
    properties: [{
        name: string;
        label: string;
        required: boolean;
        type: string;
        url: string;
        values: Map<string, string>;
    }?];
    bulkProperties: [{
        name: string;
        label: string;
        required: boolean;
        type: string;
        url: string;
        values: Map<string, string>;
    }?];
    gatewayProvisioningAdditionalProperties = {};
    @ViewChild("deleteGatewayModal", { static: false })
    deleteGatewayModal: TemplateRef<any>;
    deleteGatewayModalRef: BsModalRef;
    @ViewChild("deleteGatewaysModal", { static: false })
    deleteGatewaysModal: TemplateRef<any>;
    deleteGatewaysModalRef: BsModalRef;
    queriesUtil: QueriesUtil;
    columns: Column[] = [
        {
            name: 'status',
            header: 'Status',
            path: 'c8y_Availability.status'
        },
        { name: 'id', header: 'GW Id', path: 'id' },
        {
            name: 'name',
            header: 'Name',
            path: 'name',
            cellCSSClassName: ColumnDataRecordClassName.Header,
            filterable: true
        },
        {
            name: 'type',
            header: 'Type',
            path: 'c8y_Hardware.model'
        },
        { name: 'lnstype', header: 'LNS Type', path: 'lnsConnectorId' },
        { name: 'lnsname', header: 'LNS Name', path: 'lnsConnectorId' }
    ];
    pagination: Pagination = {
        pageSize: 30,
        currentPage: 1
    };
    actionControls: ActionControl[] = [
        { type: BuiltInActionType.Delete, callback: item => this.delete(<IManagedObject>item) }
    ];
    bulkActionControls: BulkActionControl[] = [
        { type: BuiltInActionType.Delete, callback: selectedItemIds => this.deleteAll(selectedItemIds) }
    ];

    @Output() onColumnsChange: EventEmitter<Column[]> = new EventEmitter<
        Column[]
    >();
    @Output() onGatewayQueryStringChange: EventEmitter<string> = new EventEmitter<string>();

    serverSideDataCallback: any;

    provisionGateway: any = {};
    bulkProvisionGateways: any = {};

    async onDataSourceModifier(
        dataSourceModifier: DataSourceModifier
    ): Promise<ServerSideDataResult> {
        const { res, data, paging } = await this.loadGateways(dataSourceModifier.columns, dataSourceModifier.pagination);
        const filteredSize: number = await this.getGatewaysCount(dataSourceModifier.columns, dataSourceModifier.pagination);
        const size: number = await this.getGatewaysTotal();

        this.onColumnsChange.emit(dataSourceModifier.columns);
        this.onGatewayQueryStringChange.emit(
            this.getGatewayQueryString(dataSourceModifier.columns)
        );

        return {
            res,
            data,
            paging,
            filteredSize,
            size
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

    @ViewChild(DataGridComponent, { static: true })
    dataGrid: DataGridComponent;

    constructor(private inventory: InventoryService, private identityService: IdentityService, private fetchClient: FetchClient, private modalService: BsModalService, private lnsService: LnsService) {
        // _ annotation to mark this string as translatable string.
        this.informationText = _('Ooops! It seems that there is no gateway to display.');
        this.serverSideDataCallback = this.onDataSourceModifier.bind(this);
        this.queriesUtil = new QueriesUtil();
        this.init();
    }

    async init() {
        await this.loadProxies();
        await this.loadInstances()
    }

    getGatewayQueryString(columns: Column[]): string {
        console.dir(this.getQueryObj(columns));
        return this.queriesUtil.buildQuery(this.getQueryObj(columns));
    }

    private getGatewaysFilters(columns: Column[], pagination: Pagination) {
        let query = this.getGatewayQueryString(columns)
        console.dir(query);
        return {
            q: this.getGatewayQueryString(columns),
            pageSize: pagination.pageSize,
            currentPage: pagination.currentPage,
            withTotalPages: true
        };
    }

    log(o) {
        console.dir(o);
    }

    private getQueryObj(columns: Column[]): any {
        return transform(columns, (query, column) => this.extendQueryByColumn(query, column), {
            __filter: {
                __or: [
                    {__has: 'lora_ns_gateway_LoRaGateway'},
                    {type: 'c8y_LoRaGateway'}
                ]
            },
            __orderby: []
        });
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

    async getGateways(columns: Column[], pagination: Pagination) {
        const filters = {
            ...this.getGatewaysFilters(columns, pagination),
            withParents: true
        };
        return this.inventory.list(filters);
    }

    async getGatewaysCount(columns: Column[], pagination: Pagination) {
        const filters = {
            ...this.getGatewaysFilters(columns, pagination),
            pageSize: 1,
            currentPage: 1
        };
        return (await this.inventory.list(filters)).paging.totalPages;
    }

    async getGatewaysTotal(): Promise<number> {
        const filters = {
            fragmentType: 'c8y_IsDevice',
            query: 'has(c8y_IsDevice) and (has(lora_ns_gateway_LoRaGateway) or type eq c8y_LoRaGateway)',
            pageSize: 1,
            withTotalPages: true
        };
        return (await this.inventory.list(filters)).paging.totalPages;
    }
    // Promise-based usage of InventoryService.
    async loadGateways(columns: Column[], pagination: Pagination) {
        let result = await this.getGateways(columns, pagination);
        this.gateways = result.data;
        this.ids = {};
        result.data.forEach(async gateway => this.ids[gateway.id] = await this.lnsService.getGWId(gateway));
        return result;
    }

    async loadProxies() {
        const { data, res, paging } = await this.inventory.list(this.lnsProxyFilter);
        this.lnsProxies = data;
        this.proxyMap = {};
        data.forEach(proxy => this.proxyMap[proxy.lnsType] = proxy);
        //console.log("Proxy Map:");
        //console.log(this.proxyMap);
    }

    async loadInstances() {
        const { data, res, paging } = await this.inventory.list(this.instanceFilter);
        this.lnsInstances = data;
        this.instanceMap = {};
        data.forEach(instance => this.instanceMap[instance.id] = instance);
        //console.log("Instance Map:");
        //console.log(this.instanceMap);
    }

    addGatewayFromForm() {
        this.addGateway(this.provisionGateway.gatewayName, this.provisionGateway.gwEUI, this.provisionGateway.type, this.provisionGateway.instanceSelect, this.gatewayProvisioningAdditionalProperties);
    }

    // Add a managedObject (as gateway) to the database.
    async addGateway(name: string, id: string, type: string, instance: string, additionalProperties) {

        if (instance) {
            this.lnsService.provisionGateway({
                name,
                gwEUI: id.toLowerCase(),
                type: type
            }, instance, additionalProperties).then(data => console.log(data))
        }
        this.dataGrid.reload();
        //this.loadGateways();
    }

    delete(gateway: IManagedObject) {
        this.gatewayToDelete = gateway;
        this.deleteGatewayModalRef = this.modalService.show(this.deleteGatewayModal, { backdrop: true, ignoreBackdropClick: true });
    }

    deleteAll(gateways: string[]) {
        this.gatewaysToDelete = gateways;
        this.deleteGatewaysModalRef = this.modalService.show(this.deleteGatewaysModal, { backdrop: true, ignoreBackdropClick: true });
    }

    async endDelete(deprovision: boolean) {
        if (deprovision) {
            await this.lnsService.deprovisionGateway(this.gatewayToDelete);
        }
        await this.inventory.delete(this.gatewayToDelete);
        this.deleteGatewayModalRef.hide();
        this.dataGrid.reload();
        //this.loadGateways();
    }

    async endDeleteAll(deprovision: boolean) {
        this.gatewaysToDelete.forEach(async id => {
            if (deprovision) {
                await this.lnsService.deprovisionGateway({id: id});
            }
            await this.inventory.delete({id: id});
        });
        this.deleteGatewaysModalRef.hide();
        this.dataGrid.reload();
        //this.loadGateways();
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
                let headers = lines[0].trim().split(";");
                lines.splice(1).forEach(line => {
                    if (line != "\n" && line.trim().length > 0) {
                        let row: { name: string, id: string, type: string, additionalProperties: any } = {} as { name: string, id: string, type: string, additionalProperties: any };
                        row.additionalProperties = {};
                        let lineContent = line.trim().split(";");
                        lineContent.forEach((col, i) => {
                            if (["name", "id", "type"].indexOf(headers[i]) > -1) {
                                row[headers[i]] = col;
                            }
                            else {
                                row.additionalProperties[headers[i]] = col;
                            }
                        })
                        this.fileContent.push(row);
                    }
                });
                console.dir(this.fileContent);
            }
        }
    }

    addGateways() {
        this.fileContent.forEach(row => {
            console.log("Will add gateway: " + row);
            this.addGateway(row.name, row.id, row.type, this.bulkProvisionGateways.instanceSelect, row.additionalProperties);
        })
    }

    async loadGatewayProvisioningAdditionalProperties(instance: string): Promise<{
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
        console.dir(instance);
        console.dir(lnsInstance);
        const response = await this.fetchClient.fetch('service/lora-ns-' + lnsInstance.lnsType + '/gatewayProvisioningAdditionalProperties');
        props.properties = await response.json();
        if (props.properties && props.properties.forEach) {
            console.log(props.properties);
            props.properties.forEach(async p => {
                if (p.type === "LIST") {
                    const values = await this.fetchClient.fetch('service/lora-ns-' + lnsInstance.lnsType + "/" + instance + p.url, {
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

    async loadProperties() {
        let props = await this.loadGatewayProvisioningAdditionalProperties(this.provisionGateway.instanceSelect);
        this.properties = props.properties;
        this.gatewayProvisioningAdditionalProperties = props.values;
        console.dir(this.properties);
        console.dir(this.gatewayProvisioningAdditionalProperties);
    }

    bulkGatewayProvisioningAdditionalProperties: any;

    async loadBulkProperties(instance) {
        let props = await this.loadGatewayProvisioningAdditionalProperties(instance);
        this.bulkProperties = props.properties;
        this.bulkGatewayProvisioningAdditionalProperties = props.values;
    }
}
