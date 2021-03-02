/**
* DevExtreme (ui/progress_bar.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../jquery_augmentation';

import {
    dxElement
} from '../core/element';

import {
    event
} from '../events';

import dxTrackBar, {
    dxTrackBarOptions
} from './track_bar';

/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface dxProgressBarOptions extends dxTrackBarOptions<dxProgressBar> {
    /**
     * @docid dxProgressBarOptions.onComplete
     * @extends Action
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 jQueryEvent:jQuery.Event:deprecated(event)
     * @type_function_param1_field5 event:event
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onComplete?: ((e: { component?: dxProgressBar, element?: dxElement, model?: any, jQueryEvent?: JQueryEventObject, event?: event }) => any);
    /**
     * @docid dxProgressBarOptions.showStatus
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    showStatus?: boolean;
    /**
     * @docid dxProgressBarOptions.statusFormat
     * @type string|function
     * @default function(ratio, value) { return "Progress: " + Math.round(ratio * 100) + "%" }
     * @type_function_param1 ratio:number
     * @type_function_param2 value:number
     * @type_function_return string
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    statusFormat?: string | ((ratio: number, value: number) => string);
    /**
     * @docid dxProgressBarOptions.value
     * @type number
     * @default 0
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    value?: number;
}
/** The ProgressBar is a widget that shows current progress. */
export default class dxProgressBar extends dxTrackBar {
    constructor(element: Element, options?: dxProgressBarOptions)
    constructor(element: JQuery, options?: dxProgressBarOptions)
}

declare global {
interface JQuery {
    dxProgressBar(): JQuery;
    dxProgressBar(options: "instance"): dxProgressBar;
    dxProgressBar(options: string): any;
    dxProgressBar(options: string, ...params: any[]): any;
    dxProgressBar(options: dxProgressBarOptions): JQuery;
}
}
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type Options = dxProgressBarOptions;

/** @deprecated use Options instead */
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type IOptions = dxProgressBarOptions;