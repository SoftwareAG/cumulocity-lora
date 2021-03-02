/**
* DevExtreme (viz/linear_gauge.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    dxBaseGauge,
    BaseGaugeOptions,
    BaseGaugeRangeContainer,
    BaseGaugeScale,
    BaseGaugeScaleLabel,
    GaugeIndicator
} from './gauges/base_gauge';

/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface dxLinearGaugeOptions extends BaseGaugeOptions<dxLinearGauge> {
    /**
     * @docid dxLinearGaugeOptions.geometry
     * @type object
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    geometry?: { orientation?: 'horizontal' | 'vertical' };
    /**
     * @docid dxLinearGaugeOptions.rangeContainer
     * @type object
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    rangeContainer?: dxLinearGaugeRangeContainer;
    /**
     * @docid dxLinearGaugeOptions.scale
     * @type object
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    scale?: dxLinearGaugeScale;
    /**
     * @docid dxLinearGaugeOptions.subvalueIndicator
     * @type GaugeIndicator
     * @inheritAll
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    subvalueIndicator?: GaugeIndicator;
    /**
     * @docid dxLinearGaugeOptions.valueIndicator
     * @type GaugeIndicator
     * @inheritAll
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    valueIndicator?: GaugeIndicator;
}
/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface dxLinearGaugeRangeContainer extends BaseGaugeRangeContainer {
    /**
     * @docid dxLinearGaugeOptions.rangeContainer.horizontalOrientation
     * @type Enums.HorizontalAlignment
     * @default 'right'
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    horizontalOrientation?: 'center' | 'left' | 'right';
    /**
     * @docid dxLinearGaugeOptions.rangeContainer.verticalOrientation
     * @type Enums.VerticalAlignment
     * @default 'bottom'
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    verticalOrientation?: 'bottom' | 'center' | 'top';
    /**
     * @docid dxLinearGaugeOptions.rangeContainer.width
     * @type object|number
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    width?: { end?: number, start?: number } | number;
}
/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface dxLinearGaugeScale extends BaseGaugeScale {
    /**
     * @docid dxLinearGaugeOptions.scale.horizontalOrientation
     * @type Enums.HorizontalAlignment
     * @default 'right'
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    horizontalOrientation?: 'center' | 'left' | 'right';
    /**
     * @docid dxLinearGaugeOptions.scale.label
     * @type object
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    label?: dxLinearGaugeScaleLabel;
    /**
     * @docid dxLinearGaugeOptions.scale.scaleDivisionFactor
     * @type number
     * @default 25
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    scaleDivisionFactor?: number;
    /**
     * @docid dxLinearGaugeOptions.scale.verticalOrientation
     * @type Enums.VerticalAlignment
     * @default 'bottom'
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    verticalOrientation?: 'bottom' | 'center' | 'top';
}
/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface dxLinearGaugeScaleLabel extends BaseGaugeScaleLabel {
    /**
     * @docid dxLinearGaugeOptions.scale.label.indentFromTick
     * @type number
     * @default -10
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    indentFromTick?: number;
}
/** The LinearGauge is a widget that indicates values on a linear numeric scale. */
export default class dxLinearGauge extends dxBaseGauge {
    constructor(element: Element, options?: dxLinearGaugeOptions)
    constructor(element: JQuery, options?: dxLinearGaugeOptions)
}

declare global {
interface JQuery {
    dxLinearGauge(): JQuery;
    dxLinearGauge(options: "instance"): dxLinearGauge;
    dxLinearGauge(options: string): any;
    dxLinearGauge(options: string, ...params: any[]): any;
    dxLinearGauge(options: dxLinearGaugeOptions): JQuery;
}
}
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type Options = dxLinearGaugeOptions;

/** @deprecated use Options instead */
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type IOptions = dxLinearGaugeOptions;