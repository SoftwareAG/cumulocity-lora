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
var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
/** @type {?} */
export var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
/** @type {?} */
export var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
/** @type {?} */
export var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
/** @type {?} */
export var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
/** @type {?} */
export var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
/** @type {?} */
export var defaultLongDateFormat = {
    LTS: 'h:mm:ss A',
    LT: 'h:mm A',
    L: 'MM/DD/YYYY',
    LL: 'MMMM D, YYYY',
    LLL: 'MMMM D, YYYY h:mm A',
    LLLL: 'dddd, MMMM D, YYYY h:mm A'
};
/** @type {?} */
export var defaultOrdinal = '%d';
/** @type {?} */
export var defaultDayOfMonthOrdinalParse = /\d{1,2}/;
/** @type {?} */
var defaultMonthsShortRegex = matchWord;
/** @type {?} */
var defaultMonthsRegex = matchWord;
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
var Locale = /** @class */ (function () {
    function Locale(config) {
        if (!!config) {
            this.set(config);
        }
    }
    /**
     * @param {?} config
     * @return {?}
     */
    Locale.prototype.set = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        /** @type {?} */
        var confKey;
        for (confKey in config) {
            if (!config.hasOwnProperty(confKey)) {
                continue;
            }
            /** @type {?} */
            var prop = config[(/** @type {?} */ (confKey))];
            /** @type {?} */
            var key = (/** @type {?} */ ((isFunction(prop) ? confKey : "_" + confKey)));
            this[key] = (/** @type {?} */ (prop));
        }
        this._config = config;
    };
    /**
     * @param {?} key
     * @param {?} date
     * @param {?} now
     * @return {?}
     */
    Locale.prototype.calendar = /**
     * @param {?} key
     * @param {?} date
     * @param {?} now
     * @return {?}
     */
    function (key, date, now) {
        /** @type {?} */
        var output = this._calendar[key] || this._calendar.sameElse;
        return isFunction(output) ? output.call(null, date, now) : output;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    Locale.prototype.longDateFormat = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var format = this._longDateFormat[key];
        /** @type {?} */
        var formatUpper = this._longDateFormat[key.toUpperCase()];
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
    };
    Object.defineProperty(Locale.prototype, "invalidDate", {
        get: /**
         * @return {?}
         */
        function () {
            return this._invalidDate;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._invalidDate = val;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} num
     * @param {?=} token
     * @return {?}
     */
    Locale.prototype.ordinal = /**
     * @param {?} num
     * @param {?=} token
     * @return {?}
     */
    function (num, token) {
        return this._ordinal.replace('%d', num.toString(10));
    };
    /**
     * @param {?} str
     * @return {?}
     */
    Locale.prototype.preparse = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return str;
    };
    /**
     * @param {?} str
     * @return {?}
     */
    Locale.prototype.postformat = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return str;
    };
    /**
     * @param {?} num
     * @param {?} withoutSuffix
     * @param {?} str
     * @param {?} isFuture
     * @return {?}
     */
    Locale.prototype.relativeTime = /**
     * @param {?} num
     * @param {?} withoutSuffix
     * @param {?} str
     * @param {?} isFuture
     * @return {?}
     */
    function (num, withoutSuffix, str, isFuture) {
        /** @type {?} */
        var output = this._relativeTime[str];
        return (isFunction(output)) ?
            output(num, withoutSuffix, str, isFuture) :
            output.replace(/%d/i, num.toString(10));
    };
    /**
     * @param {?} diff
     * @param {?} output
     * @return {?}
     */
    Locale.prototype.pastFuture = /**
     * @param {?} diff
     * @param {?} output
     * @return {?}
     */
    function (diff, output) {
        /** @type {?} */
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    };
    /**
     * @param {?=} date
     * @param {?=} format
     * @param {?=} isUTC
     * @return {?}
     */
    Locale.prototype.months = /**
     * @param {?=} date
     * @param {?=} format
     * @param {?=} isUTC
     * @return {?}
     */
    function (date, format, isUTC) {
        if (isUTC === void 0) { isUTC = false; }
        if (!date) {
            return isArray(this._months)
                ? this._months
                : this._months.standalone;
        }
        if (isArray(this._months)) {
            return this._months[getMonth(date, isUTC)];
        }
        /** @type {?} */
        var key = (this._months.isFormat || MONTHS_IN_FORMAT).test(format)
            ? 'format'
            : 'standalone';
        return this._months[key][getMonth(date, isUTC)];
    };
    /**
     * @param {?=} date
     * @param {?=} format
     * @param {?=} isUTC
     * @return {?}
     */
    Locale.prototype.monthsShort = /**
     * @param {?=} date
     * @param {?=} format
     * @param {?=} isUTC
     * @return {?}
     */
    function (date, format, isUTC) {
        if (isUTC === void 0) { isUTC = false; }
        if (!date) {
            return isArray(this._monthsShort)
                ? this._monthsShort
                : this._monthsShort.standalone;
        }
        if (isArray(this._monthsShort)) {
            return this._monthsShort[getMonth(date, isUTC)];
        }
        /** @type {?} */
        var key = MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone';
        return this._monthsShort[key][getMonth(date, isUTC)];
    };
    /**
     * @param {?} monthName
     * @param {?=} format
     * @param {?=} strict
     * @return {?}
     */
    Locale.prototype.monthsParse = /**
     * @param {?} monthName
     * @param {?=} format
     * @param {?=} strict
     * @return {?}
     */
    function (monthName, format, strict) {
        /** @type {?} */
        var date;
        /** @type {?} */
        var regex;
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
        var i;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            date = new Date(Date.UTC(2000, i));
            if (strict && !this._longMonthsParse[i]) {
                /** @type {?} */
                var _months = this.months(date, '', true).replace('.', '');
                /** @type {?} */
                var _shortMonths = this.monthsShort(date, '', true).replace('.', '');
                this._longMonthsParse[i] = new RegExp("^" + _months + "$", 'i');
                this._shortMonthsParse[i] = new RegExp("^" + _shortMonths + "$", 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = "^" + this.months(date, '', true) + "|^" + this.monthsShort(date, '', true);
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
    };
    /**
     * @param {?} isStrict
     * @return {?}
     */
    Locale.prototype.monthsRegex = /**
     * @param {?} isStrict
     * @return {?}
     */
    function (isStrict) {
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
    };
    /**
     * @param {?} isStrict
     * @return {?}
     */
    Locale.prototype.monthsShortRegex = /**
     * @param {?} isStrict
     * @return {?}
     */
    function (isStrict) {
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
    };
    /** Week */
    /**
     * Week
     * @param {?} date
     * @param {?=} isUTC
     * @return {?}
     */
    Locale.prototype.week = /**
     * Week
     * @param {?} date
     * @param {?=} isUTC
     * @return {?}
     */
    function (date, isUTC) {
        return weekOfYear(date, this._week.dow, this._week.doy, isUTC).week;
    };
    /**
     * @return {?}
     */
    Locale.prototype.firstDayOfWeek = /**
     * @return {?}
     */
    function () {
        return this._week.dow;
    };
    /**
     * @return {?}
     */
    Locale.prototype.firstDayOfYear = /**
     * @return {?}
     */
    function () {
        return this._week.doy;
    };
    /**
     * @param {?=} date
     * @param {?=} format
     * @param {?=} isUTC
     * @return {?}
     */
    Locale.prototype.weekdays = /**
     * @param {?=} date
     * @param {?=} format
     * @param {?=} isUTC
     * @return {?}
     */
    function (date, format, isUTC) {
        if (!date) {
            return isArray(this._weekdays)
                ? this._weekdays
                : this._weekdays.standalone;
        }
        if (isArray(this._weekdays)) {
            return this._weekdays[getDay(date, isUTC)];
        }
        /** @type {?} */
        var _key = this._weekdays.isFormat.test(format)
            ? 'format'
            : 'standalone';
        return this._weekdays[_key][getDay(date, isUTC)];
    };
    /**
     * @param {?=} date
     * @param {?=} format
     * @param {?=} isUTC
     * @return {?}
     */
    Locale.prototype.weekdaysMin = /**
     * @param {?=} date
     * @param {?=} format
     * @param {?=} isUTC
     * @return {?}
     */
    function (date, format, isUTC) {
        return date ? this._weekdaysMin[getDay(date, isUTC)] : this._weekdaysMin;
    };
    /**
     * @param {?=} date
     * @param {?=} format
     * @param {?=} isUTC
     * @return {?}
     */
    Locale.prototype.weekdaysShort = /**
     * @param {?=} date
     * @param {?=} format
     * @param {?=} isUTC
     * @return {?}
     */
    function (date, format, isUTC) {
        return date ? this._weekdaysShort[getDay(date, isUTC)] : this._weekdaysShort;
    };
    // proto.weekdaysParse  =        localeWeekdaysParse;
    // proto.weekdaysParse  =        localeWeekdaysParse;
    /**
     * @param {?=} weekdayName
     * @param {?=} format
     * @param {?=} strict
     * @return {?}
     */
    Locale.prototype.weekdaysParse = 
    // proto.weekdaysParse  =        localeWeekdaysParse;
    /**
     * @param {?=} weekdayName
     * @param {?=} format
     * @param {?=} strict
     * @return {?}
     */
    function (weekdayName, format, strict) {
        /** @type {?} */
        var i;
        /** @type {?} */
        var regex;
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
            var date = setDayOfWeek(new Date(Date.UTC(2000, 1)), i, null, true);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp("^" + this.weekdays(date, '', true).replace('.', '\.?') + "$", 'i');
                this._shortWeekdaysParse[i] = new RegExp("^" + this.weekdaysShort(date, '', true).replace('.', '\.?') + "$", 'i');
                this._minWeekdaysParse[i] = new RegExp("^" + this.weekdaysMin(date, '', true).replace('.', '\.?') + "$", 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = "^" + this.weekdays(date, '', true) + "|^" + this.weekdaysShort(date, '', true) + "|^" + this.weekdaysMin(date, '', true);
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
    };
    // proto.weekdaysRegex       =        weekdaysRegex;
    // proto.weekdaysRegex       =        weekdaysRegex;
    /**
     * @param {?} isStrict
     * @return {?}
     */
    Locale.prototype.weekdaysRegex = 
    // proto.weekdaysRegex       =        weekdaysRegex;
    /**
     * @param {?} isStrict
     * @return {?}
     */
    function (isStrict) {
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
    };
    // proto.weekdaysShortRegex  =        weekdaysShortRegex;
    // proto.weekdaysMinRegex    =        weekdaysMinRegex;
    // proto.weekdaysShortRegex  =        weekdaysShortRegex;
    // proto.weekdaysMinRegex    =        weekdaysMinRegex;
    /**
     * @param {?=} isStrict
     * @return {?}
     */
    Locale.prototype.weekdaysShortRegex = 
    // proto.weekdaysShortRegex  =        weekdaysShortRegex;
    // proto.weekdaysMinRegex    =        weekdaysMinRegex;
    /**
     * @param {?=} isStrict
     * @return {?}
     */
    function (isStrict) {
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
    };
    /**
     * @param {?=} isStrict
     * @return {?}
     */
    Locale.prototype.weekdaysMinRegex = /**
     * @param {?=} isStrict
     * @return {?}
     */
    function (isStrict) {
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
    };
    /**
     * @param {?} input
     * @return {?}
     */
    Locale.prototype.isPM = /**
     * @param {?} input
     * @return {?}
     */
    function (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return input.toLowerCase().charAt(0) === 'p';
    };
    /**
     * @param {?} hours
     * @param {?} minutes
     * @param {?} isLower
     * @return {?}
     */
    Locale.prototype.meridiem = /**
     * @param {?} hours
     * @param {?} minutes
     * @param {?} isLower
     * @return {?}
     */
    function (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        }
        return isLower ? 'am' : 'AM';
    };
    /**
     * @param {?} key
     * @return {?}
     */
    Locale.prototype.formatLongDate = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        this._longDateFormat = this._longDateFormat ? this._longDateFormat : defaultLongDateFormat;
        /** @type {?} */
        var format = this._longDateFormat[key];
        /** @type {?} */
        var formatUpper = this._longDateFormat[key.toUpperCase()];
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
    };
    /**
     * @private
     * @param {?} monthName
     * @param {?} format
     * @param {?=} strict
     * @return {?}
     */
    Locale.prototype.handleMonthStrictParse = /**
     * @private
     * @param {?} monthName
     * @param {?} format
     * @param {?=} strict
     * @return {?}
     */
    function (monthName, format, strict) {
        /** @type {?} */
        var llc = monthName.toLocaleLowerCase();
        /** @type {?} */
        var i;
        /** @type {?} */
        var ii;
        /** @type {?} */
        var mom;
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
    };
    /**
     * @private
     * @param {?} weekdayName
     * @param {?} format
     * @param {?} strict
     * @return {?}
     */
    Locale.prototype.handleWeekStrictParse = /**
     * @private
     * @param {?} weekdayName
     * @param {?} format
     * @param {?} strict
     * @return {?}
     */
    function (weekdayName, format, strict) {
        /** @type {?} */
        var ii;
        /** @type {?} */
        var llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];
            /** @type {?} */
            var i = void 0;
            for (i = 0; i < 7; ++i) {
                /** @type {?} */
                var date = setDayOfWeek(new Date(Date.UTC(2000, 1)), i, null, true);
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
    };
    /**
     * @private
     * @return {?}
     */
    Locale.prototype.computeMonthsParse = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var shortPieces = [];
        /** @type {?} */
        var longPieces = [];
        /** @type {?} */
        var mixedPieces = [];
        /** @type {?} */
        var date;
        /** @type {?} */
        var i;
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
        this._monthsRegex = new RegExp("^(" + mixedPieces.join('|') + ")", 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp("^(" + longPieces.join('|') + ")", 'i');
        this._monthsShortStrictRegex = new RegExp("^(" + shortPieces.join('|') + ")", 'i');
    };
    /**
     * @private
     * @return {?}
     */
    Locale.prototype.computeWeekdaysParse = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var minPieces = [];
        /** @type {?} */
        var shortPieces = [];
        /** @type {?} */
        var longPieces = [];
        /** @type {?} */
        var mixedPieces = [];
        /** @type {?} */
        var i;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            // let mom = createUTC([2000, 1]).day(i);
            /** @type {?} */
            var date = setDayOfWeek(new Date(Date.UTC(2000, 1)), i, null, true);
            /** @type {?} */
            var minp = this.weekdaysMin(date);
            /** @type {?} */
            var shortp = this.weekdaysShort(date);
            /** @type {?} */
            var longp = this.weekdays(date);
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
        this._weekdaysRegex = new RegExp("^(" + mixedPieces.join('|') + ")", 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;
        this._weekdaysStrictRegex = new RegExp("^(" + longPieces.join('|') + ")", 'i');
        this._weekdaysShortStrictRegex = new RegExp("^(" + shortPieces.join('|') + ")", 'i');
        this._weekdaysMinStrictRegex = new RegExp("^(" + minPieces.join('|') + ")", 'i');
    };
    return Locale;
}());
export { Locale };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlLmNsYXNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWJvb3RzdHJhcC9jaHJvbm9zLyIsInNvdXJjZXMiOlsibG9jYWxlL2xvY2FsZS5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7O0FBRXBELHlDQUlDOzs7SUFIQyxxQ0FBaUI7O0lBQ2pCLHlDQUFxQjs7SUFDckIsdUNBQWtCOzs7SUFLZCxnQkFBZ0IsR0FBRywrQkFBK0I7O0FBQ3hELE1BQU0sS0FBTyxtQkFBbUIsR0FBRyx1RkFBdUYsQ0FBQyxLQUFLLENBQzlILEdBQUcsQ0FDSjs7QUFDRCxNQUFNLEtBQU8sd0JBQXdCLEdBQUcsaURBQWlELENBQUMsS0FBSyxDQUM3RixHQUFHLENBQ0o7O0FBQ0QsTUFBTSxLQUFPLHFCQUFxQixHQUFHLDBEQUEwRCxDQUFDLEtBQUssQ0FDbkcsR0FBRyxDQUNKOztBQUNELE1BQU0sS0FBTywwQkFBMEIsR0FBRyw2QkFBNkIsQ0FBQyxLQUFLLENBQzNFLEdBQUcsQ0FDSjs7QUFDRCxNQUFNLEtBQU8sd0JBQXdCLEdBQUcsc0JBQXNCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzs7QUFDekUsTUFBTSxLQUFPLHFCQUFxQixHQUFnQztJQUNoRSxHQUFHLEVBQUUsV0FBVztJQUNoQixFQUFFLEVBQUUsUUFBUTtJQUNaLENBQUMsRUFBRSxZQUFZO0lBQ2YsRUFBRSxFQUFFLGNBQWM7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QXVsQjNCLFNBQVMsU0FBUyxDQUFDLENBQVMsRUFBRSxDQUFTO0lBQ3JDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO0FBQzdCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTptYXgtZmlsZS1saW5lLWNvdW50IG1heC1saW5lLWxlbmd0aCBjeWNsb21hdGljLWNvbXBsZXhpdHlcblxuaW1wb3J0IHsgd2Vla09mWWVhciB9IGZyb20gJy4uL3VuaXRzL3dlZWstY2FsZW5kYXItdXRpbHMnO1xuaW1wb3J0IHsgaGFzT3duUHJvcCwgaXNBcnJheSwgaXNGdW5jdGlvbiB9IGZyb20gJy4uL3V0aWxzL3R5cGUtY2hlY2tzJztcbmltcG9ydCB7IGdldERheSwgZ2V0TW9udGggfSBmcm9tICcuLi91dGlscy9kYXRlLWdldHRlcnMnO1xuaW1wb3J0IHsgbWF0Y2hXb3JkLCByZWdleEVzY2FwZSB9IGZyb20gJy4uL3BhcnNlL3JlZ2V4JztcbmltcG9ydCB7IHNldERheU9mV2VlayB9IGZyb20gJy4uL3VuaXRzL2RheS1vZi13ZWVrJztcblxuZXhwb3J0IGludGVyZmFjZSBMb2NhbGVPcHRpb25zRm9ybWF0IHtcbiAgZm9ybWF0OiBzdHJpbmdbXTtcbiAgc3RhbmRhbG9uZTogc3RyaW5nW107XG4gIGlzRm9ybWF0PzogUmVnRXhwO1xufVxuXG5leHBvcnQgdHlwZSBMb2NhbGVPcHRpb25zID0gc3RyaW5nW10gfCBMb2NhbGVPcHRpb25zRm9ybWF0O1xuXG5jb25zdCBNT05USFNfSU5fRk9STUFUID0gL0Rbb0RdPyhcXFtbXlxcW1xcXV0qXFxdfFxccykrTU1NTT8vO1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRMb2NhbGVNb250aHMgPSAnSmFudWFyeV9GZWJydWFyeV9NYXJjaF9BcHJpbF9NYXlfSnVuZV9KdWx5X0F1Z3VzdF9TZXB0ZW1iZXJfT2N0b2Jlcl9Ob3ZlbWJlcl9EZWNlbWJlcicuc3BsaXQoXG4gICdfJ1xuKTtcbmV4cG9ydCBjb25zdCBkZWZhdWx0TG9jYWxlTW9udGhzU2hvcnQgPSAnSmFuX0ZlYl9NYXJfQXByX01heV9KdW5fSnVsX0F1Z19TZXBfT2N0X05vdl9EZWMnLnNwbGl0KFxuICAnXydcbik7XG5leHBvcnQgY29uc3QgZGVmYXVsdExvY2FsZVdlZWtkYXlzID0gJ1N1bmRheV9Nb25kYXlfVHVlc2RheV9XZWRuZXNkYXlfVGh1cnNkYXlfRnJpZGF5X1NhdHVyZGF5Jy5zcGxpdChcbiAgJ18nXG4pO1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRMb2NhbGVXZWVrZGF5c1Nob3J0ID0gJ1N1bl9Nb25fVHVlX1dlZF9UaHVfRnJpX1NhdCcuc3BsaXQoXG4gICdfJ1xuKTtcbmV4cG9ydCBjb25zdCBkZWZhdWx0TG9jYWxlV2Vla2RheXNNaW4gPSAnU3VfTW9fVHVfV2VfVGhfRnJfU2EnLnNwbGl0KCdfJyk7XG5leHBvcnQgY29uc3QgZGVmYXVsdExvbmdEYXRlRm9ybWF0OiB7IFtpbmRleDogc3RyaW5nXTogc3RyaW5nIH0gPSB7XG4gIExUUzogJ2g6bW06c3MgQScsXG4gIExUOiAnaDptbSBBJyxcbiAgTDogJ01NL0REL1lZWVknLFxuICBMTDogJ01NTU0gRCwgWVlZWScsXG4gIExMTDogJ01NTU0gRCwgWVlZWSBoOm1tIEEnLFxuICBMTExMOiAnZGRkZCwgTU1NTSBELCBZWVlZIGg6bW0gQSdcbn07XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0T3JkaW5hbCA9ICclZCc7XG5leHBvcnQgY29uc3QgZGVmYXVsdERheU9mTW9udGhPcmRpbmFsUGFyc2UgPSAvXFxkezEsMn0vO1xuXG5jb25zdCBkZWZhdWx0TW9udGhzU2hvcnRSZWdleCA9IG1hdGNoV29yZDtcbmNvbnN0IGRlZmF1bHRNb250aHNSZWdleCA9IG1hdGNoV29yZDtcblxuZXhwb3J0IHR5cGUgT3JkaW5hbERhdGVGbiA9IChudW06IG51bWJlciwgdG9rZW4/OiBzdHJpbmcpID0+IHN0cmluZztcbmV4cG9ydCB0eXBlIFBsdXJhbGl6ZURhdGVGbiA9IChudW06IG51bWJlciwgd2l0aG91dFN1ZmZpeDogYm9vbGVhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk/OiBzdHJpbmcsIGlzRnV0dXJlPzogYm9vbGVhbikgPT4gc3RyaW5nO1xuXG5leHBvcnQgaW50ZXJmYWNlIExvY2FsZURhdGEge1xuICBhYmJyPzogc3RyaW5nO1xuICBwYXJlbnRMb2NhbGU/OiBzdHJpbmc7XG5cbiAgbW9udGhzPzogTG9jYWxlT3B0aW9ucyB8ICgoZGF0ZTogRGF0ZSwgZm9ybWF0OiBzdHJpbmcsIGlzVVRDPzogYm9vbGVhbikgPT4gc3RyaW5nIHwgc3RyaW5nW10pO1xuICBtb250aHNTaG9ydD86IExvY2FsZU9wdGlvbnMgfCAoKGRhdGU6IERhdGUsIGZvcm1hdDogc3RyaW5nLCBpc1VUQz86IGJvb2xlYW4pID0+IHN0cmluZyB8IHN0cmluZ1tdKTtcbiAgbW9udGhzUGFyc2VFeGFjdD86IGJvb2xlYW47XG5cbiAgd2Vla2RheXM/OiBMb2NhbGVPcHRpb25zIHwgKChkYXRlOiBEYXRlLCBmb3JtYXQ6IHN0cmluZywgaXNVVEM/OiBib29sZWFuKSA9PiBzdHJpbmcgfCBzdHJpbmdbXSk7XG4gIHdlZWtkYXlzU2hvcnQ/OiBzdHJpbmdbXSB8ICgoZGF0ZTogRGF0ZSwgZm9ybWF0OiBzdHJpbmcsIGlzVVRDPzogYm9vbGVhbikgPT4gc3RyaW5nIHwgc3RyaW5nW10pO1xuICB3ZWVrZGF5c01pbj86IHN0cmluZ1tdIHwgKChkYXRlOiBEYXRlLCBmb3JtYXQ6IHN0cmluZywgaXNVVEM/OiBib29sZWFuKSA9PiBzdHJpbmcgfCBzdHJpbmdbXSk7XG4gIHdlZWtkYXlzUGFyc2VFeGFjdD86IGJvb2xlYW47XG5cbiAgbG9uZ0RhdGVGb3JtYXQ/OiB7IFtpbmRleDogc3RyaW5nXTogc3RyaW5nIH07XG4gIGNhbGVuZGFyPzoge1xuICAgIFtrZXk6IHN0cmluZ106IChzdHJpbmdcbiAgICAgIHwgKChkYXRlOiBEYXRlLCBub3c/OiBEYXRlKSA9PiBzdHJpbmcpXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIHwgKChkYXlPZldlZWs6IG51bWJlciwgaXNOZXh0V2VlazogYm9vbGVhbikgPT4gc3RyaW5nKSlcbiAgfTtcbiAgcmVsYXRpdmVUaW1lPzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBQbHVyYWxpemVEYXRlRm4gfTtcbiAgZGF5T2ZNb250aE9yZGluYWxQYXJzZT86IFJlZ0V4cDtcbiAgb3JkaW5hbD86IHN0cmluZyB8IE9yZGluYWxEYXRlRm47XG5cbiAgd2Vlaz86IHsgZG93PzogbnVtYmVyOyBkb3k/OiBudW1iZXIgfTtcblxuICBpbnZhbGlkRGF0ZT86IHN0cmluZztcblxuICBtb250aHNSZWdleD86IFJlZ0V4cDtcbiAgbW9udGhzUGFyc2U/OiBSZWdFeHBbXTtcbiAgbW9udGhzU2hvcnRSZWdleD86IFJlZ0V4cDtcbiAgbW9udGhzU3RyaWN0UmVnZXg/OiBSZWdFeHA7XG4gIG1vbnRoc1Nob3J0U3RyaWN0UmVnZXg/OiBSZWdFeHA7XG4gIGxvbmdNb250aHNQYXJzZT86IFJlZ0V4cFtdO1xuICBzaG9ydE1vbnRoc1BhcnNlPzogUmVnRXhwW107XG5cbiAgbWVyaWRpZW1QYXJzZT86IFJlZ0V4cDtcblxuICBtZXJpZGllbUhvdXI/KGhvdXI6IG51bWJlciwgbWVyaWRpZW06IHN0cmluZyk6IG51bWJlcjtcblxuICBwcmVwYXJzZT8oc3RyOiBzdHJpbmcpOiBzdHJpbmc7XG5cbiAgcG9zdGZvcm1hdD8oc3RyOiBzdHJpbmcgfCBudW1iZXIpOiBzdHJpbmc7XG5cbiAgbWVyaWRpZW0/KGhvdXI6IG51bWJlciwgbWludXRlPzogbnVtYmVyLCBpc0xvd2VyPzogYm9vbGVhbik6IHN0cmluZztcblxuICBpc1BNPyhpbnB1dDogc3RyaW5nKTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIExvY2FsZSB7XG4gIHBhcmVudExvY2FsZT86IExvY2FsZTtcbiAgX2FiYnI6IHN0cmluZztcbiAgX2NvbmZpZzogTG9jYWxlRGF0YTtcbiAgbWVyaWRpZW1Ib3VyOiAoaG91cjogbnVtYmVyLCBtZXJpZGllbTogc3RyaW5nKSA9PiBudW1iZXI7XG5cbiAgX2ludmFsaWREYXRlOiBzdHJpbmc7XG4gIF93ZWVrOiB7IGRvdzogbnVtYmVyOyBkb3k6IG51bWJlciB9O1xuICBfZGF5T2ZNb250aE9yZGluYWxQYXJzZTogUmVnRXhwO1xuICBfb3JkaW5hbFBhcnNlOiBSZWdFeHA7XG4gIF9tZXJpZGllbVBhcnNlOiBSZWdFeHA7XG5cbiAgcHJpdmF0ZSBfY2FsZW5kYXI6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XG4gIHByaXZhdGUgX3JlbGF0aXZlVGltZTogeyBmdXR1cmU6IHN0cmluZzsgcGFzdDogc3RyaW5nIH07XG4gIHByaXZhdGUgX21vbnRoczogTG9jYWxlT3B0aW9ucztcbiAgcHJpdmF0ZSBfbW9udGhzU2hvcnQ6IExvY2FsZU9wdGlvbnM7XG4gIHByaXZhdGUgX21vbnRoc1JlZ2V4OiBSZWdFeHA7XG4gIHByaXZhdGUgX21vbnRoc1Nob3J0UmVnZXg6IFJlZ0V4cDtcbiAgcHJpdmF0ZSBfbW9udGhzU3RyaWN0UmVnZXg6IFJlZ0V4cDtcbiAgcHJpdmF0ZSBfbW9udGhzU2hvcnRTdHJpY3RSZWdleDogUmVnRXhwO1xuICBwcml2YXRlIF9tb250aHNQYXJzZTogUmVnRXhwW107XG4gIHByaXZhdGUgX2xvbmdNb250aHNQYXJzZTogc3RyaW5nW10gfCBSZWdFeHBbXTtcbiAgcHJpdmF0ZSBfc2hvcnRNb250aHNQYXJzZTogc3RyaW5nW10gfCBSZWdFeHBbXTtcbiAgcHJpdmF0ZSBfbW9udGhzUGFyc2VFeGFjdDogUmVnRXhwO1xuICBwcml2YXRlIF93ZWVrZGF5c1BhcnNlRXhhY3Q6IGJvb2xlYW47XG4gIHByaXZhdGUgX3dlZWtkYXlzUmVnZXg6IFJlZ0V4cDtcbiAgcHJpdmF0ZSBfd2Vla2RheXNTaG9ydFJlZ2V4OiBSZWdFeHA7XG4gIHByaXZhdGUgX3dlZWtkYXlzTWluUmVnZXg6IFJlZ0V4cDtcblxuICBwcml2YXRlIF93ZWVrZGF5c1N0cmljdFJlZ2V4OiBSZWdFeHA7XG4gIHByaXZhdGUgX3dlZWtkYXlzU2hvcnRTdHJpY3RSZWdleDogUmVnRXhwO1xuICBwcml2YXRlIF93ZWVrZGF5c01pblN0cmljdFJlZ2V4OiBSZWdFeHA7XG5cbiAgcHJpdmF0ZSBfd2Vla2RheXM6IExvY2FsZU9wdGlvbnM7XG4gIHByaXZhdGUgX3dlZWtkYXlzU2hvcnQ6IHN0cmluZ1tdO1xuICBwcml2YXRlIF93ZWVrZGF5c01pbjogc3RyaW5nW107XG4gIHByaXZhdGUgX3dlZWtkYXlzUGFyc2U6IHN0cmluZ1tdIHwgUmVnRXhwW107XG4gIHByaXZhdGUgX21pbldlZWtkYXlzUGFyc2U6IHN0cmluZ1tdIHwgUmVnRXhwW107XG4gIHByaXZhdGUgX3Nob3J0V2Vla2RheXNQYXJzZTogc3RyaW5nW10gfCBSZWdFeHBbXTtcbiAgcHJpdmF0ZSBfZnVsbFdlZWtkYXlzUGFyc2U6IFJlZ0V4cFtdO1xuICBwcml2YXRlIF9sb25nRGF0ZUZvcm1hdDogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcblxuICBwcml2YXRlIF9vcmRpbmFsOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBMb2NhbGVEYXRhKSB7XG4gICAgaWYgKCEhY29uZmlnKSB7XG4gICAgICB0aGlzLnNldChjb25maWcpO1xuICAgIH1cbiAgfVxuXG4gIHNldChjb25maWc6IExvY2FsZURhdGEpOiB2b2lkIHtcbiAgICBsZXQgY29uZktleTtcbiAgICBmb3IgKGNvbmZLZXkgaW4gY29uZmlnKSB7XG4gICAgICBpZiAoIWNvbmZpZy5oYXNPd25Qcm9wZXJ0eShjb25mS2V5KSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHByb3AgPSBjb25maWdbY29uZktleSBhcyBrZXlvZiBMb2NhbGVEYXRhXTtcbiAgICAgIGNvbnN0IGtleSA9IChpc0Z1bmN0aW9uKHByb3ApID8gY29uZktleSA6IGBfJHtjb25mS2V5fWApIGFzIGtleW9mIExvY2FsZTtcblxuICAgICAgdGhpc1trZXldID0gcHJvcCBhcyBhbnk7XG4gICAgfVxuXG4gICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xuICB9XG5cbiAgY2FsZW5kYXIoa2V5OiBzdHJpbmcsIGRhdGU6IERhdGUsIG5vdzogRGF0ZSk6IHN0cmluZyB7XG4gICAgY29uc3Qgb3V0cHV0ID0gdGhpcy5fY2FsZW5kYXJba2V5XSB8fCB0aGlzLl9jYWxlbmRhci5zYW1lRWxzZTtcblxuICAgIHJldHVybiBpc0Z1bmN0aW9uKG91dHB1dCkgPyBvdXRwdXQuY2FsbChudWxsLCBkYXRlLCBub3cpIDogb3V0cHV0O1xuICB9XG5cbiAgbG9uZ0RhdGVGb3JtYXQoa2V5OiBzdHJpbmcpIHtcbiAgICBjb25zdCBmb3JtYXQgPSB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXldO1xuICAgIGNvbnN0IGZvcm1hdFVwcGVyID0gdGhpcy5fbG9uZ0RhdGVGb3JtYXRba2V5LnRvVXBwZXJDYXNlKCldO1xuXG4gICAgaWYgKGZvcm1hdCB8fCAhZm9ybWF0VXBwZXIpIHtcbiAgICAgIHJldHVybiBmb3JtYXQ7XG4gICAgfVxuXG4gICAgdGhpcy5fbG9uZ0RhdGVGb3JtYXRba2V5XSA9IGZvcm1hdFVwcGVyLnJlcGxhY2UoL01NTU18TU18RER8ZGRkZC9nLCBmdW5jdGlvbiAodmFsOiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiB2YWwuc2xpY2UoMSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5fbG9uZ0RhdGVGb3JtYXRba2V5XTtcbiAgfVxuXG4gIGdldCBpbnZhbGlkRGF0ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9pbnZhbGlkRGF0ZTtcbiAgfVxuXG4gIHNldCBpbnZhbGlkRGF0ZSh2YWw6IHN0cmluZykge1xuICAgIHRoaXMuX2ludmFsaWREYXRlID0gdmFsO1xuICB9XG5cbiAgb3JkaW5hbChudW06IG51bWJlciwgdG9rZW4/OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9vcmRpbmFsLnJlcGxhY2UoJyVkJywgbnVtLnRvU3RyaW5nKDEwKSk7XG4gIH1cblxuICBwcmVwYXJzZShzdHI6IHN0cmluZykge1xuICAgIHJldHVybiBzdHI7XG4gIH1cblxuICBwb3N0Zm9ybWF0KHN0cjogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG4gIHJlbGF0aXZlVGltZShudW06IG51bWJlciwgd2l0aG91dFN1ZmZpeDogYm9vbGVhbiwgc3RyOiAnZnV0dXJlJyB8ICdwYXN0JywgaXNGdXR1cmU6IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgIGNvbnN0IG91dHB1dCA9IHRoaXMuX3JlbGF0aXZlVGltZVtzdHJdO1xuXG4gICAgcmV0dXJuIChpc0Z1bmN0aW9uKG91dHB1dCkpID9cbiAgICAgIG91dHB1dChudW0sIHdpdGhvdXRTdWZmaXgsIHN0ciwgaXNGdXR1cmUpIDpcbiAgICAgIG91dHB1dC5yZXBsYWNlKC8lZC9pLCBudW0udG9TdHJpbmcoMTApKTtcbiAgfVxuXG4gIHBhc3RGdXR1cmUoZGlmZjogbnVtYmVyLCBvdXRwdXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgZm9ybWF0ID0gdGhpcy5fcmVsYXRpdmVUaW1lW2RpZmYgPiAwID8gJ2Z1dHVyZScgOiAncGFzdCddO1xuXG4gICAgcmV0dXJuIGlzRnVuY3Rpb24oZm9ybWF0KSA/IGZvcm1hdChvdXRwdXQpIDogZm9ybWF0LnJlcGxhY2UoLyVzL2ksIG91dHB1dCk7XG4gIH1cblxuICAvKiogTW9udGhzICovXG4gIG1vbnRocygpOiBzdHJpbmdbXTtcbiAgbW9udGhzKGRhdGU6IERhdGUsIGZvcm1hdD86IHN0cmluZywgaXNVVEM/OiBib29sZWFuKTogc3RyaW5nO1xuICBtb250aHMoZGF0ZT86IERhdGUsIGZvcm1hdD86IHN0cmluZywgaXNVVEMgPSBmYWxzZSk6IHN0cmluZyB8IHN0cmluZ1tdIHtcbiAgICBpZiAoIWRhdGUpIHtcbiAgICAgIHJldHVybiBpc0FycmF5PHN0cmluZz4odGhpcy5fbW9udGhzKVxuICAgICAgICA/IHRoaXMuX21vbnRoc1xuICAgICAgICA6IHRoaXMuX21vbnRocy5zdGFuZGFsb25lO1xuICAgIH1cblxuICAgIGlmIChpc0FycmF5PHN0cmluZz4odGhpcy5fbW9udGhzKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX21vbnRoc1tnZXRNb250aChkYXRlLCBpc1VUQyldO1xuICAgIH1cblxuICAgIGNvbnN0IGtleSA9ICh0aGlzLl9tb250aHMuaXNGb3JtYXQgfHwgTU9OVEhTX0lOX0ZPUk1BVCkudGVzdChmb3JtYXQpXG4gICAgICA/ICdmb3JtYXQnXG4gICAgICA6ICdzdGFuZGFsb25lJztcblxuICAgIHJldHVybiB0aGlzLl9tb250aHNba2V5XVtnZXRNb250aChkYXRlLCBpc1VUQyldO1xuICB9XG5cbiAgbW9udGhzU2hvcnQoKTogc3RyaW5nW107XG4gIG1vbnRoc1Nob3J0KGRhdGU/OiBEYXRlLCBmb3JtYXQ/OiBzdHJpbmcsIGlzVVRDPzogYm9vbGVhbik6IHN0cmluZztcbiAgbW9udGhzU2hvcnQoZGF0ZT86IERhdGUsIGZvcm1hdD86IHN0cmluZywgaXNVVEMgPSBmYWxzZSk6IHN0cmluZyB8IHN0cmluZ1tdIHtcbiAgICBpZiAoIWRhdGUpIHtcbiAgICAgIHJldHVybiBpc0FycmF5PHN0cmluZz4odGhpcy5fbW9udGhzU2hvcnQpXG4gICAgICAgID8gdGhpcy5fbW9udGhzU2hvcnRcbiAgICAgICAgOiB0aGlzLl9tb250aHNTaG9ydC5zdGFuZGFsb25lO1xuICAgIH1cblxuICAgIGlmIChpc0FycmF5PHN0cmluZz4odGhpcy5fbW9udGhzU2hvcnQpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbW9udGhzU2hvcnRbZ2V0TW9udGgoZGF0ZSwgaXNVVEMpXTtcbiAgICB9XG4gICAgY29uc3Qga2V5ID0gTU9OVEhTX0lOX0ZPUk1BVC50ZXN0KGZvcm1hdCkgPyAnZm9ybWF0JyA6ICdzdGFuZGFsb25lJztcblxuICAgIHJldHVybiB0aGlzLl9tb250aHNTaG9ydFtrZXldW2dldE1vbnRoKGRhdGUsIGlzVVRDKV07XG4gIH1cblxuICBtb250aHNQYXJzZShtb250aE5hbWU6IHN0cmluZywgZm9ybWF0Pzogc3RyaW5nLCBzdHJpY3Q/OiBib29sZWFuKTogbnVtYmVyIHtcbiAgICBsZXQgZGF0ZTtcbiAgICBsZXQgcmVnZXg7XG5cbiAgICBpZiAodGhpcy5fbW9udGhzUGFyc2VFeGFjdCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlTW9udGhTdHJpY3RQYXJzZShtb250aE5hbWUsIGZvcm1hdCwgc3RyaWN0KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX21vbnRoc1BhcnNlKSB7XG4gICAgICB0aGlzLl9tb250aHNQYXJzZSA9IFtdO1xuICAgICAgdGhpcy5fbG9uZ01vbnRoc1BhcnNlID0gW107XG4gICAgICB0aGlzLl9zaG9ydE1vbnRoc1BhcnNlID0gW107XG4gICAgfVxuXG4gICAgLy8gVE9ETzogYWRkIHNvcnRpbmdcbiAgICAvLyBTb3J0aW5nIG1ha2VzIHN1cmUgaWYgb25lIG1vbnRoIChvciBhYmJyKSBpcyBhIHByZWZpeCBvZiBhbm90aGVyXG4gICAgLy8gc2VlIHNvcnRpbmcgaW4gY29tcHV0ZU1vbnRoc1BhcnNlXG4gICAgbGV0IGk7XG4gICAgZm9yIChpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICAgIC8vIG1ha2UgdGhlIHJlZ2V4IGlmIHdlIGRvbid0IGhhdmUgaXQgYWxyZWFkeVxuICAgICAgZGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDKDIwMDAsIGkpKTtcbiAgICAgIGlmIChzdHJpY3QgJiYgIXRoaXMuX2xvbmdNb250aHNQYXJzZVtpXSkge1xuICAgICAgICBjb25zdCBfbW9udGhzID0gdGhpcy5tb250aHMoZGF0ZSwgJycsIHRydWUpLnJlcGxhY2UoJy4nLCAnJyk7XG4gICAgICAgIGNvbnN0IF9zaG9ydE1vbnRocyA9IHRoaXMubW9udGhzU2hvcnQoZGF0ZSwgJycsIHRydWUpLnJlcGxhY2UoJy4nLCAnJyk7XG4gICAgICAgIHRoaXMuX2xvbmdNb250aHNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoYF4ke19tb250aHN9JGAsICdpJyk7XG4gICAgICAgIHRoaXMuX3Nob3J0TW9udGhzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKGBeJHtfc2hvcnRNb250aHN9JGAsICdpJyk7XG4gICAgICB9XG4gICAgICBpZiAoIXN0cmljdCAmJiAhdGhpcy5fbW9udGhzUGFyc2VbaV0pIHtcbiAgICAgICAgcmVnZXggPSBgXiR7dGhpcy5tb250aHMoZGF0ZSwgJycsIHRydWUpfXxeJHt0aGlzLm1vbnRoc1Nob3J0KGRhdGUsICcnLCB0cnVlKX1gO1xuICAgICAgICB0aGlzLl9tb250aHNQYXJzZVtpXSA9IG5ldyBSZWdFeHAocmVnZXgucmVwbGFjZSgnLicsICcnKSwgJ2knKTtcbiAgICAgIH1cbiAgICAgIC8vIHRlc3QgdGhlIHJlZ2V4XG4gICAgICBpZiAoc3RyaWN0ICYmIGZvcm1hdCA9PT0gJ01NTU0nICYmICh0aGlzLl9sb25nTW9udGhzUGFyc2VbaV0gYXMgUmVnRXhwKS50ZXN0KG1vbnRoTmFtZSkpIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdHJpY3QgJiYgZm9ybWF0ID09PSAnTU1NJyAmJiAodGhpcy5fc2hvcnRNb250aHNQYXJzZVtpXSBhcyBSZWdFeHApLnRlc3QobW9udGhOYW1lKSkge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFzdHJpY3QgJiYgdGhpcy5fbW9udGhzUGFyc2VbaV0udGVzdChtb250aE5hbWUpKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG1vbnRoc1JlZ2V4KGlzU3RyaWN0OiBib29sZWFuKTogUmVnRXhwIHtcbiAgICBpZiAodGhpcy5fbW9udGhzUGFyc2VFeGFjdCkge1xuICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfbW9udGhzUmVnZXgnKSkge1xuICAgICAgICB0aGlzLmNvbXB1dGVNb250aHNQYXJzZSgpO1xuICAgICAgfVxuICAgICAgaWYgKGlzU3RyaWN0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tb250aHNTdHJpY3RSZWdleDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuX21vbnRoc1JlZ2V4O1xuICAgIH1cblxuICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX21vbnRoc1JlZ2V4JykpIHtcbiAgICAgIHRoaXMuX21vbnRoc1JlZ2V4ID0gZGVmYXVsdE1vbnRoc1JlZ2V4O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9tb250aHNTdHJpY3RSZWdleCAmJiBpc1N0cmljdCA/XG4gICAgICB0aGlzLl9tb250aHNTdHJpY3RSZWdleCA6IHRoaXMuX21vbnRoc1JlZ2V4O1xuICB9XG5cbiAgbW9udGhzU2hvcnRSZWdleChpc1N0cmljdDogYm9vbGVhbik6IFJlZ0V4cCB7XG4gICAgaWYgKHRoaXMuX21vbnRoc1BhcnNlRXhhY3QpIHtcbiAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX21vbnRoc1JlZ2V4JykpIHtcbiAgICAgICAgdGhpcy5jb21wdXRlTW9udGhzUGFyc2UoKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc1N0cmljdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU2hvcnRTdHJpY3RSZWdleDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuX21vbnRoc1Nob3J0UmVnZXg7XG4gICAgfVxuICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX21vbnRoc1Nob3J0UmVnZXgnKSkge1xuICAgICAgdGhpcy5fbW9udGhzU2hvcnRSZWdleCA9IGRlZmF1bHRNb250aHNTaG9ydFJlZ2V4O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9tb250aHNTaG9ydFN0cmljdFJlZ2V4ICYmIGlzU3RyaWN0ID9cbiAgICAgIHRoaXMuX21vbnRoc1Nob3J0U3RyaWN0UmVnZXggOiB0aGlzLl9tb250aHNTaG9ydFJlZ2V4O1xuICB9XG5cbiAgLyoqIFdlZWsgKi9cbiAgd2VlayhkYXRlOiBEYXRlLCBpc1VUQz86IGJvb2xlYW4pOiBudW1iZXIge1xuICAgIHJldHVybiB3ZWVrT2ZZZWFyKGRhdGUsIHRoaXMuX3dlZWsuZG93LCB0aGlzLl93ZWVrLmRveSwgaXNVVEMpLndlZWs7XG4gIH1cblxuICBmaXJzdERheU9mV2VlaygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl93ZWVrLmRvdztcbiAgfVxuXG4gIGZpcnN0RGF5T2ZZZWFyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3dlZWsuZG95O1xuICB9XG5cbiAgLyoqIERheSBvZiBXZWVrICovXG4gIHdlZWtkYXlzKCk6IHN0cmluZ1tdO1xuICB3ZWVrZGF5cyhkYXRlOiBEYXRlLCBmb3JtYXQ/OiBzdHJpbmcsIGlzVVRDPzogYm9vbGVhbik6IHN0cmluZztcbiAgd2Vla2RheXMoZGF0ZT86IERhdGUsIGZvcm1hdD86IHN0cmluZywgaXNVVEM/OiBib29sZWFuKTogc3RyaW5nIHwgc3RyaW5nW10ge1xuICAgIGlmICghZGF0ZSkge1xuICAgICAgcmV0dXJuIGlzQXJyYXk8c3RyaW5nPih0aGlzLl93ZWVrZGF5cylcbiAgICAgICAgPyB0aGlzLl93ZWVrZGF5c1xuICAgICAgICA6IHRoaXMuX3dlZWtkYXlzLnN0YW5kYWxvbmU7XG4gICAgfVxuXG4gICAgaWYgKGlzQXJyYXk8c3RyaW5nPih0aGlzLl93ZWVrZGF5cykpIHtcbiAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1tnZXREYXkoZGF0ZSwgaXNVVEMpXTtcbiAgICB9XG5cbiAgICBjb25zdCBfa2V5ID0gdGhpcy5fd2Vla2RheXMuaXNGb3JtYXQudGVzdChmb3JtYXQpXG4gICAgICA/ICdmb3JtYXQnXG4gICAgICA6ICdzdGFuZGFsb25lJztcblxuICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1tfa2V5XVtnZXREYXkoZGF0ZSwgaXNVVEMpXTtcbiAgfVxuXG4gIHdlZWtkYXlzTWluKCk6IHN0cmluZ1tdO1xuICB3ZWVrZGF5c01pbihkYXRlOiBEYXRlLCBmb3JtYXQ/OiBzdHJpbmcsIGlzVVRDPzogYm9vbGVhbik6IHN0cmluZztcbiAgd2Vla2RheXNNaW4oZGF0ZT86IERhdGUsIGZvcm1hdD86IHN0cmluZywgaXNVVEM/OiBib29sZWFuKTogc3RyaW5nIHwgc3RyaW5nW10ge1xuICAgIHJldHVybiBkYXRlID8gdGhpcy5fd2Vla2RheXNNaW5bZ2V0RGF5KGRhdGUsIGlzVVRDKV0gOiB0aGlzLl93ZWVrZGF5c01pbjtcbiAgfVxuXG4gIHdlZWtkYXlzU2hvcnQoKTogc3RyaW5nW107XG4gIHdlZWtkYXlzU2hvcnQoZGF0ZTogRGF0ZSwgZm9ybWF0Pzogc3RyaW5nLCBpc1VUQz86IGJvb2xlYW4pOiBzdHJpbmc7XG4gIHdlZWtkYXlzU2hvcnQoZGF0ZT86IERhdGUsIGZvcm1hdD86IHN0cmluZywgaXNVVEM/OiBib29sZWFuKTogc3RyaW5nIHwgc3RyaW5nW10ge1xuICAgIHJldHVybiBkYXRlID8gdGhpcy5fd2Vla2RheXNTaG9ydFtnZXREYXkoZGF0ZSwgaXNVVEMpXSA6IHRoaXMuX3dlZWtkYXlzU2hvcnQ7XG4gIH1cblxuXG4gIC8vIHByb3RvLndlZWtkYXlzUGFyc2UgID0gICAgICAgIGxvY2FsZVdlZWtkYXlzUGFyc2U7XG4gIHdlZWtkYXlzUGFyc2Uod2Vla2RheU5hbWU/OiBzdHJpbmcsIGZvcm1hdD86IHN0cmluZywgc3RyaWN0PzogYm9vbGVhbik6IG51bWJlciB7XG4gICAgbGV0IGk7XG4gICAgbGV0IHJlZ2V4O1xuXG4gICAgaWYgKHRoaXMuX3dlZWtkYXlzUGFyc2VFeGFjdCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlV2Vla1N0cmljdFBhcnNlKHdlZWtkYXlOYW1lLCBmb3JtYXQsIHN0cmljdCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl93ZWVrZGF5c1BhcnNlKSB7XG4gICAgICB0aGlzLl93ZWVrZGF5c1BhcnNlID0gW107XG4gICAgICB0aGlzLl9taW5XZWVrZGF5c1BhcnNlID0gW107XG4gICAgICB0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UgPSBbXTtcbiAgICAgIHRoaXMuX2Z1bGxXZWVrZGF5c1BhcnNlID0gW107XG4gICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XG4gICAgICAvLyBmaXg6IGhlcmUgaXMgdGhlIGlzc3VlXG4gICAgICBjb25zdCBkYXRlID0gc2V0RGF5T2ZXZWVrKG5ldyBEYXRlKERhdGUuVVRDKDIwMDAsIDEpKSwgaSwgbnVsbCwgdHJ1ZSk7XG4gICAgICBpZiAoc3RyaWN0ICYmICF0aGlzLl9mdWxsV2Vla2RheXNQYXJzZVtpXSkge1xuICAgICAgICB0aGlzLl9mdWxsV2Vla2RheXNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoYF4ke3RoaXMud2Vla2RheXMoZGF0ZSwgJycsIHRydWUpLnJlcGxhY2UoJy4nLCAnXFwuPycpfSRgLCAnaScpO1xuICAgICAgICB0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKGBeJHt0aGlzLndlZWtkYXlzU2hvcnQoZGF0ZSwgJycsIHRydWUpLnJlcGxhY2UoJy4nLCAnXFwuPycpfSRgLCAnaScpO1xuICAgICAgICB0aGlzLl9taW5XZWVrZGF5c1BhcnNlW2ldID0gbmV3IFJlZ0V4cChgXiR7dGhpcy53ZWVrZGF5c01pbihkYXRlLCAnJywgdHJ1ZSkucmVwbGFjZSgnLicsICdcXC4/Jyl9JGAsICdpJyk7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuX3dlZWtkYXlzUGFyc2VbaV0pIHtcbiAgICAgICAgcmVnZXggPSBgXiR7dGhpcy53ZWVrZGF5cyhkYXRlLCAnJywgdHJ1ZSl9fF4ke3RoaXMud2Vla2RheXNTaG9ydChkYXRlLCAnJywgdHJ1ZSl9fF4ke3RoaXMud2Vla2RheXNNaW4oZGF0ZSwgJycsIHRydWUpfWA7XG4gICAgICAgIHRoaXMuX3dlZWtkYXlzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKHJlZ2V4LnJlcGxhY2UoJy4nLCAnJyksICdpJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNBcnJheTxSZWdFeHA+KHRoaXMuX2Z1bGxXZWVrZGF5c1BhcnNlKVxuICAgICAgICB8fCAhaXNBcnJheTxSZWdFeHA+KHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSlcbiAgICAgICAgfHwgIWlzQXJyYXk8UmVnRXhwPih0aGlzLl9taW5XZWVrZGF5c1BhcnNlKVxuICAgICAgICB8fCAhaXNBcnJheTxSZWdFeHA+KHRoaXMuX3dlZWtkYXlzUGFyc2UpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gdGVzdCB0aGUgcmVnZXhcbiAgICAgIGlmIChzdHJpY3QgJiYgZm9ybWF0ID09PSAnZGRkZCcgJiYgdGhpcy5fZnVsbFdlZWtkYXlzUGFyc2VbaV0udGVzdCh3ZWVrZGF5TmFtZSkpIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9IGVsc2UgaWYgKHN0cmljdCAmJiBmb3JtYXQgPT09ICdkZGQnICYmIHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZVtpXS50ZXN0KHdlZWtkYXlOYW1lKSkge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH0gZWxzZSBpZiAoc3RyaWN0ICYmIGZvcm1hdCA9PT0gJ2RkJyAmJiB0aGlzLl9taW5XZWVrZGF5c1BhcnNlW2ldLnRlc3Qod2Vla2RheU5hbWUpKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfSBlbHNlIGlmICghc3RyaWN0ICYmIHRoaXMuX3dlZWtkYXlzUGFyc2VbaV0udGVzdCh3ZWVrZGF5TmFtZSkpIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gcHJvdG8ud2Vla2RheXNSZWdleCAgICAgICA9ICAgICAgICB3ZWVrZGF5c1JlZ2V4O1xuICB3ZWVrZGF5c1JlZ2V4KGlzU3RyaWN0OiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuX3dlZWtkYXlzUGFyc2VFeGFjdCkge1xuICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfd2Vla2RheXNSZWdleCcpKSB7XG4gICAgICAgIHRoaXMuY29tcHV0ZVdlZWtkYXlzUGFyc2UoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzU3RyaWN0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1N0cmljdFJlZ2V4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzUmVnZXg7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX3dlZWtkYXlzUmVnZXgnKSkge1xuICAgICAgICB0aGlzLl93ZWVrZGF5c1JlZ2V4ID0gbWF0Y2hXb3JkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNTdHJpY3RSZWdleCAmJiBpc1N0cmljdCA/XG4gICAgICAgIHRoaXMuX3dlZWtkYXlzU3RyaWN0UmVnZXggOiB0aGlzLl93ZWVrZGF5c1JlZ2V4O1xuICAgIH1cbiAgfVxuXG4gIC8vIHByb3RvLndlZWtkYXlzU2hvcnRSZWdleCAgPSAgICAgICAgd2Vla2RheXNTaG9ydFJlZ2V4O1xuICAvLyBwcm90by53ZWVrZGF5c01pblJlZ2V4ICAgID0gICAgICAgIHdlZWtkYXlzTWluUmVnZXg7XG5cblxuICB3ZWVrZGF5c1Nob3J0UmVnZXgoaXNTdHJpY3Q/OiBib29sZWFuKTogUmVnRXhwIHtcbiAgICBpZiAodGhpcy5fd2Vla2RheXNQYXJzZUV4YWN0KSB7XG4gICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ193ZWVrZGF5c1JlZ2V4JykpIHtcbiAgICAgICAgdGhpcy5jb21wdXRlV2Vla2RheXNQYXJzZSgpO1xuICAgICAgfVxuICAgICAgaWYgKGlzU3RyaWN0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1Nob3J0U3RyaWN0UmVnZXg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNTaG9ydFJlZ2V4O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ193ZWVrZGF5c1Nob3J0UmVnZXgnKSkge1xuICAgICAgICB0aGlzLl93ZWVrZGF5c1Nob3J0UmVnZXggPSBtYXRjaFdvcmQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1Nob3J0U3RyaWN0UmVnZXggJiYgaXNTdHJpY3QgP1xuICAgICAgICB0aGlzLl93ZWVrZGF5c1Nob3J0U3RyaWN0UmVnZXggOiB0aGlzLl93ZWVrZGF5c1Nob3J0UmVnZXg7XG4gICAgfVxuICB9XG5cbiAgd2Vla2RheXNNaW5SZWdleChpc1N0cmljdD86IGJvb2xlYW4pOiBSZWdFeHAge1xuICAgIGlmICh0aGlzLl93ZWVrZGF5c1BhcnNlRXhhY3QpIHtcbiAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX3dlZWtkYXlzUmVnZXgnKSkge1xuICAgICAgICB0aGlzLmNvbXB1dGVXZWVrZGF5c1BhcnNlKCk7XG4gICAgICB9XG4gICAgICBpZiAoaXNTdHJpY3QpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzTWluU3RyaWN0UmVnZXg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNNaW5SZWdleDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfd2Vla2RheXNNaW5SZWdleCcpKSB7XG4gICAgICAgIHRoaXMuX3dlZWtkYXlzTWluUmVnZXggPSBtYXRjaFdvcmQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c01pblN0cmljdFJlZ2V4ICYmIGlzU3RyaWN0ID9cbiAgICAgICAgdGhpcy5fd2Vla2RheXNNaW5TdHJpY3RSZWdleCA6IHRoaXMuX3dlZWtkYXlzTWluUmVnZXg7XG4gICAgfVxuICB9XG5cbiAgaXNQTShpbnB1dDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgLy8gSUU4IFF1aXJrcyBNb2RlICYgSUU3IFN0YW5kYXJkcyBNb2RlIGRvIG5vdCBhbGxvdyBhY2Nlc3Npbmcgc3RyaW5ncyBsaWtlIGFycmF5c1xuICAgIC8vIFVzaW5nIGNoYXJBdCBzaG91bGQgYmUgbW9yZSBjb21wYXRpYmxlLlxuICAgIHJldHVybiBpbnB1dC50b0xvd2VyQ2FzZSgpLmNoYXJBdCgwKSA9PT0gJ3AnO1xuICB9XG5cbiAgbWVyaWRpZW0oaG91cnM6IG51bWJlciwgbWludXRlczogbnVtYmVyLCBpc0xvd2VyOiBib29sZWFuKTogc3RyaW5nIHtcbiAgICBpZiAoaG91cnMgPiAxMSkge1xuICAgICAgcmV0dXJuIGlzTG93ZXIgPyAncG0nIDogJ1BNJztcbiAgICB9XG5cbiAgICByZXR1cm4gaXNMb3dlciA/ICdhbScgOiAnQU0nO1xuICB9XG5cbiAgZm9ybWF0TG9uZ0RhdGUoa2V5OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9sb25nRGF0ZUZvcm1hdCA9IHRoaXMuX2xvbmdEYXRlRm9ybWF0ID8gdGhpcy5fbG9uZ0RhdGVGb3JtYXQgOiBkZWZhdWx0TG9uZ0RhdGVGb3JtYXQ7XG4gICAgY29uc3QgZm9ybWF0ID0gdGhpcy5fbG9uZ0RhdGVGb3JtYXRba2V5XTtcbiAgICBjb25zdCBmb3JtYXRVcHBlciA9IHRoaXMuX2xvbmdEYXRlRm9ybWF0W2tleS50b1VwcGVyQ2FzZSgpXTtcblxuICAgIGlmIChmb3JtYXQgfHwgIWZvcm1hdFVwcGVyKSB7XG4gICAgICByZXR1cm4gZm9ybWF0O1xuICAgIH1cblxuICAgIHRoaXMuX2xvbmdEYXRlRm9ybWF0W1xuICAgICAga2V5XG4gICAgICBdID0gZm9ybWF0VXBwZXIucmVwbGFjZSgvTU1NTXxNTXxERHxkZGRkL2csICh2YWw6IHN0cmluZykgPT4ge1xuICAgICAgcmV0dXJuIHZhbC5zbGljZSgxKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXldO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVNb250aFN0cmljdFBhcnNlKG1vbnRoTmFtZTogc3RyaW5nLCBmb3JtYXQ6IHN0cmluZywgc3RyaWN0PzogYm9vbGVhbikge1xuICAgIGNvbnN0IGxsYyA9IG1vbnRoTmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgIGxldCBpO1xuICAgIGxldCBpaTtcbiAgICBsZXQgbW9tO1xuICAgIGlmICghdGhpcy5fbW9udGhzUGFyc2UpIHtcbiAgICAgIC8vIHRoaXMgaXMgbm90IHVzZWRcbiAgICAgIHRoaXMuX21vbnRoc1BhcnNlID0gW107XG4gICAgICB0aGlzLl9sb25nTW9udGhzUGFyc2UgPSBbXTtcbiAgICAgIHRoaXMuX3Nob3J0TW9udGhzUGFyc2UgPSBbXTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgKytpKSB7XG4gICAgICAgIG1vbSA9IG5ldyBEYXRlKDIwMDAsIGkpO1xuICAgICAgICB0aGlzLl9zaG9ydE1vbnRoc1BhcnNlW2ldID0gdGhpcy5tb250aHNTaG9ydChtb20sICcnKS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICB0aGlzLl9sb25nTW9udGhzUGFyc2VbaV0gPSB0aGlzLm1vbnRocyhtb20sICcnKS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdHJpY3QpIHtcbiAgICAgIGlmIChmb3JtYXQgPT09ICdNTU0nKSB7XG4gICAgICAgIGlpID0gKHRoaXMuX3Nob3J0TW9udGhzUGFyc2UgYXMgc3RyaW5nW10pLmluZGV4T2YobGxjKTtcblxuICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgfVxuICAgICAgaWkgPSAodGhpcy5fbG9uZ01vbnRoc1BhcnNlIGFzIHN0cmluZ1tdKS5pbmRleE9mKGxsYyk7XG5cbiAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKGZvcm1hdCA9PT0gJ01NTScpIHtcbiAgICAgIGlpID0gKHRoaXMuX3Nob3J0TW9udGhzUGFyc2UgYXMgc3RyaW5nW10pLmluZGV4T2YobGxjKTtcbiAgICAgIGlmIChpaSAhPT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgfVxuXG4gICAgICBpaSA9ICh0aGlzLl9sb25nTW9udGhzUGFyc2UgYXMgc3RyaW5nW10pLmluZGV4T2YobGxjKTtcblxuICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICB9XG5cbiAgICBpaSA9ICh0aGlzLl9sb25nTW9udGhzUGFyc2UgYXMgc3RyaW5nW10pLmluZGV4T2YobGxjKTtcbiAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICByZXR1cm4gaWk7XG4gICAgfVxuICAgIGlpID0gKHRoaXMuX3Nob3J0TW9udGhzUGFyc2UgYXMgc3RyaW5nW10pLmluZGV4T2YobGxjKTtcblxuICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZVdlZWtTdHJpY3RQYXJzZSh3ZWVrZGF5TmFtZTogc3RyaW5nLCBmb3JtYXQ6IHN0cmluZywgc3RyaWN0OiBib29sZWFuKTogbnVtYmVyIHtcbiAgICBsZXQgaWk7XG4gICAgY29uc3QgbGxjID0gd2Vla2RheU5hbWUudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICBpZiAoIXRoaXMuX3dlZWtkYXlzUGFyc2UpIHtcbiAgICAgIHRoaXMuX3dlZWtkYXlzUGFyc2UgPSBbXTtcbiAgICAgIHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSA9IFtdO1xuICAgICAgdGhpcy5fbWluV2Vla2RheXNQYXJzZSA9IFtdO1xuXG4gICAgICBsZXQgaTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCA3OyArK2kpIHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IHNldERheU9mV2VlayhuZXcgRGF0ZShEYXRlLlVUQygyMDAwLCAxKSksIGksIG51bGwsIHRydWUpO1xuICAgICAgICB0aGlzLl9taW5XZWVrZGF5c1BhcnNlW2ldID0gdGhpcy53ZWVrZGF5c01pbihkYXRlKS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICB0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2VbaV0gPSB0aGlzLndlZWtkYXlzU2hvcnQoZGF0ZSkudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgdGhpcy5fd2Vla2RheXNQYXJzZVtpXSA9IHRoaXMud2Vla2RheXMoZGF0ZSwgJycpLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFpc0FycmF5PHN0cmluZz4odGhpcy5fd2Vla2RheXNQYXJzZSlcbiAgICAgIHx8ICFpc0FycmF5PHN0cmluZz4odGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlKVxuICAgICAgfHwgIWlzQXJyYXk8c3RyaW5nPih0aGlzLl9taW5XZWVrZGF5c1BhcnNlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChzdHJpY3QpIHtcbiAgICAgIGlmIChmb3JtYXQgPT09ICdkZGRkJykge1xuICAgICAgICBpaSA9IHRoaXMuX3dlZWtkYXlzUGFyc2UuaW5kZXhPZihsbGMpO1xuXG4gICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gICAgICB9IGVsc2UgaWYgKGZvcm1hdCA9PT0gJ2RkZCcpIHtcbiAgICAgICAgaWkgPSB0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UuaW5kZXhPZihsbGMpO1xuXG4gICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpaSA9IHRoaXMuX21pbldlZWtkYXlzUGFyc2UuaW5kZXhPZihsbGMpO1xuXG4gICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChmb3JtYXQgPT09ICdkZGRkJykge1xuICAgICAgICBpaSA9IHRoaXMuX3dlZWtkYXlzUGFyc2UuaW5kZXhPZihsbGMpO1xuICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICB9XG4gICAgICAgIGlpID0gdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlLmluZGV4T2YobGxjKTtcbiAgICAgICAgaWYgKGlpICE9PSAtMSkge1xuICAgICAgICAgIHJldHVybiBpaTtcbiAgICAgICAgfVxuICAgICAgICBpaSA9IHRoaXMuX21pbldlZWtkYXlzUGFyc2UuaW5kZXhPZihsbGMpO1xuXG4gICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gICAgICB9IGVsc2UgaWYgKGZvcm1hdCA9PT0gJ2RkZCcpIHtcbiAgICAgICAgaWkgPSB0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UuaW5kZXhPZihsbGMpO1xuICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICB9XG4gICAgICAgIGlpID0gdGhpcy5fd2Vla2RheXNQYXJzZS5pbmRleE9mKGxsYyk7XG4gICAgICAgIGlmIChpaSAhPT0gLTEpIHtcbiAgICAgICAgICByZXR1cm4gaWk7XG4gICAgICAgIH1cbiAgICAgICAgaWkgPSB0aGlzLl9taW5XZWVrZGF5c1BhcnNlLmluZGV4T2YobGxjKTtcblxuICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWkgPSB0aGlzLl9taW5XZWVrZGF5c1BhcnNlLmluZGV4T2YobGxjKTtcbiAgICAgICAgaWYgKGlpICE9PSAtMSkge1xuICAgICAgICAgIHJldHVybiBpaTtcbiAgICAgICAgfVxuICAgICAgICBpaSA9IHRoaXMuX3dlZWtkYXlzUGFyc2UuaW5kZXhPZihsbGMpO1xuICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICB9XG4gICAgICAgIGlpID0gdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlLmluZGV4T2YobGxjKTtcblxuICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY29tcHV0ZU1vbnRoc1BhcnNlKCkge1xuICAgIGNvbnN0IHNob3J0UGllY2VzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IGxvbmdQaWVjZXM6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3QgbWl4ZWRQaWVjZXM6IHN0cmluZ1tdID0gW107XG4gICAgbGV0IGRhdGU7XG5cbiAgICBsZXQgaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XG4gICAgICBkYXRlID0gbmV3IERhdGUoMjAwMCwgaSk7XG4gICAgICBzaG9ydFBpZWNlcy5wdXNoKHRoaXMubW9udGhzU2hvcnQoZGF0ZSwgJycpKTtcbiAgICAgIGxvbmdQaWVjZXMucHVzaCh0aGlzLm1vbnRocyhkYXRlLCAnJykpO1xuICAgICAgbWl4ZWRQaWVjZXMucHVzaCh0aGlzLm1vbnRocyhkYXRlLCAnJykpO1xuICAgICAgbWl4ZWRQaWVjZXMucHVzaCh0aGlzLm1vbnRoc1Nob3J0KGRhdGUsICcnKSk7XG4gICAgfVxuICAgIC8vIFNvcnRpbmcgbWFrZXMgc3VyZSBpZiBvbmUgbW9udGggKG9yIGFiYnIpIGlzIGEgcHJlZml4IG9mIGFub3RoZXIgaXRcbiAgICAvLyB3aWxsIG1hdGNoIHRoZSBsb25nZXIgcGllY2UuXG4gICAgc2hvcnRQaWVjZXMuc29ydChjbXBMZW5SZXYpO1xuICAgIGxvbmdQaWVjZXMuc29ydChjbXBMZW5SZXYpO1xuICAgIG1peGVkUGllY2VzLnNvcnQoY21wTGVuUmV2KTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgc2hvcnRQaWVjZXNbaV0gPSByZWdleEVzY2FwZShzaG9ydFBpZWNlc1tpXSk7XG4gICAgICBsb25nUGllY2VzW2ldID0gcmVnZXhFc2NhcGUobG9uZ1BpZWNlc1tpXSk7XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCAyNDsgaSsrKSB7XG4gICAgICBtaXhlZFBpZWNlc1tpXSA9IHJlZ2V4RXNjYXBlKG1peGVkUGllY2VzW2ldKTtcbiAgICB9XG5cbiAgICB0aGlzLl9tb250aHNSZWdleCA9IG5ldyBSZWdFeHAoYF4oJHttaXhlZFBpZWNlcy5qb2luKCd8Jyl9KWAsICdpJyk7XG4gICAgdGhpcy5fbW9udGhzU2hvcnRSZWdleCA9IHRoaXMuX21vbnRoc1JlZ2V4O1xuICAgIHRoaXMuX21vbnRoc1N0cmljdFJlZ2V4ID0gbmV3IFJlZ0V4cChgXigke2xvbmdQaWVjZXMuam9pbignfCcpfSlgLCAnaScpO1xuICAgIHRoaXMuX21vbnRoc1Nob3J0U3RyaWN0UmVnZXggPSBuZXcgUmVnRXhwKGBeKCR7c2hvcnRQaWVjZXMuam9pbignfCcpfSlgLCAnaScpO1xuICB9XG5cbiAgcHJpdmF0ZSBjb21wdXRlV2Vla2RheXNQYXJzZSgpIHtcbiAgICBjb25zdCBtaW5QaWVjZXMgPSBbXTtcbiAgICBjb25zdCBzaG9ydFBpZWNlcyA9IFtdO1xuICAgIGNvbnN0IGxvbmdQaWVjZXMgPSBbXTtcbiAgICBjb25zdCBtaXhlZFBpZWNlcyA9IFtdO1xuXG4gICAgbGV0IGk7XG4gICAgZm9yIChpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XG4gICAgICAvLyBsZXQgbW9tID0gY3JlYXRlVVRDKFsyMDAwLCAxXSkuZGF5KGkpO1xuICAgICAgY29uc3QgZGF0ZSA9IHNldERheU9mV2VlayhuZXcgRGF0ZShEYXRlLlVUQygyMDAwLCAxKSksIGksIG51bGwsIHRydWUpO1xuICAgICAgY29uc3QgbWlucCA9IHRoaXMud2Vla2RheXNNaW4oZGF0ZSk7XG4gICAgICBjb25zdCBzaG9ydHAgPSB0aGlzLndlZWtkYXlzU2hvcnQoZGF0ZSk7XG4gICAgICBjb25zdCBsb25ncCA9IHRoaXMud2Vla2RheXMoZGF0ZSk7XG4gICAgICBtaW5QaWVjZXMucHVzaChtaW5wKTtcbiAgICAgIHNob3J0UGllY2VzLnB1c2goc2hvcnRwKTtcbiAgICAgIGxvbmdQaWVjZXMucHVzaChsb25ncCk7XG4gICAgICBtaXhlZFBpZWNlcy5wdXNoKG1pbnApO1xuICAgICAgbWl4ZWRQaWVjZXMucHVzaChzaG9ydHApO1xuICAgICAgbWl4ZWRQaWVjZXMucHVzaChsb25ncCk7XG4gICAgfVxuICAgIC8vIFNvcnRpbmcgbWFrZXMgc3VyZSBpZiBvbmUgd2Vla2RheSAob3IgYWJicikgaXMgYSBwcmVmaXggb2YgYW5vdGhlciBpdFxuICAgIC8vIHdpbGwgbWF0Y2ggdGhlIGxvbmdlciBwaWVjZS5cbiAgICBtaW5QaWVjZXMuc29ydChjbXBMZW5SZXYpO1xuICAgIHNob3J0UGllY2VzLnNvcnQoY21wTGVuUmV2KTtcbiAgICBsb25nUGllY2VzLnNvcnQoY21wTGVuUmV2KTtcbiAgICBtaXhlZFBpZWNlcy5zb3J0KGNtcExlblJldik7XG4gICAgZm9yIChpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgc2hvcnRQaWVjZXNbaV0gPSByZWdleEVzY2FwZShzaG9ydFBpZWNlc1tpXSk7XG4gICAgICBsb25nUGllY2VzW2ldID0gcmVnZXhFc2NhcGUobG9uZ1BpZWNlc1tpXSk7XG4gICAgICBtaXhlZFBpZWNlc1tpXSA9IHJlZ2V4RXNjYXBlKG1peGVkUGllY2VzW2ldKTtcbiAgICB9XG5cbiAgICB0aGlzLl93ZWVrZGF5c1JlZ2V4ID0gbmV3IFJlZ0V4cChgXigke21peGVkUGllY2VzLmpvaW4oJ3wnKX0pYCwgJ2knKTtcbiAgICB0aGlzLl93ZWVrZGF5c1Nob3J0UmVnZXggPSB0aGlzLl93ZWVrZGF5c1JlZ2V4O1xuICAgIHRoaXMuX3dlZWtkYXlzTWluUmVnZXggPSB0aGlzLl93ZWVrZGF5c1JlZ2V4O1xuXG4gICAgdGhpcy5fd2Vla2RheXNTdHJpY3RSZWdleCA9IG5ldyBSZWdFeHAoYF4oJHtsb25nUGllY2VzLmpvaW4oJ3wnKX0pYCwgJ2knKTtcbiAgICB0aGlzLl93ZWVrZGF5c1Nob3J0U3RyaWN0UmVnZXggPSBuZXcgUmVnRXhwKGBeKCR7c2hvcnRQaWVjZXMuam9pbignfCcpfSlgLCAnaScpO1xuICAgIHRoaXMuX3dlZWtkYXlzTWluU3RyaWN0UmVnZXggPSBuZXcgUmVnRXhwKGBeKCR7bWluUGllY2VzLmpvaW4oJ3wnKX0pYCwgJ2knKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjbXBMZW5SZXYoYTogc3RyaW5nLCBiOiBzdHJpbmcpOiBudW1iZXIge1xuICByZXR1cm4gYi5sZW5ndGggLSBhLmxlbmd0aDtcbn1cbiJdfQ==