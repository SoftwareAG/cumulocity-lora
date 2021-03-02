/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isAfter, isBefore, isDisabledDay, isSameDay, isSameMonth, shiftDate } from 'ngx-bootstrap/chronos';
import { isMonthDisabled, isDisabledDate } from '../utils/bs-calendar-utils';
/**
 * @record
 */
export function FlagDaysCalendarOptions() { }
if (false) {
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.isDisabled;
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.minDate;
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.maxDate;
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.daysDisabled;
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.datesDisabled;
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.hoveredDate;
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.selectedDate;
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.selectedRange;
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.displayMonths;
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.monthIndex;
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.dateCustomClasses;
}
/**
 * @param {?} formattedMonth
 * @param {?} options
 * @return {?}
 */
export function flagDaysCalendar(formattedMonth, options) {
    formattedMonth.weeks.forEach((/**
     * @param {?} week
     * @return {?}
     */
    function (week) {
        /* tslint:disable-next-line: cyclomatic-complexity */
        week.days.forEach((/**
         * @param {?} day
         * @param {?} dayIndex
         * @return {?}
         */
        function (day, dayIndex) {
            // datepicker
            /** @type {?} */
            var isOtherMonth = !isSameMonth(day.date, formattedMonth.month);
            /** @type {?} */
            var isHovered = !isOtherMonth && isSameDay(day.date, options.hoveredDate);
            // date range picker
            /** @type {?} */
            var isSelectionStart = !isOtherMonth &&
                options.selectedRange &&
                isSameDay(day.date, options.selectedRange[0]);
            /** @type {?} */
            var isSelectionEnd = !isOtherMonth &&
                options.selectedRange &&
                isSameDay(day.date, options.selectedRange[1]);
            /** @type {?} */
            var isSelected = (!isOtherMonth && isSameDay(day.date, options.selectedDate)) ||
                isSelectionStart ||
                isSelectionEnd;
            /** @type {?} */
            var isInRange = !isOtherMonth &&
                options.selectedRange &&
                isDateInRange(day.date, options.selectedRange, options.hoveredDate);
            /** @type {?} */
            var isDisabled = options.isDisabled ||
                isBefore(day.date, options.minDate, 'day') ||
                isAfter(day.date, options.maxDate, 'day') ||
                isDisabledDay(day.date, options.daysDisabled) ||
                isDisabledDate(day.date, options.datesDisabled);
            /** @type {?} */
            var currentDate = new Date();
            /** @type {?} */
            var isToday = !isOtherMonth && isSameDay(day.date, currentDate);
            /** @type {?} */
            var customClasses = options.dateCustomClasses && options.dateCustomClasses
                .map((/**
             * @param {?} dcc
             * @return {?}
             */
            function (dcc) { return isSameDay(day.date, dcc.date) ? dcc.classes : []; }))
                .reduce((/**
             * @param {?} previousValue
             * @param {?} currentValue
             * @return {?}
             */
            function (previousValue, currentValue) { return previousValue.concat(currentValue); }), [])
                .join(' ')
                || '';
            // decide update or not
            /** @type {?} */
            var newDay = Object.assign({}, day, {
                isOtherMonth: isOtherMonth,
                isHovered: isHovered,
                isSelected: isSelected,
                isSelectionStart: isSelectionStart,
                isSelectionEnd: isSelectionEnd,
                isInRange: isInRange,
                isDisabled: isDisabled,
                isToday: isToday,
                customClasses: customClasses
            });
            if (day.isOtherMonth !== newDay.isOtherMonth ||
                day.isHovered !== newDay.isHovered ||
                day.isSelected !== newDay.isSelected ||
                day.isSelectionStart !== newDay.isSelectionStart ||
                day.isSelectionEnd !== newDay.isSelectionEnd ||
                day.isDisabled !== newDay.isDisabled ||
                day.isInRange !== newDay.isInRange ||
                day.customClasses !== newDay.customClasses) {
                week.days[dayIndex] = newDay;
            }
        }));
    }));
    // todo: add check for linked calendars
    formattedMonth.hideLeftArrow =
        options.isDisabled ||
            (options.monthIndex > 0 && options.monthIndex !== options.displayMonths);
    formattedMonth.hideRightArrow =
        options.isDisabled ||
            (options.monthIndex < options.displayMonths &&
                options.monthIndex + 1 !== options.displayMonths);
    formattedMonth.disableLeftArrow = isMonthDisabled(shiftDate(formattedMonth.month, { month: -1 }), options.minDate, options.maxDate);
    formattedMonth.disableRightArrow = isMonthDisabled(shiftDate(formattedMonth.month, { month: 1 }), options.minDate, options.maxDate);
    return formattedMonth;
}
/**
 * @param {?} date
 * @param {?} selectedRange
 * @param {?} hoveredDate
 * @return {?}
 */
