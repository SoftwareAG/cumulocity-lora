/**
* DevExtreme (ui/date_box.d.ts)
* Version: 19.2.7
* Build date: Thu Mar 26 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    dxCalendarOptions
} from './calendar';

import dxDropDownEditor, {
    dxDropDownEditorOptions
} from './drop_down_editor/ui.drop_down_editor';

import {
    format
} from './widget/ui.widget';

/** Warning! This type is used for internal purposes. Do not import it directly. */
export interface dxDateBoxOptions extends dxDropDownEditorOptions<dxDateBox> {
    /**
     * @docid dxDateBoxOptions.adaptivityEnabled
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    adaptivityEnabled?: boolean;
    /**
     * @docid dxDateBoxOptions.applyButtonText
     * @type string
     * @default "OK"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    applyButtonText?: string;
    /**
     * @docid dxDateBoxOptions.calendarOptions
     * @type dxCalendarOptions
     * @default {}
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    calendarOptions?: dxCalendarOptions;
    /**
     * @docid dxDateBoxOptions.cancelButtonText
     * @type string
     * @default "Cancel"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    cancelButtonText?: string;
    /**
     * @docid dxDateBoxOptions.dateOutOfRangeMessage
     * @type string
     * @default "Value is out of range"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    dateOutOfRangeMessage?: string;
    /**
     * @docid dxDateBoxOptions.dateSerializationFormat
     * @type string
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    dateSerializationFormat?: string;
    /**
     * @docid dxDateBoxOptions.disabledDates
     * @type Array<Date>|function(data)
     * @default null
     * @type_function_param1 data:object
     * @type_function_param1_field1 component:dxDateBox
     * @type_function_param1_field2 date:Date
     * @type_function_param1_field3 view:string
     * @type_function_return boolean
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    disabledDates?: Array<Date> | ((data: { component?: dxDateBox, date?: Date, view?: string }) => boolean);
    /**
     * @docid dxDateBoxOptions.displayFormat
     * @type format
     * @default null
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    displayFormat?: format;
    /**
     * @docid dxDateBoxOptions.interval
     * @type number
     * @default 30
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    interval?: number;
    /**
     * @docid dxDateBoxOptions.invalidDateMessage
     * @type string
     * @default "Value must be a date or time"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    invalidDateMessage?: string;
    /**
     * @docid dxDateBoxOptions.max
     * @type Date|number|string
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    max?: Date | number | string;
    /**
     * @docid dxDateBoxOptions.maxZoomLevel
     * @type Enums.CalendarZoomLevel
     * @default 'month'
     * @deprecated dxDateBoxOptions.calendarOptions
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    maxZoomLevel?: 'century' | 'decade' | 'month' | 'year';
    /**
     * @docid dxDateBoxOptions.min
     * @type Date|number|string
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    min?: Date | number | string;
    /**
     * @docid dxDateBoxOptions.minZoomLevel
     * @type Enums.CalendarZoomLevel
     * @default 'century'
     * @deprecated dxDateBoxOptions.calendarOptions
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    minZoomLevel?: 'century' | 'decade' | 'month' | 'year';
    /**
     * @docid dxDateBoxOptions.pickerType
     * @type Enums.DateBoxPickerType
     * @default 'calendar'
     * @default 'native' [for](iOS)
     * @default 'native' [for](Android)
     * @default 'rollers' [for](Android_below_version_4.4)
     * @default 'rollers' [for](mobile_devices)
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    pickerType?: 'calendar' | 'list' | 'native' | 'rollers';
    /**
     * @docid dxDateBoxOptions.placeholder
     * @type string
     * @default ""
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    placeholder?: string;
    /**
     * @docid dxDateBoxOptions.showAnalogClock
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    showAnalogClock?: boolean;
    /**
     * @docid dxDateBoxOptions.type
     * @type Enums.DateBoxType
     * @default "date"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    type?: 'date' | 'datetime' | 'time';
    /**
     * @docid dxDateBoxOptions.useMaskBehavior
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    useMaskBehavior?: boolean;
    /**
     * @docid dxDateBoxOptions.value
     * @type Date|number|string
     * @default null
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    value?: Date | number | string;
}
/** The DateBox is a widget that displays date and time in a specified format, and enables a user to pick or type in the required date/time value. */
export default class dxDateBox extends dxDropDownEditor {
    constructor(element: Element, options?: dxDateBoxOptions)
    constructor(element: JQuery, options?: dxDateBoxOptions)
    /**
     * @docid dxDateBoxMethods.close
     * @publicName close()
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    close(): void;
    /**
     * @docid dxDateBoxMethods.open
     * @publicName open()
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    open(): void;
}

declare global {
interface JQuery {
    dxDateBox(): JQuery;
    dxDateBox(options: "instance"): dxDateBox;
    dxDateBox(options: string): any;
    dxDateBox(options: string, ...params: any[]): any;
    dxDateBox(options: dxDateBoxOptions): JQuery;
}
}
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type Options = dxDateBoxOptions;

/** @deprecated use Options instead */
/** Warning! This type is used for internal purposes. Do not import it directly. */
export type IOptions = dxDateBoxOptions;