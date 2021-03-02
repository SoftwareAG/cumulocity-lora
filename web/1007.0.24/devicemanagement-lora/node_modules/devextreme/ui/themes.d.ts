/**
* DevExtreme (ui/themes.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/** An object that serves as a namespace for the methods that work with DevExtreme CSS Themes. */
export default class themes {
    /**
     * @docid ui.themesmethods.current
     * @publicName current()
     * @static
     * @return string
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    static current(): string;
    /**
     * @docid ui.themesmethods.current
     * @publicName current(themeName)
     * @param1 themeName:string
     * @static
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    static current(themeName: string): void;
    /**
     * @docid ui.themesmethods.ready
     * @publicName ready(callback)
     * @param1 callback:function
     * @static
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    static ready(callback: Function): void;
}
