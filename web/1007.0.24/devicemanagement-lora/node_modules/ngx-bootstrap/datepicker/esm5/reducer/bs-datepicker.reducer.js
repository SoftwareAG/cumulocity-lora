/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:max-file-line-count
import { initialDatepickerState } from './bs-datepicker.state';
import { BsDatepickerActions } from './bs-datepicker.actions';
import { calcDaysCalendar } from '../engine/calc-days-calendar';
import { formatDaysCalendar } from '../engine/format-days-calendar';
import { flagDaysCalendar } from '../engine/flag-days-calendar';
import { setFullDate, shiftDate, isArray, isDateValid, startOf, getLocale, isAfter, isBefore } from 'ngx-bootstrap/chronos';
import { canSwitchMode } from '../engine/view-mode';
import { formatMonthsCalendar } from '../engine/format-months-calendar';
import { flagMonthsCalendar } from '../engine/flag-months-calendar';
import { formatYearsCalendar, yearsPerCalendar } from '../engine/format-years-calendar';
import { flagYearsCalendar } from '../engine/flag-years-calendar';
/* tslint:disable-next-line: cyclomatic-complexity */
/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
export function bsDatepickerReducer(state, action) {
    if (state === void 0) { state = initialDatepickerState; }
    switch (action.type) {
        case BsDatepickerActions.CALCULATE: {
            return calculateReducer(state);
        }
        case BsDatepickerActions.FORMAT: {
            return formatReducer(state, action);
        }
        case BsDatepickerActions.FLAG: {
            return flagReducer(state, action);
        }
        case BsDatepickerActions.NAVIGATE_OFFSET: {
            /** @type {?} */
            var date = shiftDate(startOf(state.view.date, 'month'), action.payload);
            /** @type {?} */
            var newState = {
                view: {
                    mode: state.view.mode,
                    date: date
                }
            };
            return Object.assign({}, state, newState);
        }
        case BsDatepickerActions.NAVIGATE_TO: {
            /** @type {?} */
            var payload = action.payload;
            /** @type {?} */
            var date = setFullDate(state.view.date, payload.unit);
            /** @type {?} */
            var newState = void 0;
            /** @type {?} */
            var mode = void 0;
            if (canSwitchMode(payload.viewMode, state.minMode)) {
                mode = payload.viewMode;
                newState = { view: { date: date, mode: mode } };
            }
            else {
                mode = state.view.mode;
                newState = { selectedDate: date, view: { date: date, mode: mode } };
            }
            return Object.assign({}, state, newState);
        }
        case BsDatepickerActions.CHANGE_VIEWMODE: {
            if (!canSwitchMode(action.payload, state.minMode)) {
                return state;
            }
            /** @type {?} */
            var date = state.view.date;
            /** @type {?} */
            var mode = action.payload;
            /** @type {?} */
            var newState = { view: { date: date, mode: mode } };
            return Object.assign({}, state, newState);
        }
        case BsDatepickerActions.HOVER: {
            return Object.assign({}, state, { hoveredDate: action.payload });
        }
        case BsDatepickerActions.SELECT: {
            /** @type {?} */
            var newState = {
                selectedDate: action.payload,
                view: state.view
            };
            /** @type {?} */
            var mode = state.view.mode;
            /** @type {?} */
            var _date = action.payload || state.view.date;
            /** @type {?} */
            var date = getViewDate(_date, state.minDate, state.maxDate);
            newState.view = { mode: mode, date: date };
            return Object.assign({}, state, newState);
        }
        case BsDatepickerActions.SET_OPTIONS: {
            /** @type {?} */
            var newState = action.payload;
            // preserve view mode
            /** @type {?} */
            var mode = newState.minMode ? newState.minMode : state.view.mode;
            /** @type {?} */
            var _viewDate = isDateValid(newState.value) && newState.value
                || isArray(newState.value) && isDateValid(newState.value[0]) && newState.value[0]
                || state.view.date;
            /** @type {?} */
            var date = getViewDate(_viewDate, newState.minDate, newState.maxDate);
            newState.view = { mode: mode, date: date };
            // update selected value
            if (newState.value) {
                // if new value is array we work with date range
                if (isArray(newState.value)) {
                    newState.selectedRange = newState.value;
                }
                // if new value is a date -> datepicker
                if (newState.value instanceof Date) {
                    newState.selectedDate = newState.value;
                }
                // provided value is not supported :)
                // need to report it somehow
            }
            return Object.assign({}, state, newState);
        }
        // date range picker
        case BsDatepickerActions.SELECT_RANGE: {
            /** @type {?} */
            var newState = {
                selectedRange: action.payload,
                view: state.view
            };
            /** @type {?} */
            var mode = state.view.mode;
            /** @type {?} */
            var _date = action.payload && action.payload[0] || state.view.date;
            /** @type {?} */
            var date = getViewDate(_date, state.minDate, state.maxDate);
            newState.view = { mode: mode, date: date };
            return Object.assign({}, state, newState);
        }
        case BsDatepickerActions.SET_MIN_DATE: {
            return Object.assign({}, state, {
                minDate: action.payload
            });
        }
        case BsDatepickerActions.SET_MAX_DATE: {
            return Object.assign({}, state, {
                maxDate: action.payload
            });
        }
        case BsDatepickerActions.SET_IS_DISABLED: {
            return Object.assign({}, state, {
                isDisabled: action.payload
            });
        }
        case BsDatepickerActions.SET_DATE_CUSTOM_CLASSES: {
            return Object.assign({}, state, {
                dateCustomClasses: action.payload
            });
        }
        default:
            return state;
    }
}
/**
 * @param {?} state
 * @return {?}
 */
