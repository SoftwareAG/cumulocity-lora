import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule as ngRouterModule } from "@angular/router";
import {
  BootstrapComponent,
  CoreModule,
  RouterModule,
} from "@c8y/ngx-components";
import { CockpitDashboardModule } from "@c8y/ngx-components/context-dashboard";
import { BsModalRef } from "ngx-bootstrap/modal";
import { LoraPluginModule } from "./plugin/lora-plugin.module";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    ngRouterModule.forRoot([], { enableTracing: false, useHash: true }),
    RouterModule.forRoot(),
    CoreModule.forRoot(),
    LoraPluginModule,
    CockpitDashboardModule,
  ],
  providers: [BsModalRef],
  bootstrap: [BootstrapComponent],
})
export class AppModule {}
