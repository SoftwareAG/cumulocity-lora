/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isSameYear, shiftDate } from 'ngx-bootstrap/chronos';
import { isYearDisabled } from '../utils/bs-calendar-utils';
/**
 * @record
 */
export function FlagYearsCalendarOptions() { }
if (false) {
    /** @type {?} */
    FlagYearsCalendarOptions.prototype.isDisabled;
    /** @type {?} */
    FlagYearsCalendarOptions.prototype.minDate;
    /** @type {?} */
    FlagYearsCalendarOptions.prototype.maxDate;
    /** @type {?} */
    FlagYearsCalendarOptions.prototype.hoveredYear;
    /** @type {?} */
    FlagYearsCalendarOptions.prototype.displayMonths;
    /** @type {?} */
    FlagYearsCalendarOptions.prototype.yearIndex;
}
/**
 * @param {?} yearsCalendar
 * @param {?} options
 * @return {?}
 */
export function flagYearsCalendar(yearsCalendar, options) {
    yearsCalendar.years.forEach((/**
     * @param {?} years
     * @param {?} rowIndex
     * @return {?}
     */
    function (years, rowIndex) {
        years.forEach((/**
         * @param {?} year
         * @param {?} yearIndex
         * @return {?}
         */
        function (year, yearIndex) {
            /** @type {?} */
            var isHovered = isSameYear(year.date, options.hoveredYear);
            /** @type {?} */
            var isDisabled = options.isDisabled ||
                isYearDisabled(year.date, options.minDate, options.maxDate);
            /** @type {?} */
            var newMonth = Object.assign(/*{},*/ year, { isHovered: isHovered, isDisabled: isDisabled });
            if (year.isHovered !== newMonth.isHovered ||
                year.isDisabled !== newMonth.isDisabled) {
                yearsCalendar.years[rowIndex][yearIndex] = newMonth;
            }
        }));
    }));
    // todo: add check for linked calendars
    yearsCalendar.hideLeftArrow =
        options.yearIndex > 0 && options.yearIndex !== options.displayMonths;
    yearsCalendar.hideRightArrow =
        options.yearIndex < options.displayMonths &&
            options.yearIndex + 1 !== options.displayMonths;
    yearsCalendar.disableLeftArrow = isYearDisabled(shiftDate(yearsCalendar.years[0][0].date, { year: -1 }), options.minDate, options.maxDate);
    /** @type {?} */
    var i = yearsCalendar.years.length - 1;
    /** @type {?} */
    var j = yearsCalendar.years[i].length - 1;
    yearsCalendar.disableRightArrow = isYearDisabled(shiftDate(yearsCalendar.years[i][j].date, { year: 1 }), options.minDate, options.maxDate);
    return yearsCalendar;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhZy15ZWFycy1jYWxlbmRhci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1ib290c3RyYXAvZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbImVuZ2luZS9mbGFnLXllYXJzLWNhbGVuZGFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTlELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7OztBQUU1RCw4Q0FPQzs7O0lBTkMsOENBQW9COztJQUNwQiwyQ0FBYzs7SUFDZCwyQ0FBYzs7SUFDZCwrQ0FBa0I7O0lBQ2xCLGlEQUFzQjs7SUFDdEIsNkNBQWtCOzs7Ozs7O0FBR3BCLE1BQU0sVUFBVSxpQkFBaUIsQ0FDL0IsYUFBcUMsRUFDckMsT0FBaUM7SUFFakMsYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPOzs7OztJQUN6QixVQUFDLEtBQThCLEVBQUUsUUFBZ0I7UUFDL0MsS0FBSyxDQUFDLE9BQU87Ozs7O1FBQUMsVUFBQyxJQUEyQixFQUFFLFNBQWlCOztnQkFDckQsU0FBUyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUM7O2dCQUN0RCxVQUFVLEdBQ2QsT0FBTyxDQUFDLFVBQVU7Z0JBQ2xCLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQzs7Z0JBRXZELFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxTQUFTLFdBQUEsRUFBRSxVQUFVLFlBQUEsRUFBRSxDQUFDO1lBQ3ZFLElBQ0UsSUFBSSxDQUFDLFNBQVMsS0FBSyxRQUFRLENBQUMsU0FBUztnQkFDckMsSUFBSSxDQUFDLFVBQVUsS0FBSyxRQUFRLENBQUMsVUFBVSxFQUN2QztnQkFDQSxhQUFhLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLFFBQVEsQ0FBQzthQUNyRDtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQyxFQUNGLENBQUM7SUFFRix1Q0FBdUM7SUFDdkMsYUFBYSxDQUFDLGFBQWE7UUFDekIsT0FBTyxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLFNBQVMsS0FBSyxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQ3ZFLGFBQWEsQ0FBQyxjQUFjO1FBQzFCLE9BQU8sQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLGFBQWE7WUFDekMsT0FBTyxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUVsRCxhQUFhLENBQUMsZ0JBQWdCLEdBQUcsY0FBYyxDQUM3QyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUN2RCxPQUFPLENBQUMsT0FBTyxFQUNmLE9BQU8sQ0FBQyxPQUFPLENBQ2hCLENBQUM7O1FBQ0ksQ0FBQyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUM7O1FBQ2xDLENBQUMsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDO0lBQzNDLGFBQWEsQ0FBQyxpQkFBaUIsR0FBRyxjQUFjLENBQzlDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUN0RCxPQUFPLENBQUMsT0FBTyxFQUNmLE9BQU8sQ0FBQyxPQUFPLENBQ2hCLENBQUM7SUFFRixPQUFPLGFBQWEsQ0FBQztBQUN2QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNTYW1lWWVhciwgc2hpZnREYXRlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9jaHJvbm9zJztcbmltcG9ydCB7IFllYXJzQ2FsZW5kYXJWaWV3TW9kZWwsIENhbGVuZGFyQ2VsbFZpZXdNb2RlbCB9IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQgeyBpc1llYXJEaXNhYmxlZCB9IGZyb20gJy4uL3V0aWxzL2JzLWNhbGVuZGFyLXV0aWxzJztcblxuZXhwb3J0IGludGVyZmFjZSBGbGFnWWVhcnNDYWxlbmRhck9wdGlvbnMge1xuICBpc0Rpc2FibGVkOiBib29sZWFuO1xuICBtaW5EYXRlOiBEYXRlO1xuICBtYXhEYXRlOiBEYXRlO1xuICBob3ZlcmVkWWVhcjogRGF0ZTtcbiAgZGlzcGxheU1vbnRoczogbnVtYmVyO1xuICB5ZWFySW5kZXg6IG51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZsYWdZZWFyc0NhbGVuZGFyKFxuICB5ZWFyc0NhbGVuZGFyOiBZZWFyc0NhbGVuZGFyVmlld01vZGVsLFxuICBvcHRpb25zOiBGbGFnWWVhcnNDYWxlbmRhck9wdGlvbnNcbik6IFllYXJzQ2FsZW5kYXJWaWV3TW9kZWwge1xuICB5ZWFyc0NhbGVuZGFyLnllYXJzLmZvckVhY2goXG4gICAgKHllYXJzOiBDYWxlbmRhckNlbGxWaWV3TW9kZWxbXSwgcm93SW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgeWVhcnMuZm9yRWFjaCgoeWVhcjogQ2FsZW5kYXJDZWxsVmlld01vZGVsLCB5ZWFySW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCBpc0hvdmVyZWQgPSBpc1NhbWVZZWFyKHllYXIuZGF0ZSwgb3B0aW9ucy5ob3ZlcmVkWWVhcik7XG4gICAgICAgIGNvbnN0IGlzRGlzYWJsZWQgPVxuICAgICAgICAgIG9wdGlvbnMuaXNEaXNhYmxlZCB8fFxuICAgICAgICAgIGlzWWVhckRpc2FibGVkKHllYXIuZGF0ZSwgb3B0aW9ucy5taW5EYXRlLCBvcHRpb25zLm1heERhdGUpO1xuXG4gICAgICAgIGNvbnN0IG5ld01vbnRoID0gT2JqZWN0LmFzc2lnbigvKnt9LCovIHllYXIsIHsgaXNIb3ZlcmVkLCBpc0Rpc2FibGVkIH0pO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgeWVhci5pc0hvdmVyZWQgIT09IG5ld01vbnRoLmlzSG92ZXJlZCB8fFxuICAgICAgICAgIHllYXIuaXNEaXNhYmxlZCAhPT0gbmV3TW9udGguaXNEaXNhYmxlZFxuICAgICAgICApIHtcbiAgICAgICAgICB5ZWFyc0NhbGVuZGFyLnllYXJzW3Jvd0luZGV4XVt5ZWFySW5kZXhdID0gbmV3TW9udGg7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgKTtcblxuICAvLyB0b2RvOiBhZGQgY2hlY2sgZm9yIGxpbmtlZCBjYWxlbmRhcnNcbiAgeWVhcnNDYWxlbmRhci5oaWRlTGVmdEFycm93ID1cbiAgICBvcHRpb25zLnllYXJJbmRleCA+IDAgJiYgb3B0aW9ucy55ZWFySW5kZXggIT09IG9wdGlvbnMuZGlzcGxheU1vbnRocztcbiAgeWVhcnNDYWxlbmRhci5oaWRlUmlnaHRBcnJvdyA9XG4gICAgb3B0aW9ucy55ZWFySW5kZXggPCBvcHRpb25zLmRpc3BsYXlNb250aHMgJiZcbiAgICBvcHRpb25zLnllYXJJbmRleCArIDEgIT09IG9wdGlvbnMuZGlzcGxheU1vbnRocztcblxuICB5ZWFyc0NhbGVuZGFyLmRpc2FibGVMZWZ0QXJyb3cgPSBpc1llYXJEaXNhYmxlZChcbiAgICBzaGlmdERhdGUoeWVhcnNDYWxlbmRhci55ZWFyc1swXVswXS5kYXRlLCB7IHllYXI6IC0xIH0pLFxuICAgIG9wdGlvbnMubWluRGF0ZSxcbiAgICBvcHRpb25zLm1heERhdGVcbiAgKTtcbiAgY29uc3QgaSA9IHllYXJzQ2FsZW5kYXIueWVhcnMubGVuZ3RoIC0gMTtcbiAgY29uc3QgaiA9IHllYXJzQ2FsZW5kYXIueWVhcnNbaV0ubGVuZ3RoIC0gMTtcbiAgeWVhcnNDYWxlbmRhci5kaXNhYmxlUmlnaHRBcnJvdyA9IGlzWWVhckRpc2FibGVkKFxuICAgIHNoaWZ0RGF0ZSh5ZWFyc0NhbGVuZGFyLnllYXJzW2ldW2pdLmRhdGUsIHsgeWVhcjogMSB9KSxcbiAgICBvcHRpb25zLm1pbkRhdGUsXG4gICAgb3B0aW9ucy5tYXhEYXRlXG4gICk7XG5cbiAgcmV0dXJuIHllYXJzQ2FsZW5kYXI7XG59XG4iXX0=