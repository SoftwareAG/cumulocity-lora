/**
* DevExtreme (ui/range_slider.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    dxElement
} from '../core/element';

import {
    dxSliderBaseOptions
} from './slider';

import dxTrackBar from './track_bar';
/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface dxRangeSliderOptions extends dxSliderBaseOptions<dxRangeSlider> {
    /**
     * @docid dxRangeSliderOptions.end
     * @type number
     * @default 60
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    end?: number;
    /**
     * @docid dxRangeSliderOptions.endName
     * @type string
     * @default ""
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    endName?: string;
    /**
     * @docid dxRangeSliderOptions.onValueChanged
     * @action
     * @extends Action
     * @type_function_param1_field4 start:number
     * @type_function_param1_field5 end:number
     * @type_function_param1_field6 value:array<number>
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onValueChanged?: ((e: { component?: dxRangeSlider, element?: dxElement, model?: any, start?: number, end?: number, value?: Array<number> }) => any);
    /**
     * @docid dxRangeSliderOptions.start
     * @type number
     * @default 40
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    start?: number;
    /**
     * @docid dxRangeSliderOptions.startName
     * @type string
     * @default ""
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    startName?: string;
    /**
     * @docid dxRangeSliderOptions.value
     * @type Array<number>
     * @default [40, 60]
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    value?: Array<number>;
}
/** The RangeSlider is a widget that allows an end user to choose a range of numeric values. */
export default class dxRangeSlider extends dxTrackBar {
    constructor(element: Element, options?: dxRangeSliderOptions)
    constructor(element: JQuery, options?: dxRangeSliderOptions)
}

declare global {
interface JQuery {
    dxRangeSlider(): JQuery;
    dxRangeSlider(options: "instance"): dxRangeSlider;
    dxRangeSlider(options: string): any;
    dxRangeSlider(options: string, ...params: any[]): any;
    dxRangeSlider(options: dxRangeSliderOptions): JQuery;
}
}
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type Options = dxRangeSliderOptions;

/** @deprecated use Options instead */
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type IOptions = dxRangeSliderOptions;