/**
* DevExtreme (data/load_options.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface LoadOptions {
    /**
     * @docid LoadOptions.customQueryParams
     * @type Object
     * @prevFileNamespace DevExpress.data
     * @public
     */
    customQueryParams?: any;
    /**
     * @docid LoadOptions.expand
     * @type object
     * @prevFileNamespace DevExpress.data
     * @public
     */
    expand?: any;
    /**
     * @docid LoadOptions.filter
     * @type object
     * @prevFileNamespace DevExpress.data
     * @public
     */
    filter?: any;
    /**
     * @docid LoadOptions.group
     * @type object
     * @prevFileNamespace DevExpress.data
     * @public
     */
    group?: any;
    /**
     * @docid LoadOptions.groupSummary
     * @type Object
     * @prevFileNamespace DevExpress.data
     * @public
     */
    groupSummary?: any;
    /**
     * @docid LoadOptions.parentIds
     * @type Array<any>
     * @prevFileNamespace DevExpress.data
     * @public
     */
    parentIds?: Array<any>;
    /**
     * @docid LoadOptions.requireGroupCount
     * @type boolean
     * @prevFileNamespace DevExpress.data
     * @public
     */
    requireGroupCount?: boolean;
    /**
     * @docid LoadOptions.requireTotalCount
     * @type boolean
     * @prevFileNamespace DevExpress.data
     * @public
     */
    requireTotalCount?: boolean;
    /**
     * @docid LoadOptions.searchExpr
     * @type getter|Array<getter>
     * @prevFileNamespace DevExpress.data
     * @public
     */
    searchExpr?: string | Function | Array<string | Function>;
    /**
     * @docid LoadOptions.searchOperation
     * @type string
     * @prevFileNamespace DevExpress.data
     * @public
     */
    searchOperation?: string;
    /**
     * @docid LoadOptions.searchValue
     * @type any
     * @prevFileNamespace DevExpress.data
     * @public
     */
    searchValue?: any;
    /**
     * @docid LoadOptions.select
     * @type object
     * @prevFileNamespace DevExpress.data
     * @public
     */
    select?: any;
    /**
     * @docid LoadOptions.skip
     * @type number
     * @prevFileNamespace DevExpress.data
     * @public
     */
    skip?: number;
    /**
     * @docid LoadOptions.sort
     * @type object
     * @prevFileNamespace DevExpress.data
     * @public
     */
    sort?: any;
    /**
     * @docid LoadOptions.take
     * @type number
     * @prevFileNamespace DevExpress.data
     * @public
     */
    take?: number;
    /**
     * @docid LoadOptions.totalSummary
     * @type Object
     * @prevFileNamespace DevExpress.data
     * @public
     */
    totalSummary?: any;
    /**
     * @docid LoadOptions.userData
     * @type object
     * @prevFileNamespace DevExpress.data
     * @public
     */
    userData?: any;
}
