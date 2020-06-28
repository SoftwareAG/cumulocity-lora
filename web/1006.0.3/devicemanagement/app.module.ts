import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule as NgRouterModule } from '@angular/router';
import { UpgradeModule as NgUpgradeModule } from '@angular/upgrade/static';
import { CoreModule, RouterModule, HOOK_NAVIGATOR_NODES, HOOK_ONCE_ROUTE, ViewContext } from '@c8y/ngx-components';
import { UpgradeModule, HybridAppModule, UPGRADE_ROUTES } from '@c8y/ngx-components/upgrade';
import { AssetsNavigatorModule } from '@c8y/ngx-components/assets-navigator';
import { OpcuaProtocolModule } from '@c8y/ngx-components/protocol-opcua';
import { LoraNavigationFactory } from './factories/Navigation';
import { GroupsComponent } from './src/groups/groups.component';
import { DevicesComponent } from './src/devices/devices.component';
import { LoraGuard } from './src/devices/lora.guard';
import { LoraDevicesComponent } from './src/onboarding/devices/devices.component';
import { LNSComponent } from './src/onboarding/lns/lns.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

@NgModule({
  declarations: [GroupsComponent, DevicesComponent, LoraDevicesComponent, LNSComponent],
  entryComponents: [GroupsComponent, DevicesComponent],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(),
    NgRouterModule.forRoot([
      {
        path: 'lora-device',
        component: LoraDevicesComponent
      },
      {
        path: 'lns',
        component: LNSComponent
      },
      { path: 'lora_command', component: GroupsComponent },
      ...UPGRADE_ROUTES,
    ], { enableTracing: false, useHash: true }),
    CoreModule.forRoot(),
    AssetsNavigatorModule.config({
      smartGroups: true
    }),
    OpcuaProtocolModule,
    NgUpgradeModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),
    // Upgrade module must be the last
    UpgradeModule
  ],

  providers: [
    LoraGuard,
    { provide: HOOK_NAVIGATOR_NODES, useClass: LoraNavigationFactory, multi: true },
    { 
      provide: HOOK_ONCE_ROUTE,          // 1.
      useValue: [{                       // 2.
        context: ViewContext.Group,     // 3.
        path: 'health',                   // 4.
        component: GroupsComponent,       // 5.
        label: 'Health',                  // 6.
        priority: 100,
        icon: 'heart'
      }], 
      multi: true
    },{ 
      provide: HOOK_ONCE_ROUTE,          // 1.
      useValue: [{                       // 2.
        context: ViewContext.Device,     // 3.
        path: 'lora_command',                   // 4.
        component: DevicesComponent,       // 5.
        label: 'LoRa',                  // 6.
        priority: 100,
        icon: 'c8y-energy',
        canActivate: [LoraGuard]
      }], 
      multi: true
    }
  ]
})

export class AppModule extends HybridAppModule {
  constructor(protected upgrade: NgUpgradeModule) {
    super();
  }
}
