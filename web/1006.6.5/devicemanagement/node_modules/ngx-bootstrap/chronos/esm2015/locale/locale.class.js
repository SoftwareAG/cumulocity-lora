/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:max-file-line-count max-line-length cyclomatic-complexity
import { weekOfYear } from '../units/week-calendar-utils';
import { hasOwnProp, isArray, isFunction } from '../utils/type-checks';
import { getDay, getMonth } from '../utils/date-getters';
import { matchWord, regexEscape } from '../parse/regex';
import { setDayOfWeek } from '../units/day-of-week';
/**
 * @record
 */
export function LocaleOptionsFormat() { }
if (false) {
    /** @type {?} */
    LocaleOptionsFormat.prototype.format;
    /** @type {?} */
    LocaleOptionsFormat.prototype.standalone;
    /** @type {?|undefined} */
    LocaleOptionsFormat.prototype.isFormat;
}
/** @type {?} */
const MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
/** @type {?} */
export const defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
/** @type {?} */
export const defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
/** @type {?} */
export const defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
/** @type {?} */
export const defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
/** @type {?} */
export const defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
/** @type {?} */
export const defaultLongDateFormat = {
    LTS: 'h:mm:ss A',
    LT: 'h:mm A',
    L: 'MM/DD/YYYY',
    LL: 'MMMM D, YYYY',
    LLL: 'MMMM D, YYYY h:mm A',
    LLLL: 'dddd, MMMM D, YYYY h:mm A'
};
/** @type {?} */
export const defaultOrdinal = '%d';
/** @type {?} */
export const defaultDayOfMonthOrdinalParse = /\d{1,2}/;
/** @type {?} */
const defaultMonthsShortRegex = matchWord;
/** @type {?} */
const defaultMonthsRegex = matchWord;
/**
 * @record
 */
