/**
* DevExtreme (ui/drop_down_box.d.ts)
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

import DataSource from '../data/data_source';

import dxDropDownEditor, {
    dxDropDownEditorOptions
} from './drop_down_editor/ui.drop_down_editor';

import {
    DataExpressionMixinOptions
} from './editor/ui.data_expression';

import {
    dxPopupOptions
} from './popup';

/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface dxDropDownBoxOptions extends DataExpressionMixinOptions<dxDropDownBox>, dxDropDownEditorOptions<dxDropDownBox> {
    /**
     * @docid dxDropDownBoxOptions.acceptCustomValue
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    acceptCustomValue?: boolean;
    /**
     * @docid dxDropDownBoxOptions.contentTemplate
     * @type template|function
     * @default 'content'
     * @type_function_param1 templateData:object
     * @type_function_param1_field1 component:dxDropDownBox
     * @type_function_param1_field2 value:any
     * @type_function_param2 contentElement:dxElement
     * @type_function_return string|Node|jQuery
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    contentTemplate?: template | ((templateData: { component?: dxDropDownBox, value?: any }, contentElement: dxElement) => string | Element | JQuery);
    /**
     * @docid dxDropDownBoxOptions.displayValueFormatter
     * @type function(value)
     * @type_function_param1 value:string|Array<any>
     * @type_function_return string
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    displayValueFormatter?: ((value: string | Array<any>) => string);
    /**
     * @docid dxDropDownBoxOptions.dropDownOptions
     * @type dxPopupOptions
     * @default {}
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    dropDownOptions?: dxPopupOptions;
    /**
     * @docid dxDropDownBoxOptions.fieldTemplate
     * @type template|function
     * @default null
     * @type_function_param1 value:object
     * @type_function_param2 fieldElement:dxElement
     * @type_function_return string|Node|jQuery
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    fieldTemplate?: template | ((value: any, fieldElement: dxElement) => string | Element | JQuery);
    /**
     * @docid dxDropDownBoxOptions.openOnFieldClick
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    openOnFieldClick?: boolean;
    /**
     * @docid dxDropDownBoxOptions.valueChangeEvent
     * @type string
     * @default "change"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    valueChangeEvent?: string;
}
/** The DropDownBox widget consists of a text field, which displays the current value, and a drop-down field, which can contain any UI element. */
export default class dxDropDownBox extends dxDropDownEditor {
    constructor(element: Element, options?: dxDropDownBoxOptions)
    constructor(element: JQuery, options?: dxDropDownBoxOptions)
    getDataSource(): DataSource;
}

declare global {
interface JQuery {
    dxDropDownBox(): JQuery;
    dxDropDownBox(options: "instance"): dxDropDownBox;
    dxDropDownBox(options: string): any;
    dxDropDownBox(options: string, ...params: any[]): any;
    dxDropDownBox(options: dxDropDownBoxOptions): JQuery;
}
}
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type Options = dxDropDownBoxOptions;

/** @deprecated use Options instead */
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type IOptions = dxDropDownBoxOptions;