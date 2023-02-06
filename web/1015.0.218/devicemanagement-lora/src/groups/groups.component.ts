import { _ } from '@c8y/ngx-components';
import { Component, OnInit } from '@angular/core';
import { FetchClient, InventoryService, IManagedObject, } from '@c8y/client';
import { ActivatedRoute } from '@angular/router';
import Chart from "devextreme/viz/chart";

/**
 * The DevicesComponent defines a few methods that can be
 * used to get, add and delete managedObjects as devices.
 * You can also create a deviceService (this would be a cleaner way)
 * that handles all these things and more. Then inject the new service
 * via constructor into this component.
 * For simple demonstration purpose we went without a service !
 */
@Component({
    selector: 'groups',
    templateUrl: './groups.component.html',
    styleUrls: ['../../node_modules/ngx-bootstrap/datepicker/bs-datepicker.css']
})
export class GroupsComponent implements OnInit {
    async ngOnInit(): Promise<void> {
        // You can create the Chart widget using the following code.
        // Read more at https://js.devexpress.com/Documentation/Guide/Widgets/Common/Advanced/3rd-Party_Frameworks_Integration_API/#Create_and_Configure_a_Widget.
        this.loadDevices();
        this.loadMeasurements();

        this.chart = new Chart(document.getElementById("chartContainer"), {
            legend: {
                horizontalAlignment: "center",
                verticalAlignment: "bottom",
                itemTextPosition: "right"
            },
            series: [{
                type: "line",
                name: "Aggregated RSSI",
                argumentField: "time",
                valueField: "rssi",
                axis: "dBm"
            },
            {
                type: "line",
                name: "Aggregated SNR",
                argumentField: "time",
                valueField: "snr",
                axis: "dB"
            },
            {
                type: "line",
                name: "Aggregated Noise",
                argumentField: "time",
                valueField: "noise",
                axis: "dBm"
            },
            {
                type: "line",
                name: "Aggregated Signal",
                argumentField: "time",
                valueField: "signal",
                axis: "dBm"
            }],
            tooltip: {
                enabled: true,
                customizeTooltip: function(arg) {
                    return {
                        text: arg.argumentText + ": " + arg.valueText
                    };
                }
            },
            loadingIndicator: {
                show: true,
                enabled: true
            },
            commonAxisSettings: {
                label: {
                    overlappingBehavior: "rotate",
                    rotationAngle: 30
                }
            },
            valueAxis: [{
                name: "dBm",
                title: {
                    text: "RSSI, Noise and Signl in dBm"
                }
            }, {
                name: "dB",
                title: {
                    text: "SNR in dB"
                }
            }]
        });
    }
    devices: IManagedObject[];
    lnss = {};
    codecs = {};
    informationText: string;
    dateFrom: Date = new Date();
    dateTo: Date = new Date();
    dates: Date[];
    bsConfig = {containerClass: "theme-orange", dateInputFormat: 'DD-MM-YYYY'};
    showMeridian = false;
    showSpinners = false;
    battery = 100;
    color = "green";
    chart: Chart;

    // The filter object will add query parameters
    // to the request which is made by the service.
    private filter: object = {
        fragmentType: 'c8y_IsDevice',
        type: 'c8y_LoRaDevice',
        // paging information will be a part of the response now
        withTotalPages: true,
        pageSize: 100
    };

    constructor(public route: ActivatedRoute, private inventory: InventoryService, private fetch: FetchClient) {
        console.log(route.snapshot.parent.data.contextData.id);
        // _ annotation to mark this string as translatable string.
        this.informationText = _('Ooops! It seems that there is no device to display.');
        this.dateFrom.setDate(this.dateTo.getDate() - 1);
        this.dates = [this.dateFrom, this.dateTo];
        console.log(this.dateFrom);
        console.log(this.dateTo);
    }

    // Promise-based usage of InventoryService.
    async loadDevices() {
        const { data, res, paging } = await this.inventory.list(this.filter);
        this.devices = data;
        //console.log(this.devices);
    }

    async loadMeasurements() {
        let groupId: string = this.route.snapshot.parent.data.contextData.id;
        let response = await this.fetch.fetch('service/measurement-aggregator/mean?groupId=' + groupId + '&fromDate=' + this.dateFrom.toISOString() + '&toDate=' + this.dateTo.toISOString() + '&interval=3600000&fragmentType=c8y_SignalStrength&series=rssi,snr,noise,signal');
        let battery = await this.fetch.fetch('service/measurement-aggregator/mean?groupId=' + groupId + '&fromDate=' + this.dateFrom.toISOString() + '&toDate=' + this.dateTo.toISOString() + '&interval=3600000&fragmentType=c8y_Battery&series=level');
        this.chart.option("dataSource", await response.json());
        let batteries = await battery.json();
        this.battery = batteries[batteries.length - 1].level;
        this.color = this.battery>75 ? 'green' : this.battery>50 ? 'yellow' : this.battery>25 ? 'orange' : 'red';
    }
}
