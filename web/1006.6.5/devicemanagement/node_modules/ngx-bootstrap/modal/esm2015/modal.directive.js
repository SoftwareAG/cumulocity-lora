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
const TRANSITION_DURATION = 300;
/** @type {?} */
const BACKDROP_TRANSITION_DURATION = 150;
/**
 * Mark any code with directive to show it's content in modal
 */
export class ModalDirective {
    /**
     * @param {?} _element
     * @param {?} _viewContainerRef
     * @param {?} _renderer
     * @param {?} clf
     */
    constructor(_element, _viewContainerRef, _renderer, clf) {
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
    /**
     * allows to set modal configuration via element property
     * @param {?} conf
     * @return {?}
     */
    set config(conf) {
        this._config = this.getConfig(conf);
    }
    /**
     * @return {?}
     */
    get config() {
        return this._config;
    }
    /**
     * @return {?}
     */
    get isShown() {
        return this._isShown;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        if (this.config.ignoreBackdropClick ||
            this.config.backdrop === 'static' ||
            event.target !== this._element.nativeElement) {
            return;
        }
        this.dismissReason = DISMISS_REASONS.BACKRDOP;
        this.hide(event);
    }
    // todo: consider preventing default and stopping propagation
    /**
     * @param {?} event
     * @return {?}
     */
    onEsc(event) {
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
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.config = void 0;
        if (this._isShown) {
            this._isShown = false;
            this.hideModal();
            this._backdrop.dispose();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._config = this._config || this.getConfig();
        setTimeout((/**
         * @return {?}
         */
        () => {
            if (this._config.show) {
                this.show();
            }
        }), 0);
    }
    /* Public methods */
    /**
     * Allows to manually toggle modal visibility
     * @return {?}
     */
    toggle() {
        return this._isShown ? this.hide() : this.show();
    }
    /**
     * Allows to manually open modal
     * @return {?}
     */
    show() {
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
        () => {
            this.showElement();
        }));
    }
    /**
     * Allows to manually close modal
     * @param {?=} event
     * @return {?}
     */
    hide(event) {
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
            () => this.hideModal()), TRANSITION_DURATION);
        }
        else {
            this.hideModal();
        }
    }
    /**
     * Private methods \@internal
     * @protected
     * @param {?=} config
     * @return {?}
     */
    getConfig(config) {
        return Object.assign({}, modalConfigDefaults, config);
    }
    /**
     *  Show dialog
     * \@internal
     * @protected
     * @return {?}
     */
    showElement() {
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
        const transitionComplete = (/**
         * @return {?}
         */
        () => {
            if (this._config.focus) {
                this._element.nativeElement.focus();
            }
            this.onShown.emit(this);
        });
        if (this._config.animated) {
            setTimeout(transitionComplete, TRANSITION_DURATION);
        }
        else {
            transitionComplete();
        }
    }
    /**
     * \@internal
     * @protected
     * @return {?}
     */
    hideModal() {
        this._renderer.setAttribute(this._element.nativeElement, 'aria-hidden', 'true');
        this._renderer.setStyle(this._element.nativeElement, 'display', 'none');
        this.showBackdrop((/**
         * @return {?}
         */
        () => {
            if (!this.isNested) {
                if (document && document.body) {
                    this._renderer.removeClass(document.body, CLASS_NAME.OPEN);
                }
                this.resetScrollbar();
            }
            this.resetAdjustments();
            this.focusOtherModal();
            this.onHidden.emit(this);
        }));
    }
    // todo: original show was calling a callback when done, but we can use
    // promise
    /**
     * \@internal
     * @protected
     * @param {?=} callback
     * @return {?}
     */
    showBackdrop(callback) {
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
            const callbackRemove = (/**
             * @return {?}
             */
            () => {
                this.removeBackdrop();
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
    }
    /**
     * \@internal
     * @protected
     * @return {?}
     */
    removeBackdrop() {
        this._backdrop.hide();
    }
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
    focusOtherModal() {
        if (this._element.nativeElement.parentElement == null) {
            return;
        }
        /** @type {?} */
        const otherOpenedModals = this._element.nativeElement.parentElement.querySelectorAll('.in[bsModal]');
        if (!otherOpenedModals.length) {
            return;
        }
        otherOpenedModals[otherOpenedModals.length - 1].focus();
    }
    /**
     * \@internal
     * @protected
     * @return {?}
     */
    resetAdjustments() {
        this._renderer.setStyle(this._element.nativeElement, 'paddingLeft', '');
        this._renderer.setStyle(this._element.nativeElement, 'paddingRight', '');
    }
    /** Scroll bar tricks */
    /**
     * \@internal
     * @protected
     * @return {?}
     */
    checkScrollbar() {
        this.isBodyOverflowing = document.body.clientWidth < window.innerWidth;
        this.scrollbarWidth = this.getScrollbarWidth();
    }
    /**
     * @protected
     * @return {?}
     */
    setScrollbar() {
        if (!document) {
            return;
        }
        this.originalBodyPadding = parseInt(window
            .getComputedStyle(document.body)
            .getPropertyValue('padding-right') || 0, 10);
        if (this.isBodyOverflowing) {
            document.body.style.paddingRight = `${this.originalBodyPadding +
                this.scrollbarWidth}px`;
        }
    }
    /**
     * @protected
     * @return {?}
     */
    resetScrollbar() {
        document.body.style.paddingRight = `${this.originalBodyPadding}px`;
    }
    // thx d.walsh
    /**
     * @protected
     * @return {?}
     */
    getScrollbarWidth() {
        /** @type {?} */
        const scrollDiv = this._renderer.createElement('div');
        this._renderer.addClass(scrollDiv, CLASS_NAME.SCROLLBAR_MEASURER);
        this._renderer.appendChild(document.body, scrollDiv);
        /** @type {?} */
        const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        this._renderer.removeChild(document.body, scrollDiv);
        return scrollbarWidth;
    }
}
ModalDirective.decorators = [
    { type: Directive, args: [{
                selector: '[bsModal]',
                exportAs: 'bs-modal'
            },] }
];
/** @nocollapse */
ModalDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: ViewContainerRef },
    { type: Renderer2 },
    { type: ComponentLoaderFactory }
];
ModalDirective.propDecorators = {
    config: [{ type: Input }],
    onShow: [{ type: Output }],
    onShown: [{ type: Output }],
    onHide: [{ type: Output }],
    onHidden: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }],
    onEsc: [{ type: HostListener, args: ['keydown.esc', ['$event'],] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWJvb3RzdHJhcC9tb2RhbC8iLCJzb3VyY2VzIjpbIm1vZGFsLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUtBLE9BQU8sRUFDUyxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUNuRCxNQUFNLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUN2RCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUNMLFVBQVUsRUFBRSxlQUFlLEVBQUUsbUJBQW1CLEVBQUUsWUFBWSxFQUMvRCxNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBbUIsc0JBQXNCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7TUFFbkYsbUJBQW1CLEdBQUcsR0FBRzs7TUFDekIsNEJBQTRCLEdBQUcsR0FBRzs7OztBQU94QyxNQUFNLE9BQU8sY0FBYzs7Ozs7OztJQXdEekIsWUFBb0IsUUFBb0IsRUFDNUIsaUJBQW1DLEVBQzNCLFNBQW9CLEVBQzVCLEdBQTJCO1FBSG5CLGFBQVEsR0FBUixRQUFRLENBQVk7UUFFcEIsY0FBUyxHQUFULFNBQVMsQ0FBVzs7OztRQTdDeEMsV0FBTSxHQUFpQyxJQUFJLFlBQVksRUFBa0IsQ0FBQzs7Ozs7UUFLMUUsWUFBTyxHQUFpQyxJQUFJLFlBQVksRUFBa0IsQ0FBQzs7Ozs7UUFLM0UsV0FBTSxHQUFpQyxJQUFJLFlBQVksRUFBa0IsQ0FBQzs7Ozs7UUFLMUUsYUFBUSxHQUFpQyxJQUFJLFlBQVksRUFBa0IsQ0FBQztRQWFsRSxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRWpCLHNCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMxQix3QkFBbUIsR0FBRyxDQUFDLENBQUM7UUFDeEIsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFFbkIsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFDbkIsb0JBQWUsR0FBRyxDQUFDLENBQUM7UUFNdEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQU12QixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQy9CLFFBQVEsRUFDUixpQkFBaUIsRUFDakIsU0FBUyxDQUNWLENBQUM7SUFDSixDQUFDOzs7Ozs7SUEvREQsSUFDSSxNQUFNLENBQUMsSUFBa0I7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7Ozs7SUFFRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQzs7OztJQTJCRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUE4QkQsT0FBTyxDQUFDLEtBQWlCO1FBQ3ZCLElBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUI7WUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEtBQUssUUFBUTtZQUNqQyxLQUFLLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUM1QztZQUNBLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQztRQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25CLENBQUM7Ozs7OztJQUlELEtBQUssQ0FBQyxLQUFvQjtRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixPQUFPO1NBQ1I7UUFDRCx1Q0FBdUM7UUFDdkMsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMsR0FBRyxLQUFLLFFBQVEsRUFBRTtZQUNsRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDeEI7UUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxhQUFhLEdBQUcsZUFBZSxDQUFDLEdBQUcsQ0FBQztZQUN6QyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDYjtJQUNILENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNyQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDMUI7SUFDSCxDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDaEQsVUFBVTs7O1FBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtnQkFDckIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2I7UUFDSCxDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDOzs7Ozs7SUFLRCxNQUFNO1FBQ0osT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNuRCxDQUFDOzs7OztJQUdELElBQUk7UUFDRixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsT0FBTztTQUNSO1FBQ0QsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNsQyxZQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRW5DLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBRXJCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEIsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLElBQUksRUFBRTtZQUM3QixJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3JELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2FBQ3RCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3pEO1NBQ0Y7UUFFRCxJQUFJLENBQUMsWUFBWTs7O1FBQUMsR0FBRyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQUdELElBQUksQ0FBQyxLQUFhO1FBQ2hCLElBQUksS0FBSyxFQUFFO1lBQ1QsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3hCO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkIsd0NBQXdDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLE9BQU87U0FDUjtRQUVELE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRTFDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDWixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDMUU7UUFDRCw0QkFBNEI7UUFFNUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUN6QixJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxVQUFVOzs7WUFDckMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUN0QixtQkFBbUIsQ0FDcEIsQ0FBQztTQUNIO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDbEI7SUFDSCxDQUFDOzs7Ozs7O0lBR1MsU0FBUyxDQUFDLE1BQXFCO1FBQ3ZDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7Ozs7OztJQU1TLFdBQVc7UUFDbkIsaURBQWlEO1FBQ2pELElBQ0UsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVO1lBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLFlBQVksRUFDckU7WUFDQSxpQ0FBaUM7WUFDakMsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLElBQUksRUFBRTtnQkFDN0IsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUN4RDtTQUNGO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUMzQixhQUFhLEVBQ2IsT0FBTyxDQUNSLENBQUM7UUFDRixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQzNCLFlBQVksRUFDWixNQUFNLENBQ1AsQ0FBQztRQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFDM0IsU0FBUyxFQUNULE9BQU8sQ0FDUixDQUFDO1FBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUMzQixXQUFXLEVBQ1gsQ0FBQyxDQUNGLENBQUM7UUFFRixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO1lBQ3pCLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUMzQztRQUVELDJCQUEyQjtRQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ1osSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZFOztjQUVLLGtCQUFrQjs7O1FBQUcsR0FBRyxFQUFFO1lBQzlCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3JDO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFBO1FBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUN6QixVQUFVLENBQUMsa0JBQWtCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztTQUNyRDthQUFNO1lBQ0wsa0JBQWtCLEVBQUUsQ0FBQztTQUN0QjtJQUNILENBQUM7Ozs7OztJQUdTLFNBQVM7UUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUMzQixhQUFhLEVBQ2IsTUFBTSxDQUNQLENBQUM7UUFDRixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQzNCLFNBQVMsRUFDVCxNQUFNLENBQ1AsQ0FBQztRQUNGLElBQUksQ0FBQyxZQUFZOzs7UUFBQyxHQUFHLEVBQUU7WUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2xCLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUU7b0JBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM1RDtnQkFDRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDdkI7WUFDRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7Ozs7SUFLUyxZQUFZLENBQUMsUUFBbUI7UUFDeEMsSUFDRSxJQUFJLENBQUMsUUFBUTtZQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUTtZQUNwQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUNuRDtZQUNBLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsU0FBUztpQkFDWCxNQUFNLENBQUMsc0JBQXNCLENBQUM7aUJBQzlCLEVBQUUsQ0FBQyxNQUFNLENBQUM7aUJBQ1YsSUFBSSxDQUFDLEVBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO1lBRTdDLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2IsT0FBTzthQUNSO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO2dCQUMxQixRQUFRLEVBQUUsQ0FBQztnQkFFWCxPQUFPO2FBQ1I7WUFFRCxVQUFVLENBQUMsUUFBUSxFQUFFLDRCQUE0QixDQUFDLENBQUM7U0FDcEQ7YUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7O2tCQUVqQyxjQUFjOzs7WUFBRyxHQUFHLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdEIsSUFBSSxRQUFRLEVBQUU7b0JBQ1osUUFBUSxFQUFFLENBQUM7aUJBQ1o7WUFDSCxDQUFDLENBQUE7WUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRTtnQkFDckMsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUN0QyxjQUFjLEVBQ2QsNEJBQTRCLENBQzdCLENBQUM7YUFDSDtpQkFBTTtnQkFDTCxjQUFjLEVBQUUsQ0FBQzthQUNsQjtTQUNGO2FBQU0sSUFBSSxRQUFRLEVBQUU7WUFDbkIsUUFBUSxFQUFFLENBQUM7U0FDWjtJQUNILENBQUM7Ozs7OztJQUdTLGNBQWM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUEyQlMsZUFBZTtRQUN2QixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsSUFBSSxJQUFJLEVBQUU7WUFDckQsT0FBTztTQUNSOztjQUNLLGlCQUFpQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUM7UUFDcEcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRTtZQUM3QixPQUFPO1NBQ1I7UUFDRCxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDMUQsQ0FBQzs7Ozs7O0lBR1MsZ0JBQWdCO1FBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFDM0IsYUFBYSxFQUNiLEVBQUUsQ0FDSCxDQUFDO1FBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUMzQixjQUFjLEVBQ2QsRUFBRSxDQUNILENBQUM7SUFDSixDQUFDOzs7Ozs7O0lBSVMsY0FBYztRQUN0QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUN2RSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ2pELENBQUM7Ozs7O0lBRVMsWUFBWTtRQUNwQixJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFFBQVEsQ0FDakMsTUFBTTthQUNILGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7YUFDL0IsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUN6QyxFQUFFLENBQ0gsQ0FBQztRQUVGLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzFCLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxHQUFHLElBQUksQ0FBQyxtQkFBbUI7Z0JBQzlELElBQUksQ0FBQyxjQUFjLElBQUksQ0FBQztTQUN6QjtJQUNILENBQUM7Ozs7O0lBRVMsY0FBYztRQUN0QixRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLElBQUksQ0FBQztJQUNyRSxDQUFDOzs7Ozs7SUFHUyxpQkFBaUI7O2NBQ25CLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDckQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7O2NBQy9DLGNBQWMsR0FBRyxTQUFTLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxXQUFXO1FBQ3BFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFckQsT0FBTyxjQUFjLENBQUM7SUFDeEIsQ0FBQzs7O1lBcmFGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIsUUFBUSxFQUFFLFVBQVU7YUFDckI7Ozs7WUFsQjBCLFVBQVU7WUFDRyxnQkFBZ0I7WUFBM0IsU0FBUztZQVFaLHNCQUFzQjs7O3FCQVk3QyxLQUFLO3FCQVVMLE1BQU07c0JBS04sTUFBTTtxQkFLTixNQUFNO3VCQUtOLE1BQU07c0JBd0NOLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7b0JBY2hDLFlBQVksU0FBQyxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7SUFyRXZDLGdDQUMwRTs7Ozs7O0lBSTFFLGlDQUMyRTs7Ozs7O0lBSTNFLGdDQUMwRTs7Ozs7O0lBSTFFLGtDQUM0RTs7Ozs7OztJQU01RSx1Q0FBc0I7Ozs7O0lBTXRCLGlDQUFnQzs7Ozs7SUFDaEMsa0NBQTJCOzs7OztJQUUzQiwyQ0FBb0M7Ozs7O0lBQ3BDLDZDQUFrQzs7Ozs7SUFDbEMsd0NBQTZCOzs7OztJQUU3Qix3Q0FBNkI7Ozs7O0lBQzdCLHlDQUE4Qjs7Ozs7SUFHOUIsa0NBQXlEOzs7OztJQUN6RCxtQ0FBMkQ7Ozs7O0lBRTNELGtDQUF5Qjs7Ozs7SUFFYixrQ0FBNEI7Ozs7O0lBRTVCLG1DQUE0QiIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlOm1heC1maWxlLWxpbmUtY291bnQgKi9cbi8vIHRvZG86IHNob3VsZCB3ZSBzdXBwb3J0IGVuZm9yY2UgZm9jdXMgaW4/XG4vLyB0b2RvOiBpbiBvcmlnaW5hbCBicyB0aGVyZSBhcmUgd2FzIGEgd2F5IHRvIHByZXZlbnQgbW9kYWwgZnJvbSBzaG93aW5nXG4vLyB0b2RvOiBvcmlnaW5hbCBtb2RhbCBoYWQgcmVzaXplIGV2ZW50c1xuXG5pbXBvcnQge1xuICBDb21wb25lbnRSZWYsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LFxuICBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBSZW5kZXJlcjIsIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGRvY3VtZW50LCB3aW5kb3csIGlzQnMzLCBVdGlscyB9IGZyb20gJ25neC1ib290c3RyYXAvdXRpbHMnO1xuaW1wb3J0IHsgTW9kYWxCYWNrZHJvcENvbXBvbmVudCB9IGZyb20gJy4vbW9kYWwtYmFja2Ryb3AuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIENMQVNTX05BTUUsIERJU01JU1NfUkVBU09OUywgbW9kYWxDb25maWdEZWZhdWx0cywgTW9kYWxPcHRpb25zXG59IGZyb20gJy4vbW9kYWwtb3B0aW9ucy5jbGFzcyc7XG5pbXBvcnQgeyBDb21wb25lbnRMb2FkZXIsIENvbXBvbmVudExvYWRlckZhY3RvcnkgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2NvbXBvbmVudC1sb2FkZXInO1xuXG5jb25zdCBUUkFOU0lUSU9OX0RVUkFUSU9OID0gMzAwO1xuY29uc3QgQkFDS0RST1BfVFJBTlNJVElPTl9EVVJBVElPTiA9IDE1MDtcblxuLyoqIE1hcmsgYW55IGNvZGUgd2l0aCBkaXJlY3RpdmUgdG8gc2hvdyBpdCdzIGNvbnRlbnQgaW4gbW9kYWwgKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tic01vZGFsXScsXG4gIGV4cG9ydEFzOiAnYnMtbW9kYWwnXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQge1xuICAvKiogYWxsb3dzIHRvIHNldCBtb2RhbCBjb25maWd1cmF0aW9uIHZpYSBlbGVtZW50IHByb3BlcnR5ICovXG4gIEBJbnB1dCgpXG4gIHNldCBjb25maWcoY29uZjogTW9kYWxPcHRpb25zKSB7XG4gICAgdGhpcy5fY29uZmlnID0gdGhpcy5nZXRDb25maWcoY29uZik7XG4gIH1cblxuICBnZXQgY29uZmlnKCk6IE1vZGFsT3B0aW9ucyB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgfVxuXG4gIC8qKiBUaGlzIGV2ZW50IGZpcmVzIGltbWVkaWF0ZWx5IHdoZW4gdGhlIGBzaG93YCBpbnN0YW5jZSBtZXRob2QgaXMgY2FsbGVkLiAqL1xuICBAT3V0cHV0KClcbiAgb25TaG93OiBFdmVudEVtaXR0ZXI8TW9kYWxEaXJlY3RpdmU+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb2RhbERpcmVjdGl2ZT4oKTtcbiAgLyoqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgbW9kYWwgaGFzIGJlZW4gbWFkZSB2aXNpYmxlIHRvIHRoZSB1c2VyXG4gICAqICh3aWxsIHdhaXQgZm9yIENTUyB0cmFuc2l0aW9ucyB0byBjb21wbGV0ZSlcbiAgICovXG4gIEBPdXRwdXQoKVxuICBvblNob3duOiBFdmVudEVtaXR0ZXI8TW9kYWxEaXJlY3RpdmU+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb2RhbERpcmVjdGl2ZT4oKTtcbiAgLyoqIFRoaXMgZXZlbnQgaXMgZmlyZWQgaW1tZWRpYXRlbHkgd2hlblxuICAgKiB0aGUgaGlkZSBpbnN0YW5jZSBtZXRob2QgaGFzIGJlZW4gY2FsbGVkLlxuICAgKi9cbiAgQE91dHB1dCgpXG4gIG9uSGlkZTogRXZlbnRFbWl0dGVyPE1vZGFsRGlyZWN0aXZlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TW9kYWxEaXJlY3RpdmU+KCk7XG4gIC8qKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIG1vZGFsIGhhcyBmaW5pc2hlZCBiZWluZ1xuICAgKiBoaWRkZW4gZnJvbSB0aGUgdXNlciAod2lsbCB3YWl0IGZvciBDU1MgdHJhbnNpdGlvbnMgdG8gY29tcGxldGUpLlxuICAgKi9cbiAgQE91dHB1dCgpXG4gIG9uSGlkZGVuOiBFdmVudEVtaXR0ZXI8TW9kYWxEaXJlY3RpdmU+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb2RhbERpcmVjdGl2ZT4oKTtcblxuICAvKiogVGhpcyBmaWVsZCBjb250YWlucyBsYXN0IGRpc21pc3MgcmVhc29uLlxuICAgKiBQb3NzaWJsZSB2YWx1ZXM6IGBiYWNrZHJvcC1jbGlja2AsIGBlc2NgIGFuZCBgbnVsbGBcbiAgICogKGlmIG1vZGFsIHdhcyBjbG9zZWQgYnkgZGlyZWN0IGNhbGwgb2YgYC5oaWRlKClgKS5cbiAgICovXG4gIGRpc21pc3NSZWFzb246IHN0cmluZztcblxuICBnZXQgaXNTaG93bigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNTaG93bjtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY29uZmlnOiBNb2RhbE9wdGlvbnM7XG4gIHByb3RlY3RlZCBfaXNTaG93biA9IGZhbHNlO1xuXG4gIHByb3RlY3RlZCBpc0JvZHlPdmVyZmxvd2luZyA9IGZhbHNlO1xuICBwcm90ZWN0ZWQgb3JpZ2luYWxCb2R5UGFkZGluZyA9IDA7XG4gIHByb3RlY3RlZCBzY3JvbGxiYXJXaWR0aCA9IDA7XG5cbiAgcHJvdGVjdGVkIHRpbWVySGlkZU1vZGFsID0gMDtcbiAgcHJvdGVjdGVkIHRpbWVyUm1CYWNrRHJvcCA9IDA7XG5cbiAgLy8gcmVmZXJlbmNlIHRvIGJhY2tkcm9wIGNvbXBvbmVudFxuICBwcm90ZWN0ZWQgYmFja2Ryb3A6IENvbXBvbmVudFJlZjxNb2RhbEJhY2tkcm9wQ29tcG9uZW50PjtcbiAgcHJpdmF0ZSBfYmFja2Ryb3A6IENvbXBvbmVudExvYWRlcjxNb2RhbEJhY2tkcm9wQ29tcG9uZW50PjtcblxuICBwcml2YXRlIGlzTmVzdGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgICAgICAgIGNsZjogQ29tcG9uZW50TG9hZGVyRmFjdG9yeSkge1xuICAgIHRoaXMuX2JhY2tkcm9wID0gY2xmLmNyZWF0ZUxvYWRlcjxNb2RhbEJhY2tkcm9wQ29tcG9uZW50PihcbiAgICAgIF9lbGVtZW50LFxuICAgICAgX3ZpZXdDb250YWluZXJSZWYsXG4gICAgICBfcmVuZGVyZXJcbiAgICApO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5jb25maWcuaWdub3JlQmFja2Ryb3BDbGljayB8fFxuICAgICAgdGhpcy5jb25maWcuYmFja2Ryb3AgPT09ICdzdGF0aWMnIHx8XG4gICAgICBldmVudC50YXJnZXQgIT09IHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudFxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmRpc21pc3NSZWFzb24gPSBESVNNSVNTX1JFQVNPTlMuQkFDS1JET1A7XG4gICAgdGhpcy5oaWRlKGV2ZW50KTtcbiAgfVxuXG4gIC8vIHRvZG86IGNvbnNpZGVyIHByZXZlbnRpbmcgZGVmYXVsdCBhbmQgc3RvcHBpbmcgcHJvcGFnYXRpb25cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5lc2MnLCBbJyRldmVudCddKVxuICBvbkVzYyhldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5faXNTaG93bikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcgfHwgZXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb25maWcua2V5Ym9hcmQpIHtcbiAgICAgIHRoaXMuZGlzbWlzc1JlYXNvbiA9IERJU01JU1NfUkVBU09OUy5FU0M7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmNvbmZpZyA9IHZvaWQgMDtcbiAgICBpZiAodGhpcy5faXNTaG93bikge1xuICAgICAgdGhpcy5faXNTaG93biA9IGZhbHNlO1xuICAgICAgdGhpcy5oaWRlTW9kYWwoKTtcbiAgICAgIHRoaXMuX2JhY2tkcm9wLmRpc3Bvc2UoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9jb25maWcgPSB0aGlzLl9jb25maWcgfHwgdGhpcy5nZXRDb25maWcoKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9jb25maWcuc2hvdykge1xuICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgIH1cbiAgICB9LCAwKTtcbiAgfVxuXG4gIC8qIFB1YmxpYyBtZXRob2RzICovXG5cbiAgLyoqIEFsbG93cyB0byBtYW51YWxseSB0b2dnbGUgbW9kYWwgdmlzaWJpbGl0eSAqL1xuICB0b2dnbGUoKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX2lzU2hvd24gPyB0aGlzLmhpZGUoKSA6IHRoaXMuc2hvdygpO1xuICB9XG5cbiAgLyoqIEFsbG93cyB0byBtYW51YWxseSBvcGVuIG1vZGFsICovXG4gIHNob3coKTogdm9pZCB7XG4gICAgdGhpcy5kaXNtaXNzUmVhc29uID0gbnVsbDtcbiAgICB0aGlzLm9uU2hvdy5lbWl0KHRoaXMpO1xuICAgIGlmICh0aGlzLl9pc1Nob3duKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVySGlkZU1vZGFsKTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lclJtQmFja0Ryb3ApO1xuXG4gICAgdGhpcy5faXNTaG93biA9IHRydWU7XG5cbiAgICB0aGlzLmNoZWNrU2Nyb2xsYmFyKCk7XG4gICAgdGhpcy5zZXRTY3JvbGxiYXIoKTtcblxuICAgIGlmIChkb2N1bWVudCAmJiBkb2N1bWVudC5ib2R5KSB7XG4gICAgICBpZiAoZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRS5PUEVOKSkge1xuICAgICAgICB0aGlzLmlzTmVzdGVkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKGRvY3VtZW50LmJvZHksIENMQVNTX05BTUUuT1BFTik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zaG93QmFja2Ryb3AoKCkgPT4ge1xuICAgICAgdGhpcy5zaG93RWxlbWVudCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEFsbG93cyB0byBtYW51YWxseSBjbG9zZSBtb2RhbCAqL1xuICBoaWRlKGV2ZW50PzogRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgdGhpcy5vbkhpZGUuZW1pdCh0aGlzKTtcblxuICAgIC8vIHRvZG86IGFkZCBhbiBvcHRpb24gdG8gcHJldmVudCBoaWRpbmdcbiAgICBpZiAoIXRoaXMuX2lzU2hvd24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMudGltZXJIaWRlTW9kYWwpO1xuICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy50aW1lclJtQmFja0Ryb3ApO1xuXG4gICAgdGhpcy5faXNTaG93biA9IGZhbHNlO1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgQ0xBU1NfTkFNRS5JTik7XG4gICAgaWYgKCFpc0JzMygpKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIENMQVNTX05BTUUuU0hPVyk7XG4gICAgfVxuICAgIC8vIHRoaXMuX2FkZENsYXNzSW4gPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLl9jb25maWcuYW5pbWF0ZWQpIHtcbiAgICAgIHRoaXMudGltZXJIaWRlTW9kYWwgPSB3aW5kb3cuc2V0VGltZW91dChcbiAgICAgICAgKCkgPT4gdGhpcy5oaWRlTW9kYWwoKSxcbiAgICAgICAgVFJBTlNJVElPTl9EVVJBVElPTlxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oaWRlTW9kYWwoKTtcbiAgICB9XG4gIH1cblxuICAvKiogUHJpdmF0ZSBtZXRob2RzIEBpbnRlcm5hbCAqL1xuICBwcm90ZWN0ZWQgZ2V0Q29uZmlnKGNvbmZpZz86IE1vZGFsT3B0aW9ucyk6IE1vZGFsT3B0aW9ucyB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIG1vZGFsQ29uZmlnRGVmYXVsdHMsIGNvbmZpZyk7XG4gIH1cblxuICAvKipcbiAgICogIFNob3cgZGlhbG9nXG4gICAqICBAaW50ZXJuYWxcbiAgICovXG4gIHByb3RlY3RlZCBzaG93RWxlbWVudCgpOiB2b2lkIHtcbiAgICAvLyB0b2RvOiByZXBsYWNlIHRoaXMgd2l0aCBjb21wb25lbnQgbG9hZGVyIHVzYWdlXG4gICAgaWYgKFxuICAgICAgIXRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlIHx8XG4gICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZS5ub2RlVHlwZSAhPT0gTm9kZS5FTEVNRU5UX05PREVcbiAgICApIHtcbiAgICAgIC8vIGRvbid0IG1vdmUgbW9kYWxzIGRvbSBwb3NpdGlvblxuICAgICAgaWYgKGRvY3VtZW50ICYmIGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZShcbiAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICdhcmlhLWhpZGRlbicsXG4gICAgICAnZmFsc2UnXG4gICAgKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUoXG4gICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAnYXJpYS1tb2RhbCcsXG4gICAgICAndHJ1ZSdcbiAgICApO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgJ2Rpc3BsYXknLFxuICAgICAgJ2Jsb2NrJ1xuICAgICk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAnc2Nyb2xsVG9wJyxcbiAgICAgIDBcbiAgICApO1xuXG4gICAgaWYgKHRoaXMuX2NvbmZpZy5hbmltYXRlZCkge1xuICAgICAgVXRpbHMucmVmbG93KHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgLy8gdGhpcy5fYWRkQ2xhc3NJbiA9IHRydWU7XG4gICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCBDTEFTU19OQU1FLklOKTtcbiAgICBpZiAoIWlzQnMzKCkpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgQ0xBU1NfTkFNRS5TSE9XKTtcbiAgICB9XG5cbiAgICBjb25zdCB0cmFuc2l0aW9uQ29tcGxldGUgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fY29uZmlnLmZvY3VzKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgfVxuICAgICAgdGhpcy5vblNob3duLmVtaXQodGhpcyk7XG4gICAgfTtcblxuICAgIGlmICh0aGlzLl9jb25maWcuYW5pbWF0ZWQpIHtcbiAgICAgIHNldFRpbWVvdXQodHJhbnNpdGlvbkNvbXBsZXRlLCBUUkFOU0lUSU9OX0RVUkFUSU9OKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdHJhbnNpdGlvbkNvbXBsZXRlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcm90ZWN0ZWQgaGlkZU1vZGFsKCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZShcbiAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICdhcmlhLWhpZGRlbicsXG4gICAgICAndHJ1ZSdcbiAgICApO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgJ2Rpc3BsYXknLFxuICAgICAgJ25vbmUnXG4gICAgKTtcbiAgICB0aGlzLnNob3dCYWNrZHJvcCgoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuaXNOZXN0ZWQpIHtcbiAgICAgICAgaWYgKGRvY3VtZW50ICYmIGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyhkb2N1bWVudC5ib2R5LCBDTEFTU19OQU1FLk9QRU4pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzZXRTY3JvbGxiYXIoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucmVzZXRBZGp1c3RtZW50cygpO1xuICAgICAgdGhpcy5mb2N1c090aGVyTW9kYWwoKTtcbiAgICAgIHRoaXMub25IaWRkZW4uZW1pdCh0aGlzKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHRvZG86IG9yaWdpbmFsIHNob3cgd2FzIGNhbGxpbmcgYSBjYWxsYmFjayB3aGVuIGRvbmUsIGJ1dCB3ZSBjYW4gdXNlXG4gIC8vIHByb21pc2VcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcm90ZWN0ZWQgc2hvd0JhY2tkcm9wKGNhbGxiYWNrPzogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLl9pc1Nob3duICYmXG4gICAgICB0aGlzLmNvbmZpZy5iYWNrZHJvcCAmJlxuICAgICAgKCF0aGlzLmJhY2tkcm9wIHx8ICF0aGlzLmJhY2tkcm9wLmluc3RhbmNlLmlzU2hvd24pXG4gICAgKSB7XG4gICAgICB0aGlzLnJlbW92ZUJhY2tkcm9wKCk7XG4gICAgICB0aGlzLl9iYWNrZHJvcFxuICAgICAgICAuYXR0YWNoKE1vZGFsQmFja2Ryb3BDb21wb25lbnQpXG4gICAgICAgIC50bygnYm9keScpXG4gICAgICAgIC5zaG93KHtpc0FuaW1hdGVkOiB0aGlzLl9jb25maWcuYW5pbWF0ZWR9KTtcbiAgICAgIHRoaXMuYmFja2Ryb3AgPSB0aGlzLl9iYWNrZHJvcC5fY29tcG9uZW50UmVmO1xuXG4gICAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLl9jb25maWcuYW5pbWF0ZWQpIHtcbiAgICAgICAgY2FsbGJhY2soKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNldFRpbWVvdXQoY2FsbGJhY2ssIEJBQ0tEUk9QX1RSQU5TSVRJT05fRFVSQVRJT04pO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuX2lzU2hvd24gJiYgdGhpcy5iYWNrZHJvcCkge1xuICAgICAgdGhpcy5iYWNrZHJvcC5pbnN0YW5jZS5pc1Nob3duID0gZmFsc2U7XG5cbiAgICAgIGNvbnN0IGNhbGxiYWNrUmVtb3ZlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnJlbW92ZUJhY2tkcm9wKCk7XG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLmJhY2tkcm9wLmluc3RhbmNlLmlzQW5pbWF0ZWQpIHtcbiAgICAgICAgdGhpcy50aW1lclJtQmFja0Ryb3AgPSB3aW5kb3cuc2V0VGltZW91dChcbiAgICAgICAgICBjYWxsYmFja1JlbW92ZSxcbiAgICAgICAgICBCQUNLRFJPUF9UUkFOU0lUSU9OX0RVUkFUSU9OXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFja1JlbW92ZSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcm90ZWN0ZWQgcmVtb3ZlQmFja2Ryb3AoKTogdm9pZCB7XG4gICAgdGhpcy5fYmFja2Ryb3AuaGlkZSgpO1xuICB9XG5cbiAgLyoqIEV2ZW50cyB0cmlja3MgKi9cblxuICAvLyBubyBuZWVkIGZvciBpdFxuICAvLyBwcm90ZWN0ZWQgc2V0RXNjYXBlRXZlbnQoKTp2b2lkIHtcbiAgLy8gICBpZiAodGhpcy5faXNTaG93biAmJiB0aGlzLl9jb25maWcua2V5Ym9hcmQpIHtcbiAgLy8gICAgICQodGhpcy5fZWxlbWVudCkub24oRXZlbnQuS0VZRE9XTl9ESVNNSVNTLCAoZXZlbnQpID0+IHtcbiAgLy8gICAgICAgaWYgKGV2ZW50LndoaWNoID09PSAyNykge1xuICAvLyAgICAgICAgIHRoaXMuaGlkZSgpXG4gIC8vICAgICAgIH1cbiAgLy8gICAgIH0pXG4gIC8vXG4gIC8vICAgfSBlbHNlIGlmICghdGhpcy5faXNTaG93bikge1xuICAvLyAgICAgJCh0aGlzLl9lbGVtZW50KS5vZmYoRXZlbnQuS0VZRE9XTl9ESVNNSVNTKVxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIHByb3RlY3RlZCBzZXRSZXNpemVFdmVudCgpOnZvaWQge1xuICAvLyBjb25zb2xlLmxvZyh0aGlzLnJlbmRlcmVyLmxpc3Rlbkdsb2JhbCgnJywgRXZlbnQuUkVTSVpFKSk7XG4gIC8vIGlmICh0aGlzLl9pc1Nob3duKSB7XG4gIC8vICAgJCh3aW5kb3cpLm9uKEV2ZW50LlJFU0laRSwgJC5wcm94eSh0aGlzLl9oYW5kbGVVcGRhdGUsIHRoaXMpKVxuICAvLyB9IGVsc2Uge1xuICAvLyAgICQod2luZG93KS5vZmYoRXZlbnQuUkVTSVpFKVxuICAvLyB9XG4gIC8vIH1cblxuICBwcm90ZWN0ZWQgZm9jdXNPdGhlck1vZGFsKCkge1xuICAgIGlmICh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudCA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG90aGVyT3BlbmVkTW9kYWxzID0gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmluW2JzTW9kYWxdJyk7XG4gICAgaWYgKCFvdGhlck9wZW5lZE1vZGFscy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb3RoZXJPcGVuZWRNb2RhbHNbb3RoZXJPcGVuZWRNb2RhbHMubGVuZ3RoIC0gMV0uZm9jdXMoKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJvdGVjdGVkIHJlc2V0QWRqdXN0bWVudHMoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAncGFkZGluZ0xlZnQnLFxuICAgICAgJydcbiAgICApO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgJ3BhZGRpbmdSaWdodCcsXG4gICAgICAnJ1xuICAgICk7XG4gIH1cblxuICAvKiogU2Nyb2xsIGJhciB0cmlja3MgKi9cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcm90ZWN0ZWQgY2hlY2tTY3JvbGxiYXIoKTogdm9pZCB7XG4gICAgdGhpcy5pc0JvZHlPdmVyZmxvd2luZyA9IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggPCB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICB0aGlzLnNjcm9sbGJhcldpZHRoID0gdGhpcy5nZXRTY3JvbGxiYXJXaWR0aCgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldFNjcm9sbGJhcigpOiB2b2lkIHtcbiAgICBpZiAoIWRvY3VtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5vcmlnaW5hbEJvZHlQYWRkaW5nID0gcGFyc2VJbnQoXG4gICAgICB3aW5kb3dcbiAgICAgICAgLmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSlcbiAgICAgICAgLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctcmlnaHQnKSB8fCAwLFxuICAgICAgMTBcbiAgICApO1xuXG4gICAgaWYgKHRoaXMuaXNCb2R5T3ZlcmZsb3dpbmcpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID0gYCR7dGhpcy5vcmlnaW5hbEJvZHlQYWRkaW5nICtcbiAgICAgIHRoaXMuc2Nyb2xsYmFyV2lkdGh9cHhgO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCByZXNldFNjcm9sbGJhcigpOiB2b2lkIHtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9IGAke3RoaXMub3JpZ2luYWxCb2R5UGFkZGluZ31weGA7XG4gIH1cblxuICAvLyB0aHggZC53YWxzaFxuICBwcm90ZWN0ZWQgZ2V0U2Nyb2xsYmFyV2lkdGgoKTogbnVtYmVyIHtcbiAgICBjb25zdCBzY3JvbGxEaXYgPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhzY3JvbGxEaXYsIENMQVNTX05BTUUuU0NST0xMQkFSX01FQVNVUkVSKTtcbiAgICB0aGlzLl9yZW5kZXJlci5hcHBlbmRDaGlsZChkb2N1bWVudC5ib2R5LCBzY3JvbGxEaXYpO1xuICAgIGNvbnN0IHNjcm9sbGJhcldpZHRoID0gc2Nyb2xsRGl2Lm9mZnNldFdpZHRoIC0gc2Nyb2xsRGl2LmNsaWVudFdpZHRoO1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNoaWxkKGRvY3VtZW50LmJvZHksIHNjcm9sbERpdik7XG5cbiAgICByZXR1cm4gc2Nyb2xsYmFyV2lkdGg7XG4gIH1cbn1cbiJdfQ==