function calculateReducer(state) {
    // how many calendars
    /** @type {?} */
    var displayMonths = state.displayMonths;
    // use selected date on initial rendering if set
    /** @type {?} */
    var viewDate = state.view.date;
    if (state.view.mode === 'day') {
        state.monthViewOptions.firstDayOfWeek = getLocale(state.locale).firstDayOfWeek();
        /** @type {?} */
        var monthsModel = new Array(displayMonths);
        for (var monthIndex = 0; monthIndex < displayMonths; monthIndex++) {
            // todo: for unlinked calendars it will be harder
            monthsModel[monthIndex] = calcDaysCalendar(viewDate, state.monthViewOptions);
            viewDate = shiftDate(viewDate, { month: 1 });
        }
        return Object.assign({}, state, { monthsModel: monthsModel });
    }
    if (state.view.mode === 'month') {
        /** @type {?} */
        var monthsCalendar = new Array(displayMonths);
        for (var calendarIndex = 0; calendarIndex < displayMonths; calendarIndex++) {
            // todo: for unlinked calendars it will be harder
            monthsCalendar[calendarIndex] = formatMonthsCalendar(viewDate, getFormatOptions(state));
            viewDate = shiftDate(viewDate, { year: 1 });
        }
        return Object.assign({}, state, { monthsCalendar: monthsCalendar });
    }
    if (state.view.mode === 'year') {
        /** @type {?} */
        var yearsCalendarModel = new Array(displayMonths);
        for (var calendarIndex = 0; calendarIndex < displayMonths; calendarIndex++) {
            // todo: for unlinked calendars it will be harder
            yearsCalendarModel[calendarIndex] = formatYearsCalendar(viewDate, getFormatOptions(state));
            viewDate = shiftDate(viewDate, { year: yearsPerCalendar });
        }
        return Object.assign({}, state, { yearsCalendarModel: yearsCalendarModel });
    }
    return state;
}
/**
 * @param {?} state
 * @param {?} action
 * @return {?}
 */
function formatReducer(state, action) {
    if (state.view.mode === 'day') {
        /** @type {?} */
        var formattedMonths = state.monthsModel.map((/**
         * @param {?} month
         * @param {?} monthIndex
         * @return {?}
         */
        function (month, monthIndex) {
            return formatDaysCalendar(month, getFormatOptions(state), monthIndex);
        }));
        return Object.assign({}, state, { formattedMonths: formattedMonths });
    }
    // how many calendars
    /** @type {?} */
    var displayMonths = state.displayMonths;
    // check initial rendering
    // use selected date on initial rendering if set
    /** @type {?} */
    var viewDate = state.view.date;
    if (state.view.mode === 'month') {
        /** @type {?} */
        var monthsCalendar = new Array(displayMonths);
        for (var calendarIndex = 0; calendarIndex < displayMonths; calendarIndex++) {
            // todo: for unlinked calendars it will be harder
            monthsCalendar[calendarIndex] = formatMonthsCalendar(viewDate, getFormatOptions(state));
            viewDate = shiftDate(viewDate, { year: 1 });
        }
        return Object.assign({}, state, { monthsCalendar: monthsCalendar });
    }
    if (state.view.mode === 'year') {
        /** @type {?} */
        var yearsCalendarModel = new Array(displayMonths);
        for (var calendarIndex = 0; calendarIndex < displayMonths; calendarIndex++) {
            // todo: for unlinked calendars it will be harder
            yearsCalendarModel[calendarIndex] = formatYearsCalendar(viewDate, getFormatOptions(state));
            viewDate = shiftDate(viewDate, { year: 16 });
        }
        return Object.assign({}, state, { yearsCalendarModel: yearsCalendarModel });
    }
    return state;
}
/**
 * @param {?} state
 * @param {?} action
 * @return {?}
 */
function flagReducer(state, action) {
    if (state.view.mode === 'day') {
        /** @type {?} */
        var flaggedMonths = state.formattedMonths.map((/**
         * @param {?} formattedMonth
         * @param {?} monthIndex
         * @return {?}
         */
        function (formattedMonth, monthIndex) {
            return flagDaysCalendar(formattedMonth, {
                isDisabled: state.isDisabled,
                minDate: state.minDate,
                maxDate: state.maxDate,
                daysDisabled: state.daysDisabled,
                datesDisabled: state.datesDisabled,
                hoveredDate: state.hoveredDate,
                selectedDate: state.selectedDate,
                selectedRange: state.selectedRange,
                displayMonths: state.displayMonths,
                dateCustomClasses: state.dateCustomClasses,
                monthIndex: monthIndex
            });
        }));
        return Object.assign({}, state, { flaggedMonths: flaggedMonths });
    }
    if (state.view.mode === 'month') {
        /** @type {?} */
        var flaggedMonthsCalendar = state.monthsCalendar.map((/**
         * @param {?} formattedMonth
         * @param {?} monthIndex
         * @return {?}
         */
        function (formattedMonth, monthIndex) {
            return flagMonthsCalendar(formattedMonth, {
                isDisabled: state.isDisabled,
                minDate: state.minDate,
                maxDate: state.maxDate,
                hoveredMonth: state.hoveredMonth,
                displayMonths: state.displayMonths,
                monthIndex: monthIndex
            });
        }));
        return Object.assign({}, state, { flaggedMonthsCalendar: flaggedMonthsCalendar });
    }
    if (state.view.mode === 'year') {
        /** @type {?} */
        var yearsCalendarFlagged = state.yearsCalendarModel.map((/**
         * @param {?} formattedMonth
         * @param {?} yearIndex
         * @return {?}
         */
        function (formattedMonth, yearIndex) {
            return flagYearsCalendar(formattedMonth, {
                isDisabled: state.isDisabled,
                minDate: state.minDate,
                maxDate: state.maxDate,
                hoveredYear: state.hoveredYear,
                displayMonths: state.displayMonths,
                yearIndex: yearIndex
            });
        }));
        return Object.assign({}, state, { yearsCalendarFlagged: yearsCalendarFlagged });
    }
    return state;
}
/**
 * @param {?} state
 * @return {?}
 */
