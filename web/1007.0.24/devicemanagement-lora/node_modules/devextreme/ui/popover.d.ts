/**
* DevExtreme (ui/popover.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    animationConfig
} from '../animation/fx';

import {
    positionConfig
} from '../animation/position';

import '../jquery_augmentation';

import {
    event
} from '../events';

import dxPopup, {
    dxPopupAnimation,
    dxPopupOptions
} from './popup';

/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface dxPopoverOptions<T = dxPopover> extends dxPopupOptions<T> {
    /**
     * @docid dxPopoverOptions.animation
     * @type object
     * @default { show: { type: "fade", from: 0, to: 1 }, hide: { type: "fade", to: 0 } }
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    animation?: dxPopoverAnimation;
    /**
     * @docid dxPopoverOptions.closeOnOutsideClick
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    closeOnOutsideClick?: boolean | ((event: event) => boolean);
    /**
     * @docid dxPopoverOptions.height
     * @type number|string|function
     * @default "auto"
     * @type_function_return number|string
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    height?: number | string | (() => number | string);
    /**
     * @docid dxPopoverOptions.hideEvent
     * @type Object|string
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    hideEvent?: { delay?: number, name?: string } | string;
    /**
     * @docid dxPopoverOptions.position
     * @type Enums.Position|positionConfig
     * @default 'bottom'
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    position?: 'bottom' | 'left' | 'right' | 'top' | positionConfig;
    /**
     * @docid dxPopoverOptions.shading
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    shading?: boolean;
    /**
     * @docid dxPopoverOptions.showEvent
     * @type Object|string
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    showEvent?: { delay?: number, name?: string } | string;
    /**
     * @docid dxPopoverOptions.showTitle
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    showTitle?: boolean;
    /**
     * @docid dxPopoverOptions.target
     * @type string|Node|jQuery
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    target?: string | Element | JQuery;
    /**
     * @docid dxPopoverOptions.width
     * @type number|string|function
     * @default "auto"
     * @type_function_return number|string
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    width?: number | string | (() => number | string);
}
/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface dxPopoverAnimation extends dxPopupAnimation {
    /**
     * @docid dxPopoverOptions.animation.hide
     * @type animationConfig
     * @default { type: "fade", to: 0 }
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    hide?: animationConfig;
    /**
     * @docid dxPopoverOptions.animation.show
     * @type animationConfig
     * @default { type: "fade", from: 0, to: 1 }
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    show?: animationConfig;
}
/** The Popover is a widget that shows notifications within a box with an arrow pointing to a specified UI element. */
export default class dxPopover extends dxPopup {
    constructor(element: Element, options?: dxPopoverOptions)
    constructor(element: JQuery, options?: dxPopoverOptions)
    show(): Promise<boolean> & JQueryPromise<boolean>;
    /**
     * @docid dxPopoverMethods.show
     * @publicName show(target)
     * @param1 target:string|Node|jQuery
     * @return Promise<boolean>
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    show(target: string | Element | JQuery): Promise<boolean> & JQueryPromise<boolean>;
}

declare global {
interface JQuery {
    dxPopover(): JQuery;
    dxPopover(options: "instance"): dxPopover;
    dxPopover(options: string): any;
    dxPopover(options: string, ...params: any[]): any;
    dxPopover(options: dxPopoverOptions): JQuery;
}
}
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type Options = dxPopoverOptions;

/** @deprecated use Options instead */
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type IOptions = dxPopoverOptions;