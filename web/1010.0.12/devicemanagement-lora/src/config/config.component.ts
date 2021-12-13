import { Component } from "@angular/core";
import { ApplicationService, TenantService } from "@c8y/ngx-components/api";
import { IApplication, FetchClient } from "@c8y/client";

class Asset {
    id: number;
    name: string;
    size: number;
    created_at: string;
    published_at: string;
    status?: string;
    c8yAppId?: string | number;
    installing: boolean = false;
    installedOnCurrentTenant: boolean = true;
    installedOnTenant: string;
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
    constructor(private applicationService: ApplicationService, private fetchClient: FetchClient, private tenantService: TenantService) {
        this.getCurrentTenant();
        this.getReleases();
    }

    releases: Release[];
    currentTenantId: string;

    async getCurrentTenant() {
        this.currentTenantId = (await this.tenantService.current()).data.name;
    }

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

    installedApps: Map<string, IApplication> = new Map<string, IApplication>();

    async getReleases() {
        this.releases = await (await this.fetchClient.fetch('service/github-proxy/releases')).json();
        console.dir(this.releases);
        this.releases.forEach(r => {
            r.assets.forEach(async a => {
                let name: string = a.name.replace(".zip", "");
                console.log("Checking app " + name);
                let app: IApplication;
                if (this.installedApps.has(name)) {
                    app = this.installedApps.get(name);
                }
                else {
                    let apps: IApplication[] = (await this.applicationService.listByName(name)).data;
                    if (apps && apps.length == 1) {
                        app = apps[0];
                        this.installedApps.set(name, app);
                    }
                }
                if (app) {
                    a.installedOnCurrentTenant = app.owner.tenant.id === this.currentTenantId;
                    a.installedOnTenant = app.owner.tenant.id;
                    console.log(app);
                    if (app['github_asset_id']) {
                        if (app['github_asset_id'] == a.id) {
                            a.c8yAppId = app.id;
                            a.status = 'installed';
                        } else {
                            if (!app['github_asset_created_at'] || a.created_at > app['github_asset_created_at']) {
                                a.status = 'older_version_installed';
                            }
                            if (a.created_at < app['github_asset_created_at']) {
                                a.status = 'newer_version_installed';
                            }
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