/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, EventEmitter, Renderer2 } from '@angular/core';
import { BsDatepickerAbstractComponent } from '../../base/bs-datepicker-container';
import { BsDatepickerConfig } from '../../bs-datepicker.config';
import { BsDatepickerActions } from '../../reducer/bs-datepicker.actions';
import { BsDatepickerEffects } from '../../reducer/bs-datepicker.effects';
import { BsDatepickerStore } from '../../reducer/bs-datepicker.store';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { datepickerAnimation } from '../../datepicker-animations';
import { take } from 'rxjs/operators';
var BsDatepickerContainerComponent = /** @class */ (function (_super) {
    tslib_1.__extends(BsDatepickerContainerComponent, _super);
    function BsDatepickerContainerComponent(_renderer, _config, _store, _element, _actions, _effects, _positionService) {
        var _this = _super.call(this) || this;
        _this._config = _config;
        _this._store = _store;
        _this._element = _element;
        _this._actions = _actions;
        _this._positionService = _positionService;
        _this.valueChange = new EventEmitter();
        _this.animationState = 'void';
        _this._subs = [];
        _this._effects = _effects;
        _renderer.setStyle(_element.nativeElement, 'display', 'block');
        _renderer.setStyle(_element.nativeElement, 'position', 'absolute');
        return _this;
    }
    Object.defineProperty(BsDatepickerContainerComponent.prototype, "value", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._effects.setValue(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    BsDatepickerContainerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._positionService.setOptions({
            modifiers: { flip: { enabled: this._config.adaptivePosition } },
            allowedPositions: ['top', 'bottom']
        });
        this._positionService.event$
            .pipe(take(1))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this._positionService.disable();
            if (_this._config.isAnimated) {
                _this.animationState = _this.isTopPosition ? 'animated-up' : 'animated-down';
                return;
            }
            _this.animationState = 'unanimated';
        }));
        this.isOtherMonthsActive = this._config.selectFromOtherMonth;
        this.containerClass = this._config.containerClass;
        this._effects
            .init(this._store)
            // intial state options
            .setOptions(this._config)
            // data binding view --> model
            .setBindings(this)
            // set event handlers
            .setEventHandlers(this)
            .registerDatepickerSideEffects();
        // todo: move it somewhere else
        // on selected date change
        this._subs.push(this._store
            /* tslint:disable-next-line: no-any */
            .select((/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return state.selectedDate; }))
            /* tslint:disable-next-line: no-any */
            .subscribe((/**
         * @param {?} date
         * @return {?}
         */
        function (date) { return _this.valueChange.emit(date); })));
    };
    Object.defineProperty(BsDatepickerContainerComponent.prototype, "isTopPosition", {
        get: /**
         * @return {?}
         */
        function () {
            return this._element.nativeElement.classList.contains('top');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    BsDatepickerContainerComponent.prototype.positionServiceEnable = /**
     * @return {?}
     */
    function () {
        this._positionService.enable();
    };
    /**
     * @param {?} day
     * @return {?}
     */
    BsDatepickerContainerComponent.prototype.daySelectHandler = /**
     * @param {?} day
     * @return {?}
     */
    function (day) {
        /** @type {?} */
        var isDisabled = this.isOtherMonthsActive ? day.isDisabled : (day.isOtherMonth || day.isDisabled);
        if (isDisabled) {
            return;
        }
        this._store.dispatch(this._actions.select(day.date));
    };
    /**
     * @return {?}
     */
    BsDatepickerContainerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        var e_1, _a;
        try {
            for (var _b = tslib_1.__values(this._subs), _c = _b.next(); !_c.done; _c = _b.next()) {
                var sub = _c.value;
                sub.unsubscribe();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this._effects.destroy();
    };
    BsDatepickerContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'bs-datepicker-container',
                    providers: [BsDatepickerStore, BsDatepickerEffects],
                    template: "<!-- days calendar view mode -->\n<div class=\"bs-datepicker\" [ngClass]=\"containerClass\" *ngIf=\"viewMode | async\">\n  <div\n    class=\"bs-datepicker-container\"\n    [@datepickerAnimation]=\"animationState\"\n    (@datepickerAnimation.done)=\"positionServiceEnable()\">\n    <!--calendars-->\n    <div class=\"bs-calendar-container\" [ngSwitch]=\"viewMode | async\" role=\"application\">\n      <!--days calendar-->\n      <div *ngSwitchCase=\"'day'\" class=\"bs-media-container\">\n        <bs-days-calendar-view\n          *ngFor=\"let calendar of (daysCalendar | async)\"\n          [class.bs-datepicker-multiple]=\"(daysCalendar | async)?.length > 1\"\n          [calendar]=\"calendar\"\n          [options]=\"options | async\"\n          (onNavigate)=\"navigateTo($event)\"\n          (onViewMode)=\"setViewMode($event)\"\n          (onHover)=\"dayHoverHandler($event)\"\n          (onHoverWeek)=\"weekHoverHandler($event)\"\n          (onSelect)=\"daySelectHandler($event)\"\n        ></bs-days-calendar-view>\n      </div>\n\n      <!--months calendar-->\n      <div *ngSwitchCase=\"'month'\" class=\"bs-media-container\">\n        <bs-month-calendar-view\n          *ngFor=\"let calendar of (monthsCalendar | async)\"\n          [class.bs-datepicker-multiple]=\"(daysCalendar | async)?.length > 1\"\n          [calendar]=\"calendar\"\n          (onNavigate)=\"navigateTo($event)\"\n          (onViewMode)=\"setViewMode($event)\"\n          (onHover)=\"monthHoverHandler($event)\"\n          (onSelect)=\"monthSelectHandler($event)\"\n        ></bs-month-calendar-view>\n      </div>\n\n      <!--years calendar-->\n      <div *ngSwitchCase=\"'year'\" class=\"bs-media-container\">\n        <bs-years-calendar-view\n        *ngFor=\"let calendar of (yearsCalendar | async)\"\n        [class.bs-datepicker-multiple]=\"(daysCalendar | async )?.length > 1\"\n        [calendar]=\"calendar\"\n        (onNavigate)=\"navigateTo($event)\"\n        (onViewMode)=\"setViewMode($event)\"\n        (onHover)=\"yearHoverHandler($event)\"\n        (onSelect)=\"yearSelectHandler($event)\"\n      ></bs-years-calendar-view>\n    </div>\n\n  </div>\n\n  <!--applycancel buttons-->\n    <div class=\"bs-datepicker-buttons\" *ngIf=\"false\">\n      <button class=\"btn btn-success\">Apply</button>\n      <button class=\"btn btn-default\">Cancel</button>\n    </div>\n\n  </div>\n\n  <!--custom dates or date ranges picker-->\n  <div class=\"bs-datepicker-custom-range\" *ngIf=\"false\">\n    <bs-custom-date-view [ranges]=\"_customRangesFish\"></bs-custom-date-view>\n  </div>\n</div>\n",
                    host: {
                        class: 'bottom',
                        '(click)': '_stopPropagation($event)',
                        role: 'dialog',
                        'aria-label': 'calendar'
                    },
                    animations: [datepickerAnimation]
                }] }
    ];
    /** @nocollapse */
    BsDatepickerContainerComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: BsDatepickerConfig },
        { type: BsDatepickerStore },
        { type: ElementRef },
        { type: BsDatepickerActions },
        { type: BsDatepickerEffects },
        { type: PositioningService }
    ]; };
    return BsDatepickerContainerComponent;
}(BsDatepickerAbstractComponent));
export { BsDatepickerContainerComponent };
if (false) {
    /** @type {?} */
    BsDatepickerContainerComponent.prototype.valueChange;
    /** @type {?} */
    BsDatepickerContainerComponent.prototype.animationState;
    /** @type {?} */
    BsDatepickerContainerComponent.prototype._subs;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerContainerComponent.prototype._config;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerContainerComponent.prototype._store;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerContainerComponent.prototype._element;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerContainerComponent.prototype._actions;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerContainerComponent.prototype._positionService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZGF0ZXBpY2tlci1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWJvb3RzdHJhcC9kYXRlcGlja2VyLyIsInNvdXJjZXMiOlsidGhlbWVzL2JzL2JzLWRhdGVwaWNrZXItY29udGFpbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBcUIsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWxHLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRWhFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRy9ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0QztJQVlvRCwwREFBNkI7SUFXL0Usd0NBQ0UsU0FBb0IsRUFDWixPQUEyQixFQUMzQixNQUF5QixFQUN6QixRQUFvQixFQUNwQixRQUE2QixFQUNyQyxRQUE2QixFQUNyQixnQkFBb0M7UUFQOUMsWUFTRSxpQkFBTyxTQUtSO1FBWlMsYUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsWUFBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDekIsY0FBUSxHQUFSLFFBQVEsQ0FBWTtRQUNwQixjQUFRLEdBQVIsUUFBUSxDQUFxQjtRQUU3QixzQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQW9CO1FBWDlDLGlC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REFBbUM7Ozs7O0lBQ25DLGdEQUFpQzs7Ozs7SUFDakMsa0RBQTRCOzs7OztJQUM1QixrREFBcUM7Ozs7O0lBRXJDLDBEQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3ksIE9uSW5pdCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEJzRGF0ZXBpY2tlckFic3RyYWN0Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vYmFzZS9icy1kYXRlcGlja2VyLWNvbnRhaW5lcic7XG5pbXBvcnQgeyBCc0RhdGVwaWNrZXJDb25maWcgfSBmcm9tICcuLi8uLi9icy1kYXRlcGlja2VyLmNvbmZpZyc7XG5pbXBvcnQgeyBEYXlWaWV3TW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMnO1xuaW1wb3J0IHsgQnNEYXRlcGlja2VyQWN0aW9ucyB9IGZyb20gJy4uLy4uL3JlZHVjZXIvYnMtZGF0ZXBpY2tlci5hY3Rpb25zJztcbmltcG9ydCB7IEJzRGF0ZXBpY2tlckVmZmVjdHMgfSBmcm9tICcuLi8uLi9yZWR1Y2VyL2JzLWRhdGVwaWNrZXIuZWZmZWN0cyc7XG5pbXBvcnQgeyBCc0RhdGVwaWNrZXJTdG9yZSB9IGZyb20gJy4uLy4uL3JlZHVjZXIvYnMtZGF0ZXBpY2tlci5zdG9yZSc7XG5pbXBvcnQgeyBQb3NpdGlvbmluZ1NlcnZpY2UgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3Bvc2l0aW9uaW5nJztcblxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkYXRlcGlja2VyQW5pbWF0aW9uIH0gZnJvbSAnLi4vLi4vZGF0ZXBpY2tlci1hbmltYXRpb25zJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JzLWRhdGVwaWNrZXItY29udGFpbmVyJyxcbiAgcHJvdmlkZXJzOiBbQnNEYXRlcGlja2VyU3RvcmUsIEJzRGF0ZXBpY2tlckVmZmVjdHNdLFxuICB0ZW1wbGF0ZVVybDogJy4vYnMtZGF0ZXBpY2tlci12aWV3Lmh0bWwnLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdib3R0b20nLFxuICAgICcoY2xpY2spJzogJ19zdG9wUHJvcGFnYXRpb24oJGV2ZW50KScsXG4gICAgcm9sZTogJ2RpYWxvZycsXG4gICAgJ2FyaWEtbGFiZWwnOiAnY2FsZW5kYXInXG4gIH0sXG4gIGFuaW1hdGlvbnM6IFtkYXRlcGlja2VyQW5pbWF0aW9uXVxufSlcbmV4cG9ydCBjbGFzcyBCc0RhdGVwaWNrZXJDb250YWluZXJDb21wb25lbnQgZXh0ZW5kcyBCc0RhdGVwaWNrZXJBYnN0cmFjdENvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBzZXQgdmFsdWUodmFsdWU6IERhdGUpIHtcbiAgICB0aGlzLl9lZmZlY3RzLnNldFZhbHVlKHZhbHVlKTtcbiAgfVxuXG4gIHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPERhdGU+KCk7XG4gIGFuaW1hdGlvblN0YXRlID0gJ3ZvaWQnO1xuXG4gIF9zdWJzOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICBjb25zdHJ1Y3RvcihcbiAgICBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIF9jb25maWc6IEJzRGF0ZXBpY2tlckNvbmZpZyxcbiAgICBwcml2YXRlIF9zdG9yZTogQnNEYXRlcGlja2VyU3RvcmUsXG4gICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9hY3Rpb25zOiBCc0RhdGVwaWNrZXJBY3Rpb25zLFxuICAgIF9lZmZlY3RzOiBCc0RhdGVwaWNrZXJFZmZlY3RzLFxuICAgIHByaXZhdGUgX3Bvc2l0aW9uU2VydmljZTogUG9zaXRpb25pbmdTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fZWZmZWN0cyA9IF9lZmZlY3RzO1xuXG4gICAgX3JlbmRlcmVyLnNldFN0eWxlKF9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgX3JlbmRlcmVyLnNldFN0eWxlKF9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdwb3NpdGlvbicsICdhYnNvbHV0ZScpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fcG9zaXRpb25TZXJ2aWNlLnNldE9wdGlvbnMoe1xuICAgICAgbW9kaWZpZXJzOiB7IGZsaXA6IHsgZW5hYmxlZDogdGhpcy5fY29uZmlnLmFkYXB0aXZlUG9zaXRpb24gfSB9LFxuICAgICAgYWxsb3dlZFBvc2l0aW9uczogWyd0b3AnLCAnYm90dG9tJ11cbiAgICB9KTtcblxuICAgIHRoaXMuX3Bvc2l0aW9uU2VydmljZS5ldmVudCRcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlKDEpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5fcG9zaXRpb25TZXJ2aWNlLmRpc2FibGUoKTtcblxuICAgICAgICBpZiAodGhpcy5fY29uZmlnLmlzQW5pbWF0ZWQpIHtcbiAgICAgICAgICB0aGlzLmFuaW1hdGlvblN0YXRlID0gdGhpcy5pc1RvcFBvc2l0aW9uID8gJ2FuaW1hdGVkLXVwJyA6ICdhbmltYXRlZC1kb3duJztcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uU3RhdGUgPSAndW5hbmltYXRlZCc7XG4gICAgICB9KTtcblxuICAgIHRoaXMuaXNPdGhlck1vbnRoc0FjdGl2ZSA9IHRoaXMuX2NvbmZpZy5zZWxlY3RGcm9tT3RoZXJNb250aDtcbiAgICB0aGlzLmNvbnRhaW5lckNsYXNzID0gdGhpcy5fY29uZmlnLmNvbnRhaW5lckNsYXNzO1xuICAgIHRoaXMuX2VmZmVjdHNcbiAgICAgIC5pbml0KHRoaXMuX3N0b3JlKVxuICAgICAgLy8gaW50aWFsIHN0YXRlIG9wdGlvbnNcbiAgICAgIC5zZXRPcHRpb25zKHRoaXMuX2NvbmZpZylcbiAgICAgIC8vIGRhdGEgYmluZGluZyB2aWV3IC0tPiBtb2RlbFxuICAgICAgLnNldEJpbmRpbmdzKHRoaXMpXG4gICAgICAvLyBzZXQgZXZlbnQgaGFuZGxlcnNcbiAgICAgIC5zZXRFdmVudEhhbmRsZXJzKHRoaXMpXG4gICAgICAucmVnaXN0ZXJEYXRlcGlja2VyU2lkZUVmZmVjdHMoKTtcblxuICAgIC8vIHRvZG86IG1vdmUgaXQgc29tZXdoZXJlIGVsc2VcbiAgICAvLyBvbiBzZWxlY3RlZCBkYXRlIGNoYW5nZVxuICAgIHRoaXMuX3N1YnMucHVzaChcbiAgICAgIHRoaXMuX3N0b3JlXG4gICAgICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW55ICovXG4gICAgICAgIC5zZWxlY3QoKHN0YXRlOiBhbnkpID0+IHN0YXRlLnNlbGVjdGVkRGF0ZSlcbiAgICAgICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbnkgKi9cbiAgICAgICAgLnN1YnNjcmliZSgoZGF0ZTogYW55KSA9PiB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQoZGF0ZSkpXG4gICAgKTtcbiAgfVxuXG4gIGdldCBpc1RvcFBvc2l0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0b3AnKTtcbiAgfVxuXG4gIHBvc2l0aW9uU2VydmljZUVuYWJsZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9wb3NpdGlvblNlcnZpY2UuZW5hYmxlKCk7XG4gIH1cblxuICBkYXlTZWxlY3RIYW5kbGVyKGRheTogRGF5Vmlld01vZGVsKTogdm9pZCB7XG4gICAgY29uc3QgaXNEaXNhYmxlZCA9IHRoaXMuaXNPdGhlck1vbnRoc0FjdGl2ZSA/IGRheS5pc0Rpc2FibGVkIDogKGRheS5pc090aGVyTW9udGggfHwgZGF5LmlzRGlzYWJsZWQpO1xuXG4gICAgaWYgKGlzRGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaCh0aGlzLl9hY3Rpb25zLnNlbGVjdChkYXkuZGF0ZSkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBzdWIgb2YgdGhpcy5fc3Vicykge1xuICAgICAgc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIHRoaXMuX2VmZmVjdHMuZGVzdHJveSgpO1xuICB9XG59XG4iXX0=