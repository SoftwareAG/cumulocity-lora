/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Host, HostBinding, Input } from '@angular/core';
import { ProgressbarComponent } from './progressbar.component';
import { isBs3 } from 'ngx-bootstrap/utils';
// todo: number pipe
// todo: use query from progress?
var BarComponent = /** @class */ (function () {
    function BarComponent(progress) {
        this.percent = 0;
        this.progress = progress;
    }
    Object.defineProperty(BarComponent.prototype, "value", {
        /** current value of progress bar */
        get: /**
         * current value of progress bar
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (!v && v !== 0) {
                return;
            }
            this._value = v;
            this.recalculatePercentage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BarComponent.prototype, "setBarWidth", {
        get: /**
         * @return {?}
         */
        function () {
            this.recalculatePercentage();
            return this.percent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BarComponent.prototype, "isBs3", {
        get: /**
         * @return {?}
         */
        function () {
            return isBs3();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    BarComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.progress.addBar(this);
    };
    /**
     * @return {?}
     */
    BarComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.progress.removeBar(this);
    };
    /**
     * @return {?}
     */
    BarComponent.prototype.recalculatePercentage = /**
     * @return {?}
     */
    function () {
        this.percent = +(this.value / this.progress.max * 100).toFixed(2);
        /** @type {?} */
        var totalPercentage = this.progress.bars
            .reduce((/**
         * @param {?} total
         * @param {?} bar
         * @return {?}
         */
        function (total, bar) {
            return total + bar.percent;
        }), 0);
        if (totalPercentage > 100) {
            this.percent -= totalPercentage - 100;
        }
    };
    BarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'bar',
                    template: "<ng-content></ng-content>\n",
                    host: {
                        role: 'progressbar',
                        'aria-valuemin': '0',
                        '[class]': '"progress-bar " + (type ? "progress-bar-" + type + " bg-" + type : "")',
                        '[class.progress-bar-animated]': '!isBs3 && animate',
                        '[class.progress-bar-striped]': 'striped',
                        '[class.active]': 'isBs3 && animate',
                        '[attr.aria-valuenow]': 'value',
                        '[attr.aria-valuetext]': 'percent ? percent.toFixed(0) + "%" : ""',
                        '[attr.aria-valuemax]': 'max',
                        '[style.height.%]': '"100"'
                    }
                }] }
    ];
    /** @nocollapse */
    BarComponent.ctorParameters = function () { return [
        { type: ProgressbarComponent, decorators: [{ type: Host }] }
    ]; };
    BarComponent.propDecorators = {
        type: [{ type: Input }],
        value: [{ type: Input }],
        setBarWidth: [{ type: HostBinding, args: ['style.width.%',] }]
    };
    return BarComponent;
}());
export { BarComponent };
if (false) {
    /** @type {?} */
    BarComponent.prototype.max;
    /**
     * provide one of the four supported contextual classes: `success`, `info`, `warning`, `danger`
     * @type {?}
     */
    BarComponent.prototype.type;
    /** @type {?} */
    BarComponent.prototype.striped;
    /** @type {?} */
    BarComponent.prototype.animate;
    /** @type {?} */
    BarComponent.prototype.percent;
    /** @type {?} */
    BarComponent.prototype.progress;
    /**
     * @type {?}
     * @protected
     */
    BarComponent.prototype._value;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1ib290c3RyYXAvcHJvZ3Jlc3NiYXIvIiwic291cmNlcyI6WyJiYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULElBQUksRUFDSixXQUFXLEVBQ1gsS0FBSyxFQUdOLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7O0FBSTVDO0lBc0RFLHNCQUFvQixRQUE4QjtRQUxsRCxZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBTVYsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQWpDRCxzQkFDSSwrQkFBSztRQUZULG9DQUFvQzs7Ozs7UUFDcEM7WUFFRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQzs7Ozs7UUFFRCxVQUFVLENBQVM7WUFDakIsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNqQixPQUFPO2FBQ1I7WUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUMvQixDQUFDOzs7T0FSQTtJQVVELHNCQUNJLHFDQUFXOzs7O1FBRGY7WUFFRSxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUU3QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSwrQkFBSzs7OztRQUFUO1lBQ0UsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNqQixDQUFDOzs7T0FBQTs7OztJQWFELCtCQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFRCxrQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDOzs7O0lBRUQsNENBQXFCOzs7SUFBckI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFFNUQsZUFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSTthQUN2QyxNQUFNOzs7OztRQUFDLFVBQVUsS0FBYSxFQUFFLEdBQWlCO1lBQ2hELE9BQU8sS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFDN0IsQ0FBQyxHQUFFLENBQUMsQ0FBQztRQUVQLElBQUksZUFBZSxHQUFHLEdBQUcsRUFBRTtZQUN6QixJQUFJLENBQUMsT0FBTyxJQUFJLGVBQWUsR0FBRyxHQUFHLENBQUM7U0FDdkM7SUFDSCxDQUFDOztnQkE3RUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxLQUFLO29CQUNmLHVDQUFtQztvQkFDbkMsSUFBSSxFQUFFO3dCQUNKLElBQUksRUFBRSxhQUFhO3dCQUNuQixlQUFlLEVBQUUsR0FBRzt3QkFDcEIsU0FBUyxFQUFFLHdFQUF3RTt3QkFDbkYsK0JBQStCLEVBQUUsbUJBQW1CO3dCQUNwRCw4QkFBOEIsRUFBRSxTQUFTO3dCQUN6QyxnQkFBZ0IsRUFBRSxrQkFBa0I7d0JBQ3BDLHNCQUFzQixFQUFFLE9BQU87d0JBQy9CLHVCQUF1QixFQUFFLHlDQUF5Qzt3QkFDbEUsc0JBQXNCLEVBQUUsS0FBSzt3QkFDN0Isa0JBQWtCLEVBQUUsT0FBTztxQkFDNUI7aUJBQ0Y7Ozs7Z0JBcEJRLG9CQUFvQix1QkEyRGQsSUFBSTs7O3VCQWxDaEIsS0FBSzt3QkFHTCxLQUFLOzhCQWFMLFdBQVcsU0FBQyxlQUFlOztJQTBDOUIsbUJBQUM7Q0FBQSxBQTlFRCxJQThFQztTQTlEWSxZQUFZOzs7SUFDdkIsMkJBQVk7Ozs7O0lBR1osNEJBQXNCOztJQTJCdEIsK0JBQWlCOztJQUNqQiwrQkFBaUI7O0lBQ2pCLCtCQUFZOztJQUNaLGdDQUErQjs7Ozs7SUFFL0IsOEJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBIb3N0LFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQcm9ncmVzc2JhckNvbXBvbmVudCB9IGZyb20gJy4vcHJvZ3Jlc3NiYXIuY29tcG9uZW50JztcbmltcG9ydCB7IGlzQnMzIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC91dGlscyc7XG5cbi8vIHRvZG86IG51bWJlciBwaXBlXG4vLyB0b2RvOiB1c2UgcXVlcnkgZnJvbSBwcm9ncmVzcz9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JhcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9iYXIuY29tcG9uZW50Lmh0bWwnLFxuICBob3N0OiB7XG4gICAgcm9sZTogJ3Byb2dyZXNzYmFyJyxcbiAgICAnYXJpYS12YWx1ZW1pbic6ICcwJyxcbiAgICAnW2NsYXNzXSc6ICdcInByb2dyZXNzLWJhciBcIiArICh0eXBlID8gXCJwcm9ncmVzcy1iYXItXCIgKyB0eXBlICsgXCIgYmctXCIgKyB0eXBlIDogXCJcIiknLFxuICAgICdbY2xhc3MucHJvZ3Jlc3MtYmFyLWFuaW1hdGVkXSc6ICchaXNCczMgJiYgYW5pbWF0ZScsXG4gICAgJ1tjbGFzcy5wcm9ncmVzcy1iYXItc3RyaXBlZF0nOiAnc3RyaXBlZCcsXG4gICAgJ1tjbGFzcy5hY3RpdmVdJzogJ2lzQnMzICYmIGFuaW1hdGUnLFxuICAgICdbYXR0ci5hcmlhLXZhbHVlbm93XSc6ICd2YWx1ZScsXG4gICAgJ1thdHRyLmFyaWEtdmFsdWV0ZXh0XSc6ICdwZXJjZW50ID8gcGVyY2VudC50b0ZpeGVkKDApICsgXCIlXCIgOiBcIlwiJyxcbiAgICAnW2F0dHIuYXJpYS12YWx1ZW1heF0nOiAnbWF4JyxcbiAgICAnW3N0eWxlLmhlaWdodC4lXSc6ICdcIjEwMFwiJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIEJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgbWF4OiBudW1iZXI7XG5cbiAgLyoqIHByb3ZpZGUgb25lIG9mIHRoZSBmb3VyIHN1cHBvcnRlZCBjb250ZXh0dWFsIGNsYXNzZXM6IGBzdWNjZXNzYCwgYGluZm9gLCBgd2FybmluZ2AsIGBkYW5nZXJgICovXG4gIEBJbnB1dCgpIHR5cGU6IHN0cmluZztcblxuICAvKiogY3VycmVudCB2YWx1ZSBvZiBwcm9ncmVzcyBiYXIgKi9cbiAgQElucHV0KClcbiAgZ2V0IHZhbHVlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHY6IG51bWJlcikge1xuICAgIGlmICghdiAmJiB2ICE9PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3ZhbHVlID0gdjtcbiAgICB0aGlzLnJlY2FsY3VsYXRlUGVyY2VudGFnZSgpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aC4lJylcbiAgZ2V0IHNldEJhcldpZHRoKCkge1xuICAgIHRoaXMucmVjYWxjdWxhdGVQZXJjZW50YWdlKCk7XG5cbiAgICByZXR1cm4gdGhpcy5wZXJjZW50O1xuICB9XG5cbiAgZ2V0IGlzQnMzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc0JzMygpO1xuICB9XG5cbiAgc3RyaXBlZDogYm9vbGVhbjtcbiAgYW5pbWF0ZTogYm9vbGVhbjtcbiAgcGVyY2VudCA9IDA7XG4gIHByb2dyZXNzOiBQcm9ncmVzc2JhckNvbXBvbmVudDtcblxuICBwcm90ZWN0ZWQgX3ZhbHVlOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoQEhvc3QoKSBwcm9ncmVzczogUHJvZ3Jlc3NiYXJDb21wb25lbnQpIHtcbiAgICB0aGlzLnByb2dyZXNzID0gcHJvZ3Jlc3M7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnByb2dyZXNzLmFkZEJhcih0aGlzKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMucHJvZ3Jlc3MucmVtb3ZlQmFyKHRoaXMpO1xuICB9XG5cbiAgcmVjYWxjdWxhdGVQZXJjZW50YWdlKCk6IHZvaWQge1xuICAgIHRoaXMucGVyY2VudCA9ICsodGhpcy52YWx1ZSAvIHRoaXMucHJvZ3Jlc3MubWF4ICogMTAwKS50b0ZpeGVkKDIpO1xuXG4gICAgY29uc3QgdG90YWxQZXJjZW50YWdlID0gdGhpcy5wcm9ncmVzcy5iYXJzXG4gICAgICAucmVkdWNlKGZ1bmN0aW9uICh0b3RhbDogbnVtYmVyLCBiYXI6IEJhckNvbXBvbmVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0b3RhbCArIGJhci5wZXJjZW50O1xuICAgICAgfSwgMCk7XG5cbiAgICBpZiAodG90YWxQZXJjZW50YWdlID4gMTAwKSB7XG4gICAgICB0aGlzLnBlcmNlbnQgLT0gdG90YWxQZXJjZW50YWdlIC0gMTAwO1xuICAgIH1cbiAgfVxufVxuIl19