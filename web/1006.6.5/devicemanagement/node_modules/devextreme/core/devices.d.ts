/**
* DevExtreme (core/devices.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface Device {
    /**
     * @docid Device.android
     * @type boolean
     * @prevFileNamespace DevExpress.core
     * @public
     */
    android?: boolean;
    /**
     * @docid Device.deviceType
     * @type string
     * @acceptValues 'phone'|'tablet'|'desktop'
     * @prevFileNamespace DevExpress.core
     * @public
     */
    deviceType?: 'phone' | 'tablet' | 'desktop';
    /**
     * @docid Device.generic
     * @type boolean
     * @prevFileNamespace DevExpress.core
     * @public
     */
    generic?: boolean;
    /**
     * @docid Device.grade
     * @type string
     * @acceptValues 'A'|'B'|'C'
     * @prevFileNamespace DevExpress.core
     * @public
     */
    grade?: 'A' | 'B' | 'C';
    /**
     * @docid Device.ios
     * @type boolean
     * @prevFileNamespace DevExpress.core
     * @public
     */
    ios?: boolean;
    /**
     * @docid Device.phone
     * @type boolean
     * @prevFileNamespace DevExpress.core
     * @public
     */
    phone?: boolean;
    /**
     * @docid Device.platform
     * @type string
     * @acceptValues 'android'|'ios'|'generic'
     * @prevFileNamespace DevExpress.core
     * @public
     */
    platform?: 'android' | 'ios' | 'generic';
    /**
     * @docid Device.tablet
     * @type boolean
     * @prevFileNamespace DevExpress.core
     * @public
     */
    tablet?: boolean;
    /**
     * @docid Device.version
     * @type Array<number>
     * @prevFileNamespace DevExpress.core
     * @public
     */
    version?: Array<number>;
}

/**
 * @docid DevicesObject
 * @publicName devices
 * @section Utils
 * @inherits EventsMixin
 * @namespace DevExpress
 * @module core/devices
 * @export default
 * @prevFileNamespace DevExpress.core
 * @public
 */
declare class DevicesObject {
    constructor(options: { window?: Window });
    /**
     * @docid DevicesObjectmethods.current
     * @publicName current()
     * @return Device
     * @prevFileNamespace DevExpress.core
     * @public
     */
    current(): Device;
    /**
     * @docid DevicesObjectmethods.current
     * @publicName current(deviceName)
     * @param1 deviceName:string|Device
     * @prevFileNamespace DevExpress.core
     * @public
     */
    current(deviceName: string | Device): void;
    off(eventName: string): this;
    off(eventName: string, eventHandler: Function): this;
    on(eventName: string, eventHandler: Function): this;
    on(events: any): this;
    /**
     * @docid DevicesObjectMethods.orientation
     * @publicName orientation()
     * @return String
     * @prevFileNamespace DevExpress.core
     * @public
     */
    orientation(): string;
    /**
     * @docid DevicesObjectMethods.real
     * @publicName real()
     * @return Device
     * @prevFileNamespace DevExpress.core
     * @public
     */
    real(): Device;
}

/**
 * @const devices
 * @type DevicesObject
 * @namespace DevExpress
 * @hidden
 * @prevFileNamespace DevExpress.core
 */

declare const devices: DevicesObject;
/** Warning! This type is used for internal purposes. Do not import it directly. */
export default devices;
