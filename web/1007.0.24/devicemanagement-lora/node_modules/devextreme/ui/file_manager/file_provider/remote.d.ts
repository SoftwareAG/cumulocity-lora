/**
* DevExtreme (ui/file_manager/file_provider/remote.d.ts)
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
export interface RemoteFileProviderOptions extends FileProviderOptions<RemoteFileProvider> {
    /**
     * @docid RemoteFileProviderOptions.endpointUrl
     * @type string
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    endpointUrl?: string;
    /**
     * @docid RemoteFileProviderOptions.hasSubDirectoriesExpr
     * @type string|function(fileItem)
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    hasSubDirectoriesExpr?: string | Function;
}
/** The Remote file provider works with a file system located on the server. */
export default class RemoteFileProvider extends FileProvider {
    constructor(options?: RemoteFileProviderOptions)
}
