import { Injectable } from '@angular/core';
import { NavigatorNode, NavigatorNodeFactory, _ } from '@c8y/ngx-components';

@Injectable()
export class LoraNavigationFactory implements NavigatorNodeFactory {
  nav: NavigatorNode[] = [];
  // Implement the get()-method, otherwise the ExampleNavigationFactory
  // implements the NavigatorNodeFactory interface incorrectly (!)
  constructor() {

    let loraDevice: NavigatorNode = new NavigatorNode({
      label: _('LoRa devices'),
      icon: 'c8y-device',
      path: '/lora-device',
      priority: 0,
      routerLinkExact: false
    });

    let loraNS: NavigatorNode = new NavigatorNode({
      label: _('LoRa network servers'),
      icon: 'c8y-saas',
      path: '/lns',
      priority: 1,
      routerLinkExact: false
    });

    let loraNode: NavigatorNode = new NavigatorNode({
      label: _('LoRa'),
      icon: 'wifi',
      name: 'lora',
      children: [loraDevice, loraNS],
      priority: 2,
      routerLinkExact: false
    });
    
    this.nav.push(loraNode);
  }

  get() {
    return this.nav;
  }
}
