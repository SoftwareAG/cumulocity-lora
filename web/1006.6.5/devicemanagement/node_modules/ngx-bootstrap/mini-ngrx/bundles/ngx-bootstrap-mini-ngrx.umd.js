(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ngx-bootstrap/mini-ngrx', ['exports', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory((global['ngx-bootstrap'] = global['ngx-bootstrap'] || {}, global['ngx-bootstrap']['mini-ngrx'] = {}), global.rxjs, global.rxjs.operators));
}(this, function (exports, rxjs, operators) { 'use strict';

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
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @template T
     */
    var   /**
     * @template T
     */
    MiniState = /** @class */ (function (_super) {
        __extends(MiniState, _super);
        function MiniState(_initialState, actionsDispatcher$, reducer) {
            var _this = _super.call(this, _initialState) || this;
            /** @type {?} */
            var actionInQueue$ = actionsDispatcher$.pipe(operators.observeOn(rxjs.queueScheduler));
            /** @type {?} */
            var state$ = actionInQueue$.pipe(operators.scan((/**
             * @param {?} state
             * @param {?} action
             * @return {?}
             */
            function (state, action) {
                if (!action) {
                    return state;
                }
                return reducer(state, action);
            }), _initialState));
            state$.subscribe((/**
             * @param {?} value
             * @return {?}
             */
            function (value) { return _this.next(value); }));
            return _this;
        }
        return MiniState;
    }(rxjs.BehaviorSubject));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @template T
     */
    var   /**
     * @template T
     */
    MiniStore = /** @class */ (function (_super) {
        __extends(MiniStore, _super);
        function MiniStore(_dispatcher, _reducer, 
        /* tslint:disable-next-line: no-any */
        state$) {
            var _this = _super.call(this) || this;
            _this._dispatcher = _dispatcher;
            _this._reducer = _reducer;
            /* tslint:disable-next-line: deprecation */
            _this.source = state$;
            return _this;
        }
        /**
         * @template R
         * @param {?} pathOrMapFn
         * @return {?}
         */
        MiniStore.prototype.select = /**
         * @template R
         * @param {?} pathOrMapFn
         * @return {?}
         */
        function (pathOrMapFn) {
            /* tslint:disable-next-line: deprecation */
            /** @type {?} */
            var mapped$ = this.source.pipe(operators.map(pathOrMapFn));
            return mapped$.pipe(operators.distinctUntilChanged());
        };
        /**
         * @template R
         * @param {?} operator
         * @return {?}
         */
        MiniStore.prototype.lift = /**
         * @template R
         * @param {?} operator
         * @return {?}
         */
        function (operator) {
            /** @type {?} */
            var store = new MiniStore(this._dispatcher, this._reducer, this);
            /* tslint:disable-next-line: deprecation */
            store.operator = operator;
            return store;
        };
        /**
         * @param {?} action
         * @return {?}
         */
        MiniStore.prototype.dispatch = /**
         * @param {?} action
         * @return {?}
         */
        function (action) {
            this._dispatcher.next(action);
        };
        /**
         * @param {?} action
         * @return {?}
         */
        MiniStore.prototype.next = /**
         * @param {?} action
         * @return {?}
         */
        function (action) {
            this._dispatcher.next(action);
        };
        /* tslint:disable-next-line: no-any */
        /* tslint:disable-next-line: no-any */
        /**
         * @param {?} err
         * @return {?}
         */
        MiniStore.prototype.error = /* tslint:disable-next-line: no-any */
        /**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            this._dispatcher.error(err);
        };
        /**
         * @return {?}
         */
        MiniStore.prototype.complete = /**
         * @return {?}
         */
        function () {
            /*noop*/
        };
        return MiniStore;
    }(rxjs.Observable));

    exports.MiniState = MiniState;
    exports.MiniStore = MiniStore;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ngx-bootstrap-mini-ngrx.umd.js.map
