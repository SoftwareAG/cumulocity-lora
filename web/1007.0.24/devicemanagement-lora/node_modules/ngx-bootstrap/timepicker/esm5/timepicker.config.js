/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 * Provides default configuration values for timepicker
 */
var TimepickerConfig = /** @class */ (function () {
    function TimepickerConfig() {
        /**
         * hours change step
         */
        this.hourStep = 1;
        /**
         * hours change step
         */
        this.minuteStep = 5;
        /**
         * seconds changes step
         */
        this.secondsStep = 10;
        /**
         * if true works in 12H mode and displays AM/PM. If false works in 24H mode and hides AM/PM
         */
        this.showMeridian = true;
        /**
         * meridian labels based on locale
         */
        this.meridians = ['AM', 'PM'];
        /**
         * if true hours and minutes fields will be readonly
         */
        this.readonlyInput = false;
        /**
         * if true hours and minutes fields will be disabled
         */
        this.disabled = false;
        /**
         * if true scroll inside hours and minutes inputs will change time
         */
        this.mousewheel = true;
        /**
         * if true the values of hours and minutes can be changed using the up/down arrow keys on the keyboard
         */
        this.arrowkeys = true;
        /**
         * if true spinner arrows above and below the inputs will be shown
         */
        this.showSpinners = true;
        /**
         * show seconds in timepicker
         */
        this.showSeconds = false;
        /**
         * show minutes in timepicker
         */
        this.showMinutes = true;
    }
    TimepickerConfig.decorators = [
        { type: Injectable }
    ];
    return TimepickerConfig;
}());
export { TimepickerConfig };
if (false) {
    /**
     * hours change step
     * @type {?}
     */
    TimepickerConfig.prototype.hourStep;
    /**
     * hours change step
     * @type {?}
     */
    TimepickerConfig.prototype.minuteStep;
    /**
     * seconds changes step
     * @type {?}
     */
    TimepickerConfig.prototype.secondsStep;
    /**
     * if true works in 12H mode and displays AM/PM. If false works in 24H mode and hides AM/PM
     * @type {?}
     */
    TimepickerConfig.prototype.showMeridian;
    /**
     * meridian labels based on locale
     * @type {?}
     */
    TimepickerConfig.prototype.meridians;
    /**
     * if true hours and minutes fields will be readonly
     * @type {?}
     */
    TimepickerConfig.prototype.readonlyInput;
    /**
     * if true hours and minutes fields will be disabled
     * @type {?}
     */
    TimepickerConfig.prototype.disabled;
    /**
     * if true scroll inside hours and minutes inputs will change time
     * @type {?}
     */
    TimepickerConfig.prototype.mousewheel;
    /**
     * if true the values of hours and minutes can be changed using the up/down arrow keys on the keyboard
     * @type {?}
     */
    TimepickerConfig.prototype.arrowkeys;
    /**
     * if true spinner arrows above and below the inputs will be shown
     * @type {?}
     */
    TimepickerConfig.prototype.showSpinners;
    /**
     * show seconds in timepicker
     * @type {?}
     */
    TimepickerConfig.prototype.showSeconds;
    /**
     * show minutes in timepicker
     * @type {?}
     */
    TimepickerConfig.prototype.showMinutes;
    /**
     * minimum time user can select
     * @type {?}
     */
    TimepickerConfig.prototype.min;
    /**
     * maximum time user can select
     * @type {?}
     */
    TimepickerConfig.prototype.max;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5jb25maWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYm9vdHN0cmFwL3RpbWVwaWNrZXIvIiwic291cmNlcyI6WyJ0aW1lcGlja2VyLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUczQztJQUFBOzs7O1FBR0UsYUFBUSxHQUFHLENBQUMsQ0FBQzs7OztRQUViLGVBQVUsR0FBRyxDQUFDLENBQUM7Ozs7UUFFZixnQkFBVyxHQUFHLEVBQUUsQ0FBQzs7OztRQUVqQixpQkFBWSxHQUFHLElBQUksQ0FBQzs7OztRQUVwQixjQUFTLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Ozs7UUFFekIsa0JBQWEsR0FBRyxLQUFLLENBQUM7Ozs7UUFFdEIsYUFBUSxHQUFHLEtBQUssQ0FBQzs7OztRQUVqQixlQUFVLEdBQUcsSUFBSSxDQUFDOzs7O1FBRWxCLGNBQVMsR0FBRyxJQUFJLENBQUM7Ozs7UUFFakIsaUJBQVksR0FBRyxJQUFJLENBQUM7Ozs7UUFFcEIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7Ozs7UUFFcEIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7SUFLckIsQ0FBQzs7Z0JBOUJBLFVBQVU7O0lBOEJYLHVCQUFDO0NBQUEsQUE5QkQsSUE4QkM7U0E3QlksZ0JBQWdCOzs7Ozs7SUFFM0Isb0NBQWE7Ozs7O0lBRWIsc0NBQWU7Ozs7O0lBRWYsdUNBQWlCOzs7OztJQUVqQix3Q0FBb0I7Ozs7O0lBRXBCLHFDQUF5Qjs7Ozs7SUFFekIseUNBQXNCOzs7OztJQUV0QixvQ0FBaUI7Ozs7O0lBRWpCLHNDQUFrQjs7Ozs7SUFFbEIscUNBQWlCOzs7OztJQUVqQix3Q0FBb0I7Ozs7O0lBRXBCLHVDQUFvQjs7Ozs7SUFFcEIsdUNBQW1COzs7OztJQUVuQiwrQkFBVTs7Ozs7SUFFViwrQkFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqIFByb3ZpZGVzIGRlZmF1bHQgY29uZmlndXJhdGlvbiB2YWx1ZXMgZm9yIHRpbWVwaWNrZXIgKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUaW1lcGlja2VyQ29uZmlnIHtcbiAgLyoqIGhvdXJzIGNoYW5nZSBzdGVwICovXG4gIGhvdXJTdGVwID0gMTtcbiAgLyoqIGhvdXJzIGNoYW5nZSBzdGVwICovXG4gIG1pbnV0ZVN0ZXAgPSA1O1xuICAvKiogc2Vjb25kcyBjaGFuZ2VzIHN0ZXAgKi9cbiAgc2Vjb25kc1N0ZXAgPSAxMDtcbiAgLyoqIGlmIHRydWUgd29ya3MgaW4gMTJIIG1vZGUgYW5kIGRpc3BsYXlzIEFNL1BNLiBJZiBmYWxzZSB3b3JrcyBpbiAyNEggbW9kZSBhbmQgaGlkZXMgQU0vUE0gKi9cbiAgc2hvd01lcmlkaWFuID0gdHJ1ZTtcbiAgLyoqIG1lcmlkaWFuIGxhYmVscyBiYXNlZCBvbiBsb2NhbGUgKi9cbiAgbWVyaWRpYW5zID0gWydBTScsICdQTSddO1xuICAvKiogaWYgdHJ1ZSBob3VycyBhbmQgbWludXRlcyBmaWVsZHMgd2lsbCBiZSByZWFkb25seSAqL1xuICByZWFkb25seUlucHV0ID0gZmFsc2U7XG4gIC8qKiBpZiB0cnVlIGhvdXJzIGFuZCBtaW51dGVzIGZpZWxkcyB3aWxsIGJlIGRpc2FibGVkICovXG4gIGRpc2FibGVkID0gZmFsc2U7XG4gIC8qKiBpZiB0cnVlIHNjcm9sbCBpbnNpZGUgaG91cnMgYW5kIG1pbnV0ZXMgaW5wdXRzIHdpbGwgY2hhbmdlIHRpbWUgKi9cbiAgbW91c2V3aGVlbCA9IHRydWU7XG4gIC8qKiBpZiB0cnVlIHRoZSB2YWx1ZXMgb2YgaG91cnMgYW5kIG1pbnV0ZXMgY2FuIGJlIGNoYW5nZWQgdXNpbmcgdGhlIHVwL2Rvd24gYXJyb3cga2V5cyBvbiB0aGUga2V5Ym9hcmQgKi9cbiAgYXJyb3drZXlzID0gdHJ1ZTtcbiAgLyoqIGlmIHRydWUgc3Bpbm5lciBhcnJvd3MgYWJvdmUgYW5kIGJlbG93IHRoZSBpbnB1dHMgd2lsbCBiZSBzaG93biAqL1xuICBzaG93U3Bpbm5lcnMgPSB0cnVlO1xuICAvKiogc2hvdyBzZWNvbmRzIGluIHRpbWVwaWNrZXIgKi9cbiAgc2hvd1NlY29uZHMgPSBmYWxzZTtcbiAgLyoqIHNob3cgbWludXRlcyBpbiB0aW1lcGlja2VyICovXG4gIHNob3dNaW51dGVzID0gdHJ1ZTtcbiAgLyoqIG1pbmltdW0gdGltZSB1c2VyIGNhbiBzZWxlY3QgKi9cbiAgbWluOiBEYXRlO1xuICAvKiogbWF4aW11bSB0aW1lIHVzZXIgY2FuIHNlbGVjdCAqL1xuICBtYXg6IERhdGU7XG59XG4iXX0=