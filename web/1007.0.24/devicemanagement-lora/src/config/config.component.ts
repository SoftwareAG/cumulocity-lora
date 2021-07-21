import { Component } from "@angular/core";
import { ApplicationService } from "@c8y/ngx-components/api";
import { IApplication, ApplicationType } from "@c8y/client";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: "loraconfig",
    templateUrl: "./config.component.html"
})

export class LoRaConfigComponent {
    constructor(private applicationService: ApplicationService, private sanitizer: DomSanitizer) {

    }

    async createApp(name: string) {
        const { data, res } = await this.applicationService.create({
            name: name,
            type: ApplicationType.MICROSERVICE,
            key: name + '-key'
        });
        console.log(data);
        let response = await fetch("https://github.com/SoftwareAG/cumulocity-lora/releases/download/v0.1/lora-codec-nke.zip", { mode: 'cors', method: 'GET', headers: {"Access-Control-Allow-Origin": "*"} });
        console.log(response);
        let arrayBuffer = await response.arrayBuffer();
        this.applicationService.binary(data).upload(arrayBuffer, "lora-codec-nke.zip");
    }
}