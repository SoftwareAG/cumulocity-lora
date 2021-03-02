/**
* DevExtreme (events.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import './jquery_augmentation';

/** Describes dxEvent, a counterpart of the jQuery.Event to be used without jQuery. */
export type dxEvent = Event;
/** Warning! This type is used for internal purposes. Do not import it directly. */
export class Event {
    /**
     * @docid dxEventFields.currentTarget
     * @type Node
     * @prevFileNamespace DevExpress
     * @public
     */
    currentTarget: Element;
    /**
     * @docid dxEventFields.data
     * @type object
     * @prevFileNamespace DevExpress
     * @public
     */
    data: any;
    /**
     * @docid dxEventFields.delegateTarget
     * @type Node
     * @prevFileNamespace DevExpress
     * @public
     */
    delegateTarget: Element;
    /**
     * @docid dxEventFields.target
     * @type Node
     * @prevFileNamespace DevExpress
     * @public
     */
    target: Element;
    /**
     * @docid dxEventMethods.isDefaultPrevented
     * @publicName isDefaultPrevented()
     * @type function
     * @return boolean
     * @prevFileNamespace DevExpress
     * @public
     */
    isDefaultPrevented(): boolean;
    /**
     * @docid dxEventMethods.isImmediatePropagationStopped
     * @publicName isImmediatePropagationStopped()
     * @type function
     * @return boolean
     * @prevFileNamespace DevExpress
     * @public
     */
    isImmediatePropagationStopped(): boolean;
    /**
     * @docid dxEventMethods.isPropagationStopped
     * @publicName isPropagationStopped()
     * @type function
     * @return boolean
     * @prevFileNamespace DevExpress
     * @public
     */
    isPropagationStopped(): boolean;
    /**
     * @docid dxEventMethods.preventDefault
     * @publicName preventDefault()
     * @type function
     * @prevFileNamespace DevExpress
     * @public
     */
    preventDefault(): void;
    /**
     * @docid dxEventMethods.stopImmediatePropagation
     * @publicName stopImmediatePropagation()
     * @type function
     * @prevFileNamespace DevExpress
     * @public
     */
    stopImmediatePropagation(): void;
    /**
     * @docid dxEventMethods.stopPropagation
     * @publicName stopPropagation()
     * @type function
     * @prevFileNamespace DevExpress
     * @public
     */
    stopPropagation(): void;
}

/** Warning! This type is used for internal purposes. Do not import it directly. */

export type event = dxEvent | JQueryEventObject;


/** Warning! This type is used for internal purposes. Do not import it directly. */

export function eventsHandler(event: dxEvent, extraParameters: any): boolean;

/** Detaches all handlers from the specified elements. */
export function off(element: Element | Array<Element>): void;

/** Detaches all handlers of the specified event from the specified elements. */
export function off(element: Element | Array<Element>, eventName: string): void;

/** Detaches an event handler from the specified elements. */
export function off(element: Element | Array<Element>, eventName: string, handler: Function): void;

/** Detaches all event handlers of the specified type attached using the on(element, eventName, selector, data, handler) or on(element, eventName, selector, handler) method. */
export function off(element: Element | Array<Element>, eventName: string, selector: string): void;

/** Detaches the specified event handler attached using the on(element, eventName, selector, data, handler) or on(element, eventName, selector, handler) method. */
export function off(element: Element | Array<Element>, eventName: string, selector: string, handler: Function): void;

/** Attaches an event handler to the specified elements. Allows you to pass custom data to the handler. */
export function on(element: Element | Array<Element>, eventName: string, data: any, handler: Function): void;

/** Attaches an event handler to the specified elements. */
export function on(element: Element | Array<Element>, eventName: string, handler: Function): void;

/** Attaches an event handler to the specified elements' descendants. Allows you to pass custom data to the handler. */
export function on(element: Element | Array<Element>, eventName: string, selector: string, data: any, handler: Function): void;

/** Attaches an event handler to the specified elements' descendants. */
export function on(element: Element | Array<Element>, eventName: string, selector: string, handler: Function): void;

/** Attaches an event handler that is executed only once to the specified elements. Allows you to pass custom data to the handler. */
export function one(element: Element | Array<Element>, eventName: string, data: any, handler: Function): void;

/** Attaches an event handler that is executed only once to the specified elements. */
export function one(element: Element | Array<Element>, eventName: string, handler: Function): void;

/** Attaches an event handler that is executed only once to the specified elements' descendants. Allows you to pass custom data to the handler. */
export function one(element: Element | Array<Element>, eventName: string, selector: string, data: any, handler: Function): void;

/** Attaches an event handler that is executed only once to the specified elements' descendants. */
export function one(element: Element | Array<Element>, eventName: string, selector: string, handler: Function): void;

/** Triggers an event for the specified elements. */
export function trigger(element: Element | Array<Element>, event: string | event): void;

/** Triggers an event for the specified elements. Allows you to pass custom parameters to event handlers. */
export function trigger(element: Element | Array<Element>, event: string | event, extraParameters: any): void;

/** Warning! This type is used for internal purposes. Do not import it directly. */

export function triggerHandler(element: Element | Array<Element>, event: string | event): void;

/** Warning! This type is used for internal purposes. Do not import it directly. */

export function triggerHandler(element: Element | Array<Element>, event: string | event, extraParameters: any): void;
