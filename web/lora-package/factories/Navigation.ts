import { Injectable } from "@angular/core";
import { NavigatorNode, NavigatorNodeFactory, _ } from "@c8y/ngx-components";

@Injectable()
export class LoraNavigationFactory implements NavigatorNodeFactory {
  nav: NavigatorNode[] = [];
  // Implement the get()-method, otherwise the ExampleNavigationFactory
  // implements the NavigatorNodeFactory interface incorrectly (!)
  constructor() {
    let loraDevice: NavigatorNode = new NavigatorNode({
      label: _("LoRa devices"),
      icon: "sensor",
      path: "/lora-device",
      priority: 0,
      routerLinkExact: false,
    });

    let loraGateway: NavigatorNode = new NavigatorNode({
      label: _("LoRa gateways"),
      icon: "wifi",
      path: "/lora-gateway",
      priority: 0,
      routerLinkExact: false,
    });

    let loraNS: NavigatorNode = new NavigatorNode({
      label: _("LoRa network servers"),
      icon: "c8y-saas",
      path: "/lns",
      priority: 1,
      routerLinkExact: false,
    });

    let loraCodecs: NavigatorNode = new NavigatorNode({
      label: _("Custom codecs"),
      icon: "c8y-business-rules",
      path: "/codecs",
      priority: 2,
      routerLinkExact: false,
    });

    let loraConfig: NavigatorNode = new NavigatorNode({
      label: _("Config"),
      icon: "c8y-administration",
      path: "/config",
      priority: 2,
      routerLinkExact: false,
    });

    let loraSimulator: NavigatorNode = new NavigatorNode({
      label: _("Simulator"),
      icon: "c8y-simulator",
      path: "/lorasimulator",
      priority: 2,
      routerLinkExact: false,
    });

    let loraNode: NavigatorNode = new NavigatorNode({
      label: _("LoRa"),
      icon: "wifi",
      name: "lora",
      children: [
        loraDevice,
        loraGateway,
        loraNS,
        loraCodecs,
        loraConfig,
        loraSimulator,
      ],
      priority: 2,
      routerLinkExact: false,
    });

    this.nav.push(loraNode);
  }

  get() {
    return this.nav;
  }
}