function getFormatOptions(state) {
    return {
        locale: state.locale,
        monthTitle: state.monthTitle,
        yearTitle: state.yearTitle,
        dayLabel: state.dayLabel,
        monthLabel: state.monthLabel,
        yearLabel: state.yearLabel,
        weekNumbers: state.weekNumbers
    };
}
/**
 * if view date is provided (bsValue|ngModel) it should be shown
 * if view date is not provider:
 * if minDate>currentDate (default view value), show minDate
 * if maxDate<currentDate(default view value) show maxDate
 * @param {?} viewDate
 * @param {?} minDate
 * @param {?} maxDate
 * @return {?}
 */
function getViewDate(viewDate, minDate, maxDate) {
    /** @type {?} */
    var _date = Array.isArray(viewDate) ? viewDate[0] : viewDate;
    if (minDate && isAfter(minDate, _date, 'day')) {
        return minDate;
    }
    if (maxDate && isBefore(maxDate, _date, 'day')) {
        return maxDate;
    }
    return _date;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZGF0ZXBpY2tlci5yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWJvb3RzdHJhcC9kYXRlcGlja2VyLyIsInNvdXJjZXMiOlsicmVkdWNlci9icy1kYXRlcGlja2VyLnJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQXFCLHNCQUFzQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFbEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUNMLFdBQVcsRUFDWCxTQUFTLEVBQ1QsT0FBTyxFQUNQLFdBQVcsRUFDWCxPQUFPLEVBQ1AsU0FBUyxFQUNULE9BQU8sRUFDUCxRQUFRLEVBQ1QsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLGdCQUFnQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDeEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7Ozs7Ozs7QUFLbEUsTUFBTSxVQUFVLG1CQUFtQixDQUFDLEtBQThCLEVBQzlCLE1BQWM7SUFEZCxzQkFBQSxFQUFBLDhCQUE4QjtJQUVoRSxRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFDbkIsS0FBSyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNsQyxPQUFPLGdCQUFn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QUksT0FBTyxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFO1FBQzlDLE9BQU8sT0FBTyxDQUFDO0tBQ2hCO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6bWF4LWZpbGUtbGluZS1jb3VudFxuaW1wb3J0IHsgQnNEYXRlcGlja2VyU3RhdGUsIGluaXRpYWxEYXRlcGlja2VyU3RhdGUgfSBmcm9tICcuL2JzLWRhdGVwaWNrZXIuc3RhdGUnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9taW5pLW5ncngnO1xuaW1wb3J0IHsgQnNEYXRlcGlja2VyQWN0aW9ucyB9IGZyb20gJy4vYnMtZGF0ZXBpY2tlci5hY3Rpb25zJztcbmltcG9ydCB7IGNhbGNEYXlzQ2FsZW5kYXIgfSBmcm9tICcuLi9lbmdpbmUvY2FsYy1kYXlzLWNhbGVuZGFyJztcbmltcG9ydCB7IGZvcm1hdERheXNDYWxlbmRhciB9IGZyb20gJy4uL2VuZ2luZS9mb3JtYXQtZGF5cy1jYWxlbmRhcic7XG5pbXBvcnQgeyBmbGFnRGF5c0NhbGVuZGFyIH0gZnJvbSAnLi4vZW5naW5lL2ZsYWctZGF5cy1jYWxlbmRhcic7XG5pbXBvcnQge1xuICBzZXRGdWxsRGF0ZSxcbiAgc2hpZnREYXRlLFxuICBpc0FycmF5LFxuICBpc0RhdGVWYWxpZCxcbiAgc3RhcnRPZixcbiAgZ2V0TG9jYWxlLFxuICBpc0FmdGVyLFxuICBpc0JlZm9yZVxufSBmcm9tICduZ3gtYm9vdHN0cmFwL2Nocm9ub3MnO1xuaW1wb3J0IHsgY2FuU3dpdGNoTW9kZSB9IGZyb20gJy4uL2VuZ2luZS92aWV3LW1vZGUnO1xuaW1wb3J0IHsgZm9ybWF0TW9udGhzQ2FsZW5kYXIgfSBmcm9tICcuLi9lbmdpbmUvZm9ybWF0LW1vbnRocy1jYWxlbmRhcic7XG5pbXBvcnQgeyBmbGFnTW9udGhzQ2FsZW5kYXIgfSBmcm9tICcuLi9lbmdpbmUvZmxhZy1tb250aHMtY2FsZW5kYXInO1xuaW1wb3J0IHsgZm9ybWF0WWVhcnNDYWxlbmRhciwgeWVhcnNQZXJDYWxlbmRhciB9IGZyb20gJy4uL2VuZ2luZS9mb3JtYXQteWVhcnMtY2FsZW5kYXInO1xuaW1wb3J0IHsgZmxhZ1llYXJzQ2FsZW5kYXIgfSBmcm9tICcuLi9lbmdpbmUvZmxhZy15ZWFycy1jYWxlbmRhcic7XG5pbXBvcnQgeyBCc1ZpZXdOYXZpZ2F0aW9uRXZlbnQsIERhdGVwaWNrZXJGb3JtYXRPcHRpb25zLCBCc0RhdGVwaWNrZXJWaWV3TW9kZSB9IGZyb20gJy4uL21vZGVscyc7XG5cblxuLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjeWNsb21hdGljLWNvbXBsZXhpdHkgKi9cbmV4cG9ydCBmdW5jdGlvbiBic0RhdGVwaWNrZXJSZWR1Y2VyKHN0YXRlID0gaW5pdGlhbERhdGVwaWNrZXJTdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogQWN0aW9uKTogQnNEYXRlcGlja2VyU3RhdGUge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBCc0RhdGVwaWNrZXJBY3Rpb25zLkNBTENVTEFURToge1xuICAgICAgcmV0dXJuIGNhbGN1bGF0ZVJlZHVjZXIoc3RhdGUpO1xuICAgIH1cblxuICAgIGNhc2UgQnNEYXRlcGlja2VyQWN0aW9ucy5GT1JNQVQ6IHtcbiAgICAgIHJldHVybiBmb3JtYXRSZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuICAgIH1cblxuICAgIGNhc2UgQnNEYXRlcGlja2VyQWN0aW9ucy5GTEFHOiB7XG4gICAgICByZXR1cm4gZmxhZ1JlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG4gICAgfVxuXG4gICAgY2FzZSBCc0RhdGVwaWNrZXJBY3Rpb25zLk5BVklHQVRFX09GRlNFVDoge1xuICAgICAgY29uc3QgZGF0ZSA9IHNoaWZ0RGF0ZShzdGFydE9mKHN0YXRlLnZpZXcuZGF0ZSwgJ21vbnRoJyksIGFjdGlvbi5wYXlsb2FkKTtcbiAgICAgIGNvbnN0IG5ld1N0YXRlID0ge1xuICAgICAgICB2aWV3OiB7XG4gICAgICAgICAgbW9kZTogc3RhdGUudmlldy5tb2RlLFxuICAgICAgICAgIGRhdGVcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBuZXdTdGF0ZSk7XG4gICAgfVxuXG4gICAgY2FzZSBCc0RhdGVwaWNrZXJBY3Rpb25zLk5BVklHQVRFX1RPOiB7XG4gICAgICBjb25zdCBwYXlsb2FkOiBCc1ZpZXdOYXZpZ2F0aW9uRXZlbnQgPSBhY3Rpb24ucGF5bG9hZDtcblxuICAgICAgY29uc3QgZGF0ZSA9IHNldEZ1bGxEYXRlKHN0YXRlLnZpZXcuZGF0ZSwgcGF5bG9hZC51bml0KTtcbiAgICAgIGxldCBuZXdTdGF0ZTtcbiAgICAgIGxldCBtb2RlOiBCc0RhdGVwaWNrZXJWaWV3TW9kZTtcbiAgICAgIGlmIChjYW5Td2l0Y2hNb2RlKHBheWxvYWQudmlld01vZGUsIHN0YXRlLm1pbk1vZGUpKSB7XG4gICAgICAgIG1vZGUgPSBwYXlsb2FkLnZpZXdNb2RlO1xuICAgICAgICBuZXdTdGF0ZSA9IHsgdmlldzogeyBkYXRlLCBtb2RlIH0gfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1vZGUgPSBzdGF0ZS52aWV3Lm1vZGU7XG4gICAgICAgIG5ld1N0YXRlID0geyBzZWxlY3RlZERhdGU6IGRhdGUsIHZpZXc6IHsgZGF0ZSwgbW9kZSB9IH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgbmV3U3RhdGUpO1xuICAgIH1cblxuICAgIGNhc2UgQnNEYXRlcGlja2VyQWN0aW9ucy5DSEFOR0VfVklFV01PREU6IHtcbiAgICAgIGlmICghY2FuU3dpdGNoTW9kZShhY3Rpb24ucGF5bG9hZCwgc3RhdGUubWluTW9kZSkpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgfVxuICAgICAgY29uc3QgZGF0ZSA9IHN0YXRlLnZpZXcuZGF0ZTtcbiAgICAgIGNvbnN0IG1vZGUgPSBhY3Rpb24ucGF5bG9hZDtcbiAgICAgIGNvbnN0IG5ld1N0YXRlID0geyB2aWV3OiB7IGRhdGUsIG1vZGUgfSB9O1xuXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIG5ld1N0YXRlKTtcbiAgICB9XG5cbiAgICBjYXNlIEJzRGF0ZXBpY2tlckFjdGlvbnMuSE9WRVI6IHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBob3ZlcmVkRGF0ZTogYWN0aW9uLnBheWxvYWQgfSk7XG4gICAgfVxuXG4gICAgY2FzZSBCc0RhdGVwaWNrZXJBY3Rpb25zLlNFTEVDVDoge1xuICAgICAgY29uc3QgbmV3U3RhdGUgPSB7XG4gICAgICAgIHNlbGVjdGVkRGF0ZTogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIHZpZXc6IHN0YXRlLnZpZXdcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IG1vZGUgPSBzdGF0ZS52aWV3Lm1vZGU7XG4gICAgICBjb25zdCBfZGF0ZSA9IGFjdGlvbi5wYXlsb2FkIHx8IHN0YXRlLnZpZXcuZGF0ZTtcbiAgICAgIGNvbnN0IGRhdGUgPSBnZXRWaWV3RGF0ZShfZGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XG4gICAgICBuZXdTdGF0ZS52aWV3ID0geyBtb2RlLCBkYXRlIH07XG5cbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgbmV3U3RhdGUpO1xuICAgIH1cblxuICAgIGNhc2UgQnNEYXRlcGlja2VyQWN0aW9ucy5TRVRfT1BUSU9OUzoge1xuICAgICAgY29uc3QgbmV3U3RhdGUgPSBhY3Rpb24ucGF5bG9hZDtcbiAgICAgIC8vIHByZXNlcnZlIHZpZXcgbW9kZVxuICAgICAgY29uc3QgbW9kZSA9IG5ld1N0YXRlLm1pbk1vZGUgPyBuZXdTdGF0ZS5taW5Nb2RlIDogc3RhdGUudmlldy5tb2RlO1xuICAgICAgY29uc3QgX3ZpZXdEYXRlID0gaXNEYXRlVmFsaWQobmV3U3RhdGUudmFsdWUpICYmIG5ld1N0YXRlLnZhbHVlXG4gICAgICAgIHx8IGlzQXJyYXkobmV3U3RhdGUudmFsdWUpICYmIGlzRGF0ZVZhbGlkKG5ld1N0YXRlLnZhbHVlWzBdKSAmJiBuZXdTdGF0ZS52YWx1ZVswXVxuICAgICAgICB8fCBzdGF0ZS52aWV3LmRhdGU7XG4gICAgICBjb25zdCBkYXRlID0gZ2V0Vmlld0RhdGUoX3ZpZXdEYXRlLCBuZXdTdGF0ZS5taW5EYXRlLCBuZXdTdGF0ZS5tYXhEYXRlKTtcbiAgICAgIG5ld1N0YXRlLnZpZXcgPSB7IG1vZGUsIGRhdGUgfTtcbiAgICAgIC8vIHVwZGF0ZSBzZWxlY3RlZCB2YWx1ZVxuICAgICAgaWYgKG5ld1N0YXRlLnZhbHVlKSB7XG4gICAgICAgIC8vIGlmIG5ldyB2YWx1ZSBpcyBhcnJheSB3ZSB3b3JrIHdpdGggZGF0ZSByYW5nZVxuICAgICAgICBpZiAoaXNBcnJheShuZXdTdGF0ZS52YWx1ZSkpIHtcbiAgICAgICAgICBuZXdTdGF0ZS5zZWxlY3RlZFJhbmdlID0gbmV3U3RhdGUudmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBuZXcgdmFsdWUgaXMgYSBkYXRlIC0+IGRhdGVwaWNrZXJcbiAgICAgICAgaWYgKG5ld1N0YXRlLnZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgIG5ld1N0YXRlLnNlbGVjdGVkRGF0ZSA9IG5ld1N0YXRlLnZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHJvdmlkZWQgdmFsdWUgaXMgbm90IHN1cHBvcnRlZCA6KVxuICAgICAgICAvLyBuZWVkIHRvIHJlcG9ydCBpdCBzb21laG93XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgbmV3U3RhdGUpO1xuICAgIH1cblxuICAgIC8vIGRhdGUgcmFuZ2UgcGlja2VyXG4gICAgY2FzZSBCc0RhdGVwaWNrZXJBY3Rpb25zLlNFTEVDVF9SQU5HRToge1xuICAgICAgY29uc3QgbmV3U3RhdGUgPSB7XG4gICAgICAgIHNlbGVjdGVkUmFuZ2U6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICB2aWV3OiBzdGF0ZS52aWV3XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBtb2RlID0gc3RhdGUudmlldy5tb2RlO1xuICAgICAgY29uc3QgX2RhdGUgPSBhY3Rpb24ucGF5bG9hZCAmJiBhY3Rpb24ucGF5bG9hZFswXSB8fCBzdGF0ZS52aWV3LmRhdGU7XG4gICAgICBjb25zdCBkYXRlID0gZ2V0Vmlld0RhdGUoX2RhdGUsIHN0YXRlLm1pbkRhdGUsIHN0YXRlLm1heERhdGUpO1xuICAgICAgbmV3U3RhdGUudmlldyA9IHsgbW9kZSwgZGF0ZSB9O1xuXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIG5ld1N0YXRlKTtcbiAgICB9XG5cbiAgICBjYXNlIEJzRGF0ZXBpY2tlckFjdGlvbnMuU0VUX01JTl9EQVRFOiB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgbWluRGF0ZTogYWN0aW9uLnBheWxvYWRcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjYXNlIEJzRGF0ZXBpY2tlckFjdGlvbnMuU0VUX01BWF9EQVRFOiB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgbWF4RGF0ZTogYWN0aW9uLnBheWxvYWRcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjYXNlIEJzRGF0ZXBpY2tlckFjdGlvbnMuU0VUX0lTX0RJU0FCTEVEOiB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgaXNEaXNhYmxlZDogYWN0aW9uLnBheWxvYWRcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjYXNlIEJzRGF0ZXBpY2tlckFjdGlvbnMuU0VUX0RBVEVfQ1VTVE9NX0NMQVNTRVM6IHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBkYXRlQ3VzdG9tQ2xhc3NlczogYWN0aW9uLnBheWxvYWRcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlUmVkdWNlcihzdGF0ZTogQnNEYXRlcGlja2VyU3RhdGUpOiBCc0RhdGVwaWNrZXJTdGF0ZSB7XG4gIC8vIGhvdyBtYW55IGNhbGVuZGFyc1xuICBjb25zdCBkaXNwbGF5TW9udGhzID0gc3RhdGUuZGlzcGxheU1vbnRocztcbiAgLy8gdXNlIHNlbGVjdGVkIGRhdGUgb24gaW5pdGlhbCByZW5kZXJpbmcgaWYgc2V0XG4gIGxldCB2aWV3RGF0ZSA9IHN0YXRlLnZpZXcuZGF0ZTtcblxuICBpZiAoc3RhdGUudmlldy5tb2RlID09PSAnZGF5Jykge1xuICAgIHN0YXRlLm1vbnRoVmlld09wdGlvbnMuZmlyc3REYXlPZldlZWsgPSBnZXRMb2NhbGUoc3RhdGUubG9jYWxlKS5maXJzdERheU9mV2VlaygpO1xuICAgIGNvbnN0IG1vbnRoc01vZGVsID0gbmV3IEFycmF5KGRpc3BsYXlNb250aHMpO1xuICAgIGZvciAobGV0IG1vbnRoSW5kZXggPSAwOyBtb250aEluZGV4IDwgZGlzcGxheU1vbnRoczsgbW9udGhJbmRleCsrKSB7XG4gICAgICAvLyB0b2RvOiBmb3IgdW5saW5rZWQgY2FsZW5kYXJzIGl0IHdpbGwgYmUgaGFyZGVyXG4gICAgICBtb250aHNNb2RlbFttb250aEluZGV4XSA9IGNhbGNEYXlzQ2FsZW5kYXIoXG4gICAgICAgIHZpZXdEYXRlLFxuICAgICAgICBzdGF0ZS5tb250aFZpZXdPcHRpb25zXG4gICAgICApO1xuICAgICAgdmlld0RhdGUgPSBzaGlmdERhdGUodmlld0RhdGUsIHsgbW9udGg6IDEgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IG1vbnRoc01vZGVsIH0pO1xuICB9XG5cbiAgaWYgKHN0YXRlLnZpZXcubW9kZSA9PT0gJ21vbnRoJykge1xuICAgIGNvbnN0IG1vbnRoc0NhbGVuZGFyID0gbmV3IEFycmF5KGRpc3BsYXlNb250aHMpO1xuICAgIGZvciAoXG4gICAgICBsZXQgY2FsZW5kYXJJbmRleCA9IDA7XG4gICAgICBjYWxlbmRhckluZGV4IDwgZGlzcGxheU1vbnRocztcbiAgICAgIGNhbGVuZGFySW5kZXgrK1xuICAgICkge1xuICAgICAgLy8gdG9kbzogZm9yIHVubGlua2VkIGNhbGVuZGFycyBpdCB3aWxsIGJlIGhhcmRlclxuICAgICAgbW9udGhzQ2FsZW5kYXJbY2FsZW5kYXJJbmRleF0gPSBmb3JtYXRNb250aHNDYWxlbmRhcihcbiAgICAgICAgdmlld0RhdGUsXG4gICAgICAgIGdldEZvcm1hdE9wdGlvbnMoc3RhdGUpXG4gICAgICApO1xuICAgICAgdmlld0RhdGUgPSBzaGlmdERhdGUodmlld0RhdGUsIHsgeWVhcjogMSB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgbW9udGhzQ2FsZW5kYXIgfSk7XG4gIH1cblxuICBpZiAoc3RhdGUudmlldy5tb2RlID09PSAneWVhcicpIHtcbiAgICBjb25zdCB5ZWFyc0NhbGVuZGFyTW9kZWwgPSBuZXcgQXJyYXkoZGlzcGxheU1vbnRocyk7XG5cbiAgICBmb3IgKFxuICAgICAgbGV0IGNhbGVuZGFySW5kZXggPSAwO1xuICAgICAgY2FsZW5kYXJJbmRleCA8IGRpc3BsYXlNb250aHM7XG4gICAgICBjYWxlbmRhckluZGV4KytcbiAgICApIHtcbiAgICAgIC8vIHRvZG86IGZvciB1bmxpbmtlZCBjYWxlbmRhcnMgaXQgd2lsbCBiZSBoYXJkZXJcbiAgICAgIHllYXJzQ2FsZW5kYXJNb2RlbFtjYWxlbmRhckluZGV4XSA9IGZvcm1hdFllYXJzQ2FsZW5kYXIoXG4gICAgICAgIHZpZXdEYXRlLFxuICAgICAgICBnZXRGb3JtYXRPcHRpb25zKHN0YXRlKVxuICAgICAgKTtcbiAgICAgIHZpZXdEYXRlID0gc2hpZnREYXRlKHZpZXdEYXRlLCB7IHllYXI6IHllYXJzUGVyQ2FsZW5kYXIgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHllYXJzQ2FsZW5kYXJNb2RlbCB9KTtcbiAgfVxuXG4gIHJldHVybiBzdGF0ZTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0UmVkdWNlcihzdGF0ZTogQnNEYXRlcGlja2VyU3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogQWN0aW9uKTogQnNEYXRlcGlja2VyU3RhdGUge1xuICBpZiAoc3RhdGUudmlldy5tb2RlID09PSAnZGF5Jykge1xuICAgIGNvbnN0IGZvcm1hdHRlZE1vbnRocyA9IHN0YXRlLm1vbnRoc01vZGVsLm1hcCgobW9udGgsIG1vbnRoSW5kZXgpID0+XG4gICAgICBmb3JtYXREYXlzQ2FsZW5kYXIobW9udGgsIGdldEZvcm1hdE9wdGlvbnMoc3RhdGUpLCBtb250aEluZGV4KVxuICAgICk7XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgZm9ybWF0dGVkTW9udGhzIH0pO1xuICB9XG5cbiAgLy8gaG93IG1hbnkgY2FsZW5kYXJzXG4gIGNvbnN0IGRpc3BsYXlNb250aHMgPSBzdGF0ZS5kaXNwbGF5TW9udGhzO1xuICAvLyBjaGVjayBpbml0aWFsIHJlbmRlcmluZ1xuICAvLyB1c2Ugc2VsZWN0ZWQgZGF0ZSBvbiBpbml0aWFsIHJlbmRlcmluZyBpZiBzZXRcbiAgbGV0IHZpZXdEYXRlID0gc3RhdGUudmlldy5kYXRlO1xuXG4gIGlmIChzdGF0ZS52aWV3Lm1vZGUgPT09ICdtb250aCcpIHtcbiAgICBjb25zdCBtb250aHNDYWxlbmRhciA9IG5ldyBBcnJheShkaXNwbGF5TW9udGhzKTtcbiAgICBmb3IgKFxuICAgICAgbGV0IGNhbGVuZGFySW5kZXggPSAwO1xuICAgICAgY2FsZW5kYXJJbmRleCA8IGRpc3BsYXlNb250aHM7XG4gICAgICBjYWxlbmRhckluZGV4KytcbiAgICApIHtcbiAgICAgIC8vIHRvZG86IGZvciB1bmxpbmtlZCBjYWxlbmRhcnMgaXQgd2lsbCBiZSBoYXJkZXJcbiAgICAgIG1vbnRoc0NhbGVuZGFyW2NhbGVuZGFySW5kZXhdID0gZm9ybWF0TW9udGhzQ2FsZW5kYXIoXG4gICAgICAgIHZpZXdEYXRlLFxuICAgICAgICBnZXRGb3JtYXRPcHRpb25zKHN0YXRlKVxuICAgICAgKTtcbiAgICAgIHZpZXdEYXRlID0gc2hpZnREYXRlKHZpZXdEYXRlLCB7IHllYXI6IDEgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IG1vbnRoc0NhbGVuZGFyIH0pO1xuICB9XG5cbiAgaWYgKHN0YXRlLnZpZXcubW9kZSA9PT0gJ3llYXInKSB7XG4gICAgY29uc3QgeWVhcnNDYWxlbmRhck1vZGVsID0gbmV3IEFycmF5KGRpc3BsYXlNb250aHMpO1xuICAgIGZvciAoXG4gICAgICBsZXQgY2FsZW5kYXJJbmRleCA9IDA7XG4gICAgICBjYWxlbmRhckluZGV4IDwgZGlzcGxheU1vbnRocztcbiAgICAgIGNhbGVuZGFySW5kZXgrK1xuICAgICkge1xuICAgICAgLy8gdG9kbzogZm9yIHVubGlua2VkIGNhbGVuZGFycyBpdCB3aWxsIGJlIGhhcmRlclxuICAgICAgeWVhcnNDYWxlbmRhck1vZGVsW2NhbGVuZGFySW5kZXhdID0gZm9ybWF0WWVhcnNDYWxlbmRhcihcbiAgICAgICAgdmlld0RhdGUsXG4gICAgICAgIGdldEZvcm1hdE9wdGlvbnMoc3RhdGUpXG4gICAgICApO1xuICAgICAgdmlld0RhdGUgPSBzaGlmdERhdGUodmlld0RhdGUsIHsgeWVhcjogMTYgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHllYXJzQ2FsZW5kYXJNb2RlbCB9KTtcbiAgfVxuXG4gIHJldHVybiBzdGF0ZTtcbn1cblxuZnVuY3Rpb24gZmxhZ1JlZHVjZXIoc3RhdGU6IEJzRGF0ZXBpY2tlclN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBBY3Rpb24pOiBCc0RhdGVwaWNrZXJTdGF0ZSB7XG4gIGlmIChzdGF0ZS52aWV3Lm1vZGUgPT09ICdkYXknKSB7XG4gICAgY29uc3QgZmxhZ2dlZE1vbnRocyA9IHN0YXRlLmZvcm1hdHRlZE1vbnRocy5tYXAoXG4gICAgICAoZm9ybWF0dGVkTW9udGgsIG1vbnRoSW5kZXgpID0+XG4gICAgICAgIGZsYWdEYXlzQ2FsZW5kYXIoZm9ybWF0dGVkTW9udGgsIHtcbiAgICAgICAgICBpc0Rpc2FibGVkOiBzdGF0ZS5pc0Rpc2FibGVkLFxuICAgICAgICAgIG1pbkRhdGU6IHN0YXRlLm1pbkRhdGUsXG4gICAgICAgICAgbWF4RGF0ZTogc3RhdGUubWF4RGF0ZSxcbiAgICAgICAgICBkYXlzRGlzYWJsZWQ6IHN0YXRlLmRheXNEaXNhYmxlZCxcbiAgICAgICAgICBkYXRlc0Rpc2FibGVkOiBzdGF0ZS5kYXRlc0Rpc2FibGVkLFxuICAgICAgICAgIGhvdmVyZWREYXRlOiBzdGF0ZS5ob3ZlcmVkRGF0ZSxcbiAgICAgICAgICBzZWxlY3RlZERhdGU6IHN0YXRlLnNlbGVjdGVkRGF0ZSxcbiAgICAgICAgICBzZWxlY3RlZFJhbmdlOiBzdGF0ZS5zZWxlY3RlZFJhbmdlLFxuICAgICAgICAgIGRpc3BsYXlNb250aHM6IHN0YXRlLmRpc3BsYXlNb250aHMsXG4gICAgICAgICAgZGF0ZUN1c3RvbUNsYXNzZXM6IHN0YXRlLmRhdGVDdXN0b21DbGFzc2VzLFxuICAgICAgICAgIG1vbnRoSW5kZXhcbiAgICAgICAgfSlcbiAgICApO1xuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGZsYWdnZWRNb250aHMgfSk7XG4gIH1cblxuICBpZiAoc3RhdGUudmlldy5tb2RlID09PSAnbW9udGgnKSB7XG4gICAgY29uc3QgZmxhZ2dlZE1vbnRoc0NhbGVuZGFyID0gc3RhdGUubW9udGhzQ2FsZW5kYXIubWFwKFxuICAgICAgKGZvcm1hdHRlZE1vbnRoLCBtb250aEluZGV4KSA9PlxuICAgICAgICBmbGFnTW9udGhzQ2FsZW5kYXIoZm9ybWF0dGVkTW9udGgsIHtcbiAgICAgICAgICBpc0Rpc2FibGVkOiBzdGF0ZS5pc0Rpc2FibGVkLFxuICAgICAgICAgIG1pbkRhdGU6IHN0YXRlLm1pbkRhdGUsXG4gICAgICAgICAgbWF4RGF0ZTogc3RhdGUubWF4RGF0ZSxcbiAgICAgICAgICBob3ZlcmVkTW9udGg6IHN0YXRlLmhvdmVyZWRNb250aCxcbiAgICAgICAgICBkaXNwbGF5TW9udGhzOiBzdGF0ZS5kaXNwbGF5TW9udGhzLFxuICAgICAgICAgIG1vbnRoSW5kZXhcbiAgICAgICAgfSlcbiAgICApO1xuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGZsYWdnZWRNb250aHNDYWxlbmRhciB9KTtcbiAgfVxuXG4gIGlmIChzdGF0ZS52aWV3Lm1vZGUgPT09ICd5ZWFyJykge1xuICAgIGNvbnN0IHllYXJzQ2FsZW5kYXJGbGFnZ2VkID0gc3RhdGUueWVhcnNDYWxlbmRhck1vZGVsLm1hcChcbiAgICAgIChmb3JtYXR0ZWRNb250aCwgeWVhckluZGV4KSA9PlxuICAgICAgICBmbGFnWWVhcnNDYWxlbmRhcihmb3JtYXR0ZWRNb250aCwge1xuICAgICAgICAgIGlzRGlzYWJsZWQ6IHN0YXRlLmlzRGlzYWJsZWQsXG4gICAgICAgICAgbWluRGF0ZTogc3RhdGUubWluRGF0ZSxcbiAgICAgICAgICBtYXhEYXRlOiBzdGF0ZS5tYXhEYXRlLFxuICAgICAgICAgIGhvdmVyZWRZZWFyOiBzdGF0ZS5ob3ZlcmVkWWVhcixcbiAgICAgICAgICBkaXNwbGF5TW9udGhzOiBzdGF0ZS5kaXNwbGF5TW9udGhzLFxuICAgICAgICAgIHllYXJJbmRleFxuICAgICAgICB9KVxuICAgICk7XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgeWVhcnNDYWxlbmRhckZsYWdnZWQgfSk7XG4gIH1cblxuICByZXR1cm4gc3RhdGU7XG59XG5cbmZ1bmN0aW9uIGdldEZvcm1hdE9wdGlvbnMoc3RhdGU6IEJzRGF0ZXBpY2tlclN0YXRlKTogRGF0ZXBpY2tlckZvcm1hdE9wdGlvbnMge1xuICByZXR1cm4ge1xuICAgIGxvY2FsZTogc3RhdGUubG9jYWxlLFxuXG4gICAgbW9udGhUaXRsZTogc3RhdGUubW9udGhUaXRsZSxcbiAgICB5ZWFyVGl0bGU6IHN0YXRlLnllYXJUaXRsZSxcblxuICAgIGRheUxhYmVsOiBzdGF0ZS5kYXlMYWJlbCxcbiAgICBtb250aExhYmVsOiBzdGF0ZS5tb250aExhYmVsLFxuICAgIHllYXJMYWJlbDogc3RhdGUueWVhckxhYmVsLFxuXG4gICAgd2Vla051bWJlcnM6IHN0YXRlLndlZWtOdW1iZXJzXG4gIH07XG59XG5cbi8qKlxuICogaWYgdmlldyBkYXRlIGlzIHByb3ZpZGVkIChic1ZhbHVlfG5nTW9kZWwpIGl0IHNob3VsZCBiZSBzaG93blxuICogaWYgdmlldyBkYXRlIGlzIG5vdCBwcm92aWRlcjpcbiAqIGlmIG1pbkRhdGU+Y3VycmVudERhdGUgKGRlZmF1bHQgdmlldyB2YWx1ZSksIHNob3cgbWluRGF0ZVxuICogaWYgbWF4RGF0ZTxjdXJyZW50RGF0ZShkZWZhdWx0IHZpZXcgdmFsdWUpIHNob3cgbWF4RGF0ZVxuICovXG5mdW5jdGlvbiBnZXRWaWV3RGF0ZSh2aWV3RGF0ZTogRGF0ZSB8IERhdGVbXSwgbWluRGF0ZTogRGF0ZSwgbWF4RGF0ZTogRGF0ZSkge1xuICBjb25zdCBfZGF0ZSA9IEFycmF5LmlzQXJyYXkodmlld0RhdGUpID8gdmlld0RhdGVbMF0gOiB2aWV3RGF0ZTtcblxuICBpZiAobWluRGF0ZSAmJiBpc0FmdGVyKG1pbkRhdGUsIF9kYXRlLCAnZGF5JykpIHtcbiAgICByZXR1cm4gbWluRGF0ZTtcbiAgfVxuXG4gIGlmIChtYXhEYXRlICYmIGlzQmVmb3JlKG1heERhdGUsIF9kYXRlLCAnZGF5JykpIHtcbiAgICByZXR1cm4gbWF4RGF0ZTtcbiAgfVxuXG4gIHJldHVybiBfZGF0ZTtcbn1cbiJdfQ==