/**
* DevExtreme (ui/file_manager/file_provider/file_provider.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../../../jquery_augmentation';

/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface FileProviderOptions<T = FileProvider> {
    /**
     * @docid FileProviderOptions.dateModifiedExpr
     * @type string|function(fileItem)
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    dateModifiedExpr?: string | Function;
    /**
     * @docid FileProviderOptions.isDirectoryExpr
     * @type string|function(fileItem)
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    isDirectoryExpr?: string | Function;
    /**
     * @docid FileProviderOptions.keyExpr
     * @type string|function(fileItem)
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    keyExpr?: string | Function;
    /**
     * @docid FileProviderOptions.nameExpr
     * @type string|function(fileItem)
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    nameExpr?: string | Function;
    /**
     * @docid FileProviderOptions.sizeExpr
     * @type string|function(fileItem)
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    sizeExpr?: string | Function;
    /**
     * @docid FileProviderOptions.thumbnailExpr
     * @type string|function(fileItem)
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    thumbnailExpr?: string | Function;
}
/** Warning! This type is used for internal purposes. Do not import it directly. */
/** Contains base provider settings. */
export default class FileProvider {
    constructor(options?: FileProviderOptions)
    /**
     * @docid FileProviderMethods.getItemContent
     * @publicName getItemContent()
     * @param1 items:Array<object>
     * @return Promise<object>
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    getItemContent(items: Array<any>): Promise<any> & JQueryPromise<any>;
}
