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
var id = 0;
var TooltipDirective = /** @class */ (function () {
    function TooltipDirective(_viewContainerRef, cis, config, _elementRef, _renderer, _positionService) {
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
        this.ariaDescribedby = "tooltip-" + this.tooltipId;
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
    Object.defineProperty(TooltipDirective.prototype, "isOpen", {
        /**
         * Returns whether or not the tooltip is currently being shown
         */
        get: /**
         * Returns whether or not the tooltip is currently being shown
         * @return {?}
         */
        function () {
            return this._tooltip.isShown;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this.show();
            }
            else {
                this.hide();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "htmlContent", {
        /** @deprecated - please use `tooltip` instead */
        set: /**
         * @deprecated - please use `tooltip` instead
         * @param {?} value
         * @return {?}
         */
        function (value) {
            warnOnce('tooltipHtml was deprecated, please use `tooltip` instead');
            this.tooltip = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "_placement", {
        /** @deprecated - please use `placement` instead */
        set: /**
         * @deprecated - please use `placement` instead
         * @param {?} value
         * @return {?}
         */
        function (value) {
            warnOnce('tooltipPlacement was deprecated, please use `placement` instead');
            this.placement = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "_isOpen", {
        get: /**
         * @return {?}
         */
        function () {
            warnOnce('tooltipIsOpen was deprecated, please use `isOpen` instead');
            return this.isOpen;
        },
        /** @deprecated - please use `isOpen` instead */
        set: /**
         * @deprecated - please use `isOpen` instead
         * @param {?} value
         * @return {?}
         */
        function (value) {
            warnOnce('tooltipIsOpen was deprecated, please use `isOpen` instead');
            this.isOpen = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "_enable", {
        get: /**
         * @return {?}
         */
        function () {
            warnOnce('tooltipEnable was deprecated, please use `isDisabled` instead');
            return this.isDisabled;
        },
        /** @deprecated - please use `isDisabled` instead */
        set: /**
         * @deprecated - please use `isDisabled` instead
         * @param {?} value
         * @return {?}
         */
        function (value) {
            warnOnce('tooltipEnable was deprecated, please use `isDisabled` instead');
            this.isDisabled = !value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "_appendToBody", {
        get: /**
         * @return {?}
         */
        function () {
            warnOnce('tooltipAppendToBody was deprecated, please use `container="body"` instead');
            return this.container === 'body';
        },
        /** @deprecated - please use `container="body"` instead */
        set: /**
         * @deprecated - please use `container="body"` instead
         * @param {?} value
         * @return {?}
         */
        function (value) {
            warnOnce('tooltipAppendToBody was deprecated, please use `container="body"` instead');
            this.container = value ? 'body' : this.container;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "_popupClass", {
        /** @deprecated - will replaced with customClass */
        set: /**
         * @deprecated - will replaced with customClass
         * @param {?} value
         * @return {?}
         */
        function (value) {
            warnOnce('tooltipClass deprecated');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "_tooltipContext", {
        /** @deprecated - removed */
        set: /**
         * @deprecated - removed
         * @param {?} value
         * @return {?}
         */
        function (value) {
            warnOnce('tooltipContext deprecated');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "_tooltipPopupDelay", {
        /** @deprecated */
        set: /**
         * @deprecated
         * @param {?} value
         * @return {?}
         */
        function (value) {
            warnOnce('tooltipPopupDelay is deprecated, use `delay` instead');
            this.delay = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "_tooltipTrigger", {
        /** @deprecated -  please use `triggers` instead */
        get: /**
         * @deprecated -  please use `triggers` instead
         * @return {?}
         */
        function () {
            warnOnce('tooltipTrigger was deprecated, please use `triggers` instead');
            return this.triggers;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            warnOnce('tooltipTrigger was deprecated, please use `triggers` instead');
            this.triggers = (value || '').toString();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TooltipDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._tooltip.listen({
            triggers: this.triggers,
            show: (/**
             * @return {?}
             */
            function () { return _this.show(); })
        });
        /* tslint:disable-next-line:no-any */
        this.tooltipChange.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value) {
                _this._tooltip.hide();
            }
        }));
    };
    /**
     * Toggles an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     */
    /**
     * Toggles an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     * @return {?}
     */
    TooltipDirective.prototype.toggle = /**
     * Toggles an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     * @return {?}
     */
    function () {
        if (this.isOpen) {
            return this.hide();
        }
        this.show();
    };
    /**
     * Opens an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     */
    /**
     * Opens an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     * @return {?}
     */
    TooltipDirective.prototype.show = /**
     * Opens an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     * @return {?}
     */
    function () {
        var _this = this;
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
        var showTooltip = (/**
         * @return {?}
         */
        function () {
            if (_this._delayTimeoutId) {
                _this._delayTimeoutId = undefined;
            }
            _this._tooltip
                .attach(TooltipContainerComponent)
                .to(_this.container)
                .position({ attachment: _this.placement })
                .show({
                content: _this.tooltip,
                placement: _this.placement,
                containerClass: _this.containerClass,
                id: _this.ariaDescribedby
            });
        });
        /** @type {?} */
        var cancelDelayedTooltipShowing = (/**
         * @return {?}
         */
        function () {
            if (_this._tooltipCancelShowFn) {
                _this._tooltipCancelShowFn();
            }
        });
        if (this.delay) {
            /** @type {?} */
            var _timer_1 = timer(this.delay).subscribe((/**
             * @return {?}
             */
            function () {
                showTooltip();
                cancelDelayedTooltipShowing();
            }));
            if (this.triggers) {
                /** @type {?} */
                var triggers = parseTriggers(this.triggers);
                this._tooltipCancelShowFn = this._renderer.listen(this._elementRef.nativeElement, triggers[0].close, (/**
                 * @return {?}
                 */
                function () {
                    _timer_1.unsubscribe();
                    cancelDelayedTooltipShowing();
                }));
            }
        }
        else {
            showTooltip();
        }
    };
    /**
     * Closes an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     */
    /**
     * Closes an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     * @return {?}
     */
    TooltipDirective.prototype.hide = /**
     * Closes an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     * @return {?}
     */
    function () {
        var _this = this;
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
        function () {
            _this._tooltip.hide();
        }), this.tooltipFadeDuration);
    };
    /**
     * @return {?}
     */
    TooltipDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._tooltip.dispose();
    };
    TooltipDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[tooltip], [tooltipHtml]',
                    exportAs: 'bs-tooltip'
                },] }
    ];
    /** @nocollapse */
    TooltipDirective.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: ComponentLoaderFactory },
        { type: TooltipConfig },
        { type: ElementRef },
        { type: Renderer2 },
        { type: PositioningService }
    ]; };
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
    return TooltipDirective;
}());
export { TooltipDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYm9vdHN0cmFwL3Rvb2x0aXAvIiwic291cmNlcyI6WyJ0b29sdGlwLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osV0FBVyxFQUNYLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxFQUVULGdCQUFnQixFQUNqQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFakQsT0FBTyxFQUFtQixzQkFBc0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRS9ELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7O0lBRXpCLEVBQUUsR0FBRyxDQUFDO0FBRVY7SUFxTEUsMEJBQ0UsaUJBQW1DLEVBQ25DLEdBQTJCLEVBQzNCLE1BQXFCLEVBQ2IsV0FBdUIsRUFDdkIsU0FBb0IsRUFDcEIsZ0JBQW9DO1FBRnBDLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFvQjtRQXRMOUMsY0FBUyxHQUFHLEVBQUUsRUFBRSxDQUFDOzs7O1FBWWpCLHFDQUFxQztRQUNyQyxrQkFBYSxHQUE0QyxJQUFJLFlBQVksRUFBRSxDQUFDOzs7O1FBa0JuRSxtQkFBYyxHQUFHLEVBQUUsQ0FBQzs7OztRQWlHcEIscUJBQWdCLEdBQUcsSUFBSSxDQUFDOzs7O1FBdUJ4Qix3QkFB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S3JDLG9DQUFzQzs7Ozs7SUE2RHRDLDRDQUFpQzs7Ozs7SUF1QmpDLCtDQUFtQzs7SUFlbkMsMkNBQW9GOzs7OztJQUdwRiwrQ0FDeUU7Ozs7O0lBRXpFLDJDQUF3Qzs7Ozs7SUFDeEMsZ0RBQXlDOzs7OztJQUV6QyxvQ0FBNkQ7Ozs7O0lBSzNELHVDQUErQjs7Ozs7SUFDL0IscUNBQTRCOzs7OztJQUM1Qiw0Q0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZTogbWF4LWZpbGUtbGluZS1jb3VudCBkZXByZWNhdGlvbiAqL1xuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgVG9vbHRpcENvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vdG9vbHRpcC1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRvb2x0aXBDb25maWcgfSBmcm9tICcuL3Rvb2x0aXAuY29uZmlnJztcblxuaW1wb3J0IHsgQ29tcG9uZW50TG9hZGVyLCBDb21wb25lbnRMb2FkZXJGYWN0b3J5IH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9jb21wb25lbnQtbG9hZGVyJztcbmltcG9ydCB7IE9uQ2hhbmdlLCB3YXJuT25jZSwgcGFyc2VUcmlnZ2VycyB9IGZyb20gJ25neC1ib290c3RyYXAvdXRpbHMnO1xuaW1wb3J0IHsgUG9zaXRpb25pbmdTZXJ2aWNlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9wb3NpdGlvbmluZyc7XG5cbmltcG9ydCB7IHRpbWVyIH0gZnJvbSAncnhqcyc7XG5cbmxldCBpZCA9IDA7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t0b29sdGlwXSwgW3Rvb2x0aXBIdG1sXScsXG4gIGV4cG9ydEFzOiAnYnMtdG9vbHRpcCdcbn0pXG5leHBvcnQgY2xhc3MgVG9vbHRpcERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgdG9vbHRpcElkID0gaWQrKztcbiAgLyoqIHNldHMgZGlzYWJsZSBhZGFwdGl2ZSBwb3NpdGlvbiAqL1xuICBASW5wdXQoKSBhZGFwdGl2ZVBvc2l0aW9uOiBib29sZWFuO1xuICAvKipcbiAgICogQ29udGVudCB0byBiZSBkaXNwbGF5ZWQgYXMgdG9vbHRpcC5cbiAgICovXG4gIEBPbkNoYW5nZSgpXG4gIEBJbnB1dCgpXG4gIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnkgKi9cbiAgdG9vbHRpcDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcbiAgLyoqIEZpcmVkIHdoZW4gdG9vbHRpcCBjb250ZW50IGNoYW5nZXMgKi9cbiAgQE91dHB1dCgpXG4gIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnkgKi9cbiAgdG9vbHRpcENoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBQbGFjZW1lbnQgb2YgYSB0b29sdGlwLiBBY2NlcHRzOiBcInRvcFwiLCBcImJvdHRvbVwiLCBcImxlZnRcIiwgXCJyaWdodFwiXG4gICAqL1xuICBASW5wdXQoKSBwbGFjZW1lbnQ6IHN0cmluZztcbiAgLyoqXG4gICAqIFNwZWNpZmllcyBldmVudHMgdGhhdCBzaG91bGQgdHJpZ2dlci4gU3VwcG9ydHMgYSBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZlxuICAgKiBldmVudCBuYW1lcy5cbiAgICovXG4gIEBJbnB1dCgpIHRyaWdnZXJzOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBBIHNlbGVjdG9yIHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIHRvb2x0aXAgc2hvdWxkIGJlIGFwcGVuZGVkIHRvLlxuICAgKi9cbiAgQElucHV0KCkgY29udGFpbmVyOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBDc3MgY2xhc3MgZm9yIHRvb2x0aXAgY29udGFpbmVyXG4gICAqL1xuICBASW5wdXQoKSBjb250YWluZXJDbGFzcyA9ICcnO1xuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgdG9vbHRpcCBpcyBjdXJyZW50bHkgYmVpbmcgc2hvd25cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBpc09wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3Rvb2x0aXAuaXNTaG93bjtcbiAgfVxuXG4gIHNldCBpc09wZW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWxsb3dzIHRvIGRpc2FibGUgdG9vbHRpcFxuICAgKi9cbiAgQElucHV0KCkgaXNEaXNhYmxlZDogYm9vbGVhbjtcblxuICAvKipcbiAgICogRGVsYXkgYmVmb3JlIHNob3dpbmcgdGhlIHRvb2x0aXBcbiAgICovXG4gIEBJbnB1dCgpIGRlbGF5OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIHRvb2x0aXAgaXMgc2hvd25cbiAgICovXG4gIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnkgKi9cbiAgQE91dHB1dCgpIG9uU2hvd246IEV2ZW50RW1pdHRlcjxhbnk+O1xuICAvKipcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgdG9vbHRpcCBpcyBoaWRkZW5cbiAgICovXG4gIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnkgKi9cbiAgQE91dHB1dCgpIG9uSGlkZGVuOiBFdmVudEVtaXR0ZXI8YW55PjtcblxuICAvKiogQGRlcHJlY2F0ZWQgLSBwbGVhc2UgdXNlIGB0b29sdGlwYCBpbnN0ZWFkICovXG4gIEBJbnB1dCgndG9vbHRpcEh0bWwnKVxuICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55ICovXG4gIHNldCBodG1sQ29udGVudCh2YWx1ZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55Pikge1xuICAgIHdhcm5PbmNlKCd0b29sdGlwSHRtbCB3YXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBgdG9vbHRpcGAgaW5zdGVhZCcpO1xuICAgIHRoaXMudG9vbHRpcCA9IHZhbHVlO1xuICB9XG5cbiAgLyoqIEBkZXByZWNhdGVkIC0gcGxlYXNlIHVzZSBgcGxhY2VtZW50YCBpbnN0ZWFkICovXG4gIEBJbnB1dCgndG9vbHRpcFBsYWNlbWVudCcpXG4gIHNldCBfcGxhY2VtZW50KHZhbHVlOiBzdHJpbmcpIHtcbiAgICB3YXJuT25jZSgndG9vbHRpcFBsYWNlbWVudCB3YXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBgcGxhY2VtZW50YCBpbnN0ZWFkJyk7XG4gICAgdGhpcy5wbGFjZW1lbnQgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKiBAZGVwcmVjYXRlZCAtIHBsZWFzZSB1c2UgYGlzT3BlbmAgaW5zdGVhZCAqL1xuICBASW5wdXQoJ3Rvb2x0aXBJc09wZW4nKVxuICBzZXQgX2lzT3Blbih2YWx1ZTogYm9vbGVhbikge1xuICAgIHdhcm5PbmNlKCd0b29sdGlwSXNPcGVuIHdhcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGBpc09wZW5gIGluc3RlYWQnKTtcbiAgICB0aGlzLmlzT3BlbiA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IF9pc09wZW4oKTogYm9vbGVhbiB7XG4gICAgd2Fybk9uY2UoJ3Rvb2x0aXBJc09wZW4gd2FzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgYGlzT3BlbmAgaW5zdGVhZCcpO1xuXG4gICAgcmV0dXJuIHRoaXMuaXNPcGVuO1xuICB9XG5cbiAgLyoqIEBkZXByZWNhdGVkIC0gcGxlYXNlIHVzZSBgaXNEaXNhYmxlZGAgaW5zdGVhZCAqL1xuICBASW5wdXQoJ3Rvb2x0aXBFbmFibGUnKVxuICBzZXQgX2VuYWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHdhcm5PbmNlKCd0b29sdGlwRW5hYmxlIHdhcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGBpc0Rpc2FibGVkYCBpbnN0ZWFkJyk7XG4gICAgdGhpcy5pc0Rpc2FibGVkID0gIXZhbHVlO1xuICB9XG5cbiAgZ2V0IF9lbmFibGUoKTogYm9vbGVhbiB7XG4gICAgd2Fybk9uY2UoJ3Rvb2x0aXBFbmFibGUgd2FzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgYGlzRGlzYWJsZWRgIGluc3RlYWQnKTtcblxuICAgIHJldHVybiB0aGlzLmlzRGlzYWJsZWQ7XG4gIH1cblxuICAvKiogQGRlcHJlY2F0ZWQgLSBwbGVhc2UgdXNlIGBjb250YWluZXI9XCJib2R5XCJgIGluc3RlYWQgKi9cbiAgQElucHV0KCd0b29sdGlwQXBwZW5kVG9Cb2R5JylcbiAgc2V0IF9hcHBlbmRUb0JvZHkodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB3YXJuT25jZShcbiAgICAgICd0b29sdGlwQXBwZW5kVG9Cb2R5IHdhcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGBjb250YWluZXI9XCJib2R5XCJgIGluc3RlYWQnXG4gICAgKTtcbiAgICB0aGlzLmNvbnRhaW5lciA9IHZhbHVlID8gJ2JvZHknIDogdGhpcy5jb250YWluZXI7XG4gIH1cblxuICBnZXQgX2FwcGVuZFRvQm9keSgpOiBib29sZWFuIHtcbiAgICB3YXJuT25jZShcbiAgICAgICd0b29sdGlwQXBwZW5kVG9Cb2R5IHdhcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGBjb250YWluZXI9XCJib2R5XCJgIGluc3RlYWQnXG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknO1xuICB9XG5cbiAgLyoqIEBkZXByZWNhdGVkIC0gcmVtb3ZlZCwgd2lsbCBiZSBhZGRlZCB0byBjb25maWd1cmF0aW9uICovXG4gIEBJbnB1dCgpIHRvb2x0aXBBbmltYXRpb24gPSB0cnVlO1xuXG4gIC8qKiBAZGVwcmVjYXRlZCAtIHdpbGwgcmVwbGFjZWQgd2l0aCBjdXN0b21DbGFzcyAqL1xuICBASW5wdXQoJ3Rvb2x0aXBDbGFzcycpXG4gIHNldCBfcG9wdXBDbGFzcyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgd2Fybk9uY2UoJ3Rvb2x0aXBDbGFzcyBkZXByZWNhdGVkJyk7XG4gIH1cblxuICAvKiogQGRlcHJlY2F0ZWQgLSByZW1vdmVkICovXG4gIEBJbnB1dCgndG9vbHRpcENvbnRleHQnKVxuICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55ICovXG4gIHNldCBfdG9vbHRpcENvbnRleHQodmFsdWU6IGFueSkge1xuICAgIHdhcm5PbmNlKCd0b29sdGlwQ29udGV4dCBkZXByZWNhdGVkJyk7XG4gIH1cblxuICAvKiogQGRlcHJlY2F0ZWQgKi9cbiAgQElucHV0KCd0b29sdGlwUG9wdXBEZWxheScpXG4gIHNldCBfdG9vbHRpcFBvcHVwRGVsYXkodmFsdWU6IG51bWJlcikge1xuICAgIHdhcm5PbmNlKCd0b29sdGlwUG9wdXBEZWxheSBpcyBkZXByZWNhdGVkLCB1c2UgYGRlbGF5YCBpbnN0ZWFkJyk7XG4gICAgdGhpcy5kZWxheSA9IHZhbHVlO1xuICB9XG5cbiAgLyoqIEBkZXByZWNhdGVkICovXG4gIEBJbnB1dCgpIHRvb2x0aXBGYWRlRHVyYXRpb24gPSAxNTA7XG5cbiAgLyoqIEBkZXByZWNhdGVkIC0gIHBsZWFzZSB1c2UgYHRyaWdnZXJzYCBpbnN0ZWFkICovXG4gIEBJbnB1dCgndG9vbHRpcFRyaWdnZXInKVxuICBnZXQgX3Rvb2x0aXBUcmlnZ2VyKCk6IHN0cmluZyB8IHN0cmluZ1tdIHtcbiAgICB3YXJuT25jZSgndG9vbHRpcFRyaWdnZXIgd2FzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgYHRyaWdnZXJzYCBpbnN0ZWFkJyk7XG5cbiAgICByZXR1cm4gdGhpcy50cmlnZ2VycztcbiAgfVxuXG4gIHNldCBfdG9vbHRpcFRyaWdnZXIodmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdKSB7XG4gICAgd2Fybk9uY2UoJ3Rvb2x0aXBUcmlnZ2VyIHdhcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGB0cmlnZ2Vyc2AgaW5zdGVhZCcpO1xuICAgIHRoaXMudHJpZ2dlcnMgPSAodmFsdWUgfHwgJycpLnRvU3RyaW5nKCk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1kZXNjcmliZWRieScpIGFyaWFEZXNjcmliZWRieSA9IGB0b29sdGlwLSR7dGhpcy50b29sdGlwSWR9YDtcblxuICAvKiogQGRlcHJlY2F0ZWQgKi9cbiAgQE91dHB1dCgpXG4gIHRvb2x0aXBTdGF0ZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueSAqL1xuICBwcm90ZWN0ZWQgX2RlbGF5VGltZW91dElkOiBudW1iZXIgfCBhbnk7XG4gIHByb3RlY3RlZCBfdG9vbHRpcENhbmNlbFNob3dGbjogRnVuY3Rpb247XG5cbiAgcHJpdmF0ZSBfdG9vbHRpcDogQ29tcG9uZW50TG9hZGVyPFRvb2x0aXBDb250YWluZXJDb21wb25lbnQ+O1xuICBjb25zdHJ1Y3RvcihcbiAgICBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBjaXM6IENvbXBvbmVudExvYWRlckZhY3RvcnksXG4gICAgY29uZmlnOiBUb29sdGlwQ29uZmlnLFxuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIF9wb3NpdGlvblNlcnZpY2U6IFBvc2l0aW9uaW5nU2VydmljZVxuICApIHtcblxuICAgIHRoaXMuX3Rvb2x0aXAgPSBjaXNcbiAgICAgIC5jcmVhdGVMb2FkZXI8VG9vbHRpcENvbnRhaW5lckNvbXBvbmVudD4oXG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYsXG4gICAgICAgIF92aWV3Q29udGFpbmVyUmVmLFxuICAgICAgICB0aGlzLl9yZW5kZXJlclxuICAgICAgKVxuICAgICAgLnByb3ZpZGUoe3Byb3ZpZGU6IFRvb2x0aXBDb25maWcsIHVzZVZhbHVlOiBjb25maWd9KTtcblxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgY29uZmlnKTtcbiAgICB0aGlzLm9uU2hvd24gPSB0aGlzLl90b29sdGlwLm9uU2hvd247XG4gICAgdGhpcy5vbkhpZGRlbiA9IHRoaXMuX3Rvb2x0aXAub25IaWRkZW47XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl90b29sdGlwLmxpc3Rlbih7XG4gICAgICB0cmlnZ2VyczogdGhpcy50cmlnZ2VycyxcbiAgICAgIHNob3c6ICgpID0+IHRoaXMuc2hvdygpXG4gICAgfSk7XG4gICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueSAqL1xuICAgIHRoaXMudG9vbHRpcENoYW5nZS5zdWJzY3JpYmUoKHZhbHVlOiBhbnkpID0+IHtcbiAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fdG9vbHRpcC5oaWRlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyBhbiBlbGVtZW504oCZcyB0b29sdGlwLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDigJxtYW51YWzigJ0gdHJpZ2dlcmluZyBvZlxuICAgKiB0aGUgdG9vbHRpcC5cbiAgICovXG4gIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgIHJldHVybiB0aGlzLmhpZGUoKTtcbiAgICB9XG5cbiAgICB0aGlzLnNob3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyBhbiBlbGVtZW504oCZcyB0b29sdGlwLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDigJxtYW51YWzigJ0gdHJpZ2dlcmluZyBvZlxuICAgKiB0aGUgdG9vbHRpcC5cbiAgICovXG4gIHNob3coKTogdm9pZCB7XG4gICAgdGhpcy5fcG9zaXRpb25TZXJ2aWNlLnNldE9wdGlvbnMoe1xuICAgICAgbW9kaWZpZXJzOiB7XG4gICAgICAgIGZsaXA6IHtcbiAgICAgICAgICBlbmFibGVkOiB0aGlzLmFkYXB0aXZlUG9zaXRpb25cbiAgICAgICAgfSxcbiAgICAgICAgcHJldmVudE92ZXJmbG93OiB7XG4gICAgICAgICAgZW5hYmxlZDogdGhpcy5hZGFwdGl2ZVBvc2l0aW9uXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChcbiAgICAgIHRoaXMuaXNPcGVuIHx8XG4gICAgICB0aGlzLmlzRGlzYWJsZWQgfHxcbiAgICAgIHRoaXMuX2RlbGF5VGltZW91dElkIHx8XG4gICAgICAhdGhpcy50b29sdGlwXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2hvd1Rvb2x0aXAgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fZGVsYXlUaW1lb3V0SWQpIHtcbiAgICAgICAgdGhpcy5fZGVsYXlUaW1lb3V0SWQgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3Rvb2x0aXBcbiAgICAgICAgLmF0dGFjaChUb29sdGlwQ29udGFpbmVyQ29tcG9uZW50KVxuICAgICAgICAudG8odGhpcy5jb250YWluZXIpXG4gICAgICAgIC5wb3NpdGlvbih7YXR0YWNobWVudDogdGhpcy5wbGFjZW1lbnR9KVxuICAgICAgICAuc2hvdyh7XG4gICAgICAgICAgY29udGVudDogdGhpcy50b29sdGlwLFxuICAgICAgICAgIHBsYWNlbWVudDogdGhpcy5wbGFjZW1lbnQsXG4gICAgICAgICAgY29udGFpbmVyQ2xhc3M6IHRoaXMuY29udGFpbmVyQ2xhc3MsXG4gICAgICAgICAgaWQ6IHRoaXMuYXJpYURlc2NyaWJlZGJ5XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgY29uc3QgY2FuY2VsRGVsYXllZFRvb2x0aXBTaG93aW5nID0gKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX3Rvb2x0aXBDYW5jZWxTaG93Rm4pIHtcbiAgICAgICAgdGhpcy5fdG9vbHRpcENhbmNlbFNob3dGbigpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAodGhpcy5kZWxheSkge1xuICAgICAgY29uc3QgX3RpbWVyID0gdGltZXIodGhpcy5kZWxheSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgc2hvd1Rvb2x0aXAoKTtcbiAgICAgICAgY2FuY2VsRGVsYXllZFRvb2x0aXBTaG93aW5nKCk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHRoaXMudHJpZ2dlcnMpIHtcbiAgICAgICAgY29uc3QgdHJpZ2dlcnMgPSBwYXJzZVRyaWdnZXJzKHRoaXMudHJpZ2dlcnMpO1xuICAgICAgICB0aGlzLl90b29sdGlwQ2FuY2VsU2hvd0ZuID0gdGhpcy5fcmVuZGVyZXIubGlzdGVuKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdHJpZ2dlcnNbMF0uY2xvc2UsICgpID0+IHtcbiAgICAgICAgICBfdGltZXIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICBjYW5jZWxEZWxheWVkVG9vbHRpcFNob3dpbmcoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNob3dUb29sdGlwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyBhbiBlbGVtZW504oCZcyB0b29sdGlwLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDigJxtYW51YWzigJ0gdHJpZ2dlcmluZyBvZlxuICAgKiB0aGUgdG9vbHRpcC5cbiAgICovXG4gIGhpZGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2RlbGF5VGltZW91dElkKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fZGVsYXlUaW1lb3V0SWQpO1xuICAgICAgdGhpcy5fZGVsYXlUaW1lb3V0SWQgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl90b29sdGlwLmlzU2hvd24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl90b29sdGlwLmluc3RhbmNlLmNsYXNzTWFwLmluID0gZmFsc2U7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl90b29sdGlwLmhpZGUoKTtcbiAgICB9LCB0aGlzLnRvb2x0aXBGYWRlRHVyYXRpb24pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fdG9vbHRpcC5kaXNwb3NlKCk7XG4gIH1cbn1cbiJdfQ==