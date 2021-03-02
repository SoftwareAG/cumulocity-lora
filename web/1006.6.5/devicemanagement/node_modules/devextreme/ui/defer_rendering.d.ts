/**
* DevExtreme (ui/defer_rendering.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    animationConfig
} from '../animation/fx';

import '../jquery_augmentation';

import {
    dxElement
} from '../core/element';

import Widget, {
    WidgetOptions
} from './widget/ui.widget';

/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface dxDeferRenderingOptions extends WidgetOptions<dxDeferRendering> {
    /**
     * @docid dxDeferRenderingOptions.animation
     * @type animationConfig
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    animation?: animationConfig;
    /**
     * @docid dxDeferRenderingOptions.onRendered
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onRendered?: ((e: { component?: dxDeferRendering, element?: dxElement, model?: any }) => any);
    /**
     * @docid dxDeferRenderingOptions.onShown
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onShown?: ((e: { component?: dxDeferRendering, element?: dxElement, model?: any }) => any);
    /**
     * @docid dxDeferRenderingOptions.renderWhen
     * @type Promise<void> | bool
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    renderWhen?: Promise<void> | JQueryPromise<void> | boolean;
    /**
     * @docid dxDeferRenderingOptions.showLoadIndicator
     * @type bool
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    showLoadIndicator?: boolean;
    /**
     * @docid dxDeferRenderingOptions.staggerItemSelector
     * @type string
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    staggerItemSelector?: string;
}
/** The DeferRendering is a widget that waits for its content to be ready before rendering it. While the content is getting ready, the DeferRendering displays a loading indicator. */
export default class dxDeferRendering extends Widget {
    constructor(element: Element, options?: dxDeferRenderingOptions)
    constructor(element: JQuery, options?: dxDeferRenderingOptions)
}

declare global {
interface JQuery {
    dxDeferRendering(): JQuery;
    dxDeferRendering(options: "instance"): dxDeferRendering;
    dxDeferRendering(options: string): any;
    dxDeferRendering(options: string, ...params: any[]): any;
    dxDeferRendering(options: dxDeferRenderingOptions): JQuery;
}
}
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type Options = dxDeferRenderingOptions;

/** @deprecated use Options instead */
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type IOptions = dxDeferRenderingOptions;