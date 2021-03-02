/**
* DevExtreme (ui/color_box.d.ts)
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
    template
} from '../core/templates/template';

import dxDropDownEditor, {
    dxDropDownEditorOptions
} from './drop_down_editor/ui.drop_down_editor';

/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface dxColorBoxOptions extends dxDropDownEditorOptions<dxColorBox> {
    /**
     * @docid dxColorBoxOptions.applyButtonText
     * @type string
     * @default "OK"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    applyButtonText?: string;
    /**
     * @docid dxColorBoxOptions.applyValueMode
     * @type Enums.EditorApplyValueMode
     * @default "useButtons"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    applyValueMode?: 'instantly' | 'useButtons';
    /**
     * @docid dxColorBoxOptions.cancelButtonText
     * @type string
     * @default "Cancel"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    cancelButtonText?: string;
    /**
     * @docid dxColorBoxOptions.editAlphaChannel
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    editAlphaChannel?: boolean;
    /**
     * @docid dxColorBoxOptions.fieldTemplate
     * @type template|function
     * @default null
     * @type_function_param1 value:string
     * @type_function_param2 fieldElement:dxElement
     * @type_function_return string|Node|jQuery
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    fieldTemplate?: template | ((value: string, fieldElement: dxElement) => string | Element | JQuery);
    /**
     * @docid dxColorBoxOptions.keyStep
     * @type number
     * @default 1
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    keyStep?: number;
    /**
     * @docid dxColorBoxOptions.value
     * @type string
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    value?: string;
}
/** The ColorBox is a widget that allows an end user to enter a color or pick it out from the drop-down editor. */
export default class dxColorBox extends dxDropDownEditor {
    constructor(element: Element, options?: dxColorBoxOptions)
    constructor(element: JQuery, options?: dxColorBoxOptions)
}

declare global {
interface JQuery {
    dxColorBox(): JQuery;
    dxColorBox(options: "instance"): dxColorBox;
    dxColorBox(options: string): any;
    dxColorBox(options: string, ...params: any[]): any;
    dxColorBox(options: dxColorBoxOptions): JQuery;
}
}
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type Options = dxColorBoxOptions;

/** @deprecated use Options instead */
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type IOptions = dxColorBoxOptions;