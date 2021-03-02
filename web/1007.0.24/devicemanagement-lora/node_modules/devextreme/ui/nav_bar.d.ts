/**
* DevExtreme (ui/nav_bar.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dxTabs, {
    dxTabsItem,
    dxTabsOptions
} from './tabs';

/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface dxNavBarOptions extends dxTabsOptions<dxNavBar> {
    /**
     * @docid dxNavBarOptions.scrollByContent
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    scrollByContent?: boolean;
}
/** The NavBar is a widget that navigates the application views. */
export default class dxNavBar extends dxTabs {
    constructor(element: Element, options?: dxNavBarOptions)
    constructor(element: JQuery, options?: dxNavBarOptions)
}

/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface dxNavBarItem extends dxTabsItem {
    /**
     * @docid dxNavBarItem.badge
     * @type String
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    badge?: string;
}

declare global {
interface JQuery {
    dxNavBar(): JQuery;
    dxNavBar(options: "instance"): dxNavBar;
    dxNavBar(options: string): any;
    dxNavBar(options: string, ...params: any[]): any;
    dxNavBar(options: dxNavBarOptions): JQuery;
}
}
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type Options = dxNavBarOptions;

/** @deprecated use Options instead */
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type IOptions = dxNavBarOptions;