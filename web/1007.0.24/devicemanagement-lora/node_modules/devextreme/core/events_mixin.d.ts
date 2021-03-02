/**
* DevExtreme (core/events_mixin.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/** Warning! This type is used for internal purposes. Do not import it directly. */
/** A mixin that provides a capability to fire and subscribe to events. */
export default class EventsMixin {
    /**
     * @docid EventsMixinMethods.off
     * @publicName off(eventName)
     * @param1 eventName:string
     * @return this
     * @prevFileNamespace DevExpress.core
     * @public
     */
    off(eventName: string): this;
    /**
     * @docid EventsMixinMethods.off
     * @publicName off(eventName, eventHandler)
     * @param1 eventName:string
     * @param2 eventHandler:function
     * @return this
     * @prevFileNamespace DevExpress.core
     * @public
     */
    off(eventName: string, eventHandler: Function): this;
    /**
     * @docid EventsMixinMethods.on
     * @publicName on(eventName, eventHandler)
     * @param1 eventName:string
     * @param2 eventHandler:function
     * @return this
     * @prevFileNamespace DevExpress.core
     * @public
     */
    on(eventName: string, eventHandler: Function): this;
    /**
     * @docid EventsMixinMethods.on
     * @publicName on(events)
     * @param1 events:object
     * @return this
     * @prevFileNamespace DevExpress.core
     * @public
     */
    on(events: any): this;
}
