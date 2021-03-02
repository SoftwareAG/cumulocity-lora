/**
* DevExtreme (ui/file_manager/file_provider/ajax.d.ts)
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
export interface AjaxFileProviderOptions extends FileProviderOptions<AjaxFileProvider> {
    /**
     * @docid AjaxFileProviderOptions.itemsExpr
     * @type string|function(fileItem)
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    itemsExpr?: string | Function;
    /**
     * @docid AjaxFileProviderOptions.url
     * @type string
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    url?: string;
}
/** The Ajax file provider works with a virtual file system represented by an array of JSON objects loaded from a URL. */
export default class AjaxFileProvider extends FileProvider {
    constructor(options?: AjaxFileProviderOptions)
}
