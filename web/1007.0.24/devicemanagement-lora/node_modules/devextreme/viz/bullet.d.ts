/**
* DevExtreme (viz/bullet.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import BaseSparkline, {
    BaseSparklineOptions
} from './sparklines/base_sparkline';

/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface dxBulletOptions extends BaseSparklineOptions<dxBullet> {
    /**
     * @docid dxBulletOptions.color
     * @type string
     * @default '#e8c267'
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    color?: string;
    /**
     * @docid dxBulletOptions.endScaleValue
     * @type number
     * @default undefined
     * @notUsedInTheme
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    endScaleValue?: number;
    /**
     * @docid dxBulletOptions.showTarget
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    showTarget?: boolean;
    /**
     * @docid dxBulletOptions.showZeroLevel
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    showZeroLevel?: boolean;
    /**
     * @docid dxBulletOptions.startScaleValue
     * @type number
     * @default 0
     * @notUsedInTheme
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    startScaleValue?: number;
    /**
     * @docid dxBulletOptions.target
     * @type number
     * @default 0
     * @notUsedInTheme
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    target?: number;
    /**
     * @docid dxBulletOptions.targetColor
     * @type string
     * @default '#666666'
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    targetColor?: string;
    /**
     * @docid dxBulletOptions.targetWidth
     * @type number
     * @default 4
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    targetWidth?: number;
    /**
     * @docid dxBulletOptions.value
     * @type number
     * @default 0
     * @notUsedInTheme
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    value?: number;
}
/** The Bullet widget is useful when you need to compare a single measure to a target value. The widget comprises a horizontal bar indicating the measure and a vertical line indicating the target value. */
export default class dxBullet extends BaseSparkline {
    constructor(element: Element, options?: dxBulletOptions)
    constructor(element: JQuery, options?: dxBulletOptions)
}

declare global {
interface JQuery {
    dxBullet(): JQuery;
    dxBullet(options: "instance"): dxBullet;
    dxBullet(options: string): any;
    dxBullet(options: string, ...params: any[]): any;
    dxBullet(options: dxBulletOptions): JQuery;
}
}
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type Options = dxBulletOptions;

/** @deprecated use Options instead */
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type IOptions = dxBulletOptions;