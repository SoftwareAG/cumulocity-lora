/**
* DevExtreme (viz/sparkline.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import DataSource, {
    DataSourceOptions
} from '../data/data_source';

import BaseSparkline, {
    BaseSparklineOptions
} from './sparklines/base_sparkline';

/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface dxSparklineOptions extends BaseSparklineOptions<dxSparkline> {
    /**
     * @docid dxSparkLineOptions.argumentField
     * @type string
     * @default 'arg'
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    argumentField?: string;
    /**
     * @docid dxSparkLineOptions.barNegativeColor
     * @type string
     * @default '#d7d7d7'
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    barNegativeColor?: string;
    /**
     * @docid dxSparkLineOptions.barPositiveColor
     * @type string
     * @default '#a9a9a9'
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    barPositiveColor?: string;
    /**
     * @docid dxSparkLineOptions.dataSource
     * @extends CommonVizDataSource
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    dataSource?: Array<any> | DataSource | DataSourceOptions | string;
    /**
     * @docid dxSparkLineOptions.firstLastColor
     * @type string
     * @default '#666666'
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    firstLastColor?: string;
    /**
     * @docid dxSparkLineOptions.ignoreEmptyPoints
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    ignoreEmptyPoints?: boolean;
    /**
     * @docid dxSparkLineOptions.lineColor
     * @type string
     * @default '#666666'
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    lineColor?: string;
    /**
     * @docid dxSparkLineOptions.lineWidth
     * @type number
     * @default 2
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    lineWidth?: number;
    /**
     * @docid dxSparkLineOptions.lossColor
     * @type string
     * @default '#d7d7d7'
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    lossColor?: string;
    /**
     * @docid dxSparkLineOptions.maxColor
     * @type string
     * @default '#e55253'
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    maxColor?: string;
    /**
     * @docid dxSparkLineOptions.maxValue
     * @type number
     * @default undefined
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    maxValue?: number;
    /**
     * @docid dxSparkLineOptions.minColor
     * @type string
     * @default '#e8c267'
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    minColor?: string;
    /**
     * @docid dxSparkLineOptions.minValue
     * @type number
     * @default undefined
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    minValue?: number;
    /**
     * @docid dxSparkLineOptions.pointColor
     * @type string
     * @default '#ffffff'
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    pointColor?: string;
    /**
     * @docid dxSparkLineOptions.pointSize
     * @type number
     * @default 4
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    pointSize?: number;
    /**
     * @docid dxSparkLineOptions.pointSymbol
     * @type Enums.VizPointSymbol
     * @default 'circle'
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    pointSymbol?: 'circle' | 'cross' | 'polygon' | 'square' | 'triangle';
    /**
     * @docid dxSparkLineOptions.showFirstLast
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    showFirstLast?: boolean;
    /**
     * @docid dxSparkLineOptions.showMinMax
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    showMinMax?: boolean;
    /**
     * @docid dxSparkLineOptions.type
     * @type Enums.SparklineType
     * @default 'line'
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    type?: 'area' | 'bar' | 'line' | 'spline' | 'splinearea' | 'steparea' | 'stepline' | 'winloss';
    /**
     * @docid dxSparkLineOptions.valueField
     * @type string
     * @default 'val'
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    valueField?: string;
    /**
     * @docid dxSparkLineOptions.winColor
     * @type string
     * @default '#a9a9a9'
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    winColor?: string;
    /**
     * @docid dxSparkLineOptions.winlossThreshold
     * @type number
     * @default 0
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    winlossThreshold?: number;
}
/** The Sparkline widget is a compact chart that contains only one series. Owing to their size, sparklines occupy very little space and can be easily collected in a table or embedded straight in text. */
export default class dxSparkline extends BaseSparkline {
    constructor(element: Element, options?: dxSparklineOptions)
    constructor(element: JQuery, options?: dxSparklineOptions)
    getDataSource(): DataSource;
}

declare global {
interface JQuery {
    dxSparkline(): JQuery;
    dxSparkline(options: "instance"): dxSparkline;
    dxSparkline(options: string): any;
    dxSparkline(options: string, ...params: any[]): any;
    dxSparkline(options: dxSparklineOptions): JQuery;
}
}
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type Options = dxSparklineOptions;

/** @deprecated use Options instead */
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type IOptions = dxSparklineOptions;