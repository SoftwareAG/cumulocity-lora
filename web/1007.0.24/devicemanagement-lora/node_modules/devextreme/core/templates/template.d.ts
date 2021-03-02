/**
* DevExtreme (core/templates/template.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface dxTemplateOptions {
    /**
     * @docid dxTemplateOptions.name
     * @type string
     * @prevFileNamespace DevExpress.core
     * @public
     */
    name?: string;
}
/** A custom template's markup. */
export type dxTemplate = Template;
/** Warning! This type is used for internal purposes. Do not import it directly. */
export class Template {
    constructor(options?: dxTemplateOptions)
}

/** A template notation used to specify templates for widget elements. */
export type template = string | Function | Element | JQuery;
