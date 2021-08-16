import { Component } from "@angular/core";
import { ApplicationService } from "@c8y/ngx-components/api";
import { IApplication, ApplicationType, FetchClient } from "@c8y/client";

class Asset {
    id: number;
    name: string;
    size: number;
    created_at: string;
    published_at: string;
    status?: string;
    c8yAppId?: string | number;
    installing: boolean = false;
}

class Release {
    id: number;
    name: string;
    created_at: string;
    published_at: string;
    tag_name: string;
    body: string;
    assets: Asset[];
}
@Component({
    selector: "loraconfig",
    templateUrl: "./config.component.html"
})

export class LoRaConfigComponent {
    constructor(private applicationService: ApplicationService, private fetchClient: FetchClient) {
        this.getReleases();
    }

    releases: Release[];

    async install(asset: Asset) {
        asset.installing = true;
        this.fetchClient.fetch('service/github-proxy/microservice', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(asset)
        }).then(() => {
            this.getReleases();
        });
    }

    async delete(asset: Asset) {
        asset.installing = true;
        this.applicationService.delete(asset.c8yAppId).then(() => this.getReleases());
    }

    async getReleases() {
        this.releases = await (await this.fetchClient.fetch('service/github-proxy/releases')).json();
        console.dir(this.releases);
        this.releases.forEach(r => {
            r.assets.forEach(async a => {
                let name: string = a.name.replace(".zip", "");
                console.log("Checking app " + name);
                let apps: IApplication[] = (await this.applicationService.listByName(name)).data;
                if (apps && apps.length == 1) {
                    console.log(apps[0]);
                    if (apps[0]['github_asset_id']) {
                        if (apps[0]['github_asset_id'] == a.id) {
                            a.c8yAppId = apps[0].id;
                            a.status = 'installed';
                        } else {
                            if (!apps[0]['github_asset_created_at'] || a.created_at > apps[0]['github_asset_created_at'])
                            a.status = 'older_version_installed';
                        }
                    } else {
                        a.status = 'different_version_installed'
                    }
                } else {
                    a.status = 'not_installed';
                }
            })
        })
    }
}