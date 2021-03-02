/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { getDay, isFirstDayOfWeek, isAfter, isBefore, shiftDate, endOf, startOf, isSame } from 'ngx-bootstrap/chronos';
/**
 * @param {?} date
 * @param {?} options
 * @return {?}
 */
export function getStartingDayOfCalendar(date, options) {
    if (isFirstDayOfWeek(date, options.firstDayOfWeek)) {
        return date;
    }
    /** @type {?} */
    var weekDay = getDay(date);
    /** @type {?} */
    var offset = calculateDateOffset(weekDay, options.firstDayOfWeek);
    return shiftDate(date, { day: -offset });
}
/**
 * @param {?} weekday
 * @param {?} startingDayOffset
 * @return {?}
 */
export function calculateDateOffset(weekday, startingDayOffset) {
    if (startingDayOffset === 0) {
        return weekday;
    }
    /** @type {?} */
    var offset = weekday - startingDayOffset % 7;
    return offset < 0 ? offset + 7 : offset;
}
/**
 * @param {?} date
 * @param {?} min
 * @param {?} max
 * @return {?}
 */
export function isMonthDisabled(date, min, max) {
    /** @type {?} */
    var minBound = min && isBefore(endOf(date, 'month'), min, 'day');
    /** @type {?} */
    var maxBound = max && isAfter(startOf(date, 'month'), max, 'day');
    return minBound || maxBound;
}
/**
 * @param {?} date
 * @param {?} min
 * @param {?} max
 * @return {?}
 */
export function isYearDisabled(date, min, max) {
    /** @type {?} */
    var minBound = min && isBefore(endOf(date, 'year'), min, 'day');
    /** @type {?} */
    var maxBound = max && isAfter(startOf(date, 'year'), max, 'day');
    return minBound || maxBound;
}
/**
 * @param {?} date
 * @param {?} datesDisabled
 * @return {?}
 */