export function LocaleData() { }
if (false) {
    /** @type {?|undefined} */
    LocaleData.prototype.abbr;
    /** @type {?|undefined} */
    LocaleData.prototype.parentLocale;
    /** @type {?|undefined} */
    LocaleData.prototype.months;
    /** @type {?|undefined} */
    LocaleData.prototype.monthsShort;
    /** @type {?|undefined} */
    LocaleData.prototype.monthsParseExact;
    /** @type {?|undefined} */
    LocaleData.prototype.weekdays;
    /** @type {?|undefined} */
    LocaleData.prototype.weekdaysShort;
    /** @type {?|undefined} */
    LocaleData.prototype.weekdaysMin;
    /** @type {?|undefined} */
    LocaleData.prototype.weekdaysParseExact;
    /** @type {?|undefined} */
    LocaleData.prototype.longDateFormat;
    /** @type {?|undefined} */
    LocaleData.prototype.calendar;
    /** @type {?|undefined} */
    LocaleData.prototype.relativeTime;
    /** @type {?|undefined} */
    LocaleData.prototype.dayOfMonthOrdinalParse;
    /** @type {?|undefined} */
    LocaleData.prototype.ordinal;
    /** @type {?|undefined} */
    LocaleData.prototype.week;
    /** @type {?|undefined} */
    LocaleData.prototype.invalidDate;
    /** @type {?|undefined} */
    LocaleData.prototype.monthsRegex;
    /** @type {?|undefined} */
    LocaleData.prototype.monthsParse;
    /** @type {?|undefined} */
    LocaleData.prototype.monthsShortRegex;
    /** @type {?|undefined} */
    LocaleData.prototype.monthsStrictRegex;
    /** @type {?|undefined} */
    LocaleData.prototype.monthsShortStrictRegex;
    /** @type {?|undefined} */
    LocaleData.prototype.longMonthsParse;
    /** @type {?|undefined} */
    LocaleData.prototype.shortMonthsParse;
    /** @type {?|undefined} */
    LocaleData.prototype.meridiemParse;
    /**
     * @param {?} hour
     * @param {?} meridiem
     * @return {?}
     */
    LocaleData.prototype.meridiemHour = function (hour, meridiem) { };
    /**
     * @param {?} str
     * @return {?}
     */
    LocaleData.prototype.preparse = function (str) { };
    /**
     * @param {?} str
     * @return {?}
     */
    LocaleData.prototype.postformat = function (str) { };
    /**
     * @param {?} hour
     * @param {?=} minute
     * @param {?=} isLower
     * @return {?}
     */
    LocaleData.prototype.meridiem = function (hour, minute, isLower) { };
    /**
     * @param {?} input
     * @return {?}
     */
    LocaleData.prototype.isPM = function (input) { };
}
export class Locale {
    /**
     * @param {?} config
     */
    constructor(config) {
        if (!!config) {
            this.set(config);
        }
    }
    /**
     * @param {?} config
     * @return {?}
     */
    set(config) {
        /** @type {?} */
        let confKey;
        for (confKey in config) {
            if (!config.hasOwnProperty(confKey)) {
                continue;
            }
            /** @type {?} */
            const prop = config[(/** @type {?} */ (confKey))];
            /** @type {?} */
            const key = (/** @type {?} */ ((isFunction(prop) ? confKey : `_${confKey}`)));
            this[key] = (/** @type {?} */ (prop));
        }
        this._config = config;
    }
    /**
     * @param {?} key
     * @param {?} date
     * @param {?} now
     * @return {?}
     */
    calendar(key, date, now) {
        /** @type {?} */
        const output = this._calendar[key] || this._calendar.sameElse;
        return isFunction(output) ? output.call(null, date, now) : output;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    longDateFormat(key) {
        /** @type {?} */
        const format = this._longDateFormat[key];
        /** @type {?} */
        const formatUpper = this._longDateFormat[key.toUpperCase()];
        if (format || !formatUpper) {
            return format;
        }
        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, (/**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            return val.slice(1);
        }));
        return this._longDateFormat[key];
    }
    /**
     * @return {?}
     */
    get invalidDate() {
        return this._invalidDate;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set invalidDate(val) {
        this._invalidDate = val;
    }
    /**
     * @param {?} num
     * @param {?=} token
     * @return {?}
     */
    ordinal(num, token) {
        return this._ordinal.replace('%d', num.toString(10));
    }
    /**
     * @param {?} str
     * @return {?}
     */
    preparse(str) {
        return str;
    }
    /**
     * @param {?} str
     * @return {?}
     */
    postformat(str) {
        return str;
    }
    /**
     * @param {?} num
     * @param {?} withoutSuffix
     * @param {?} str
     * @param {?} isFuture
     * @return {?}
     */
    relativeTime(num, withoutSuffix, str, isFuture) {
        /** @type {?} */
        const output = this._relativeTime[str];
        return (isFunction(output)) ?
            output(num, withoutSuffix, str, isFuture) :
            output.replace(/%d/i, num.toString(10));
    }
    /**
     * @param {?} diff
     * @param {?} output
     * @return {?}
     */
    pastFuture(diff, output) {
        /** @type {?} */
        const format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }
    /**
     * @param {?=} date
     * @param {?=} format
     * @param {?=} isUTC
     * @return {?}
     */
    months(date, format, isUTC = false) {
        if (!date) {
            return isArray(this._months)
                ? this._months
                : this._months.standalone;
        }
        if (isArray(this._months)) {
            return this._months[getMonth(date, isUTC)];
        }
        /** @type {?} */
        const key = (this._months.isFormat || MONTHS_IN_FORMAT).test(format)
            ? 'format'
            : 'standalone';
        return this._months[key][getMonth(date, isUTC)];
    }
    /**
     * @param {?=} date
     * @param {?=} format
     * @param {?=} isUTC
     * @return {?}
     */
    monthsShort(date, format, isUTC = false) {
        if (!date) {
            return isArray(this._monthsShort)
                ? this._monthsShort
                : this._monthsShort.standalone;
        }
        if (isArray(this._monthsShort)) {
            return this._monthsShort[getMonth(date, isUTC)];
        }
        /** @type {?} */
        const key = MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone';
        return this._monthsShort[key][getMonth(date, isUTC)];
    }
    /**
     * @param {?} monthName
     * @param {?=} format
     * @param {?=} strict
     * @return {?}
     */
    monthsParse(monthName, format, strict) {
        /** @type {?} */
        let date;
        /** @type {?} */
        let regex;
        if (this._monthsParseExact) {
            return this.handleMonthStrictParse(monthName, format, strict);
        }
        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }
        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        /** @type {?} */
        let i;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            date = new Date(Date.UTC(2000, i));
            if (strict && !this._longMonthsParse[i]) {
                /** @type {?} */
                const _months = this.months(date, '', true).replace('.', '');
                /** @type {?} */
                const _shortMonths = this.monthsShort(date, '', true).replace('.', '');
                this._longMonthsParse[i] = new RegExp(`^${_months}$`, 'i');
                this._shortMonthsParse[i] = new RegExp(`^${_shortMonths}$`, 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = `^${this.months(date, '', true)}|^${this.monthsShort(date, '', true)}`;
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && ((/** @type {?} */ (this._longMonthsParse[i]))).test(monthName)) {
                return i;
            }
            if (strict && format === 'MMM' && ((/** @type {?} */ (this._shortMonthsParse[i]))).test(monthName)) {
                return i;
            }
            if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }
    /**
     * @param {?} isStrict
     * @return {?}
     */
    monthsRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this.computeMonthsParse();
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            }
            return this._monthsRegex;
        }
        if (!hasOwnProp(this, '_monthsRegex')) {
            this._monthsRegex = defaultMonthsRegex;
        }
        return this._monthsStrictRegex && isStrict ?
            this._monthsStrictRegex : this._monthsRegex;
    }
    /**
     * @param {?} isStrict
     * @return {?}
     */
    monthsShortRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this.computeMonthsParse();
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            }
            return this._monthsShortRegex;
        }
        if (!hasOwnProp(this, '_monthsShortRegex')) {
            this._monthsShortRegex = defaultMonthsShortRegex;
        }
        return this._monthsShortStrictRegex && isStrict ?
            this._monthsShortStrictRegex : this._monthsShortRegex;
    }
    /**
     * Week
     * @param {?} date
     * @param {?=} isUTC
     * @return {?}
     */
    week(date, isUTC) {
        return weekOfYear(date, this._week.dow, this._week.doy, isUTC).week;
    }
    /**
     * @return {?}
     */
    firstDayOfWeek() {
        return this._week.dow;
    }
    /**
     * @return {?}
     */
    firstDayOfYear() {
        return this._week.doy;
    }
    /**
     * @param {?=} date
     * @param {?=} format
     * @param {?=} isUTC
     * @return {?}
     */
    weekdays(date, format, isUTC) {
        if (!date) {
            return isArray(this._weekdays)
                ? this._weekdays
                : this._weekdays.standalone;
        }
        if (isArray(this._weekdays)) {
            return this._weekdays[getDay(date, isUTC)];
        }
        /** @type {?} */
        const _key = this._weekdays.isFormat.test(format)
            ? 'format'
            : 'standalone';
        return this._weekdays[_key][getDay(date, isUTC)];
    }
    /**
     * @param {?=} date
     * @param {?=} format
     * @param {?=} isUTC
     * @return {?}
     */
    weekdaysMin(date, format, isUTC) {
        return date ? this._weekdaysMin[getDay(date, isUTC)] : this._weekdaysMin;
    }
    /**
     * @param {?=} date
     * @param {?=} format
     * @param {?=} isUTC
     * @return {?}
     */
    weekdaysShort(date, format, isUTC) {
        return date ? this._weekdaysShort[getDay(date, isUTC)] : this._weekdaysShort;
    }
    // proto.weekdaysParse  =        localeWeekdaysParse;
    /**
     * @param {?=} weekdayName
     * @param {?=} format
     * @param {?=} strict
     * @return {?}
     */
    weekdaysParse(weekdayName, format, strict) {
        /** @type {?} */
        let i;
        /** @type {?} */
        let regex;
        if (this._weekdaysParseExact) {
            return this.handleWeekStrictParse(weekdayName, format, strict);
        }
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            // fix: here is the issue
            /** @type {?} */
            const date = setDayOfWeek(new Date(Date.UTC(2000, 1)), i, null, true);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp(`^${this.weekdays(date, '', true).replace('.', '\.?')}$`, 'i');
                this._shortWeekdaysParse[i] = new RegExp(`^${this.weekdaysShort(date, '', true).replace('.', '\.?')}$`, 'i');
                this._minWeekdaysParse[i] = new RegExp(`^${this.weekdaysMin(date, '', true).replace('.', '\.?')}$`, 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = `^${this.weekdays(date, '', true)}|^${this.weekdaysShort(date, '', true)}|^${this.weekdaysMin(date, '', true)}`;
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            if (!isArray(this._fullWeekdaysParse)
                || !isArray(this._shortWeekdaysParse)
                || !isArray(this._minWeekdaysParse)
                || !isArray(this._weekdaysParse)) {
                return;
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            }
            else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            }
            else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            }
            else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }
    // proto.weekdaysRegex       =        weekdaysRegex;
    /**
     * @param {?} isStrict
     * @return {?}
     */
    weekdaysRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this.computeWeekdaysParse();
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            }
            else {
                return this._weekdaysRegex;
            }
        }
        else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = matchWord;
            }
            return this._weekdaysStrictRegex && isStrict ?
                this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }
    // proto.weekdaysShortRegex  =        weekdaysShortRegex;
    // proto.weekdaysMinRegex    =        weekdaysMinRegex;
    /**
     * @param {?=} isStrict
     * @return {?}
     */
    weekdaysShortRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this.computeWeekdaysParse();
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            }
            else {
                return this._weekdaysShortRegex;
            }
        }
        else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = matchWord;
            }
            return this._weekdaysShortStrictRegex && isStrict ?
                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }
    /**
     * @param {?=} isStrict
     * @return {?}
     */
    weekdaysMinRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this.computeWeekdaysParse();
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            }
            else {
                return this._weekdaysMinRegex;
            }
        }
        else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = matchWord;
            }
            return this._weekdaysMinStrictRegex && isStrict ?
                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }
    /**
     * @param {?} input
     * @return {?}
     */
    isPM(input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return input.toLowerCase().charAt(0) === 'p';
    }
    /**
     * @param {?} hours
     * @param {?} minutes
     * @param {?} isLower
     * @return {?}
     */
    meridiem(hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        }
        return isLower ? 'am' : 'AM';
    }
    /**
     * @param {?} key
     * @return {?}
     */
    formatLongDate(key) {
        this._longDateFormat = this._longDateFormat ? this._longDateFormat : defaultLongDateFormat;
        /** @type {?} */
        const format = this._longDateFormat[key];
        /** @type {?} */
        const formatUpper = this._longDateFormat[key.toUpperCase()];
        if (format || !formatUpper) {
            return format;
        }
        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, (/**
         * @param {?} val
         * @return {?}
         */
        (val) => {
            return val.slice(1);
        }));
        return this._longDateFormat[key];
    }
    /**
     * @private
     * @param {?} monthName
     * @param {?} format
     * @param {?=} strict
     * @return {?}
     */
    handleMonthStrictParse(monthName, format, strict) {
        /** @type {?} */
        const llc = monthName.toLocaleLowerCase();
        /** @type {?} */
        let i;
        /** @type {?} */
        let ii;
        /** @type {?} */
        let mom;
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = new Date(2000, i);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }
        if (strict) {
            if (format === 'MMM') {
                ii = ((/** @type {?} */ (this._shortMonthsParse))).indexOf(llc);
                return ii !== -1 ? ii : null;
            }
            ii = ((/** @type {?} */ (this._longMonthsParse))).indexOf(llc);
            return ii !== -1 ? ii : null;
        }
        if (format === 'MMM') {
            ii = ((/** @type {?} */ (this._shortMonthsParse))).indexOf(llc);
            if (ii !== -1) {
                return ii;
            }
            ii = ((/** @type {?} */ (this._longMonthsParse))).indexOf(llc);
            return ii !== -1 ? ii : null;
        }
        ii = ((/** @type {?} */ (this._longMonthsParse))).indexOf(llc);
        if (ii !== -1) {
            return ii;
        }
        ii = ((/** @type {?} */ (this._shortMonthsParse))).indexOf(llc);
        return ii !== -1 ? ii : null;
    }
    /**
     * @private
     * @param {?} weekdayName
     * @param {?} format
     * @param {?} strict
     * @return {?}
     */
    handleWeekStrictParse(weekdayName, format, strict) {
        /** @type {?} */
        let ii;
        /** @type {?} */
        const llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];
            /** @type {?} */
            let i;
            for (i = 0; i < 7; ++i) {
                /** @type {?} */
                const date = setDayOfWeek(new Date(Date.UTC(2000, 1)), i, null, true);
                this._minWeekdaysParse[i] = this.weekdaysMin(date).toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(date).toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(date, '').toLocaleLowerCase();
            }
        }
        if (!isArray(this._weekdaysParse)
            || !isArray(this._shortWeekdaysParse)
            || !isArray(this._minWeekdaysParse)) {
            return;
        }
        if (strict) {
            if (format === 'dddd') {
                ii = this._weekdaysParse.indexOf(llc);
                return ii !== -1 ? ii : null;
            }
            else if (format === 'ddd') {
                ii = this._shortWeekdaysParse.indexOf(llc);
                return ii !== -1 ? ii : null;
            }
            else {
                ii = this._minWeekdaysParse.indexOf(llc);
                return ii !== -1 ? ii : null;
            }
        }
        else {
            if (format === 'dddd') {
                ii = this._weekdaysParse.indexOf(llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = this._shortWeekdaysParse.indexOf(llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = this._minWeekdaysParse.indexOf(llc);
                return ii !== -1 ? ii : null;
            }
            else if (format === 'ddd') {
                ii = this._shortWeekdaysParse.indexOf(llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = this._weekdaysParse.indexOf(llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = this._minWeekdaysParse.indexOf(llc);
                return ii !== -1 ? ii : null;
            }
            else {
                ii = this._minWeekdaysParse.indexOf(llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = this._weekdaysParse.indexOf(llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = this._shortWeekdaysParse.indexOf(llc);
                return ii !== -1 ? ii : null;
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    computeMonthsParse() {
        /** @type {?} */
        const shortPieces = [];
        /** @type {?} */
        const longPieces = [];
        /** @type {?} */
        const mixedPieces = [];
        /** @type {?} */
        let date;
        /** @type {?} */
        let i;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            date = new Date(2000, i);
            shortPieces.push(this.monthsShort(date, ''));
            longPieces.push(this.months(date, ''));
            mixedPieces.push(this.months(date, ''));
            mixedPieces.push(this.monthsShort(date, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }
        this._monthsRegex = new RegExp(`^(${mixedPieces.join('|')})`, 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp(`^(${longPieces.join('|')})`, 'i');
        this._monthsShortStrictRegex = new RegExp(`^(${shortPieces.join('|')})`, 'i');
    }
    /**
     * @private
     * @return {?}
     */
    computeWeekdaysParse() {
        /** @type {?} */
        const minPieces = [];
        /** @type {?} */
        const shortPieces = [];
        /** @type {?} */
        const longPieces = [];
        /** @type {?} */
        const mixedPieces = [];
        /** @type {?} */
        let i;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            // let mom = createUTC([2000, 1]).day(i);
            /** @type {?} */
            const date = setDayOfWeek(new Date(Date.UTC(2000, 1)), i, null, true);
            /** @type {?} */
            const minp = this.weekdaysMin(date);
            /** @type {?} */
            const shortp = this.weekdaysShort(date);
            /** @type {?} */
            const longp = this.weekdays(date);
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }
        this._weekdaysRegex = new RegExp(`^(${mixedPieces.join('|')})`, 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;
        this._weekdaysStrictRegex = new RegExp(`^(${longPieces.join('|')})`, 'i');
        this._weekdaysShortStrictRegex = new RegExp(`^(${shortPieces.join('|')})`, 'i');
        this._weekdaysMinStrictRegex = new RegExp(`^(${minPieces.join('|')})`, 'i');
    }
}
if (false) {
    /** @type {?} */
    Locale.prototype.parentLocale;
    /** @type {?} */
    Locale.prototype._abbr;
    /** @type {?} */
    Locale.prototype._config;
    /** @type {?} */
    Locale.prototype.meridiemHour;
    /** @type {?} */
    Locale.prototype._invalidDate;
    /** @type {?} */
    Locale.prototype._week;
    /** @type {?} */
    Locale.prototype._dayOfMonthOrdinalParse;
    /** @type {?} */
    Locale.prototype._ordinalParse;
    /** @type {?} */
    Locale.prototype._meridiemParse;
    /**
     * @type {?}
     * @private
     */
    Locale.prototype._calendar;
    /**
     * @type {?}
     * @private
     */
    Locale.prototype._relativeTime;
    /**
     * @type {?}
     * @private
     */
    Locale.prototype._months;
    /**
     * @type {?}
     * @private
     */
    Locale.prototype._monthsShort;
    /**
     * @type {?}
     * @private
     */
    Locale.prototype._monthsRegex;
    /**
     * @type {?}
     * @private
     */
    Locale.prototype._monthsShortRegex;
    /**
     * @type {?}
     * @private
     */
    Locale.prototype._monthsStrictRegex;
    /**
     * @type {?}
     * @private
     */
    Locale.prototype._monthsShortStrictRegex;
    /**
     * @type {?}
     * @private
     */
    Locale.prototype._monthsParse;
    /**
     * @type {?}
     * @private
     */
    Locale.prototype._longMonthsParse;
    /**
     * @type {?}
     * @private
     */
    Locale.prototype._shortMonthsParse;
    /**
     * @type {?}
     * @private
     */
    Locale.prototype._monthsParseExact;
    /**
     * @type {?}
     * @private
     */
    Locale.prototype._weekdaysParseExact;
    /**
     * @type {?}
     * @private
     */
    Locale.prototype._weekdaysRegex;
    /**
     * @type {?}
     * @private
     */
    Locale.prototype._weekdaysShortRegex;
    /**
     * @type {?}
     * @private
     */
    Locale.prototype._weekdaysMinRegex;
    /**
     * @type {?}
     * @private
     */
    Locale.prototype._weekdaysStrictRegex;
    /**
     * @type {?}
     * @private
     */
    Locale.prototype._weekdaysShortStrictRegex;
    /**
     * @type {?}
     * @private
     */
    Locale.prototype._weekdaysMinStrictRegex;
    /**
     * @type {?}
     * @private
     */
    Locale.prototype._weekdays;
    /**
     * @type {?}
     * @private
     */
    Locale.prototype._weekdaysShort;
    /**
     * @type {?}
     * @private
     */
    Locale.prototype._weekdaysMin;
    /**
     * @type {?}
     * @private
     */
    Locale.prototype._weekdaysParse;
    /**
     * @type {?}
     * @private
     */
    Locale.prototype._minWeekdaysParse;
    /**
     * @type {?}
     * @private
     */
    Locale.prototype._shortWeekdaysParse;
    /**
     * @type {?}
     * @private
     */
    Locale.prototype._fullWeekdaysParse;
    /**
     * @type {?}
     * @private
     */
    Locale.prototype._longDateFormat;
    /**
     * @type {?}
     * @private
     */
    Locale.prototype._ordinal;
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function cmpLenRev(a, b) {
    return b.length - a.length;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlLmNsYXNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWJvb3RzdHJhcC9jaHJvbm9zLyIsInNvdXJjZXMiOlsibG9jYWxlL2xvY2FsZS5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7O0FBRXBELHlDQUlDOzs7SUFIQyxxQ0FBaUI7O0lBQ2pCLHlDQUFxQjs7SUFDckIsdUNBQWtCOzs7TUFLZCxnQkFBZ0IsR0FBRywrQkFBK0I7O0FBQ3hELE1BQU0sT0FBTyxtQkFBbUIsR0FBRyx1RkFBdUYsQ0FBQyxLQUFLLENBQzlILEdBQUcsQ0FDSjs7QUFDRCxNQUFNLE9BQU8sd0JBQXdCLEdBQUcsaURBQWlELENBQUMsS0FBSyxDQUM3RixHQUFHLENBQ0o7O0FBQ0QsTUFBTSxPQUFPLHFCQUFxQixHQUFHLDBEQUEwRCxDQUFDLEtBQUssQ0FDbkcsR0FBRyxDQUNKOztBQUNELE1BQU0sT0FBTywwQkFBMEIsR0FBRyw2QkFBNkIsQ0FBQyxLQUFLLENBQzNFLEdBQUcsQ0FDSjs7QUFDRCxNQUFNLE9BQU8sd0JBQXdCLEdBQUcsc0JBQXNCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzs7QUFDekUsTUFBTSxPQUFPLHFCQUFxQixHQUFnQztJQUNoRSxHQUFHLEVBQUUsV0FBVztJQUNoQixFQUFFLEVBQUUsUUFBUTtJQUNaLENBQUMsRUFBRSxZQUFZO0lBQ2YsRUFBRSxFQUFFLGNBQWM7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SUFDaEMsK0JBQXNCOztJQUN0QixnQ0FBdUI7Ozs7O0lBRXZCLDJCQUE2Qzs7Ozs7SUFDN0MsK0JBQXdEOzs7OztJQUN4RCx5QkFBK0I7Ozs7O0lBQy9CLDhCQUFvQzs7Ozs7SUFDcEMsOEJBQTZCOzs7OztJQUM3QixtQ0FBa0M7Ozs7O0lBQ2xDLG9DQUFtQzs7Ozs7SUFDbkMseUNBQXdDOzs7OztJQUN4Qyw4QkFBK0I7Ozs7O0lBQy9CLGtDQUE4Qzs7Ozs7SUFDOUMsbUNBQStDOzs7OztJQUMvQyxtQ0FBa0M7Ozs7O0lBQ2xDLHFDQUFxQzs7Ozs7SUFDckMsZ0NBQStCOzs7OztJQUMvQixxQ0FBb0M7Ozs7O0lBQ3BDLG1DQUFrQzs7Ozs7SUFFbEMsc0NBQXFDOzs7OztJQUNyQywyQ0FBMEM7Ozs7O0lBQzFDLHlDQUF3Qzs7Ozs7SUFFeEMsMkJBQWlDOzs7OztJQUNqQyxnQ0FBaUM7Ozs7O0lBQ2pDLDhCQUErQjs7Ozs7SUFDL0IsZ0NBQTRDOzs7OztJQUM1QyxtQ0FBK0M7Ozs7O0lBQy9DLHFDQUFpRDs7Ozs7SUFDakQsb0NBQXFDOzs7OztJQUNyQyxpQ0FBbUQ7Ozs7O0lBRW5ELDBCQUF5Qjs7Ozs7OztBQXVsQjNCLFNBQVMsU0FBUyxDQUFDLENBQVMsRUFBRSxDQUFTO0lBQ3JDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO0FBQzdCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTptYXgtZmlsZS1saW5lLWNvdW50IG1heC1saW5lLWxlbmd0aCBjeWNsb21hdGljLWNvbXBsZXhpdHlcblxuaW1wb3J0IHsgd2Vla09mWWVhciB9IGZyb20gJy4uL3VuaXRzL3dlZWstY2FsZW5kYXItdXRpbHMnO1xuaW1wb3J0IHsgaGFzT3duUHJvcCwgaXNBcnJheSwgaXNGdW5jdGlvbiB9IGZyb20gJy4uL3V0aWxzL3R5cGUtY2hlY2tzJztcbmltcG9ydCB7IGdldERheSwgZ2V0TW9udGggfSBmcm9tICcuLi91dGlscy9kYXRlLWdldHRlcnMnO1xuaW1wb3J0IHsgbWF0Y2hXb3JkLCByZWdleEVzY2FwZSB9IGZyb20gJy4uL3BhcnNlL3JlZ2V4JztcbmltcG9ydCB7IHNldERheU9mV2VlayB9IGZyb20gJy4uL3VuaXRzL2RheS1vZi13ZWVrJztcblxuZXhwb3J0IGludGVyZmFjZSBMb2NhbGVPcHRpb25zRm9ybWF0IHtcbiAgZm9ybWF0OiBzdHJpbmdbXTtcbiAgc3RhbmRhbG9uZTogc3RyaW5nW107XG4gIGlzRm9ybWF0PzogUmVnRXhwO1xufVxuXG5leHBvcnQgdHlwZSBMb2NhbGVPcHRpb25zID0gc3RyaW5nW10gfCBMb2NhbGVPcHRpb25zRm9ybWF0O1xuXG5jb25zdCBNT05USFNfSU5fRk9STUFUID0gL0Rbb0RdPyhcXFtbXlxcW1xcXV0qXFxdfFxccykrTU1NTT8vO1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRMb2NhbGVNb250aHMgPSAnSmFudWFyeV9GZWJydWFyeV9NYXJjaF9BcHJpbF9NYXlfSnVuZV9KdWx5X0F1Z3VzdF9TZXB0ZW1iZXJfT2N0b2Jlcl9Ob3ZlbWJlcl9EZWNlbWJlcicuc3BsaXQoXG4gICdfJ1xuKTtcbmV4cG9ydCBjb25zdCBkZWZhdWx0TG9jYWxlTW9udGhzU2hvcnQgPSAnSmFuX0ZlYl9NYXJfQXByX01heV9KdW5fSnVsX0F1Z19TZXBfT2N0X05vdl9EZWMnLnNwbGl0KFxuICAnXydcbik7XG5leHBvcnQgY29uc3QgZGVmYXVsdExvY2FsZVdlZWtkYXlzID0gJ1N1bmRheV9Nb25kYXlfVHVlc2RheV9XZWRuZXNkYXlfVGh1cnNkYXlfRnJpZGF5X1NhdHVyZGF5Jy5zcGxpdChcbiAgJ18nXG4pO1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRMb2NhbGVXZWVrZGF5c1Nob3J0ID0gJ1N1bl9Nb25fVHVlX1dlZF9UaHVfRnJpX1NhdCcuc3BsaXQoXG4gICdfJ1xuKTtcbmV4cG9ydCBjb25zdCBkZWZhdWx0TG9jYWxlV2Vla2RheXNNaW4gPSAnU3VfTW9fVHVfV2VfVGhfRnJfU2EnLnNwbGl0KCdfJyk7XG5leHBvcnQgY29uc3QgZGVmYXVsdExvbmdEYXRlRm9ybWF0OiB7IFtpbmRleDogc3RyaW5nXTogc3RyaW5nIH0gPSB7XG4gIExUUzogJ2g6bW06c3MgQScsXG4gIExUOiAnaDptbSBBJyxcbiAgTDogJ01NL0REL1lZWVknLFxuICBMTDogJ01NTU0gRCwgWVlZWScsXG4gIExMTDogJ01NTU0gRCwgWVlZWSBoOm1tIEEnLFxuICBMTExMOiAnZGRkZCwgTU1NTSBELCBZWVlZIGg6bW0gQSdcbn07XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0T3JkaW5hbCA9ICclZCc7XG5leHBvcnQgY29uc3QgZGVmYXVsdERheU9mTW9udGhPcmRpbmFsUGFyc2UgPSAvXFxkezEsMn0vO1xuXG5jb25zdCBkZWZhdWx0TW9udGhzU2hvcnRSZWdleCA9IG1hdGNoV29yZDtcbmNvbnN0IGRlZmF1bHRNb250aHNSZWdleCA9IG1hdGNoV29yZDtcblxuZXhwb3J0IHR5cGUgT3JkaW5hbERhdGVGbiA9IChudW06IG51bWJlciwgdG9rZW4/OiBzdHJpbmcpID0+IHN0cmluZztcbmV4cG9ydCB0eXBlIFBsdXJhbGl6ZURhdGVGbiA9IChudW06IG51bWJlciwgd2l0aG91dFN1ZmZpeDogYm9vbGVhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk/OiBzdHJpbmcsIGlzRnV0dXJlPzogYm9vbGVhbikgPT4gc3RyaW5nO1xuXG5leHBvcnQgaW50ZXJmYWNlIExvY2FsZURhdGEge1xuICBhYmJyPzogc3RyaW5nO1xuICBwYXJlbnRMb2NhbGU/OiBzdHJpbmc7XG5cbiAgbW9udGhzPzogTG9jYWxlT3B0aW9ucyB8ICgoZGF0ZTogRGF0ZSwgZm9ybWF0OiBzdHJpbmcsIGlzVVRDPzogYm9vbGVhbikgPT4gc3RyaW5nIHwgc3RyaW5nW10pO1xuICBtb250aHNTaG9ydD86IExvY2FsZU9wdGlvbnMgfCAoKGRhdGU6IERhdGUsIGZvcm1hdDogc3RyaW5nLCBpc1VUQz86IGJvb2xlYW4pID0+IHN0cmluZyB8IHN0cmluZ1tdKTtcbiAgbW9udGhzUGFyc2VFeGFjdD86IGJvb2xlYW47XG5cbiAgd2Vla2RheXM/OiBMb2NhbGVPcHRpb25zIHwgKChkYXRlOiBEYXRlLCBmb3JtYXQ6IHN0cmluZywgaXNVVEM/OiBib29sZWFuKSA9PiBzdHJpbmcgfCBzdHJpbmdbXSk7XG4gIHdlZWtkYXlzU2hvcnQ/OiBzdHJpbmdbXSB8ICgoZGF0ZTogRGF0ZSwgZm9ybWF0OiBzdHJpbmcsIGlzVVRDPzogYm9vbGVhbikgPT4gc3RyaW5nIHwgc3RyaW5nW10pO1xuICB3ZWVrZGF5c01pbj86IHN0cmluZ1tdIHwgKChkYXRlOiBEYXRlLCBmb3JtYXQ6IHN0cmluZywgaXNVVEM/OiBib29sZWFuKSA9PiBzdHJpbmcgfCBzdHJpbmdbXSk7XG4gIHdlZWtkYXlzUGFyc2VFeGFjdD86IGJvb2xlYW47XG5cbiAgbG9uZ0RhdGVGb3JtYXQ/OiB7IFtpbmRleDogc3RyaW5nXTogc3RyaW5nIH07XG4gIGNhbGVuZGFyPzoge1xuICAgIFtrZXk6IHN0cmluZ106IChzdHJpbmdcbiAgICAgIHwgKChkYXRlOiBEYXRlLCBub3c/OiBEYXRlKSA9PiBzdHJpbmcpXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIHwgKChkYXlPZldlZWs6IG51bWJlciwgaXNOZXh0V2VlazogYm9vbGVhbikgPT4gc3RyaW5nKSlcbiAgfTtcbiAgcmVsYXRpdmVUaW1lPzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBQbHVyYWxpemVEYXRlRm4gfTtcbiAgZGF5T2ZNb250aE9yZGluYWxQYXJzZT86IFJlZ0V4cDtcbiAgb3JkaW5hbD86IHN0cmluZyB8IE9yZGluYWxEYXRlRm47XG5cbiAgd2Vlaz86IHsgZG93PzogbnVtYmVyOyBkb3k/OiBudW1iZXIgfTtcblxuICBpbnZhbGlkRGF0ZT86IHN0cmluZztcblxuICBtb250aHNSZWdleD86IFJlZ0V4cDtcbiAgbW9udGhzUGFyc2U/OiBSZWdFeHBbXTtcbiAgbW9udGhzU2hvcnRSZWdleD86IFJlZ0V4cDtcbiAgbW9udGhzU3RyaWN0UmVnZXg/OiBSZWdFeHA7XG4gIG1vbnRoc1Nob3J0U3RyaWN0UmVnZXg/OiBSZWdFeHA7XG4gIGxvbmdNb250aHNQYXJzZT86IFJlZ0V4cFtdO1xuICBzaG9ydE1vbnRoc1BhcnNlPzogUmVnRXhwW107XG5cbiAgbWVyaWRpZW1QYXJzZT86IFJlZ0V4cDtcblxuICBtZXJpZGllbUhvdXI/KGhvdXI6IG51bWJlciwgbWVyaWRpZW06IHN0cmluZyk6IG51bWJlcjtcblxuICBwcmVwYXJzZT8oc3RyOiBzdHJpbmcpOiBzdHJpbmc7XG5cbiAgcG9zdGZvcm1hdD8oc3RyOiBzdHJpbmcgfCBudW1iZXIpOiBzdHJpbmc7XG5cbiAgbWVyaWRpZW0/KGhvdXI6IG51bWJlciwgbWludXRlPzogbnVtYmVyLCBpc0xvd2VyPzogYm9vbGVhbik6IHN0cmluZztcblxuICBpc1BNPyhpbnB1dDogc3RyaW5nKTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIExvY2FsZSB7XG4gIHBhcmVudExvY2FsZT86IExvY2FsZTtcbiAgX2FiYnI6IHN0cmluZztcbiAgX2NvbmZpZzogTG9jYWxlRGF0YTtcbiAgbWVyaWRpZW1Ib3VyOiAoaG91cjogbnVtYmVyLCBtZXJpZGllbTogc3RyaW5nKSA9PiBudW1iZXI7XG5cbiAgX2ludmFsaWREYXRlOiBzdHJpbmc7XG4gIF93ZWVrOiB7IGRvdzogbnVtYmVyOyBkb3k6IG51bWJlciB9O1xuICBfZGF5T2ZNb250aE9yZGluYWxQYXJzZTogUmVnRXhwO1xuICBfb3JkaW5hbFBhcnNlOiBSZWdFeHA7XG4gIF9tZXJpZGllbVBhcnNlOiBSZWdFeHA7XG5cbiAgcHJpdmF0ZSBfY2FsZW5kYXI6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XG4gIHByaXZhdGUgX3JlbGF0aXZlVGltZTogeyBmdXR1cmU6IHN0cmluZzsgcGFzdDogc3RyaW5nIH07XG4gIHByaXZhdGUgX21vbnRoczogTG9jYWxlT3B0aW9ucztcbiAgcHJpdmF0ZSBfbW9udGhzU2hvcnQ6IExvY2FsZU9wdGlvbnM7XG4gIHByaXZhdGUgX21vbnRoc1JlZ2V4OiBSZWdFeHA7XG4gIHByaXZhdGUgX21vbnRoc1Nob3J0UmVnZXg6IFJlZ0V4cDtcbiAgcHJpdmF0ZSBfbW9udGhzU3RyaWN0UmVnZXg6IFJlZ0V4cDtcbiAgcHJpdmF0ZSBfbW9udGhzU2hvcnRTdHJpY3RSZWdleDogUmVnRXhwO1xuICBwcml2YXRlIF9tb250aHNQYXJzZTogUmVnRXhwW107XG4gIHByaXZhdGUgX2xvbmdNb250aHNQYXJzZTogc3RyaW5nW10gfCBSZWdFeHBbXTtcbiAgcHJpdmF0ZSBfc2hvcnRNb250aHNQYXJzZTogc3RyaW5nW10gfCBSZWdFeHBbXTtcbiAgcHJpdmF0ZSBfbW9udGhzUGFyc2VFeGFjdDogUmVnRXhwO1xuICBwcml2YXRlIF93ZWVrZGF5c1BhcnNlRXhhY3Q6IGJvb2xlYW47XG4gIHByaXZhdGUgX3dlZWtkYXlzUmVnZXg6IFJlZ0V4cDtcbiAgcHJpdmF0ZSBfd2Vla2RheXNTaG9ydFJlZ2V4OiBSZWdFeHA7XG4gIHByaXZhdGUgX3dlZWtkYXlzTWluUmVnZXg6IFJlZ0V4cDtcblxuICBwcml2YXRlIF93ZWVrZGF5c1N0cmljdFJlZ2V4OiBSZWdFeHA7XG4gIHByaXZhdGUgX3dlZWtkYXlzU2hvcnRTdHJpY3RSZWdleDogUmVnRXhwO1xuICBwcml2YXRlIF93ZWVrZGF5c01pblN0cmljdFJlZ2V4OiBSZWdFeHA7XG5cbiAgcHJpdmF0ZSBfd2Vla2RheXM6IExvY2FsZU9wdGlvbnM7XG4gIHByaXZhdGUgX3dlZWtkYXlzU2hvcnQ6IHN0cmluZ1tdO1xuICBwcml2YXRlIF93ZWVrZGF5c01pbjogc3RyaW5nW107XG4gIHByaXZhdGUgX3dlZWtkYXlzUGFyc2U6IHN0cmluZ1tdIHwgUmVnRXhwW107XG4gIHByaXZhdGUgX21pbldlZWtkYXlzUGFyc2U6IHN0cmluZ1tdIHwgUmVnRXhwW107XG4gIHByaXZhdGUgX3Nob3J0V2Vla2RheXNQYXJzZTogc3RyaW5nW10gfCBSZWdFeHBbXTtcbiAgcHJpdmF0ZSBfZnVsbFdlZWtkYXlzUGFyc2U6IFJlZ0V4cFtdO1xuICBwcml2YXRlIF9sb25nRGF0ZUZvcm1hdDogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcblxuICBwcml2YXRlIF9vcmRpbmFsOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBMb2NhbGVEYXRhKSB7XG4gICAgaWYgKCEhY29uZmlnKSB7XG4gICAgICB0aGlzLnNldChjb25maWcpO1xuICAgIH1cbiAgfVxuXG4gIHNldChjb25maWc6IExvY2FsZURhdGEpOiB2b2lkIHtcbiAgICBsZXQgY29uZktleTtcbiAgICBmb3IgKGNvbmZLZXkgaW4gY29uZmlnKSB7XG4gICAgICBpZiAoIWNvbmZpZy5oYXNPd25Qcm9wZXJ0eShjb25mS2V5KSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHByb3AgPSBjb25maWdbY29uZktleSBhcyBrZXlvZiBMb2NhbGVEYXRhXTtcbiAgICAgIGNvbnN0IGtleSA9IChpc0Z1bmN0aW9uKHByb3ApID8gY29uZktleSA6IGBfJHtjb25mS2V5fWApIGFzIGtleW9mIExvY2FsZTtcblxuICAgICAgdGhpc1trZXldID0gcHJvcCBhcyBhbnk7XG4gICAgfVxuXG4gICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xuICB9XG5cbiAgY2FsZW5kYXIoa2V5OiBzdHJpbmcsIGRhdGU6IERhdGUsIG5vdzogRGF0ZSk6IHN0cmluZyB7XG4gICAgY29uc3Qgb3V0cHV0ID0gdGhpcy5fY2FsZW5kYXJba2V5XSB8fCB0aGlzLl9jYWxlbmRhci5zYW1lRWxzZTtcblxuICAgIHJldHVybiBpc0Z1bmN0aW9uKG91dHB1dCkgPyBvdXRwdXQuY2FsbChudWxsLCBkYXRlLCBub3cpIDogb3V0cHV0O1xuICB9XG5cbiAgbG9uZ0RhdGVGb3JtYXQoa2V5OiBzdHJpbmcpIHtcbiAgICBjb25zdCBmb3JtYXQgPSB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXldO1xuICAgIGNvbnN0IGZvcm1hdFVwcGVyID0gdGhpcy5fbG9uZ0RhdGVGb3JtYXRba2V5LnRvVXBwZXJDYXNlKCldO1xuXG4gICAgaWYgKGZvcm1hdCB8fCAhZm9ybWF0VXBwZXIpIHtcbiAgICAgIHJldHVybiBmb3JtYXQ7XG4gICAgfVxuXG4gICAgdGhpcy5fbG9uZ0RhdGVGb3JtYXRba2V5XSA9IGZvcm1hdFVwcGVyLnJlcGxhY2UoL01NTU18TU18RER8ZGRkZC9nLCBmdW5jdGlvbiAodmFsOiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiB2YWwuc2xpY2UoMSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5fbG9uZ0RhdGVGb3JtYXRba2V5XTtcbiAgfVxuXG4gIGdldCBpbnZhbGlkRGF0ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9pbnZhbGlkRGF0ZTtcbiAgfVxuXG4gIHNldCBpbnZhbGlkRGF0ZSh2YWw6IHN0cmluZykge1xuICAgIHRoaXMuX2ludmFsaWREYXRlID0gdmFsO1xuICB9XG5cbiAgb3JkaW5hbChudW06IG51bWJlciwgdG9rZW4/OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9vcmRpbmFsLnJlcGxhY2UoJyVkJywgbnVtLnRvU3RyaW5nKDEwKSk7XG4gIH1cblxuICBwcmVwYXJzZShzdHI6IHN0cmluZykge1xuICAgIHJldHVybiBzdHI7XG4gIH1cblxuICBwb3N0Zm9ybWF0KHN0cjogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG4gIHJlbGF0aXZlVGltZShudW06IG51bWJlciwgd2l0aG91dFN1ZmZpeDogYm9vbGVhbiwgc3RyOiAnZnV0dXJlJyB8ICdwYXN0JywgaXNGdXR1cmU6IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgIGNvbnN0IG91dHB1dCA9IHRoaXMuX3JlbGF0aXZlVGltZVtzdHJdO1xuXG4gICAgcmV0dXJuIChpc0Z1bmN0aW9uKG91dHB1dCkpID9cbiAgICAgIG91dHB1dChudW0sIHdpdGhvdXRTdWZmaXgsIHN0ciwgaXNGdXR1cmUpIDpcbiAgICAgIG91dHB1dC5yZXBsYWNlKC8lZC9pLCBudW0udG9TdHJpbmcoMTApKTtcbiAgfVxuXG4gIHBhc3RGdXR1cmUoZGlmZjogbnVtYmVyLCBvdXRwdXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgZm9ybWF0ID0gdGhpcy5fcmVsYXRpdmVUaW1lW2RpZmYgPiAwID8gJ2Z1dHVyZScgOiAncGFzdCddO1xuXG4gICAgcmV0dXJuIGlzRnVuY3Rpb24oZm9ybWF0KSA/IGZvcm1hdChvdXRwdXQpIDogZm9ybWF0LnJlcGxhY2UoLyVzL2ksIG91dHB1dCk7XG4gIH1cblxuICAvKiogTW9udGhzICovXG4gIG1vbnRocygpOiBzdHJpbmdbXTtcbiAgbW9udGhzKGRhdGU6IERhdGUsIGZvcm1hdD86IHN0cmluZywgaXNVVEM/OiBib29sZWFuKTogc3RyaW5nO1xuICBtb250aHMoZGF0ZT86IERhdGUsIGZvcm1hdD86IHN0cmluZywgaXNVVEMgPSBmYWxzZSk6IHN0cmluZyB8IHN0cmluZ1tdIHtcbiAgICBpZiAoIWRhdGUpIHtcbiAgICAgIHJldHVybiBpc0FycmF5PHN0cmluZz4odGhpcy5fbW9udGhzKVxuICAgICAgICA/IHRoaXMuX21vbnRoc1xuICAgICAgICA6IHRoaXMuX21vbnRocy5zdGFuZGFsb25lO1xuICAgIH1cblxuICAgIGlmIChpc0FycmF5PHN0cmluZz4odGhpcy5fbW9udGhzKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX21vbnRoc1tnZXRNb250aChkYXRlLCBpc1VUQyldO1xuICAgIH1cblxuICAgIGNvbnN0IGtleSA9ICh0aGlzLl9tb250aHMuaXNGb3JtYXQgfHwgTU9OVEhTX0lOX0ZPUk1BVCkudGVzdChmb3JtYXQpXG4gICAgICA/ICdmb3JtYXQnXG4gICAgICA6ICdzdGFuZGFsb25lJztcblxuICAgIHJldHVybiB0aGlzLl9tb250aHNba2V5XVtnZXRNb250aChkYXRlLCBpc1VUQyldO1xuICB9XG5cbiAgbW9udGhzU2hvcnQoKTogc3RyaW5nW107XG4gIG1vbnRoc1Nob3J0KGRhdGU/OiBEYXRlLCBmb3JtYXQ/OiBzdHJpbmcsIGlzVVRDPzogYm9vbGVhbik6IHN0cmluZztcbiAgbW9udGhzU2hvcnQoZGF0ZT86IERhdGUsIGZvcm1hdD86IHN0cmluZywgaXNVVEMgPSBmYWxzZSk6IHN0cmluZyB8IHN0cmluZ1tdIHtcbiAgICBpZiAoIWRhdGUpIHtcbiAgICAgIHJldHVybiBpc0FycmF5PHN0cmluZz4odGhpcy5fbW9udGhzU2hvcnQpXG4gICAgICAgID8gdGhpcy5fbW9udGhzU2hvcnRcbiAgICAgICAgOiB0aGlzLl9tb250aHNTaG9ydC5zdGFuZGFsb25lO1xuICAgIH1cblxuICAgIGlmIChpc0FycmF5PHN0cmluZz4odGhpcy5fbW9udGhzU2hvcnQpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbW9udGhzU2hvcnRbZ2V0TW9udGgoZGF0ZSwgaXNVVEMpXTtcbiAgICB9XG4gICAgY29uc3Qga2V5ID0gTU9OVEhTX0lOX0ZPUk1BVC50ZXN0KGZvcm1hdCkgPyAnZm9ybWF0JyA6ICdzdGFuZGFsb25lJztcblxuICAgIHJldHVybiB0aGlzLl9tb250aHNTaG9ydFtrZXldW2dldE1vbnRoKGRhdGUsIGlzVVRDKV07XG4gIH1cblxuICBtb250aHNQYXJzZShtb250aE5hbWU6IHN0cmluZywgZm9ybWF0Pzogc3RyaW5nLCBzdHJpY3Q/OiBib29sZWFuKTogbnVtYmVyIHtcbiAgICBsZXQgZGF0ZTtcbiAgICBsZXQgcmVnZXg7XG5cbiAgICBpZiAodGhpcy5fbW9udGhzUGFyc2VFeGFjdCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlTW9udGhTdHJpY3RQYXJzZShtb250aE5hbWUsIGZvcm1hdCwgc3RyaWN0KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX21vbnRoc1BhcnNlKSB7XG4gICAgICB0aGlzLl9tb250aHNQYXJzZSA9IFtdO1xuICAgICAgdGhpcy5fbG9uZ01vbnRoc1BhcnNlID0gW107XG4gICAgICB0aGlzLl9zaG9ydE1vbnRoc1BhcnNlID0gW107XG4gICAgfVxuXG4gICAgLy8gVE9ETzogYWRkIHNvcnRpbmdcbiAgICAvLyBTb3J0aW5nIG1ha2VzIHN1cmUgaWYgb25lIG1vbnRoIChvciBhYmJyKSBpcyBhIHByZWZpeCBvZiBhbm90aGVyXG4gICAgLy8gc2VlIHNvcnRpbmcgaW4gY29tcHV0ZU1vbnRoc1BhcnNlXG4gICAgbGV0IGk7XG4gICAgZm9yIChpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICAgIC8vIG1ha2UgdGhlIHJlZ2V4IGlmIHdlIGRvbid0IGhhdmUgaXQgYWxyZWFkeVxuICAgICAgZGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDKDIwMDAsIGkpKTtcbiAgICAgIGlmIChzdHJpY3QgJiYgIXRoaXMuX2xvbmdNb250aHNQYXJzZVtpXSkge1xuICAgICAgICBjb25zdCBfbW9udGhzID0gdGhpcy5tb250aHMoZGF0ZSwgJycsIHRydWUpLnJlcGxhY2UoJy4nLCAnJyk7XG4gICAgICAgIGNvbnN0IF9zaG9ydE1vbnRocyA9IHRoaXMubW9udGhzU2hvcnQoZGF0ZSwgJycsIHRydWUpLnJlcGxhY2UoJy4nLCAnJyk7XG4gICAgICAgIHRoaXMuX2xvbmdNb250aHNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoYF4ke19tb250aHN9JGAsICdpJyk7XG4gICAgICAgIHRoaXMuX3Nob3J0TW9udGhzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKGBeJHtfc2hvcnRNb250aHN9JGAsICdpJyk7XG4gICAgICB9XG4gICAgICBpZiAoIXN0cmljdCAmJiAhdGhpcy5fbW9udGhzUGFyc2VbaV0pIHtcbiAgICAgICAgcmVnZXggPSBgXiR7dGhpcy5tb250aHMoZGF0ZSwgJycsIHRydWUpfXxeJHt0aGlzLm1vbnRoc1Nob3J0KGRhdGUsICcnLCB0cnVlKX1gO1xuICAgICAgICB0aGlzLl9tb250aHNQYXJzZVtpXSA9IG5ldyBSZWdFeHAocmVnZXgucmVwbGFjZSgnLicsICcnKSwgJ2knKTtcbiAgICAgIH1cbiAgICAgIC8vIHRlc3QgdGhlIHJlZ2V4XG4gICAgICBpZiAoc3RyaWN0ICYmIGZvcm1hdCA9PT0gJ01NTU0nICYmICh0aGlzLl9sb25nTW9udGhzUGFyc2VbaV0gYXMgUmVnRXhwKS50ZXN0KG1vbnRoTmFtZSkpIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdHJpY3QgJiYgZm9ybWF0ID09PSAnTU1NJyAmJiAodGhpcy5fc2hvcnRNb250aHNQYXJzZVtpXSBhcyBSZWdFeHApLnRlc3QobW9udGhOYW1lKSkge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFzdHJpY3QgJiYgdGhpcy5fbW9udGhzUGFyc2VbaV0udGVzdChtb250aE5hbWUpKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG1vbnRoc1JlZ2V4KGlzU3RyaWN0OiBib29sZWFuKTogUmVnRXhwIHtcbiAgICBpZiAodGhpcy5fbW9udGhzUGFyc2VFeGFjdCkge1xuICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfbW9udGhzUmVnZXgnKSkge1xuICAgICAgICB0aGlzLmNvbXB1dGVNb250aHNQYXJzZSgpO1xuICAgICAgfVxuICAgICAgaWYgKGlzU3RyaWN0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tb250aHNTdHJpY3RSZWdleDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuX21vbnRoc1JlZ2V4O1xuICAgIH1cblxuICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX21vbnRoc1JlZ2V4JykpIHtcbiAgICAgIHRoaXMuX21vbnRoc1JlZ2V4ID0gZGVmYXVsdE1vbnRoc1JlZ2V4O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9tb250aHNTdHJpY3RSZWdleCAmJiBpc1N0cmljdCA/XG4gICAgICB0aGlzLl9tb250aHNTdHJpY3RSZWdleCA6IHRoaXMuX21vbnRoc1JlZ2V4O1xuICB9XG5cbiAgbW9udGhzU2hvcnRSZWdleChpc1N0cmljdDogYm9vbGVhbik6IFJlZ0V4cCB7XG4gICAgaWYgKHRoaXMuX21vbnRoc1BhcnNlRXhhY3QpIHtcbiAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX21vbnRoc1JlZ2V4JykpIHtcbiAgICAgICAgdGhpcy5jb21wdXRlTW9udGhzUGFyc2UoKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc1N0cmljdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU2hvcnRTdHJpY3RSZWdleDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuX21vbnRoc1Nob3J0UmVnZXg7XG4gICAgfVxuICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX21vbnRoc1Nob3J0UmVnZXgnKSkge1xuICAgICAgdGhpcy5fbW9udGhzU2hvcnRSZWdleCA9IGRlZmF1bHRNb250aHNTaG9ydFJlZ2V4O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9tb250aHNTaG9ydFN0cmljdFJlZ2V4ICYmIGlzU3RyaWN0ID9cbiAgICAgIHRoaXMuX21vbnRoc1Nob3J0U3RyaWN0UmVnZXggOiB0aGlzLl9tb250aHNTaG9ydFJlZ2V4O1xuICB9XG5cbiAgLyoqIFdlZWsgKi9cbiAgd2VlayhkYXRlOiBEYXRlLCBpc1VUQz86IGJvb2xlYW4pOiBudW1iZXIge1xuICAgIHJldHVybiB3ZWVrT2ZZZWFyKGRhdGUsIHRoaXMuX3dlZWsuZG93LCB0aGlzLl93ZWVrLmRveSwgaXNVVEMpLndlZWs7XG4gIH1cblxuICBmaXJzdERheU9mV2VlaygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl93ZWVrLmRvdztcbiAgfVxuXG4gIGZpcnN0RGF5T2ZZZWFyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3dlZWsuZG95O1xuICB9XG5cbiAgLyoqIERheSBvZiBXZWVrICovXG4gIHdlZWtkYXlzKCk6IHN0cmluZ1tdO1xuICB3ZWVrZGF5cyhkYXRlOiBEYXRlLCBmb3JtYXQ/OiBzdHJpbmcsIGlzVVRDPzogYm9vbGVhbik6IHN0cmluZztcbiAgd2Vla2RheXMoZGF0ZT86IERhdGUsIGZvcm1hdD86IHN0cmluZywgaXNVVEM/OiBib29sZWFuKTogc3RyaW5nIHwgc3RyaW5nW10ge1xuICAgIGlmICghZGF0ZSkge1xuICAgICAgcmV0dXJuIGlzQXJyYXk8c3RyaW5nPih0aGlzLl93ZWVrZGF5cylcbiAgICAgICAgPyB0aGlzLl93ZWVrZGF5c1xuICAgICAgICA6IHRoaXMuX3dlZWtkYXlzLnN0YW5kYWxvbmU7XG4gICAgfVxuXG4gICAgaWYgKGlzQXJyYXk8c3RyaW5nPih0aGlzLl93ZWVrZGF5cykpIHtcbiAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1tnZXREYXkoZGF0ZSwgaXNVVEMpXTtcbiAgICB9XG5cbiAgICBjb25zdCBfa2V5ID0gdGhpcy5fd2Vla2RheXMuaXNGb3JtYXQudGVzdChmb3JtYXQpXG4gICAgICA/ICdmb3JtYXQnXG4gICAgICA6ICdzdGFuZGFsb25lJztcblxuICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1tfa2V5XVtnZXREYXkoZGF0ZSwgaXNVVEMpXTtcbiAgfVxuXG4gIHdlZWtkYXlzTWluKCk6IHN0cmluZ1tdO1xuICB3ZWVrZGF5c01pbihkYXRlOiBEYXRlLCBmb3JtYXQ/OiBzdHJpbmcsIGlzVVRDPzogYm9vbGVhbik6IHN0cmluZztcbiAgd2Vla2RheXNNaW4oZGF0ZT86IERhdGUsIGZvcm1hdD86IHN0cmluZywgaXNVVEM/OiBib29sZWFuKTogc3RyaW5nIHwgc3RyaW5nW10ge1xuICAgIHJldHVybiBkYXRlID8gdGhpcy5fd2Vla2RheXNNaW5bZ2V0RGF5KGRhdGUsIGlzVVRDKV0gOiB0aGlzLl93ZWVrZGF5c01pbjtcbiAgfVxuXG4gIHdlZWtkYXlzU2hvcnQoKTogc3RyaW5nW107XG4gIHdlZWtkYXlzU2hvcnQoZGF0ZTogRGF0ZSwgZm9ybWF0Pzogc3RyaW5nLCBpc1VUQz86IGJvb2xlYW4pOiBzdHJpbmc7XG4gIHdlZWtkYXlzU2hvcnQoZGF0ZT86IERhdGUsIGZvcm1hdD86IHN0cmluZywgaXNVVEM/OiBib29sZWFuKTogc3RyaW5nIHwgc3RyaW5nW10ge1xuICAgIHJldHVybiBkYXRlID8gdGhpcy5fd2Vla2RheXNTaG9ydFtnZXREYXkoZGF0ZSwgaXNVVEMpXSA6IHRoaXMuX3dlZWtkYXlzU2hvcnQ7XG4gIH1cblxuXG4gIC8vIHByb3RvLndlZWtkYXlzUGFyc2UgID0gICAgICAgIGxvY2FsZVdlZWtkYXlzUGFyc2U7XG4gIHdlZWtkYXlzUGFyc2Uod2Vla2RheU5hbWU/OiBzdHJpbmcsIGZvcm1hdD86IHN0cmluZywgc3RyaWN0PzogYm9vbGVhbik6IG51bWJlciB7XG4gICAgbGV0IGk7XG4gICAgbGV0IHJlZ2V4O1xuXG4gICAgaWYgKHRoaXMuX3dlZWtkYXlzUGFyc2VFeGFjdCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlV2Vla1N0cmljdFBhcnNlKHdlZWtkYXlOYW1lLCBmb3JtYXQsIHN0cmljdCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl93ZWVrZGF5c1BhcnNlKSB7XG4gICAgICB0aGlzLl93ZWVrZGF5c1BhcnNlID0gW107XG4gICAgICB0aGlzLl9taW5XZWVrZGF5c1BhcnNlID0gW107XG4gICAgICB0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UgPSBbXTtcbiAgICAgIHRoaXMuX2Z1bGxXZWVrZGF5c1BhcnNlID0gW107XG4gICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XG4gICAgICAvLyBmaXg6IGhlcmUgaXMgdGhlIGlzc3VlXG4gICAgICBjb25zdCBkYXRlID0gc2V0RGF5T2ZXZWVrKG5ldyBEYXRlKERhdGUuVVRDKDIwMDAsIDEpKSwgaSwgbnVsbCwgdHJ1ZSk7XG4gICAgICBpZiAoc3RyaWN0ICYmICF0aGlzLl9mdWxsV2Vla2RheXNQYXJzZVtpXSkge1xuICAgICAgICB0aGlzLl9mdWxsV2Vla2RheXNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoYF4ke3RoaXMud2Vla2RheXMoZGF0ZSwgJycsIHRydWUpLnJlcGxhY2UoJy4nLCAnXFwuPycpfSRgLCAnaScpO1xuICAgICAgICB0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKGBeJHt0aGlzLndlZWtkYXlzU2hvcnQoZGF0ZSwgJycsIHRydWUpLnJlcGxhY2UoJy4nLCAnXFwuPycpfSRgLCAnaScpO1xuICAgICAgICB0aGlzLl9taW5XZWVrZGF5c1BhcnNlW2ldID0gbmV3IFJlZ0V4cChgXiR7dGhpcy53ZWVrZGF5c01pbihkYXRlLCAnJywgdHJ1ZSkucmVwbGFjZSgnLicsICdcXC4/Jyl9JGAsICdpJyk7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuX3dlZWtkYXlzUGFyc2VbaV0pIHtcbiAgICAgICAgcmVnZXggPSBgXiR7dGhpcy53ZWVrZGF5cyhkYXRlLCAnJywgdHJ1ZSl9fF4ke3RoaXMud2Vla2RheXNTaG9ydChkYXRlLCAnJywgdHJ1ZSl9fF4ke3RoaXMud2Vla2RheXNNaW4oZGF0ZSwgJycsIHRydWUpfWA7XG4gICAgICAgIHRoaXMuX3dlZWtkYXlzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKHJlZ2V4LnJlcGxhY2UoJy4nLCAnJyksICdpJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNBcnJheTxSZWdFeHA+KHRoaXMuX2Z1bGxXZWVrZGF5c1BhcnNlKVxuICAgICAgICB8fCAhaXNBcnJheTxSZWdFeHA+KHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSlcbiAgICAgICAgfHwgIWlzQXJyYXk8UmVnRXhwPih0aGlzLl9taW5XZWVrZGF5c1BhcnNlKVxuICAgICAgICB8fCAhaXNBcnJheTxSZWdFeHA+KHRoaXMuX3dlZWtkYXlzUGFyc2UpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gdGVzdCB0aGUgcmVnZXhcbiAgICAgIGlmIChzdHJpY3QgJiYgZm9ybWF0ID09PSAnZGRkZCcgJiYgdGhpcy5fZnVsbFdlZWtkYXlzUGFyc2VbaV0udGVzdCh3ZWVrZGF5TmFtZSkpIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9IGVsc2UgaWYgKHN0cmljdCAmJiBmb3JtYXQgPT09ICdkZGQnICYmIHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZVtpXS50ZXN0KHdlZWtkYXlOYW1lKSkge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH0gZWxzZSBpZiAoc3RyaWN0ICYmIGZvcm1hdCA9PT0gJ2RkJyAmJiB0aGlzLl9taW5XZWVrZGF5c1BhcnNlW2ldLnRlc3Qod2Vla2RheU5hbWUpKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfSBlbHNlIGlmICghc3RyaWN0ICYmIHRoaXMuX3dlZWtkYXlzUGFyc2VbaV0udGVzdCh3ZWVrZGF5TmFtZSkpIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gcHJvdG8ud2Vla2RheXNSZWdleCAgICAgICA9ICAgICAgICB3ZWVrZGF5c1JlZ2V4O1xuICB3ZWVrZGF5c1JlZ2V4KGlzU3RyaWN0OiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuX3dlZWtkYXlzUGFyc2VFeGFjdCkge1xuICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfd2Vla2RheXNSZWdleCcpKSB7XG4gICAgICAgIHRoaXMuY29tcHV0ZVdlZWtkYXlzUGFyc2UoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzU3RyaWN0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1N0cmljdFJlZ2V4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzUmVnZXg7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX3dlZWtkYXlzUmVnZXgnKSkge1xuICAgICAgICB0aGlzLl93ZWVrZGF5c1JlZ2V4ID0gbWF0Y2hXb3JkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNTdHJpY3RSZWdleCAmJiBpc1N0cmljdCA/XG4gICAgICAgIHRoaXMuX3dlZWtkYXlzU3RyaWN0UmVnZXggOiB0aGlzLl93ZWVrZGF5c1JlZ2V4O1xuICAgIH1cbiAgfVxuXG4gIC8vIHByb3RvLndlZWtkYXlzU2hvcnRSZWdleCAgPSAgICAgICAgd2Vla2RheXNTaG9ydFJlZ2V4O1xuICAvLyBwcm90by53ZWVrZGF5c01pblJlZ2V4ICAgID0gICAgICAgIHdlZWtkYXlzTWluUmVnZXg7XG5cblxuICB3ZWVrZGF5c1Nob3J0UmVnZXgoaXNTdHJpY3Q/OiBib29sZWFuKTogUmVnRXhwIHtcbiAgICBpZiAodGhpcy5fd2Vla2RheXNQYXJzZUV4YWN0KSB7XG4gICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ193ZWVrZGF5c1JlZ2V4JykpIHtcbiAgICAgICAgdGhpcy5jb21wdXRlV2Vla2RheXNQYXJzZSgpO1xuICAgICAgfVxuICAgICAgaWYgKGlzU3RyaWN0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1Nob3J0U3RyaWN0UmVnZXg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNTaG9ydFJlZ2V4O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ193ZWVrZGF5c1Nob3J0UmVnZXgnKSkge1xuICAgICAgICB0aGlzLl93ZWVrZGF5c1Nob3J0UmVnZXggPSBtYXRjaFdvcmQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1Nob3J0U3RyaWN0UmVnZXggJiYgaXNTdHJpY3QgP1xuICAgICAgICB0aGlzLl93ZWVrZGF5c1Nob3J0U3RyaWN0UmVnZXggOiB0aGlzLl93ZWVrZGF5c1Nob3J0UmVnZXg7XG4gICAgfVxuICB9XG5cbiAgd2Vla2RheXNNaW5SZWdleChpc1N0cmljdD86IGJvb2xlYW4pOiBSZWdFeHAge1xuICAgIGlmICh0aGlzLl93ZWVrZGF5c1BhcnNlRXhhY3QpIHtcbiAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX3dlZWtkYXlzUmVnZXgnKSkge1xuICAgICAgICB0aGlzLmNvbXB1dGVXZWVrZGF5c1BhcnNlKCk7XG4gICAgICB9XG4gICAgICBpZiAoaXNTdHJpY3QpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzTWluU3RyaWN0UmVnZXg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNNaW5SZWdleDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfd2Vla2RheXNNaW5SZWdleCcpKSB7XG4gICAgICAgIHRoaXMuX3dlZWtkYXlzTWluUmVnZXggPSBtYXRjaFdvcmQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c01pblN0cmljdFJlZ2V4ICYmIGlzU3RyaWN0ID9cbiAgICAgICAgdGhpcy5fd2Vla2RheXNNaW5TdHJpY3RSZWdleCA6IHRoaXMuX3dlZWtkYXlzTWluUmVnZXg7XG4gICAgfVxuICB9XG5cbiAgaXNQTShpbnB1dDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgLy8gSUU4IFF1aXJrcyBNb2RlICYgSUU3IFN0YW5kYXJkcyBNb2RlIGRvIG5vdCBhbGxvdyBhY2Nlc3Npbmcgc3RyaW5ncyBsaWtlIGFycmF5c1xuICAgIC8vIFVzaW5nIGNoYXJBdCBzaG91bGQgYmUgbW9yZSBjb21wYXRpYmxlLlxuICAgIHJldHVybiBpbnB1dC50b0xvd2VyQ2FzZSgpLmNoYXJBdCgwKSA9PT0gJ3AnO1xuICB9XG5cbiAgbWVyaWRpZW0oaG91cnM6IG51bWJlciwgbWludXRlczogbnVtYmVyLCBpc0xvd2VyOiBib29sZWFuKTogc3RyaW5nIHtcbiAgICBpZiAoaG91cnMgPiAxMSkge1xuICAgICAgcmV0dXJuIGlzTG93ZXIgPyAncG0nIDogJ1BNJztcbiAgICB9XG5cbiAgICByZXR1cm4gaXNMb3dlciA/ICdhbScgOiAnQU0nO1xuICB9XG5cbiAgZm9ybWF0TG9uZ0RhdGUoa2V5OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9sb25nRGF0ZUZvcm1hdCA9IHRoaXMuX2xvbmdEYXRlRm9ybWF0ID8gdGhpcy5fbG9uZ0RhdGVGb3JtYXQgOiBkZWZhdWx0TG9uZ0RhdGVGb3JtYXQ7XG4gICAgY29uc3QgZm9ybWF0ID0gdGhpcy5fbG9uZ0RhdGVGb3JtYXRba2V5XTtcbiAgICBjb25zdCBmb3JtYXRVcHBlciA9IHRoaXMuX2xvbmdEYXRlRm9ybWF0W2tleS50b1VwcGVyQ2FzZSgpXTtcblxuICAgIGlmIChmb3JtYXQgfHwgIWZvcm1hdFVwcGVyKSB7XG4gICAgICByZXR1cm4gZm9ybWF0O1xuICAgIH1cblxuICAgIHRoaXMuX2xvbmdEYXRlRm9ybWF0W1xuICAgICAga2V5XG4gICAgICBdID0gZm9ybWF0VXBwZXIucmVwbGFjZSgvTU1NTXxNTXxERHxkZGRkL2csICh2YWw6IHN0cmluZykgPT4ge1xuICAgICAgcmV0dXJuIHZhbC5zbGljZSgxKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXldO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVNb250aFN0cmljdFBhcnNlKG1vbnRoTmFtZTogc3RyaW5nLCBmb3JtYXQ6IHN0cmluZywgc3RyaWN0PzogYm9vbGVhbikge1xuICAgIGNvbnN0IGxsYyA9IG1vbnRoTmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgIGxldCBpO1xuICAgIGxldCBpaTtcbiAgICBsZXQgbW9tO1xuICAgIGlmICghdGhpcy5fbW9udGhzUGFyc2UpIHtcbiAgICAgIC8vIHRoaXMgaXMgbm90IHVzZWRcbiAgICAgIHRoaXMuX21vbnRoc1BhcnNlID0gW107XG4gICAgICB0aGlzLl9sb25nTW9udGhzUGFyc2UgPSBbXTtcbiAgICAgIHRoaXMuX3Nob3J0TW9udGhzUGFyc2UgPSBbXTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgKytpKSB7XG4gICAgICAgIG1vbSA9IG5ldyBEYXRlKDIwMDAsIGkpO1xuICAgICAgICB0aGlzLl9zaG9ydE1vbnRoc1BhcnNlW2ldID0gdGhpcy5tb250aHNTaG9ydChtb20sICcnKS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICB0aGlzLl9sb25nTW9udGhzUGFyc2VbaV0gPSB0aGlzLm1vbnRocyhtb20sICcnKS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdHJpY3QpIHtcbiAgICAgIGlmIChmb3JtYXQgPT09ICdNTU0nKSB7XG4gICAgICAgIGlpID0gKHRoaXMuX3Nob3J0TW9udGhzUGFyc2UgYXMgc3RyaW5nW10pLmluZGV4T2YobGxjKTtcblxuICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgfVxuICAgICAgaWkgPSAodGhpcy5fbG9uZ01vbnRoc1BhcnNlIGFzIHN0cmluZ1tdKS5pbmRleE9mKGxsYyk7XG5cbiAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKGZvcm1hdCA9PT0gJ01NTScpIHtcbiAgICAgIGlpID0gKHRoaXMuX3Nob3J0TW9udGhzUGFyc2UgYXMgc3RyaW5nW10pLmluZGV4T2YobGxjKTtcbiAgICAgIGlmIChpaSAhPT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgfVxuXG4gICAgICBpaSA9ICh0aGlzLl9sb25nTW9udGhzUGFyc2UgYXMgc3RyaW5nW10pLmluZGV4T2YobGxjKTtcblxuICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICB9XG5cbiAgICBpaSA9ICh0aGlzLl9sb25nTW9udGhzUGFyc2UgYXMgc3RyaW5nW10pLmluZGV4T2YobGxjKTtcbiAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICByZXR1cm4gaWk7XG4gICAgfVxuICAgIGlpID0gKHRoaXMuX3Nob3J0TW9udGhzUGFyc2UgYXMgc3RyaW5nW10pLmluZGV4T2YobGxjKTtcblxuICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZVdlZWtTdHJpY3RQYXJzZSh3ZWVrZGF5TmFtZTogc3RyaW5nLCBmb3JtYXQ6IHN0cmluZywgc3RyaWN0OiBib29sZWFuKTogbnVtYmVyIHtcbiAgICBsZXQgaWk7XG4gICAgY29uc3QgbGxjID0gd2Vla2RheU5hbWUudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICBpZiAoIXRoaXMuX3dlZWtkYXlzUGFyc2UpIHtcbiAgICAgIHRoaXMuX3dlZWtkYXlzUGFyc2UgPSBbXTtcbiAgICAgIHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSA9IFtdO1xuICAgICAgdGhpcy5fbWluV2Vla2RheXNQYXJzZSA9IFtdO1xuXG4gICAgICBsZXQgaTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCA3OyArK2kpIHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IHNldERheU9mV2VlayhuZXcgRGF0ZShEYXRlLlVUQygyMDAwLCAxKSksIGksIG51bGwsIHRydWUpO1xuICAgICAgICB0aGlzLl9taW5XZWVrZGF5c1BhcnNlW2ldID0gdGhpcy53ZWVrZGF5c01pbihkYXRlKS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICB0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2VbaV0gPSB0aGlzLndlZWtkYXlzU2hvcnQoZGF0ZSkudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgdGhpcy5fd2Vla2RheXNQYXJzZVtpXSA9IHRoaXMud2Vla2RheXMoZGF0ZSwgJycpLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFpc0FycmF5PHN0cmluZz4odGhpcy5fd2Vla2RheXNQYXJzZSlcbiAgICAgIHx8ICFpc0FycmF5PHN0cmluZz4odGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlKVxuICAgICAgfHwgIWlzQXJyYXk8c3RyaW5nPih0aGlzLl9taW5XZWVrZGF5c1BhcnNlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChzdHJpY3QpIHtcbiAgICAgIGlmIChmb3JtYXQgPT09ICdkZGRkJykge1xuICAgICAgICBpaSA9IHRoaXMuX3dlZWtkYXlzUGFyc2UuaW5kZXhPZihsbGMpO1xuXG4gICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gICAgICB9IGVsc2UgaWYgKGZvcm1hdCA9PT0gJ2RkZCcpIHtcbiAgICAgICAgaWkgPSB0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UuaW5kZXhPZihsbGMpO1xuXG4gICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpaSA9IHRoaXMuX21pbldlZWtkYXlzUGFyc2UuaW5kZXhPZihsbGMpO1xuXG4gICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChmb3JtYXQgPT09ICdkZGRkJykge1xuICAgICAgICBpaSA9IHRoaXMuX3dlZWtkYXlzUGFyc2UuaW5kZXhPZihsbGMpO1xuICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICB9XG4gICAgICAgIGlpID0gdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlLmluZGV4T2YobGxjKTtcbiAgICAgICAgaWYgKGlpICE9PSAtMSkge1xuICAgICAgICAgIHJldHVybiBpaTtcbiAgICAgICAgfVxuICAgICAgICBpaSA9IHRoaXMuX21pbldlZWtkYXlzUGFyc2UuaW5kZXhPZihsbGMpO1xuXG4gICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gICAgICB9IGVsc2UgaWYgKGZvcm1hdCA9PT0gJ2RkZCcpIHtcbiAgICAgICAgaWkgPSB0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UuaW5kZXhPZihsbGMpO1xuICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICB9XG4gICAgICAgIGlpID0gdGhpcy5fd2Vla2RheXNQYXJzZS5pbmRleE9mKGxsYyk7XG4gICAgICAgIGlmIChpaSAhPT0gLTEpIHtcbiAgICAgICAgICByZXR1cm4gaWk7XG4gICAgICAgIH1cbiAgICAgICAgaWkgPSB0aGlzLl9taW5XZWVrZGF5c1BhcnNlLmluZGV4T2YobGxjKTtcblxuICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWkgPSB0aGlzLl9taW5XZWVrZGF5c1BhcnNlLmluZGV4T2YobGxjKTtcbiAgICAgICAgaWYgKGlpICE9PSAtMSkge1xuICAgICAgICAgIHJldHVybiBpaTtcbiAgICAgICAgfVxuICAgICAgICBpaSA9IHRoaXMuX3dlZWtkYXlzUGFyc2UuaW5kZXhPZihsbGMpO1xuICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICB9XG4gICAgICAgIGlpID0gdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlLmluZGV4T2YobGxjKTtcblxuICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY29tcHV0ZU1vbnRoc1BhcnNlKCkge1xuICAgIGNvbnN0IHNob3J0UGllY2VzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IGxvbmdQaWVjZXM6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3QgbWl4ZWRQaWVjZXM6IHN0cmluZ1tdID0gW107XG4gICAgbGV0IGRhdGU7XG5cbiAgICBsZXQgaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XG4gICAgICBkYXRlID0gbmV3IERhdGUoMjAwMCwgaSk7XG4gICAgICBzaG9ydFBpZWNlcy5wdXNoKHRoaXMubW9udGhzU2hvcnQoZGF0ZSwgJycpKTtcbiAgICAgIGxvbmdQaWVjZXMucHVzaCh0aGlzLm1vbnRocyhkYXRlLCAnJykpO1xuICAgICAgbWl4ZWRQaWVjZXMucHVzaCh0aGlzLm1vbnRocyhkYXRlLCAnJykpO1xuICAgICAgbWl4ZWRQaWVjZXMucHVzaCh0aGlzLm1vbnRoc1Nob3J0KGRhdGUsICcnKSk7XG4gICAgfVxuICAgIC8vIFNvcnRpbmcgbWFrZXMgc3VyZSBpZiBvbmUgbW9udGggKG9yIGFiYnIpIGlzIGEgcHJlZml4IG9mIGFub3RoZXIgaXRcbiAgICAvLyB3aWxsIG1hdGNoIHRoZSBsb25nZXIgcGllY2UuXG4gICAgc2hvcnRQaWVjZXMuc29ydChjbXBMZW5SZXYpO1xuICAgIGxvbmdQaWVjZXMuc29ydChjbXBMZW5SZXYpO1xuICAgIG1peGVkUGllY2VzLnNvcnQoY21wTGVuUmV2KTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgc2hvcnRQaWVjZXNbaV0gPSByZWdleEVzY2FwZShzaG9ydFBpZWNlc1tpXSk7XG4gICAgICBsb25nUGllY2VzW2ldID0gcmVnZXhFc2NhcGUobG9uZ1BpZWNlc1tpXSk7XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCAyNDsgaSsrKSB7XG4gICAgICBtaXhlZFBpZWNlc1tpXSA9IHJlZ2V4RXNjYXBlKG1peGVkUGllY2VzW2ldKTtcbiAgICB9XG5cbiAgICB0aGlzLl9tb250aHNSZWdleCA9IG5ldyBSZWdFeHAoYF4oJHttaXhlZFBpZWNlcy5qb2luKCd8Jyl9KWAsICdpJyk7XG4gICAgdGhpcy5fbW9udGhzU2hvcnRSZWdleCA9IHRoaXMuX21vbnRoc1JlZ2V4O1xuICAgIHRoaXMuX21vbnRoc1N0cmljdFJlZ2V4ID0gbmV3IFJlZ0V4cChgXigke2xvbmdQaWVjZXMuam9pbignfCcpfSlgLCAnaScpO1xuICAgIHRoaXMuX21vbnRoc1Nob3J0U3RyaWN0UmVnZXggPSBuZXcgUmVnRXhwKGBeKCR7c2hvcnRQaWVjZXMuam9pbignfCcpfSlgLCAnaScpO1xuICB9XG5cbiAgcHJpdmF0ZSBjb21wdXRlV2Vla2RheXNQYXJzZSgpIHtcbiAgICBjb25zdCBtaW5QaWVjZXMgPSBbXTtcbiAgICBjb25zdCBzaG9ydFBpZWNlcyA9IFtdO1xuICAgIGNvbnN0IGxvbmdQaWVjZXMgPSBbXTtcbiAgICBjb25zdCBtaXhlZFBpZWNlcyA9IFtdO1xuXG4gICAgbGV0IGk7XG4gICAgZm9yIChpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XG4gICAgICAvLyBsZXQgbW9tID0gY3JlYXRlVVRDKFsyMDAwLCAxXSkuZGF5KGkpO1xuICAgICAgY29uc3QgZGF0ZSA9IHNldERheU9mV2VlayhuZXcgRGF0ZShEYXRlLlVUQygyMDAwLCAxKSksIGksIG51bGwsIHRydWUpO1xuICAgICAgY29uc3QgbWlucCA9IHRoaXMud2Vla2RheXNNaW4oZGF0ZSk7XG4gICAgICBjb25zdCBzaG9ydHAgPSB0aGlzLndlZWtkYXlzU2hvcnQoZGF0ZSk7XG4gICAgICBjb25zdCBsb25ncCA9IHRoaXMud2Vla2RheXMoZGF0ZSk7XG4gICAgICBtaW5QaWVjZXMucHVzaChtaW5wKTtcbiAgICAgIHNob3J0UGllY2VzLnB1c2goc2hvcnRwKTtcbiAgICAgIGxvbmdQaWVjZXMucHVzaChsb25ncCk7XG4gICAgICBtaXhlZFBpZWNlcy5wdXNoKG1pbnApO1xuICAgICAgbWl4ZWRQaWVjZXMucHVzaChzaG9ydHApO1xuICAgICAgbWl4ZWRQaWVjZXMucHVzaChsb25ncCk7XG4gICAgfVxuICAgIC8vIFNvcnRpbmcgbWFrZXMgc3VyZSBpZiBvbmUgd2Vla2RheSAob3IgYWJicikgaXMgYSBwcmVmaXggb2YgYW5vdGhlciBpdFxuICAgIC8vIHdpbGwgbWF0Y2ggdGhlIGxvbmdlciBwaWVjZS5cbiAgICBtaW5QaWVjZXMuc29ydChjbXBMZW5SZXYpO1xuICAgIHNob3J0UGllY2VzLnNvcnQoY21wTGVuUmV2KTtcbiAgICBsb25nUGllY2VzLnNvcnQoY21wTGVuUmV2KTtcbiAgICBtaXhlZFBpZWNlcy5zb3J0KGNtcExlblJldik7XG4gICAgZm9yIChpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgc2hvcnRQaWVjZXNbaV0gPSByZWdleEVzY2FwZShzaG9ydFBpZWNlc1tpXSk7XG4gICAgICBsb25nUGllY2VzW2ldID0gcmVnZXhFc2NhcGUobG9uZ1BpZWNlc1tpXSk7XG4gICAgICBtaXhlZFBpZWNlc1tpXSA9IHJlZ2V4RXNjYXBlKG1peGVkUGllY2VzW2ldKTtcbiAgICB9XG5cbiAgICB0aGlzLl93ZWVrZGF5c1JlZ2V4ID0gbmV3IFJlZ0V4cChgXigke21peGVkUGllY2VzLmpvaW4oJ3wnKX0pYCwgJ2knKTtcbiAgICB0aGlzLl93ZWVrZGF5c1Nob3J0UmVnZXggPSB0aGlzLl93ZWVrZGF5c1JlZ2V4O1xuICAgIHRoaXMuX3dlZWtkYXlzTWluUmVnZXggPSB0aGlzLl93ZWVrZGF5c1JlZ2V4O1xuXG4gICAgdGhpcy5fd2Vla2RheXNTdHJpY3RSZWdleCA9IG5ldyBSZWdFeHAoYF4oJHtsb25nUGllY2VzLmpvaW4oJ3wnKX0pYCwgJ2knKTtcbiAgICB0aGlzLl93ZWVrZGF5c1Nob3J0U3RyaWN0UmVnZXggPSBuZXcgUmVnRXhwKGBeKCR7c2hvcnRQaWVjZXMuam9pbignfCcpfSlgLCAnaScpO1xuICAgIHRoaXMuX3dlZWtkYXlzTWluU3RyaWN0UmVnZXggPSBuZXcgUmVnRXhwKGBeKCR7bWluUGllY2VzLmpvaW4oJ3wnKX0pYCwgJ2knKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjbXBMZW5SZXYoYTogc3RyaW5nLCBiOiBzdHJpbmcpOiBudW1iZXIge1xuICByZXR1cm4gYi5sZW5ndGggLSBhLmxlbmd0aDtcbn1cbiJdfQ==