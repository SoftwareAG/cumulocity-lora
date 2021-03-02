/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* tslint:disable:max-file-line-count */
// todo: should we support enforce focus in?
// todo: in original bs there are was a way to prevent modal from showing
// todo: original modal had resize events
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2, ViewContainerRef } from '@angular/core';
import { document, window, isBs3, Utils } from 'ngx-bootstrap/utils';
import { ModalBackdropComponent } from './modal-backdrop.component';
import { CLASS_NAME, DISMISS_REASONS, modalConfigDefaults, ModalOptions } from './modal-options.class';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
/** @type {?} */
var TRANSITION_DURATION = 300;
/** @type {?} */
var BACKDROP_TRANSITION_DURATION = 150;
/**
 * Mark any code with directive to show it's content in modal
 */
var ModalDirective = /** @class */ (function () {
    function ModalDirective(_element, _viewContainerRef, _renderer, clf) {
        this._element = _element;
        this._renderer = _renderer;
        /**
         * This event fires immediately when the `show` instance method is called.
         */
        this.onShow = new EventEmitter();
        /**
         * This event is fired when the modal has been made visible to the user
         * (will wait for CSS transitions to complete)
         */
        this.onShown = new EventEmitter();
        /**
         * This event is fired immediately when
         * the hide instance method has been called.
         */
        this.onHide = new EventEmitter();
        /**
         * This event is fired when the modal has finished being
         * hidden from the user (will wait for CSS transitions to complete).
         */
        this.onHidden = new EventEmitter();
        this._isShown = false;
        this.isBodyOverflowing = false;
        this.originalBodyPadding = 0;
        this.scrollbarWidth = 0;
        this.timerHideModal = 0;
        this.timerRmBackDrop = 0;
        this.isNested = false;
        this._backdrop = clf.createLoader(_element, _viewContainerRef, _renderer);
    }
    Object.defineProperty(ModalDirective.prototype, "config", {
        get: /**
         * @return {?}
         */
        function () {
            return this._config;
        },
        /** allows to set modal configuration via element property */
        set: /**
         * allows to set modal configuration via element property
         * @param {?} conf
         * @return {?}
         */
        function (conf) {
            this._config = this.getConfig(conf);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalDirective.prototype, "isShown", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isShown;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    ModalDirective.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.config.ignoreBackdropClick ||
            this.config.backdrop === 'static' ||
            event.target !== this._element.nativeElement) {
            return;
        }
        this.dismissReason = DISMISS_REASONS.BACKRDOP;
        this.hide(event);
    };
    // todo: consider preventing default and stopping propagation
    // todo: consider preventing default and stopping propagation
    /**
     * @param {?} event
     * @return {?}
     */
    ModalDirective.prototype.onEsc = 
    // todo: consider preventing default and stopping propagation
    /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this._isShown) {
            return;
        }
        // tslint:disable-next-line:deprecation
        if (event.keyCode === 27 || event.key === 'Escape') {
            event.preventDefault();
        }
        if (this.config.keyboard) {
            this.dismissReason = DISMISS_REASONS.ESC;
            this.hide();
        }
    };
    /**
     * @return {?}
     */
    ModalDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.config = void 0;
        if (this._isShown) {
            this._isShown = false;
            this.hideModal();
            this._backdrop.dispose();
        }
    };
    /**
     * @return {?}
     */
    ModalDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._config = this._config || this.getConfig();
        setTimeout((/**
         * @return {?}
         */
        function () {
            if (_this._config.show) {
                _this.show();
            }
        }), 0);
    };
    /* Public methods */
    /** Allows to manually toggle modal visibility */
    /* Public methods */
    /**
     * Allows to manually toggle modal visibility
     * @return {?}
     */
    ModalDirective.prototype.toggle = /* Public methods */
    /**
     * Allows to manually toggle modal visibility
     * @return {?}
     */
    function () {
        return this._isShown ? this.hide() : this.show();
    };
    /** Allows to manually open modal */
    /**
     * Allows to manually open modal
     * @return {?}
     */
    ModalDirective.prototype.show = /**
     * Allows to manually open modal
     * @return {?}
     */
    function () {
        var _this = this;
        this.dismissReason = null;
        this.onShow.emit(this);
        if (this._isShown) {
            return;
        }
        clearTimeout(this.timerHideModal);
        clearTimeout(this.timerRmBackDrop);
        this._isShown = true;
        this.checkScrollbar();
        this.setScrollbar();
        if (document && document.body) {
            if (document.body.classList.contains(CLASS_NAME.OPEN)) {
                this.isNested = true;
            }
            else {
                this._renderer.addClass(document.body, CLASS_NAME.OPEN);
            }
        }
        this.showBackdrop((/**
         * @return {?}
         */
        function () {
            _this.showElement();
        }));
    };
    /** Allows to manually close modal */
    /**
     * Allows to manually close modal
     * @param {?=} event
     * @return {?}
     */
    ModalDirective.prototype.hide = /**
     * Allows to manually close modal
     * @param {?=} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (event) {
            event.preventDefault();
        }
        this.onHide.emit(this);
        // todo: add an option to prevent hiding
        if (!this._isShown) {
            return;
        }
        window.clearTimeout(this.timerHideModal);
        window.clearTimeout(this.timerRmBackDrop);
        this._isShown = false;
        this._renderer.removeClass(this._element.nativeElement, CLASS_NAME.IN);
        if (!isBs3()) {
            this._renderer.removeClass(this._element.nativeElement, CLASS_NAME.SHOW);
        }
        // this._addClassIn = false;
        if (this._config.animated) {
            this.timerHideModal = window.setTimeout((/**
             * @return {?}
             */
            function () { return _this.hideModal(); }), TRANSITION_DURATION);
        }
        else {
            this.hideModal();
        }
    };
    /** Private methods @internal */
    /**
     * Private methods \@internal
     * @protected
     * @param {?=} config
     * @return {?}
     */
    ModalDirective.prototype.getConfig = /**
     * Private methods \@internal
     * @protected
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        return Object.assign({}, modalConfigDefaults, config);
    };
    /**
     *  Show dialog
     *  @internal
     */
    /**
     *  Show dialog
     * \@internal
     * @protected
     * @return {?}
     */
    ModalDirective.prototype.showElement = /**
     *  Show dialog
     * \@internal
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        // todo: replace this with component loader usage
        if (!this._element.nativeElement.parentNode ||
            this._element.nativeElement.parentNode.nodeType !== Node.ELEMENT_NODE) {
            // don't move modals dom position
            if (document && document.body) {
                document.body.appendChild(this._element.nativeElement);
            }
        }
        this._renderer.setAttribute(this._element.nativeElement, 'aria-hidden', 'false');
        this._renderer.setAttribute(this._element.nativeElement, 'aria-modal', 'true');
        this._renderer.setStyle(this._element.nativeElement, 'display', 'block');
        this._renderer.setProperty(this._element.nativeElement, 'scrollTop', 0);
        if (this._config.animated) {
            Utils.reflow(this._element.nativeElement);
        }
        // this._addClassIn = true;
        this._renderer.addClass(this._element.nativeElement, CLASS_NAME.IN);
        if (!isBs3()) {
            this._renderer.addClass(this._element.nativeElement, CLASS_NAME.SHOW);
        }
        /** @type {?} */
        var transitionComplete = (/**
         * @return {?}
         */
        function () {
            if (_this._config.focus) {
                _this._element.nativeElement.focus();
            }
            _this.onShown.emit(_this);
        });
        if (this._config.animated) {
            setTimeout(transitionComplete, TRANSITION_DURATION);
        }
        else {
            transitionComplete();
        }
    };
    /** @internal */
    /**
     * \@internal
     * @protected
     * @return {?}
     */
    ModalDirective.prototype.hideModal = /**
     * \@internal
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        this._renderer.setAttribute(this._element.nativeElement, 'aria-hidden', 'true');
        this._renderer.setStyle(this._element.nativeElement, 'display', 'none');
        this.showBackdrop((/**
         * @return {?}
         */
        function () {
            if (!_this.isNested) {
                if (document && document.body) {
                    _this._renderer.removeClass(document.body, CLASS_NAME.OPEN);
                }
                _this.resetScrollbar();
            }
            _this.resetAdjustments();
            _this.focusOtherModal();
            _this.onHidden.emit(_this);
        }));
    };
    // todo: original show was calling a callback when done, but we can use
    // promise
    /** @internal */
    // todo: original show was calling a callback when done, but we can use
    // promise
    /**
     * \@internal
     * @protected
     * @param {?=} callback
     * @return {?}
     */
    ModalDirective.prototype.showBackdrop = 
    // todo: original show was calling a callback when done, but we can use
    // promise
    /**
     * \@internal
     * @protected
     * @param {?=} callback
     * @return {?}
     */
    function (callback) {
        var _this = this;
        if (this._isShown &&
            this.config.backdrop &&
            (!this.backdrop || !this.backdrop.instance.isShown)) {
            this.removeBackdrop();
            this._backdrop
                .attach(ModalBackdropComponent)
                .to('body')
                .show({ isAnimated: this._config.animated });
            this.backdrop = this._backdrop._componentRef;
            if (!callback) {
                return;
            }
            if (!this._config.animated) {
                callback();
                return;
            }
            setTimeout(callback, BACKDROP_TRANSITION_DURATION);
        }
        else if (!this._isShown && this.backdrop) {
            this.backdrop.instance.isShown = false;
            /** @type {?} */
            var callbackRemove = (/**
             * @return {?}
             */
            function () {
                _this.removeBackdrop();
                if (callback) {
                    callback();
                }
            });
            if (this.backdrop.instance.isAnimated) {
                this.timerRmBackDrop = window.setTimeout(callbackRemove, BACKDROP_TRANSITION_DURATION);
            }
            else {
                callbackRemove();
            }
        }
        else if (callback) {
            callback();
        }
    };
    /** @internal */
    /**
     * \@internal
     * @protected
     * @return {?}
     */
    ModalDirective.prototype.removeBackdrop = /**
     * \@internal
     * @protected
     * @return {?}
     */
    function () {
        this._backdrop.hide();
    };
    /** Events tricks */
    // no need for it
    // protected setEscapeEvent():void {
    //   if (this._isShown && this._config.keyboard) {
    //     $(this._element).on(Event.KEYDOWN_DISMISS, (event) => {
    //       if (event.which === 27) {
    //         this.hide()
    //       }
    //     })
    //
    //   } else if (!this._isShown) {
    //     $(this._element).off(Event.KEYDOWN_DISMISS)
    //   }
    // }
    // protected setResizeEvent():void {
    // console.log(this.renderer.listenGlobal('', Event.RESIZE));
    // if (this._isShown) {
    //   $(window).on(Event.RESIZE, $.proxy(this._handleUpdate, this))
    // } else {
    //   $(window).off(Event.RESIZE)
    // }
    // }
    /**
     * Events tricks
     * @protected
     * @return {?}
     */
    // no need for it
    // protected setEscapeEvent():void {
    //   if (this._isShown && this._config.keyboard) {
    //     $(this._element).on(Event.KEYDOWN_DISMISS, (event) => {
    //       if (event.which === 27) {
    //         this.hide()
    //       }
    //     })
    //
    //   } else if (!this._isShown) {
    //     $(this._element).off(Event.KEYDOWN_DISMISS)
    //   }
    // }
    // protected setResizeEvent():void {
    // console.log(this.renderer.listenGlobal('', Event.RESIZE));
    // if (this._isShown) {
    //   $(window).on(Event.RESIZE, $.proxy(this._handleUpdate, this))
    // } else {
    //   $(window).off(Event.RESIZE)
    // }
    // }
    ModalDirective.prototype.focusOtherModal = /**
     * Events tricks
     * @protected
     * @return {?}
     */
    // no need for it
    // protected setEscapeEvent():void {
    //   if (this._isShown && this._config.keyboard) {
    //     $(this._element).on(Event.KEYDOWN_DISMISS, (event) => {
    //       if (event.which === 27) {
    //         this.hide()
    //       }
    //     })
    //
    //   } else if (!this._isShown) {
    //     $(this._element).off(Event.KEYDOWN_DISMISS)
    //   }
    // }
    // protected setResizeEvent():void {
    // console.log(this.renderer.listenGlobal('', Event.RESIZE));
    // if (this._isShown) {
    //   $(window).on(Event.RESIZE, $.proxy(this._handleUpdate, this))
    // } else {
    //   $(window).off(Event.RESIZE)
    // }
    // }
    function () {
        if (this._element.nativeElement.parentElement == null) {
            return;
        }
        /** @type {?} */
        var otherOpenedModals = this._element.nativeElement.parentElement.querySelectorAll('.in[bsModal]');
        if (!otherOpenedModals.length) {
            return;
        }
        otherOpenedModals[otherOpenedModals.length - 1].focus();
    };
    /** @internal */
    /**
     * \@internal
     * @protected
     * @return {?}
     */
    ModalDirective.prototype.resetAdjustments = /**
     * \@internal
     * @protected
     * @return {?}
     */
    function () {
        this._renderer.setStyle(this._element.nativeElement, 'paddingLeft', '');
        this._renderer.setStyle(this._element.nativeElement, 'paddingRight', '');
    };
    /** Scroll bar tricks */
    /** @internal */
    /** Scroll bar tricks */
    /**
     * \@internal
     * @protected
     * @return {?}
     */
    ModalDirective.prototype.checkScrollbar = /** Scroll bar tricks */
    /**
     * \@internal
     * @protected
     * @return {?}
     */
    function () {
        this.isBodyOverflowing = document.body.clientWidth < window.innerWidth;
        this.scrollbarWidth = this.getScrollbarWidth();
    };
    /**
     * @protected
     * @return {?}
     */
    ModalDirective.prototype.setScrollbar = /**
     * @protected
     * @return {?}
     */
    function () {
        if (!document) {
            return;
        }
        this.originalBodyPadding = parseInt(window
            .getComputedStyle(document.body)
            .getPropertyValue('padding-right') || 0, 10);
        if (this.isBodyOverflowing) {
            document.body.style.paddingRight = this.originalBodyPadding +
                this.scrollbarWidth + "px";
        }
    };
    /**
     * @protected
     * @return {?}
     */
    ModalDirective.prototype.resetScrollbar = /**
     * @protected
     * @return {?}
     */
    function () {
        document.body.style.paddingRight = this.originalBodyPadding + "px";
    };
    // thx d.walsh
    // thx d.walsh
    /**
     * @protected
     * @return {?}
     */
    ModalDirective.prototype.getScrollbarWidth = 
    // thx d.walsh
    /**
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var scrollDiv = this._renderer.createElement('div');
        this._renderer.addClass(scrollDiv, CLASS_NAME.SCROLLBAR_MEASURER);
        this._renderer.appendChild(document.body, scrollDiv);
        /** @type {?} */
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        this._renderer.removeChild(document.body, scrollDiv);
        return scrollbarWidth;
    };
    ModalDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[bsModal]',
                    exportAs: 'bs-modal'
                },] }
    ];
    /** @nocollapse */
    ModalDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ViewContainerRef },
        { type: Renderer2 },
        { type: ComponentLoaderFactory }
    ]; };
    ModalDirective.propDecorators = {
        config: [{ type: Input }],
        onShow: [{ type: Output }],
        onShown: [{ type: Output }],
        onHide: [{ type: Output }],
        onHidden: [{ type: Output }],
        onClick: [{ type: HostListener, args: ['click', ['$event'],] }],
        onEsc: [{ type: HostListener, args: ['keydown.esc', ['$event'],] }]
    };
    return ModalDirective;
}());
export { ModalDirective };
if (false) {
    /**
     * This event fires immediately when the `show` instance method is called.
     * @type {?}
     */
    ModalDirective.prototype.onShow;
    /**
     * This event is fired when the modal has been made visible to the user
     * (will wait for CSS transitions to complete)
     * @type {?}
     */
    ModalDirective.prototype.onShown;
    /**
     * This event is fired immediately when
     * the hide instance method has been called.
     * @type {?}
     */
    ModalDirective.prototype.onHide;
    /**
     * This event is fired when the modal has finished being
     * hidden from the user (will wait for CSS transitions to complete).
     * @type {?}
     */
    ModalDirective.prototype.onHidden;
    /**
     * This field contains last dismiss reason.
     * Possible values: `backdrop-click`, `esc` and `null`
     * (if modal was closed by direct call of `.hide()`).
     * @type {?}
     */
    ModalDirective.prototype.dismissReason;
    /**
     * @type {?}
     * @protected
     */
    ModalDirective.prototype._config;
    /**
     * @type {?}
     * @protected
     */
    ModalDirective.prototype._isShown;
    /**
     * @type {?}
     * @protected
     */
    ModalDirective.prototype.isBodyOverflowing;
    /**
     * @type {?}
     * @protected
     */
    ModalDirective.prototype.originalBodyPadding;
    /**
     * @type {?}
     * @protected
     */
    ModalDirective.prototype.scrollbarWidth;
    /**
     * @type {?}
     * @protected
     */
    ModalDirective.prototype.timerHideModal;
    /**
     * @type {?}
     * @protected
     */
    ModalDirective.prototype.timerRmBackDrop;
    /**
     * @type {?}
     * @protected
     */
    ModalDirective.prototype.backdrop;
    /**
     * @type {?}
     * @private
     */
    ModalDirective.prototype._backdrop;
    /**
     * @type {?}
     * @private
     */
    ModalDirective.prototype.isNested;
    /**
     * @type {?}
     * @private
     */
    ModalDirective.prototype._element;
    /**
     * @type {?}
     * @private
     */
    ModalDirective.prototype._renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWJvb3RzdHJhcC9tb2RhbC8iLCJzb3VyY2VzIjpbIm1vZGFsLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUtBLE9BQU8sRUFDUyxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUNuRCxNQUFNLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUN2RCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUNMLFVBQVUsRUFBRSxlQUFlLEVBQUUsbUJBQW1CLEVBQUUsWUFBWSxFQUMvRCxNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBbUIsc0JBQXNCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7SUFFbkYsbUJBQW1CLEdBQUcsR0FBRzs7SUFDekIsNEJBQTRCLEdBQUcsR0FBRzs7OztBQUd4QztJQTRERSx3QkFBb0IsUUFBb0IsRUFDNUIsaUJBQW1DLEVBQzNCLFNBQW9CLEVBQzVCLEdBQTJCO1FBSG5CLGFBQVEsR0FBUixRQUFRLENBQVk7UUFFcEIsY0FBUyxHQUFULFNBQVMsQ0FBVzs7OztRQTdDeEMsV0FBTSxHQUFpQyxJQUFJLFlBQVksRUFBa0IsQ0FBQzs7Ozs7UUFLMUUsWUFBTyxHQUFpQyxJQUFJLFlBQVksRUFBa0IsQ0FBQzs7Ozs7UUFLM0UsV0FBTSxHQUFpQyxJQUFJLFlBQVksRUFBa0IsQ0FBQzs7Ozs7UUFLMUUsYUFBUSxHQUFpQyxJQUFJLFlBQVksRUFBa0IsQ0FBQztRQWFsRSxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRWpCLHNCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMxQix3QkFBbUIs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OztJQUU1QixtQ0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZTptYXgtZmlsZS1saW5lLWNvdW50ICovXG4vLyB0b2RvOiBzaG91bGQgd2Ugc3VwcG9ydCBlbmZvcmNlIGZvY3VzIGluP1xuLy8gdG9kbzogaW4gb3JpZ2luYWwgYnMgdGhlcmUgYXJlIHdhcyBhIHdheSB0byBwcmV2ZW50IG1vZGFsIGZyb20gc2hvd2luZ1xuLy8gdG9kbzogb3JpZ2luYWwgbW9kYWwgaGFkIHJlc2l6ZSBldmVudHNcblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50UmVmLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCxcbiAgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgUmVuZGVyZXIyLCBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBkb2N1bWVudCwgd2luZG93LCBpc0JzMywgVXRpbHMgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3V0aWxzJztcbmltcG9ydCB7IE1vZGFsQmFja2Ryb3BDb21wb25lbnQgfSBmcm9tICcuL21vZGFsLWJhY2tkcm9wLmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICBDTEFTU19OQU1FLCBESVNNSVNTX1JFQVNPTlMsIG1vZGFsQ29uZmlnRGVmYXVsdHMsIE1vZGFsT3B0aW9uc1xufSBmcm9tICcuL21vZGFsLW9wdGlvbnMuY2xhc3MnO1xuaW1wb3J0IHsgQ29tcG9uZW50TG9hZGVyLCBDb21wb25lbnRMb2FkZXJGYWN0b3J5IH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9jb21wb25lbnQtbG9hZGVyJztcblxuY29uc3QgVFJBTlNJVElPTl9EVVJBVElPTiA9IDMwMDtcbmNvbnN0IEJBQ0tEUk9QX1RSQU5TSVRJT05fRFVSQVRJT04gPSAxNTA7XG5cbi8qKiBNYXJrIGFueSBjb2RlIHdpdGggZGlyZWN0aXZlIHRvIHNob3cgaXQncyBjb250ZW50IGluIG1vZGFsICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYnNNb2RhbF0nLFxuICBleHBvcnRBczogJ2JzLW1vZGFsJ1xufSlcbmV4cG9ydCBjbGFzcyBNb2RhbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgLyoqIGFsbG93cyB0byBzZXQgbW9kYWwgY29uZmlndXJhdGlvbiB2aWEgZWxlbWVudCBwcm9wZXJ0eSAqL1xuICBASW5wdXQoKVxuICBzZXQgY29uZmlnKGNvbmY6IE1vZGFsT3B0aW9ucykge1xuICAgIHRoaXMuX2NvbmZpZyA9IHRoaXMuZ2V0Q29uZmlnKGNvbmYpO1xuICB9XG5cbiAgZ2V0IGNvbmZpZygpOiBNb2RhbE9wdGlvbnMge1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH1cblxuICAvKiogVGhpcyBldmVudCBmaXJlcyBpbW1lZGlhdGVseSB3aGVuIHRoZSBgc2hvd2AgaW5zdGFuY2UgbWV0aG9kIGlzIGNhbGxlZC4gKi9cbiAgQE91dHB1dCgpXG4gIG9uU2hvdzogRXZlbnRFbWl0dGVyPE1vZGFsRGlyZWN0aXZlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TW9kYWxEaXJlY3RpdmU+KCk7XG4gIC8qKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIG1vZGFsIGhhcyBiZWVuIG1hZGUgdmlzaWJsZSB0byB0aGUgdXNlclxuICAgKiAod2lsbCB3YWl0IGZvciBDU1MgdHJhbnNpdGlvbnMgdG8gY29tcGxldGUpXG4gICAqL1xuICBAT3V0cHV0KClcbiAgb25TaG93bjogRXZlbnRFbWl0dGVyPE1vZGFsRGlyZWN0aXZlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TW9kYWxEaXJlY3RpdmU+KCk7XG4gIC8qKiBUaGlzIGV2ZW50IGlzIGZpcmVkIGltbWVkaWF0ZWx5IHdoZW5cbiAgICogdGhlIGhpZGUgaW5zdGFuY2UgbWV0aG9kIGhhcyBiZWVuIGNhbGxlZC5cbiAgICovXG4gIEBPdXRwdXQoKVxuICBvbkhpZGU6IEV2ZW50RW1pdHRlcjxNb2RhbERpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vZGFsRGlyZWN0aXZlPigpO1xuICAvKiogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBtb2RhbCBoYXMgZmluaXNoZWQgYmVpbmdcbiAgICogaGlkZGVuIGZyb20gdGhlIHVzZXIgKHdpbGwgd2FpdCBmb3IgQ1NTIHRyYW5zaXRpb25zIHRvIGNvbXBsZXRlKS5cbiAgICovXG4gIEBPdXRwdXQoKVxuICBvbkhpZGRlbjogRXZlbnRFbWl0dGVyPE1vZGFsRGlyZWN0aXZlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TW9kYWxEaXJlY3RpdmU+KCk7XG5cbiAgLyoqIFRoaXMgZmllbGQgY29udGFpbnMgbGFzdCBkaXNtaXNzIHJlYXNvbi5cbiAgICogUG9zc2libGUgdmFsdWVzOiBgYmFja2Ryb3AtY2xpY2tgLCBgZXNjYCBhbmQgYG51bGxgXG4gICAqIChpZiBtb2RhbCB3YXMgY2xvc2VkIGJ5IGRpcmVjdCBjYWxsIG9mIGAuaGlkZSgpYCkuXG4gICAqL1xuICBkaXNtaXNzUmVhc29uOiBzdHJpbmc7XG5cbiAgZ2V0IGlzU2hvd24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzU2hvd247XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NvbmZpZzogTW9kYWxPcHRpb25zO1xuICBwcm90ZWN0ZWQgX2lzU2hvd24gPSBmYWxzZTtcblxuICBwcm90ZWN0ZWQgaXNCb2R5T3ZlcmZsb3dpbmcgPSBmYWxzZTtcbiAgcHJvdGVjdGVkIG9yaWdpbmFsQm9keVBhZGRpbmcgPSAwO1xuICBwcm90ZWN0ZWQgc2Nyb2xsYmFyV2lkdGggPSAwO1xuXG4gIHByb3RlY3RlZCB0aW1lckhpZGVNb2RhbCA9IDA7XG4gIHByb3RlY3RlZCB0aW1lclJtQmFja0Ryb3AgPSAwO1xuXG4gIC8vIHJlZmVyZW5jZSB0byBiYWNrZHJvcCBjb21wb25lbnRcbiAgcHJvdGVjdGVkIGJhY2tkcm9wOiBDb21wb25lbnRSZWY8TW9kYWxCYWNrZHJvcENvbXBvbmVudD47XG4gIHByaXZhdGUgX2JhY2tkcm9wOiBDb21wb25lbnRMb2FkZXI8TW9kYWxCYWNrZHJvcENvbXBvbmVudD47XG5cbiAgcHJpdmF0ZSBpc05lc3RlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICAgICAgICBjbGY6IENvbXBvbmVudExvYWRlckZhY3RvcnkpIHtcbiAgICB0aGlzLl9iYWNrZHJvcCA9IGNsZi5jcmVhdGVMb2FkZXI8TW9kYWxCYWNrZHJvcENvbXBvbmVudD4oXG4gICAgICBfZWxlbWVudCxcbiAgICAgIF92aWV3Q29udGFpbmVyUmVmLFxuICAgICAgX3JlbmRlcmVyXG4gICAgKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgb25DbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIHRoaXMuY29uZmlnLmlnbm9yZUJhY2tkcm9wQ2xpY2sgfHxcbiAgICAgIHRoaXMuY29uZmlnLmJhY2tkcm9wID09PSAnc3RhdGljJyB8fFxuICAgICAgZXZlbnQudGFyZ2V0ICE9PSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnRcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kaXNtaXNzUmVhc29uID0gRElTTUlTU19SRUFTT05TLkJBQ0tSRE9QO1xuICAgIHRoaXMuaGlkZShldmVudCk7XG4gIH1cblxuICAvLyB0b2RvOiBjb25zaWRlciBwcmV2ZW50aW5nIGRlZmF1bHQgYW5kIHN0b3BwaW5nIHByb3BhZ2F0aW9uXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uZXNjJywgWyckZXZlbnQnXSlcbiAgb25Fc2MoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2lzU2hvd24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDI3IHx8IGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29uZmlnLmtleWJvYXJkKSB7XG4gICAgICB0aGlzLmRpc21pc3NSZWFzb24gPSBESVNNSVNTX1JFQVNPTlMuRVNDO1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5jb25maWcgPSB2b2lkIDA7XG4gICAgaWYgKHRoaXMuX2lzU2hvd24pIHtcbiAgICAgIHRoaXMuX2lzU2hvd24gPSBmYWxzZTtcbiAgICAgIHRoaXMuaGlkZU1vZGFsKCk7XG4gICAgICB0aGlzLl9iYWNrZHJvcC5kaXNwb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fY29uZmlnID0gdGhpcy5fY29uZmlnIHx8IHRoaXMuZ2V0Q29uZmlnKCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fY29uZmlnLnNob3cpIHtcbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICB9XG4gICAgfSwgMCk7XG4gIH1cblxuICAvKiBQdWJsaWMgbWV0aG9kcyAqL1xuXG4gIC8qKiBBbGxvd3MgdG8gbWFudWFsbHkgdG9nZ2xlIG1vZGFsIHZpc2liaWxpdHkgKi9cbiAgdG9nZ2xlKCk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLl9pc1Nob3duID8gdGhpcy5oaWRlKCkgOiB0aGlzLnNob3coKTtcbiAgfVxuXG4gIC8qKiBBbGxvd3MgdG8gbWFudWFsbHkgb3BlbiBtb2RhbCAqL1xuICBzaG93KCk6IHZvaWQge1xuICAgIHRoaXMuZGlzbWlzc1JlYXNvbiA9IG51bGw7XG4gICAgdGhpcy5vblNob3cuZW1pdCh0aGlzKTtcbiAgICBpZiAodGhpcy5faXNTaG93bikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lckhpZGVNb2RhbCk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXJSbUJhY2tEcm9wKTtcblxuICAgIHRoaXMuX2lzU2hvd24gPSB0cnVlO1xuXG4gICAgdGhpcy5jaGVja1Njcm9sbGJhcigpO1xuICAgIHRoaXMuc2V0U2Nyb2xsYmFyKCk7XG5cbiAgICBpZiAoZG9jdW1lbnQgJiYgZG9jdW1lbnQuYm9keSkge1xuICAgICAgaWYgKGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX05BTUUuT1BFTikpIHtcbiAgICAgICAgdGhpcy5pc05lc3RlZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCBDTEFTU19OQU1FLk9QRU4pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2hvd0JhY2tkcm9wKCgpID0+IHtcbiAgICAgIHRoaXMuc2hvd0VsZW1lbnQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBBbGxvd3MgdG8gbWFudWFsbHkgY2xvc2UgbW9kYWwgKi9cbiAgaGlkZShldmVudD86IEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIHRoaXMub25IaWRlLmVtaXQodGhpcyk7XG5cbiAgICAvLyB0b2RvOiBhZGQgYW4gb3B0aW9uIHRvIHByZXZlbnQgaGlkaW5nXG4gICAgaWYgKCF0aGlzLl9pc1Nob3duKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLnRpbWVySGlkZU1vZGFsKTtcbiAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMudGltZXJSbUJhY2tEcm9wKTtcblxuICAgIHRoaXMuX2lzU2hvd24gPSBmYWxzZTtcbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIENMQVNTX05BTUUuSU4pO1xuICAgIGlmICghaXNCczMoKSkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCBDTEFTU19OQU1FLlNIT1cpO1xuICAgIH1cbiAgICAvLyB0aGlzLl9hZGRDbGFzc0luID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy5fY29uZmlnLmFuaW1hdGVkKSB7XG4gICAgICB0aGlzLnRpbWVySGlkZU1vZGFsID0gd2luZG93LnNldFRpbWVvdXQoXG4gICAgICAgICgpID0+IHRoaXMuaGlkZU1vZGFsKCksXG4gICAgICAgIFRSQU5TSVRJT05fRFVSQVRJT05cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGlkZU1vZGFsKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFByaXZhdGUgbWV0aG9kcyBAaW50ZXJuYWwgKi9cbiAgcHJvdGVjdGVkIGdldENvbmZpZyhjb25maWc/OiBNb2RhbE9wdGlvbnMpOiBNb2RhbE9wdGlvbnMge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBtb2RhbENvbmZpZ0RlZmF1bHRzLCBjb25maWcpO1xuICB9XG5cbiAgLyoqXG4gICAqICBTaG93IGRpYWxvZ1xuICAgKiAgQGludGVybmFsXG4gICAqL1xuICBwcm90ZWN0ZWQgc2hvd0VsZW1lbnQoKTogdm9pZCB7XG4gICAgLy8gdG9kbzogcmVwbGFjZSB0aGlzIHdpdGggY29tcG9uZW50IGxvYWRlciB1c2FnZVxuICAgIGlmIChcbiAgICAgICF0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZSB8fFxuICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGUubm9kZVR5cGUgIT09IE5vZGUuRUxFTUVOVF9OT0RFXG4gICAgKSB7XG4gICAgICAvLyBkb24ndCBtb3ZlIG1vZGFscyBkb20gcG9zaXRpb25cbiAgICAgIGlmIChkb2N1bWVudCAmJiBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUoXG4gICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAnYXJpYS1oaWRkZW4nLFxuICAgICAgJ2ZhbHNlJ1xuICAgICk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKFxuICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgJ2FyaWEtbW9kYWwnLFxuICAgICAgJ3RydWUnXG4gICAgKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICdkaXNwbGF5JyxcbiAgICAgICdibG9jaydcbiAgICApO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgJ3Njcm9sbFRvcCcsXG4gICAgICAwXG4gICAgKTtcblxuICAgIGlmICh0aGlzLl9jb25maWcuYW5pbWF0ZWQpIHtcbiAgICAgIFV0aWxzLnJlZmxvdyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8vIHRoaXMuX2FkZENsYXNzSW4gPSB0cnVlO1xuICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgQ0xBU1NfTkFNRS5JTik7XG4gICAgaWYgKCFpc0JzMygpKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIENMQVNTX05BTUUuU0hPVyk7XG4gICAgfVxuXG4gICAgY29uc3QgdHJhbnNpdGlvbkNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX2NvbmZpZy5mb2N1cykge1xuICAgICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMub25TaG93bi5lbWl0KHRoaXMpO1xuICAgIH07XG5cbiAgICBpZiAodGhpcy5fY29uZmlnLmFuaW1hdGVkKSB7XG4gICAgICBzZXRUaW1lb3V0KHRyYW5zaXRpb25Db21wbGV0ZSwgVFJBTlNJVElPTl9EVVJBVElPTik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYW5zaXRpb25Db21wbGV0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJvdGVjdGVkIGhpZGVNb2RhbCgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUoXG4gICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAnYXJpYS1oaWRkZW4nLFxuICAgICAgJ3RydWUnXG4gICAgKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICdkaXNwbGF5JyxcbiAgICAgICdub25lJ1xuICAgICk7XG4gICAgdGhpcy5zaG93QmFja2Ryb3AoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmlzTmVzdGVkKSB7XG4gICAgICAgIGlmIChkb2N1bWVudCAmJiBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgQ0xBU1NfTkFNRS5PUEVOKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc2V0U2Nyb2xsYmFyKCk7XG4gICAgICB9XG4gICAgICB0aGlzLnJlc2V0QWRqdXN0bWVudHMoKTtcbiAgICAgIHRoaXMuZm9jdXNPdGhlck1vZGFsKCk7XG4gICAgICB0aGlzLm9uSGlkZGVuLmVtaXQodGhpcyk7XG4gICAgfSk7XG4gIH1cblxuICAvLyB0b2RvOiBvcmlnaW5hbCBzaG93IHdhcyBjYWxsaW5nIGEgY2FsbGJhY2sgd2hlbiBkb25lLCBidXQgd2UgY2FuIHVzZVxuICAvLyBwcm9taXNlXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJvdGVjdGVkIHNob3dCYWNrZHJvcChjYWxsYmFjaz86IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5faXNTaG93biAmJlxuICAgICAgdGhpcy5jb25maWcuYmFja2Ryb3AgJiZcbiAgICAgICghdGhpcy5iYWNrZHJvcCB8fCAhdGhpcy5iYWNrZHJvcC5pbnN0YW5jZS5pc1Nob3duKVxuICAgICkge1xuICAgICAgdGhpcy5yZW1vdmVCYWNrZHJvcCgpO1xuICAgICAgdGhpcy5fYmFja2Ryb3BcbiAgICAgICAgLmF0dGFjaChNb2RhbEJhY2tkcm9wQ29tcG9uZW50KVxuICAgICAgICAudG8oJ2JvZHknKVxuICAgICAgICAuc2hvdyh7aXNBbmltYXRlZDogdGhpcy5fY29uZmlnLmFuaW1hdGVkfSk7XG4gICAgICB0aGlzLmJhY2tkcm9wID0gdGhpcy5fYmFja2Ryb3AuX2NvbXBvbmVudFJlZjtcblxuICAgICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5fY29uZmlnLmFuaW1hdGVkKSB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZXRUaW1lb3V0KGNhbGxiYWNrLCBCQUNLRFJPUF9UUkFOU0lUSU9OX0RVUkFUSU9OKTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLl9pc1Nob3duICYmIHRoaXMuYmFja2Ryb3ApIHtcbiAgICAgIHRoaXMuYmFja2Ryb3AuaW5zdGFuY2UuaXNTaG93biA9IGZhbHNlO1xuXG4gICAgICBjb25zdCBjYWxsYmFja1JlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5yZW1vdmVCYWNrZHJvcCgpO1xuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5iYWNrZHJvcC5pbnN0YW5jZS5pc0FuaW1hdGVkKSB7XG4gICAgICAgIHRoaXMudGltZXJSbUJhY2tEcm9wID0gd2luZG93LnNldFRpbWVvdXQoXG4gICAgICAgICAgY2FsbGJhY2tSZW1vdmUsXG4gICAgICAgICAgQkFDS0RST1BfVFJBTlNJVElPTl9EVVJBVElPTlxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2tSZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJvdGVjdGVkIHJlbW92ZUJhY2tkcm9wKCk6IHZvaWQge1xuICAgIHRoaXMuX2JhY2tkcm9wLmhpZGUoKTtcbiAgfVxuXG4gIC8qKiBFdmVudHMgdHJpY2tzICovXG5cbiAgLy8gbm8gbmVlZCBmb3IgaXRcbiAgLy8gcHJvdGVjdGVkIHNldEVzY2FwZUV2ZW50KCk6dm9pZCB7XG4gIC8vICAgaWYgKHRoaXMuX2lzU2hvd24gJiYgdGhpcy5fY29uZmlnLmtleWJvYXJkKSB7XG4gIC8vICAgICAkKHRoaXMuX2VsZW1lbnQpLm9uKEV2ZW50LktFWURPV05fRElTTUlTUywgKGV2ZW50KSA9PiB7XG4gIC8vICAgICAgIGlmIChldmVudC53aGljaCA9PT0gMjcpIHtcbiAgLy8gICAgICAgICB0aGlzLmhpZGUoKVxuICAvLyAgICAgICB9XG4gIC8vICAgICB9KVxuICAvL1xuICAvLyAgIH0gZWxzZSBpZiAoIXRoaXMuX2lzU2hvd24pIHtcbiAgLy8gICAgICQodGhpcy5fZWxlbWVudCkub2ZmKEV2ZW50LktFWURPV05fRElTTUlTUylcbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyBwcm90ZWN0ZWQgc2V0UmVzaXplRXZlbnQoKTp2b2lkIHtcbiAgLy8gY29uc29sZS5sb2codGhpcy5yZW5kZXJlci5saXN0ZW5HbG9iYWwoJycsIEV2ZW50LlJFU0laRSkpO1xuICAvLyBpZiAodGhpcy5faXNTaG93bikge1xuICAvLyAgICQod2luZG93KS5vbihFdmVudC5SRVNJWkUsICQucHJveHkodGhpcy5faGFuZGxlVXBkYXRlLCB0aGlzKSlcbiAgLy8gfSBlbHNlIHtcbiAgLy8gICAkKHdpbmRvdykub2ZmKEV2ZW50LlJFU0laRSlcbiAgLy8gfVxuICAvLyB9XG5cbiAgcHJvdGVjdGVkIGZvY3VzT3RoZXJNb2RhbCgpIHtcbiAgICBpZiAodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBvdGhlck9wZW5lZE1vZGFscyA9IHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbltic01vZGFsXScpO1xuICAgIGlmICghb3RoZXJPcGVuZWRNb2RhbHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG90aGVyT3BlbmVkTW9kYWxzW290aGVyT3BlbmVkTW9kYWxzLmxlbmd0aCAtIDFdLmZvY3VzKCk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIHByb3RlY3RlZCByZXNldEFkanVzdG1lbnRzKCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgJ3BhZGRpbmdMZWZ0JyxcbiAgICAgICcnXG4gICAgKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICdwYWRkaW5nUmlnaHQnLFxuICAgICAgJydcbiAgICApO1xuICB9XG5cbiAgLyoqIFNjcm9sbCBiYXIgdHJpY2tzICovXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJvdGVjdGVkIGNoZWNrU2Nyb2xsYmFyKCk6IHZvaWQge1xuICAgIHRoaXMuaXNCb2R5T3ZlcmZsb3dpbmcgPSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoIDwgd2luZG93LmlubmVyV2lkdGg7XG4gICAgdGhpcy5zY3JvbGxiYXJXaWR0aCA9IHRoaXMuZ2V0U2Nyb2xsYmFyV2lkdGgoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRTY3JvbGxiYXIoKTogdm9pZCB7XG4gICAgaWYgKCFkb2N1bWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMub3JpZ2luYWxCb2R5UGFkZGluZyA9IHBhcnNlSW50KFxuICAgICAgd2luZG93XG4gICAgICAgIC5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpXG4gICAgICAgIC5nZXRQcm9wZXJ0eVZhbHVlKCdwYWRkaW5nLXJpZ2h0JykgfHwgMCxcbiAgICAgIDEwXG4gICAgKTtcblxuICAgIGlmICh0aGlzLmlzQm9keU92ZXJmbG93aW5nKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9IGAke3RoaXMub3JpZ2luYWxCb2R5UGFkZGluZyArXG4gICAgICB0aGlzLnNjcm9sbGJhcldpZHRofXB4YDtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVzZXRTY3JvbGxiYXIoKTogdm9pZCB7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPSBgJHt0aGlzLm9yaWdpbmFsQm9keVBhZGRpbmd9cHhgO1xuICB9XG5cbiAgLy8gdGh4IGQud2Fsc2hcbiAgcHJvdGVjdGVkIGdldFNjcm9sbGJhcldpZHRoKCk6IG51bWJlciB7XG4gICAgY29uc3Qgc2Nyb2xsRGl2ID0gdGhpcy5fcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3Moc2Nyb2xsRGl2LCBDTEFTU19OQU1FLlNDUk9MTEJBUl9NRUFTVVJFUik7XG4gICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuYm9keSwgc2Nyb2xsRGl2KTtcbiAgICBjb25zdCBzY3JvbGxiYXJXaWR0aCA9IHNjcm9sbERpdi5vZmZzZXRXaWR0aCAtIHNjcm9sbERpdi5jbGllbnRXaWR0aDtcbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDaGlsZChkb2N1bWVudC5ib2R5LCBzY3JvbGxEaXYpO1xuXG4gICAgcmV0dXJuIHNjcm9sbGJhcldpZHRoO1xuICB9XG59XG4iXX0=