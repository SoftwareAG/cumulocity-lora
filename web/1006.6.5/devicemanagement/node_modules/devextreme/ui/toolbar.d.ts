/**
* DevExtreme (ui/toolbar.d.ts)
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

import DataSource, {
    DataSourceOptions
} from '../data/data_source';

import CollectionWidget, {
    CollectionWidgetItem,
    CollectionWidgetOptions
} from './collection/ui.collection_widget.base';

/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface dxToolbarOptions extends CollectionWidgetOptions<dxToolbar> {
    /**
     * @docid  dxToolbarOptions.dataSource
     * @type string|Array<string,dxToolbarItem,object>|DataSource|DataSourceOptions
     * @default null
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    dataSource?: string | Array<string | dxToolbarItem | any> | DataSource | DataSourceOptions;
    /**
     * @docid dxToolbarOptions.items
     * @type Array<string, dxToolbarItem, object>
     * @fires dxToolbarOptions.onOptionChanged
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    items?: Array<string | dxToolbarItem | any>;
    /**
     * @docid dxToolbarOptions.menuItemTemplate
     * @type template|function
     * @default "menuItem"
     * @type_function_param1 itemData:object
     * @type_function_param2 itemIndex:number
     * @type_function_param3 itemElement:dxElement
     * @type_function_return string|Node|jQuery
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    menuItemTemplate?: template | ((itemData: any, itemIndex: number, itemElement: dxElement) => string | Element | JQuery);
    /**
     * @docid dxToolbarOptions.renderAs
     * @type Enums.ToolbarRenderMode
     * @default 'topToolbar'
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    renderAs?: 'bottomToolbar' | 'topToolbar';
}
/** The Toolbar is a widget containing items that usually manage screen content. Those items can be plain text or widgets. */
export default class dxToolbar extends CollectionWidget {
    constructor(element: Element, options?: dxToolbarOptions)
    constructor(element: JQuery, options?: dxToolbarOptions)
}

/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface dxToolbarItem extends CollectionWidgetItem {
    /**
     * @docid dxToolbarItem.cssClass
     * @type string
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    cssClass?: string;
    /**
     * @docid dxToolbarItem.locateInMenu
     * @type Enums.ToolbarItemLocateInMenuMode
     * @default 'never'
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    locateInMenu?: 'always' | 'auto' | 'never';
    /**
     * @docid dxToolbarItem.location
     * @type Enums.ToolbarItemLocation
     * @default 'center'
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    location?: 'after' | 'before' | 'center';
    /**
     * @docid dxToolbarItem.menuItemTemplate
     * @type template|function
     * @type_function_return string|Node|jQuery
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    menuItemTemplate?: template | (() => string | Element | JQuery);
    /**
     * @docid dxToolbarItem.options
     * @type object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    options?: any;
    /**
     * @docid dxToolbarItem.showText
     * @type Enums.ToolbarItemShowTextMode
     * @default 'always'
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    showText?: 'always' | 'inMenu';
    /**
     * @docid dxToolbarItem.widget
     * @type Enums.ToolbarItemWidget
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    widget?: 'dxAutocomplete' | 'dxButton' | 'dxCheckBox' | 'dxDateBox' | 'dxMenu' | 'dxSelectBox' | 'dxTabs' | 'dxTextBox' | 'dxButtonGroup' | 'dxDropDownButton';
}

declare global {
interface JQuery {
    dxToolbar(): JQuery;
    dxToolbar(options: "instance"): dxToolbar;
    dxToolbar(options: string): any;
    dxToolbar(options: string, ...params: any[]): any;
    dxToolbar(options: dxToolbarOptions): JQuery;
}
}
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type Options = dxToolbarOptions;

/** @deprecated use Options instead */
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type IOptions = dxToolbarOptions;