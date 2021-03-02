/**
* DevExtreme (ui/track_bar.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Editor, {
    EditorOptions
} from './editor/editor';

/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface dxTrackBarOptions<T = dxTrackBar> extends EditorOptions<T> {
    /**
     * @docid dxTrackBarOptions.max
     * @type number
     * @default 100
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    max?: number;
    /**
     * @docid dxTrackBarOptions.min
     * @type number
     * @default 0
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    min?: number;
}
/** Warning! This type is used for internal purposes. Do not import it directly. */
/** A base class for track bar widgets. */
export default class dxTrackBar extends Editor {
    constructor(element: Element, options?: dxTrackBarOptions)
    constructor(element: JQuery, options?: dxTrackBarOptions)
}
