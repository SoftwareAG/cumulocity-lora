(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ngx-bootstrap/utils'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-bootstrap/alert', ['exports', '@angular/core', 'ngx-bootstrap/utils', '@angular/common'], factory) :
    (global = global || self, factory((global['ngx-bootstrap'] = global['ngx-bootstrap'] || {}, global['ngx-bootstrap'].alert = {}), global.ng.core, global.utils, global.ng.common));
}(this, function (exports, core, utils, common) { 'use strict';

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
    var AlertConfig = /** @class */ (function () {
        function AlertConfig() {
            /**
             * default alert type
             */
            this.type = 'warning';
            /**
             * is alerts are dismissible by default
             */
            this.dismissible = false;
            /**
             * default time before alert will dismiss
             */
            this.dismissOnTimeout = undefined;
        }
        AlertConfig.decorators = [
            { type: core.Injectable }
        ];
        return AlertConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AlertComponent = /** @class */ (function () {
        function AlertComponent(_config, changeDetection) {
            var _this = this;
            this.changeDetection = changeDetection;
            /**
             * Alert type.
             * Provides one of four bootstrap supported contextual classes:
             * `success`, `info`, `warning` and `danger`
             */
            this.type = 'warning';
            /**
             * If set, displays an inline "Close" button
             */
            this.dismissible = false;
            /**
             * Is alert visible
             */
            this.isOpen = true;
            /**
             * This event fires immediately after close instance method is called,
             * $event is an instance of Alert component.
             */
            this.onClose = new core.EventEmitter();
            /**
             * This event fires when alert closed, $event is an instance of Alert component
             */
            this.onClosed = new core.EventEmitter();
            this.classes = '';
            this.dismissibleChange = new core.EventEmitter();
            Object.assign(this, _config);
            this.dismissibleChange.subscribe((/**
             * @param {?} dismissible
             * @return {?}
             */
            function (dismissible) {
                _this.classes = _this.dismissible ? 'alert-dismissible' : '';
                _this.changeDetection.markForCheck();
            }));
        }
        /**
         * @return {?}
         */
        AlertComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.dismissOnTimeout) {
                // if dismissOnTimeout used as attr without binding, it will be a string
                setTimeout((/**
                 * @return {?}
                 */
                function () { return _this.close(); }), parseInt((/** @type {?} */ (this.dismissOnTimeout)), 10));
            }
        };
        // todo: animation ` If the .fade and .in classes are present on the element,
        // the alert will fade out before it is removed`
        /**
         * Closes an alert by removing it from the DOM.
         */
        // todo: animation ` If the .fade and .in classes are present on the element,
        // the alert will fade out before it is removed`
        /**
         * Closes an alert by removing it from the DOM.
         * @return {?}
         */
        AlertComponent.prototype.close = 
        // todo: animation ` If the .fade and .in classes are present on the element,
        // the alert will fade out before it is removed`
        /**
         * Closes an alert by removing it from the DOM.
         * @return {?}
         */
        function () {
            if (!this.isOpen) {
                return;
            }
            this.onClose.emit(this);
            this.isOpen = false;
            this.changeDetection.markForCheck();
            this.onClosed.emit(this);
        };
        AlertComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'alert,bs-alert',
                        template: "<ng-template [ngIf]=\"isOpen\">\n  <div [class]=\"'alert alert-' + type\" role=\"alert\" [ngClass]=\"classes\">\n    <ng-template [ngIf]=\"dismissible\">\n      <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"close()\">\n        <span aria-hidden=\"true\">&times;</span>\n        <span class=\"sr-only\">Close</span>\n      </button>\n    </ng-template>\n    <ng-content></ng-content>\n  </div>\n</ng-template>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        AlertComponent.ctorParameters = function () { return [
            { type: AlertConfig },
            { type: core.ChangeDetectorRef }
        ]; };
        AlertComponent.propDecorators = {
            type: [{ type: core.Input }],
            dismissible: [{ type: core.Input }],
            dismissOnTimeout: [{ type: core.Input }],
            isOpen: [{ type: core.Input }],
            onClose: [{ type: core.Output }],
            onClosed: [{ type: core.Output }]
        };
        __decorate([
            utils.OnChange(),
            __metadata("design:type", Object)
        ], AlertComponent.prototype, "dismissible", void 0);
        return AlertComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AlertModule = /** @class */ (function () {
        function AlertModule() {
        }
        /**
         * @return {?}
         */
        AlertModule.forRoot = /**
         * @return {?}
         */
        function () {
            return { ngModule: AlertModule, providers: [AlertConfig] };
        };
        AlertModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        declarations: [AlertComponent],
                        exports: [AlertComponent],
                        entryComponents: [AlertComponent]
                    },] }
        ];
        return AlertModule;
    }());

    exports.AlertComponent = AlertComponent;
    exports.AlertConfig = AlertConfig;
    exports.AlertModule = AlertModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ngx-bootstrap-alert.umd.js.map
