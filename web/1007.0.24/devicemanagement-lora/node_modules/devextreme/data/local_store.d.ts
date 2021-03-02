/**
* DevExtreme (data/local_store.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import ArrayStore, {
    ArrayStoreOptions
} from './array_store';

/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface LocalStoreOptions extends ArrayStoreOptions<LocalStore> {
    /**
     * @docid LocalStoreOptions.flushInterval
     * @type number
     * @default 10000
     * @prevFileNamespace DevExpress.data
     * @public
     */
    flushInterval?: number;
    /**
     * @docid LocalStoreOptions.immediate
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.data
     * @public
     */
    immediate?: boolean;
    /**
     * @docid LocalStoreOptions.name
     * @type string
     * @prevFileNamespace DevExpress.data
     * @public
     */
    name?: string;
}
/** The LocalStore is a store that provides an interface for loading and editing data from HTML Web Storage (also known as window.localStorage) and handling related events. */
export default class LocalStore extends ArrayStore {
    constructor(options?: LocalStoreOptions)
    /**
     * @docid LocalStoreMethods.clear
     * @publicName clear()
     * @prevFileNamespace DevExpress.data
     * @public
     */
    clear(): void;
}
