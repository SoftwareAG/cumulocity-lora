/**
* DevExtreme (ui/select_box.d.ts)
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
    template
} from '../core/templates/template';

import dxDropDownList, {
    dxDropDownListOptions
} from './drop_down_editor/ui.drop_down_list';

/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface dxSelectBoxOptions<T = dxSelectBox> extends dxDropDownListOptions<T> {
    /**
     * @docid dxSelectBoxOptions.acceptCustomValue
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    acceptCustomValue?: boolean;
    /**
     * @docid dxSelectBoxOptions.fieldTemplate
     * @type template|function
     * @default null
     * @type_function_param1 selectedItem:object
     * @type_function_param2 fieldElement:dxElement
     * @type_function_return string|Node|jQuery
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    fieldTemplate?: template | ((selectedItem: any, fieldElement: dxElement) => string | Element | JQuery);
    /**
     * @docid dxSelectBoxOptions.onCustomItemCreating
     * @extends Action
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 text:string
     * @type_function_param1_field5 customItem:string|object|Promise<any>
     * @action
     * @default function(e) { if(!e.customItem) { e.customItem = e.text; } }
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onCustomItemCreating?: ((e: { component?: T, element?: dxElement, model?: any, text?: string, customItem?: string | any | Promise<any> | JQueryPromise<any> }) => any);
    /**
     * @docid dxSelectBoxOptions.openOnFieldClick
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    openOnFieldClick?: boolean;
    /**
     * @docid dxSelectBoxOptions.placeholder
     * @type string
     * @default "Select"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    placeholder?: string;
    /**
     * @docid dxSelectBoxOptions.showDropDownButton
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    showDropDownButton?: boolean;
    /**
     * @docid dxSelectBoxOptions.showSelectionControls
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    showSelectionControls?: boolean;
    /**
     * @docid dxSelectBoxOptions.valueChangeEvent
     * @type string
     * @default "change"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    valueChangeEvent?: string;
}
/** The SelectBox widget is an editor that allows an end user to select an item from a drop-down list. */
export default class dxSelectBox extends dxDropDownList {
    constructor(element: Element, options?: dxSelectBoxOptions)
    constructor(element: JQuery, options?: dxSelectBoxOptions)
}

declare global {
interface JQuery {
    dxSelectBox(): JQuery;
    dxSelectBox(options: "instance"): dxSelectBox;
    dxSelectBox(options: string): any;
    dxSelectBox(options: string, ...params: any[]): any;
    dxSelectBox(options: dxSelectBoxOptions): JQuery;
}
}
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type Options = dxSelectBoxOptions;

/** @deprecated use Options instead */
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type IOptions = dxSelectBoxOptions;