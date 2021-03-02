(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ngx-bootstrap/component-loader'), require('ngx-bootstrap/utils'), require('ngx-bootstrap/positioning'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-bootstrap/popover', ['exports', '@angular/core', 'ngx-bootstrap/component-loader', 'ngx-bootstrap/utils', 'ngx-bootstrap/positioning', '@angular/common'], factory) :
    (global = global || self, factory((global['ngx-bootstrap'] = global['ngx-bootstrap'] || {}, global['ngx-bootstrap'].popover = {}), global.ng.core, global.componentLoader, global.utils, global.positioning, global.ng.common));
}(this, function (exports, core, componentLoader, utils, positioning, common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Configuration service for the Popover directive.
     * You can inject this service, typically in your root component, and customize
     * the values of its properties in order to provide default values for all the
     * popovers used in the application.
     */
    var PopoverConfig = /** @class */ (function () {
        function PopoverConfig() {
            /**
             * sets disable adaptive position
             */
            this.adaptivePosition = true;
            /**
             * Placement of a popover. Accepts: "top", "bottom", "left", "right", "auto"
             */
            this.placement = 'top';
            /**
             * Specifies events that should trigger. Supports a space separated list of
             * event names.
             */
            this.triggers = 'click';
            this.outsideClick = false;
        }
        PopoverConfig.decorators = [
            { type: core.Injectable }
        ];
        return PopoverConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PopoverContainerComponent = /** @class */ (function () {
        function PopoverContainerComponent(config) {
            Object.assign(this, config);
        }
        Object.defineProperty(PopoverContainerComponent.prototype, "isBs3", {
            get: /**
             * @return {?}
             */
            function () {
                return utils.isBs3();
            },
            enumerable: true,
            configurable: true
        });
        PopoverContainerComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'popover-container',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        // tslint:disable-next-line
                        host: {
                            '[class]': '"popover in popover-" + placement + " " + "bs-popover-" + placement + " " + placement + " " + containerClass',
                            '[class.show]': '!isBs3',
                            '[class.bs3]': 'isBs3',
                            role: 'tooltip',
                            style: 'display:block;'
                        },
                        template: "<div class=\"popover-arrow arrow\"></div>\n<h3 class=\"popover-title popover-header\" *ngIf=\"title\">{{ title }}</h3>\n<div class=\"popover-content popover-body\">\n  <ng-content></ng-content>\n</div>\n",
                        styles: ["\n    :host.bs3.popover-top {\n      margin-bottom: 10px;\n    }\n    :host.bs3.popover.top>.arrow {\n      margin-left: -2px;\n    }\n    :host.bs3.popover.top {\n      margin-bottom: 10px;\n    }\n    :host.popover.bottom>.arrow {\n      margin-left: -4px;\n    }\n    :host.bs3.bs-popover-left {\n      margin-right: .5rem;\n    }\n    :host.bs3.bs-popover-right .arrow, :host.bs3.bs-popover-left .arrow{\n      margin: .3rem 0;\n    }\n    "]
                    }] }
        ];
        /** @nocollapse */
        PopoverContainerComponent.ctorParameters = function () { return [
            { type: PopoverConfig }
        ]; };
        PopoverContainerComponent.propDecorators = {
            placement: [{ type: core.Input }],
            title: [{ type: core.Input }]
        };
        return PopoverContainerComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * A lightweight, extensible directive for fancy popover creation.
     */
    var PopoverDirective = /** @class */ (function () {
        function PopoverDirective(_config, _elementRef, _renderer, _viewContainerRef, cis, _positionService) {
            this._positionService = _positionService;
            /**
             * Close popover on outside click
             */
            this.outsideClick = false;
            /**
             * Css class for popover container
             */
            this.containerClass = '';
            this._isInited = false;
            this._popover = cis
                .createLoader(_elementRef, _viewContainerRef, _renderer)
                .provide({ provide: PopoverConfig, useValue: _config });
            Object.assign(this, _config);
            this.onShown = this._popover.onShown;
            this.onHidden = this._popover.onHidden;
            // fix: no focus on button on Mac OS #1795
            if (typeof window !== 'undefined') {
                _elementRef.nativeElement.addEventListener('click', (/**
                 * @return {?}
                 */
                function () {
                    try {
                        _elementRef.nativeElement.focus();
                    }
                    catch (err) {
                        return;
                    }
                }));
            }
        }
        Object.defineProperty(PopoverDirective.prototype, "isOpen", {
            /**
             * Returns whether or not the popover is currently being shown
             */
            get: /**
             * Returns whether or not the popover is currently being shown
             * @return {?}
             */
            function () {
                return this._popover.isShown;
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
        /**
         * Opens an element’s popover. This is considered a “manual” triggering of
         * the popover.
         */
        /**
         * Opens an element’s popover. This is considered a “manual” triggering of
         * the popover.
         * @return {?}
         */
        PopoverDirective.prototype.show = /**
         * Opens an element’s popover. This is considered a “manual” triggering of
         * the popover.
         * @return {?}
         */
        function () {
            if (this._popover.isShown || !this.popover) {
                return;
            }
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
            this._popover
                .attach(PopoverContainerComponent)
                .to(this.container)
                .position({ attachment: this.placement })
                .show({
                content: this.popover,
                context: this.popoverContext,
                placement: this.placement,
                title: this.popoverTitle,
                containerClass: this.containerClass
            });
            if (!this.adaptivePosition) {
                this._positionService.calcPosition();
                this._positionService.deletePositionElement(this._popover._componentRef.location);
            }
            this.isOpen = true;
        };
        /**
         * Closes an element’s popover. This is considered a “manual” triggering of
         * the popover.
         */
        /**
         * Closes an element’s popover. This is considered a “manual” triggering of
         * the popover.
         * @return {?}
         */
        PopoverDirective.prototype.hide = /**
         * Closes an element’s popover. This is considered a “manual” triggering of
         * the popover.
         * @return {?}
         */
        function () {
            if (this.isOpen) {
                this._popover.hide();
                this.isOpen = false;
            }
        };
        /**
         * Toggles an element’s popover. This is considered a “manual” triggering of
         * the popover.
         */
        /**
         * Toggles an element’s popover. This is considered a “manual” triggering of
         * the popover.
         * @return {?}
         */
        PopoverDirective.prototype.toggle = /**
         * Toggles an element’s popover. This is considered a “manual” triggering of
         * the popover.
         * @return {?}
         */
        function () {
            if (this.isOpen) {
                return this.hide();
            }
            this.show();
        };
        /**
         * @return {?}
         */
        PopoverDirective.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            // fix: seems there are an issue with `routerLinkActive`
            // which result in duplicated call ngOnInit without call to ngOnDestroy
            // read more: https://github.com/valor-software/ngx-bootstrap/issues/1885
            if (this._isInited) {
                return;
            }
            this._isInited = true;
            this._popover.listen({
                triggers: this.triggers,
                outsideClick: this.outsideClick,
                show: (/**
                 * @return {?}
                 */
                function () { return _this.show(); })
            });
        };
        /**
         * @return {?}
         */
        PopoverDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this._popover.dispose();
        };
        PopoverDirective.decorators = [
            { type: core.Directive, args: [{ selector: '[popover]', exportAs: 'bs-popover' },] }
        ];
        /** @nocollapse */
        PopoverDirective.ctorParameters = function () { return [
            { type: PopoverConfig },
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: core.ViewContainerRef },
            { type: componentLoader.ComponentLoaderFactory },
            { type: positioning.PositioningService }
        ]; };
        PopoverDirective.propDecorators = {
            adaptivePosition: [{ type: core.Input }],
            popover: [{ type: core.Input }],
            popoverContext: [{ type: core.Input }],
            popoverTitle: [{ type: core.Input }],
            placement: [{ type: core.Input }],
            outsideClick: [{ type: core.Input }],
            triggers: [{ type: core.Input }],
            container: [{ type: core.Input }],
            containerClass: [{ type: core.Input }],
            isOpen: [{ type: core.Input }],
            onShown: [{ type: core.Output }],
            onHidden: [{ type: core.Output }]
        };
        return PopoverDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PopoverModule = /** @class */ (function () {
        function PopoverModule() {
        }
        /**
         * @return {?}
         */
        PopoverModule.forRoot = /**
         * @return {?}
         */
        function () {
            return {
                ngModule: PopoverModule,
                providers: [PopoverConfig, componentLoader.ComponentLoaderFactory, positioning.PositioningService]
            };
        };
        PopoverModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        declarations: [PopoverDirective, PopoverContainerComponent],
                        exports: [PopoverDirective],
                        entryComponents: [PopoverContainerComponent]
                    },] }
        ];
        return PopoverModule;
    }());

    exports.PopoverConfig = PopoverConfig;
    exports.PopoverContainerComponent = PopoverContainerComponent;
    exports.PopoverDirective = PopoverDirective;
    exports.PopoverModule = PopoverModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ngx-bootstrap-popover.umd.js.map
