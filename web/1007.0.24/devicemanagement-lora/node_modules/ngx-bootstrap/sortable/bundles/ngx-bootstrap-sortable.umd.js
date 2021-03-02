(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('ngx-bootstrap/sortable', ['exports', '@angular/core', '@angular/common', '@angular/forms', 'rxjs'], factory) :
    (global = global || self, factory((global['ngx-bootstrap'] = global['ngx-bootstrap'] || {}, global['ngx-bootstrap'].sortable = {}), global.ng.core, global.ng.common, global.ng.forms, global.rxjs));
}(this, function (exports, core, common, forms, rxjs) { 'use strict';

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

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DraggableItemService = /** @class */ (function () {
        function DraggableItemService() {
            this.onCapture = new rxjs.Subject();
        }
        /**
         * @param {?} item
         * @return {?}
         */
        DraggableItemService.prototype.dragStart = /**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            this.draggableItem = item;
        };
        /**
         * @return {?}
         */
        DraggableItemService.prototype.getItem = /**
         * @return {?}
         */
        function () {
            return this.draggableItem;
        };
        /**
         * @param {?} overZoneIndex
         * @param {?} newIndex
         * @return {?}
         */
        DraggableItemService.prototype.captureItem = /**
         * @param {?} overZoneIndex
         * @param {?} newIndex
         * @return {?}
         */
        function (overZoneIndex, newIndex) {
            if (this.draggableItem.overZoneIndex !== overZoneIndex) {
                this.draggableItem.lastZoneIndex = this.draggableItem.overZoneIndex;
                this.draggableItem.overZoneIndex = overZoneIndex;
                this.onCapture.next(this.draggableItem);
                this.draggableItem = Object.assign({}, this.draggableItem, {
                    overZoneIndex: overZoneIndex,
                    i: newIndex
                });
            }
            return this.draggableItem;
        };
        /**
         * @return {?}
         */
        DraggableItemService.prototype.onCaptureItem = /**
         * @return {?}
         */
        function () {
            return this.onCapture;
        };
        DraggableItemService.decorators = [
            { type: core.Injectable }
        ];
        return DraggableItemService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /* tslint:disable */
    var SortableComponent = /** @class */ (function () {
        function SortableComponent(transfer) {
            var _this = this;
            /**
             * class name for items wrapper
             */
            this.wrapperClass = '';
            /**
             * style object for items wrapper
             */
            this.wrapperStyle = {};
            /**
             * class name for item
             */
            this.itemClass = '';
            /**
             * style object for item
             */
            this.itemStyle = {};
            /**
             * class name for active item
             */
            this.itemActiveClass = '';
            /**
             * style object for active item
             */
            this.itemActiveStyle = {};
            /**
             * class name for placeholder
             */
            this.placeholderClass = '';
            /**
             * style object for placeholder
             */
            this.placeholderStyle = {};
            /**
             * placeholder item which will be shown if collection is empty
             */
            this.placeholderItem = '';
            /**
             * fired on array change (reordering, insert, remove), same as <code>ngModelChange</code>.
             *  Returns new items collection as a payload.
             */
            /* tslint:disable-next-line: no-any */
            this.onChange = new core.EventEmitter();
            this.showPlaceholder = false;
            this.activeItem = -1;
            /* tslint:disable-next-line: no-any */
            this.onTouched = Function.prototype;
            /* tslint:disable-next-line: no-any */
            this.onChanged = Function.prototype;
            this.transfer = transfer;
            this.currentZoneIndex = SortableComponent.globalZoneIndex++;
            this.transfer
                .onCaptureItem()
                .subscribe((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return _this.onDrop(item); }));
        }
        Object.defineProperty(SortableComponent.prototype, "items", {
            get: /**
             * @return {?}
             */
            function () {
                return this._items;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._items = value;
                /** @type {?} */
                var out = this.items.map((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return x.initData; }));
                this.onChanged(out);
                this.onChange.emit(out);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} event
         * @param {?} item
         * @param {?} i
         * @return {?}
         */
        SortableComponent.prototype.onItemDragstart = /**
         * @param {?} event
         * @param {?} item
         * @param {?} i
         * @return {?}
         */
        function (event, item, i) {
            this.initDragstartEvent(event);
            this.onTouched();
            this.transfer.dragStart({
                event: event,
                item: item,
                i: i,
                initialIndex: i,
                lastZoneIndex: this.currentZoneIndex,
                overZoneIndex: this.currentZoneIndex
            });
        };
        /**
         * @param {?} event
         * @param {?} i
         * @return {?}
         */
        SortableComponent.prototype.onItemDragover = /**
         * @param {?} event
         * @param {?} i
         * @return {?}
         */
        function (event, i) {
            if (!this.transfer.getItem()) {
                return;
            }
            event.preventDefault();
            /** @type {?} */
            var dragItem = this.transfer.captureItem(this.currentZoneIndex, this.items.length);
            /* tslint:disable-next-line: no-any */
            /** @type {?} */
            var newArray = [];
            if (!this.items.length) {
                newArray = [dragItem.item];
            }
            else if (dragItem.i > i) {
                newArray = __spread(this.items.slice(0, i), [
                    dragItem.item
                ], this.items.slice(i, dragItem.i), this.items.slice(dragItem.i + 1));
            }
            else {
                // this.draggedItem.i < i
                newArray = __spread(this.items.slice(0, dragItem.i), this.items.slice(dragItem.i + 1, i + 1), [
                    dragItem.item
                ], this.items.slice(i + 1));
            }
            this.items = newArray;
            dragItem.i = i;
            this.activeItem = i;
            this.updatePlaceholderState();
        };
        /**
         * @param {?} event
         * @return {?}
         */
        SortableComponent.prototype.cancelEvent = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (!this.transfer.getItem() || !event) {
                return;
            }
            event.preventDefault();
        };
        /**
         * @param {?} item
         * @return {?}
         */
        SortableComponent.prototype.onDrop = /**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            if (item &&
                item.overZoneIndex !== this.currentZoneIndex &&
                item.lastZoneIndex === this.currentZoneIndex) {
                this.items = this.items.filter((/**
                 * @param {?} x
                 * @param {?} i
                 * @return {?}
                 */
                function (x, i) { return i !== item.i; }));
                this.updatePlaceholderState();
            }
            this.resetActiveItem(undefined);
        };
        /**
         * @param {?} event
         * @return {?}
         */
        SortableComponent.prototype.resetActiveItem = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            this.cancelEvent(event);
            this.activeItem = -1;
        };
        /**
         * @param {?} callback
         * @return {?}
         */
        SortableComponent.prototype.registerOnChange = /**
         * @param {?} callback
         * @return {?}
         */
        function (callback) {
            this.onChanged = callback;
        };
        /**
         * @param {?} callback
         * @return {?}
         */
        SortableComponent.prototype.registerOnTouched = /**
         * @param {?} callback
         * @return {?}
         */
        function (callback) {
            this.onTouched = callback;
        };
        /* tslint:disable-next-line: no-any */
        /* tslint:disable-next-line: no-any */
        /**
         * @param {?} value
         * @return {?}
         */
        SortableComponent.prototype.writeValue = /* tslint:disable-next-line: no-any */
        /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            if (value) {
                /* tslint:disable-next-line: no-any */
                this.items = value.map((/**
                 * @param {?} x
                 * @param {?} i
                 * @return {?}
                 */
                function (x, i) { return ({
                    id: i,
                    initData: x,
                    value: _this.fieldName ? x[_this.fieldName] : x
                }); }));
            }
            else {
                this.items = [];
            }
            this.updatePlaceholderState();
        };
        /**
         * @return {?}
         */
        SortableComponent.prototype.updatePlaceholderState = /**
         * @return {?}
         */
        function () {
            this.showPlaceholder = !this._items.length;
        };
        /**
         * @param {?} isActive
         * @return {?}
         */
        SortableComponent.prototype.getItemStyle = /**
         * @param {?} isActive
         * @return {?}
         */
        function (isActive) {
            return isActive
                ? Object.assign({}, this.itemStyle, this.itemActiveStyle)
                : this.itemStyle;
        };
        // tslint:disable-next-line
        // tslint:disable-next-line
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        SortableComponent.prototype.initDragstartEvent = 
        // tslint:disable-next-line
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        function (event) {
            // it is necessary for mozilla
            // data type should be 'Text' instead of 'text/plain' to keep compatibility
            // with IE
            event.dataTransfer.setData('Text', 'placeholder');
        };
        SortableComponent.globalZoneIndex = 0;
        SortableComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'bs-sortable',
                        exportAs: 'bs-sortable',
                        template: "\n<div\n    [ngClass]=\"wrapperClass\"\n    [ngStyle]=\"wrapperStyle\"\n    [ngStyle]=\"wrapperStyle\"\n    (dragover)=\"cancelEvent($event)\"\n    (dragenter)=\"cancelEvent($event)\"\n    (drop)=\"resetActiveItem($event)\"\n    (mouseleave)=\"resetActiveItem($event)\">\n  <div\n        *ngIf=\"showPlaceholder\"\n        [ngClass]=\"placeholderClass\"\n        [ngStyle]=\"placeholderStyle\"\n        (dragover)=\"onItemDragover($event, 0)\"\n        (dragenter)=\"cancelEvent($event)\"\n    >{{placeholderItem}}</div>\n    <div\n        *ngFor=\"let item of items; let i=index;\"\n        [ngClass]=\"[ itemClass, i === activeItem ? itemActiveClass : '' ]\"\n        [ngStyle]=\"getItemStyle(i === activeItem)\"\n        draggable=\"true\"\n        (dragstart)=\"onItemDragstart($event, item, i)\"\n        (dragend)=\"resetActiveItem($event)\"\n        (dragover)=\"onItemDragover($event, i)\"\n        (dragenter)=\"cancelEvent($event)\"\n        aria-dropeffect=\"move\"\n        [attr.aria-grabbed]=\"i === activeItem\"\n    ><ng-template [ngTemplateOutlet]=\"itemTemplate || defItemTemplate\"\n  [ngTemplateOutletContext]=\"{item:item, index: i}\"></ng-template></div>\n</div>\n\n<ng-template #defItemTemplate let-item=\"item\">{{item.value}}</ng-template>  \n",
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: core.forwardRef((/**
                                 * @return {?}
                                 */
                                function () { return SortableComponent; })),
                                multi: true
                            }
                        ]
                    }] }
        ];
        /** @nocollapse */
        SortableComponent.ctorParameters = function () { return [
            { type: DraggableItemService }
        ]; };
        SortableComponent.propDecorators = {
            fieldName: [{ type: core.Input }],
            wrapperClass: [{ type: core.Input }],
            wrapperStyle: [{ type: core.Input }],
            itemClass: [{ type: core.Input }],
            itemStyle: [{ type: core.Input }],
            itemActiveClass: [{ type: core.Input }],
            itemActiveStyle: [{ type: core.Input }],
            placeholderClass: [{ type: core.Input }],
            placeholderStyle: [{ type: core.Input }],
            placeholderItem: [{ type: core.Input }],
            itemTemplate: [{ type: core.Input }],
            onChange: [{ type: core.Output }]
        };
        return SortableComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SortableModule = /** @class */ (function () {
        function SortableModule() {
        }
        /**
         * @return {?}
         */
        SortableModule.forRoot = /**
         * @return {?}
         */
        function () {
            return { ngModule: SortableModule, providers: [DraggableItemService] };
        };
        SortableModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [SortableComponent],
                        imports: [common.CommonModule],
                        exports: [SortableComponent]
                    },] }
        ];
        return SortableModule;
    }());

    exports.DraggableItemService = DraggableItemService;
    exports.SortableComponent = SortableComponent;
    exports.SortableModule = SortableModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ngx-bootstrap-sortable.umd.js.map