function isDateInRange(date, selectedRange, hoveredDate) {
    if (!date || !selectedRange[0]) {
        return false;
    }
    if (selectedRange[1]) {
        return date > selectedRange[0] && date <= selectedRange[1];
    }
    if (hoveredDate) {
        return date > selectedRange[0] && date <= hoveredDate;
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhZy1kYXlzLWNhbGVuZGFyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWJvb3RzdHJhcC9kYXRlcGlja2VyLyIsInNvdXJjZXMiOlsiZW5naW5lL2ZsYWctZGF5cy1jYWxlbmRhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBT0EsT0FBTyxFQUNMLE9BQU8sRUFDUCxRQUFRLEVBQ1IsYUFBYSxFQUNiLFNBQVMsRUFDVCxXQUFXLEVBQ1gsU0FBUyxFQUNWLE1BQU0sdUJBQXVCLENBQUM7QUFFL0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7OztBQUU3RSw2Q0FZQzs7O0lBWEMsNkNBQW9COztJQUNwQiwwQ0FBYzs7SUFDZCwwQ0FBYzs7SUFDZCwrQ0FBdUI7O0lBQ3ZCLGdEQUFzQjs7SUFDdEIsOENBQWtCOztJQUNsQiwrQ0FBbUI7O0lBQ25CLGdEQUFzQjs7SUFDdEIsZ0RBQXNCOztJQUN0Qiw2Q0FBbUI7O0lBQ25CLG9EQUFpRDs7Ozs7OztBQUduRCxNQUFNLFVBQVUsZ0JBQWdCLENBQzlCLGNBQXFDLEVBQ3JDLE9BQWdDO0lBRWhDLGNBQWMsQ0FBQyxLQUFLLENBQUMsT0FBTzs7OztJQUFDLFVBQUMsSUFBbUI7UUFDL0MscURBQXFEO1FBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTzs7Ozs7UUFBQyxVQUFDLEdBQWlCLEVBQUUsUUFBZ0I7OztnQkFFOUMsWUFBWSxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLEtBQUssQ0FBQzs7Z0JBRTNELFNBQVMsR0FDYixDQUFDLFlBQVksSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDOzs7Z0JBRXJELGdCQUFnQixHQUNwQixDQUFDLFlBQVk7Z0JBQ2IsT0FBTyxDQUFDLGFBQWE7Z0JBQ3JCLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQUN6QyxjQUFjLEdBQ2xCLENBQUMsWUFBWTtnQkFDYixPQUFPLENBQUMsYUFBYTtnQkFDckIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0JBRXpDLFVBQVUsR0FDZCxDQUFDLENBQUMsWUFBWSxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDNUQsZ0JBQWdCO2dCQUNoQixjQUFjOztnQkFFVixTQUFTLEdBQ2IsQ0FBQyxZQUFZO2dCQUNiLE9BQU8sQ0FBQyxhQUFhO2dCQUNyQixhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUM7O2dCQUUvRCxVQUFVLEdBQ2QsT0FBTyxDQUFDLFVBQVU7Z0JBQ2xCLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDO2dCQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQztnQkFDekMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQztnQkFDN0MsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBQzs7Z0JBRTNDLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRTs7Z0JBQ3hCLE9BQU8sR0FBRyxDQUFDLFlBQVksSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUM7O2dCQUUzRCxhQUFhLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixJQUFJLE9BQU8sQ0FBQyxpQkFBaUI7aUJBQ3pFLEdBQUc7Ozs7WUFBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFoRCxDQUFnRCxFQUFDO2lCQUM1RCxNQUFNOzs7OztZQUFDLFVBQUMsYUFBYSxFQUFFLFlBQVksSUFBSyxPQUFBLGFBQWEsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQWxDLENBQWtDLEdBQUUsRUFBRSxDQUFDO2lCQUMvRSxJQUFJLENBQUMsR0FBRyxDQUFDO21CQUNQLEVBQUU7OztnQkFJRCxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFO2dCQUNwQyxZQUFZLGNBQUE7Z0JBQ1osU0FBUyxXQUFBO2dCQUNULFVBQVUsWUFBQTtnQkFDVixnQkFBZ0Isa0JBQUE7Z0JBQ2hCLGNBQWMsZ0JBQUE7Z0JBQ2QsU0FBUyxXQUFBO2dCQUNULFVBQVUsWUFBQTtnQkFDVixPQUFPLFNBQUE7Z0JBQ1AsYUFBYSxlQUFBO2FBQ2QsQ0FBQztZQUVGLElBQ0UsR0FBRyxDQUFDLFlBQVksS0FBSyxNQUFNLENBQUMsWUFBWTtnQkFDeEMsR0FBRyxDQUFDLFNBQVMsS0FBSyxNQUFNLENBQUMsU0FBUztnQkFDbEMsR0FBRyxDQUFDLFVBQVUsS0FBSyxNQUFNLENBQUMsVUFBVTtnQkFDcEMsR0FBRyxDQUFDLGdCQUFnQixLQUFLLE1BQU0sQ0FBQyxnQkFBZ0I7Z0JBQ2hELEdBQUcsQ0FBQyxjQUFjLEtBQUssTUFBTSxDQUFDLGNBQWM7Z0JBQzVDLEdBQUcsQ0FBQyxVQUFVLEtBQUssTUFBTSxDQUFDLFVBQVU7Z0JBQ3BDLEdBQUcsQ0FBQyxTQUFTLEtBQUssTUFBTSxDQUFDLFNBQVM7Z0JBQ2xDLEdBQUcsQ0FBQyxhQUFhLEtBQUssTUFBTSxDQUFDLGFBQWEsRUFDMUM7Z0JBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxNQUFNLENBQUM7YUFDOUI7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUMsRUFBQyxDQUFDO0lBRUgsdUNBQXVDO0lBQ3ZDLGNBQWMsQ0FBQyxhQUFhO1FBQzFCLE9BQU8sQ0FBQyxVQUFVO1lBQ2xCLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLFVBQVUsS0FBSyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDM0UsY0FBYyxDQUFDLGNBQWM7UUFDM0IsT0FBTyxDQUFDLFVBQVU7WUFDbEIsQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxhQUFhO2dCQUN6QyxPQUFPLENBQUMsVUFBVSxHQUFHLENBQUMsS0FBSyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7SUFFdEQsY0FBYyxDQUFDLGdCQUFnQixHQUFHLGVBQWUsQ0FDL0MsU0FBUyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUM5QyxPQUFPLENBQUMsT0FBTyxFQUNmLE9BQU8sQ0FBQyxPQUFPLENBQ2hCLENBQUM7SUFDRixjQUFjLENBQUMsaUJBQWlCLEdBQUcsZUFBZSxDQUNoRCxTQUFTLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUM3QyxPQUFPLENBQUMsT0FBTyxFQUNmLE9BQU8sQ0FBQyxPQUFPLENBQ2hCLENBQUM7SUFFRixPQUFPLGNBQWMsQ0FBQztBQUN4QixDQUFDOzs7Ozs7O0FBRUQsU0FBUyxhQUFhLENBQ3BCLElBQVUsRUFDVixhQUFxQixFQUNyQixXQUFpQjtJQUVqQixJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQzlCLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFFRCxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNwQixPQUFPLElBQUksR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM1RDtJQUVELElBQUksV0FBVyxFQUFFO1FBQ2YsT0FBTyxJQUFJLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxXQUFXLENBQUM7S0FDdkQ7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEYXlzQ2FsZW5kYXJWaWV3TW9kZWwsXG4gIERheVZpZXdNb2RlbCxcbiAgV2Vla1ZpZXdNb2RlbCxcbiAgRGF0ZXBpY2tlckRhdGVDdXN0b21DbGFzc2VzXG59IGZyb20gJy4uL21vZGVscyc7XG5cbmltcG9ydCB7XG4gIGlzQWZ0ZXIsXG4gIGlzQmVmb3JlLFxuICBpc0Rpc2FibGVkRGF5LFxuICBpc1NhbWVEYXksXG4gIGlzU2FtZU1vbnRoLFxuICBzaGlmdERhdGVcbn0gZnJvbSAnbmd4LWJvb3RzdHJhcC9jaHJvbm9zJztcblxuaW1wb3J0IHsgaXNNb250aERpc2FibGVkLCBpc0Rpc2FibGVkRGF0ZSB9IGZyb20gJy4uL3V0aWxzL2JzLWNhbGVuZGFyLXV0aWxzJztcblxuZXhwb3J0IGludGVyZmFjZSBGbGFnRGF5c0NhbGVuZGFyT3B0aW9ucyB7XG4gIGlzRGlzYWJsZWQ6IGJvb2xlYW47XG4gIG1pbkRhdGU6IERhdGU7XG4gIG1heERhdGU6IERhdGU7XG4gIGRheXNEaXNhYmxlZDogbnVtYmVyW107XG4gIGRhdGVzRGlzYWJsZWQ6IERhdGVbXTtcbiAgaG92ZXJlZERhdGU6IERhdGU7XG4gIHNlbGVjdGVkRGF0ZTogRGF0ZTtcbiAgc2VsZWN0ZWRSYW5nZTogRGF0ZVtdO1xuICBkaXNwbGF5TW9udGhzOiBudW1iZXI7XG4gIG1vbnRoSW5kZXg6IG51bWJlcjtcbiAgZGF0ZUN1c3RvbUNsYXNzZXM6IERhdGVwaWNrZXJEYXRlQ3VzdG9tQ2xhc3Nlc1tdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmxhZ0RheXNDYWxlbmRhcihcbiAgZm9ybWF0dGVkTW9udGg6IERheXNDYWxlbmRhclZpZXdNb2RlbCxcbiAgb3B0aW9uczogRmxhZ0RheXNDYWxlbmRhck9wdGlvbnNcbik6IERheXNDYWxlbmRhclZpZXdNb2RlbCB7XG4gIGZvcm1hdHRlZE1vbnRoLndlZWtzLmZvckVhY2goKHdlZWs6IFdlZWtWaWV3TW9kZWwpID0+IHtcbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGN5Y2xvbWF0aWMtY29tcGxleGl0eSAqL1xuICAgIHdlZWsuZGF5cy5mb3JFYWNoKChkYXk6IERheVZpZXdNb2RlbCwgZGF5SW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgLy8gZGF0ZXBpY2tlclxuICAgICAgY29uc3QgaXNPdGhlck1vbnRoID0gIWlzU2FtZU1vbnRoKGRheS5kYXRlLCBmb3JtYXR0ZWRNb250aC5tb250aCk7XG5cbiAgICAgIGNvbnN0IGlzSG92ZXJlZCA9XG4gICAgICAgICFpc090aGVyTW9udGggJiYgaXNTYW1lRGF5KGRheS5kYXRlLCBvcHRpb25zLmhvdmVyZWREYXRlKTtcbiAgICAgIC8vIGRhdGUgcmFuZ2UgcGlja2VyXG4gICAgICBjb25zdCBpc1NlbGVjdGlvblN0YXJ0ID1cbiAgICAgICAgIWlzT3RoZXJNb250aCAmJlxuICAgICAgICBvcHRpb25zLnNlbGVjdGVkUmFuZ2UgJiZcbiAgICAgICAgaXNTYW1lRGF5KGRheS5kYXRlLCBvcHRpb25zLnNlbGVjdGVkUmFuZ2VbMF0pO1xuICAgICAgY29uc3QgaXNTZWxlY3Rpb25FbmQgPVxuICAgICAgICAhaXNPdGhlck1vbnRoICYmXG4gICAgICAgIG9wdGlvbnMuc2VsZWN0ZWRSYW5nZSAmJlxuICAgICAgICBpc1NhbWVEYXkoZGF5LmRhdGUsIG9wdGlvbnMuc2VsZWN0ZWRSYW5nZVsxXSk7XG5cbiAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPVxuICAgICAgICAoIWlzT3RoZXJNb250aCAmJiBpc1NhbWVEYXkoZGF5LmRhdGUsIG9wdGlvbnMuc2VsZWN0ZWREYXRlKSkgfHxcbiAgICAgICAgaXNTZWxlY3Rpb25TdGFydCB8fFxuICAgICAgICBpc1NlbGVjdGlvbkVuZDtcblxuICAgICAgY29uc3QgaXNJblJhbmdlID1cbiAgICAgICAgIWlzT3RoZXJNb250aCAmJlxuICAgICAgICBvcHRpb25zLnNlbGVjdGVkUmFuZ2UgJiZcbiAgICAgICAgaXNEYXRlSW5SYW5nZShkYXkuZGF0ZSwgb3B0aW9ucy5zZWxlY3RlZFJhbmdlLCBvcHRpb25zLmhvdmVyZWREYXRlKTtcblxuICAgICAgY29uc3QgaXNEaXNhYmxlZCA9XG4gICAgICAgIG9wdGlvbnMuaXNEaXNhYmxlZCB8fFxuICAgICAgICBpc0JlZm9yZShkYXkuZGF0ZSwgb3B0aW9ucy5taW5EYXRlLCAnZGF5JykgfHxcbiAgICAgICAgaXNBZnRlcihkYXkuZGF0ZSwgb3B0aW9ucy5tYXhEYXRlLCAnZGF5JykgfHxcbiAgICAgICAgaXNEaXNhYmxlZERheShkYXkuZGF0ZSwgb3B0aW9ucy5kYXlzRGlzYWJsZWQpIHx8XG4gICAgICAgIGlzRGlzYWJsZWREYXRlKGRheS5kYXRlLCBvcHRpb25zLmRhdGVzRGlzYWJsZWQpO1xuXG4gICAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICBjb25zdCBpc1RvZGF5ID0gIWlzT3RoZXJNb250aCAmJiBpc1NhbWVEYXkoZGF5LmRhdGUsIGN1cnJlbnREYXRlKTtcblxuICAgICAgY29uc3QgY3VzdG9tQ2xhc3NlcyA9IG9wdGlvbnMuZGF0ZUN1c3RvbUNsYXNzZXMgJiYgb3B0aW9ucy5kYXRlQ3VzdG9tQ2xhc3Nlc1xuICAgICAgICAubWFwKGRjYyA9PiBpc1NhbWVEYXkoZGF5LmRhdGUsIGRjYy5kYXRlKSA/IGRjYy5jbGFzc2VzIDogW10pXG4gICAgICAgIC5yZWR1Y2UoKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSkgPT4gcHJldmlvdXNWYWx1ZS5jb25jYXQoY3VycmVudFZhbHVlKSwgW10pXG4gICAgICAgIC5qb2luKCcgJylcbiAgICAgICAgfHwgJyc7XG5cblxuICAgICAgLy8gZGVjaWRlIHVwZGF0ZSBvciBub3RcbiAgICAgIGNvbnN0IG5ld0RheSA9IE9iamVjdC5hc3NpZ24oe30sIGRheSwge1xuICAgICAgICBpc090aGVyTW9udGgsXG4gICAgICAgIGlzSG92ZXJlZCxcbiAgICAgICAgaXNTZWxlY3RlZCxcbiAgICAgICAgaXNTZWxlY3Rpb25TdGFydCxcbiAgICAgICAgaXNTZWxlY3Rpb25FbmQsXG4gICAgICAgIGlzSW5SYW5nZSxcbiAgICAgICAgaXNEaXNhYmxlZCxcbiAgICAgICAgaXNUb2RheSxcbiAgICAgICAgY3VzdG9tQ2xhc3Nlc1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgZGF5LmlzT3RoZXJNb250aCAhPT0gbmV3RGF5LmlzT3RoZXJNb250aCB8fFxuICAgICAgICBkYXkuaXNIb3ZlcmVkICE9PSBuZXdEYXkuaXNIb3ZlcmVkIHx8XG4gICAgICAgIGRheS5pc1NlbGVjdGVkICE9PSBuZXdEYXkuaXNTZWxlY3RlZCB8fFxuICAgICAgICBkYXkuaXNTZWxlY3Rpb25TdGFydCAhPT0gbmV3RGF5LmlzU2VsZWN0aW9uU3RhcnQgfHxcbiAgICAgICAgZGF5LmlzU2VsZWN0aW9uRW5kICE9PSBuZXdEYXkuaXNTZWxlY3Rpb25FbmQgfHxcbiAgICAgICAgZGF5LmlzRGlzYWJsZWQgIT09IG5ld0RheS5pc0Rpc2FibGVkIHx8XG4gICAgICAgIGRheS5pc0luUmFuZ2UgIT09IG5ld0RheS5pc0luUmFuZ2UgfHxcbiAgICAgICAgZGF5LmN1c3RvbUNsYXNzZXMgIT09IG5ld0RheS5jdXN0b21DbGFzc2VzXG4gICAgICApIHtcbiAgICAgICAgd2Vlay5kYXlzW2RheUluZGV4XSA9IG5ld0RheTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gdG9kbzogYWRkIGNoZWNrIGZvciBsaW5rZWQgY2FsZW5kYXJzXG4gIGZvcm1hdHRlZE1vbnRoLmhpZGVMZWZ0QXJyb3cgPVxuICAgIG9wdGlvbnMuaXNEaXNhYmxlZCB8fFxuICAgIChvcHRpb25zLm1vbnRoSW5kZXggPiAwICYmIG9wdGlvbnMubW9udGhJbmRleCAhPT0gb3B0aW9ucy5kaXNwbGF5TW9udGhzKTtcbiAgZm9ybWF0dGVkTW9udGguaGlkZVJpZ2h0QXJyb3cgPVxuICAgIG9wdGlvbnMuaXNEaXNhYmxlZCB8fFxuICAgIChvcHRpb25zLm1vbnRoSW5kZXggPCBvcHRpb25zLmRpc3BsYXlNb250aHMgJiZcbiAgICAgIG9wdGlvbnMubW9udGhJbmRleCArIDEgIT09IG9wdGlvbnMuZGlzcGxheU1vbnRocyk7XG5cbiAgZm9ybWF0dGVkTW9udGguZGlzYWJsZUxlZnRBcnJvdyA9IGlzTW9udGhEaXNhYmxlZChcbiAgICBzaGlmdERhdGUoZm9ybWF0dGVkTW9udGgubW9udGgsIHsgbW9udGg6IC0xIH0pLFxuICAgIG9wdGlvbnMubWluRGF0ZSxcbiAgICBvcHRpb25zLm1heERhdGVcbiAgKTtcbiAgZm9ybWF0dGVkTW9udGguZGlzYWJsZVJpZ2h0QXJyb3cgPSBpc01vbnRoRGlzYWJsZWQoXG4gICAgc2hpZnREYXRlKGZvcm1hdHRlZE1vbnRoLm1vbnRoLCB7IG1vbnRoOiAxIH0pLFxuICAgIG9wdGlvbnMubWluRGF0ZSxcbiAgICBvcHRpb25zLm1heERhdGVcbiAgKTtcblxuICByZXR1cm4gZm9ybWF0dGVkTW9udGg7XG59XG5cbmZ1bmN0aW9uIGlzRGF0ZUluUmFuZ2UoXG4gIGRhdGU6IERhdGUsXG4gIHNlbGVjdGVkUmFuZ2U6IERhdGVbXSxcbiAgaG92ZXJlZERhdGU6IERhdGVcbik6IGJvb2xlYW4ge1xuICBpZiAoIWRhdGUgfHwgIXNlbGVjdGVkUmFuZ2VbMF0pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoc2VsZWN0ZWRSYW5nZVsxXSkge1xuICAgIHJldHVybiBkYXRlID4gc2VsZWN0ZWRSYW5nZVswXSAmJiBkYXRlIDw9IHNlbGVjdGVkUmFuZ2VbMV07XG4gIH1cblxuICBpZiAoaG92ZXJlZERhdGUpIHtcbiAgICByZXR1cm4gZGF0ZSA+IHNlbGVjdGVkUmFuZ2VbMF0gJiYgZGF0ZSA8PSBob3ZlcmVkRGF0ZTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cbiJdfQ==