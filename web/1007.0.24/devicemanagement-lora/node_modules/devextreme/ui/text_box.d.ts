/**
* DevExtreme (ui/text_box.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dxTextEditor, {
    dxTextEditorOptions
} from './text_box/ui.text_editor.base';

/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface dxTextBoxOptions<T = dxTextBox> extends dxTextEditorOptions<T> {
    /**
     * @docid dxTextBoxOptions.maxLength
     * @type string|number
     * @default null
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    maxLength?: string | number;
    /**
     * @docid dxTextBoxOptions.mode
     * @type Enums.TextBoxMode
     * @default "text"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    mode?: 'email' | 'password' | 'search' | 'tel' | 'text' | 'url';
    /**
     * @docid dxTextBoxOptions.value
     * @type string
     * @default ""
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    value?: string;
}
/** The TextBox is a widget that enables a user to enter and edit a single line of text. */
export default class dxTextBox extends dxTextEditor {
    constructor(element: Element, options?: dxTextBoxOptions)
    constructor(element: JQuery, options?: dxTextBoxOptions)
}

declare global {
interface JQuery {
    dxTextBox(): JQuery;
    dxTextBox(options: "instance"): dxTextBox;
    dxTextBox(options: string): any;
    dxTextBox(options: string, ...params: any[]): any;
    dxTextBox(options: dxTextBoxOptions): JQuery;
}
}
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type Options = dxTextBoxOptions;

/** @deprecated use Options instead */
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type IOptions = dxTextBoxOptions;