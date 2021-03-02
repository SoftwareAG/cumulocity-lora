/**
* DevExtreme (viz/sparklines/base_sparkline.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    dxElement
} from '../../core/element';

import {
    template
} from '../../core/templates/template';

import BaseWidget, {
    BaseWidgetOptions,
    BaseWidgetTooltip
} from '../core/base_widget';

/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface BaseSparklineOptions<T = BaseSparkline> extends BaseWidgetOptions<T> {
    /**
     * @docid BaseSparklineOptions.onTooltipHidden
     * @extends Action
     * @notUsedInTheme
     * @action
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    onTooltipHidden?: ((e: { component?: T, element?: dxElement, model?: any }) => any);
    /**
     * @docid BaseSparklineOptions.onTooltipShown
     * @extends Action
     * @notUsedInTheme
     * @action
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    onTooltipShown?: ((e: { component?: T, element?: dxElement, model?: any }) => any);
    /**
     * @docid BaseSparklineOptions.tooltip
     * @type object
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    tooltip?: BaseSparklineTooltip;
}
/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface BaseSparklineTooltip extends BaseWidgetTooltip {
    /**
     * @docid BaseSparklineOptions.tooltip.contentTemplate
     * @type template|function(pointsInfo, element)
     * @type_function_param1 pointsInfo:object
     * @type_function_param2 element:dxElement
     * @type_function_return string|Node|jQuery
     * @default undefined
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    contentTemplate?: template | ((pointsInfo: any, element: dxElement) => string | Element | JQuery);
    /**
     * @docid BaseSparklineOptions.tooltip.customizeTooltip
     * @type function(pointsInfo)
     * @type_function_param1 pointsInfo:object
     * @type_function_return object
     * @default undefined
     * @notUsedInTheme
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    customizeTooltip?: ((pointsInfo: any) => any);
    /**
     * @docid BaseSparklineOptions.tooltip.enabled
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    enabled?: boolean;
}
/** Warning! This type is used for internal purposes. Do not import it directly. */
/** Overridden by descriptions for particular widgets. */
export default class BaseSparkline extends BaseWidget {
    constructor(element: Element, options?: BaseSparklineOptions)
    constructor(element: JQuery, options?: BaseSparklineOptions)
}
