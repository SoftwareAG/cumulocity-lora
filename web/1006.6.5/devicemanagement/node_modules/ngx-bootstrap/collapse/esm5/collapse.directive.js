/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { AnimationBuilder } from '@angular/animations';
import { Directive, ElementRef, EventEmitter, HostBinding, Input, Output, Renderer2 } from '@angular/core';
import { collapseAnimation, expandAnimation } from './collapse-animations';
var CollapseDirective = /** @class */ (function () {
    function CollapseDirective(_el, _renderer, _builder) {
        this._el = _el;
        this._renderer = _renderer;
        /**
         * This event fires as soon as content collapses
         */
        this.collapsed = new EventEmitter();
        /**
         * This event fires when collapsing is started
         */
        this.collapses = new EventEmitter();
        /**
         * This event fires as soon as content becomes visible
         */
        this.expanded = new EventEmitter();
        /**
         * This event fires when expansion is started
         */
        this.expands = new EventEmitter();
        // shown
        this.isExpanded = true;
        // hidden
        this.isCollapsed = false;
        // stale state
        this.isCollapse = true;
        // animation state
        this.isCollapsing = false;
        /**
         * turn on/off animation
         */
        this.isAnimated = false;
        this._display = 'block';
        this._stylesLoaded = false;
        this._COLLAPSE_ACTION_NAME = 'collapse';
        this._EXPAND_ACTION_NAME = 'expand';
        this._factoryCollapseAnimation = _builder.build(collapseAnimation);
        this._factoryExpandAnimation = _builder.build(expandAnimation);
    }
    Object.defineProperty(CollapseDirective.prototype, "display", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!this.isAnimated) {
                this._renderer.setStyle(this._el.nativeElement, 'display', value);
                return;
            }
            this._display = value;
            if (value === 'none') {
                this.hide();
                return;
            }
            this.show();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollapseDirective.prototype, "collapse", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isExpanded;
        },
        /** A flag indicating visibility of content (shown or hidden) */
        set: /**
         * A flag indicating visibility of content (shown or hidden)
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!this._player || this._isAnimationDone) {
                this.isExpanded = value;
                this.toggle();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CollapseDirective.prototype.ngAfterViewChecked = /**
     * @return {?}
     */
    function () {
        this._stylesLoaded = true;
        if (!this._player || !this._isAnimationDone) {
            return;
        }
        this._player.reset();
        this._renderer.setStyle(this._el.nativeElement, 'height', '*');
    };
    /** allows to manually toggle content visibility */
    /**
     * allows to manually toggle content visibility
     * @return {?}
     */
    CollapseDirective.prototype.toggle = /**
     * allows to manually toggle content visibility
     * @return {?}
     */
    function () {
        if (this.isExpanded) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    /** allows to manually hide content */
    /**
     * allows to manually hide content
     * @return {?}
     */
    CollapseDirective.prototype.hide = /**
     * allows to manually hide content
     * @return {?}
     */
    function () {
        var _this = this;
        this.isCollapsing = true;
        this.isExpanded = false;
        this.isCollapsed = true;
        this.isCollapsing = false;
        this.collapses.emit(this);
        this._isAnimationDone = false;
        this.animationRun(this.isAnimated, this._COLLAPSE_ACTION_NAME)((/**
         * @return {?}
         */
        function () {
            _this._isAnimationDone = true;
            _this.collapsed.emit(_this);
            _this._renderer.setStyle(_this._el.nativeElement, 'display', 'none');
        }));
    };
    /** allows to manually show collapsed content */
    /**
     * allows to manually show collapsed content
     * @return {?}
     */
    CollapseDirective.prototype.show = /**
     * allows to manually show collapsed content
     * @return {?}
     */
    function () {
        var _this = this;
        this._renderer.setStyle(this._el.nativeElement, 'display', this._display);
        this.isCollapsing = true;
        this.isExpanded = true;
        this.isCollapsed = false;
        this.isCollapsing = false;
        this.expands.emit(this);
        this._isAnimationDone = false;
        this.animationRun(this.isAnimated, this._EXPAND_ACTION_NAME)((/**
         * @return {?}
         */
        function () {
            _this._isAnimationDone = true;
            _this.expanded.emit(_this);
        }));
    };
    /**
     * @param {?} isAnimated
     * @param {?} action
     * @return {?}
     */
    CollapseDirective.prototype.animationRun = /**
     * @param {?} isAnimated
     * @param {?} action
     * @return {?}
     */
    function (isAnimated, action) {
        var _this = this;
        if (!isAnimated || !this._stylesLoaded) {
            return (/**
             * @param {?} callback
             * @return {?}
             */
            function (callback) { return callback(); });
        }
        this._renderer.setStyle(this._el.nativeElement, 'overflow', 'hidden');
        this._renderer.addClass(this._el.nativeElement, 'collapse');
        /** @type {?} */
        var factoryAnimation = (action === this._EXPAND_ACTION_NAME)
            ? this._factoryExpandAnimation
            : this._factoryCollapseAnimation;
        if (this._player) {
            this._player.destroy();
        }
        this._player = factoryAnimation.create(this._el.nativeElement);
        this._player.play();
        return (/**
         * @param {?} callback
         * @return {?}
         */
        function (callback) { return _this._player.onDone(callback); });
    };
    CollapseDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[collapse]',
                    exportAs: 'bs-collapse',
                    host: {
                        '[class.collapse]': 'true'
                    }
                },] }
    ];
    /** @nocollapse */
    CollapseDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: AnimationBuilder }
    ]; };
    CollapseDirective.propDecorators = {
        collapsed: [{ type: Output }],
        collapses: [{ type: Output }],
        expanded: [{ type: Output }],
        expands: [{ type: Output }],
        isExpanded: [{ type: HostBinding, args: ['class.in',] }, { type: HostBinding, args: ['class.show',] }, { type: HostBinding, args: ['attr.aria-expanded',] }],
        isCollapsed: [{ type: HostBinding, args: ['attr.aria-hidden',] }],
        isCollapse: [{ type: HostBinding, args: ['class.collapse',] }],
        isCollapsing: [{ type: HostBinding, args: ['class.collapsing',] }],
        display: [{ type: Input }],
        isAnimated: [{ type: Input }],
        collapse: [{ type: Input }]
    };
    return CollapseDirective;
}());
export { CollapseDirective };
if (false) {
    /**
     * This event fires as soon as content collapses
     * @type {?}
     */
    CollapseDirective.prototype.collapsed;
    /**
     * This event fires when collapsing is started
     * @type {?}
     */
    CollapseDirective.prototype.collapses;
    /**
     * This event fires as soon as content becomes visible
     * @type {?}
     */
    CollapseDirective.prototype.expanded;
    /**
     * This event fires when expansion is started
     * @type {?}
     */
    CollapseDirective.prototype.expands;
    /** @type {?} */
    CollapseDirective.prototype.isExpanded;
    /** @type {?} */
    CollapseDirective.prototype.isCollapsed;
    /** @type {?} */
    CollapseDirective.prototype.isCollapse;
    /** @type {?} */
    CollapseDirective.prototype.isCollapsing;
    /**
     * turn on/off animation
     * @type {?}
     */
    CollapseDirective.prototype.isAnimated;
    /**
     * @type {?}
     * @private
     */
    CollapseDirective.prototype._display;
    /**
     * @type {?}
     * @private
     */
    CollapseDirective.prototype._factoryCollapseAnimation;
    /**
     * @type {?}
     * @private
     */
    CollapseDirective.prototype._factoryExpandAnimation;
    /**
     * @type {?}
     * @private
     */
    CollapseDirective.prototype._isAnimationDone;
    /**
     * @type {?}
     * @private
     */
    CollapseDirective.prototype._player;
    /**
     * @type {?}
     * @private
     */
    CollapseDirective.prototype._stylesLoaded;
    /**
     * @type {?}
     * @private
     */
    CollapseDirective.prototype._COLLAPSE_ACTION_NAME;
    /**
     * @type {?}
     * @private
     */
    CollapseDirective.prototype._EXPAND_ACTION_NAME;
    /**
     * @type {?}
     * @private
     */
    CollapseDirective.prototype._el;
    /**
     * @type {?}
     * @private
     */
    CollapseDirective.prototype._renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWJvb3RzdHJhcC9jb2xsYXBzZS8iLCJzb3VyY2VzIjpbImNvbGxhcHNlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLGdCQUFnQixFQUdqQixNQUFNLHFCQUFxQixDQUFDO0FBRTdCLE9BQU8sRUFFTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixXQUFXLEVBQ1gsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixlQUFlLEVBQ2hCLE1BQU0sdUJBQXVCLENBQUM7QUFFL0I7SUF3RUUsMkJBQ1UsR0FBZSxFQUNmLFNBQW9CLEVBQzVCLFFBQTBCO1FBRmxCLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFDZixjQUFTLEdBQVQsU0FBUyxDQUFXOzs7O1FBakVwQixjQUFTLEdBQW9DLElBQUksWUFBWSxFQUFFLENBQUM7Ozs7UUFFaEUsY0FBUyxHQUFvQyxJQUFJLFlBQVksRUFBRSxDQUFDOzs7O1FBRWhFLGFBQVEsR0FBb0MsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7OztRQUUvRCxZQUFPLEdBQW9DLElBQUksWUFBWSxFQUFFLENBQUM7O1FBTXhFLGVBQVUsR0FBRyxJQUFJLENBQUM7O1FBRWUsZ0JBQVcsR0FBRyxLQUFLLENBQUM7O1FBRXRCLGVBQVUsR0FBRyxJQUFJLENBQUM7O1FBRWhCLGlCQUFZLEdBQUcsS0FBSyxDQUFDOzs7O1FBcUI3QyxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBY3BCLGFBQVEsR0FBRyxPQUFPLENBQUM7UUFLbkIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFFdEIsMEJBQXFCLEdBQUcsVUFBVSxDQUFDO1FBQ25DLHdCQUFtQixHQUFHLFFBQVEsQ0FBQztRQU9yQyxJQUFJLENBQUMseUJBQXlCLEdBQUcsUUFBUSxDQUFDLEtB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YzVCLHFDQUEyQjs7Ozs7SUFDM0Isc0RBQW9EOzs7OztJQUNwRCxvREFBa0Q7Ozs7O0lBQ2xELDZDQUFrQzs7Ozs7SUFDbEMsb0NBQWlDOzs7OztJQUNqQywwQ0FBOEI7Ozs7O0lBRTlCLGtEQUEyQzs7Ozs7SUFDM0MsZ0RBQXVDOzs7OztJQUdyQyxnQ0FBdUI7Ozs7O0lBQ3ZCLHNDQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFuaW1hdGlvbkJ1aWxkZXIsXG4gIEFuaW1hdGlvbkZhY3RvcnksXG4gIEFuaW1hdGlvblBsYXllclxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIGNvbGxhcHNlQW5pbWF0aW9uLFxuICBleHBhbmRBbmltYXRpb25cbn0gZnJvbSAnLi9jb2xsYXBzZS1hbmltYXRpb25zJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2NvbGxhcHNlXScsXG4gIGV4cG9ydEFzOiAnYnMtY29sbGFwc2UnLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5jb2xsYXBzZV0nOiAndHJ1ZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBDb2xsYXBzZURpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0NoZWNrZWQge1xuICAvKiogVGhpcyBldmVudCBmaXJlcyBhcyBzb29uIGFzIGNvbnRlbnQgY29sbGFwc2VzICovXG4gIEBPdXRwdXQoKSBjb2xsYXBzZWQ6IEV2ZW50RW1pdHRlcjxDb2xsYXBzZURpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIC8qKiBUaGlzIGV2ZW50IGZpcmVzIHdoZW4gY29sbGFwc2luZyBpcyBzdGFydGVkICovXG4gIEBPdXRwdXQoKSBjb2xsYXBzZXM6IEV2ZW50RW1pdHRlcjxDb2xsYXBzZURpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIC8qKiBUaGlzIGV2ZW50IGZpcmVzIGFzIHNvb24gYXMgY29udGVudCBiZWNvbWVzIHZpc2libGUgKi9cbiAgQE91dHB1dCgpIGV4cGFuZGVkOiBFdmVudEVtaXR0ZXI8Q29sbGFwc2VEaXJlY3RpdmU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAvKiogVGhpcyBldmVudCBmaXJlcyB3aGVuIGV4cGFuc2lvbiBpcyBzdGFydGVkICovXG4gIEBPdXRwdXQoKSBleHBhbmRzOiBFdmVudEVtaXR0ZXI8Q29sbGFwc2VEaXJlY3RpdmU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8vIHNob3duXG4gIEBIb3N0QmluZGluZygnY2xhc3MuaW4nKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNob3cnKVxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1leHBhbmRlZCcpXG4gIGlzRXhwYW5kZWQgPSB0cnVlO1xuICAvLyBoaWRkZW5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtaGlkZGVuJykgaXNDb2xsYXBzZWQgPSBmYWxzZTtcbiAgLy8gc3RhbGUgc3RhdGVcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5jb2xsYXBzZScpIGlzQ29sbGFwc2UgPSB0cnVlO1xuICAvLyBhbmltYXRpb24gc3RhdGVcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5jb2xsYXBzaW5nJykgaXNDb2xsYXBzaW5nID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgc2V0IGRpc3BsYXkodmFsdWU6IHN0cmluZykge1xuICAgIGlmICghdGhpcy5pc0FuaW1hdGVkKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnZGlzcGxheScsIHZhbHVlKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2Rpc3BsYXkgPSB2YWx1ZTtcblxuICAgIGlmICh2YWx1ZSA9PT0gJ25vbmUnKSB7XG4gICAgICB0aGlzLmhpZGUoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2hvdygpO1xuICB9XG4gIC8qKiB0dXJuIG9uL29mZiBhbmltYXRpb24gKi9cbiAgQElucHV0KCkgaXNBbmltYXRlZCA9IGZhbHNlO1xuICAvKiogQSBmbGFnIGluZGljYXRpbmcgdmlzaWJpbGl0eSBvZiBjb250ZW50IChzaG93biBvciBoaWRkZW4pICovXG4gIEBJbnB1dCgpXG4gIHNldCBjb2xsYXBzZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICghdGhpcy5fcGxheWVyIHx8IHRoaXMuX2lzQW5pbWF0aW9uRG9uZSkge1xuICAgICAgdGhpcy5pc0V4cGFuZGVkID0gdmFsdWU7XG4gICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBjb2xsYXBzZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc0V4cGFuZGVkO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGlzcGxheSA9ICdibG9jayc7XG4gIHByaXZhdGUgX2ZhY3RvcnlDb2xsYXBzZUFuaW1hdGlvbjogQW5pbWF0aW9uRmFjdG9yeTtcbiAgcHJpdmF0ZSBfZmFjdG9yeUV4cGFuZEFuaW1hdGlvbjogQW5pbWF0aW9uRmFjdG9yeTtcbiAgcHJpdmF0ZSBfaXNBbmltYXRpb25Eb25lOiBib29sZWFuO1xuICBwcml2YXRlIF9wbGF5ZXI6IEFuaW1hdGlvblBsYXllcjtcbiAgcHJpdmF0ZSBfc3R5bGVzTG9hZGVkID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfQ09MTEFQU0VfQUNUSU9OX05BTUUgPSAnY29sbGFwc2UnO1xuICBwcml2YXRlIF9FWFBBTkRfQUNUSU9OX05BTUUgPSAnZXhwYW5kJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9lbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIF9idWlsZGVyOiBBbmltYXRpb25CdWlsZGVyXG4gICkge1xuICAgIHRoaXMuX2ZhY3RvcnlDb2xsYXBzZUFuaW1hdGlvbiA9IF9idWlsZGVyLmJ1aWxkKGNvbGxhcHNlQW5pbWF0aW9uKTtcbiAgICB0aGlzLl9mYWN0b3J5RXhwYW5kQW5pbWF0aW9uID0gX2J1aWxkZXIuYnVpbGQoZXhwYW5kQW5pbWF0aW9uKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICB0aGlzLl9zdHlsZXNMb2FkZWQgPSB0cnVlO1xuXG4gICAgaWYgKCF0aGlzLl9wbGF5ZXIgfHwgIXRoaXMuX2lzQW5pbWF0aW9uRG9uZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3BsYXllci5yZXNldCgpO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCAnKicpO1xuICB9XG5cbiAgLyoqIGFsbG93cyB0byBtYW51YWxseSB0b2dnbGUgY29udGVudCB2aXNpYmlsaXR5ICovXG4gIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0V4cGFuZGVkKSB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIGFsbG93cyB0byBtYW51YWxseSBoaWRlIGNvbnRlbnQgKi9cbiAgaGlkZSgpOiB2b2lkIHtcbiAgICB0aGlzLmlzQ29sbGFwc2luZyA9IHRydWU7XG4gICAgdGhpcy5pc0V4cGFuZGVkID0gZmFsc2U7XG4gICAgdGhpcy5pc0NvbGxhcHNlZCA9IHRydWU7XG4gICAgdGhpcy5pc0NvbGxhcHNpbmcgPSBmYWxzZTtcblxuICAgIHRoaXMuY29sbGFwc2VzLmVtaXQodGhpcyk7XG5cbiAgICB0aGlzLl9pc0FuaW1hdGlvbkRvbmUgPSBmYWxzZTtcblxuICAgIHRoaXMuYW5pbWF0aW9uUnVuKHRoaXMuaXNBbmltYXRlZCwgdGhpcy5fQ09MTEFQU0VfQUNUSU9OX05BTUUpKCgpID0+IHtcbiAgICAgIHRoaXMuX2lzQW5pbWF0aW9uRG9uZSA9IHRydWU7XG4gICAgICB0aGlzLmNvbGxhcHNlZC5lbWl0KHRoaXMpO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgIH0pO1xuICB9XG4gIC8qKiBhbGxvd3MgdG8gbWFudWFsbHkgc2hvdyBjb2xsYXBzZWQgY29udGVudCAqL1xuICBzaG93KCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICdkaXNwbGF5JywgdGhpcy5fZGlzcGxheSk7XG5cbiAgICB0aGlzLmlzQ29sbGFwc2luZyA9IHRydWU7XG4gICAgdGhpcy5pc0V4cGFuZGVkID0gdHJ1ZTtcbiAgICB0aGlzLmlzQ29sbGFwc2VkID0gZmFsc2U7XG4gICAgdGhpcy5pc0NvbGxhcHNpbmcgPSBmYWxzZTtcblxuICAgIHRoaXMuZXhwYW5kcy5lbWl0KHRoaXMpO1xuXG4gICAgdGhpcy5faXNBbmltYXRpb25Eb25lID0gZmFsc2U7XG5cbiAgICB0aGlzLmFuaW1hdGlvblJ1bih0aGlzLmlzQW5pbWF0ZWQsIHRoaXMuX0VYUEFORF9BQ1RJT05fTkFNRSkoKCkgPT4ge1xuICAgICAgdGhpcy5faXNBbmltYXRpb25Eb25lID0gdHJ1ZTtcbiAgICAgIHRoaXMuZXhwYW5kZWQuZW1pdCh0aGlzKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFuaW1hdGlvblJ1bihpc0FuaW1hdGVkOiBib29sZWFuLCBhY3Rpb246IHN0cmluZykge1xuICAgIGlmICghaXNBbmltYXRlZCB8fCAhdGhpcy5fc3R5bGVzTG9hZGVkKSB7XG4gICAgICByZXR1cm4gKGNhbGxiYWNrOiAoKSA9PiB2b2lkKSA9PiBjYWxsYmFjaygpO1xuICAgIH1cblxuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICdvdmVyZmxvdycsICdoaWRkZW4nKTtcbiAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnY29sbGFwc2UnKTtcblxuICAgIGNvbnN0IGZhY3RvcnlBbmltYXRpb24gPSAoYWN0aW9uID09PSB0aGlzLl9FWFBBTkRfQUNUSU9OX05BTUUpXG4gICAgICA/IHRoaXMuX2ZhY3RvcnlFeHBhbmRBbmltYXRpb25cbiAgICAgIDogdGhpcy5fZmFjdG9yeUNvbGxhcHNlQW5pbWF0aW9uO1xuXG4gICAgaWYgKHRoaXMuX3BsYXllcikge1xuICAgICAgdGhpcy5fcGxheWVyLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICB0aGlzLl9wbGF5ZXIgPSBmYWN0b3J5QW5pbWF0aW9uLmNyZWF0ZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLl9wbGF5ZXIucGxheSgpO1xuXG4gICAgcmV0dXJuIChjYWxsYmFjazogKCkgPT4gdm9pZCkgPT4gdGhpcy5fcGxheWVyLm9uRG9uZShjYWxsYmFjayk7XG4gIH1cbn1cbiJdfQ==