/**
* DevExtreme (ui/box.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import DataSource, {
    DataSourceOptions
} from '../data/data_source';

import CollectionWidget, {
    CollectionWidgetItem,
    CollectionWidgetOptions
} from './collection/ui.collection_widget.base';

/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface dxBoxOptions extends CollectionWidgetOptions<dxBox> {
    /**
     * @docid dxBoxOptions.align
     * @type Enums.BoxAlign
     * @default 'start'
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    align?: 'center' | 'end' | 'space-around' | 'space-between' | 'start';
    /**
     * @docid dxBoxOptions.crossAlign
     * @type Enums.BoxCrossAlign
     * @default 'start'
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    crossAlign?: 'center' | 'end' | 'start' | 'stretch';
    /**
     * @docid dxBoxOptions.dataSource
     * @type string|Array<string,dxBoxItem,object>|DataSource|DataSourceOptions
     * @default null
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    dataSource?: string | Array<string | dxBoxItem | any> | DataSource | DataSourceOptions;
    /**
     * @docid dxBoxOptions.direction
     * @type Enums.BoxDirection
     * @default 'row'
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    direction?: 'col' | 'row';
    /**
     * @docid dxBoxOptions.items
     * @type Array<string, dxBoxItem, object>
     * @fires dxBoxOptions.onOptionChanged
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    items?: Array<string | dxBoxItem | any>;
}
/** The Box widget allows you to arrange various elements within it. Separate and adaptive, the Box widget acts as a building block for the layout. */
export default class dxBox extends CollectionWidget {
    constructor(element: Element, options?: dxBoxOptions)
    constructor(element: JQuery, options?: dxBoxOptions)
}

/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface dxBoxItem extends CollectionWidgetItem {
    /**
     * @docid dxBoxItem.baseSize
     * @type number | Enums.Mode
     * @default 0
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    baseSize?: number | 'auto';
    /**
     * @docid dxBoxItem.box
     * @type dxBoxOptions
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    box?: dxBoxOptions;
    /**
     * @docid dxBoxItem.ratio
     * @type number
     * @default 0
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    ratio?: number;
    /**
     * @docid dxBoxItem.shrink
     * @type number
     * @default 1
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    shrink?: number;
}

declare global {
interface JQuery {
    dxBox(): JQuery;
    dxBox(options: "instance"): dxBox;
    dxBox(options: string): any;
    dxBox(options: string, ...params: any[]): any;
    dxBox(options: dxBoxOptions): JQuery;
}
}
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type Options = dxBoxOptions;

/** @deprecated use Options instead */
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type IOptions = dxBoxOptions;