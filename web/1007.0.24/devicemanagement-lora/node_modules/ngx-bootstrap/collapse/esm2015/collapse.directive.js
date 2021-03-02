/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { AnimationBuilder } from '@angular/animations';
import { Directive, ElementRef, EventEmitter, HostBinding, Input, Output, Renderer2 } from '@angular/core';
import { collapseAnimation, expandAnimation } from './collapse-animations';
export class CollapseDirective {
    /**
     * @param {?} _el
     * @param {?} _renderer
     * @param {?} _builder
     */
    constructor(_el, _renderer, _builder) {
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
    /**
     * @param {?} value
     * @return {?}
     */
    set display(value) {
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
    }
    /**
     * A flag indicating visibility of content (shown or hidden)
     * @param {?} value
     * @return {?}
     */
    set collapse(value) {
        if (!this._player || this._isAnimationDone) {
            this.isExpanded = value;
            this.toggle();
        }
    }
    /**
     * @return {?}
     */
    get collapse() {
        return this.isExpanded;
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        this._stylesLoaded = true;
        if (!this._player || !this._isAnimationDone) {
            return;
        }
        this._player.reset();
        this._renderer.setStyle(this._el.nativeElement, 'height', '*');
    }
    /**
     * allows to manually toggle content visibility
     * @return {?}
     */
    toggle() {
        if (this.isExpanded) {
            this.hide();
        }
        else {
            this.show();
        }
    }
    /**
     * allows to manually hide content
     * @return {?}
     */
    hide() {
        this.isCollapsing = true;
        this.isExpanded = false;
        this.isCollapsed = true;
        this.isCollapsing = false;
        this.collapses.emit(this);
        this._isAnimationDone = false;
        this.animationRun(this.isAnimated, this._COLLAPSE_ACTION_NAME)((/**
         * @return {?}
         */
        () => {
            this._isAnimationDone = true;
            this.collapsed.emit(this);
            this._renderer.setStyle(this._el.nativeElement, 'display', 'none');
        }));
    }
    /**
     * allows to manually show collapsed content
     * @return {?}
     */
    show() {
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
        () => {
            this._isAnimationDone = true;
            this.expanded.emit(this);
        }));
    }
    /**
     * @param {?} isAnimated
     * @param {?} action
     * @return {?}
     */
    animationRun(isAnimated, action) {
        if (!isAnimated || !this._stylesLoaded) {
            return (/**
             * @param {?} callback
             * @return {?}
             */
            (callback) => callback());
        }
        this._renderer.setStyle(this._el.nativeElement, 'overflow', 'hidden');
        this._renderer.addClass(this._el.nativeElement, 'collapse');
        /** @type {?} */
        const factoryAnimation = (action === this._EXPAND_ACTION_NAME)
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
        (callback) => this._player.onDone(callback));
    }
}
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
CollapseDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: AnimationBuilder }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWJvb3RzdHJhcC9jb2xsYXBzZS8iLCJzb3VyY2VzIjpbImNvbGxhcHNlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLGdCQUFnQixFQUdqQixNQUFNLHFCQUFxQixDQUFDO0FBRTdCLE9BQU8sRUFFTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixXQUFXLEVBQ1gsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixlQUFlLEVBQ2hCLE1BQU0sdUJBQXVCLENBQUM7QUFTL0IsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7O0lBaUU1QixZQUNVLEdBQWUsRUFDZixTQUFvQixFQUM1QixRQUEwQjtRQUZsQixRQUFHLEdBQUgsR0FBRyxDQUFZO1FBQ2YsY0FBUyxHQUFULFNBQVMsQ0FBVzs7OztRQWpFcEIsY0FBUyxHQUFvQyxJQUFJLFlBQVksRUFBRSxDQUFDOzs7O1FBRWhFLGNBQVMsR0FBb0MsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7OztRQUVoRSxhQUFRLEdBQW9DLElBQUksWUFBWSxFQUFFLENBQUM7Ozs7UUFFL0QsWUFBTyxHQUFvQyxJQUFJLFlBQVksRUFBRSxDQUFDOztRQU14RSxlQUFVLEdBQUcsSUFBSSxDQUFDOztRQUVlLGdCQUFXLEdBQUcsS0FBSyxDQUFDOztRQUV0QixlQUFVLEdBQUcsSUFBSSxDQUFDOztRQUVoQixpQkFBWSxHQUFHLEtBQUssQ0FBQzs7OztRQXFCN0MsZUFBVSxHQUFHLEtBQUssQ0FBQztRQWNwQixhQUFRLEdBQUcsT0FBTyxDQUFDO1FBS25CLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBRXRCLDBCQUFxQixHQUFHLFVBQVUsQ0FBQztRQUNuQyx3QkFBbUIsR0FBRyxRQUFRLENBQUM7UUFPckMsSUFBSSxDQUFDLHlC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c0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQW5pbWF0aW9uQnVpbGRlcixcbiAgQW5pbWF0aW9uRmFjdG9yeSxcbiAgQW5pbWF0aW9uUGxheWVyXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdDaGVja2VkLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtcbiAgY29sbGFwc2VBbmltYXRpb24sXG4gIGV4cGFuZEFuaW1hdGlvblxufSBmcm9tICcuL2NvbGxhcHNlLWFuaW1hdGlvbnMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY29sbGFwc2VdJyxcbiAgZXhwb3J0QXM6ICdicy1jb2xsYXBzZScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmNvbGxhcHNlXSc6ICd0cnVlJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIENvbGxhcHNlRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCB7XG4gIC8qKiBUaGlzIGV2ZW50IGZpcmVzIGFzIHNvb24gYXMgY29udGVudCBjb2xsYXBzZXMgKi9cbiAgQE91dHB1dCgpIGNvbGxhcHNlZDogRXZlbnRFbWl0dGVyPENvbGxhcHNlRGlyZWN0aXZlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLyoqIFRoaXMgZXZlbnQgZmlyZXMgd2hlbiBjb2xsYXBzaW5nIGlzIHN0YXJ0ZWQgKi9cbiAgQE91dHB1dCgpIGNvbGxhcHNlczogRXZlbnRFbWl0dGVyPENvbGxhcHNlRGlyZWN0aXZlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLyoqIFRoaXMgZXZlbnQgZmlyZXMgYXMgc29vbiBhcyBjb250ZW50IGJlY29tZXMgdmlzaWJsZSAqL1xuICBAT3V0cHV0KCkgZXhwYW5kZWQ6IEV2ZW50RW1pdHRlcjxDb2xsYXBzZURpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIC8qKiBUaGlzIGV2ZW50IGZpcmVzIHdoZW4gZXhwYW5zaW9uIGlzIHN0YXJ0ZWQgKi9cbiAgQE91dHB1dCgpIGV4cGFuZHM6IEV2ZW50RW1pdHRlcjxDb2xsYXBzZURpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLy8gc2hvd25cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5pbicpXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2hvdycpXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWV4cGFuZGVkJylcbiAgaXNFeHBhbmRlZCA9IHRydWU7XG4gIC8vIGhpZGRlblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1oaWRkZW4nKSBpc0NvbGxhcHNlZCA9IGZhbHNlO1xuICAvLyBzdGFsZSBzdGF0ZVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmNvbGxhcHNlJykgaXNDb2xsYXBzZSA9IHRydWU7XG4gIC8vIGFuaW1hdGlvbiBzdGF0ZVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmNvbGxhcHNpbmcnKSBpc0NvbGxhcHNpbmcgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBzZXQgZGlzcGxheSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLmlzQW5pbWF0ZWQpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICdkaXNwbGF5JywgdmFsdWUpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fZGlzcGxheSA9IHZhbHVlO1xuXG4gICAgaWYgKHZhbHVlID09PSAnbm9uZScpIHtcbiAgICAgIHRoaXMuaGlkZSgpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zaG93KCk7XG4gIH1cbiAgLyoqIHR1cm4gb24vb2ZmIGFuaW1hdGlvbiAqL1xuICBASW5wdXQoKSBpc0FuaW1hdGVkID0gZmFsc2U7XG4gIC8qKiBBIGZsYWcgaW5kaWNhdGluZyB2aXNpYmlsaXR5IG9mIGNvbnRlbnQgKHNob3duIG9yIGhpZGRlbikgKi9cbiAgQElucHV0KClcbiAgc2V0IGNvbGxhcHNlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKCF0aGlzLl9wbGF5ZXIgfHwgdGhpcy5faXNBbmltYXRpb25Eb25lKSB7XG4gICAgICB0aGlzLmlzRXhwYW5kZWQgPSB2YWx1ZTtcbiAgICAgIHRoaXMudG9nZ2xlKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGNvbGxhcHNlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzRXhwYW5kZWQ7XG4gIH1cblxuICBwcml2YXRlIF9kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgcHJpdmF0ZSBfZmFjdG9yeUNvbGxhcHNlQW5pbWF0aW9uOiBBbmltYXRpb25GYWN0b3J5O1xuICBwcml2YXRlIF9mYWN0b3J5RXhwYW5kQW5pbWF0aW9uOiBBbmltYXRpb25GYWN0b3J5O1xuICBwcml2YXRlIF9pc0FuaW1hdGlvbkRvbmU6IGJvb2xlYW47XG4gIHByaXZhdGUgX3BsYXllcjogQW5pbWF0aW9uUGxheWVyO1xuICBwcml2YXRlIF9zdHlsZXNMb2FkZWQgPSBmYWxzZTtcblxuICBwcml2YXRlIF9DT0xMQVBTRV9BQ1RJT05fTkFNRSA9ICdjb2xsYXBzZSc7XG4gIHByaXZhdGUgX0VYUEFORF9BQ1RJT05fTkFNRSA9ICdleHBhbmQnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2VsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgX2J1aWxkZXI6IEFuaW1hdGlvbkJ1aWxkZXJcbiAgKSB7XG4gICAgdGhpcy5fZmFjdG9yeUNvbGxhcHNlQW5pbWF0aW9uID0gX2J1aWxkZXIuYnVpbGQoY29sbGFwc2VBbmltYXRpb24pO1xuICAgIHRoaXMuX2ZhY3RvcnlFeHBhbmRBbmltYXRpb24gPSBfYnVpbGRlci5idWlsZChleHBhbmRBbmltYXRpb24pO1xuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCk6IHZvaWQge1xuICAgIHRoaXMuX3N0eWxlc0xvYWRlZCA9IHRydWU7XG5cbiAgICBpZiAoIXRoaXMuX3BsYXllciB8fCAhdGhpcy5faXNBbmltYXRpb25Eb25lKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fcGxheWVyLnJlc2V0KCk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsICcqJyk7XG4gIH1cblxuICAvKiogYWxsb3dzIHRvIG1hbnVhbGx5IHRvZ2dsZSBjb250ZW50IHZpc2liaWxpdHkgKi9cbiAgdG9nZ2xlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzRXhwYW5kZWQpIHtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3coKTtcbiAgICB9XG4gIH1cblxuICAvKiogYWxsb3dzIHRvIG1hbnVhbGx5IGhpZGUgY29udGVudCAqL1xuICBoaWRlKCk6IHZvaWQge1xuICAgIHRoaXMuaXNDb2xsYXBzaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmlzRXhwYW5kZWQgPSBmYWxzZTtcbiAgICB0aGlzLmlzQ29sbGFwc2VkID0gdHJ1ZTtcbiAgICB0aGlzLmlzQ29sbGFwc2luZyA9IGZhbHNlO1xuXG4gICAgdGhpcy5jb2xsYXBzZXMuZW1pdCh0aGlzKTtcblxuICAgIHRoaXMuX2lzQW5pbWF0aW9uRG9uZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5hbmltYXRpb25SdW4odGhpcy5pc0FuaW1hdGVkLCB0aGlzLl9DT0xMQVBTRV9BQ1RJT05fTkFNRSkoKCkgPT4ge1xuICAgICAgdGhpcy5faXNBbmltYXRpb25Eb25lID0gdHJ1ZTtcbiAgICAgIHRoaXMuY29sbGFwc2VkLmVtaXQodGhpcyk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnZGlzcGxheScsICdub25lJyk7XG4gICAgfSk7XG4gIH1cbiAgLyoqIGFsbG93cyB0byBtYW51YWxseSBzaG93IGNvbGxhcHNlZCBjb250ZW50ICovXG4gIHNob3coKTogdm9pZCB7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ2Rpc3BsYXknLCB0aGlzLl9kaXNwbGF5KTtcblxuICAgIHRoaXMuaXNDb2xsYXBzaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmlzRXhwYW5kZWQgPSB0cnVlO1xuICAgIHRoaXMuaXNDb2xsYXBzZWQgPSBmYWxzZTtcbiAgICB0aGlzLmlzQ29sbGFwc2luZyA9IGZhbHNlO1xuXG4gICAgdGhpcy5leHBhbmRzLmVtaXQodGhpcyk7XG5cbiAgICB0aGlzLl9pc0FuaW1hdGlvbkRvbmUgPSBmYWxzZTtcblxuICAgIHRoaXMuYW5pbWF0aW9uUnVuKHRoaXMuaXNBbmltYXRlZCwgdGhpcy5fRVhQQU5EX0FDVElPTl9OQU1FKSgoKSA9PiB7XG4gICAgICB0aGlzLl9pc0FuaW1hdGlvbkRvbmUgPSB0cnVlO1xuICAgICAgdGhpcy5leHBhbmRlZC5lbWl0KHRoaXMpO1xuICAgIH0pO1xuICB9XG5cbiAgYW5pbWF0aW9uUnVuKGlzQW5pbWF0ZWQ6IGJvb2xlYW4sIGFjdGlvbjogc3RyaW5nKSB7XG4gICAgaWYgKCFpc0FuaW1hdGVkIHx8ICF0aGlzLl9zdHlsZXNMb2FkZWQpIHtcbiAgICAgIHJldHVybiAoY2FsbGJhY2s6ICgpID0+IHZvaWQpID0+IGNhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICdjb2xsYXBzZScpO1xuXG4gICAgY29uc3QgZmFjdG9yeUFuaW1hdGlvbiA9IChhY3Rpb24gPT09IHRoaXMuX0VYUEFORF9BQ1RJT05fTkFNRSlcbiAgICAgID8gdGhpcy5fZmFjdG9yeUV4cGFuZEFuaW1hdGlvblxuICAgICAgOiB0aGlzLl9mYWN0b3J5Q29sbGFwc2VBbmltYXRpb247XG5cbiAgICBpZiAodGhpcy5fcGxheWVyKSB7XG4gICAgICB0aGlzLl9wbGF5ZXIuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIHRoaXMuX3BsYXllciA9IGZhY3RvcnlBbmltYXRpb24uY3JlYXRlKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHRoaXMuX3BsYXllci5wbGF5KCk7XG5cbiAgICByZXR1cm4gKGNhbGxiYWNrOiAoKSA9PiB2b2lkKSA9PiB0aGlzLl9wbGF5ZXIub25Eb25lKGNhbGxiYWNrKTtcbiAgfVxufVxuIl19