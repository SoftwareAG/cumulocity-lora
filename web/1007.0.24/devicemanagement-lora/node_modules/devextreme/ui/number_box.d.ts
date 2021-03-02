/**
* DevExtreme (ui/number_box.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dxTextEditor, {
    dxTextEditorButton,
    dxTextEditorOptions
} from './text_box/ui.text_editor.base';

import {
    format
} from './widget/ui.widget';

/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface dxNumberBoxOptions extends dxTextEditorOptions<dxNumberBox> {
    /**
     * @docid dxNumberBoxOptions.buttons
     * @type Array<Enums.NumberBoxButtonName,dxTextEditorButton>
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    buttons?: Array<'clear' | 'spins' | dxTextEditorButton>;
    /**
     * @docid dxNumberBoxOptions.format
     * @type format
     * @default ""
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    format?: format;
    /**
     * @docid dxNumberBoxOptions.invalidValueMessage
     * @type string
     * @default "Value must be a number"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    invalidValueMessage?: string;
    /**
     * @docid dxNumberBoxOptions.max
     * @type number
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    max?: number;
    /**
     * @docid dxNumberBoxOptions.min
     * @type number
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    min?: number;
    /**
     * @docid dxNumberBoxOptions.mode
     * @type Enums.NumberBoxMode
     * @default "text"
     * @default 'number' [for](mobile_devices)
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    mode?: 'number' | 'text' | 'tel';
    /**
     * @docid dxNumberBoxOptions.showSpinButtons
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    showSpinButtons?: boolean;
    /**
     * @docid dxNumberBoxOptions.step
     * @type number
     * @default 1
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    step?: number;
    /**
     * @docid dxNumberBoxOptions.useLargeSpinButtons
     * @type boolean
     * @default true
     * @default false [for](desktop)
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    useLargeSpinButtons?: boolean;
    /**
     * @docid dxNumberBoxOptions.value
     * @type number
     * @default 0
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    value?: number;
}
/** The NumberBox is a widget that displays a numeric value and allows a user to modify it by typing in a value, and incrementing or decrementing it using the keyboard or mouse. */
export default class dxNumberBox extends dxTextEditor {
    constructor(element: Element, options?: dxNumberBoxOptions)
    constructor(element: JQuery, options?: dxNumberBoxOptions)
}

declare global {
interface JQuery {
    dxNumberBox(): JQuery;
    dxNumberBox(options: "instance"): dxNumberBox;
    dxNumberBox(options: string): any;
    dxNumberBox(options: string, ...params: any[]): any;
    dxNumberBox(options: dxNumberBoxOptions): JQuery;
}
}
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type Options = dxNumberBoxOptions;

/** @deprecated use Options instead */
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type IOptions = dxNumberBoxOptions;