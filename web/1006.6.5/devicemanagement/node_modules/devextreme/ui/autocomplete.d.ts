/**
* DevExtreme (ui/autocomplete.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dxDropDownList, {
    dxDropDownListOptions
} from './drop_down_editor/ui.drop_down_list';

/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface dxAutocompleteOptions extends dxDropDownListOptions<dxAutocomplete> {
    /**
     * @docid dxAutocompleteOptions.maxItemCount
     * @type number
     * @default 10
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    maxItemCount?: number;
    /**
     * @docid dxAutocompleteOptions.minSearchLength
     * @type number
     * @default 1
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    minSearchLength?: number;
    /**
     * @docid dxAutocompleteOptions.showDropDownButton
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    showDropDownButton?: boolean;
    /**
     * @docid dxAutocompleteOptions.value
     * @type string
     * @default null
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    value?: string;
}
/** The Autocomplete widget is a textbox that provides suggestions while a user types into it. */
export default class dxAutocomplete extends dxDropDownList {
    constructor(element: Element, options?: dxAutocompleteOptions)
    constructor(element: JQuery, options?: dxAutocompleteOptions)
}

declare global {
interface JQuery {
    dxAutocomplete(): JQuery;
    dxAutocomplete(options: "instance"): dxAutocomplete;
    dxAutocomplete(options: string): any;
    dxAutocomplete(options: string, ...params: any[]): any;
    dxAutocomplete(options: dxAutocompleteOptions): JQuery;
}
}
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type Options = dxAutocompleteOptions;

/** @deprecated use Options instead */
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type IOptions = dxAutocompleteOptions;