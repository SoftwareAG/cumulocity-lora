/**
* DevExtreme (ui/tile_view.d.ts)
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
export interface dxTileViewOptions extends CollectionWidgetOptions<dxTileView> {
    /**
     * @docid dxTileViewOptions.activeStateEnabled
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    activeStateEnabled?: boolean;
    /**
     * @docid dxTileViewOptions.baseItemHeight
     * @type number
     * @default 100
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    baseItemHeight?: number;
    /**
     * @docid dxTileViewOptions.baseItemWidth
     * @type number
     * @default 100
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    baseItemWidth?: number;
    /**
     * @docid dxTileViewOptions.dataSource
     * @type string|Array<string,dxTileViewItem,object>|DataSource|DataSourceOptions
     * @default null
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    dataSource?: string | Array<string | dxTileViewItem | any> | DataSource | DataSourceOptions;
    /**
     * @docid dxTileViewOptions.direction
     * @type Enums.Orientation
     * @default 'horizontal'
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    direction?: 'horizontal' | 'vertical';
    /**
     * @docid dxTileViewOptions.focusStateEnabled
     * @type boolean
     * @default true [for](desktop)
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    focusStateEnabled?: boolean;
    /**
     * @docid dxTileViewOptions.height
     * @type number|string|function
     * @default 500
     * @type_function_return number|string
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    height?: number | string | (() => number | string);
    /**
     * @docid dxTileViewOptions.hoverStateEnabled
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    hoverStateEnabled?: boolean;
    /**
     * @docid dxTileViewOptions.itemMargin
     * @type number
     * @default 20
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    itemMargin?: number;
    /**
     * @docid dxTileViewOptions.items
     * @type Array<string, dxTileViewItem, object>
     * @fires dxTileViewOptions.onOptionChanged
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    items?: Array<string | dxTileViewItem | any>;
    /**
     * @docid dxTileViewOptions.showScrollbar
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    showScrollbar?: boolean;
}
/** The TileView widget contains a collection of tiles. Tiles can store much more information than ordinary buttons, that is why they are very popular in apps designed for touch devices. */
export default class dxTileView extends CollectionWidget {
    constructor(element: Element, options?: dxTileViewOptions)
    constructor(element: JQuery, options?: dxTileViewOptions)
    /**
     * @docid dxtileviewmethods.scrollPosition
     * @publicName scrollPosition()
     * @return numeric
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    scrollPosition(): number;
}

/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface dxTileViewItem extends CollectionWidgetItem {
    /**
     * @docid dxTileViewItem.heightRatio
     * @type number
     * @default 1
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    heightRatio?: number;
    /**
     * @docid dxTileViewItem.widthRatio
     * @type number
     * @default 1
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    widthRatio?: number;
}

declare global {
interface JQuery {
    dxTileView(): JQuery;
    dxTileView(options: "instance"): dxTileView;
    dxTileView(options: string): any;
    dxTileView(options: string, ...params: any[]): any;
    dxTileView(options: dxTileViewOptions): JQuery;
}
}
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type Options = dxTileViewOptions;

/** @deprecated use Options instead */
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type IOptions = dxTileViewOptions;