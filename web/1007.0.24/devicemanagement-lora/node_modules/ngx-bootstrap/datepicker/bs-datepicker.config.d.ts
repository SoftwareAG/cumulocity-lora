import { DatepickerRenderOptions, BsDatepickerViewMode, DatepickerDateCustomClasses } from './models';
/**
 * For date range picker there are `BsDaterangepickerConfig` which inherits all properties,
 * except `displayMonths`, for range picker it default to `2`
 */
export declare class BsDatepickerConfig implements DatepickerRenderOptions {
    /** sets use adaptive position */
    adaptivePosition: boolean;
    /** turn on/off animation */
    isAnimated: boolean;
    value?: Date | Date[];
    isDisabled?: boolean;
    /**
     * Default min date for all date/range pickers
     */
    minDate?: Date;
    /**
     * Default max date for all date/range pickers
     */
    maxDate?: Date;
    /**
     * Default date custom classes for all date/range pickers
     */
    dateCustomClasses: DatepickerDateCustomClasses[];
    daysDisabled?: number[];
    /**
     * Disable specific dates
     */
    datesDisabled?: Date[];
    /**
     * Makes dates from other months active
     */
    selectFromOtherMonth?: boolean;
    /**
     * Makes dates from other months active
     */
    selectWeek?: boolean;
    /**
     * Add class to current day
     */
    customTodayClass?: string;
    /**
     * Default mode for all date pickers
     */
    minMode?: BsDatepickerViewMode;
    /** CSS class which will be applied to datepicker container,
     * usually used to set color theme
     */
    containerClass: string;
    displayMonths: number;
    /**
     * Allows to hide week numbers in datepicker
     */
    showWeekNumbers: boolean;
    dateInputFormat: string;
    rangeSeparator: string;
    /**
     * Date format for date range input field
     */
    rangeInputFormat: string;
    monthTitle: string;
    yearTitle: string;
    dayLabel: string;
    monthLabel: string;
    yearLabel: string;
    weekNumbers: string;
}