export function isDisabledDate(date, datesDisabled) {
    if (datesDisabled === undefined || !datesDisabled || !datesDisabled.length) {
        return false;
    }
    return datesDisabled.some((/**
     * @param {?} dateDisabled
     * @return {?}
     */
    function (dateDisabled) { return isSame(date, dateDisabled, 'date'); }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtY2FsZW5kYXItdXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYm9vdHN0cmFwL2RhdGVwaWNrZXIvIiwic291cmNlcyI6WyJ1dGlscy9icy1jYWxlbmRhci11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLE1BQU0sRUFDTixnQkFBZ0IsRUFDaEIsT0FBTyxFQUNQLFFBQVEsRUFDUixTQUFTLEVBQ1QsS0FBSyxFQUNMLE9BQU8sRUFDUCxNQUFNLEVBQ1AsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7O0FBRS9CLE1BQU0sVUFBVSx3QkFBd0IsQ0FBQyxJQUFVLEVBQ1YsT0FBb0M7SUFDM0UsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQyxFQUFFO1FBQ2xELE9BQU8sSUFBSSxDQUFDO0tBQ2I7O1FBRUssT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7O1FBQ3RCLE1BQU0sR0FBRyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQztJQUVuRSxPQUFPLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO0FBQ3pDLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxPQUFlLEVBQUUsaUJBQXlCO0lBQzVFLElBQUksaUJBQWlCLEtBQUssQ0FBQyxFQUFFO1FBQzNCLE9BQU8sT0FBTyxDQUFDO0tBQ2hCOztRQUVLLE1BQU0sR0FBRyxPQUFPLEdBQUcsaUJBQWlCLEdBQUcsQ0FBQztJQUU5QyxPQUFPLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztBQUMxQyxDQUFDOzs7Ozs7O0FBRUQsTUFBTSxVQUFVLGVBQWUsQ0FBQyxJQUFVLEVBQUUsR0FBUyxFQUFFLEdBQVM7O1FBQ3hELFFBQVEsR0FBRyxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQzs7UUFDNUQsUUFBUSxHQUFHLEdBQUcsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDO0lBRW5FLE9BQU8sUUFBUSxJQUFJLFFBQVEsQ0FBQztBQUM5QixDQUFDOzs7Ozs7O0FBRUQsTUFBTSxVQUFVLGNBQWMsQ0FBQyxJQUFVLEVBQUUsR0FBUyxFQUFFLEdBQVM7O1FBQ3ZELFFBQVEsR0FBRyxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQzs7UUFDM0QsUUFBUSxHQUFHLEdBQUcsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDO0lBRWxFLE9BQU8sUUFBUSxJQUFJLFFBQVEsQ0FBQztBQUM5QixDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsY0FBYyxDQUFDLElBQVUsRUFBRSxhQUFxQjtJQUM5RCxJQUFJLGFBQWEsS0FBSyxTQUFTLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO1FBQzFFLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFFRCxPQUFPLGFBQWEsQ0FBQyxJQUFJOzs7O0lBQUMsVUFBQyxZQUFrQixJQUFLLE9BQUEsTUFBTSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsTUFBTSxDQUFDLEVBQWxDLENBQWtDLEVBQUMsQ0FBQztBQUN4RixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgZ2V0RGF5LFxuICBpc0ZpcnN0RGF5T2ZXZWVrLFxuICBpc0FmdGVyLFxuICBpc0JlZm9yZSxcbiAgc2hpZnREYXRlLFxuICBlbmRPZixcbiAgc3RhcnRPZixcbiAgaXNTYW1lXG59IGZyb20gJ25neC1ib290c3RyYXAvY2hyb25vcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydGluZ0RheU9mQ2FsZW5kYXIoZGF0ZTogRGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogeyBmaXJzdERheU9mV2Vlaz86IG51bWJlciB9KTogRGF0ZSB7XG4gIGlmIChpc0ZpcnN0RGF5T2ZXZWVrKGRhdGUsIG9wdGlvbnMuZmlyc3REYXlPZldlZWspKSB7XG4gICAgcmV0dXJuIGRhdGU7XG4gIH1cblxuICBjb25zdCB3ZWVrRGF5ID0gZ2V0RGF5KGRhdGUpO1xuICBjb25zdCBvZmZzZXQgPSBjYWxjdWxhdGVEYXRlT2Zmc2V0KHdlZWtEYXksIG9wdGlvbnMuZmlyc3REYXlPZldlZWspO1xuXG4gIHJldHVybiBzaGlmdERhdGUoZGF0ZSwge2RheTogLW9mZnNldH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlRGF0ZU9mZnNldCh3ZWVrZGF5OiBudW1iZXIsIHN0YXJ0aW5nRGF5T2Zmc2V0OiBudW1iZXIpOiBudW1iZXIge1xuICBpZiAoc3RhcnRpbmdEYXlPZmZzZXQgPT09IDApIHtcbiAgICByZXR1cm4gd2Vla2RheTtcbiAgfVxuXG4gIGNvbnN0IG9mZnNldCA9IHdlZWtkYXkgLSBzdGFydGluZ0RheU9mZnNldCAlIDc7XG5cbiAgcmV0dXJuIG9mZnNldCA8IDAgPyBvZmZzZXQgKyA3IDogb2Zmc2V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNNb250aERpc2FibGVkKGRhdGU6IERhdGUsIG1pbjogRGF0ZSwgbWF4OiBEYXRlKTogYm9vbGVhbiB7XG4gIGNvbnN0IG1pbkJvdW5kID0gbWluICYmIGlzQmVmb3JlKGVuZE9mKGRhdGUsICdtb250aCcpLCBtaW4sICdkYXknKTtcbiAgY29uc3QgbWF4Qm91bmQgPSBtYXggJiYgaXNBZnRlcihzdGFydE9mKGRhdGUsICdtb250aCcpLCBtYXgsICdkYXknKTtcblxuICByZXR1cm4gbWluQm91bmQgfHwgbWF4Qm91bmQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1llYXJEaXNhYmxlZChkYXRlOiBEYXRlLCBtaW46IERhdGUsIG1heDogRGF0ZSk6IGJvb2xlYW4ge1xuICBjb25zdCBtaW5Cb3VuZCA9IG1pbiAmJiBpc0JlZm9yZShlbmRPZihkYXRlLCAneWVhcicpLCBtaW4sICdkYXknKTtcbiAgY29uc3QgbWF4Qm91bmQgPSBtYXggJiYgaXNBZnRlcihzdGFydE9mKGRhdGUsICd5ZWFyJyksIG1heCwgJ2RheScpO1xuXG4gIHJldHVybiBtaW5Cb3VuZCB8fCBtYXhCb3VuZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGlzYWJsZWREYXRlKGRhdGU6IERhdGUsIGRhdGVzRGlzYWJsZWQ6IERhdGVbXSk6IGJvb2xlYW4ge1xuICBpZiAoZGF0ZXNEaXNhYmxlZCA9PT0gdW5kZWZpbmVkIHx8ICFkYXRlc0Rpc2FibGVkIHx8ICFkYXRlc0Rpc2FibGVkLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBkYXRlc0Rpc2FibGVkLnNvbWUoKGRhdGVEaXNhYmxlZDogRGF0ZSkgPT4gaXNTYW1lKGRhdGUsIGRhdGVEaXNhYmxlZCwgJ2RhdGUnKSk7XG59XG4iXX0=