/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 * Provides default configuration values for timepicker
 */
export class TimepickerConfig {
    constructor() {
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
}
TimepickerConfig.decorators = [
    { type: Injectable }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5jb25maWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYm9vdHN0cmFwL3RpbWVwaWNrZXIvIiwic291cmNlcyI6WyJ0aW1lcGlja2VyLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUkzQyxNQUFNLE9BQU8sZ0JBQWdCO0lBRDdCOzs7O1FBR0UsYUFBUSxHQUFHLENBQUMsQ0FBQzs7OztRQUViLGVBQVUsR0FBRyxDQUFDLENBQUM7Ozs7UUFFZixnQkFBVyxHQUFHLEVBQUUsQ0FBQzs7OztRQUVqQixpQkFBWSxHQUFHLElBQUksQ0FBQzs7OztRQUVwQixjQUFTLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Ozs7UUFFekIsa0JBQWEsR0FBRyxLQUFLLENBQUM7Ozs7UUFFdEIsYUFBUSxHQUFHLEtBQUssQ0FBQzs7OztRQUVqQixlQUFVLEdBQUcsSUFBSSxDQUFDOzs7O1FBRWxCLGNBQVMsR0FBRyxJQUFJLENBQUM7Ozs7UUFFakIsaUJBQVksR0FBRyxJQUFJLENBQUM7Ozs7UUFFcEIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7Ozs7UUFFcEIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7SUFLckIsQ0FBQzs7O1lBOUJBLFVBQVU7Ozs7Ozs7SUFHVCxvQ0FBYTs7Ozs7SUFFYixzQ0FBZTs7Ozs7SUFFZix1Q0FBaUI7Ozs7O0lBRWpCLHdDQUFvQjs7Ozs7SUFFcEIscUNBQXlCOzs7OztJQUV6Qix5Q0FBc0I7Ozs7O0lBRXRCLG9DQUFpQjs7Ozs7SUFFakIsc0NBQWtCOzs7OztJQUVsQixxQ0FBaUI7Ozs7O0lBRWpCLHdDQUFvQjs7Ozs7SUFFcEIsdUNBQW9COzs7OztJQUVwQix1Q0FBbUI7Ozs7O0lBRW5CLCtCQUFVOzs7OztJQUVWLCtCQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKiogUHJvdmlkZXMgZGVmYXVsdCBjb25maWd1cmF0aW9uIHZhbHVlcyBmb3IgdGltZXBpY2tlciAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRpbWVwaWNrZXJDb25maWcge1xuICAvKiogaG91cnMgY2hhbmdlIHN0ZXAgKi9cbiAgaG91clN0ZXAgPSAxO1xuICAvKiogaG91cnMgY2hhbmdlIHN0ZXAgKi9cbiAgbWludXRlU3RlcCA9IDU7XG4gIC8qKiBzZWNvbmRzIGNoYW5nZXMgc3RlcCAqL1xuICBzZWNvbmRzU3RlcCA9IDEwO1xuICAvKiogaWYgdHJ1ZSB3b3JrcyBpbiAxMkggbW9kZSBhbmQgZGlzcGxheXMgQU0vUE0uIElmIGZhbHNlIHdvcmtzIGluIDI0SCBtb2RlIGFuZCBoaWRlcyBBTS9QTSAqL1xuICBzaG93TWVyaWRpYW4gPSB0cnVlO1xuICAvKiogbWVyaWRpYW4gbGFiZWxzIGJhc2VkIG9uIGxvY2FsZSAqL1xuICBtZXJpZGlhbnMgPSBbJ0FNJywgJ1BNJ107XG4gIC8qKiBpZiB0cnVlIGhvdXJzIGFuZCBtaW51dGVzIGZpZWxkcyB3aWxsIGJlIHJlYWRvbmx5ICovXG4gIHJlYWRvbmx5SW5wdXQgPSBmYWxzZTtcbiAgLyoqIGlmIHRydWUgaG91cnMgYW5kIG1pbnV0ZXMgZmllbGRzIHdpbGwgYmUgZGlzYWJsZWQgKi9cbiAgZGlzYWJsZWQgPSBmYWxzZTtcbiAgLyoqIGlmIHRydWUgc2Nyb2xsIGluc2lkZSBob3VycyBhbmQgbWludXRlcyBpbnB1dHMgd2lsbCBjaGFuZ2UgdGltZSAqL1xuICBtb3VzZXdoZWVsID0gdHJ1ZTtcbiAgLyoqIGlmIHRydWUgdGhlIHZhbHVlcyBvZiBob3VycyBhbmQgbWludXRlcyBjYW4gYmUgY2hhbmdlZCB1c2luZyB0aGUgdXAvZG93biBhcnJvdyBrZXlzIG9uIHRoZSBrZXlib2FyZCAqL1xuICBhcnJvd2tleXMgPSB0cnVlO1xuICAvKiogaWYgdHJ1ZSBzcGlubmVyIGFycm93cyBhYm92ZSBhbmQgYmVsb3cgdGhlIGlucHV0cyB3aWxsIGJlIHNob3duICovXG4gIHNob3dTcGlubmVycyA9IHRydWU7XG4gIC8qKiBzaG93IHNlY29uZHMgaW4gdGltZXBpY2tlciAqL1xuICBzaG93U2Vjb25kcyA9IGZhbHNlO1xuICAvKiogc2hvdyBtaW51dGVzIGluIHRpbWVwaWNrZXIgKi9cbiAgc2hvd01pbnV0ZXMgPSB0cnVlO1xuICAvKiogbWluaW11bSB0aW1lIHVzZXIgY2FuIHNlbGVjdCAqL1xuICBtaW46IERhdGU7XG4gIC8qKiBtYXhpbXVtIHRpbWUgdXNlciBjYW4gc2VsZWN0ICovXG4gIG1heDogRGF0ZTtcbn1cbiJdfQ==