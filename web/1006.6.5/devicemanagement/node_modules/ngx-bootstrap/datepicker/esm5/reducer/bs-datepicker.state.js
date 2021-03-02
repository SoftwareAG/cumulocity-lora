/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { defaultMonthOptions } from './_defaults';
import { BsDatepickerConfig } from '../bs-datepicker.config';
/**
 * @record
 */
export function BsDatepickerViewState() { }
if (false) {
    /** @type {?} */
    BsDatepickerViewState.prototype.date;
    /** @type {?} */
    BsDatepickerViewState.prototype.mode;
}
var BsDatepickerState = /** @class */ (function () {
    function BsDatepickerState() {
    }
    return BsDatepickerState;
}());
export { BsDatepickerState };
if (false) {
    /** @type {?} */
    BsDatepickerState.prototype.selectedDate;
    /** @type {?} */
    BsDatepickerState.prototype.selectedRange;
    /** @type {?} */
    BsDatepickerState.prototype.view;
    /** @type {?} */
    BsDatepickerState.prototype.isDisabled;
    /** @type {?} */
    BsDatepickerState.prototype.minDate;
    /** @type {?} */
    BsDatepickerState.prototype.maxDate;
    /** @type {?} */
    BsDatepickerState.prototype.daysDisabled;
    /** @type {?} */
    BsDatepickerState.prototype.datesDisabled;
    /** @type {?} */
    BsDatepickerState.prototype.minMode;
    /** @type {?} */
    BsDatepickerState.prototype.dateCustomClasses;
    /** @type {?} */
    BsDatepickerState.prototype.hoveredDate;
    /** @type {?} */
    BsDatepickerState.prototype.hoveredMonth;
    /** @type {?} */
    BsDatepickerState.prototype.hoveredYear;
    /** @type {?} */
    BsDatepickerState.prototype.monthsModel;
    /** @type {?} */
    BsDatepickerState.prototype.formattedMonths;
    /** @type {?} */
    BsDatepickerState.prototype.flaggedMonths;
    /** @type {?} */
    BsDatepickerState.prototype.selectFromOtherMonth;
    /** @type {?} */
    BsDatepickerState.prototype.monthsCalendar;
    /** @type {?} */
    BsDatepickerState.prototype.flaggedMonthsCalendar;
    /** @type {?} */
    BsDatepickerState.prototype.yearsCalendarModel;
    /** @type {?} */
    BsDatepickerState.prototype.yearsCalendarFlagged;
    /** @type {?} */
    BsDatepickerState.prototype.monthViewOptions;
    /** @type {?} */
    BsDatepickerState.prototype.showWeekNumbers;
    /** @type {?} */
    BsDatepickerState.prototype.displayMonths;
    /** @type {?} */
    BsDatepickerState.prototype.locale;
    /** @type {?} */
    BsDatepickerState.prototype.monthTitle;
    /** @type {?} */
    BsDatepickerState.prototype.yearTitle;
    /** @type {?} */
    BsDatepickerState.prototype.dayLabel;
    /** @type {?} */
    BsDatepickerState.prototype.monthLabel;
    /** @type {?} */
    BsDatepickerState.prototype.yearLabel;
    /** @type {?} */
    BsDatepickerState.prototype.weekNumbers;
}
/** @type {?} */
var _initialView = { date: new Date(), mode: 'day' };
/** @type {?} */
export var initialDatepickerState = Object.assign(new BsDatepickerConfig(), {
    locale: 'en',
    view: _initialView,
    selectedRange: [],
    monthViewOptions: defaultMonthOptions
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZGF0ZXBpY2tlci5zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1ib290c3RyYXAvZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbInJlZHVjZXIvYnMtZGF0ZXBpY2tlci5zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBV0EsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7O0FBRTdELDJDQUdDOzs7SUFGQyxxQ0FBVzs7SUFDWCxxQ0FBMkI7O0FBRzdCO0lBQUE7SUF1REEsQ0FBQztJQUFELHdCQUFDO0FBQUQsQ0FBQyxBQXZERCxJQXVEQzs7OztJQXBEQyx5Q0FBb0I7O0lBRXBCLDBDQUF1Qjs7SUFHdkIsaUNBQTRCOztJQUU1Qix1Q0FBcUI7O0lBRXJCLG9DQUFlOztJQUNmLG9DQUFlOztJQUNmLHlDQUF3Qjs7SUFDeEIsMENBQXVCOztJQUN2QixvQ0FBK0I7O0lBQy9CLDhDQUFrRDs7SUFFbEQsd0NBQW1COztJQUNuQix5Q0FBb0I7O0lBQ3BCLHdDQUFtQjs7SUFHbkIsd0NBQWtDOztJQUNsQyw0Q0FBMEM7O0lBQzFDLDBDQUF3Qzs7SUFDeEMsaURBQStCOztJQUcvQiwyQ0FBMkM7O0lBQzNDLGtEQUFrRDs7SUFHbEQsK0NBQThDOztJQUM5QyxpREFBZ0Q7O0lBR2hELDZDQUFtQzs7SUFHbkMsNENBQTBCOztJQUMxQiwwQ0FBdUI7O0lBR3ZCLG1DQUFlOztJQUVmLHVDQUFtQjs7SUFDbkIsc0NBQWtCOztJQUVsQixxQ0FBaUI7O0lBQ2pCLHVDQUFtQjs7SUFDbkIsc0NBQWtCOztJQUVsQix3Q0FBb0I7OztJQUdoQixZQUFZLEdBQTBCLEVBQUUsSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRTs7QUFFN0UsTUFBTSxLQUFPLHNCQUFzQixHQUFzQixNQUFNLENBQUMsTUFBTSxDQUNwRSxJQUFJLGtCQUFrQixFQUFFLEVBQ3hCO0lBQ0UsTUFBTSxFQUFFLElBQUk7SUFDWixJQUFJLEVBQUUsWUFBWTtJQUNsQixhQUFhLEVBQUUsRUFBRTtJQUNqQixnQkFBZ0IsRUFBRSxtQkFBbUI7Q0FDdEMsQ0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEJzRGF0ZXBpY2tlclZpZXdNb2RlLFxuICBEYXRlcGlja2VyRm9ybWF0T3B0aW9ucyxcbiAgRGF0ZXBpY2tlclJlbmRlck9wdGlvbnMsXG4gIERhdGVwaWNrZXJEYXRlQ3VzdG9tQ2xhc3NlcyxcbiAgRGF5c0NhbGVuZGFyTW9kZWwsXG4gIERheXNDYWxlbmRhclZpZXdNb2RlbCxcbiAgTW9udGhzQ2FsZW5kYXJWaWV3TW9kZWwsXG4gIE1vbnRoVmlld09wdGlvbnMsXG4gIFllYXJzQ2FsZW5kYXJWaWV3TW9kZWxcbn0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7IGRlZmF1bHRNb250aE9wdGlvbnMgfSBmcm9tICcuL19kZWZhdWx0cyc7XG5pbXBvcnQgeyBCc0RhdGVwaWNrZXJDb25maWcgfSBmcm9tICcuLi9icy1kYXRlcGlja2VyLmNvbmZpZyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQnNEYXRlcGlja2VyVmlld1N0YXRlIHtcbiAgZGF0ZTogRGF0ZTtcbiAgbW9kZTogQnNEYXRlcGlja2VyVmlld01vZGU7XG59XG5cbmV4cG9ydCBjbGFzcyBCc0RhdGVwaWNrZXJTdGF0ZVxuICBpbXBsZW1lbnRzIERhdGVwaWNrZXJSZW5kZXJPcHRpb25zLCBEYXRlcGlja2VyRm9ybWF0T3B0aW9ucyB7XG4gIC8vIGRhdGUgcGlja2VyXG4gIHNlbGVjdGVkRGF0ZT86IERhdGU7XG4gIC8vIGRhdGVyYW5nZSBwaWNrZXJcbiAgc2VsZWN0ZWRSYW5nZT86IERhdGVbXTtcblxuICAvLyBpbml0aWFsIGRhdGUgb2YgY2FsZW5kYXIsIHRvZGF5IGJ5IGRlZmF1bHRcbiAgdmlldzogQnNEYXRlcGlja2VyVmlld1N0YXRlO1xuXG4gIGlzRGlzYWJsZWQ/OiBib29sZWFuO1xuICAvLyBib3VuZHNcbiAgbWluRGF0ZT86IERhdGU7XG4gIG1heERhdGU/OiBEYXRlO1xuICBkYXlzRGlzYWJsZWQ/OiBudW1iZXJbXTtcbiAgZGF0ZXNEaXNhYmxlZD86IERhdGVbXTtcbiAgbWluTW9kZT86IEJzRGF0ZXBpY2tlclZpZXdNb2RlO1xuICBkYXRlQ3VzdG9tQ2xhc3Nlcz86IERhdGVwaWNrZXJEYXRlQ3VzdG9tQ2xhc3Nlc1tdO1xuXG4gIGhvdmVyZWREYXRlPzogRGF0ZTtcbiAgaG92ZXJlZE1vbnRoPzogRGF0ZTtcbiAgaG92ZXJlZFllYXI/OiBEYXRlO1xuXG4gIC8vIGRheXMgY2FsZW5kYXJcbiAgbW9udGhzTW9kZWw/OiBEYXlzQ2FsZW5kYXJNb2RlbFtdO1xuICBmb3JtYXR0ZWRNb250aHM/OiBEYXlzQ2FsZW5kYXJWaWV3TW9kZWxbXTtcbiAgZmxhZ2dlZE1vbnRocz86IERheXNDYWxlbmRhclZpZXdNb2RlbFtdO1xuICBzZWxlY3RGcm9tT3RoZXJNb250aD86IGJvb2xlYW47XG5cbiAgLy8gbW9udGhzIGNhbGVuZGFyXG4gIG1vbnRoc0NhbGVuZGFyPzogTW9udGhzQ2FsZW5kYXJWaWV3TW9kZWxbXTtcbiAgZmxhZ2dlZE1vbnRoc0NhbGVuZGFyPzogTW9udGhzQ2FsZW5kYXJWaWV3TW9kZWxbXTtcblxuICAvLyB5ZWFycyBjYWxlbmRhclxuICB5ZWFyc0NhbGVuZGFyTW9kZWw/OiBZZWFyc0NhbGVuZGFyVmlld01vZGVsW107XG4gIHllYXJzQ2FsZW5kYXJGbGFnZ2VkPzogWWVhcnNDYWxlbmRhclZpZXdNb2RlbFtdO1xuXG4gIC8vIG9wdGlvbnNcbiAgbW9udGhWaWV3T3B0aW9uczogTW9udGhWaWV3T3B0aW9ucztcblxuICAvLyBEYXRlcGlja2VyUmVuZGVyT3B0aW9uc1xuICBzaG93V2Vla051bWJlcnM/OiBib29sZWFuO1xuICBkaXNwbGF5TW9udGhzPzogbnVtYmVyO1xuXG4gIC8vIERhdGVwaWNrZXJGb3JtYXRPcHRpb25zXG4gIGxvY2FsZTogc3RyaW5nO1xuXG4gIG1vbnRoVGl0bGU6IHN0cmluZztcbiAgeWVhclRpdGxlOiBzdHJpbmc7XG5cbiAgZGF5TGFiZWw6IHN0cmluZztcbiAgbW9udGhMYWJlbDogc3RyaW5nO1xuICB5ZWFyTGFiZWw6IHN0cmluZztcblxuICB3ZWVrTnVtYmVyczogc3RyaW5nO1xufVxuXG5jb25zdCBfaW5pdGlhbFZpZXc6IEJzRGF0ZXBpY2tlclZpZXdTdGF0ZSA9IHsgZGF0ZTogbmV3IERhdGUoKSwgbW9kZTogJ2RheScgfTtcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxEYXRlcGlja2VyU3RhdGU6IEJzRGF0ZXBpY2tlclN0YXRlID0gT2JqZWN0LmFzc2lnbihcbiAgbmV3IEJzRGF0ZXBpY2tlckNvbmZpZygpLFxuICB7XG4gICAgbG9jYWxlOiAnZW4nLFxuICAgIHZpZXc6IF9pbml0aWFsVmlldyxcbiAgICBzZWxlY3RlZFJhbmdlOiBbXSxcbiAgICBtb250aFZpZXdPcHRpb25zOiBkZWZhdWx0TW9udGhPcHRpb25zXG4gIH1cbik7XG4iXX0=