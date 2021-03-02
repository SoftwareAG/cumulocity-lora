/**
* DevExtreme (ui/widget/ui.search_box_mixin.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    dxTextBoxOptions
} from '../text_box';

/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface SearchBoxMixinOptions<T = SearchBoxMixin> {
    /**
     * @docid SearchBoxMixinOptions.searchEditorOptions
     * @type dxTextBoxOptions
     * @default {}
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    searchEditorOptions?: dxTextBoxOptions;
    /**
     * @docid SearchBoxMixinOptions.searchEnabled
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    searchEnabled?: boolean;
    /**
     * @docid SearchBoxMixinOptions.searchExpr
     * @type getter|Array<getter>
     * @default null
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    searchExpr?: string | Function | Array<string | Function>;
    /**
     * @docid SearchBoxMixinOptions.searchMode
     * @type Enums.CollectionSearchMode
     * @default 'contains'
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    searchMode?: 'contains' | 'startswith' | 'equals';
    /**
     * @docid SearchBoxMixinOptions.searchTimeout
     * @type number
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    searchTimeout?: number;
    /**
     * @docid SearchBoxMixinOptions.searchValue
     * @type String
     * @default ""
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    searchValue?: string;
}
/** Warning! This type is used for internal purposes. Do not import it directly. */

export default class SearchBoxMixin {
    constructor(options?: SearchBoxMixinOptions)
}
