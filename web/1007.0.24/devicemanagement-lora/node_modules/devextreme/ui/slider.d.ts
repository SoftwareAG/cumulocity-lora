/**
* DevExtreme (ui/slider.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dxTrackBar, {
    dxTrackBarOptions
} from './track_bar';

import {
    format
} from './widget/ui.widget';

/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface dxSliderOptions extends dxSliderBaseOptions<dxSlider> {
    /**
     * @docid dxSliderOptions.value
     * @type number
     * @default 50
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    value?: number;
}
/** The Slider is a widget that allows an end user to set a numeric value on a continuous range of possible values. */
export default class dxSlider extends dxTrackBar {
    constructor(element: Element, options?: dxSliderOptions)
    constructor(element: JQuery, options?: dxSliderOptions)
}

/** Warning! This type is used for internal purposes. Do not import it directly. */

export interface dxSliderBaseOptions<T> extends dxTrackBarOptions<T> {
    /**
     * @docid dxSliderBaseOptions.activeStateEnabled
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    activeStateEnabled?: boolean;
    /**
     * @docid dxSliderBaseOptions.focusStateEnabled
     * @default true [for](desktop)
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    focusStateEnabled?: boolean;
    /**
     * @docid dxSliderBaseOptions.hoverStateEnabled
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    hoverStateEnabled?: boolean;
    /**
     * @docid dxSliderBaseOptions.keyStep
     * @type number
     * @default 1
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    keyStep?: number;
    /**
     * @docid dxSliderBaseOptions.label
     * @type object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    label?: { format?: format, position?: 'bottom' | 'top', visible?: boolean };
    /**
     * @docid dxSliderBaseOptions.name
     * @type string
     * @hidden false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    name?: string;
    /**
     * @docid dxSliderBaseOptions.showRange
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    showRange?: boolean;
    /**
     * @docid dxSliderBaseOptions.step
     * @type number
     * @default 1
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    step?: number;
    /**
     * @docid dxSliderBaseOptions.tooltip
     * @type object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    tooltip?: { enabled?: boolean, format?: format, position?: 'bottom' | 'top', showMode?: 'always' | 'onHover' };
}

declare global {
interface JQuery {
    dxSlider(): JQuery;
    dxSlider(options: "instance"): dxSlider;
    dxSlider(options: string): any;
    dxSlider(options: string, ...params: any[]): any;
    dxSlider(options: dxSliderOptions): JQuery;
}
}
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type Options = dxSliderOptions;

/** @deprecated use Options instead */
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type IOptions = dxSliderOptions;