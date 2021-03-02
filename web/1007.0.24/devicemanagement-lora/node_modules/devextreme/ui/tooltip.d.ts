/**
* DevExtreme (ui/tooltip.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dxPopover, {
    dxPopoverOptions
} from './popover';

/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface dxTooltipOptions extends dxPopoverOptions<dxTooltip> {
}
/** The Tooltip widget displays a tooltip for a specified element on the page. */
export default class dxTooltip extends dxPopover {
    constructor(element: Element, options?: dxTooltipOptions)
    constructor(element: JQuery, options?: dxTooltipOptions)
}

declare global {
interface JQuery {
    dxTooltip(): JQuery;
    dxTooltip(options: "instance"): dxTooltip;
    dxTooltip(options: string): any;
    dxTooltip(options: string, ...params: any[]): any;
    dxTooltip(options: dxTooltipOptions): JQuery;
}
}
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type Options = dxTooltipOptions;

/** @deprecated use Options instead */
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type IOptions = dxTooltipOptions;