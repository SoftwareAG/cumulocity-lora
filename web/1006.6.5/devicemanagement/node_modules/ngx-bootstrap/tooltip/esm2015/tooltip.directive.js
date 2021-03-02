/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/* tslint:disable: max-file-line-count deprecation */
import { Directive, ElementRef, EventEmitter, HostBinding, Input, Output, Renderer2, ViewContainerRef } from '@angular/core';
import { TooltipContainerComponent } from './tooltip-container.component';
import { TooltipConfig } from './tooltip.config';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { OnChange, warnOnce, parseTriggers } from 'ngx-bootstrap/utils';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { timer } from 'rxjs';
/** @type {?} */
let id = 0;
export class TooltipDirective {
    /**
     * @param {?} _viewContainerRef
     * @param {?} cis
     * @param {?} config
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} _positionService
     */
    constructor(_viewContainerRef, cis, config, _elementRef, _renderer, _positionService) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._positionService = _positionService;
        this.tooltipId = id++;
        /**
         * Fired when tooltip content changes
         */
        /* tslint:disable-next-line:no-any */
        this.tooltipChange = new EventEmitter();
        /**
         * Css class for tooltip container
         */
        this.containerClass = '';
        /**
         * @deprecated - removed, will be added to configuration
         */
        this.tooltipAnimation = true;
        /**
         * @deprecated
         */
        this.tooltipFadeDuration = 150;
        this.ariaDescribedby = `tooltip-${this.tooltipId}`;
        /**
         * @deprecated
         */
        this.tooltipStateChanged = new EventEmitter();
        this._tooltip = cis
            .createLoader(this._elementRef, _viewContainerRef, this._renderer)
            .provide({ provide: TooltipConfig, useValue: config });
        Object.assign(this, config);
        this.onShown = this._tooltip.onShown;
        this.onHidden = this._tooltip.onHidden;
    }
    /**
     * Returns whether or not the tooltip is currently being shown
     * @return {?}
     */
    get isOpen() {
        return this._tooltip.isShown;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set isOpen(value) {
        if (value) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    /**
     * @deprecated - please use `tooltip` instead
     * @param {?} value
     * @return {?}
     */
    set htmlContent(value) {
        warnOnce('tooltipHtml was deprecated, please use `tooltip` instead');
        this.tooltip = value;
    }
    /**
     * @deprecated - please use `placement` instead
     * @param {?} value
     * @return {?}
     */
    set _placement(value) {
        warnOnce('tooltipPlacement was deprecated, please use `placement` instead');
        this.placement = value;
    }
    /**
     * @deprecated - please use `isOpen` instead
     * @param {?} value
     * @return {?}
     */
    set _isOpen(value) {
        warnOnce('tooltipIsOpen was deprecated, please use `isOpen` instead');
        this.isOpen = value;
    }
    /**
     * @return {?}
     */
    get _isOpen() {
        warnOnce('tooltipIsOpen was deprecated, please use `isOpen` instead');
        return this.isOpen;
    }
    /**
     * @deprecated - please use `isDisabled` instead
     * @param {?} value
     * @return {?}
     */
    set _enable(value) {
        warnOnce('tooltipEnable was deprecated, please use `isDisabled` instead');
        this.isDisabled = !value;
    }
    /**
     * @return {?}
     */
    get _enable() {
        warnOnce('tooltipEnable was deprecated, please use `isDisabled` instead');
        return this.isDisabled;
    }
    /**
     * @deprecated - please use `container="body"` instead
     * @param {?} value
     * @return {?}
     */
    set _appendToBody(value) {
        warnOnce('tooltipAppendToBody was deprecated, please use `container="body"` instead');
        this.container = value ? 'body' : this.container;
    }
    /**
     * @return {?}
     */
    get _appendToBody() {
        warnOnce('tooltipAppendToBody was deprecated, please use `container="body"` instead');
        return this.container === 'body';
    }
    /**
     * @deprecated - will replaced with customClass
     * @param {?} value
     * @return {?}
     */
    set _popupClass(value) {
        warnOnce('tooltipClass deprecated');
    }
    /**
     * @deprecated - removed
     * @param {?} value
     * @return {?}
     */
    set _tooltipContext(value) {
        warnOnce('tooltipContext deprecated');
    }
    /**
     * @deprecated
     * @param {?} value
     * @return {?}
     */
    set _tooltipPopupDelay(value) {
        warnOnce('tooltipPopupDelay is deprecated, use `delay` instead');
        this.delay = value;
    }
    /**
     * @deprecated -  please use `triggers` instead
     * @return {?}
     */
    get _tooltipTrigger() {
        warnOnce('tooltipTrigger was deprecated, please use `triggers` instead');
        return this.triggers;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set _tooltipTrigger(value) {
        warnOnce('tooltipTrigger was deprecated, please use `triggers` instead');
        this.triggers = (value || '').toString();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._tooltip.listen({
            triggers: this.triggers,
            show: (/**
             * @return {?}
             */
            () => this.show())
        });
        /* tslint:disable-next-line:no-any */
        this.tooltipChange.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            if (!value) {
                this._tooltip.hide();
            }
        }));
    }
    /**
     * Toggles an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     * @return {?}
     */
    toggle() {
        if (this.isOpen) {
            return this.hide();
        }
        this.show();
    }
    /**
     * Opens an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     * @return {?}
     */
    show() {
        this._positionService.setOptions({
            modifiers: {
                flip: {
                    enabled: this.adaptivePosition
                },
                preventOverflow: {
                    enabled: this.adaptivePosition
                }
            }
        });
        if (this.isOpen ||
            this.isDisabled ||
            this._delayTimeoutId ||
            !this.tooltip) {
            return;
        }
        /** @type {?} */
        const showTooltip = (/**
         * @return {?}
         */
        () => {
            if (this._delayTimeoutId) {
                this._delayTimeoutId = undefined;
            }
            this._tooltip
                .attach(TooltipContainerComponent)
                .to(this.container)
                .position({ attachment: this.placement })
                .show({
                content: this.tooltip,
                placement: this.placement,
                containerClass: this.containerClass,
                id: this.ariaDescribedby
            });
        });
        /** @type {?} */
        const cancelDelayedTooltipShowing = (/**
         * @return {?}
         */
        () => {
            if (this._tooltipCancelShowFn) {
                this._tooltipCancelShowFn();
            }
        });
        if (this.delay) {
            /** @type {?} */
            const _timer = timer(this.delay).subscribe((/**
             * @return {?}
             */
            () => {
                showTooltip();
                cancelDelayedTooltipShowing();
            }));
            if (this.triggers) {
                /** @type {?} */
                const triggers = parseTriggers(this.triggers);
                this._tooltipCancelShowFn = this._renderer.listen(this._elementRef.nativeElement, triggers[0].close, (/**
                 * @return {?}
                 */
                () => {
                    _timer.unsubscribe();
                    cancelDelayedTooltipShowing();
                }));
            }
        }
        else {
            showTooltip();
        }
    }
    /**
     * Closes an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     * @return {?}
     */
    hide() {
        if (this._delayTimeoutId) {
            clearTimeout(this._delayTimeoutId);
            this._delayTimeoutId = undefined;
        }
        if (!this._tooltip.isShown) {
            return;
        }
        this._tooltip.instance.classMap.in = false;
        setTimeout((/**
         * @return {?}
         */
        () => {
            this._tooltip.hide();
        }), this.tooltipFadeDuration);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._tooltip.dispose();
    }
}
TooltipDirective.decorators = [
    { type: Directive, args: [{
                selector: '[tooltip], [tooltipHtml]',
                exportAs: 'bs-tooltip'
            },] }
];
/** @nocollapse */
TooltipDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: ComponentLoaderFactory },
    { type: TooltipConfig },
    { type: ElementRef },
    { type: Renderer2 },
    { type: PositioningService }
];
TooltipDirective.propDecorators = {
    adaptivePosition: [{ type: Input }],
    tooltip: [{ type: Input }],
    tooltipChange: [{ type: Output }],
    placement: [{ type: Input }],
    triggers: [{ type: Input }],
    container: [{ type: Input }],
    containerClass: [{ type: Input }],
    isOpen: [{ type: Input }],
    isDisabled: [{ type: Input }],
    delay: [{ type: Input }],
    onShown: [{ type: Output }],
    onHidden: [{ type: Output }],
    htmlContent: [{ type: Input, args: ['tooltipHtml',] }],
    _placement: [{ type: Input, args: ['tooltipPlacement',] }],
    _isOpen: [{ type: Input, args: ['tooltipIsOpen',] }],
    _enable: [{ type: Input, args: ['tooltipEnable',] }],
    _appendToBody: [{ type: Input, args: ['tooltipAppendToBody',] }],
    tooltipAnimation: [{ type: Input }],
    _popupClass: [{ type: Input, args: ['tooltipClass',] }],
    _tooltipContext: [{ type: Input, args: ['tooltipContext',] }],
    _tooltipPopupDelay: [{ type: Input, args: ['tooltipPopupDelay',] }],
    tooltipFadeDuration: [{ type: Input }],
    _tooltipTrigger: [{ type: Input, args: ['tooltipTrigger',] }],
    ariaDescribedby: [{ type: HostBinding, args: ['attr.aria-describedby',] }],
    tooltipStateChanged: [{ type: Output }]
};
tslib_1.__decorate([
    OnChange(),
    tslib_1.__metadata("design:type", Object)
], TooltipDirective.prototype, "tooltip", void 0);
if (false) {
    /** @type {?} */
    TooltipDirective.prototype.tooltipId;
    /**
     * sets disable adaptive position
     * @type {?}
     */
    TooltipDirective.prototype.adaptivePosition;
    /**
     * Content to be displayed as tooltip.
     * @type {?}
     */
    TooltipDirective.prototype.tooltip;
    /**
     * Fired when tooltip content changes
     * @type {?}
     */
    TooltipDirective.prototype.tooltipChange;
    /**
     * Placement of a tooltip. Accepts: "top", "bottom", "left", "right"
     * @type {?}
     */
    TooltipDirective.prototype.placement;
    /**
     * Specifies events that should trigger. Supports a space separated list of
     * event names.
     * @type {?}
     */
    TooltipDirective.prototype.triggers;
    /**
     * A selector specifying the element the tooltip should be appended to.
     * @type {?}
     */
    TooltipDirective.prototype.container;
    /**
     * Css class for tooltip container
     * @type {?}
     */
    TooltipDirective.prototype.containerClass;
    /**
     * Allows to disable tooltip
     * @type {?}
     */
    TooltipDirective.prototype.isDisabled;
    /**
     * Delay before showing the tooltip
     * @type {?}
     */
    TooltipDirective.prototype.delay;
    /**
     * Emits an event when the tooltip is shown
     * @type {?}
     */
    TooltipDirective.prototype.onShown;
    /**
     * Emits an event when the tooltip is hidden
     * @type {?}
     */
    TooltipDirective.prototype.onHidden;
    /**
     * @deprecated - removed, will be added to configuration
     * @type {?}
     */
    TooltipDirective.prototype.tooltipAnimation;
    /**
     * @deprecated
     * @type {?}
     */
    TooltipDirective.prototype.tooltipFadeDuration;
    /** @type {?} */
    TooltipDirective.prototype.ariaDescribedby;
    /**
     * @deprecated
     * @type {?}
     */
    TooltipDirective.prototype.tooltipStateChanged;
    /**
     * @type {?}
     * @protected
     */
    TooltipDirective.prototype._delayTimeoutId;
    /**
     * @type {?}
     * @protected
     */
    TooltipDirective.prototype._tooltipCancelShowFn;
    /**
     * @type {?}
     * @private
     */
    TooltipDirective.prototype._tooltip;
    /**
     * @type {?}
     * @private
     */
    TooltipDirective.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    TooltipDirective.prototype._renderer;
    /**
     * @type {?}
     * @private
     */
    TooltipDirective.prototype._positionService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYm9vdHN0cmFwL3Rvb2x0aXAvIiwic291cmNlcyI6WyJ0b29sdGlwLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osV0FBVyxFQUNYLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxFQUVULGdCQUFnQixFQUNqQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFakQsT0FBTyxFQUFtQixzQkFBc0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRS9ELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7O0lBRXpCLEVBQUUsR0FBRyxDQUFDO0FBTVYsTUFBTSxPQUFPLGdCQUFnQjs7Ozs7Ozs7O0lBaUwzQixZQUNFLGlCQUFtQyxFQUNuQyxHQUEyQixFQUMzQixNQUFxQixFQUNiLFdBQXVCLEVBQ3ZCLFNBQW9CLEVBQ3BCLGdCQUFvQztRQUZwQyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN2QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBb0I7UUF0TDlDLGNBQVMsR0FBRyxFQUFFLEVBQUUsQ0FBQzs7OztRQVlqQixxQ0FBcUM7UUFDckMsa0JBQWEsR0FBNEMsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7OztRQWtCbkUsbUJBQWMsR0FBRyxFQUFFLENBQUM7Ozs7UUFpR3BCLHFCQUFnQixHQUFHLElBQUksQ0FBQzs7OztRQXVCeEIsd0JBQW1CLEdBQUcsR0FBRyxDQUFDO1FBZUcsb0JBQWUsR0FBRyxXQUFXLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7OztRQUlwRix3QkFBbUIsR0FBMEIsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQWV2RSxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUc7YUFDaEIsWUFBWSxDQUNYLElBQUksQ0FBQyxXQUFXLEVBQ2hCLGlCQUFpQixFQUNqQixJQUFJLENBQUMsU0FBUyxDQUNmO2FBQ0EsT0FBTyxDQUFDLEVBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztRQUV2RCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDekMsQ0FBQzs7Ozs7SUFqS0QsSUFDSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztJQUMvQixDQUFDOzs7OztJQUVELElBQUksTUFBTSxDQUFDLEtBQWM7UUFDdkIsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDYjthQUFNO1lBQ0wsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2I7SUFDSCxDQUFDOzs7Ozs7SUF3QkQsSUFFSSxXQUFXLENBQUMsS0FBZ0M7UUFDOUMsUUFBUSxDQUFDLDBEQUEwRCxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQzs7Ozs7O0lBR0QsSUFDSSxVQUFVLENBQUMsS0FBYTtRQUMxQixRQUFRLENBQUMsaUVBQWlFLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDOzs7Ozs7SUFHRCxJQUNJLE9BQU8sQ0FBQyxLQUFjO1FBQ3hCLFFBQVEsQ0FBQywyREFBMkQsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7Ozs7SUFFRCxJQUFJLE9BQU87UUFDVCxRQUFRLENBQUMsMkRBQTJELENBQUMsQ0FBQztRQUV0RSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQzs7Ozs7O0lBR0QsSUFDSSxPQUFPLENBQUMsS0FBYztRQUN4QixRQUFRLENBQUMsK0RBQStELENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsS0FBSyxDQUFDO0lBQzNCLENBQUM7Ozs7SUFFRCxJQUFJLE9BQU87UUFDVCxRQUFRLENBQUMsK0RBQStELENBQUMsQ0FBQztRQUUxRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQzs7Ozs7O0lBR0QsSUFDSSxhQUFhLENBQUMsS0FBYztRQUM5QixRQUFRLENBQ04sMkVBQTJFLENBQzVFLENBQUM7UUFDRixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ25ELENBQUM7Ozs7SUFFRCxJQUFJLGFBQWE7UUFDZixRQUFRLENBQ04sMkVBQTJFLENBQzVFLENBQUM7UUFFRixPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssTUFBTSxDQUFDO0lBQ25DLENBQUM7Ozs7OztJQU1ELElBQ0ksV0FBVyxDQUFDLEtBQWE7UUFDM0IsUUFBUSxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDdEMsQ0FBQzs7Ozs7O0lBR0QsSUFFSSxlQUFlLENBQUMsS0FBVTtRQUM1QixRQUFRLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUN4QyxDQUFDOzs7Ozs7SUFHRCxJQUNJLGtCQUFrQixDQUFDLEtBQWE7UUFDbEMsUUFBUSxDQUFDLHNEQUFzRCxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFNRCxJQUNJLGVBQWU7UUFDakIsUUFBUSxDQUFDLDhEQUE4RCxDQUFDLENBQUM7UUFFekUsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBRUQsSUFBSSxlQUFlLENBQUMsS0FBd0I7UUFDMUMsUUFBUSxDQUFDLDhEQUE4RCxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQyxDQUFDOzs7O0lBa0NELFFBQVE7UUFDTixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUNuQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsSUFBSTs7O1lBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO1NBQ3hCLENBQUMsQ0FBQztRQUNILHFDQUFxQztRQUNyQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQzFDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN0QjtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBTUQsTUFBTTtRQUNKLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3BCO1FBRUQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7O0lBTUQsSUFBSTtRQUNGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUM7WUFDL0IsU0FBUyxFQUFFO2dCQUNULElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtpQkFDL0I7Z0JBQ0QsZUFBZSxFQUFFO29CQUNmLE9BQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCO2lCQUMvQjthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFDRSxJQUFJLENBQUMsTUFBTTtZQUNYLElBQUksQ0FBQyxVQUFVO1lBQ2YsSUFBSSxDQUFDLGVBQWU7WUFDcEIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUNiO1lBQ0EsT0FBTztTQUNSOztjQUVLLFdBQVc7OztRQUFHLEdBQUcsRUFBRTtZQUN2QixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO2FBQ2xDO1lBRUQsSUFBSSxDQUFDLFFBQVE7aUJBQ1YsTUFBTSxDQUFDLHlCQUF5QixDQUFDO2lCQUNqQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztpQkFDbEIsUUFBUSxDQUFDLEVBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUMsQ0FBQztpQkFDdEMsSUFBSSxDQUFDO2dCQUNKLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDckIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO2dCQUN6QixjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWM7Z0JBQ25DLEVBQUUsRUFBRSxJQUFJLENBQUMsZUFBZTthQUN6QixDQUFDLENBQUM7UUFDUCxDQUFDLENBQUE7O2NBQ0ssMkJBQTJCOzs7UUFBRyxHQUFHLEVBQUU7WUFDdkMsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2FBQzdCO1FBQ0gsQ0FBQyxDQUFBO1FBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFOztrQkFDUixNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTOzs7WUFBQyxHQUFHLEVBQUU7Z0JBQzlDLFdBQVcsRUFBRSxDQUFDO2dCQUNkLDJCQUEyQixFQUFFLENBQUM7WUFDaEMsQ0FBQyxFQUFDO1lBRUYsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFOztzQkFDWCxRQUFRLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQzdDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSzs7O2dCQUFFLEdBQUcsRUFBRTtvQkFDeEcsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUNyQiwyQkFBMkIsRUFBRSxDQUFDO2dCQUNoQyxDQUFDLEVBQUMsQ0FBQzthQUNKO1NBQ0Y7YUFBTTtZQUNMLFdBQVcsRUFBRSxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzs7Ozs7SUFNRCxJQUFJO1FBQ0YsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3hCLFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7U0FDbEM7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDMUIsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFDM0MsVUFBVTs7O1FBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixDQUFDLEdBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDL0IsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzFCLENBQUM7OztZQTNURixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsUUFBUSxFQUFFLFlBQVk7YUFDdkI7Ozs7WUFqQkMsZ0JBQWdCO1lBTVEsc0JBQXNCO1lBRnZDLGFBQWE7WUFicEIsVUFBVTtZQU9WLFNBQVM7WUFVRixrQkFBa0I7OzsrQkFheEIsS0FBSztzQkFLTCxLQUFLOzRCQUlMLE1BQU07d0JBT04sS0FBSzt1QkFLTCxLQUFLO3dCQUlMLEtBQUs7NkJBSUwsS0FBSztxQkFJTCxLQUFLO3lCQWdCTCxLQUFLO29CQUtMLEtBQUs7c0JBTUwsTUFBTTt1QkFLTixNQUFNOzBCQUdOLEtBQUssU0FBQyxhQUFhO3lCQVFuQixLQUFLLFNBQUMsa0JBQWtCO3NCQU94QixLQUFLLFNBQUMsZUFBZTtzQkFhckIsS0FBSyxTQUFDLGVBQWU7NEJBYXJCLEtBQUssU0FBQyxxQkFBcUI7K0JBaUIzQixLQUFLOzBCQUdMLEtBQUssU0FBQyxjQUFjOzhCQU1wQixLQUFLLFNBQUMsZ0JBQWdCO2lDQU90QixLQUFLLFNBQUMsbUJBQW1CO2tDQU96QixLQUFLOzhCQUdMLEtBQUssU0FBQyxnQkFBZ0I7OEJBWXRCLFdBQVcsU0FBQyx1QkFBdUI7a0NBR25DLE1BQU07O0FBaEtQO0lBSEMsUUFBUSxFQUFFOztpREFHd0I7OztJQVRuQyxxQ0FBaUI7Ozs7O0lBRWpCLDRDQUFtQzs7Ozs7SUFJbkMsbUNBR21DOzs7OztJQUVuQyx5Q0FFNEU7Ozs7O0lBSzVFLHFDQUEyQjs7Ozs7O0lBSzNCLG9DQUEwQjs7Ozs7SUFJMUIscUNBQTJCOzs7OztJQUkzQiwwQ0FBNkI7Ozs7O0lBb0I3QixzQ0FBNkI7Ozs7O0lBSzdCLGlDQUF1Qjs7Ozs7SUFNdkIsbUNBQXFDOzs7OztJQUtyQyxvQ0FBc0M7Ozs7O0lBNkR0Qyw0Q0FBaUM7Ozs7O0lBdUJqQywrQ0FBbUM7O0lBZW5DLDJDQUFvRjs7Ozs7SUFHcEYsK0NBQ3lFOzs7OztJQUV6RSwyQ0FBd0M7Ozs7O0lBQ3hDLGdEQUF5Qzs7Ozs7SUFFekMsb0NBQTZEOzs7OztJQUszRCx1Q0FBK0I7Ozs7O0lBQy9CLHFDQUE0Qjs7Ozs7SUFDNUIsNENBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGU6IG1heC1maWxlLWxpbmUtY291bnQgZGVwcmVjYXRpb24gKi9cbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFRvb2x0aXBDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL3Rvb2x0aXAtY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUb29sdGlwQ29uZmlnIH0gZnJvbSAnLi90b29sdGlwLmNvbmZpZyc7XG5cbmltcG9ydCB7IENvbXBvbmVudExvYWRlciwgQ29tcG9uZW50TG9hZGVyRmFjdG9yeSB9IGZyb20gJ25neC1ib290c3RyYXAvY29tcG9uZW50LWxvYWRlcic7XG5pbXBvcnQgeyBPbkNoYW5nZSwgd2Fybk9uY2UsIHBhcnNlVHJpZ2dlcnMgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3V0aWxzJztcbmltcG9ydCB7IFBvc2l0aW9uaW5nU2VydmljZSB9IGZyb20gJ25neC1ib290c3RyYXAvcG9zaXRpb25pbmcnO1xuXG5pbXBvcnQgeyB0aW1lciB9IGZyb20gJ3J4anMnO1xuXG5sZXQgaWQgPSAwO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdG9vbHRpcF0sIFt0b29sdGlwSHRtbF0nLFxuICBleHBvcnRBczogJ2JzLXRvb2x0aXAnXG59KVxuZXhwb3J0IGNsYXNzIFRvb2x0aXBEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHRvb2x0aXBJZCA9IGlkKys7XG4gIC8qKiBzZXRzIGRpc2FibGUgYWRhcHRpdmUgcG9zaXRpb24gKi9cbiAgQElucHV0KCkgYWRhcHRpdmVQb3NpdGlvbjogYm9vbGVhbjtcbiAgLyoqXG4gICAqIENvbnRlbnQgdG8gYmUgZGlzcGxheWVkIGFzIHRvb2x0aXAuXG4gICAqL1xuICBAT25DaGFuZ2UoKVxuICBASW5wdXQoKVxuICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55ICovXG4gIHRvb2x0aXA6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG4gIC8qKiBGaXJlZCB3aGVuIHRvb2x0aXAgY29udGVudCBjaGFuZ2VzICovXG4gIEBPdXRwdXQoKVxuICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55ICovXG4gIHRvb2x0aXBDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogUGxhY2VtZW50IG9mIGEgdG9vbHRpcC4gQWNjZXB0czogXCJ0b3BcIiwgXCJib3R0b21cIiwgXCJsZWZ0XCIsIFwicmlnaHRcIlxuICAgKi9cbiAgQElucHV0KCkgcGxhY2VtZW50OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgZXZlbnRzIHRoYXQgc2hvdWxkIHRyaWdnZXIuIFN1cHBvcnRzIGEgc3BhY2Ugc2VwYXJhdGVkIGxpc3Qgb2ZcbiAgICogZXZlbnQgbmFtZXMuXG4gICAqL1xuICBASW5wdXQoKSB0cmlnZ2Vyczogc3RyaW5nO1xuICAvKipcbiAgICogQSBzZWxlY3RvciBzcGVjaWZ5aW5nIHRoZSBlbGVtZW50IHRoZSB0b29sdGlwIHNob3VsZCBiZSBhcHBlbmRlZCB0by5cbiAgICovXG4gIEBJbnB1dCgpIGNvbnRhaW5lcjogc3RyaW5nO1xuICAvKipcbiAgICogQ3NzIGNsYXNzIGZvciB0b29sdGlwIGNvbnRhaW5lclxuICAgKi9cbiAgQElucHV0KCkgY29udGFpbmVyQ2xhc3MgPSAnJztcbiAgLyoqXG4gICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHRvb2x0aXAgaXMgY3VycmVudGx5IGJlaW5nIHNob3duXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgaXNPcGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl90b29sdGlwLmlzU2hvd247XG4gIH1cblxuICBzZXQgaXNPcGVuKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnNob3coKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFsbG93cyB0byBkaXNhYmxlIHRvb2x0aXBcbiAgICovXG4gIEBJbnB1dCgpIGlzRGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIERlbGF5IGJlZm9yZSBzaG93aW5nIHRoZSB0b29sdGlwXG4gICAqL1xuICBASW5wdXQoKSBkZWxheTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIHRoZSB0b29sdGlwIGlzIHNob3duXG4gICAqL1xuICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55ICovXG4gIEBPdXRwdXQoKSBvblNob3duOiBFdmVudEVtaXR0ZXI8YW55PjtcbiAgLyoqXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIHRvb2x0aXAgaXMgaGlkZGVuXG4gICAqL1xuICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55ICovXG4gIEBPdXRwdXQoKSBvbkhpZGRlbjogRXZlbnRFbWl0dGVyPGFueT47XG5cbiAgLyoqIEBkZXByZWNhdGVkIC0gcGxlYXNlIHVzZSBgdG9vbHRpcGAgaW5zdGVhZCAqL1xuICBASW5wdXQoJ3Rvb2x0aXBIdG1sJylcbiAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueSAqL1xuICBzZXQgaHRtbENvbnRlbnQodmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICB3YXJuT25jZSgndG9vbHRpcEh0bWwgd2FzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgYHRvb2x0aXBgIGluc3RlYWQnKTtcbiAgICB0aGlzLnRvb2x0aXAgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKiBAZGVwcmVjYXRlZCAtIHBsZWFzZSB1c2UgYHBsYWNlbWVudGAgaW5zdGVhZCAqL1xuICBASW5wdXQoJ3Rvb2x0aXBQbGFjZW1lbnQnKVxuICBzZXQgX3BsYWNlbWVudCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgd2Fybk9uY2UoJ3Rvb2x0aXBQbGFjZW1lbnQgd2FzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgYHBsYWNlbWVudGAgaW5zdGVhZCcpO1xuICAgIHRoaXMucGxhY2VtZW50ID0gdmFsdWU7XG4gIH1cblxuICAvKiogQGRlcHJlY2F0ZWQgLSBwbGVhc2UgdXNlIGBpc09wZW5gIGluc3RlYWQgKi9cbiAgQElucHV0KCd0b29sdGlwSXNPcGVuJylcbiAgc2V0IF9pc09wZW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICB3YXJuT25jZSgndG9vbHRpcElzT3BlbiB3YXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBgaXNPcGVuYCBpbnN0ZWFkJyk7XG4gICAgdGhpcy5pc09wZW4gPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBfaXNPcGVuKCk6IGJvb2xlYW4ge1xuICAgIHdhcm5PbmNlKCd0b29sdGlwSXNPcGVuIHdhcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGBpc09wZW5gIGluc3RlYWQnKTtcblxuICAgIHJldHVybiB0aGlzLmlzT3BlbjtcbiAgfVxuXG4gIC8qKiBAZGVwcmVjYXRlZCAtIHBsZWFzZSB1c2UgYGlzRGlzYWJsZWRgIGluc3RlYWQgKi9cbiAgQElucHV0KCd0b29sdGlwRW5hYmxlJylcbiAgc2V0IF9lbmFibGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB3YXJuT25jZSgndG9vbHRpcEVuYWJsZSB3YXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBgaXNEaXNhYmxlZGAgaW5zdGVhZCcpO1xuICAgIHRoaXMuaXNEaXNhYmxlZCA9ICF2YWx1ZTtcbiAgfVxuXG4gIGdldCBfZW5hYmxlKCk6IGJvb2xlYW4ge1xuICAgIHdhcm5PbmNlKCd0b29sdGlwRW5hYmxlIHdhcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGBpc0Rpc2FibGVkYCBpbnN0ZWFkJyk7XG5cbiAgICByZXR1cm4gdGhpcy5pc0Rpc2FibGVkO1xuICB9XG5cbiAgLyoqIEBkZXByZWNhdGVkIC0gcGxlYXNlIHVzZSBgY29udGFpbmVyPVwiYm9keVwiYCBpbnN0ZWFkICovXG4gIEBJbnB1dCgndG9vbHRpcEFwcGVuZFRvQm9keScpXG4gIHNldCBfYXBwZW5kVG9Cb2R5KHZhbHVlOiBib29sZWFuKSB7XG4gICAgd2Fybk9uY2UoXG4gICAgICAndG9vbHRpcEFwcGVuZFRvQm9keSB3YXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBgY29udGFpbmVyPVwiYm9keVwiYCBpbnN0ZWFkJ1xuICAgICk7XG4gICAgdGhpcy5jb250YWluZXIgPSB2YWx1ZSA/ICdib2R5JyA6IHRoaXMuY29udGFpbmVyO1xuICB9XG5cbiAgZ2V0IF9hcHBlbmRUb0JvZHkoKTogYm9vbGVhbiB7XG4gICAgd2Fybk9uY2UoXG4gICAgICAndG9vbHRpcEFwcGVuZFRvQm9keSB3YXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBgY29udGFpbmVyPVwiYm9keVwiYCBpbnN0ZWFkJ1xuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5jb250YWluZXIgPT09ICdib2R5JztcbiAgfVxuXG4gIC8qKiBAZGVwcmVjYXRlZCAtIHJlbW92ZWQsIHdpbGwgYmUgYWRkZWQgdG8gY29uZmlndXJhdGlvbiAqL1xuICBASW5wdXQoKSB0b29sdGlwQW5pbWF0aW9uID0gdHJ1ZTtcblxuICAvKiogQGRlcHJlY2F0ZWQgLSB3aWxsIHJlcGxhY2VkIHdpdGggY3VzdG9tQ2xhc3MgKi9cbiAgQElucHV0KCd0b29sdGlwQ2xhc3MnKVxuICBzZXQgX3BvcHVwQ2xhc3ModmFsdWU6IHN0cmluZykge1xuICAgIHdhcm5PbmNlKCd0b29sdGlwQ2xhc3MgZGVwcmVjYXRlZCcpO1xuICB9XG5cbiAgLyoqIEBkZXByZWNhdGVkIC0gcmVtb3ZlZCAqL1xuICBASW5wdXQoJ3Rvb2x0aXBDb250ZXh0JylcbiAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueSAqL1xuICBzZXQgX3Rvb2x0aXBDb250ZXh0KHZhbHVlOiBhbnkpIHtcbiAgICB3YXJuT25jZSgndG9vbHRpcENvbnRleHQgZGVwcmVjYXRlZCcpO1xuICB9XG5cbiAgLyoqIEBkZXByZWNhdGVkICovXG4gIEBJbnB1dCgndG9vbHRpcFBvcHVwRGVsYXknKVxuICBzZXQgX3Rvb2x0aXBQb3B1cERlbGF5KHZhbHVlOiBudW1iZXIpIHtcbiAgICB3YXJuT25jZSgndG9vbHRpcFBvcHVwRGVsYXkgaXMgZGVwcmVjYXRlZCwgdXNlIGBkZWxheWAgaW5zdGVhZCcpO1xuICAgIHRoaXMuZGVsYXkgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKiBAZGVwcmVjYXRlZCAqL1xuICBASW5wdXQoKSB0b29sdGlwRmFkZUR1cmF0aW9uID0gMTUwO1xuXG4gIC8qKiBAZGVwcmVjYXRlZCAtICBwbGVhc2UgdXNlIGB0cmlnZ2Vyc2AgaW5zdGVhZCAqL1xuICBASW5wdXQoJ3Rvb2x0aXBUcmlnZ2VyJylcbiAgZ2V0IF90b29sdGlwVHJpZ2dlcigpOiBzdHJpbmcgfCBzdHJpbmdbXSB7XG4gICAgd2Fybk9uY2UoJ3Rvb2x0aXBUcmlnZ2VyIHdhcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGB0cmlnZ2Vyc2AgaW5zdGVhZCcpO1xuXG4gICAgcmV0dXJuIHRoaXMudHJpZ2dlcnM7XG4gIH1cblxuICBzZXQgX3Rvb2x0aXBUcmlnZ2VyKHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSkge1xuICAgIHdhcm5PbmNlKCd0b29sdGlwVHJpZ2dlciB3YXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBgdHJpZ2dlcnNgIGluc3RlYWQnKTtcbiAgICB0aGlzLnRyaWdnZXJzID0gKHZhbHVlIHx8ICcnKS50b1N0cmluZygpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtZGVzY3JpYmVkYnknKSBhcmlhRGVzY3JpYmVkYnkgPSBgdG9vbHRpcC0ke3RoaXMudG9vbHRpcElkfWA7XG5cbiAgLyoqIEBkZXByZWNhdGVkICovXG4gIEBPdXRwdXQoKVxuICB0b29sdGlwU3RhdGVDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnkgKi9cbiAgcHJvdGVjdGVkIF9kZWxheVRpbWVvdXRJZDogbnVtYmVyIHwgYW55O1xuICBwcm90ZWN0ZWQgX3Rvb2x0aXBDYW5jZWxTaG93Rm46IEZ1bmN0aW9uO1xuXG4gIHByaXZhdGUgX3Rvb2x0aXA6IENvbXBvbmVudExvYWRlcjxUb29sdGlwQ29udGFpbmVyQ29tcG9uZW50PjtcbiAgY29uc3RydWN0b3IoXG4gICAgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgY2lzOiBDb21wb25lbnRMb2FkZXJGYWN0b3J5LFxuICAgIGNvbmZpZzogVG9vbHRpcENvbmZpZyxcbiAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBfcG9zaXRpb25TZXJ2aWNlOiBQb3NpdGlvbmluZ1NlcnZpY2VcbiAgKSB7XG5cbiAgICB0aGlzLl90b29sdGlwID0gY2lzXG4gICAgICAuY3JlYXRlTG9hZGVyPFRvb2x0aXBDb250YWluZXJDb21wb25lbnQ+KFxuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLFxuICAgICAgICBfdmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgdGhpcy5fcmVuZGVyZXJcbiAgICAgIClcbiAgICAgIC5wcm92aWRlKHtwcm92aWRlOiBUb29sdGlwQ29uZmlnLCB1c2VWYWx1ZTogY29uZmlnfSk7XG5cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGNvbmZpZyk7XG4gICAgdGhpcy5vblNob3duID0gdGhpcy5fdG9vbHRpcC5vblNob3duO1xuICAgIHRoaXMub25IaWRkZW4gPSB0aGlzLl90b29sdGlwLm9uSGlkZGVuO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fdG9vbHRpcC5saXN0ZW4oe1xuICAgICAgdHJpZ2dlcnM6IHRoaXMudHJpZ2dlcnMsXG4gICAgICBzaG93OiAoKSA9PiB0aGlzLnNob3coKVxuICAgIH0pO1xuICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnkgKi9cbiAgICB0aGlzLnRvb2x0aXBDaGFuZ2Uuc3Vic2NyaWJlKCh2YWx1ZTogYW55KSA9PiB7XG4gICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3Rvb2x0aXAuaGlkZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgYW4gZWxlbWVudOKAmXMgdG9vbHRpcC4gVGhpcyBpcyBjb25zaWRlcmVkIGEg4oCcbWFudWFs4oCdIHRyaWdnZXJpbmcgb2ZcbiAgICogdGhlIHRvb2x0aXAuXG4gICAqL1xuICB0b2dnbGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICByZXR1cm4gdGhpcy5oaWRlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5zaG93KCk7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgYW4gZWxlbWVudOKAmXMgdG9vbHRpcC4gVGhpcyBpcyBjb25zaWRlcmVkIGEg4oCcbWFudWFs4oCdIHRyaWdnZXJpbmcgb2ZcbiAgICogdGhlIHRvb2x0aXAuXG4gICAqL1xuICBzaG93KCk6IHZvaWQge1xuICAgIHRoaXMuX3Bvc2l0aW9uU2VydmljZS5zZXRPcHRpb25zKHtcbiAgICAgIG1vZGlmaWVyczoge1xuICAgICAgICBmbGlwOiB7XG4gICAgICAgICAgZW5hYmxlZDogdGhpcy5hZGFwdGl2ZVBvc2l0aW9uXG4gICAgICAgIH0sXG4gICAgICAgIHByZXZlbnRPdmVyZmxvdzoge1xuICAgICAgICAgIGVuYWJsZWQ6IHRoaXMuYWRhcHRpdmVQb3NpdGlvblxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLmlzT3BlbiB8fFxuICAgICAgdGhpcy5pc0Rpc2FibGVkIHx8XG4gICAgICB0aGlzLl9kZWxheVRpbWVvdXRJZCB8fFxuICAgICAgIXRoaXMudG9vbHRpcFxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNob3dUb29sdGlwID0gKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX2RlbGF5VGltZW91dElkKSB7XG4gICAgICAgIHRoaXMuX2RlbGF5VGltZW91dElkID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl90b29sdGlwXG4gICAgICAgIC5hdHRhY2goVG9vbHRpcENvbnRhaW5lckNvbXBvbmVudClcbiAgICAgICAgLnRvKHRoaXMuY29udGFpbmVyKVxuICAgICAgICAucG9zaXRpb24oe2F0dGFjaG1lbnQ6IHRoaXMucGxhY2VtZW50fSlcbiAgICAgICAgLnNob3coe1xuICAgICAgICAgIGNvbnRlbnQ6IHRoaXMudG9vbHRpcCxcbiAgICAgICAgICBwbGFjZW1lbnQ6IHRoaXMucGxhY2VtZW50LFxuICAgICAgICAgIGNvbnRhaW5lckNsYXNzOiB0aGlzLmNvbnRhaW5lckNsYXNzLFxuICAgICAgICAgIGlkOiB0aGlzLmFyaWFEZXNjcmliZWRieVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGNvbnN0IGNhbmNlbERlbGF5ZWRUb29sdGlwU2hvd2luZyA9ICgpID0+IHtcbiAgICAgIGlmICh0aGlzLl90b29sdGlwQ2FuY2VsU2hvd0ZuKSB7XG4gICAgICAgIHRoaXMuX3Rvb2x0aXBDYW5jZWxTaG93Rm4oKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuZGVsYXkpIHtcbiAgICAgIGNvbnN0IF90aW1lciA9IHRpbWVyKHRoaXMuZGVsYXkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHNob3dUb29sdGlwKCk7XG4gICAgICAgIGNhbmNlbERlbGF5ZWRUb29sdGlwU2hvd2luZygpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICh0aGlzLnRyaWdnZXJzKSB7XG4gICAgICAgIGNvbnN0IHRyaWdnZXJzID0gcGFyc2VUcmlnZ2Vycyh0aGlzLnRyaWdnZXJzKTtcbiAgICAgICAgdGhpcy5fdG9vbHRpcENhbmNlbFNob3dGbiA9IHRoaXMuX3JlbmRlcmVyLmxpc3Rlbih0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRyaWdnZXJzWzBdLmNsb3NlLCAoKSA9PiB7XG4gICAgICAgICAgX3RpbWVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgY2FuY2VsRGVsYXllZFRvb2x0aXBTaG93aW5nKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzaG93VG9vbHRpcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgYW4gZWxlbWVudOKAmXMgdG9vbHRpcC4gVGhpcyBpcyBjb25zaWRlcmVkIGEg4oCcbWFudWFs4oCdIHRyaWdnZXJpbmcgb2ZcbiAgICogdGhlIHRvb2x0aXAuXG4gICAqL1xuICBoaWRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9kZWxheVRpbWVvdXRJZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2RlbGF5VGltZW91dElkKTtcbiAgICAgIHRoaXMuX2RlbGF5VGltZW91dElkID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fdG9vbHRpcC5pc1Nob3duKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fdG9vbHRpcC5pbnN0YW5jZS5jbGFzc01hcC5pbiA9IGZhbHNlO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5fdG9vbHRpcC5oaWRlKCk7XG4gICAgfSwgdGhpcy50b29sdGlwRmFkZUR1cmF0aW9uKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3Rvb2x0aXAuZGlzcG9zZSgpO1xuICB9XG59XG4iXX0=