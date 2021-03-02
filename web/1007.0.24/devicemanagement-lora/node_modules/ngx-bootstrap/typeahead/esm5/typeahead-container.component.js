/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:max-file-line-count max-line-length
import { Component, ElementRef, HostListener, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { isBs3, Utils } from 'ngx-bootstrap/utils';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { latinize } from './typeahead-utils';
import { typeaheadAnimation } from './typeahead-animations';
import { take } from 'rxjs/operators';
var TypeaheadContainerComponent = /** @class */ (function () {
    function TypeaheadContainerComponent(positionService, renderer, element) {
        this.positionService = positionService;
        this.renderer = renderer;
        this.element = element;
        this.isFocused = false;
        this.visibility = 'hidden';
        this.height = 0;
        this._matches = [];
        this.isScrolledIntoView = (/**
         * @param {?} elem
         * @return {?}
         */
        function (elem) {
            /** @type {?} */
            var containerViewTop = this.ulElement.nativeElement.scrollTop;
            /** @type {?} */
            var containerViewBottom = containerViewTop + Number(this.ulElement.nativeElement.offsetHeight);
            /** @type {?} */
            var elemTop = elem.offsetTop;
            /** @type {?} */
            var elemBottom = elemTop + elem.offsetHeight;
            return ((elemBottom <= containerViewBottom) && (elemTop >= containerViewTop));
        });
    }
    Object.defineProperty(TypeaheadContainerComponent.prototype, "isBs4", {
        get: /**
         * @return {?}
         */
        function () {
            return !isBs3();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeaheadContainerComponent.prototype, "active", {
        get: /**
         * @return {?}
         */
        function () {
            return this._active;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeaheadContainerComponent.prototype, "matches", {
        get: /**
         * @return {?}
         */
        function () {
            return this._matches;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            this.positionService.setOptions({
                modifiers: { flip: { enabled: this.adaptivePosition } },
                allowedPositions: ['top', 'bottom']
            });
            this.positionService.event$
                .pipe(take(1))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.positionService.disable();
                _this.visibility = _this.typeaheadScrollable ? 'hidden' : 'visible';
                if (_this.isAnimated) {
                    _this.animationState = _this.isTopPosition ? 'animated-up' : 'animated-down';
                    return;
                }
                _this.animationState = 'unanimated';
            }));
            this._matches = value;
            this.needScrollbar = this.typeaheadScrollable && this.typeaheadOptionsInScrollableView < this.matches.length;
            if (this.typeaheadScrollable) {
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.setScrollableMode();
                }));
            }
            if (this.typeaheadIsFirstItemActive && this._matches.length > 0) {
                this._active = this._matches[0];
                if (this._active.isHeader()) {
                    this.nextActiveMatch();
                }
            }
            if (this._active && !this.typeaheadIsFirstItemActive) {
                /** @type {?} */
                var concurrency = this._matches.find((/**
                 * @param {?} match
                 * @return {?}
                 */
                function (match) { return match.value === _this._active.value; }));
                if (concurrency) {
                    this.selectActive(concurrency);
                    return;
                }
                this._active = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeaheadContainerComponent.prototype, "isTopPosition", {
        get: /**
         * @return {?}
         */
        function () {
            return this.element.nativeElement.classList.contains('top');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeaheadContainerComponent.prototype, "optionsListTemplate", {
        // tslint:disable-next-line:no-any
        get: 
        // tslint:disable-next-line:no-any
        /**
         * @return {?}
         */
        function () {
            return this.parent ? this.parent.optionsListTemplate : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeaheadContainerComponent.prototype, "isAnimated", {
        get: /**
         * @return {?}
         */
        function () {
            return this.parent ? this.parent.isAnimated : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeaheadContainerComponent.prototype, "adaptivePosition", {
        get: /**
         * @return {?}
         */
        function () {
            return this.parent ? this.parent.adaptivePosition : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeaheadContainerComponent.prototype, "typeaheadScrollable", {
        get: /**
         * @return {?}
         */
        function () {
            return this.parent ? this.parent.typeaheadScrollable : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeaheadContainerComponent.prototype, "typeaheadOptionsInScrollableView", {
        get: /**
         * @return {?}
         */
        function () {
            return this.parent ? this.parent.typeaheadOptionsInScrollableView : 5;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeaheadContainerComponent.prototype, "typeaheadIsFirstItemActive", {
        get: /**
         * @return {?}
         */
        function () {
            return this.parent ? this.parent.typeaheadIsFirstItemActive : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeaheadContainerComponent.prototype, "itemTemplate", {
        // tslint:disable-next-line:no-any
        get: 
        // tslint:disable-next-line:no-any
        /**
         * @return {?}
         */
        function () {
            return this.parent ? this.parent.typeaheadItemTemplate : undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?=} isActiveItemChanged
     * @return {?}
     */
    TypeaheadContainerComponent.prototype.selectActiveMatch = /**
     * @param {?=} isActiveItemChanged
     * @return {?}
     */
    function (isActiveItemChanged) {
        if (this._active && this.parent.typeaheadSelectFirstItem) {
            this.selectMatch(this._active);
        }
        if (!this.parent.typeaheadSelectFirstItem && isActiveItemChanged) {
            this.selectMatch(this._active);
        }
    };
    /**
     * @return {?}
     */
    TypeaheadContainerComponent.prototype.positionServiceEnable = /**
     * @return {?}
     */
    function () {
        this.positionService.enable();
    };
    /**
     * @return {?}
     */
    TypeaheadContainerComponent.prototype.prevActiveMatch = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var index = this.matches.indexOf(this._active);
        this._active = this.matches[index - 1 < 0 ? this.matches.length - 1 : index - 1];
        if (this._active.isHeader()) {
            this.prevActiveMatch();
        }
        if (this.typeaheadScrollable) {
            this.scrollPrevious(index);
        }
    };
    /**
     * @return {?}
     */
    TypeaheadContainerComponent.prototype.nextActiveMatch = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var index = this.matches.indexOf(this._active);
        this._active = this.matches[index + 1 > this.matches.length - 1 ? 0 : index + 1];
        if (this._active.isHeader()) {
            this.nextActiveMatch();
        }
        if (this.typeaheadScrollable) {
            this.scrollNext(index);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    TypeaheadContainerComponent.prototype.selectActive = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.isFocused = true;
        this._active = value;
    };
    /**
     * @param {?} match
     * @param {?} query
     * @return {?}
     */
    TypeaheadContainerComponent.prototype.highlight = /**
     * @param {?} match
     * @param {?} query
     * @return {?}
     */
    function (match, query) {
        /** @type {?} */
        var itemStr = match.value;
        /** @type {?} */
        var itemStrHelper = (this.parent && this.parent.typeaheadLatinize
            ? latinize(itemStr)
            : itemStr).toLowerCase();
        /** @type {?} */
        var startIdx;
        /** @type {?} */
        var tokenLen;
        // Replaces the capture string with the same string inside of a "strong" tag
        if (typeof query === 'object') {
            /** @type {?} */
            var queryLen = query.length;
            for (var i = 0; i < queryLen; i += 1) {
                // query[i] is already latinized and lower case
                startIdx = itemStrHelper.indexOf(query[i]);
                tokenLen = query[i].length;
                if (startIdx >= 0 && tokenLen > 0) {
                    itemStr =
                        itemStr.substring(0, startIdx) + "<strong>" + itemStr.substring(startIdx, startIdx + tokenLen) + "</strong>" +
                            ("" + itemStr.substring(startIdx + tokenLen));
                    itemStrHelper =
                        itemStrHelper.substring(0, startIdx) + "        " + ' '.repeat(tokenLen) + "         " +
                            ("" + itemStrHelper.substring(startIdx + tokenLen));
                }
            }
        }
        else if (query) {
            // query is already latinized and lower case
            startIdx = itemStrHelper.indexOf(query);
            tokenLen = query.length;
            if (startIdx >= 0 && tokenLen > 0) {
                itemStr =
                    itemStr.substring(0, startIdx) + "<strong>" + itemStr.substring(startIdx, startIdx + tokenLen) + "</strong>" +
                        ("" + itemStr.substring(startIdx + tokenLen));
            }
        }
        return itemStr;
    };
    /**
     * @return {?}
     */
    TypeaheadContainerComponent.prototype.focusLost = /**
     * @return {?}
     */
    function () {
        this.isFocused = false;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    TypeaheadContainerComponent.prototype.isActive = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this._active === value;
    };
    /**
     * @param {?} value
     * @param {?=} e
     * @return {?}
     */
    TypeaheadContainerComponent.prototype.selectMatch = /**
     * @param {?} value
     * @param {?=} e
     * @return {?}
     */
    function (value, e) {
        var _this = this;
        if (e === void 0) { e = void 0; }
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.parent.changeModel(value);
        setTimeout((/**
         * @return {?}
         */
        function () { return _this.parent.typeaheadOnSelect.emit(value); }), 0);
        return false;
    };
    /**
     * @return {?}
     */
    TypeaheadContainerComponent.prototype.setScrollableMode = /**
     * @return {?}
     */
    function () {
        if (!this.ulElement) {
            this.ulElement = this.element;
        }
        if (this.liElements.first) {
            /** @type {?} */
            var ulStyles = Utils.getStyles(this.ulElement.nativeElement);
            /** @type {?} */
            var liStyles = Utils.getStyles(this.liElements.first.nativeElement);
            /** @type {?} */
            var ulPaddingBottom = parseFloat((ulStyles['padding-bottom'] ? ulStyles['padding-bottom'] : '')
                .replace('px', ''));
            /** @type {?} */
            var ulPaddingTop = parseFloat((ulStyles['padding-top'] ? ulStyles['padding-top'] : '0')
                .replace('px', ''));
            /** @type {?} */
            var optionHeight = parseFloat((liStyles.height ? liStyles.height : '0')
                .replace('px', ''));
            /** @type {?} */
            var height = this.typeaheadOptionsInScrollableView * optionHeight;
            this.guiHeight = height + ulPaddingTop + ulPaddingBottom + "px";
        }
        this.renderer.setStyle(this.element.nativeElement, 'visibility', 'visible');
    };
    /**
     * @param {?} index
     * @return {?}
     */
    TypeaheadContainerComponent.prototype.scrollPrevious = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (index === 0) {
            this.scrollToBottom();
            return;
        }
        if (this.liElements) {
            /** @type {?} */
            var liElement = this.liElements.toArray()[index - 1];
            if (liElement && !this.isScrolledIntoView(liElement.nativeElement)) {
                this.ulElement.nativeElement.scrollTop = liElement.nativeElement.offsetTop;
            }
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    TypeaheadContainerComponent.prototype.scrollNext = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (index + 1 > this.matches.length - 1) {
            this.scrollToTop();
            return;
        }
        if (this.liElements) {
            /** @type {?} */
            var liElement = this.liElements.toArray()[index + 1];
            if (liElement && !this.isScrolledIntoView(liElement.nativeElement)) {
                this.ulElement.nativeElement.scrollTop =
                    liElement.nativeElement.offsetTop -
                        Number(this.ulElement.nativeElement.offsetHeight) +
                        Number(liElement.nativeElement.offsetHeight);
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    TypeaheadContainerComponent.prototype.scrollToBottom = /**
     * @private
     * @return {?}
     */
    function () {
        this.ulElement.nativeElement.scrollTop = this.ulElement.nativeElement.scrollHeight;
    };
    /**
     * @private
     * @return {?}
     */
    TypeaheadContainerComponent.prototype.scrollToTop = /**
     * @private
     * @return {?}
     */
    function () {
        this.ulElement.nativeElement.scrollTop = 0;
    };
    TypeaheadContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'typeahead-container',
                    template: "<!-- inject options list template -->\n<ng-template [ngTemplateOutlet]=\"optionsListTemplate || (isBs4 ? bs4Template : bs3Template)\"\n             [ngTemplateOutletContext]=\"{matches:matches, itemTemplate:itemTemplate, query:query}\"></ng-template>\n\n<!-- default options item template -->\n<ng-template #bsItemTemplate let-match=\"match\" let-query=\"query\"><span [innerHtml]=\"highlight(match, query)\"></span>\n</ng-template>\n\n<!-- Bootstrap 3 options list template -->\n<ng-template #bs3Template>\n  <ul class=\"dropdown-menu\"\n      #ulElement\n      [style.overflow-y]=\"needScrollbar ? 'scroll': 'auto'\"\n      [style.height]=\"needScrollbar ? guiHeight: 'auto'\">\n    <ng-template ngFor let-match let-i=\"index\" [ngForOf]=\"matches\">\n      <li #liElements *ngIf=\"match.isHeader()\" class=\"dropdown-header\">{{ match }}</li>\n      <li #liElements\n          *ngIf=\"!match.isHeader()\"\n          [@typeaheadAnimation]=\"animationState\"\n          (@typeaheadAnimation.done)=\"positionServiceEnable()\"\n          [class.active]=\"isActive(match)\"\n          (mouseenter)=\"selectActive(match)\">\n\n        <a href=\"#\" (click)=\"selectMatch(match, $event)\" tabindex=\"-1\">\n          <ng-template [ngTemplateOutlet]=\"itemTemplate || bsItemTemplate\"\n                       [ngTemplateOutletContext]=\"{item:match.item, index:i, match:match, query:query}\"></ng-template>\n        </a>\n      </li>\n    </ng-template>\n  </ul>\n</ng-template>\n\n<!-- Bootstrap 4 options list template -->\n<ng-template #bs4Template>\n  <ng-template ngFor let-match let-i=\"index\" [ngForOf]=\"matches\">\n    <h6 *ngIf=\"match.isHeader()\" class=\"dropdown-header\">{{ match }}</h6>\n    <ng-template [ngIf]=\"!match.isHeader()\">\n      <button #liElements\n              [@typeaheadAnimation]=\"animationState\"\n              (@typeaheadAnimation.done)=\"positionServiceEnable()\"\n              class=\"dropdown-item\"\n              (click)=\"selectMatch(match, $event)\"\n              (mouseenter)=\"selectActive(match)\"\n              [class.active]=\"isActive(match)\">\n        <ng-template [ngTemplateOutlet]=\"itemTemplate || bsItemTemplate\"\n                     [ngTemplateOutletContext]=\"{item:match.item, index:i, match:match, query:query}\"></ng-template>\n      </button>\n    </ng-template>\n  </ng-template>\n</ng-template>\n",
                    host: {
                        class: 'dropdown open bottom',
                        '[class.dropdown-menu]': 'isBs4',
                        '[style.overflow-y]': "isBs4 && needScrollbar ? 'scroll': 'visible'",
                        '[style.height]': "isBs4 && needScrollbar ? guiHeight: 'auto'",
                        '[style.visibility]': "visibility",
                        '[class.dropup]': 'dropup',
                        style: 'position: absolute;display: block;'
                    },
                    animations: [typeaheadAnimation],
                    styles: ["\n    :host.dropdown {\n      z-index: 1000;\n    }\n  "]
                }] }
    ];
    /** @nocollapse */
    TypeaheadContainerComponent.ctorParameters = function () { return [
        { type: PositioningService },
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    TypeaheadContainerComponent.propDecorators = {
        ulElement: [{ type: ViewChild, args: ['ulElement', { static: false },] }],
        liElements: [{ type: ViewChildren, args: ['liElements',] }],
        focusLost: [{ type: HostListener, args: ['mouseleave',] }, { type: HostListener, args: ['blur',] }]
    };
    return TypeaheadContainerComponent;
}());
export { TypeaheadContainerComponent };
if (false) {
    /** @type {?} */
    TypeaheadContainerComponent.prototype.parent;
    /** @type {?} */
    TypeaheadContainerComponent.prototype.query;
    /** @type {?} */
    TypeaheadContainerComponent.prototype.isFocused;
    /** @type {?} */
    TypeaheadContainerComponent.prototype.top;
    /** @type {?} */
    TypeaheadContainerComponent.prototype.left;
    /** @type {?} */
    TypeaheadContainerComponent.prototype.display;
    /** @type {?} */
    TypeaheadContainerComponent.prototype.placement;
    /** @type {?} */
    TypeaheadContainerComponent.prototype.dropup;
    /** @type {?} */
    TypeaheadContainerComponent.prototype.guiHeight;
    /** @type {?} */
    TypeaheadContainerComponent.prototype.needScrollbar;
    /** @type {?} */
    TypeaheadContainerComponent.prototype.animationState;
    /** @type {?} */
    TypeaheadContainerComponent.prototype.visibility;
    /** @type {?} */
    TypeaheadContainerComponent.prototype.height;
    /**
     * @type {?}
     * @protected
     */
    TypeaheadContainerComponent.prototype._active;
    /**
     * @type {?}
     * @protected
     */
    TypeaheadContainerComponent.prototype._matches;
    /**
     * @type {?}
     * @private
     */
    TypeaheadContainerComponent.prototype.ulElement;
    /**
     * @type {?}
     * @private
     */
    TypeaheadContainerComponent.prototype.liElements;
    /**
     * @type {?}
     * @private
     */
    TypeaheadContainerComponent.prototype.isScrolledIntoView;
    /**
     * @type {?}
     * @private
     */
    TypeaheadContainerComponent.prototype.positionService;
    /**
     * @type {?}
     * @private
     */
    TypeaheadContainerComponent.prototype.renderer;
    /** @type {?} */
    TypeaheadContainerComponent.prototype.element;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYm9vdHN0cmFwL3R5cGVhaGVhZC8iLCJzb3VyY2VzIjpbInR5cGVhaGVhZC1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFNBQVMsRUFDVCxTQUFTLEVBRVQsU0FBUyxFQUNULFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRS9ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUc3QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHdEM7SUFpREUscUNBQ1UsZUFBbUMsRUFDbkMsUUFBbUIsRUFDcEIsT0FBbUI7UUFGbEIsb0JBQWUsR0FBZixlQUFlLENBQW9CO1FBQ25DLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDcEIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQTVCNUIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQVNsQixlQUFVLEdBQUcsUUFBUSxDQUFDO1FBQ3RCLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFPRCxhQUFRLEdBQXFCLEVBQUUsQ0FBQztRQTZRbEMsdUJBQWtCOzs7O1FBQUcsVUFBVSxJQUFpQjs7Z0JBQ2hELGdCQUFnQixHQUFXLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLFNBQVM7O2dCQUNqRSxtQkFBbUIsR0FBRyxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsWUFB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QzNDLCtDQUEyQjs7SUFDM0IsOENBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6bWF4LWZpbGUtbGluZS1jb3VudCBtYXgtbGluZS1sZW5ndGhcbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBRdWVyeUxpc3QsXG4gIFJlbmRlcmVyMixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NoaWxkcmVuXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBpc0JzMywgVXRpbHMgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3V0aWxzJztcbmltcG9ydCB7IFBvc2l0aW9uaW5nU2VydmljZSB9IGZyb20gJ25neC1ib290c3RyYXAvcG9zaXRpb25pbmcnO1xuXG5pbXBvcnQgeyBsYXRpbml6ZSB9IGZyb20gJy4vdHlwZWFoZWFkLXV0aWxzJztcbmltcG9ydCB7IFR5cGVhaGVhZE1hdGNoIH0gZnJvbSAnLi90eXBlYWhlYWQtbWF0Y2guY2xhc3MnO1xuaW1wb3J0IHsgVHlwZWFoZWFkRGlyZWN0aXZlIH0gZnJvbSAnLi90eXBlYWhlYWQuZGlyZWN0aXZlJztcbmltcG9ydCB7IHR5cGVhaGVhZEFuaW1hdGlvbiB9IGZyb20gJy4vdHlwZWFoZWFkLWFuaW1hdGlvbnMnO1xuXG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3R5cGVhaGVhZC1jb250YWluZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vdHlwZWFoZWFkLWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCcsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2Ryb3Bkb3duIG9wZW4gYm90dG9tJyxcbiAgICAnW2NsYXNzLmRyb3Bkb3duLW1lbnVdJzogJ2lzQnM0JyxcbiAgICAnW3N0eWxlLm92ZXJmbG93LXldJyA6IGBpc0JzNCAmJiBuZWVkU2Nyb2xsYmFyID8gJ3Njcm9sbCc6ICd2aXNpYmxlJ2AsXG4gICAgJ1tzdHlsZS5oZWlnaHRdJzogYGlzQnM0ICYmIG5lZWRTY3JvbGxiYXIgPyBndWlIZWlnaHQ6ICdhdXRvJ2AsXG4gICAgJ1tzdHlsZS52aXNpYmlsaXR5XSc6IGB2aXNpYmlsaXR5YCxcbiAgICAnW2NsYXNzLmRyb3B1cF0nOiAnZHJvcHVwJyxcbiAgICBzdHlsZTogJ3Bvc2l0aW9uOiBhYnNvbHV0ZTtkaXNwbGF5OiBibG9jazsnXG4gIH0sXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICA6aG9zdC5kcm9wZG93biB7XG4gICAgICB6LWluZGV4OiAxMDAwO1xuICAgIH1cbiAgYFxuICBdLFxuICBhbmltYXRpb25zOiBbdHlwZWFoZWFkQW5pbWF0aW9uXVxufSlcbmV4cG9ydCBjbGFzcyBUeXBlYWhlYWRDb250YWluZXJDb21wb25lbnQge1xuICBwYXJlbnQ6IFR5cGVhaGVhZERpcmVjdGl2ZTtcbiAgcXVlcnk6IHN0cmluZ1tdIHwgc3RyaW5nO1xuICBpc0ZvY3VzZWQgPSBmYWxzZTtcbiAgdG9wOiBzdHJpbmc7XG4gIGxlZnQ6IHN0cmluZztcbiAgZGlzcGxheTogc3RyaW5nO1xuICBwbGFjZW1lbnQ6IHN0cmluZztcbiAgZHJvcHVwOiBib29sZWFuO1xuICBndWlIZWlnaHQ6IHN0cmluZztcbiAgbmVlZFNjcm9sbGJhcjogYm9vbGVhbjtcbiAgYW5pbWF0aW9uU3RhdGU6IHN0cmluZztcbiAgdmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICBoZWlnaHQgPSAwO1xuXG4gIGdldCBpc0JzNCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIWlzQnMzKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2FjdGl2ZTogVHlwZWFoZWFkTWF0Y2g7XG4gIHByb3RlY3RlZCBfbWF0Y2hlczogVHlwZWFoZWFkTWF0Y2hbXSA9IFtdO1xuXG4gIEBWaWV3Q2hpbGQoJ3VsRWxlbWVudCcsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwcml2YXRlIHVsRWxlbWVudDogRWxlbWVudFJlZjtcblxuICBAVmlld0NoaWxkcmVuKCdsaUVsZW1lbnRzJylcbiAgcHJpdmF0ZSBsaUVsZW1lbnRzOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwb3NpdGlvblNlcnZpY2U6IFBvc2l0aW9uaW5nU2VydmljZSxcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWZcbiAgKSB7IH1cblxuICBnZXQgYWN0aXZlKCk6IFR5cGVhaGVhZE1hdGNoIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlO1xuICB9XG5cbiAgZ2V0IG1hdGNoZXMoKTogVHlwZWFoZWFkTWF0Y2hbXSB7XG4gICAgcmV0dXJuIHRoaXMuX21hdGNoZXM7XG4gIH1cblxuICBzZXQgbWF0Y2hlcyh2YWx1ZTogVHlwZWFoZWFkTWF0Y2hbXSkge1xuICAgIHRoaXMucG9zaXRpb25TZXJ2aWNlLnNldE9wdGlvbnMoe1xuICAgICAgbW9kaWZpZXJzOiB7IGZsaXA6IHsgZW5hYmxlZDogdGhpcy5hZGFwdGl2ZVBvc2l0aW9uIH0gfSxcbiAgICAgIGFsbG93ZWRQb3NpdGlvbnM6IFsndG9wJywgJ2JvdHRvbSddXG4gICAgfSk7XG5cbiAgICB0aGlzLnBvc2l0aW9uU2VydmljZS5ldmVudCRcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlKDEpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5wb3NpdGlvblNlcnZpY2UuZGlzYWJsZSgpO1xuICAgICAgICB0aGlzLnZpc2liaWxpdHkgPSB0aGlzLnR5cGVhaGVhZFNjcm9sbGFibGUgPyAnaGlkZGVuJyA6ICd2aXNpYmxlJztcblxuICAgICAgICBpZiAodGhpcy5pc0FuaW1hdGVkKSB7XG4gICAgICAgICAgdGhpcy5hbmltYXRpb25TdGF0ZSA9IHRoaXMuaXNUb3BQb3NpdGlvbiA/ICdhbmltYXRlZC11cCcgOiAnYW5pbWF0ZWQtZG93bic7XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFuaW1hdGlvblN0YXRlID0gJ3VuYW5pbWF0ZWQnO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLl9tYXRjaGVzID0gdmFsdWU7XG5cbiAgICB0aGlzLm5lZWRTY3JvbGxiYXIgPSB0aGlzLnR5cGVhaGVhZFNjcm9sbGFibGUgJiYgdGhpcy50eXBlYWhlYWRPcHRpb25zSW5TY3JvbGxhYmxlVmlldyA8IHRoaXMubWF0Y2hlcy5sZW5ndGg7XG5cbiAgICBpZiAodGhpcy50eXBlYWhlYWRTY3JvbGxhYmxlKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTY3JvbGxhYmxlTW9kZSgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudHlwZWFoZWFkSXNGaXJzdEl0ZW1BY3RpdmUgJiYgdGhpcy5fbWF0Y2hlcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLl9hY3RpdmUgPSB0aGlzLl9tYXRjaGVzWzBdO1xuXG4gICAgICBpZiAodGhpcy5fYWN0aXZlLmlzSGVhZGVyKCkpIHtcbiAgICAgICAgdGhpcy5uZXh0QWN0aXZlTWF0Y2goKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5fYWN0aXZlICYmICF0aGlzLnR5cGVhaGVhZElzRmlyc3RJdGVtQWN0aXZlKSB7XG4gICAgICBjb25zdCBjb25jdXJyZW5jeSA9IHRoaXMuX21hdGNoZXMuZmluZChtYXRjaCA9PiBtYXRjaC52YWx1ZSA9PT0gdGhpcy5fYWN0aXZlLnZhbHVlKTtcblxuICAgICAgaWYgKGNvbmN1cnJlbmN5KSB7XG4gICAgICAgIHRoaXMuc2VsZWN0QWN0aXZlKGNvbmN1cnJlbmN5KTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2FjdGl2ZSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGlzVG9wUG9zaXRpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygndG9wJyk7XG4gIH1cblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gIGdldCBvcHRpb25zTGlzdFRlbXBsYXRlKCk6IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50Lm9wdGlvbnNMaXN0VGVtcGxhdGUgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBnZXQgaXNBbmltYXRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5pc0FuaW1hdGVkIDogZmFsc2U7XG4gIH1cblxuICBnZXQgYWRhcHRpdmVQb3NpdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5hZGFwdGl2ZVBvc2l0aW9uIDogZmFsc2U7XG4gIH1cblxuICBnZXQgdHlwZWFoZWFkU2Nyb2xsYWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC50eXBlYWhlYWRTY3JvbGxhYmxlIDogZmFsc2U7XG4gIH1cblxuICBnZXQgdHlwZWFoZWFkT3B0aW9uc0luU2Nyb2xsYWJsZVZpZXcoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC50eXBlYWhlYWRPcHRpb25zSW5TY3JvbGxhYmxlVmlldyA6IDU7XG4gIH1cblxuICBnZXQgdHlwZWFoZWFkSXNGaXJzdEl0ZW1BY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQudHlwZWFoZWFkSXNGaXJzdEl0ZW1BY3RpdmUgOiB0cnVlO1xuICB9XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gIGdldCBpdGVtVGVtcGxhdGUoKTogVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQudHlwZWFoZWFkSXRlbVRlbXBsYXRlIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgc2VsZWN0QWN0aXZlTWF0Y2goaXNBY3RpdmVJdGVtQ2hhbmdlZD86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fYWN0aXZlICYmIHRoaXMucGFyZW50LnR5cGVhaGVhZFNlbGVjdEZpcnN0SXRlbSkge1xuICAgICAgdGhpcy5zZWxlY3RNYXRjaCh0aGlzLl9hY3RpdmUpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5wYXJlbnQudHlwZWFoZWFkU2VsZWN0Rmlyc3RJdGVtICYmIGlzQWN0aXZlSXRlbUNoYW5nZWQpIHtcbiAgICAgIHRoaXMuc2VsZWN0TWF0Y2godGhpcy5fYWN0aXZlKTtcbiAgICB9XG4gIH1cblxuICBwb3NpdGlvblNlcnZpY2VFbmFibGUoKTogdm9pZCB7XG4gICAgdGhpcy5wb3NpdGlvblNlcnZpY2UuZW5hYmxlKCk7XG4gIH1cblxuICBwcmV2QWN0aXZlTWF0Y2goKTogdm9pZCB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLm1hdGNoZXMuaW5kZXhPZih0aGlzLl9hY3RpdmUpO1xuXG4gICAgdGhpcy5fYWN0aXZlID0gdGhpcy5tYXRjaGVzW1xuICAgICAgaW5kZXggLSAxIDwgMCA/IHRoaXMubWF0Y2hlcy5sZW5ndGggLSAxIDogaW5kZXggLSAxXG4gICAgXTtcblxuICAgIGlmICh0aGlzLl9hY3RpdmUuaXNIZWFkZXIoKSkge1xuICAgICAgdGhpcy5wcmV2QWN0aXZlTWF0Y2goKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy50eXBlYWhlYWRTY3JvbGxhYmxlKSB7XG4gICAgICB0aGlzLnNjcm9sbFByZXZpb3VzKGluZGV4KTtcbiAgICB9XG4gIH1cblxuICBuZXh0QWN0aXZlTWF0Y2goKTogdm9pZCB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLm1hdGNoZXMuaW5kZXhPZih0aGlzLl9hY3RpdmUpO1xuXG4gICAgdGhpcy5fYWN0aXZlID0gdGhpcy5tYXRjaGVzW1xuICAgICAgaW5kZXggKyAxID4gdGhpcy5tYXRjaGVzLmxlbmd0aCAtIDEgPyAwIDogaW5kZXggKyAxXG4gICAgXTtcblxuICAgIGlmICh0aGlzLl9hY3RpdmUuaXNIZWFkZXIoKSkge1xuICAgICAgdGhpcy5uZXh0QWN0aXZlTWF0Y2goKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy50eXBlYWhlYWRTY3JvbGxhYmxlKSB7XG4gICAgICB0aGlzLnNjcm9sbE5leHQoaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdEFjdGl2ZSh2YWx1ZTogVHlwZWFoZWFkTWF0Y2gpOiB2b2lkIHtcbiAgICB0aGlzLmlzRm9jdXNlZCA9IHRydWU7XG4gICAgdGhpcy5fYWN0aXZlID0gdmFsdWU7XG4gIH1cblxuICBoaWdobGlnaHQobWF0Y2g6IFR5cGVhaGVhZE1hdGNoLCBxdWVyeTogc3RyaW5nW10gfCBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBpdGVtU3RyOiBzdHJpbmcgPSBtYXRjaC52YWx1ZTtcbiAgICBsZXQgaXRlbVN0ckhlbHBlcjogc3RyaW5nID0gKHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LnR5cGVhaGVhZExhdGluaXplXG4gICAgICA/IGxhdGluaXplKGl0ZW1TdHIpXG4gICAgICA6IGl0ZW1TdHIpLnRvTG93ZXJDYXNlKCk7XG4gICAgbGV0IHN0YXJ0SWR4OiBudW1iZXI7XG4gICAgbGV0IHRva2VuTGVuOiBudW1iZXI7XG4gICAgLy8gUmVwbGFjZXMgdGhlIGNhcHR1cmUgc3RyaW5nIHdpdGggdGhlIHNhbWUgc3RyaW5nIGluc2lkZSBvZiBhIFwic3Ryb25nXCIgdGFnXG4gICAgaWYgKHR5cGVvZiBxdWVyeSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGNvbnN0IHF1ZXJ5TGVuOiBudW1iZXIgPSBxdWVyeS5sZW5ndGg7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1ZXJ5TGVuOyBpICs9IDEpIHtcbiAgICAgICAgLy8gcXVlcnlbaV0gaXMgYWxyZWFkeSBsYXRpbml6ZWQgYW5kIGxvd2VyIGNhc2VcbiAgICAgICAgc3RhcnRJZHggPSBpdGVtU3RySGVscGVyLmluZGV4T2YocXVlcnlbaV0pO1xuICAgICAgICB0b2tlbkxlbiA9IHF1ZXJ5W2ldLmxlbmd0aDtcbiAgICAgICAgaWYgKHN0YXJ0SWR4ID49IDAgJiYgdG9rZW5MZW4gPiAwKSB7XG4gICAgICAgICAgaXRlbVN0ciA9XG4gICAgICAgICAgICBgJHtpdGVtU3RyLnN1YnN0cmluZygwLCBzdGFydElkeCl9PHN0cm9uZz4ke2l0ZW1TdHIuc3Vic3RyaW5nKHN0YXJ0SWR4LCBzdGFydElkeCArIHRva2VuTGVuKX08L3N0cm9uZz5gICtcbiAgICAgICAgICAgIGAke2l0ZW1TdHIuc3Vic3RyaW5nKHN0YXJ0SWR4ICsgdG9rZW5MZW4pfWA7XG4gICAgICAgICAgaXRlbVN0ckhlbHBlciA9XG4gICAgICAgICAgICBgJHtpdGVtU3RySGVscGVyLnN1YnN0cmluZygwLCBzdGFydElkeCl9ICAgICAgICAkeycgJy5yZXBlYXQodG9rZW5MZW4pfSAgICAgICAgIGAgK1xuICAgICAgICAgICAgYCR7aXRlbVN0ckhlbHBlci5zdWJzdHJpbmcoc3RhcnRJZHggKyB0b2tlbkxlbil9YDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocXVlcnkpIHtcbiAgICAgIC8vIHF1ZXJ5IGlzIGFscmVhZHkgbGF0aW5pemVkIGFuZCBsb3dlciBjYXNlXG4gICAgICBzdGFydElkeCA9IGl0ZW1TdHJIZWxwZXIuaW5kZXhPZihxdWVyeSk7XG4gICAgICB0b2tlbkxlbiA9IHF1ZXJ5Lmxlbmd0aDtcbiAgICAgIGlmIChzdGFydElkeCA+PSAwICYmIHRva2VuTGVuID4gMCkge1xuICAgICAgICBpdGVtU3RyID1cbiAgICAgICAgICBgJHtpdGVtU3RyLnN1YnN0cmluZygwLCBzdGFydElkeCl9PHN0cm9uZz4ke2l0ZW1TdHIuc3Vic3RyaW5nKHN0YXJ0SWR4LCBzdGFydElkeCArIHRva2VuTGVuKX08L3N0cm9uZz5gICtcbiAgICAgICAgICBgJHtpdGVtU3RyLnN1YnN0cmluZyhzdGFydElkeCArIHRva2VuTGVuKX1gO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpdGVtU3RyO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICBmb2N1c0xvc3QoKTogdm9pZCB7XG4gICAgdGhpcy5pc0ZvY3VzZWQgPSBmYWxzZTtcbiAgfVxuXG4gIGlzQWN0aXZlKHZhbHVlOiBUeXBlYWhlYWRNYXRjaCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmUgPT09IHZhbHVlO1xuICB9XG5cbiAgc2VsZWN0TWF0Y2godmFsdWU6IFR5cGVhaGVhZE1hdGNoLCBlOiBFdmVudCA9IHZvaWQgMCk6IGJvb2xlYW4ge1xuICAgIGlmIChlKSB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICB0aGlzLnBhcmVudC5jaGFuZ2VNb2RlbCh2YWx1ZSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnBhcmVudC50eXBlYWhlYWRPblNlbGVjdC5lbWl0KHZhbHVlKSwgMCk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzZXRTY3JvbGxhYmxlTW9kZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMudWxFbGVtZW50KSB7XG4gICAgICB0aGlzLnVsRWxlbWVudCA9IHRoaXMuZWxlbWVudDtcbiAgICB9XG4gICAgaWYgKHRoaXMubGlFbGVtZW50cy5maXJzdCkge1xuICAgICAgY29uc3QgdWxTdHlsZXMgPSBVdGlscy5nZXRTdHlsZXModGhpcy51bEVsZW1lbnQubmF0aXZlRWxlbWVudCk7XG4gICAgICBjb25zdCBsaVN0eWxlcyA9IFV0aWxzLmdldFN0eWxlcyh0aGlzLmxpRWxlbWVudHMuZmlyc3QubmF0aXZlRWxlbWVudCk7XG4gICAgICBjb25zdCB1bFBhZGRpbmdCb3R0b20gPSBwYXJzZUZsb2F0KCh1bFN0eWxlc1sncGFkZGluZy1ib3R0b20nXSA/IHVsU3R5bGVzWydwYWRkaW5nLWJvdHRvbSddIDogJycpXG4gICAgICAgIC5yZXBsYWNlKCdweCcsICcnKSk7XG4gICAgICBjb25zdCB1bFBhZGRpbmdUb3AgPSBwYXJzZUZsb2F0KCh1bFN0eWxlc1sncGFkZGluZy10b3AnXSA/IHVsU3R5bGVzWydwYWRkaW5nLXRvcCddIDogJzAnKVxuICAgICAgICAucmVwbGFjZSgncHgnLCAnJykpO1xuICAgICAgY29uc3Qgb3B0aW9uSGVpZ2h0ID0gcGFyc2VGbG9hdCgobGlTdHlsZXMuaGVpZ2h0ID8gbGlTdHlsZXMuaGVpZ2h0IDogJzAnKVxuICAgICAgICAucmVwbGFjZSgncHgnLCAnJykpO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy50eXBlYWhlYWRPcHRpb25zSW5TY3JvbGxhYmxlVmlldyAqIG9wdGlvbkhlaWdodDtcbiAgICAgIHRoaXMuZ3VpSGVpZ2h0ID0gYCR7aGVpZ2h0ICsgdWxQYWRkaW5nVG9wICsgdWxQYWRkaW5nQm90dG9tfXB4YDtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuICB9XG5cbiAgc2Nyb2xsUHJldmlvdXMoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgdGhpcy5zY3JvbGxUb0JvdHRvbSgpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmxpRWxlbWVudHMpIHtcbiAgICAgIGNvbnN0IGxpRWxlbWVudCA9IHRoaXMubGlFbGVtZW50cy50b0FycmF5KClbaW5kZXggLSAxXTtcbiAgICAgIGlmIChsaUVsZW1lbnQgJiYgIXRoaXMuaXNTY3JvbGxlZEludG9WaWV3KGxpRWxlbWVudC5uYXRpdmVFbGVtZW50KSkge1xuICAgICAgICB0aGlzLnVsRWxlbWVudC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IGxpRWxlbWVudC5uYXRpdmVFbGVtZW50Lm9mZnNldFRvcDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzY3JvbGxOZXh0KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaW5kZXggKyAxID4gdGhpcy5tYXRjaGVzLmxlbmd0aCAtIDEpIHtcbiAgICAgIHRoaXMuc2Nyb2xsVG9Ub3AoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5saUVsZW1lbnRzKSB7XG4gICAgICBjb25zdCBsaUVsZW1lbnQgPSB0aGlzLmxpRWxlbWVudHMudG9BcnJheSgpW2luZGV4ICsgMV07XG4gICAgICBpZiAobGlFbGVtZW50ICYmICF0aGlzLmlzU2Nyb2xsZWRJbnRvVmlldyhsaUVsZW1lbnQubmF0aXZlRWxlbWVudCkpIHtcbiAgICAgICAgdGhpcy51bEVsZW1lbnQubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPVxuICAgICAgICAgIGxpRWxlbWVudC5uYXRpdmVFbGVtZW50Lm9mZnNldFRvcCAtXG4gICAgICAgICAgTnVtYmVyKHRoaXMudWxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0KSArXG4gICAgICAgICAgTnVtYmVyKGxpRWxlbWVudC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICBwcml2YXRlIGlzU2Nyb2xsZWRJbnRvVmlldyA9IGZ1bmN0aW9uIChlbGVtOiBIVE1MRWxlbWVudCkge1xuICAgIGNvbnN0IGNvbnRhaW5lclZpZXdUb3A6IG51bWJlciA9IHRoaXMudWxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIGNvbnN0IGNvbnRhaW5lclZpZXdCb3R0b20gPSBjb250YWluZXJWaWV3VG9wICsgTnVtYmVyKHRoaXMudWxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0KTtcbiAgICBjb25zdCBlbGVtVG9wID0gZWxlbS5vZmZzZXRUb3A7XG4gICAgY29uc3QgZWxlbUJvdHRvbSA9IGVsZW1Ub3AgKyBlbGVtLm9mZnNldEhlaWdodDtcblxuICAgIHJldHVybiAoKGVsZW1Cb3R0b20gPD0gY29udGFpbmVyVmlld0JvdHRvbSkgJiYgKGVsZW1Ub3AgPj0gY29udGFpbmVyVmlld1RvcCkpO1xuICB9O1xuXG4gIHByaXZhdGUgc2Nyb2xsVG9Cb3R0b20oKTogdm9pZCB7XG4gICAgdGhpcy51bEVsZW1lbnQubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSB0aGlzLnVsRWxlbWVudC5uYXRpdmVFbGVtZW50LnNjcm9sbEhlaWdodDtcbiAgfVxuXG4gIHByaXZhdGUgc2Nyb2xsVG9Ub3AoKTogdm9pZCB7XG4gICAgdGhpcy51bEVsZW1lbnQubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuICB9XG59XG4iXX0=