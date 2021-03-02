/**
* DevExtreme (core/component.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    dxElement
} from './element';

/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface ComponentOptions<T = Component> {
    /**
     * @docid ComponentOptions.onDisposing
     * @type function
     * @type_function_param1 e:object
     * @type_function_param1_field1 component:this
     * @default null
     * @action
     * @prevFileNamespace DevExpress.core
     * @public
     */
    onDisposing?: ((e: { component?: T }) => any);
    /**
     * @docid ComponentOptions.onInitialized
     * @type function
     * @type_function_param1 e:object
     * @type_function_param1_field1 component:this
     * @type_function_param1_field2 element:dxElement
     * @default null
     * @action
     * @prevFileNamespace DevExpress.core
     * @public
     */
    onInitialized?: ((e: { component?: T, element?: dxElement }) => any);
    /**
     * @docid ComponentOptions.onOptionChanged
     * @type function
     * @type_function_param1 e:object
     * @type_function_param1_field1 component:this
     * @type_function_param1_field4 name:string
     * @type_function_param1_field5 fullName:string
     * @type_function_param1_field6 value:any
     * @default null
     * @action
     * @prevFileNamespace DevExpress.core
     * @public
     */
    onOptionChanged?: ((e: { component?: T, name?: string, fullName?: string, value?: any }) => any);
}
/** Warning! This type is used for internal purposes. Do not import it directly. */
/** A base class for all components and widgets. */
export default class Component {
    constructor(options?: ComponentOptions);
    /**
     * @docid componentmethods.beginupdate
     * @publicName beginUpdate()
     * @prevFileNamespace DevExpress.core
     * @public
     */
    beginUpdate(): void;
    /**
     * @docid componentmethods.endupdate
     * @publicName endUpdate()
     * @prevFileNamespace DevExpress.core
     * @public
     */
    endUpdate(): void;
    /**
     * @docid componentmethods.instance
     * @publicName instance()
     * @return this
     * @prevFileNamespace DevExpress.core
     * @public
     */
    instance(): this;
    off(eventName: string): this;
    off(eventName: string, eventHandler: Function): this;
    on(eventName: string, eventHandler: Function): this;
    on(events: any): this;
    /**
     * @docid componentmethods.option
     * @publicName option()
     * @return object
     * @prevFileNamespace DevExpress.core
     * @public
     */
    option(): any;
    /**
     * @docid componentmethods.option
     * @publicName option(optionName)
     * @param1 optionName:string
     * @return any
     * @prevFileNamespace DevExpress.core
     * @public
     */
    option(optionName: string): any;
    /**
     * @docid componentmethods.option
     * @publicName option(optionName, optionValue)
     * @param1 optionName:string
     * @param2 optionValue:any
     * @prevFileNamespace DevExpress.core
     * @public
     */
    option(optionName: string, optionValue: any): void;
    /**
     * @docid componentmethods.option
     * @publicName option(options)
     * @param1 options:object
     * @prevFileNamespace DevExpress.core
     * @public
     */
    option(options: any): void;
    /**
     * @docid componentmethods.resetOption
     * @publicName resetOption(optionName)
     * @param1 optionName:string
     * @prevFileNamespace DevExpress.core
     * @public
     */
    resetOption(optionName: string): void;
}
