/**
* DevExtreme (data/array_store.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Store, {
    StoreOptions
} from './abstract_store';

/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface ArrayStoreOptions<T = ArrayStore> extends StoreOptions<T> {
    /**
     * @docid ArrayStoreOptions.data
     * @type Array<any>
     * @prevFileNamespace DevExpress.data
     * @public
     */
    data?: Array<any>;
}
/** The ArrayStore is a store that provides an interface for loading and editing an in-memory array and handling related events. */
export default class ArrayStore extends Store {
    constructor(options?: ArrayStoreOptions)
    /**
     * @docid ArrayStoreMethods.clear
     * @publicName clear()
     * @prevFileNamespace DevExpress.data
     * @public
     */
    clear(): void;
    /**
     * @docid ArrayStoreMethods.createQuery
     * @publicName createQuery()
     * @return object
     * @prevFileNamespace DevExpress.data
     * @public
     */
    createQuery(): any;
}
