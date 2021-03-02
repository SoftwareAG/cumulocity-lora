/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, forwardRef, TemplateRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DraggableItemService } from './draggable-item.service';
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
        this.onChange = new EventEmitter();
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
            newArray = tslib_1.__spread(this.items.slice(0, i), [
                dragItem.item
            ], this.items.slice(i, dragItem.i), this.items.slice(dragItem.i + 1));
        }
        else {
            // this.draggedItem.i < i
            newArray = tslib_1.__spread(this.items.slice(0, dragItem.i), this.items.slice(dragItem.i + 1, i + 1), [
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
        { type: Component, args: [{
                    selector: 'bs-sortable',
                    exportAs: 'bs-sortable',
                    template: "\n<div\n    [ngClass]=\"wrapperClass\"\n    [ngStyle]=\"wrapperStyle\"\n    [ngStyle]=\"wrapperStyle\"\n    (dragover)=\"cancelEvent($event)\"\n    (dragenter)=\"cancelEvent($event)\"\n    (drop)=\"resetActiveItem($event)\"\n    (mouseleave)=\"resetActiveItem($event)\">\n  <div\n        *ngIf=\"showPlaceholder\"\n        [ngClass]=\"placeholderClass\"\n        [ngStyle]=\"placeholderStyle\"\n        (dragover)=\"onItemDragover($event, 0)\"\n        (dragenter)=\"cancelEvent($event)\"\n    >{{placeholderItem}}</div>\n    <div\n        *ngFor=\"let item of items; let i=index;\"\n        [ngClass]=\"[ itemClass, i === activeItem ? itemActiveClass : '' ]\"\n        [ngStyle]=\"getItemStyle(i === activeItem)\"\n        draggable=\"true\"\n        (dragstart)=\"onItemDragstart($event, item, i)\"\n        (dragend)=\"resetActiveItem($event)\"\n        (dragover)=\"onItemDragover($event, i)\"\n        (dragenter)=\"cancelEvent($event)\"\n        aria-dropeffect=\"move\"\n        [attr.aria-grabbed]=\"i === activeItem\"\n    ><ng-template [ngTemplateOutlet]=\"itemTemplate || defItemTemplate\"\n  [ngTemplateOutletContext]=\"{item:item, index: i}\"></ng-template></div>\n</div>\n\n<ng-template #defItemTemplate let-item=\"item\">{{item.value}}</ng-template>  \n",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
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
        fieldName: [{ type: Input }],
        wrapperClass: [{ type: Input }],
        wrapperStyle: [{ type: Input }],
        itemClass: [{ type: Input }],
        itemStyle: [{ type: Input }],
        itemActiveClass: [{ type: Input }],
        itemActiveStyle: [{ type: Input }],
        placeholderClass: [{ type: Input }],
        placeholderStyle: [{ type: Input }],
        placeholderItem: [{ type: Input }],
        itemTemplate: [{ type: Input }],
        onChange: [{ type: Output }]
    };
    return SortableComponent;
}());
export { SortableComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    SortableComponent.globalZoneIndex;
    /**
     * field name if input array consists of objects
     * @type {?}
     */
    SortableComponent.prototype.fieldName;
    /**
     * class name for items wrapper
     * @type {?}
     */
    SortableComponent.prototype.wrapperClass;
    /**
     * style object for items wrapper
     * @type {?}
     */
    SortableComponent.prototype.wrapperStyle;
    /**
     * class name for item
     * @type {?}
     */
    SortableComponent.prototype.itemClass;
    /**
     * style object for item
     * @type {?}
     */
    SortableComponent.prototype.itemStyle;
    /**
     * class name for active item
     * @type {?}
     */
    SortableComponent.prototype.itemActiveClass;
    /**
     * style object for active item
     * @type {?}
     */
    SortableComponent.prototype.itemActiveStyle;
    /**
     * class name for placeholder
     * @type {?}
     */
    SortableComponent.prototype.placeholderClass;
    /**
     * style object for placeholder
     * @type {?}
     */
    SortableComponent.prototype.placeholderStyle;
    /**
     * placeholder item which will be shown if collection is empty
     * @type {?}
     */
    SortableComponent.prototype.placeholderItem;
    /**
     * used to specify a custom item template. Template variables: item and index;
     * @type {?}
     */
    SortableComponent.prototype.itemTemplate;
    /**
     * fired on array change (reordering, insert, remove), same as <code>ngModelChange</code>.
     *  Returns new items collection as a payload.
     * @type {?}
     */
    SortableComponent.prototype.onChange;
    /** @type {?} */
    SortableComponent.prototype.showPlaceholder;
    /** @type {?} */
    SortableComponent.prototype.activeItem;
    /** @type {?} */
    SortableComponent.prototype.onTouched;
    /** @type {?} */
    SortableComponent.prototype.onChanged;
    /**
     * @type {?}
     * @private
     */
    SortableComponent.prototype.transfer;
    /**
     * @type {?}
     * @private
     */
    SortableComponent.prototype.currentZoneIndex;
    /**
     * @type {?}
     * @private
     */
    SortableComponent.prototype._items;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWJvb3RzdHJhcC9zb3J0YWJsZS8iLCJzb3VyY2VzIjpbInNvcnRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osVUFBVSxFQUNWLFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQXdCLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7O0FBR2hFO0lBOEdFLDJCQUFZLFFBQThCO1FBQTFDLGlCQU1DOzs7O1FBakVRLGlCQUFZLEdBQUcsRUFBRSxDQUFDOzs7O1FBR2xCLGlCQUFZLEdBQThCLEVBQUUsQ0FBQzs7OztRQUc3QyxjQUFTLEdBQUcsRUFBRSxDQUFDOzs7O1FBR2YsY0FBUyxHQUE4QixFQUFFLENBQUM7Ozs7UUFHMUMsb0JBQWUsR0FBRyxFQUFFLENBQUM7Ozs7UUFHckIsb0JBQWUsR0FBOEIsRUFBRSxDQUFDOzs7O1FBR2hELHFCQUFnQixHQUFHLEVBQUUsQ0FBQzs7OztRQUd0QixxQkFBZ0IsR0FBOEIsRUFBRSxDQUFDOzs7O1FBR2pELG9CQUFlLEdBQUcsRUFBRSxDQUFDOzs7Ozs7UUFVcEIsYUFBUSxHQUF3QixJQUFJLFlBQVksRUFBUyxDQUFDO1FBRXBFLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLGVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQzs7UUFjaEIsY0FBUyxHQUFRLFFBQVEsQ0FBQyxTQUFTLENBQUM7O1FBRXBDLGNBQVMsR0FBUSxRQUFRLENBQUMsU0FBUyxDQUFDO1FBT2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQyxlQUFlLEVB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Z0JBOUNwQyxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUUsc3ZDQWdDWDtvQkFDQyxTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVU7Ozs0QkFBQyxjQUFNLE9BQUEsaUJBQWlCLEVBQWpCLENBQWlCLEVBQUM7NEJBQ2hELEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGO2lCQUNGOzs7O2dCQTlDUSxvQkFBb0I7Ozs0QkFtRDFCLEtBQUs7K0JBR0wsS0FBSzsrQkFHTCxLQUFLOzRCQUdMLEtBQUs7NEJBR0wsS0FBSztrQ0FHTCxLQUFLO2tDQUdMLEtBQUs7bUNBR0wsS0FBSzttQ0FHTCxLQUFLO2tDQUdMLEtBQUs7K0JBSUwsS0FBSzsyQkFNTCxNQUFNOztJQXlKVCx3QkFBQztDQUFBLEFBOU9ELElBOE9DO1NBak1ZLGlCQUFpQjs7Ozs7O0lBQzVCLGtDQUFtQzs7Ozs7SUFFbkMsc0NBQTJCOzs7OztJQUczQix5Q0FBMkI7Ozs7O0lBRzNCLHlDQUFzRDs7Ozs7SUFHdEQsc0NBQXdCOzs7OztJQUd4QixzQ0FBbUQ7Ozs7O0lBR25ELDRDQUE4Qjs7Ozs7SUFHOUIsNENBQXlEOzs7OztJQUd6RCw2Q0FBK0I7Ozs7O0lBRy9CLDZDQUEwRDs7Ozs7SUFHMUQsNENBQThCOzs7OztJQUk5Qix5Q0FBd0M7Ozs7OztJQU14QyxxQ0FBb0U7O0lBRXBFLDRDQUF3Qjs7SUFDeEIsdUNBQWdCOztJQWNoQixzQ0FBb0M7O0lBRXBDLHNDQUFvQzs7Ozs7SUFFcEMscUNBQXVDOzs7OztJQUN2Qyw2Q0FBaUM7Ozs7O0lBQ2pDLG1DQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERyYWdnYWJsZUl0ZW0gfSBmcm9tICcuL2RyYWdnYWJsZS1pdGVtJztcbmltcG9ydCB7IERyYWdnYWJsZUl0ZW1TZXJ2aWNlIH0gZnJvbSAnLi9kcmFnZ2FibGUtaXRlbS5zZXJ2aWNlJztcblxuLyogdHNsaW50OmRpc2FibGUgKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JzLXNvcnRhYmxlJyxcbiAgZXhwb3J0QXM6ICdicy1zb3J0YWJsZScsXG4gIHRlbXBsYXRlOiBgXG48ZGl2XG4gICAgW25nQ2xhc3NdPVwid3JhcHBlckNsYXNzXCJcbiAgICBbbmdTdHlsZV09XCJ3cmFwcGVyU3R5bGVcIlxuICAgIFtuZ1N0eWxlXT1cIndyYXBwZXJTdHlsZVwiXG4gICAgKGRyYWdvdmVyKT1cImNhbmNlbEV2ZW50KCRldmVudClcIlxuICAgIChkcmFnZW50ZXIpPVwiY2FuY2VsRXZlbnQoJGV2ZW50KVwiXG4gICAgKGRyb3ApPVwicmVzZXRBY3RpdmVJdGVtKCRldmVudClcIlxuICAgIChtb3VzZWxlYXZlKT1cInJlc2V0QWN0aXZlSXRlbSgkZXZlbnQpXCI+XG4gIDxkaXZcbiAgICAgICAgKm5nSWY9XCJzaG93UGxhY2Vob2xkZXJcIlxuICAgICAgICBbbmdDbGFzc109XCJwbGFjZWhvbGRlckNsYXNzXCJcbiAgICAgICAgW25nU3R5bGVdPVwicGxhY2Vob2xkZXJTdHlsZVwiXG4gICAgICAgIChkcmFnb3Zlcik9XCJvbkl0ZW1EcmFnb3ZlcigkZXZlbnQsIDApXCJcbiAgICAgICAgKGRyYWdlbnRlcik9XCJjYW5jZWxFdmVudCgkZXZlbnQpXCJcbiAgICA+e3twbGFjZWhvbGRlckl0ZW19fTwvZGl2PlxuICAgIDxkaXZcbiAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXM7IGxldCBpPWluZGV4O1wiXG4gICAgICAgIFtuZ0NsYXNzXT1cIlsgaXRlbUNsYXNzLCBpID09PSBhY3RpdmVJdGVtID8gaXRlbUFjdGl2ZUNsYXNzIDogJycgXVwiXG4gICAgICAgIFtuZ1N0eWxlXT1cImdldEl0ZW1TdHlsZShpID09PSBhY3RpdmVJdGVtKVwiXG4gICAgICAgIGRyYWdnYWJsZT1cInRydWVcIlxuICAgICAgICAoZHJhZ3N0YXJ0KT1cIm9uSXRlbURyYWdzdGFydCgkZXZlbnQsIGl0ZW0sIGkpXCJcbiAgICAgICAgKGRyYWdlbmQpPVwicmVzZXRBY3RpdmVJdGVtKCRldmVudClcIlxuICAgICAgICAoZHJhZ292ZXIpPVwib25JdGVtRHJhZ292ZXIoJGV2ZW50LCBpKVwiXG4gICAgICAgIChkcmFnZW50ZXIpPVwiY2FuY2VsRXZlbnQoJGV2ZW50KVwiXG4gICAgICAgIGFyaWEtZHJvcGVmZmVjdD1cIm1vdmVcIlxuICAgICAgICBbYXR0ci5hcmlhLWdyYWJiZWRdPVwiaSA9PT0gYWN0aXZlSXRlbVwiXG4gICAgPjxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJpdGVtVGVtcGxhdGUgfHwgZGVmSXRlbVRlbXBsYXRlXCJcbiAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntpdGVtOml0ZW0sIGluZGV4OiBpfVwiPjwvbmctdGVtcGxhdGU+PC9kaXY+XG48L2Rpdj5cblxuPG5nLXRlbXBsYXRlICNkZWZJdGVtVGVtcGxhdGUgbGV0LWl0ZW09XCJpdGVtXCI+e3tpdGVtLnZhbHVlfX08L25nLXRlbXBsYXRlPiAgXG5gLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFNvcnRhYmxlQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdXG59KVxuLyogdHNsaW50OmVuYWJsZSAqL1xuZXhwb3J0IGNsYXNzIFNvcnRhYmxlQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBwcml2YXRlIHN0YXRpYyBnbG9iYWxab25lSW5kZXggPSAwO1xuICAvKiogZmllbGQgbmFtZSBpZiBpbnB1dCBhcnJheSBjb25zaXN0cyBvZiBvYmplY3RzICovXG4gIEBJbnB1dCgpIGZpZWxkTmFtZTogc3RyaW5nO1xuXG4gIC8qKiBjbGFzcyBuYW1lIGZvciBpdGVtcyB3cmFwcGVyICovXG4gIEBJbnB1dCgpIHdyYXBwZXJDbGFzcyA9ICcnO1xuXG4gIC8qKiBzdHlsZSBvYmplY3QgZm9yIGl0ZW1zIHdyYXBwZXIgKi9cbiAgQElucHV0KCkgd3JhcHBlclN0eWxlOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG5cbiAgLyoqIGNsYXNzIG5hbWUgZm9yIGl0ZW0gKi9cbiAgQElucHV0KCkgaXRlbUNsYXNzID0gJyc7XG5cbiAgLyoqIHN0eWxlIG9iamVjdCBmb3IgaXRlbSAqL1xuICBASW5wdXQoKSBpdGVtU3R5bGU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcblxuICAvKiogY2xhc3MgbmFtZSBmb3IgYWN0aXZlIGl0ZW0gKi9cbiAgQElucHV0KCkgaXRlbUFjdGl2ZUNsYXNzID0gJyc7XG5cbiAgLyoqIHN0eWxlIG9iamVjdCBmb3IgYWN0aXZlIGl0ZW0gKi9cbiAgQElucHV0KCkgaXRlbUFjdGl2ZVN0eWxlOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG5cbiAgLyoqIGNsYXNzIG5hbWUgZm9yIHBsYWNlaG9sZGVyICovXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyQ2xhc3MgPSAnJztcblxuICAvKiogc3R5bGUgb2JqZWN0IGZvciBwbGFjZWhvbGRlciAqL1xuICBASW5wdXQoKSBwbGFjZWhvbGRlclN0eWxlOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG5cbiAgLyoqIHBsYWNlaG9sZGVyIGl0ZW0gd2hpY2ggd2lsbCBiZSBzaG93biBpZiBjb2xsZWN0aW9uIGlzIGVtcHR5ICovXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVySXRlbSA9ICcnO1xuXG4gIC8qKiB1c2VkIHRvIHNwZWNpZnkgYSBjdXN0b20gaXRlbSB0ZW1wbGF0ZS4gVGVtcGxhdGUgdmFyaWFibGVzOiBpdGVtIGFuZCBpbmRleDsgKi9cbiAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbnkgKi9cbiAgQElucHV0KCkgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKiBmaXJlZCBvbiBhcnJheSBjaGFuZ2UgKHJlb3JkZXJpbmcsIGluc2VydCwgcmVtb3ZlKSwgc2FtZSBhcyA8Y29kZT5uZ01vZGVsQ2hhbmdlPC9jb2RlPi5cbiAgICogIFJldHVybnMgbmV3IGl0ZW1zIGNvbGxlY3Rpb24gYXMgYSBwYXlsb2FkLlxuICAgKi9cbiAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbnkgKi9cbiAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55W10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnlbXT4oKTtcblxuICBzaG93UGxhY2Vob2xkZXIgPSBmYWxzZTtcbiAgYWN0aXZlSXRlbSA9IC0xO1xuXG4gIGdldCBpdGVtcygpOiBTb3J0YWJsZUl0ZW1bXSB7XG4gICAgcmV0dXJuIHRoaXMuX2l0ZW1zO1xuICB9XG5cbiAgc2V0IGl0ZW1zKHZhbHVlOiBTb3J0YWJsZUl0ZW1bXSkge1xuICAgIHRoaXMuX2l0ZW1zID0gdmFsdWU7XG4gICAgY29uc3Qgb3V0ID0gdGhpcy5pdGVtcy5tYXAoKHg6IFNvcnRhYmxlSXRlbSkgPT4geC5pbml0RGF0YSk7XG4gICAgdGhpcy5vbkNoYW5nZWQob3V0KTtcbiAgICB0aGlzLm9uQ2hhbmdlLmVtaXQob3V0KTtcbiAgfVxuXG4gIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW55ICovXG4gIG9uVG91Y2hlZDogYW55ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFueSAqL1xuICBvbkNoYW5nZWQ6IGFueSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcblxuICBwcml2YXRlIHRyYW5zZmVyOiBEcmFnZ2FibGVJdGVtU2VydmljZTtcbiAgcHJpdmF0ZSBjdXJyZW50Wm9uZUluZGV4OiBudW1iZXI7XG4gIHByaXZhdGUgX2l0ZW1zOiBTb3J0YWJsZUl0ZW1bXTtcblxuICBjb25zdHJ1Y3Rvcih0cmFuc2ZlcjogRHJhZ2dhYmxlSXRlbVNlcnZpY2UpIHtcbiAgICB0aGlzLnRyYW5zZmVyID0gdHJhbnNmZXI7XG4gICAgdGhpcy5jdXJyZW50Wm9uZUluZGV4ID0gU29ydGFibGVDb21wb25lbnQuZ2xvYmFsWm9uZUluZGV4Kys7XG4gICAgdGhpcy50cmFuc2ZlclxuICAgICAgLm9uQ2FwdHVyZUl0ZW0oKVxuICAgICAgLnN1YnNjcmliZSgoaXRlbTogRHJhZ2dhYmxlSXRlbSkgPT4gdGhpcy5vbkRyb3AoaXRlbSkpO1xuICB9XG5cbiAgb25JdGVtRHJhZ3N0YXJ0KFxuICAgIGV2ZW50OiBEcmFnRXZlbnQsXG4gICAgaXRlbTogU29ydGFibGVJdGVtLFxuICAgIGk6IG51bWJlclxuICApOiB2b2lkIHtcbiAgICB0aGlzLmluaXREcmFnc3RhcnRFdmVudChldmVudCk7XG4gICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICB0aGlzLnRyYW5zZmVyLmRyYWdTdGFydCh7XG4gICAgICBldmVudCxcbiAgICAgIGl0ZW0sXG4gICAgICBpLFxuICAgICAgaW5pdGlhbEluZGV4OiBpLFxuICAgICAgbGFzdFpvbmVJbmRleDogdGhpcy5jdXJyZW50Wm9uZUluZGV4LFxuICAgICAgb3ZlclpvbmVJbmRleDogdGhpcy5jdXJyZW50Wm9uZUluZGV4XG4gICAgfSk7XG4gIH1cblxuICBvbkl0ZW1EcmFnb3ZlcihldmVudDogRHJhZ0V2ZW50LCBpOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMudHJhbnNmZXIuZ2V0SXRlbSgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgZHJhZ0l0ZW0gPSB0aGlzLnRyYW5zZmVyLmNhcHR1cmVJdGVtKFxuICAgICAgdGhpcy5jdXJyZW50Wm9uZUluZGV4LFxuICAgICAgdGhpcy5pdGVtcy5sZW5ndGhcbiAgICApO1xuXG4gICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbnkgKi9cbiAgICBsZXQgbmV3QXJyYXk6IGFueVtdID0gW107XG5cbiAgICBpZiAoIXRoaXMuaXRlbXMubGVuZ3RoKSB7XG4gICAgICBuZXdBcnJheSA9IFtkcmFnSXRlbS5pdGVtXTtcbiAgICB9IGVsc2UgaWYgKGRyYWdJdGVtLmkgPiBpKSB7XG4gICAgICBuZXdBcnJheSA9IFtcbiAgICAgICAgLi4udGhpcy5pdGVtcy5zbGljZSgwLCBpKSxcbiAgICAgICAgZHJhZ0l0ZW0uaXRlbSxcbiAgICAgICAgLi4udGhpcy5pdGVtcy5zbGljZShpLCBkcmFnSXRlbS5pKSxcbiAgICAgICAgLi4udGhpcy5pdGVtcy5zbGljZShkcmFnSXRlbS5pICsgMSlcbiAgICAgIF07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHRoaXMuZHJhZ2dlZEl0ZW0uaSA8IGlcbiAgICAgIG5ld0FycmF5ID0gW1xuICAgICAgICAuLi50aGlzLml0ZW1zLnNsaWNlKDAsIGRyYWdJdGVtLmkpLFxuICAgICAgICAuLi50aGlzLml0ZW1zLnNsaWNlKGRyYWdJdGVtLmkgKyAxLCBpICsgMSksXG4gICAgICAgIGRyYWdJdGVtLml0ZW0sXG4gICAgICAgIC4uLnRoaXMuaXRlbXMuc2xpY2UoaSArIDEpXG4gICAgICBdO1xuICAgIH1cbiAgICB0aGlzLml0ZW1zID0gbmV3QXJyYXk7XG4gICAgZHJhZ0l0ZW0uaSA9IGk7XG4gICAgdGhpcy5hY3RpdmVJdGVtID0gaTtcbiAgICB0aGlzLnVwZGF0ZVBsYWNlaG9sZGVyU3RhdGUoKTtcbiAgfVxuXG4gIGNhbmNlbEV2ZW50KGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMudHJhbnNmZXIuZ2V0SXRlbSgpIHx8ICFldmVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgb25Ecm9wKGl0ZW06IERyYWdnYWJsZUl0ZW0pOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICBpdGVtICYmXG4gICAgICBpdGVtLm92ZXJab25lSW5kZXggIT09IHRoaXMuY3VycmVudFpvbmVJbmRleCAmJlxuICAgICAgaXRlbS5sYXN0Wm9uZUluZGV4ID09PSB0aGlzLmN1cnJlbnRab25lSW5kZXhcbiAgICApIHtcbiAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1zLmZpbHRlcihcbiAgICAgICAgKHg6IFNvcnRhYmxlSXRlbSwgaTogbnVtYmVyKSA9PiBpICE9PSBpdGVtLmlcbiAgICAgICk7XG4gICAgICB0aGlzLnVwZGF0ZVBsYWNlaG9sZGVyU3RhdGUoKTtcbiAgICB9XG4gICAgdGhpcy5yZXNldEFjdGl2ZUl0ZW0odW5kZWZpbmVkKTtcbiAgfVxuXG4gIHJlc2V0QWN0aXZlSXRlbShldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5jYW5jZWxFdmVudChldmVudCk7XG4gICAgdGhpcy5hY3RpdmVJdGVtID0gLTE7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZWQgPSBjYWxsYmFjaztcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBjYWxsYmFjaztcbiAgfVxuXG4gIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW55ICovXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueVtdKTogdm9pZCB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFueSAqL1xuICAgICAgdGhpcy5pdGVtcyA9IHZhbHVlLm1hcCgoeDogYW55LCBpOiBudW1iZXIpID0+ICh7XG4gICAgICAgIGlkOiBpLFxuICAgICAgICBpbml0RGF0YTogeCxcbiAgICAgICAgdmFsdWU6IHRoaXMuZmllbGROYW1lID8geFt0aGlzLmZpZWxkTmFtZV0gOiB4XG4gICAgICB9KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICB9XG4gICAgdGhpcy51cGRhdGVQbGFjZWhvbGRlclN0YXRlKCk7XG4gIH1cblxuICB1cGRhdGVQbGFjZWhvbGRlclN0YXRlKCk6IHZvaWQge1xuICAgIHRoaXMuc2hvd1BsYWNlaG9sZGVyID0gIXRoaXMuX2l0ZW1zLmxlbmd0aDtcbiAgfVxuXG4gIGdldEl0ZW1TdHlsZShpc0FjdGl2ZTogYm9vbGVhbik6IHt9IHtcbiAgICByZXR1cm4gaXNBY3RpdmVcbiAgICAgID8gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5pdGVtU3R5bGUsIHRoaXMuaXRlbUFjdGl2ZVN0eWxlKVxuICAgICAgOiB0aGlzLml0ZW1TdHlsZTtcbiAgfVxuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICBwcml2YXRlIGluaXREcmFnc3RhcnRFdmVudChldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgLy8gaXQgaXMgbmVjZXNzYXJ5IGZvciBtb3ppbGxhXG4gICAgLy8gZGF0YSB0eXBlIHNob3VsZCBiZSAnVGV4dCcgaW5zdGVhZCBvZiAndGV4dC9wbGFpbicgdG8ga2VlcCBjb21wYXRpYmlsaXR5XG4gICAgLy8gd2l0aCBJRVxuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCdUZXh0JywgJ3BsYWNlaG9sZGVyJyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFNvcnRhYmxlSXRlbSB7XG4gIGlkOiBudW1iZXI7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW55ICovXG4gIGluaXREYXRhOiBhbnk7XG59XG4iXX0=