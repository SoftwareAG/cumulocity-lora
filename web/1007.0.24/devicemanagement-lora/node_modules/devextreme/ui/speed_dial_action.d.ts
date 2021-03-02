/**
* DevExtreme (ui/speed_dial_action.d.ts)
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
    event
} from '../events';

import Widget, {
    WidgetOptions
} from './widget/ui.widget';

/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface dxSpeedDialActionOptions extends WidgetOptions<dxSpeedDialAction> {
    /**
     * @docid dxSpeedDialActionOptions.icon
     * @type string
     * @default ""
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    icon?: string;
    /**
     * @docid dxSpeedDialActionOptions.index
     * @type number
     * @default 0
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    index?: number;
    /**
     * @docid dxSpeedDialActionOptions.label
     * @type string
     * @default ""
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    label?: string;
    /**
     * @docid dxSpeedDialActionOptions.onClick
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field1 event:event
     * @type_function_param1_field2 component:this
     * @type_function_param1_field3 element:dxElement
     * @type_function_param1_field4 actionElement:dxElement
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onClick?: ((e: { event?: event, component?: dxSpeedDialAction, element?: dxElement, actionElement?: dxElement }) => any);
    /**
     * @docid dxSpeedDialActionOptions.onContentReady
     * @type function
     * @extends Action
     * @type_function_param1 e:object
     * @type_function_param1_field4 actionElement:dxElement
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onContentReady?: ((e: { component?: dxSpeedDialAction, element?: dxElement, model?: any, actionElement?: dxElement }) => any);
    /**
     * @docid dxSpeedDialActionOptions.visible
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    visible?: boolean;
}
/** The SpeedDialAction is a button that performs a custom action. It can be represented by a Floating Action Button (FAB) or a button in a speed dial menu opened with the FAB. */
export default class dxSpeedDialAction extends Widget {
    constructor(element: Element, options?: dxSpeedDialActionOptions)
    constructor(element: JQuery, options?: dxSpeedDialActionOptions)
}

declare global {
interface JQuery {
    dxSpeedDialAction(): JQuery;
    dxSpeedDialAction(options: "instance"): dxSpeedDialAction;
    dxSpeedDialAction(options: string): any;
    dxSpeedDialAction(options: string, ...params: any[]): any;
    dxSpeedDialAction(options: dxSpeedDialActionOptions): JQuery;
}
}
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type Options = dxSpeedDialActionOptions;

/** @deprecated use Options instead */
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type IOptions = dxSpeedDialActionOptions;