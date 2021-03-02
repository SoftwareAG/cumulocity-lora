/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Host, HostBinding, Input } from '@angular/core';
import { ProgressbarComponent } from './progressbar.component';
import { isBs3 } from 'ngx-bootstrap/utils';
// todo: number pipe
// todo: use query from progress?
export class BarComponent {
    /**
     * @param {?} progress
     */
    constructor(progress) {
        this.percent = 0;
        this.progress = progress;
    }
    /**
     * current value of progress bar
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        if (!v && v !== 0) {
            return;
        }
        this._value = v;
        this.recalculatePercentage();
    }
    /**
     * @return {?}
     */
    get setBarWidth() {
        this.recalculatePercentage();
        return this.percent;
    }
    /**
     * @return {?}
     */
    get isBs3() {
        return isBs3();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.progress.addBar(this);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.progress.removeBar(this);
    }
    /**
     * @return {?}
     */
    recalculatePercentage() {
        this.percent = +(this.value / this.progress.max * 100).toFixed(2);
        /** @type {?} */
        const totalPercentage = this.progress.bars
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
    }
}
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
BarComponent.ctorParameters = () => [
    { type: ProgressbarComponent, decorators: [{ type: Host }] }
];
BarComponent.propDecorators = {
    type: [{ type: Input }],
    value: [{ type: Input }],
    setBarWidth: [{ type: HostBinding, args: ['style.width.%',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1ib290c3RyYXAvcHJvZ3Jlc3NiYXIvIiwic291cmNlcyI6WyJiYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULElBQUksRUFDSixXQUFXLEVBQ1gsS0FBSyxFQUdOLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7O0FBb0I1QyxNQUFNLE9BQU8sWUFBWTs7OztJQXNDdkIsWUFBb0IsUUFBOEI7UUFMbEQsWUFBTyxHQUFHLENBQUMsQ0FBQztRQU1WLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBakNELElBQ0ksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDOzs7OztJQUVELElBQUksS0FBSyxDQUFDLENBQVM7UUFDakIsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQy9CLENBQUM7Ozs7SUFFRCxJQUNJLFdBQVc7UUFDYixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUU3QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQzs7OztJQUVELElBQUksS0FBSztRQUNQLE9BQU8sS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQzs7OztJQWFELFFBQVE7UUFDTixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Ozs7SUFFRCxxQkFBcUI7UUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7O2NBRTVELGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUk7YUFDdkMsTUFBTTs7Ozs7UUFBQyxVQUFVLEtBQWEsRUFBRSxHQUFpQjtZQUNoRCxPQUFPLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQzdCLENBQUMsR0FBRSxDQUFDLENBQUM7UUFFUCxJQUFJLGVBQWUsR0FBRyxHQUFHLEVBQUU7WUFDekIsSUFBSSxDQUFDLE9BQU8sSUFBSSxlQUFlLEdBQUcsR0FBRyxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQzs7O1lBN0VGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsS0FBSztnQkFDZix1Q0FBbUM7Z0JBQ25DLElBQUksRUFBRTtvQkFDSixJQUFJLEVBQUUsYUFBYTtvQkFDbkIsZUFBZSxFQUFFLEdBQUc7b0JBQ3BCLFNBQVMsRUFBRSx3RUFBd0U7b0JBQ25GLCtCQUErQixFQUFFLG1CQUFtQjtvQkFDcEQsOEJBQThCLEVBQUUsU0FBUztvQkFDekMsZ0JBQWdCLEVBQUUsa0JBQWtCO29CQUNwQyxzQkFBc0IsRUFBRSxPQUFPO29CQUMvQix1QkFBdUIsRUFBRSx5Q0FBeUM7b0JBQ2xFLHNCQUFzQixFQUFFLEtBQUs7b0JBQzdCLGtCQUFrQixFQUFFLE9BQU87aUJBQzVCO2FBQ0Y7Ozs7WUFwQlEsb0JBQW9CLHVCQTJEZCxJQUFJOzs7bUJBbENoQixLQUFLO29CQUdMLEtBQUs7MEJBYUwsV0FBVyxTQUFDLGVBQWU7Ozs7SUFuQjVCLDJCQUFZOzs7OztJQUdaLDRCQUFzQjs7SUEyQnRCLCtCQUFpQjs7SUFDakIsK0JBQWlCOztJQUNqQiwrQkFBWTs7SUFDWixnQ0FBK0I7Ozs7O0lBRS9CLDhCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSG9zdCxcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUHJvZ3Jlc3NiYXJDb21wb25lbnQgfSBmcm9tICcuL3Byb2dyZXNzYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBpc0JzMyB9IGZyb20gJ25neC1ib290c3RyYXAvdXRpbHMnO1xuXG4vLyB0b2RvOiBudW1iZXIgcGlwZVxuLy8gdG9kbzogdXNlIHF1ZXJ5IGZyb20gcHJvZ3Jlc3M/XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiYXInLFxuICB0ZW1wbGF0ZVVybDogJy4vYmFyLmNvbXBvbmVudC5odG1sJyxcbiAgaG9zdDoge1xuICAgIHJvbGU6ICdwcm9ncmVzc2JhcicsXG4gICAgJ2FyaWEtdmFsdWVtaW4nOiAnMCcsXG4gICAgJ1tjbGFzc10nOiAnXCJwcm9ncmVzcy1iYXIgXCIgKyAodHlwZSA/IFwicHJvZ3Jlc3MtYmFyLVwiICsgdHlwZSArIFwiIGJnLVwiICsgdHlwZSA6IFwiXCIpJyxcbiAgICAnW2NsYXNzLnByb2dyZXNzLWJhci1hbmltYXRlZF0nOiAnIWlzQnMzICYmIGFuaW1hdGUnLFxuICAgICdbY2xhc3MucHJvZ3Jlc3MtYmFyLXN0cmlwZWRdJzogJ3N0cmlwZWQnLFxuICAgICdbY2xhc3MuYWN0aXZlXSc6ICdpc0JzMyAmJiBhbmltYXRlJyxcbiAgICAnW2F0dHIuYXJpYS12YWx1ZW5vd10nOiAndmFsdWUnLFxuICAgICdbYXR0ci5hcmlhLXZhbHVldGV4dF0nOiAncGVyY2VudCA/IHBlcmNlbnQudG9GaXhlZCgwKSArIFwiJVwiIDogXCJcIicsXG4gICAgJ1thdHRyLmFyaWEtdmFsdWVtYXhdJzogJ21heCcsXG4gICAgJ1tzdHlsZS5oZWlnaHQuJV0nOiAnXCIxMDBcIidcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBCYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIG1heDogbnVtYmVyO1xuXG4gIC8qKiBwcm92aWRlIG9uZSBvZiB0aGUgZm91ciBzdXBwb3J0ZWQgY29udGV4dHVhbCBjbGFzc2VzOiBgc3VjY2Vzc2AsIGBpbmZvYCwgYHdhcm5pbmdgLCBgZGFuZ2VyYCAqL1xuICBASW5wdXQoKSB0eXBlOiBzdHJpbmc7XG5cbiAgLyoqIGN1cnJlbnQgdmFsdWUgb2YgcHJvZ3Jlc3MgYmFyICovXG4gIEBJbnB1dCgpXG4gIGdldCB2YWx1ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHNldCB2YWx1ZSh2OiBudW1iZXIpIHtcbiAgICBpZiAoIXYgJiYgdiAhPT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl92YWx1ZSA9IHY7XG4gICAgdGhpcy5yZWNhbGN1bGF0ZVBlcmNlbnRhZ2UoKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGguJScpXG4gIGdldCBzZXRCYXJXaWR0aCgpIHtcbiAgICB0aGlzLnJlY2FsY3VsYXRlUGVyY2VudGFnZSgpO1xuXG4gICAgcmV0dXJuIHRoaXMucGVyY2VudDtcbiAgfVxuXG4gIGdldCBpc0JzMygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNCczMoKTtcbiAgfVxuXG4gIHN0cmlwZWQ6IGJvb2xlYW47XG4gIGFuaW1hdGU6IGJvb2xlYW47XG4gIHBlcmNlbnQgPSAwO1xuICBwcm9ncmVzczogUHJvZ3Jlc3NiYXJDb21wb25lbnQ7XG5cbiAgcHJvdGVjdGVkIF92YWx1ZTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKEBIb3N0KCkgcHJvZ3Jlc3M6IFByb2dyZXNzYmFyQ29tcG9uZW50KSB7XG4gICAgdGhpcy5wcm9ncmVzcyA9IHByb2dyZXNzO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5wcm9ncmVzcy5hZGRCYXIodGhpcyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnByb2dyZXNzLnJlbW92ZUJhcih0aGlzKTtcbiAgfVxuXG4gIHJlY2FsY3VsYXRlUGVyY2VudGFnZSgpOiB2b2lkIHtcbiAgICB0aGlzLnBlcmNlbnQgPSArKHRoaXMudmFsdWUgLyB0aGlzLnByb2dyZXNzLm1heCAqIDEwMCkudG9GaXhlZCgyKTtcblxuICAgIGNvbnN0IHRvdGFsUGVyY2VudGFnZSA9IHRoaXMucHJvZ3Jlc3MuYmFyc1xuICAgICAgLnJlZHVjZShmdW5jdGlvbiAodG90YWw6IG51bWJlciwgYmFyOiBCYXJDb21wb25lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdG90YWwgKyBiYXIucGVyY2VudDtcbiAgICAgIH0sIDApO1xuXG4gICAgaWYgKHRvdGFsUGVyY2VudGFnZSA+IDEwMCkge1xuICAgICAgdGhpcy5wZXJjZW50IC09IHRvdGFsUGVyY2VudGFnZSAtIDEwMDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==