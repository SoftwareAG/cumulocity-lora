/**
* DevExtreme (ui/file_manager/file_provider/array.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import FileProvider, {
    FileProviderOptions
} from './file_provider';

/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface ArrayFileProviderOptions extends FileProviderOptions<ArrayFileProvider> {
    /**
     * @docid ArrayFileProviderOptions.data
     * @type Array<any>
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    data?: Array<any>;
    /**
     * @docid ArrayFileProviderOptions.itemsExpr
     * @type string|function(fileItem)
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    itemsExpr?: string | Function;
}
/** The Array file provider works with a virtual file system represented by an in-memory array of JSON objects. */
export default class ArrayFileProvider extends FileProvider {
    constructor(options?: ArrayFileProviderOptions)
}
