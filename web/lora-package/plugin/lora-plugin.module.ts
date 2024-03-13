import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule as NgRouterModule } from "@angular/router";
import {
  CoreModule,
  FormsModule,
  ViewContext,
  hookNavigator,
  hookRoute,
} from "@c8y/ngx-components";

import { UPGRADE_ROUTES } from "@c8y/ngx-components/upgrade";

import { FormlyModule } from "@ngx-formly/core";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { ModalModule } from "ngx-bootstrap/modal";
import { PopoverModule } from "ngx-bootstrap/popover";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { MonacoEditorModule } from "ngx-monaco-editor-v2";
import { LoRaConfigComponent } from "../src/config/config.component";
import { DevicesComponent } from "../src/devices/devices.component";
import { LoraGuard } from "../src/devices/lora.guard";
import { PanelWrapperComponent } from "../src/devices/panel-wrapper.component";
import { GroupsComponent } from "../src/groups/groups.component";
import { LoraCodecsComponent } from "../src/onboarding/codecs/codecs.component";
import { RepeatTypeComponent } from "../src/onboarding/codecs/repeat-section.type";
import {
  LoraDevicesComponent,
  PropertyPipe,
} from "../src/onboarding/devices/devices.component";
import { LoraGatewaysComponent } from "../src/onboarding/gateways/gateways.component";
import { LNSEditComponent } from "../src/onboarding/lns/lns-edit.component";
import { LNSComponent } from "../src/onboarding/lns/lns.component";
import { SimulatorComponent } from "../src/simulator/simulator.component";

import { LoraNavigationFactory } from "../factories/Navigation";
import { SelectTypeComponent } from "../src/onboarding/codecs/select.type";
import { PropertyEditorComponent } from "../src/onboarding/devices/property-editor.component";
import { monacoConfig } from "./monacoConfig";

@NgModule({
  declarations: [
    GroupsComponent,
    DevicesComponent,
    LoraDevicesComponent,
    LoraGatewaysComponent,
    LNSComponent,
    LNSEditComponent,
    LoraCodecsComponent,
    LoRaConfigComponent,
    PropertyPipe,
    RepeatTypeComponent,
    SelectTypeComponent,
    PanelWrapperComponent,
    SimulatorComponent,
    PropertyEditorComponent,
  ],
  entryComponents: [GroupsComponent, DevicesComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgRouterModule.forChild([
      {
        path: "lora-device",
        component: LoraDevicesComponent,
      },
      {
        path: "lora-gateway",
        component: LoraGatewaysComponent,
      },
      {
        path: "lns",
        component: LNSComponent,
      },
      {
        path: "lns/:lnsid",
        component: LNSEditComponent,
      },
      {
        path: "codecs",
        component: LoraCodecsComponent,
      },
      {
        path: "config",
        component: LoRaConfigComponent,
      },
      {
        path: "lorasimulator",
        component: SimulatorComponent,
      },
      { path: "health", component: GroupsComponent },
      { path: "lora_command", component: DevicesComponent },
      ...UPGRADE_ROUTES,
    ]),
    CoreModule,
    MonacoEditorModule.forRoot(monacoConfig),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule,
    FormlyModule.forRoot({
      types: [
        { name: "repeat", component: RepeatTypeComponent },
        { name: "select", component: SelectTypeComponent },
      ],
      wrappers: [{ name: "panel", component: PanelWrapperComponent }],
    }),
  ],
  exports: [],
  providers: [
    hookNavigator(new LoraNavigationFactory().get()),
    hookRoute([
      {
        context: ViewContext.Group,
        path: "health",
        component: GroupsComponent,
        label: "Health",
        priority: 100,
        icon: "heart",
      },
      {
        context: ViewContext.Device,
        path: "lora_command",
        component: DevicesComponent,
        label: "LoRa",
        priority: 100,
        icon: "c8y-energy",
        canActivate: [LoraGuard],
      },
    ]),
  ],
})
export class LoraPluginModule {}
