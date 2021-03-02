/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, ElementRef, RendererFactory2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { positionElements } from './ng-positioning';
import { fromEvent, merge, of, animationFrameScheduler, Subject } from 'rxjs';
/**
 * @record
 */
export function PositioningOptions() { }
if (false) {
    /**
     * The DOM element, ElementRef, or a selector string of an element which will be moved
     * @type {?|undefined}
     */
    PositioningOptions.prototype.element;
    /**
     * The DOM element, ElementRef, or a selector string of an element which the element will be attached to
     * @type {?|undefined}
     */
    PositioningOptions.prototype.target;
    /**
     * A string of the form 'vert-attachment horiz-attachment' or 'placement'
     * - placement can be "top", "bottom", "left", "right"
     * not yet supported:
     * - vert-attachment can be any of 'top', 'middle', 'bottom'
     * - horiz-attachment can be any of 'left', 'center', 'right'
     * @type {?|undefined}
     */
    PositioningOptions.prototype.attachment;
    /**
     * A string similar to `attachment`. The one difference is that, if it's not provided,
     * `targetAttachment` will assume the mirror image of `attachment`.
     * @type {?|undefined}
     */
    PositioningOptions.prototype.targetAttachment;
    /**
     * A string of the form 'vert-offset horiz-offset'
     * - vert-offset and horiz-offset can be of the form "20px" or "55%"
     * @type {?|undefined}
     */
    PositioningOptions.prototype.offset;
    /**
     * A string similar to `offset`, but referring to the offset of the target
     * @type {?|undefined}
     */
    PositioningOptions.prototype.targetOffset;
    /**
     * If true component will be attached to body
     * @type {?|undefined}
     */
    PositioningOptions.prototype.appendToBody;
}
var PositioningService = /** @class */ (function () {
    function PositioningService(rendererFactory, platformId) {
        var _this = this;
        this.update$$ = new Subject();
        this.positionElements = new Map();
        this.isDisabled = false;
        if (isPlatformBrowser(platformId)) {
            this.triggerEvent$ = merge(fromEvent(window, 'scroll'), fromEvent(window, 'resize'), 
            /* tslint:disable-next-line: deprecation */
            of(0, animationFrameScheduler), this.update$$);
            this.triggerEvent$.subscribe((/**
             * @return {?}
             */
            function () {
                if (_this.isDisabled) {
                    return;
                }
                _this.positionElements
                    /* tslint:disable-next-line: no-any */
                    .forEach((/**
                 * @param {?} positionElement
                 * @return {?}
                 */
                function (positionElement) {
                    positionElements(_getHtmlElement(positionElement.target), _getHtmlElement(positionElement.element), positionElement.attachment, positionElement.appendToBody, _this.options, rendererFactory.createRenderer(null, null));
                }));
            }));
        }
    }
    /**
     * @param {?} options
     * @return {?}
     */
    PositioningService.prototype.position = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        this.addPositionElement(options);
    };
    Object.defineProperty(PositioningService.prototype, "event$", {
        get: /**
         * @return {?}
         */
        function () {
            return this.triggerEvent$;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PositioningService.prototype.disable = /**
     * @return {?}
     */
    function () {
        this.isDisabled = true;
    };
    /**
     * @return {?}
     */
    PositioningService.prototype.enable = /**
     * @return {?}
     */
    function () {
        this.isDisabled = false;
    };
    /**
     * @param {?} options
     * @return {?}
     */
    PositioningService.prototype.addPositionElement = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        this.positionElements.set(_getHtmlElement(options.element), options);
    };
    /**
     * @return {?}
     */
    PositioningService.prototype.calcPosition = /**
     * @return {?}
     */
    function () {
        this.update$$.next();
    };
    /**
     * @param {?} elRef
     * @return {?}
     */
    PositioningService.prototype.deletePositionElement = /**
     * @param {?} elRef
     * @return {?}
     */
    function (elRef) {
        this.positionElements.delete(_getHtmlElement(elRef));
    };
    /**
     * @param {?} options
     * @return {?}
     */
    PositioningService.prototype.setOptions = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        this.options = options;
    };
    PositioningService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    PositioningService.ctorParameters = function () { return [
        { type: RendererFactory2 },
        { type: Number, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    return PositioningService;
}());
export { PositioningService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PositioningService.prototype.options;
    /**
     * @type {?}
     * @private
     */
    PositioningService.prototype.update$$;
    /**
     * @type {?}
     * @private
     */
    PositioningService.prototype.positionElements;
    /**
     * @type {?}
     * @private
     */
    PositioningService.prototype.triggerEvent$;
    /**
     * @type {?}
     * @private
     */
    PositioningService.prototype.isDisabled;
}
/**
 * @param {?} element
 * @return {?}
 */
function _getHtmlElement(element) {
    // it means that we got a selector
    if (typeof element === 'string') {
        return document.querySelector(element);
    }
    if (element instanceof ElementRef) {
        return element.nativeElement;
    }
    return element;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zaXRpb25pbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1ib290c3RyYXAvcG9zaXRpb25pbmcvIiwic291cmNlcyI6WyJwb3NpdGlvbmluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXBELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXBELE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSx1QkFBdUIsRUFBRSxPQUFPLEVBQWMsTUFBTSxNQUFNLENBQUM7Ozs7QUFJMUYsd0NBK0JDOzs7Ozs7SUE3QkMscUNBQTRDOzs7OztJQUc1QyxvQ0FBMkM7Ozs7Ozs7OztJQVMzQyx3Q0FBb0I7Ozs7OztJQUtwQiw4Q0FBMEI7Ozs7OztJQUsxQixvQ0FBZ0I7Ozs7O0lBR2hCLDBDQUFzQjs7Ozs7SUFHdEIsMENBQXVCOztBQUl6QjtJQVFFLDRCQUNFLGVBQWlDLEVBQ1osVUFBa0I7UUFGekMsaUJBZ0NDO1FBckNPLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQy9CLHFCQUFnQixHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFFN0IsZUFBVSxHQUFHLEtBQUssQ0FBQztRQU16QixJQUFJLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUN4QixTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxFQUMzQixTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQztZQUMzQiwyQ0FBMkM7WUFDM0MsRUFBRSxDQUFDLENBQUMsRUFBRSx1QkFBdUIsQ0FBQyxFQUM5QixJQUFJLENBQUMsUUFBUSxDQUNkLENBQUM7WUFFRixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVM7OztZQUFDO2dCQUN6QixJQUFJLEtBQUksQ0FBQyxVQUFVLEVBQUU7b0JBQ25CLE9BQU87aUJBQ1I7Z0JBRUQsS0FBSSxDQUFDLGdCQUFnQjtvQkFDbkIsc0NBQXNDO3FCQUNyQyxPQUFPOzs7O2dCQUFDLFVBQUMsZUFBb0I7b0JBQzVCLGdCQUFnQixDQUNkLGVBQWUsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEVBQ3ZDLGVBQWUsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQ3hDLGVBQWUsQ0FBQyxVQUFVLEVBQzFCLGVBQWUsQ0FBQyxZQUFZLEVBQzVCLEtBQUksQ0FBQyxPQUFPLEVBQ1osZUFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQzNDLENBQUM7Z0JBQ0osQ0FBQyxFQUFDLENBQUM7WUFDUCxDQUFDLEVBQUMsQ0FBQztTQUNOO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxxQ0FBUTs7OztJQUFSLFVBQVMsT0FBMkI7UUFDbEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxzQkFBSSxzQ0FBTTs7OztRQUFWO1lBQ0UsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzVCLENBQUM7OztPQUFBOzs7O0lBRUQsb0NBQU87OztJQUFQO1FBQ0UsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQzs7OztJQUVELG1DQUFNOzs7SUFBTjtRQUNFLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7Ozs7O0lBRUQsK0NBQWtCOzs7O0lBQWxCLFVBQW1CLE9BQTJCO1FBQzVDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN2RSxDQUFDOzs7O0lBRUQseUNBQVk7OztJQUFaO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7OztJQUVELGtEQUFxQjs7OztJQUFyQixVQUFzQixLQUFpQjtRQUNyQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7Ozs7O0lBRUQsdUNBQVU7Ozs7SUFBVixVQUFXLE9BQWdCO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7O2dCQXhFRixVQUFVOzs7O2dCQTNDc0IsZ0JBQWdCOzZDQXFENUMsTUFBTSxTQUFDLFdBQVc7O0lBK0R2Qix5QkFBQztDQUFBLEFBekVELElBeUVDO1NBeEVZLGtCQUFrQjs7Ozs7O0lBQzdCLHFDQUF5Qjs7Ozs7SUFDekIsc0NBQXVDOzs7OztJQUN2Qyw4Q0FBcUM7Ozs7O0lBQ3JDLDJDQUFnRDs7Ozs7SUFDaEQsd0NBQTJCOzs7Ozs7QUFxRTdCLFNBQVMsZUFBZSxDQUFDLE9BQTBDO0lBQ2pFLGtDQUFrQztJQUNsQyxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtRQUMvQixPQUFPLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDeEM7SUFFRCxJQUFJLE9BQU8sWUFBWSxVQUFVLEVBQUU7UUFDakMsT0FBTyxPQUFPLENBQUMsYUFBYSxDQUFDO0tBQzlCO0lBRUQsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEVsZW1lbnRSZWYsIFJlbmRlcmVyRmFjdG9yeTIsIEluamVjdCwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgcG9zaXRpb25FbGVtZW50cyB9IGZyb20gJy4vbmctcG9zaXRpb25pbmcnO1xuXG5pbXBvcnQgeyBmcm9tRXZlbnQsIG1lcmdlLCBvZiwgYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIsIFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE9wdGlvbnMgfSBmcm9tICcuL21vZGVscyc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBQb3NpdGlvbmluZ09wdGlvbnMge1xuICAvKiogVGhlIERPTSBlbGVtZW50LCBFbGVtZW50UmVmLCBvciBhIHNlbGVjdG9yIHN0cmluZyBvZiBhbiBlbGVtZW50IHdoaWNoIHdpbGwgYmUgbW92ZWQgKi9cbiAgZWxlbWVudD86IEhUTUxFbGVtZW50IHwgRWxlbWVudFJlZiB8IHN0cmluZztcblxuICAvKiogVGhlIERPTSBlbGVtZW50LCBFbGVtZW50UmVmLCBvciBhIHNlbGVjdG9yIHN0cmluZyBvZiBhbiBlbGVtZW50IHdoaWNoIHRoZSBlbGVtZW50IHdpbGwgYmUgYXR0YWNoZWQgdG8gICovXG4gIHRhcmdldD86IEhUTUxFbGVtZW50IHwgRWxlbWVudFJlZiB8IHN0cmluZztcblxuICAvKipcbiAgICogQSBzdHJpbmcgb2YgdGhlIGZvcm0gJ3ZlcnQtYXR0YWNobWVudCBob3Jpei1hdHRhY2htZW50JyBvciAncGxhY2VtZW50J1xuICAgKiAtIHBsYWNlbWVudCBjYW4gYmUgXCJ0b3BcIiwgXCJib3R0b21cIiwgXCJsZWZ0XCIsIFwicmlnaHRcIlxuICAgKiBub3QgeWV0IHN1cHBvcnRlZDpcbiAgICogLSB2ZXJ0LWF0dGFjaG1lbnQgY2FuIGJlIGFueSBvZiAndG9wJywgJ21pZGRsZScsICdib3R0b20nXG4gICAqIC0gaG9yaXotYXR0YWNobWVudCBjYW4gYmUgYW55IG9mICdsZWZ0JywgJ2NlbnRlcicsICdyaWdodCdcbiAgICovXG4gIGF0dGFjaG1lbnQ/OiBzdHJpbmc7XG5cbiAgLyoqIEEgc3RyaW5nIHNpbWlsYXIgdG8gYGF0dGFjaG1lbnRgLiBUaGUgb25lIGRpZmZlcmVuY2UgaXMgdGhhdCwgaWYgaXQncyBub3QgcHJvdmlkZWQsXG4gICAqIGB0YXJnZXRBdHRhY2htZW50YCB3aWxsIGFzc3VtZSB0aGUgbWlycm9yIGltYWdlIG9mIGBhdHRhY2htZW50YC5cbiAgICovXG4gIHRhcmdldEF0dGFjaG1lbnQ/OiBzdHJpbmc7XG5cbiAgLyoqIEEgc3RyaW5nIG9mIHRoZSBmb3JtICd2ZXJ0LW9mZnNldCBob3Jpei1vZmZzZXQnXG4gICAqIC0gdmVydC1vZmZzZXQgYW5kIGhvcml6LW9mZnNldCBjYW4gYmUgb2YgdGhlIGZvcm0gXCIyMHB4XCIgb3IgXCI1NSVcIlxuICAgKi9cbiAgb2Zmc2V0Pzogc3RyaW5nO1xuXG4gIC8qKiBBIHN0cmluZyBzaW1pbGFyIHRvIGBvZmZzZXRgLCBidXQgcmVmZXJyaW5nIHRvIHRoZSBvZmZzZXQgb2YgdGhlIHRhcmdldCAqL1xuICB0YXJnZXRPZmZzZXQ/OiBzdHJpbmc7XG5cbiAgLyoqIElmIHRydWUgY29tcG9uZW50IHdpbGwgYmUgYXR0YWNoZWQgdG8gYm9keSAqL1xuICBhcHBlbmRUb0JvZHk/OiBib29sZWFuO1xufVxuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQb3NpdGlvbmluZ1NlcnZpY2Uge1xuICBwcml2YXRlIG9wdGlvbnM6IE9wdGlvbnM7XG4gIHByaXZhdGUgdXBkYXRlJCQgPSBuZXcgU3ViamVjdDxudWxsPigpO1xuICBwcml2YXRlIHBvc2l0aW9uRWxlbWVudHMgPSBuZXcgTWFwKCk7XG4gIHByaXZhdGUgdHJpZ2dlckV2ZW50JDogT2JzZXJ2YWJsZTxudW1iZXJ8RXZlbnQ+O1xuICBwcml2YXRlIGlzRGlzYWJsZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICByZW5kZXJlckZhY3Rvcnk6IFJlbmRlcmVyRmFjdG9yeTIsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcGxhdGZvcm1JZDogbnVtYmVyXG4gICkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy50cmlnZ2VyRXZlbnQkID0gbWVyZ2UoXG4gICAgICAgIGZyb21FdmVudCh3aW5kb3csICdzY3JvbGwnKSxcbiAgICAgICAgZnJvbUV2ZW50KHdpbmRvdywgJ3Jlc2l6ZScpLFxuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uICovXG4gICAgICAgIG9mKDAsIGFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyKSxcbiAgICAgICAgdGhpcy51cGRhdGUkJFxuICAgICAgKTtcblxuICAgICAgdGhpcy50cmlnZ2VyRXZlbnQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaXNEaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMucG9zaXRpb25FbGVtZW50c1xuICAgICAgICAgICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbnkgKi9cbiAgICAgICAgICAgIC5mb3JFYWNoKChwb3NpdGlvbkVsZW1lbnQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICBwb3NpdGlvbkVsZW1lbnRzKFxuICAgICAgICAgICAgICAgIF9nZXRIdG1sRWxlbWVudChwb3NpdGlvbkVsZW1lbnQudGFyZ2V0KSxcbiAgICAgICAgICAgICAgICBfZ2V0SHRtbEVsZW1lbnQocG9zaXRpb25FbGVtZW50LmVsZW1lbnQpLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uRWxlbWVudC5hdHRhY2htZW50LFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uRWxlbWVudC5hcHBlbmRUb0JvZHksXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLFxuICAgICAgICAgICAgICAgIHJlbmRlcmVyRmFjdG9yeS5jcmVhdGVSZW5kZXJlcihudWxsLCBudWxsKVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHBvc2l0aW9uKG9wdGlvbnM6IFBvc2l0aW9uaW5nT3B0aW9ucyk6IHZvaWQge1xuICAgIHRoaXMuYWRkUG9zaXRpb25FbGVtZW50KG9wdGlvbnMpO1xuICB9XG5cbiAgZ2V0IGV2ZW50JCgpOiBPYnNlcnZhYmxlPG51bWJlcnxFdmVudD4ge1xuICAgIHJldHVybiB0aGlzLnRyaWdnZXJFdmVudCQ7XG4gIH1cblxuICBkaXNhYmxlKCk6IHZvaWQge1xuICAgIHRoaXMuaXNEaXNhYmxlZCA9IHRydWU7XG4gIH1cblxuICBlbmFibGUoKTogdm9pZCB7XG4gICAgdGhpcy5pc0Rpc2FibGVkID0gZmFsc2U7XG4gIH1cblxuICBhZGRQb3NpdGlvbkVsZW1lbnQob3B0aW9uczogUG9zaXRpb25pbmdPcHRpb25zKTogdm9pZCB7XG4gICAgdGhpcy5wb3NpdGlvbkVsZW1lbnRzLnNldChfZ2V0SHRtbEVsZW1lbnQob3B0aW9ucy5lbGVtZW50KSwgb3B0aW9ucyk7XG4gIH1cblxuICBjYWxjUG9zaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUkJC5uZXh0KCk7XG4gIH1cblxuICBkZWxldGVQb3NpdGlvbkVsZW1lbnQoZWxSZWY6IEVsZW1lbnRSZWYpOiB2b2lkIHtcbiAgICB0aGlzLnBvc2l0aW9uRWxlbWVudHMuZGVsZXRlKF9nZXRIdG1sRWxlbWVudChlbFJlZikpO1xuICB9XG5cbiAgc2V0T3B0aW9ucyhvcHRpb25zOiBPcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxufVxuXG5mdW5jdGlvbiBfZ2V0SHRtbEVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQgfCBFbGVtZW50UmVmIHwgc3RyaW5nKTogSFRNTEVsZW1lbnQge1xuICAvLyBpdCBtZWFucyB0aGF0IHdlIGdvdCBhIHNlbGVjdG9yXG4gIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KTtcbiAgfVxuXG4gIGlmIChlbGVtZW50IGluc3RhbmNlb2YgRWxlbWVudFJlZikge1xuICAgIHJldHVybiBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn1cbiJdfQ==