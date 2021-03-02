/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* tslint:disable:no-forward-ref max-file-line-count */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TimepickerActions } from './reducer/timepicker.actions';
import { TimepickerStore } from './reducer/timepicker.store';
import { getControlsValue } from './timepicker-controls.util';
import { TimepickerConfig } from './timepicker.config';
import { isValidDate, padNumber, parseTime, isInputValid, isHourInputValid, isMinuteInputValid, isSecondInputValid, isInputLimitValid } from './timepicker.utils';
/** @type {?} */
export var TIMEPICKER_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    /* tslint:disable-next-line: no-use-before-declare */
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return TimepickerComponent; })),
    multi: true
};
var TimepickerComponent = /** @class */ (function () {
    function TimepickerComponent(_config, _cd, _store, _timepickerActions) {
        var _this = this;
        this._cd = _cd;
        this._store = _store;
        this._timepickerActions = _timepickerActions;
        /**
         * emits true if value is a valid date
         */
        this.isValid = new EventEmitter();
        // min\max validation for input fields
        this.invalidHours = false;
        this.invalidMinutes = false;
        this.invalidSeconds = false;
        // control value accessor methods
        // tslint:disable-next-line:no-any
        this.onChange = Function.prototype;
        // tslint:disable-next-line:no-any
        this.onTouched = Function.prototype;
        Object.assign(this, _config);
        this.timepickerSub = _store
            .select((/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return state.value; }))
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            // update UI values if date changed
            _this._renderTime(value);
            _this.onChange(value);
            _this._store.dispatch(_this._timepickerActions.updateControls(getControlsValue(_this)));
        }));
        _store
            .select((/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return state.controls; }))
            .subscribe((/**
         * @param {?} controlsState
         * @return {?}
         */
        function (controlsState) {
            _this.isValid.emit(isInputValid(_this.hours, _this.minutes, _this.seconds, _this.isPM()));
            Object.assign(_this, controlsState);
            _cd.markForCheck();
        }));
    }
    Object.defineProperty(TimepickerComponent.prototype, "isSpinnersVisible", {
        /** @deprecated - please use `isEditable` instead */
        get: /**
         * @deprecated - please use `isEditable` instead
         * @return {?}
         */
        function () {
            return this.showSpinners && !this.readonlyInput;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimepickerComponent.prototype, "isEditable", {
        get: /**
         * @return {?}
         */
        function () {
            return !(this.readonlyInput || this.disabled);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TimepickerComponent.prototype.resetValidation = /**
     * @return {?}
     */
    function () {
        this.invalidHours = false;
        this.invalidMinutes = false;
        this.invalidSeconds = false;
    };
    /**
     * @return {?}
     */
    TimepickerComponent.prototype.isPM = /**
     * @return {?}
     */
    function () {
        return this.showMeridian && this.meridian === this.meridians[1];
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    TimepickerComponent.prototype.prevDef = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        $event.preventDefault();
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    TimepickerComponent.prototype.wheelSign = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        return Math.sign($event.deltaY) * -1;
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    TimepickerComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this._store.dispatch(this._timepickerActions.updateControls(getControlsValue(this)));
    };
    /**
     * @param {?} step
     * @param {?=} source
     * @return {?}
     */
    TimepickerComponent.prototype.changeHours = /**
     * @param {?} step
     * @param {?=} source
     * @return {?}
     */
    function (step, source) {
        if (source === void 0) { source = ''; }
        this.resetValidation();
        this._store.dispatch(this._timepickerActions.changeHours({ step: step, source: source }));
    };
    /**
     * @param {?} step
     * @param {?=} source
     * @return {?}
     */
    TimepickerComponent.prototype.changeMinutes = /**
     * @param {?} step
     * @param {?=} source
     * @return {?}
     */
    function (step, source) {
        if (source === void 0) { source = ''; }
        this.resetValidation();
        this._store.dispatch(this._timepickerActions.changeMinutes({ step: step, source: source }));
    };
    /**
     * @param {?} step
     * @param {?=} source
     * @return {?}
     */
    TimepickerComponent.prototype.changeSeconds = /**
     * @param {?} step
     * @param {?=} source
     * @return {?}
     */
    function (step, source) {
        if (source === void 0) { source = ''; }
        this.resetValidation();
        this._store.dispatch(this._timepickerActions.changeSeconds({ step: step, source: source }));
    };
    /**
     * @param {?} hours
     * @return {?}
     */
    TimepickerComponent.prototype.updateHours = /**
     * @param {?} hours
     * @return {?}
     */
    function (hours) {
        this.resetValidation();
        this.hours = hours;
        /** @type {?} */
        var isValid = isHourInputValid(this.hours, this.isPM()) && this.isValidLimit();
        if (!isValid) {
            this.invalidHours = true;
            this.isValid.emit(false);
            this.onChange(null);
            return;
        }
        this._updateTime();
    };
    /**
     * @param {?} minutes
     * @return {?}
     */
    TimepickerComponent.prototype.updateMinutes = /**
     * @param {?} minutes
     * @return {?}
     */
    function (minutes) {
        this.resetValidation();
        this.minutes = minutes;
        /** @type {?} */
        var isValid = isMinuteInputValid(this.minutes) && this.isValidLimit();
        if (!isValid) {
            this.invalidMinutes = true;
            this.isValid.emit(false);
            this.onChange(null);
            return;
        }
        this._updateTime();
    };
    /**
     * @param {?} seconds
     * @return {?}
     */
    TimepickerComponent.prototype.updateSeconds = /**
     * @param {?} seconds
     * @return {?}
     */
    function (seconds) {
        this.resetValidation();
        this.seconds = seconds;
        /** @type {?} */
        var isValid = isSecondInputValid(this.seconds) && this.isValidLimit();
        if (!isValid) {
            this.invalidSeconds = true;
            this.isValid.emit(false);
            this.onChange(null);
            return;
        }
        this._updateTime();
    };
    /**
     * @return {?}
     */
    TimepickerComponent.prototype.isValidLimit = /**
     * @return {?}
     */
    function () {
        return isInputLimitValid({
            hour: this.hours,
            minute: this.minutes,
            seconds: this.seconds,
            isPM: this.isPM()
        }, this.max, this.min);
    };
    /**
     * @return {?}
     */
    TimepickerComponent.prototype._updateTime = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var _seconds = this.showSeconds ? this.seconds : void 0;
        /** @type {?} */
        var _minutes = this.showMinutes ? this.minutes : void 0;
        if (!isInputValid(this.hours, _minutes, _seconds, this.isPM())) {
            this.isValid.emit(false);
            this.onChange(null);
            return;
        }
        this._store.dispatch(this._timepickerActions.setTime({
            hour: this.hours,
            minute: this.minutes,
            seconds: this.seconds,
            isPM: this.isPM()
        }));
    };
    /**
     * @return {?}
     */
    TimepickerComponent.prototype.toggleMeridian = /**
     * @return {?}
     */
    function () {
        if (!this.showMeridian || !this.isEditable) {
            return;
        }
        /** @type {?} */
        var _hoursPerDayHalf = 12;
        this._store.dispatch(this._timepickerActions.changeHours({
            step: _hoursPerDayHalf,
            source: ''
        }));
    };
    /**
     * Write a new value to the element.
     */
    /**
     * Write a new value to the element.
     * @param {?} obj
     * @return {?}
     */
    TimepickerComponent.prototype.writeValue = /**
     * Write a new value to the element.
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        if (isValidDate(obj)) {
            this._store.dispatch(this._timepickerActions.writeValue(parseTime(obj)));
        }
        else if (obj == null) {
            this._store.dispatch(this._timepickerActions.writeValue(null));
        }
    };
    /**
     * Set the function to be called when the control receives a change event.
     */
    // tslint:disable-next-line:no-any
    /**
     * Set the function to be called when the control receives a change event.
     * @param {?} fn
     * @return {?}
     */
    // tslint:disable-next-line:no-any
    TimepickerComponent.prototype.registerOnChange = /**
     * Set the function to be called when the control receives a change event.
     * @param {?} fn
     * @return {?}
     */
    // tslint:disable-next-line:no-any
    function (fn) {
        this.onChange = fn;
    };
    /**
     * Set the function to be called when the control receives a touch event.
     */
    /**
     * Set the function to be called when the control receives a touch event.
     * @param {?} fn
     * @return {?}
     */
    TimepickerComponent.prototype.registerOnTouched = /**
     * Set the function to be called when the control receives a touch event.
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * This function is called when the control status changes to or from "disabled".
     * Depending on the value, it will enable or disable the appropriate DOM element.
     *
     * @param isDisabled
     */
    /**
     * This function is called when the control status changes to or from "disabled".
     * Depending on the value, it will enable or disable the appropriate DOM element.
     *
     * @param {?} isDisabled
     * @return {?}
     */
    TimepickerComponent.prototype.setDisabledState = /**
     * This function is called when the control status changes to or from "disabled".
     * Depending on the value, it will enable or disable the appropriate DOM element.
     *
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
        this._cd.markForCheck();
    };
    /**
     * @return {?}
     */
    TimepickerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.timepickerSub.unsubscribe();
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    TimepickerComponent.prototype._renderTime = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!isValidDate(value)) {
            this.hours = '';
            this.minutes = '';
            this.seconds = '';
            this.meridian = this.meridians[0];
            return;
        }
        /** @type {?} */
        var _value = parseTime(value);
        /** @type {?} */
        var _hoursPerDayHalf = 12;
        /** @type {?} */
        var _hours = _value.getHours();
        if (this.showMeridian) {
            this.meridian = this.meridians[_hours >= _hoursPerDayHalf ? 1 : 0];
            _hours = _hours % _hoursPerDayHalf;
            // should be 12 PM, not 00 PM
            if (_hours === 0) {
                _hours = _hoursPerDayHalf;
            }
        }
        this.hours = padNumber(_hours);
        this.minutes = padNumber(_value.getMinutes());
        this.seconds = padNumber(_value.getUTCSeconds());
    };
    TimepickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'timepicker',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [TIMEPICKER_CONTROL_VALUE_ACCESSOR, TimepickerStore],
                    template: "<table>\n  <tbody>\n  <tr class=\"text-center\" [hidden]=\"!showSpinners\">\n    <!-- increment hours button-->\n    <td>\n      <a class=\"btn btn-link\" [class.disabled]=\"!canIncrementHours || !isEditable\"\n         (click)=\"changeHours(hourStep)\"\n      ><span class=\"bs-chevron bs-chevron-up\"></span></a>\n    </td>\n    <!-- divider -->\n    <td *ngIf=\"showMinutes\">&nbsp;&nbsp;&nbsp;</td>\n    <!-- increment minutes button -->\n    <td *ngIf=\"showMinutes\">\n      <a class=\"btn btn-link\" [class.disabled]=\"!canIncrementMinutes || !isEditable\"\n         (click)=\"changeMinutes(minuteStep)\"\n      ><span class=\"bs-chevron bs-chevron-up\"></span></a>\n    </td>\n    <!-- divider -->\n    <td *ngIf=\"showSeconds\">&nbsp;</td>\n    <!-- increment seconds button -->\n    <td *ngIf=\"showSeconds\">\n      <a class=\"btn btn-link\" [class.disabled]=\"!canIncrementSeconds || !isEditable\"\n         (click)=\"changeSeconds(secondsStep)\">\n        <span class=\"bs-chevron bs-chevron-up\"></span>\n      </a>\n    </td>\n    <!-- space between -->\n    <td *ngIf=\"showMeridian\">&nbsp;&nbsp;&nbsp;</td>\n    <!-- meridian placeholder-->\n    <td *ngIf=\"showMeridian\"></td>\n  </tr>\n  <tr>\n    <!-- hours -->\n    <td class=\"form-group\" [class.has-error]=\"invalidHours\">\n      <input type=\"text\" [class.is-invalid]=\"invalidHours\"\n             class=\"form-control text-center bs-timepicker-field\"\n             placeholder=\"HH\"\n             maxlength=\"2\"\n             [readonly]=\"readonlyInput\"\n             [disabled]=\"disabled\"\n             [value]=\"hours\"\n             (wheel)=\"prevDef($event);changeHours(hourStep * wheelSign($event), 'wheel')\"\n             (keydown.ArrowUp)=\"changeHours(hourStep, 'key')\"\n             (keydown.ArrowDown)=\"changeHours(-hourStep, 'key')\"\n             (change)=\"updateHours($event.target.value)\"></td>\n    <!-- divider -->\n    <td *ngIf=\"showMinutes\">&nbsp;:&nbsp;</td>\n    <!-- minutes -->\n    <td class=\"form-group\" *ngIf=\"showMinutes\" [class.has-error]=\"invalidMinutes\">\n      <input type=\"text\" [class.is-invalid]=\"invalidMinutes\"\n             class=\"form-control text-center bs-timepicker-field\"\n             placeholder=\"MM\"\n             maxlength=\"2\"\n             [readonly]=\"readonlyInput\"\n             [disabled]=\"disabled\"\n             [value]=\"minutes\"\n             (wheel)=\"prevDef($event);changeMinutes(minuteStep * wheelSign($event), 'wheel')\"\n             (keydown.ArrowUp)=\"changeMinutes(minuteStep, 'key')\"\n             (keydown.ArrowDown)=\"changeMinutes(-minuteStep, 'key')\"\n             (change)=\"updateMinutes($event.target.value)\">\n    </td>\n    <!-- divider -->\n    <td *ngIf=\"showSeconds\">&nbsp;:&nbsp;</td>\n    <!-- seconds -->\n    <td class=\"form-group\" *ngIf=\"showSeconds\" [class.has-error]=\"invalidSeconds\">\n      <input type=\"text\" [class.is-invalid]=\"invalidSeconds\"\n             class=\"form-control text-center bs-timepicker-field\"\n             placeholder=\"SS\"\n             maxlength=\"2\"\n             [readonly]=\"readonlyInput\"\n             [disabled]=\"disabled\"\n             [value]=\"seconds\"\n             (wheel)=\"prevDef($event);changeSeconds(secondsStep * wheelSign($event), 'wheel')\"\n             (keydown.ArrowUp)=\"changeSeconds(secondsStep, 'key')\"\n             (keydown.ArrowDown)=\"changeSeconds(-secondsStep, 'key')\"\n             (change)=\"updateSeconds($event.target.value)\">\n    </td>\n    <!-- space between -->\n    <td *ngIf=\"showMeridian\">&nbsp;&nbsp;&nbsp;</td>\n    <!-- meridian -->\n    <td *ngIf=\"showMeridian\">\n      <button type=\"button\" class=\"btn btn-default text-center\"\n              [disabled]=\"!isEditable || !canToggleMeridian\"\n              [class.disabled]=\"!isEditable || !canToggleMeridian\"\n              (click)=\"toggleMeridian()\"\n      >{{ meridian }}\n      </button>\n    </td>\n  </tr>\n  <tr class=\"text-center\" [hidden]=\"!showSpinners\">\n    <!-- decrement hours button-->\n    <td>\n      <a class=\"btn btn-link\" [class.disabled]=\"!canDecrementHours || !isEditable\"\n         (click)=\"changeHours(-hourStep)\">\n        <span class=\"bs-chevron bs-chevron-down\"></span>\n      </a>\n    </td>\n    <!-- divider -->\n    <td *ngIf=\"showMinutes\">&nbsp;&nbsp;&nbsp;</td>\n    <!-- decrement minutes button-->\n    <td *ngIf=\"showMinutes\">\n      <a class=\"btn btn-link\" [class.disabled]=\"!canDecrementMinutes || !isEditable\"\n         (click)=\"changeMinutes(-minuteStep)\">\n        <span class=\"bs-chevron bs-chevron-down\"></span>\n      </a>\n    </td>\n    <!-- divider -->\n    <td *ngIf=\"showSeconds\">&nbsp;</td>\n    <!-- decrement seconds button-->\n    <td *ngIf=\"showSeconds\">\n      <a class=\"btn btn-link\" [class.disabled]=\"!canDecrementSeconds || !isEditable\"\n         (click)=\"changeSeconds(-secondsStep)\">\n        <span class=\"bs-chevron bs-chevron-down\"></span>\n      </a>\n    </td>\n    <!-- space between -->\n    <td *ngIf=\"showMeridian\">&nbsp;&nbsp;&nbsp;</td>\n    <!-- meridian placeholder-->\n    <td *ngIf=\"showMeridian\"></td>\n  </tr>\n  </tbody>\n</table>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: ["\n    .bs-chevron {\n      border-style: solid;\n      display: block;\n      width: 9px;\n      height: 9px;\n      position: relative;\n      border-width: 3px 0px 0 3px;\n    }\n\n    .bs-chevron-up {\n      -webkit-transform: rotate(45deg);\n      transform: rotate(45deg);\n      top: 2px;\n    }\n\n    .bs-chevron-down {\n      -webkit-transform: rotate(-135deg);\n      transform: rotate(-135deg);\n      top: -2px;\n    }\n\n    .bs-timepicker-field {\n      width: 50px;\n    }\n  "]
                }] }
    ];
    /** @nocollapse */
    TimepickerComponent.ctorParameters = function () { return [
        { type: TimepickerConfig },
        { type: ChangeDetectorRef },
        { type: TimepickerStore },
        { type: TimepickerActions }
    ]; };
    TimepickerComponent.propDecorators = {
        hourStep: [{ type: Input }],
        minuteStep: [{ type: Input }],
        secondsStep: [{ type: Input }],
        readonlyInput: [{ type: Input }],
        disabled: [{ type: Input }],
        mousewheel: [{ type: Input }],
        arrowkeys: [{ type: Input }],
        showSpinners: [{ type: Input }],
        showMeridian: [{ type: Input }],
        showMinutes: [{ type: Input }],
        showSeconds: [{ type: Input }],
        meridians: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        isValid: [{ type: Output }]
    };
    return TimepickerComponent;
}());
export { TimepickerComponent };
if (false) {
    /**
     * hours change step
     * @type {?}
     */
    TimepickerComponent.prototype.hourStep;
    /**
     * hours change step
     * @type {?}
     */
    TimepickerComponent.prototype.minuteStep;
    /**
     * seconds change step
     * @type {?}
     */
    TimepickerComponent.prototype.secondsStep;
    /**
     * if true hours and minutes fields will be readonly
     * @type {?}
     */
    TimepickerComponent.prototype.readonlyInput;
    /**
     * if true hours and minutes fields will be disabled
     * @type {?}
     */
    TimepickerComponent.prototype.disabled;
    /**
     * if true scroll inside hours and minutes inputs will change time
     * @type {?}
     */
    TimepickerComponent.prototype.mousewheel;
    /**
     * if true the values of hours and minutes can be changed using the up/down arrow keys on the keyboard
     * @type {?}
     */
    TimepickerComponent.prototype.arrowkeys;
    /**
     * if true spinner arrows above and below the inputs will be shown
     * @type {?}
     */
    TimepickerComponent.prototype.showSpinners;
    /**
     * if true meridian button will be shown
     * @type {?}
     */
    TimepickerComponent.prototype.showMeridian;
    /**
     * show minutes in timepicker
     * @type {?}
     */
    TimepickerComponent.prototype.showMinutes;
    /**
     * show seconds in timepicker
     * @type {?}
     */
    TimepickerComponent.prototype.showSeconds;
    /**
     * meridian labels based on locale
     * @type {?}
     */
    TimepickerComponent.prototype.meridians;
    /**
     * minimum time user can select
     * @type {?}
     */
    TimepickerComponent.prototype.min;
    /**
     * maximum time user can select
     * @type {?}
     */
    TimepickerComponent.prototype.max;
    /**
     * emits true if value is a valid date
     * @type {?}
     */
    TimepickerComponent.prototype.isValid;
    /** @type {?} */
    TimepickerComponent.prototype.hours;
    /** @type {?} */
    TimepickerComponent.prototype.minutes;
    /** @type {?} */
    TimepickerComponent.prototype.seconds;
    /** @type {?} */
    TimepickerComponent.prototype.meridian;
    /** @type {?} */
    TimepickerComponent.prototype.invalidHours;
    /** @type {?} */
    TimepickerComponent.prototype.invalidMinutes;
    /** @type {?} */
    TimepickerComponent.prototype.invalidSeconds;
    /** @type {?} */
    TimepickerComponent.prototype.canIncrementHours;
    /** @type {?} */
    TimepickerComponent.prototype.canIncrementMinutes;
    /** @type {?} */
    TimepickerComponent.prototype.canIncrementSeconds;
    /** @type {?} */
    TimepickerComponent.prototype.canDecrementHours;
    /** @type {?} */
    TimepickerComponent.prototype.canDecrementMinutes;
    /** @type {?} */
    TimepickerComponent.prototype.canDecrementSeconds;
    /** @type {?} */
    TimepickerComponent.prototype.canToggleMeridian;
    /** @type {?} */
    TimepickerComponent.prototype.onChange;
    /** @type {?} */
    TimepickerComponent.prototype.onTouched;
    /** @type {?} */
    TimepickerComponent.prototype.timepickerSub;
    /**
     * @type {?}
     * @private
     */
    TimepickerComponent.prototype._cd;
    /**
     * @type {?}
     * @private
     */
    TimepickerComponent.prototype._store;
    /**
     * @type {?}
     * @private
     */
    TimepickerComponent.prototype._timepickerActions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYm9vdHN0cmFwL3RpbWVwaWNrZXIvIiwic291cmNlcyI6WyJ0aW1lcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFHTCxNQUFNLEVBQ1MsaUJBQWlCLEVBQ2pDLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFRdkQsT0FBTyxFQUNMLFdBQVcsRUFDWCxTQUFTLEVBQ1QsU0FBUyxFQUNULFlBQVksRUFDWixnQkFBZ0IsRUFDaEIsa0JBQWtCLEVBQ2xCLGtCQUFrQixFQUNsQixpQkFBaUIsRUFDbEIsTUFBTSxvQkFBb0IsQ0FBQzs7QUFNNUIsTUFBTSxLQUFPLGlDQUFpQyxHQUE4QjtJQUMxRSxPQUFPLEVBQUUsaUJBQWlCOztJQUUxQixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsY0FBTSxPQUFBLG1CQUFtQixFQUFuQixDQUFtQixFQUFDO0lBQ2xELEtBQUssRUFBRSxJQUFJO0NBQ1o7QUFFRDtJQThHRSw2QkFDRSxPQUF5QixFQUNqQixHQUFzQixFQUN0QixNQUF1QixFQUN2QixrQkFBcUM7UUFKL0MsaUJBMkJDO1FBekJTLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLFdBQU0sR0FBTixNQUFNLENBQWlCO1FBQ3ZC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QzNCLGtEQUE2Qjs7SUFDN0Isa0RBQTZCOztJQUU3QixnREFBMkI7O0lBQzNCLGtEQUE2Qjs7SUFDN0Isa0RBQTZCOztJQUU3QixnREFBMkI7O0lBSTNCLHVDQUE4Qjs7SUFFOUIsd0NBQStCOztJQUUvQiw0Q0FBNEI7Ozs7O0lBSTFCLGtDQUE4Qjs7Ozs7SUFDOUIscUNBQStCOzs7OztJQUMvQixpREFBNkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZTpuby1mb3J3YXJkLXJlZiBtYXgtZmlsZS1saW5lLWNvdW50ICovXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcywgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgVGltZXBpY2tlckFjdGlvbnMgfSBmcm9tICcuL3JlZHVjZXIvdGltZXBpY2tlci5hY3Rpb25zJztcbmltcG9ydCB7IFRpbWVwaWNrZXJTdG9yZSB9IGZyb20gJy4vcmVkdWNlci90aW1lcGlja2VyLnN0b3JlJztcbmltcG9ydCB7IGdldENvbnRyb2xzVmFsdWUgfSBmcm9tICcuL3RpbWVwaWNrZXItY29udHJvbHMudXRpbCc7XG5pbXBvcnQgeyBUaW1lcGlja2VyQ29uZmlnIH0gZnJvbSAnLi90aW1lcGlja2VyLmNvbmZpZyc7XG5cbmltcG9ydCB7XG4gIFRpbWVDaGFuZ2VTb3VyY2UsXG4gIFRpbWVwaWNrZXJDb21wb25lbnRTdGF0ZSxcbiAgVGltZXBpY2tlckNvbnRyb2xzXG59IGZyb20gJy4vdGltZXBpY2tlci5tb2RlbHMnO1xuXG5pbXBvcnQge1xuICBpc1ZhbGlkRGF0ZSxcbiAgcGFkTnVtYmVyLFxuICBwYXJzZVRpbWUsXG4gIGlzSW5wdXRWYWxpZCxcbiAgaXNIb3VySW5wdXRWYWxpZCxcbiAgaXNNaW51dGVJbnB1dFZhbGlkLFxuICBpc1NlY29uZElucHV0VmFsaWQsXG4gIGlzSW5wdXRMaW1pdFZhbGlkXG59IGZyb20gJy4vdGltZXBpY2tlci51dGlscyc7XG5cbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3Nvck1vZGVsIH0gZnJvbSAnLi9tb2RlbHMnO1xuXG5leHBvcnQgY29uc3QgVElNRVBJQ0tFUl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBDb250cm9sVmFsdWVBY2Nlc3Nvck1vZGVsID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11c2UtYmVmb3JlLWRlY2xhcmUgKi9cbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVGltZXBpY2tlckNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aW1lcGlja2VyJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW1RJTUVQSUNLRVJfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUiwgVGltZXBpY2tlclN0b3JlXSxcbiAgdGVtcGxhdGVVcmw6ICcuL3RpbWVwaWNrZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZXM6IFtgXG4gICAgLmJzLWNoZXZyb24ge1xuICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgd2lkdGg6IDlweDtcbiAgICAgIGhlaWdodDogOXB4O1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgYm9yZGVyLXdpZHRoOiAzcHggMHB4IDAgM3B4O1xuICAgIH1cblxuICAgIC5icy1jaGV2cm9uLXVwIHtcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xuICAgICAgdG9wOiAycHg7XG4gICAgfVxuXG4gICAgLmJzLWNoZXZyb24tZG93biB7XG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC0xMzVkZWcpO1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTEzNWRlZyk7XG4gICAgICB0b3A6IC0ycHg7XG4gICAgfVxuXG4gICAgLmJzLXRpbWVwaWNrZXItZmllbGQge1xuICAgICAgd2lkdGg6IDUwcHg7XG4gICAgfVxuICBgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBUaW1lcGlja2VyQ29tcG9uZW50XG4gIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgVGltZXBpY2tlckNvbXBvbmVudFN0YXRlLFxuICAgIFRpbWVwaWNrZXJDb250cm9scyxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95IHtcbiAgLyoqIGhvdXJzIGNoYW5nZSBzdGVwICovXG4gIEBJbnB1dCgpIGhvdXJTdGVwOiBudW1iZXI7XG4gIC8qKiBob3VycyBjaGFuZ2Ugc3RlcCAqL1xuICBASW5wdXQoKSBtaW51dGVTdGVwOiBudW1iZXI7XG4gIC8qKiBzZWNvbmRzIGNoYW5nZSBzdGVwICovXG4gIEBJbnB1dCgpIHNlY29uZHNTdGVwOiBudW1iZXI7XG4gIC8qKiBpZiB0cnVlIGhvdXJzIGFuZCBtaW51dGVzIGZpZWxkcyB3aWxsIGJlIHJlYWRvbmx5ICovXG4gIEBJbnB1dCgpIHJlYWRvbmx5SW5wdXQ6IGJvb2xlYW47XG4gIC8qKiBpZiB0cnVlIGhvdXJzIGFuZCBtaW51dGVzIGZpZWxkcyB3aWxsIGJlIGRpc2FibGVkICovXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuICAvKiogaWYgdHJ1ZSBzY3JvbGwgaW5zaWRlIGhvdXJzIGFuZCBtaW51dGVzIGlucHV0cyB3aWxsIGNoYW5nZSB0aW1lICovXG4gIEBJbnB1dCgpIG1vdXNld2hlZWw6IGJvb2xlYW47XG4gIC8qKiBpZiB0cnVlIHRoZSB2YWx1ZXMgb2YgaG91cnMgYW5kIG1pbnV0ZXMgY2FuIGJlIGNoYW5nZWQgdXNpbmcgdGhlIHVwL2Rvd24gYXJyb3cga2V5cyBvbiB0aGUga2V5Ym9hcmQgKi9cbiAgQElucHV0KCkgYXJyb3drZXlzOiBib29sZWFuO1xuICAvKiogaWYgdHJ1ZSBzcGlubmVyIGFycm93cyBhYm92ZSBhbmQgYmVsb3cgdGhlIGlucHV0cyB3aWxsIGJlIHNob3duICovXG4gIEBJbnB1dCgpIHNob3dTcGlubmVyczogYm9vbGVhbjtcbiAgLyoqIGlmIHRydWUgbWVyaWRpYW4gYnV0dG9uIHdpbGwgYmUgc2hvd24gKi9cbiAgQElucHV0KCkgc2hvd01lcmlkaWFuOiBib29sZWFuO1xuICAvKiogc2hvdyBtaW51dGVzIGluIHRpbWVwaWNrZXIgKi9cbiAgQElucHV0KCkgc2hvd01pbnV0ZXM6IGJvb2xlYW47XG4gIC8qKiBzaG93IHNlY29uZHMgaW4gdGltZXBpY2tlciAqL1xuICBASW5wdXQoKSBzaG93U2Vjb25kczogYm9vbGVhbjtcbiAgLyoqIG1lcmlkaWFuIGxhYmVscyBiYXNlZCBvbiBsb2NhbGUgKi9cbiAgQElucHV0KCkgbWVyaWRpYW5zOiBzdHJpbmdbXTtcbiAgLyoqIG1pbmltdW0gdGltZSB1c2VyIGNhbiBzZWxlY3QgKi9cbiAgQElucHV0KCkgbWluOiBEYXRlO1xuICAvKiogbWF4aW11bSB0aW1lIHVzZXIgY2FuIHNlbGVjdCAqL1xuICBASW5wdXQoKSBtYXg6IERhdGU7XG5cbiAgLyoqIGVtaXRzIHRydWUgaWYgdmFsdWUgaXMgYSB2YWxpZCBkYXRlICovXG4gIEBPdXRwdXQoKSBpc1ZhbGlkID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIC8vIHVpIHZhcmlhYmxlc1xuICBob3Vyczogc3RyaW5nO1xuICBtaW51dGVzOiBzdHJpbmc7XG4gIHNlY29uZHM6IHN0cmluZztcbiAgbWVyaWRpYW46IHN0cmluZztcblxuICAvKiogQGRlcHJlY2F0ZWQgLSBwbGVhc2UgdXNlIGBpc0VkaXRhYmxlYCBpbnN0ZWFkICovXG4gIGdldCBpc1NwaW5uZXJzVmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zaG93U3Bpbm5lcnMgJiYgIXRoaXMucmVhZG9ubHlJbnB1dDtcbiAgfVxuXG4gIGdldCBpc0VkaXRhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhKHRoaXMucmVhZG9ubHlJbnB1dCB8fCB0aGlzLmRpc2FibGVkKTtcbiAgfVxuXG4gIC8vIG1pblxcbWF4IHZhbGlkYXRpb24gZm9yIGlucHV0IGZpZWxkc1xuICBpbnZhbGlkSG91cnMgPSBmYWxzZTtcbiAgaW52YWxpZE1pbnV0ZXMgPSBmYWxzZTtcbiAgaW52YWxpZFNlY29uZHMgPSBmYWxzZTtcblxuICAvLyB0aW1lIHBpY2tlciBjb250cm9scyBzdGF0ZVxuICBjYW5JbmNyZW1lbnRIb3VyczogYm9vbGVhbjtcbiAgY2FuSW5jcmVtZW50TWludXRlczogYm9vbGVhbjtcbiAgY2FuSW5jcmVtZW50U2Vjb25kczogYm9vbGVhbjtcblxuICBjYW5EZWNyZW1lbnRIb3VyczogYm9vbGVhbjtcbiAgY2FuRGVjcmVtZW50TWludXRlczogYm9vbGVhbjtcbiAgY2FuRGVjcmVtZW50U2Vjb25kczogYm9vbGVhbjtcblxuICBjYW5Ub2dnbGVNZXJpZGlhbjogYm9vbGVhbjtcblxuICAvLyBjb250cm9sIHZhbHVlIGFjY2Vzc29yIG1ldGhvZHNcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICBvbkNoYW5nZSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICBvblRvdWNoZWQgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG5cbiAgdGltZXBpY2tlclN1YjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIF9jb25maWc6IFRpbWVwaWNrZXJDb25maWcsXG4gICAgcHJpdmF0ZSBfY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgX3N0b3JlOiBUaW1lcGlja2VyU3RvcmUsXG4gICAgcHJpdmF0ZSBfdGltZXBpY2tlckFjdGlvbnM6IFRpbWVwaWNrZXJBY3Rpb25zXG4gICkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgX2NvbmZpZyk7XG5cbiAgICB0aGlzLnRpbWVwaWNrZXJTdWIgPSBfc3RvcmVcbiAgICAgIC5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUudmFsdWUpXG4gICAgICAuc3Vic2NyaWJlKCh2YWx1ZTogRGF0ZSkgPT4ge1xuICAgICAgICAvLyB1cGRhdGUgVUkgdmFsdWVzIGlmIGRhdGUgY2hhbmdlZFxuICAgICAgICB0aGlzLl9yZW5kZXJUaW1lKHZhbHVlKTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSk7XG5cbiAgICAgICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2goXG4gICAgICAgICAgdGhpcy5fdGltZXBpY2tlckFjdGlvbnMudXBkYXRlQ29udHJvbHMoZ2V0Q29udHJvbHNWYWx1ZSh0aGlzKSlcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgX3N0b3JlXG4gICAgICAuc2VsZWN0KHN0YXRlID0+IHN0YXRlLmNvbnRyb2xzKVxuICAgICAgLnN1YnNjcmliZSgoY29udHJvbHNTdGF0ZTogVGltZXBpY2tlckNvbnRyb2xzKSA9PiB7XG4gICAgICAgIHRoaXMuaXNWYWxpZC5lbWl0KGlzSW5wdXRWYWxpZCh0aGlzLmhvdXJzLCB0aGlzLm1pbnV0ZXMsIHRoaXMuc2Vjb25kcywgdGhpcy5pc1BNKCkpKTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBjb250cm9sc1N0YXRlKTtcbiAgICAgICAgX2NkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gIH1cblxuICByZXNldFZhbGlkYXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5pbnZhbGlkSG91cnMgPSBmYWxzZTtcbiAgICB0aGlzLmludmFsaWRNaW51dGVzID0gZmFsc2U7XG4gICAgdGhpcy5pbnZhbGlkU2Vjb25kcyA9IGZhbHNlO1xuICB9XG5cbiAgaXNQTSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zaG93TWVyaWRpYW4gJiYgdGhpcy5tZXJpZGlhbiA9PT0gdGhpcy5tZXJpZGlhbnNbMV07XG4gIH1cblxuICBwcmV2RGVmKCRldmVudDogRXZlbnQpIHtcbiAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIHdoZWVsU2lnbigkZXZlbnQ6IFdoZWVsRXZlbnRJbml0KTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5zaWduKCRldmVudC5kZWx0YVkpICogLTE7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2goXG4gICAgICB0aGlzLl90aW1lcGlja2VyQWN0aW9ucy51cGRhdGVDb250cm9scyhnZXRDb250cm9sc1ZhbHVlKHRoaXMpKVxuICAgICk7XG4gIH1cblxuICBjaGFuZ2VIb3VycyhzdGVwOiBudW1iZXIsIHNvdXJjZTogVGltZUNoYW5nZVNvdXJjZSA9ICcnKTogdm9pZCB7XG4gICAgdGhpcy5yZXNldFZhbGlkYXRpb24oKTtcbiAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaCh0aGlzLl90aW1lcGlja2VyQWN0aW9ucy5jaGFuZ2VIb3Vycyh7IHN0ZXAsIHNvdXJjZSB9KSk7XG4gIH1cblxuICBjaGFuZ2VNaW51dGVzKHN0ZXA6IG51bWJlciwgc291cmNlOiBUaW1lQ2hhbmdlU291cmNlID0gJycpOiB2b2lkIHtcbiAgICB0aGlzLnJlc2V0VmFsaWRhdGlvbigpO1xuICAgIHRoaXMuX3N0b3JlLmRpc3BhdGNoKFxuICAgICAgdGhpcy5fdGltZXBpY2tlckFjdGlvbnMuY2hhbmdlTWludXRlcyh7IHN0ZXAsIHNvdXJjZSB9KVxuICAgICk7XG4gIH1cblxuICBjaGFuZ2VTZWNvbmRzKHN0ZXA6IG51bWJlciwgc291cmNlOiBUaW1lQ2hhbmdlU291cmNlID0gJycpOiB2b2lkIHtcbiAgICB0aGlzLnJlc2V0VmFsaWRhdGlvbigpO1xuICAgIHRoaXMuX3N0b3JlLmRpc3BhdGNoKFxuICAgICAgdGhpcy5fdGltZXBpY2tlckFjdGlvbnMuY2hhbmdlU2Vjb25kcyh7IHN0ZXAsIHNvdXJjZSB9KVxuICAgICk7XG4gIH1cblxuICB1cGRhdGVIb3Vycyhob3Vyczogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5yZXNldFZhbGlkYXRpb24oKTtcbiAgICB0aGlzLmhvdXJzID0gaG91cnM7XG5cbiAgICBjb25zdCBpc1ZhbGlkID0gaXNIb3VySW5wdXRWYWxpZCh0aGlzLmhvdXJzLCB0aGlzLmlzUE0oKSkgJiYgdGhpcy5pc1ZhbGlkTGltaXQoKTtcblxuICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgdGhpcy5pbnZhbGlkSG91cnMgPSB0cnVlO1xuICAgICAgdGhpcy5pc1ZhbGlkLmVtaXQoZmFsc2UpO1xuICAgICAgdGhpcy5vbkNoYW5nZShudWxsKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3VwZGF0ZVRpbWUoKTtcbiAgfVxuXG4gIHVwZGF0ZU1pbnV0ZXMobWludXRlczogc3RyaW5nKSB7XG4gICAgdGhpcy5yZXNldFZhbGlkYXRpb24oKTtcbiAgICB0aGlzLm1pbnV0ZXMgPSBtaW51dGVzO1xuXG4gICAgY29uc3QgaXNWYWxpZCA9IGlzTWludXRlSW5wdXRWYWxpZCh0aGlzLm1pbnV0ZXMpICYmIHRoaXMuaXNWYWxpZExpbWl0KCk7XG5cbiAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgIHRoaXMuaW52YWxpZE1pbnV0ZXMgPSB0cnVlO1xuICAgICAgdGhpcy5pc1ZhbGlkLmVtaXQoZmFsc2UpO1xuICAgICAgdGhpcy5vbkNoYW5nZShudWxsKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3VwZGF0ZVRpbWUoKTtcbiAgfVxuXG4gIHVwZGF0ZVNlY29uZHMoc2Vjb25kczogc3RyaW5nKSB7XG4gICAgdGhpcy5yZXNldFZhbGlkYXRpb24oKTtcbiAgICB0aGlzLnNlY29uZHMgPSBzZWNvbmRzO1xuXG4gICAgY29uc3QgaXNWYWxpZCA9IGlzU2Vjb25kSW5wdXRWYWxpZCh0aGlzLnNlY29uZHMpICYmIHRoaXMuaXNWYWxpZExpbWl0KCk7XG5cbiAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgIHRoaXMuaW52YWxpZFNlY29uZHMgPSB0cnVlO1xuICAgICAgdGhpcy5pc1ZhbGlkLmVtaXQoZmFsc2UpO1xuICAgICAgdGhpcy5vbkNoYW5nZShudWxsKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3VwZGF0ZVRpbWUoKTtcbiAgfVxuXG4gIGlzVmFsaWRMaW1pdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNJbnB1dExpbWl0VmFsaWQoe1xuICAgICAgaG91cjogdGhpcy5ob3VycyxcbiAgICAgIG1pbnV0ZTogdGhpcy5taW51dGVzLFxuICAgICAgc2Vjb25kczogdGhpcy5zZWNvbmRzLFxuICAgICAgaXNQTTogdGhpcy5pc1BNKClcbiAgICB9LCB0aGlzLm1heCwgdGhpcy5taW4pO1xuICB9XG5cbiAgX3VwZGF0ZVRpbWUoKSB7XG4gICAgY29uc3QgX3NlY29uZHMgPSB0aGlzLnNob3dTZWNvbmRzID8gdGhpcy5zZWNvbmRzIDogdm9pZCAwO1xuICAgIGNvbnN0IF9taW51dGVzID0gdGhpcy5zaG93TWludXRlcyA/IHRoaXMubWludXRlcyA6IHZvaWQgMDtcbiAgICBpZiAoIWlzSW5wdXRWYWxpZCh0aGlzLmhvdXJzLCBfbWludXRlcywgX3NlY29uZHMsIHRoaXMuaXNQTSgpKSkge1xuICAgICAgdGhpcy5pc1ZhbGlkLmVtaXQoZmFsc2UpO1xuICAgICAgdGhpcy5vbkNoYW5nZShudWxsKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3N0b3JlLmRpc3BhdGNoKFxuICAgICAgdGhpcy5fdGltZXBpY2tlckFjdGlvbnMuc2V0VGltZSh7XG4gICAgICAgIGhvdXI6IHRoaXMuaG91cnMsXG4gICAgICAgIG1pbnV0ZTogdGhpcy5taW51dGVzLFxuICAgICAgICBzZWNvbmRzOiB0aGlzLnNlY29uZHMsXG4gICAgICAgIGlzUE06IHRoaXMuaXNQTSgpXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICB0b2dnbGVNZXJpZGlhbigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuc2hvd01lcmlkaWFuIHx8ICF0aGlzLmlzRWRpdGFibGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBfaG91cnNQZXJEYXlIYWxmID0gMTI7XG4gICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2goXG4gICAgICB0aGlzLl90aW1lcGlja2VyQWN0aW9ucy5jaGFuZ2VIb3Vycyh7XG4gICAgICAgIHN0ZXA6IF9ob3Vyc1BlckRheUhhbGYsXG4gICAgICAgIHNvdXJjZTogJydcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcml0ZSBhIG5ldyB2YWx1ZSB0byB0aGUgZWxlbWVudC5cbiAgICovXG4gIHdyaXRlVmFsdWUob2JqOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkIHwgRGF0ZSk6IHZvaWQge1xuICAgIGlmIChpc1ZhbGlkRGF0ZShvYmopKSB7XG4gICAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaCh0aGlzLl90aW1lcGlja2VyQWN0aW9ucy53cml0ZVZhbHVlKHBhcnNlVGltZShvYmopKSk7XG4gICAgfSBlbHNlIGlmIChvYmogPT0gbnVsbCkge1xuICAgICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2godGhpcy5fdGltZXBpY2tlckFjdGlvbnMud3JpdGVWYWx1ZShudWxsKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gdGhlIGNvbnRyb2wgcmVjZWl2ZXMgYSBjaGFuZ2UgZXZlbnQuXG4gICAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBhbnkpID0+IHt9KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gdGhlIGNvbnRyb2wgcmVjZWl2ZXMgYSB0b3VjaCBldmVudC5cbiAgICovXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB7fSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiB0aGUgY29udHJvbCBzdGF0dXMgY2hhbmdlcyB0byBvciBmcm9tIFwiZGlzYWJsZWRcIi5cbiAgICogRGVwZW5kaW5nIG9uIHRoZSB2YWx1ZSwgaXQgd2lsbCBlbmFibGUgb3IgZGlzYWJsZSB0aGUgYXBwcm9wcmlhdGUgRE9NIGVsZW1lbnQuXG4gICAqXG4gICAqIEBwYXJhbSBpc0Rpc2FibGVkXG4gICAqL1xuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB0aGlzLl9jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMudGltZXBpY2tlclN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVuZGVyVGltZSh2YWx1ZTogc3RyaW5nIHwgRGF0ZSk6IHZvaWQge1xuICAgIGlmICghaXNWYWxpZERhdGUodmFsdWUpKSB7XG4gICAgICB0aGlzLmhvdXJzID0gJyc7XG4gICAgICB0aGlzLm1pbnV0ZXMgPSAnJztcbiAgICAgIHRoaXMuc2Vjb25kcyA9ICcnO1xuICAgICAgdGhpcy5tZXJpZGlhbiA9IHRoaXMubWVyaWRpYW5zWzBdO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgX3ZhbHVlID0gcGFyc2VUaW1lKHZhbHVlKTtcbiAgICBjb25zdCBfaG91cnNQZXJEYXlIYWxmID0gMTI7XG4gICAgbGV0IF9ob3VycyA9IF92YWx1ZS5nZXRIb3VycygpO1xuXG4gICAgaWYgKHRoaXMuc2hvd01lcmlkaWFuKSB7XG4gICAgICB0aGlzLm1lcmlkaWFuID0gdGhpcy5tZXJpZGlhbnNbX2hvdXJzID49IF9ob3Vyc1BlckRheUhhbGYgPyAxIDogMF07XG4gICAgICBfaG91cnMgPSBfaG91cnMgJSBfaG91cnNQZXJEYXlIYWxmO1xuICAgICAgLy8gc2hvdWxkIGJlIDEyIFBNLCBub3QgMDAgUE1cbiAgICAgIGlmIChfaG91cnMgPT09IDApIHtcbiAgICAgICAgX2hvdXJzID0gX2hvdXJzUGVyRGF5SGFsZjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmhvdXJzID0gcGFkTnVtYmVyKF9ob3Vycyk7XG4gICAgdGhpcy5taW51dGVzID0gcGFkTnVtYmVyKF92YWx1ZS5nZXRNaW51dGVzKCkpO1xuICAgIHRoaXMuc2Vjb25kcyA9IHBhZE51bWJlcihfdmFsdWUuZ2V0VVRDU2Vjb25kcygpKTtcbiAgfVxufVxuIl19