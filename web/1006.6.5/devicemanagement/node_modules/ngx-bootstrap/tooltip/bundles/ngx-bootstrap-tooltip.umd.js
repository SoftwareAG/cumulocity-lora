(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ngx-bootstrap/utils'), require('ngx-bootstrap/component-loader'), require('ngx-bootstrap/positioning'), require('rxjs'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-bootstrap/tooltip', ['exports', '@angular/core', 'ngx-bootstrap/utils', 'ngx-bootstrap/component-loader', 'ngx-bootstrap/positioning', 'rxjs', '@angular/common'], factory) :
    (global = global || self, factory((global['ngx-bootstrap'] = global['ngx-bootstrap'] || {}, global['ngx-bootstrap'].tooltip = {}), global.ng.core, global.utils, global.componentLoader, global.positioning, global.rxjs, global.ng.common));
}(this, function (exports, core, utils, componentLoader, positioning, rxjs, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Default values provider for tooltip
     */
    var TooltipConfig = /** @class */ (function () {
        function TooltipConfig() {
            /**
             * sets disable adaptive position
             */
            this.adaptivePosition = true;
            /**
             * tooltip placement, supported positions: 'top', 'bottom', 'left', 'right'
             */
            this.placement = 'top';
            /**
             * array of event names which triggers tooltip opening
             */
            this.triggers = 'hover focus';
            /**
             * delay before showing the tooltip
             */
            this.delay = 0;
        }
        TooltipConfig.decorators = [
            { type: core.Injectable }
        ];
        return TooltipConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TooltipContainerComponent = /** @class */ (function () {
        function TooltipContainerComponent(config) {
            Object.assign(this, config);
        }
        Object.defineProperty(TooltipContainerComponent.prototype, "isBs3", {
            get: /**
             * @return {?}
             */
            function () {
                return utils.isBs3();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        TooltipContainerComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            this.classMap = { in: false, fade: false };
            this.classMap[this.placement] = true;
            this.classMap["tooltip-" + this.placement] = true;
            this.classMap.in = true;
            if (this.animation) {
                this.classMap.fade = true;
            }
            if (this.containerClass) {
                this.classMap[this.containerClass] = true;
            }
        };
        TooltipContainerComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'bs-tooltip-container',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        // tslint:disable-next-line
                        host: {
                            '[class]': '"tooltip in tooltip-" + placement + " " + "bs-tooltip-" + placement + " " + placement + " " + containerClass',
                            '[class.show]': '!isBs3',
                            '[class.bs3]': 'isBs3',
                            '[attr.id]': 'this.id',
                            role: 'tooltip'
                        },
                        template: "\n    <div class=\"tooltip-arrow arrow\"></div>\n    <div class=\"tooltip-inner\"><ng-content></ng-content></div>\n    ",
                        styles: ["\n    :host.tooltip {\n      display: block;\n      pointer-events: none;\n    }\n    :host.bs3.tooltip.top>.arrow {\n      margin-left: -2px;\n    }\n    :host.bs3.tooltip.bottom {\n      margin-top: 0px;\n    }\n    :host.bs3.bs-tooltip-left, :host.bs3.bs-tooltip-right{\n      margin: 0px;\n    }\n    :host.bs3.bs-tooltip-right .arrow, :host.bs3.bs-tooltip-left .arrow {\n      margin: .3rem 0;\n    }\n  "]
                    }] }
        ];
        /** @nocollapse */
        TooltipContainerComponent.ctorParameters = function () { return [
            { type: TooltipConfig }
        ]; };
        return TooltipContainerComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
            this.tooltipChange = new core.EventEmitter();
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
            this.tooltipStateChanged = new core.EventEmitter();
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
                utils.warnOnce('tooltipHtml was deprecated, please use `tooltip` instead');
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
                utils.warnOnce('tooltipPlacement was deprecated, please use `placement` instead');
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
                utils.warnOnce('tooltipIsOpen was deprecated, please use `isOpen` instead');
                return this.isOpen;
            },
            /** @deprecated - please use `isOpen` instead */
            set: /**
             * @deprecated - please use `isOpen` instead
             * @param {?} value
             * @return {?}
             */
            function (value) {
                utils.warnOnce('tooltipIsOpen was deprecated, please use `isOpen` instead');
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
                utils.warnOnce('tooltipEnable was deprecated, please use `isDisabled` instead');
                return this.isDisabled;
            },
            /** @deprecated - please use `isDisabled` instead */
            set: /**
             * @deprecated - please use `isDisabled` instead
             * @param {?} value
             * @return {?}
             */
            function (value) {
                utils.warnOnce('tooltipEnable was deprecated, please use `isDisabled` instead');
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
                utils.warnOnce('tooltipAppendToBody was deprecated, please use `container="body"` instead');
                return this.container === 'body';
            },
            /** @deprecated - please use `container="body"` instead */
            set: /**
             * @deprecated - please use `container="body"` instead
             * @param {?} value
             * @return {?}
             */
            function (value) {
                utils.warnOnce('tooltipAppendToBody was deprecated, please use `container="body"` instead');
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
                utils.warnOnce('tooltipClass deprecated');
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
                utils.warnOnce('tooltipContext deprecated');
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
                utils.warnOnce('tooltipPopupDelay is deprecated, use `delay` instead');
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
                utils.warnOnce('tooltipTrigger was deprecated, please use `triggers` instead');
                return this.triggers;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                utils.warnOnce('tooltipTrigger was deprecated, please use `triggers` instead');
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
                var _timer_1 = rxjs.timer(this.delay).subscribe((/**
                 * @return {?}
                 */
                function () {
                    showTooltip();
                    cancelDelayedTooltipShowing();
                }));
                if (this.triggers) {
                    /** @type {?} */
                    var triggers = utils.parseTriggers(this.triggers);
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
            { type: core.Directive, args: [{
                        selector: '[tooltip], [tooltipHtml]',
                        exportAs: 'bs-tooltip'
                    },] }
        ];
        /** @nocollapse */
        TooltipDirective.ctorParameters = function () { return [
            { type: core.ViewContainerRef },
            { type: componentLoader.ComponentLoaderFactory },
            { type: TooltipConfig },
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: positioning.PositioningService }
        ]; };
        TooltipDirective.propDecorators = {
            adaptivePosition: [{ type: core.Input }],
            tooltip: [{ type: core.Input }],
            tooltipChange: [{ type: core.Output }],
            placement: [{ type: core.Input }],
            triggers: [{ type: core.Input }],
            container: [{ type: core.Input }],
            containerClass: [{ type: core.Input }],
            isOpen: [{ type: core.Input }],
            isDisabled: [{ type: core.Input }],
            delay: [{ type: core.Input }],
            onShown: [{ type: core.Output }],
            onHidden: [{ type: core.Output }],
            htmlContent: [{ type: core.Input, args: ['tooltipHtml',] }],
            _placement: [{ type: core.Input, args: ['tooltipPlacement',] }],
            _isOpen: [{ type: core.Input, args: ['tooltipIsOpen',] }],
            _enable: [{ type: core.Input, args: ['tooltipEnable',] }],
            _appendToBody: [{ type: core.Input, args: ['tooltipAppendToBody',] }],
            tooltipAnimation: [{ type: core.Input }],
            _popupClass: [{ type: core.Input, args: ['tooltipClass',] }],
            _tooltipContext: [{ type: core.Input, args: ['tooltipContext',] }],
            _tooltipPopupDelay: [{ type: core.Input, args: ['tooltipPopupDelay',] }],
            tooltipFadeDuration: [{ type: core.Input }],
            _tooltipTrigger: [{ type: core.Input, args: ['tooltipTrigger',] }],
            ariaDescribedby: [{ type: core.HostBinding, args: ['attr.aria-describedby',] }],
            tooltipStateChanged: [{ type: core.Output }]
        };
        __decorate([
            utils.OnChange(),
            __metadata("design:type", Object)
        ], TooltipDirective.prototype, "tooltip", void 0);
        return TooltipDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TooltipModule = /** @class */ (function () {
        function TooltipModule() {
        }
        /**
         * @return {?}
         */
        TooltipModule.forRoot = /**
         * @return {?}
         */
        function () {
            return {
                ngModule: TooltipModule,
                providers: [TooltipConfig, componentLoader.ComponentLoaderFactory, positioning.PositioningService]
            };
        };
        TooltipModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        declarations: [TooltipDirective, TooltipContainerComponent],
                        exports: [TooltipDirective],
                        entryComponents: [TooltipContainerComponent]
                    },] }
        ];
        return TooltipModule;
    }());

    exports.TooltipConfig = TooltipConfig;
    exports.TooltipContainerComponent = TooltipContainerComponent;
    exports.TooltipDirective = TooltipDirective;
    exports.TooltipModule = TooltipModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ngx-bootstrap-tooltip.umd.js.map
