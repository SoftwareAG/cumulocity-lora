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
export class BsDatepickerState {
}
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
const _initialView = { date: new Date(), mode: 'day' };
/** @type {?} */
export const initialDatepickerState = Object.assign(new BsDatepickerConfig(), {
    locale: 'en',
    view: _initialView,
    selectedRange: [],
    monthViewOptions: defaultMonthOptions
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZGF0ZXBpY2tlci5zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1ib290c3RyYXAvZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbInJlZHVjZXIvYnMtZGF0ZXBpY2tlci5zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBV0EsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7O0FBRTdELDJDQUdDOzs7SUFGQyxxQ0FBVzs7SUFDWCxxQ0FBMkI7O0FBRzdCLE1BQU0sT0FBTyxpQkFBaUI7Q0F1RDdCOzs7SUFwREMseUNBQW9COztJQUVwQiwwQ0FBdUI7O0lBR3ZCLGlDQUE0Qjs7SUFFNUIsdUNBQXFCOztJQUVyQixvQ0FBZTs7SUFDZixvQ0FBZTs7SUFDZix5Q0FBd0I7O0lBQ3hCLDBDQUF1Qjs7SUFDdkIsb0NBQStCOztJQUMvQiw4Q0FBa0Q7O0lBRWxELHdDQUFtQjs7SUFDbkIseUNBQW9COztJQUNwQix3Q0FBbUI7O0lBR25CLHdDQUFrQzs7SUFDbEMsNENBQTBDOztJQUMxQywwQ0FBd0M7O0lBQ3hDLGlEQUErQjs7SUFHL0IsMkNBQTJDOztJQUMzQyxrREFBa0Q7O0lBR2xELCtDQUE4Qzs7SUFDOUMsaURBQWdEOztJQUdoRCw2Q0FBbUM7O0lBR25DLDRDQUEwQjs7SUFDMUIsMENBQXVCOztJQUd2QixtQ0FBZTs7SUFFZix1Q0FBbUI7O0lBQ25CLHNDQUFrQjs7SUFFbEIscUNBQWlCOztJQUNqQix1Q0FBbUI7O0lBQ25CLHNDQUFrQjs7SUFFbEIsd0NBQW9COzs7TUFHaEIsWUFBWSxHQUEwQixFQUFFLElBQUksRUFBRSxJQUFJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUU7O0FBRTdFLE1BQU0sT0FBTyxzQkFBc0IsR0FBc0IsTUFBTSxDQUFDLE1BQU0sQ0FDcEUsSUFBSSxrQkFBa0IsRUFBRSxFQUN4QjtJQUNFLE1BQU0sRUFBRSxJQUFJO0lBQ1osSUFBSSxFQUFFLFlBQVk7SUFDbEIsYUFBYSxFQUFFLEVBQUU7SUFDakIsZ0JBQWdCLEVBQUUsbUJBQW1CO0NBQ3RDLENBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBCc0RhdGVwaWNrZXJWaWV3TW9kZSxcbiAgRGF0ZXBpY2tlckZvcm1hdE9wdGlvbnMsXG4gIERhdGVwaWNrZXJSZW5kZXJPcHRpb25zLFxuICBEYXRlcGlja2VyRGF0ZUN1c3RvbUNsYXNzZXMsXG4gIERheXNDYWxlbmRhck1vZGVsLFxuICBEYXlzQ2FsZW5kYXJWaWV3TW9kZWwsXG4gIE1vbnRoc0NhbGVuZGFyVmlld01vZGVsLFxuICBNb250aFZpZXdPcHRpb25zLFxuICBZZWFyc0NhbGVuZGFyVmlld01vZGVsXG59IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQgeyBkZWZhdWx0TW9udGhPcHRpb25zIH0gZnJvbSAnLi9fZGVmYXVsdHMnO1xuaW1wb3J0IHsgQnNEYXRlcGlja2VyQ29uZmlnIH0gZnJvbSAnLi4vYnMtZGF0ZXBpY2tlci5jb25maWcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJzRGF0ZXBpY2tlclZpZXdTdGF0ZSB7XG4gIGRhdGU6IERhdGU7XG4gIG1vZGU6IEJzRGF0ZXBpY2tlclZpZXdNb2RlO1xufVxuXG5leHBvcnQgY2xhc3MgQnNEYXRlcGlja2VyU3RhdGVcbiAgaW1wbGVtZW50cyBEYXRlcGlja2VyUmVuZGVyT3B0aW9ucywgRGF0ZXBpY2tlckZvcm1hdE9wdGlvbnMge1xuICAvLyBkYXRlIHBpY2tlclxuICBzZWxlY3RlZERhdGU/OiBEYXRlO1xuICAvLyBkYXRlcmFuZ2UgcGlja2VyXG4gIHNlbGVjdGVkUmFuZ2U/OiBEYXRlW107XG5cbiAgLy8gaW5pdGlhbCBkYXRlIG9mIGNhbGVuZGFyLCB0b2RheSBieSBkZWZhdWx0XG4gIHZpZXc6IEJzRGF0ZXBpY2tlclZpZXdTdGF0ZTtcblxuICBpc0Rpc2FibGVkPzogYm9vbGVhbjtcbiAgLy8gYm91bmRzXG4gIG1pbkRhdGU/OiBEYXRlO1xuICBtYXhEYXRlPzogRGF0ZTtcbiAgZGF5c0Rpc2FibGVkPzogbnVtYmVyW107XG4gIGRhdGVzRGlzYWJsZWQ/OiBEYXRlW107XG4gIG1pbk1vZGU/OiBCc0RhdGVwaWNrZXJWaWV3TW9kZTtcbiAgZGF0ZUN1c3RvbUNsYXNzZXM/OiBEYXRlcGlja2VyRGF0ZUN1c3RvbUNsYXNzZXNbXTtcblxuICBob3ZlcmVkRGF0ZT86IERhdGU7XG4gIGhvdmVyZWRNb250aD86IERhdGU7XG4gIGhvdmVyZWRZZWFyPzogRGF0ZTtcblxuICAvLyBkYXlzIGNhbGVuZGFyXG4gIG1vbnRoc01vZGVsPzogRGF5c0NhbGVuZGFyTW9kZWxbXTtcbiAgZm9ybWF0dGVkTW9udGhzPzogRGF5c0NhbGVuZGFyVmlld01vZGVsW107XG4gIGZsYWdnZWRNb250aHM/OiBEYXlzQ2FsZW5kYXJWaWV3TW9kZWxbXTtcbiAgc2VsZWN0RnJvbU90aGVyTW9udGg/OiBib29sZWFuO1xuXG4gIC8vIG1vbnRocyBjYWxlbmRhclxuICBtb250aHNDYWxlbmRhcj86IE1vbnRoc0NhbGVuZGFyVmlld01vZGVsW107XG4gIGZsYWdnZWRNb250aHNDYWxlbmRhcj86IE1vbnRoc0NhbGVuZGFyVmlld01vZGVsW107XG5cbiAgLy8geWVhcnMgY2FsZW5kYXJcbiAgeWVhcnNDYWxlbmRhck1vZGVsPzogWWVhcnNDYWxlbmRhclZpZXdNb2RlbFtdO1xuICB5ZWFyc0NhbGVuZGFyRmxhZ2dlZD86IFllYXJzQ2FsZW5kYXJWaWV3TW9kZWxbXTtcblxuICAvLyBvcHRpb25zXG4gIG1vbnRoVmlld09wdGlvbnM6IE1vbnRoVmlld09wdGlvbnM7XG5cbiAgLy8gRGF0ZXBpY2tlclJlbmRlck9wdGlvbnNcbiAgc2hvd1dlZWtOdW1iZXJzPzogYm9vbGVhbjtcbiAgZGlzcGxheU1vbnRocz86IG51bWJlcjtcblxuICAvLyBEYXRlcGlja2VyRm9ybWF0T3B0aW9uc1xuICBsb2NhbGU6IHN0cmluZztcblxuICBtb250aFRpdGxlOiBzdHJpbmc7XG4gIHllYXJUaXRsZTogc3RyaW5nO1xuXG4gIGRheUxhYmVsOiBzdHJpbmc7XG4gIG1vbnRoTGFiZWw6IHN0cmluZztcbiAgeWVhckxhYmVsOiBzdHJpbmc7XG5cbiAgd2Vla051bWJlcnM6IHN0cmluZztcbn1cblxuY29uc3QgX2luaXRpYWxWaWV3OiBCc0RhdGVwaWNrZXJWaWV3U3RhdGUgPSB7IGRhdGU6IG5ldyBEYXRlKCksIG1vZGU6ICdkYXknIH07XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsRGF0ZXBpY2tlclN0YXRlOiBCc0RhdGVwaWNrZXJTdGF0ZSA9IE9iamVjdC5hc3NpZ24oXG4gIG5ldyBCc0RhdGVwaWNrZXJDb25maWcoKSxcbiAge1xuICAgIGxvY2FsZTogJ2VuJyxcbiAgICB2aWV3OiBfaW5pdGlhbFZpZXcsXG4gICAgc2VsZWN0ZWRSYW5nZTogW10sXG4gICAgbW9udGhWaWV3T3B0aW9uczogZGVmYXVsdE1vbnRoT3B0aW9uc1xuICB9XG4pO1xuIl19