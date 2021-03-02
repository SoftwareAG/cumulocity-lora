/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isSameMonth, shiftDate } from 'ngx-bootstrap/chronos';
import { isMonthDisabled, isYearDisabled } from '../utils/bs-calendar-utils';
/**
 * @record
 */
export function FlagMonthCalendarOptions() { }
if (false) {
    /** @type {?} */
    FlagMonthCalendarOptions.prototype.isDisabled;
    /** @type {?} */
    FlagMonthCalendarOptions.prototype.minDate;
    /** @type {?} */
    FlagMonthCalendarOptions.prototype.maxDate;
    /** @type {?} */
    FlagMonthCalendarOptions.prototype.hoveredMonth;
    /** @type {?} */
    FlagMonthCalendarOptions.prototype.displayMonths;
    /** @type {?} */
    FlagMonthCalendarOptions.prototype.monthIndex;
}
/**
 * @param {?} monthCalendar
 * @param {?} options
 * @return {?}
 */
export function flagMonthsCalendar(monthCalendar, options) {
    monthCalendar.months.forEach((/**
     * @param {?} months
     * @param {?} rowIndex
     * @return {?}
     */
    (months, rowIndex) => {
        months.forEach((/**
         * @param {?} month
         * @param {?} monthIndex
         * @return {?}
         */
        (month, monthIndex) => {
            /** @type {?} */
            const isHovered = isSameMonth(month.date, options.hoveredMonth);
            /** @type {?} */
            const isDisabled = options.isDisabled ||
                isMonthDisabled(month.date, options.minDate, options.maxDate);
            /** @type {?} */
            const newMonth = Object.assign(/*{},*/ month, {
                isHovered,
                isDisabled
            });
            if (month.isHovered !== newMonth.isHovered ||
                month.isDisabled !== newMonth.isDisabled) {
                monthCalendar.months[rowIndex][monthIndex] = newMonth;
            }
        }));
    }));
    // todo: add check for linked calendars
    monthCalendar.hideLeftArrow =
        options.monthIndex > 0 && options.monthIndex !== options.displayMonths;
    monthCalendar.hideRightArrow =
        options.monthIndex < options.displayMonths &&
            options.monthIndex + 1 !== options.displayMonths;
    monthCalendar.disableLeftArrow = isYearDisabled(shiftDate(monthCalendar.months[0][0].date, { year: -1 }), options.minDate, options.maxDate);
    monthCalendar.disableRightArrow = isYearDisabled(shiftDate(monthCalendar.months[0][0].date, { year: 1 }), options.minDate, options.maxDate);
    return monthCalendar;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhZy1tb250aHMtY2FsZW5kYXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYm9vdHN0cmFwL2RhdGVwaWNrZXIvIiwic291cmNlcyI6WyJlbmdpbmUvZmxhZy1tb250aHMtY2FsZW5kYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFLL0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7OztBQUU3RSw4Q0FPQzs7O0lBTkMsOENBQW9COztJQUNwQiwyQ0FBYzs7SUFDZCwyQ0FBYzs7SUFDZCxnREFBbUI7O0lBQ25CLGlEQUFzQjs7SUFDdEIsOENBQW1COzs7Ozs7O0FBR3JCLE1BQU0sVUFBVSxrQkFBa0IsQ0FDaEMsYUFBc0MsRUFDdEMsT0FBaUM7SUFFakMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxPQUFPOzs7OztJQUMxQixDQUFDLE1BQStCLEVBQUUsUUFBZ0IsRUFBRSxFQUFFO1FBQ3BELE1BQU0sQ0FBQyxPQUFPOzs7OztRQUFDLENBQUMsS0FBNEIsRUFBRSxVQUFrQixFQUFFLEVBQUU7O2tCQUM1RCxTQUFTLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQzs7a0JBQ3pELFVBQVUsR0FDZCxPQUFPLENBQUMsVUFBVTtnQkFDbEIsZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDOztrQkFDekQsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDNUMsU0FBUztnQkFDVCxVQUFVO2FBQ1gsQ0FBQztZQUNGLElBQ0UsS0FBSyxDQUFDLFNBQVMsS0FBSyxRQUFRLENBQUMsU0FBUztnQkFDdEMsS0FBSyxDQUFDLFVBQVUsS0FBSyxRQUFRLENBQUMsVUFBVSxFQUN4QztnQkFDQSxhQUFhLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBQzthQUN2RDtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQyxFQUNGLENBQUM7SUFFRix1Q0FBdUM7SUFDdkMsYUFBYSxDQUFDLGFBQWE7UUFDekIsT0FBTyxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLFVBQVUsS0FBSyxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQ3pFLGFBQWEsQ0FBQyxjQUFjO1FBQzFCLE9BQU8sQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLGFBQWE7WUFDMUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxDQUFDLEtBQUssT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUVuRCxhQUFhLENBQUMsZ0JBQWdCLEdBQUcsY0FBYyxDQUM3QyxTQUFTLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUN4RCxPQUFPLENBQUMsT0FBTyxFQUNmLE9BQU8sQ0FBQyxPQUFPLENBQ2hCLENBQUM7SUFDRixhQUFhLENBQUMsaUJBQWlCLEdBQUcsY0FBYyxDQUM5QyxTQUFTLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFDdkQsT0FBTyxDQUFDLE9BQU8sRUFDZixPQUFPLENBQUMsT0FBTyxDQUNoQixDQUFDO0lBRUYsT0FBTyxhQUFhLENBQUM7QUFDdkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzU2FtZU1vbnRoLCBzaGlmdERhdGUgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2Nocm9ub3MnO1xuaW1wb3J0IHtcbiAgTW9udGhzQ2FsZW5kYXJWaWV3TW9kZWwsXG4gIENhbGVuZGFyQ2VsbFZpZXdNb2RlbFxufSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHsgaXNNb250aERpc2FibGVkLCBpc1llYXJEaXNhYmxlZCB9IGZyb20gJy4uL3V0aWxzL2JzLWNhbGVuZGFyLXV0aWxzJztcblxuZXhwb3J0IGludGVyZmFjZSBGbGFnTW9udGhDYWxlbmRhck9wdGlvbnMge1xuICBpc0Rpc2FibGVkOiBib29sZWFuO1xuICBtaW5EYXRlOiBEYXRlO1xuICBtYXhEYXRlOiBEYXRlO1xuICBob3ZlcmVkTW9udGg6IERhdGU7XG4gIGRpc3BsYXlNb250aHM6IG51bWJlcjtcbiAgbW9udGhJbmRleDogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmxhZ01vbnRoc0NhbGVuZGFyKFxuICBtb250aENhbGVuZGFyOiBNb250aHNDYWxlbmRhclZpZXdNb2RlbCxcbiAgb3B0aW9uczogRmxhZ01vbnRoQ2FsZW5kYXJPcHRpb25zXG4pOiBNb250aHNDYWxlbmRhclZpZXdNb2RlbCB7XG4gIG1vbnRoQ2FsZW5kYXIubW9udGhzLmZvckVhY2goXG4gICAgKG1vbnRoczogQ2FsZW5kYXJDZWxsVmlld01vZGVsW10sIHJvd0luZGV4OiBudW1iZXIpID0+IHtcbiAgICAgIG1vbnRocy5mb3JFYWNoKChtb250aDogQ2FsZW5kYXJDZWxsVmlld01vZGVsLCBtb250aEluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgY29uc3QgaXNIb3ZlcmVkID0gaXNTYW1lTW9udGgobW9udGguZGF0ZSwgb3B0aW9ucy5ob3ZlcmVkTW9udGgpO1xuICAgICAgICBjb25zdCBpc0Rpc2FibGVkID1cbiAgICAgICAgICBvcHRpb25zLmlzRGlzYWJsZWQgfHxcbiAgICAgICAgICBpc01vbnRoRGlzYWJsZWQobW9udGguZGF0ZSwgb3B0aW9ucy5taW5EYXRlLCBvcHRpb25zLm1heERhdGUpO1xuICAgICAgICBjb25zdCBuZXdNb250aCA9IE9iamVjdC5hc3NpZ24oLyp7fSwqLyBtb250aCwge1xuICAgICAgICAgIGlzSG92ZXJlZCxcbiAgICAgICAgICBpc0Rpc2FibGVkXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgbW9udGguaXNIb3ZlcmVkICE9PSBuZXdNb250aC5pc0hvdmVyZWQgfHxcbiAgICAgICAgICBtb250aC5pc0Rpc2FibGVkICE9PSBuZXdNb250aC5pc0Rpc2FibGVkXG4gICAgICAgICkge1xuICAgICAgICAgIG1vbnRoQ2FsZW5kYXIubW9udGhzW3Jvd0luZGV4XVttb250aEluZGV4XSA9IG5ld01vbnRoO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICk7XG5cbiAgLy8gdG9kbzogYWRkIGNoZWNrIGZvciBsaW5rZWQgY2FsZW5kYXJzXG4gIG1vbnRoQ2FsZW5kYXIuaGlkZUxlZnRBcnJvdyA9XG4gICAgb3B0aW9ucy5tb250aEluZGV4ID4gMCAmJiBvcHRpb25zLm1vbnRoSW5kZXggIT09IG9wdGlvbnMuZGlzcGxheU1vbnRocztcbiAgbW9udGhDYWxlbmRhci5oaWRlUmlnaHRBcnJvdyA9XG4gICAgb3B0aW9ucy5tb250aEluZGV4IDwgb3B0aW9ucy5kaXNwbGF5TW9udGhzICYmXG4gICAgb3B0aW9ucy5tb250aEluZGV4ICsgMSAhPT0gb3B0aW9ucy5kaXNwbGF5TW9udGhzO1xuXG4gIG1vbnRoQ2FsZW5kYXIuZGlzYWJsZUxlZnRBcnJvdyA9IGlzWWVhckRpc2FibGVkKFxuICAgIHNoaWZ0RGF0ZShtb250aENhbGVuZGFyLm1vbnRoc1swXVswXS5kYXRlLCB7IHllYXI6IC0xIH0pLFxuICAgIG9wdGlvbnMubWluRGF0ZSxcbiAgICBvcHRpb25zLm1heERhdGVcbiAgKTtcbiAgbW9udGhDYWxlbmRhci5kaXNhYmxlUmlnaHRBcnJvdyA9IGlzWWVhckRpc2FibGVkKFxuICAgIHNoaWZ0RGF0ZShtb250aENhbGVuZGFyLm1vbnRoc1swXVswXS5kYXRlLCB7IHllYXI6IDEgfSksXG4gICAgb3B0aW9ucy5taW5EYXRlLFxuICAgIG9wdGlvbnMubWF4RGF0ZVxuICApO1xuXG4gIHJldHVybiBtb250aENhbGVuZGFyO1xufVxuIl19