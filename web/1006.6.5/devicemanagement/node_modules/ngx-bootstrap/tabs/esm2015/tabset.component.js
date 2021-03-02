/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, HostBinding, Input, Renderer2, ElementRef } from '@angular/core';
import { TabsetConfig } from './tabset.config';
// todo: add active event to tab
// todo: fix? mixing static and dynamic tabs position tabs in order of creation
export class TabsetComponent {
    /**
     * @param {?} config
     * @param {?} renderer
     * @param {?} elementRef
     */
    constructor(config, renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.clazz = true;
        this.tabs = [];
        this.classMap = {};
        Object.assign(this, config);
    }
    /**
     * if true tabs will be placed vertically
     * @return {?}
     */
    get vertical() {
        return this._vertical;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set vertical(value) {
        this._vertical = value;
        this.setClassMap();
    }
    /**
     * if true tabs fill the container and have a consistent width
     * @return {?}
     */
    get justified() {
        return this._justified;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set justified(value) {
        this._justified = value;
        this.setClassMap();
    }
    /**
     * navigation context class: 'tabs' or 'pills'
     * @return {?}
     */
    get type() {
        return this._type;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set type(value) {
        this._type = value;
        this.setClassMap();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.isDestroyed = true;
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    addTab(tab) {
        this.tabs.push(tab);
        tab.active = this.tabs.length === 1 && typeof tab.active === 'undefined';
    }
    /**
     * @param {?} tab
     * @param {?=} options
     * @return {?}
     */
    removeTab(tab, options = { reselect: true, emit: true }) {
        /** @type {?} */
        const index = this.tabs.indexOf(tab);
        if (index === -1 || this.isDestroyed) {
            return;
        }
        // Select a new tab if the tab to be removed is selected and not destroyed
        if (options.reselect && tab.active && this.hasAvailableTabs(index)) {
            /** @type {?} */
            const newActiveIndex = this.getClosestTabIndex(index);
            this.tabs[newActiveIndex].active = true;
        }
        if (options.emit) {
            tab.removed.emit(tab);
        }
        this.tabs.splice(index, 1);
        if (tab.elementRef.nativeElement.parentNode) {
            this.renderer.removeChild(tab.elementRef.nativeElement.parentNode, tab.elementRef.nativeElement);
        }
    }
    /* tslint:disable-next-line: cyclomatic-complexity */
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    keyNavActions(event, index) {
        /** @type {?} */
        const list = Array.from(this.elementRef.nativeElement.querySelectorAll('.nav-link'));
        // const activeElList = list.filter((el: HTMLElement) => !el.classList.contains('disabled'));
        // tslint:disable-next-line:deprecation
        if (event.keyCode === 13 || event.key === 'Enter' || event.keyCode === 32 || event.key === 'Space') {
            event.preventDefault();
            /** @type {?} */
            const currentTab = list[(index) % list.length];
            currentTab.click();
            return;
        }
        // tslint:disable-next-line:deprecation
        if (event.keyCode === 39 || event.key === 'RightArrow') {
            /** @type {?} */
            let nextTab;
            /** @type {?} */
            let shift = 1;
            do {
                nextTab = list[(index + shift) % list.length];
                shift++;
            } while (nextTab.classList.contains('disabled'));
            nextTab.focus();
            return;
        }
        // tslint:disable-next-line:deprecation
        if (event.keyCode === 37 || event.key === 'LeftArrow') {
            /** @type {?} */
            let previousTab;
            /** @type {?} */
            let shift = 1;
            /** @type {?} */
            let i = index;
            do {
                if ((i - shift) < 0) {
                    i = list.length - 1;
                    previousTab = list[i];
                    shift = 0;
                }
                else {
                    previousTab = list[i - shift];
                }
                shift++;
            } while (previousTab.classList.contains('disabled'));
            previousTab.focus();
            return;
        }
        // tslint:disable-next-line:deprecation
        if (event.keyCode === 36 || event.key === 'Home') {
            event.preventDefault();
            /** @type {?} */
            let firstTab;
            /** @type {?} */
            let shift = 0;
            do {
                firstTab = list[shift % list.length];
                shift++;
            } while (firstTab.classList.contains('disabled'));
            firstTab.focus();
            return;
        }
        // tslint:disable-next-line:deprecation
        if (event.keyCode === 35 || event.key === 'End') {
            event.preventDefault();
            /** @type {?} */
            let lastTab;
            /** @type {?} */
            let shift = 1;
            /** @type {?} */
            let i = index;
            do {
                if ((i - shift) < 0) {
                    i = list.length - 1;
                    lastTab = list[i];
                    shift = 0;
                }
                else {
                    lastTab = list[i - shift];
                }
                shift++;
            } while (lastTab.classList.contains('disabled'));
            lastTab.focus();
            return;
        }
        // tslint:disable-next-line:deprecation
        if (event.keyCode === 46 || event.key === 'Delete') {
            if (this.tabs[index].removable) {
                this.removeTab(this.tabs[index]);
                if (list[index + 1]) {
                    list[(index + 1) % list.length].focus();
                    return;
                }
                if (list[list.length - 1]) {
                    list[0].focus();
                }
            }
        }
    }
    /**
     * @protected
     * @param {?} index
     * @return {?}
     */
    getClosestTabIndex(index) {
        /** @type {?} */
        const tabsLength = this.tabs.length;
        if (!tabsLength) {
            return -1;
        }
        for (let step = 1; step <= tabsLength; step += 1) {
            /** @type {?} */
            const prevIndex = index - step;
            /** @type {?} */
            const nextIndex = index + step;
            if (this.tabs[prevIndex] && !this.tabs[prevIndex].disabled) {
                return prevIndex;
            }
            if (this.tabs[nextIndex] && !this.tabs[nextIndex].disabled) {
                return nextIndex;
            }
        }
        return -1;
    }
    /**
     * @protected
     * @param {?} index
     * @return {?}
     */
    hasAvailableTabs(index) {
        /** @type {?} */
        const tabsLength = this.tabs.length;
        if (!tabsLength) {
            return false;
        }
        for (let i = 0; i < tabsLength; i += 1) {
            if (!this.tabs[i].disabled && i !== index) {
                return true;
            }
        }
        return false;
    }
    /**
     * @protected
     * @return {?}
     */
    setClassMap() {
        this.classMap = {
            'nav-stacked': this.vertical,
            'flex-column': this.vertical,
            'nav-justified': this.justified,
            [`nav-${this.type}`]: true
        };
    }
}
TabsetComponent.decorators = [
    { type: Component, args: [{
                selector: 'tabset',
                template: "<ul class=\"nav\" [ngClass]=\"classMap\" (click)=\"$event.preventDefault()\">\n  <li *ngFor=\"let tabz of tabs; let i = index\" [ngClass]=\"['nav-item', tabz.customClass || '']\"\n      [class.active]=\"tabz.active\" [class.disabled]=\"tabz.disabled\" (keydown)=\"keyNavActions($event, i)\">\n    <a href=\"javascript:void(0);\" class=\"nav-link\"\n       [attr.id]=\"tabz.id ? tabz.id + '-link' : ''\"\n       [class.active]=\"tabz.active\" [class.disabled]=\"tabz.disabled\"\n       (click)=\"tabz.active = true\">\n      <span [ngTransclude]=\"tabz.headingRef\">{{ tabz.heading }}</span>\n      <span *ngIf=\"tabz.removable\" (click)=\"$event.preventDefault(); removeTab(tabz);\" class=\"bs-remove-tab\"> &#10060;</span>\n    </a>\n  </li>\n</ul>\n<div class=\"tab-content\">\n  <ng-content></ng-content>\n</div>\n",
                styles: [":host .nav-tabs .nav-item.disabled a.disabled{cursor:default}"]
            }] }
];
/** @nocollapse */
TabsetComponent.ctorParameters = () => [
    { type: TabsetConfig },
    { type: Renderer2 },
    { type: ElementRef }
];
TabsetComponent.propDecorators = {
    vertical: [{ type: Input }],
    justified: [{ type: Input }],
    type: [{ type: Input }],
    clazz: [{ type: HostBinding, args: ['class.tab-container',] }]
};
if (false) {
    /** @type {?} */
    TabsetComponent.prototype.clazz;
    /** @type {?} */
    TabsetComponent.prototype.tabs;
    /** @type {?} */
    TabsetComponent.prototype.classMap;
    /**
     * @type {?}
     * @protected
     */
    TabsetComponent.prototype.isDestroyed;
    /**
     * @type {?}
     * @protected
     */
    TabsetComponent.prototype._vertical;
    /**
     * @type {?}
     * @protected
     */
    TabsetComponent.prototype._justified;
    /**
     * @type {?}
     * @protected
     */
    TabsetComponent.prototype._type;
    /**
     * @type {?}
     * @private
     */
    TabsetComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    TabsetComponent.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFic2V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1ib290c3RyYXAvdGFicy8iLCJzb3VyY2VzIjpbInRhYnNldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBYSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR2hHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBUS9DLE1BQU0sT0FBTyxlQUFlOzs7Ozs7SUF5QzFCLFlBQ0UsTUFBb0IsRUFDWixRQUFtQixFQUNuQixVQUFzQjtRQUR0QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLGVBQVUsR0FBVixVQUFVLENBQVk7UUFiSSxVQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWpELFNBQUksR0FBbUIsRUFBRSxDQUFDO1FBQzFCLGFBQVEsR0FBK0IsRUFBRSxDQUFDO1FBWXhDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUM7Ozs7O0lBN0NELElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOzs7OztJQUNELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBR0QsSUFDSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7Ozs7O0lBQ0QsSUFBSSxTQUFTLENBQUMsS0FBYztRQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFHRCxJQUNJLElBQUk7UUFDTixPQUFPLElBQUksQ0FB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QUFDLEdBQUcsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsS0FBSyxLQUFLLEVBQUU7Z0JBQ3pDLE9BQU8sSUFBSSxDQUFDO2FBQ2I7U0FDRjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Ozs7SUFFUyxXQUFXO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUc7WUFDZCxhQUFhLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDNUIsYUFBYSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQzVCLGVBQWUsRUFBRSxJQUFJLENBQUMsU0FBUztZQUMvQixDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSTtTQUMzQixDQUFDO0lBQ0osQ0FBQzs7O1lBcFBGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsUUFBUTtnQkFDbEIsNnpCQUFzQzs7YUFFdkM7Ozs7WUFQUSxZQUFZO1lBSDhCLFNBQVM7WUFBRSxVQUFVOzs7dUJBYXJFLEtBQUs7d0JBVUwsS0FBSzttQkFVTCxLQUFLO29CQVNMLFdBQVcsU0FBQyxxQkFBcUI7Ozs7SUFBbEMsZ0NBQWlEOztJQUVqRCwrQkFBMEI7O0lBQzFCLG1DQUEwQzs7Ozs7SUFFMUMsc0NBQStCOzs7OztJQUMvQixvQ0FBNkI7Ozs7O0lBQzdCLHFDQUE4Qjs7Ozs7SUFDOUIsZ0NBQXdCOzs7OztJQUl0QixtQ0FBMkI7Ozs7O0lBQzNCLHFDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkRlc3Ryb3ksIFJlbmRlcmVyMiwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBUYWJEaXJlY3RpdmUgfSBmcm9tICcuL3RhYi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVGFic2V0Q29uZmlnIH0gZnJvbSAnLi90YWJzZXQuY29uZmlnJztcbi8vIHRvZG86IGFkZCBhY3RpdmUgZXZlbnQgdG8gdGFiXG4vLyB0b2RvOiBmaXg/IG1peGluZyBzdGF0aWMgYW5kIGR5bmFtaWMgdGFicyBwb3NpdGlvbiB0YWJzIGluIG9yZGVyIG9mIGNyZWF0aW9uXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0YWJzZXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vdGFic2V0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGFicy5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVGFic2V0Q29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgLyoqIGlmIHRydWUgdGFicyB3aWxsIGJlIHBsYWNlZCB2ZXJ0aWNhbGx5ICovXG4gIEBJbnB1dCgpXG4gIGdldCB2ZXJ0aWNhbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdmVydGljYWw7XG4gIH1cbiAgc2V0IHZlcnRpY2FsKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fdmVydGljYWwgPSB2YWx1ZTtcbiAgICB0aGlzLnNldENsYXNzTWFwKCk7XG4gIH1cblxuICAvKiogaWYgdHJ1ZSB0YWJzIGZpbGwgdGhlIGNvbnRhaW5lciBhbmQgaGF2ZSBhIGNvbnNpc3RlbnQgd2lkdGggKi9cbiAgQElucHV0KClcbiAgZ2V0IGp1c3RpZmllZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fanVzdGlmaWVkO1xuICB9XG4gIHNldCBqdXN0aWZpZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9qdXN0aWZpZWQgPSB2YWx1ZTtcbiAgICB0aGlzLnNldENsYXNzTWFwKCk7XG4gIH1cblxuICAvKiogbmF2aWdhdGlvbiBjb250ZXh0IGNsYXNzOiAndGFicycgb3IgJ3BpbGxzJyAqL1xuICBASW5wdXQoKVxuICBnZXQgdHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl90eXBlO1xuICB9XG4gIHNldCB0eXBlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl90eXBlID0gdmFsdWU7XG4gICAgdGhpcy5zZXRDbGFzc01hcCgpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50YWItY29udGFpbmVyJykgY2xhenogPSB0cnVlO1xuXG4gIHRhYnM6IFRhYkRpcmVjdGl2ZVtdID0gW107XG4gIGNsYXNzTWFwOiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9O1xuXG4gIHByb3RlY3RlZCBpc0Rlc3Ryb3llZDogYm9vbGVhbjtcbiAgcHJvdGVjdGVkIF92ZXJ0aWNhbDogYm9vbGVhbjtcbiAgcHJvdGVjdGVkIF9qdXN0aWZpZWQ6IGJvb2xlYW47XG4gIHByb3RlY3RlZCBfdHlwZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGNvbmZpZzogVGFic2V0Q29uZmlnLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWZcbiAgKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBjb25maWcpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5pc0Rlc3Ryb3llZCA9IHRydWU7XG4gIH1cblxuICBhZGRUYWIodGFiOiBUYWJEaXJlY3RpdmUpOiB2b2lkIHtcbiAgICB0aGlzLnRhYnMucHVzaCh0YWIpO1xuICAgIHRhYi5hY3RpdmUgPSB0aGlzLnRhYnMubGVuZ3RoID09PSAxICYmIHR5cGVvZiB0YWIuYWN0aXZlID09PSAndW5kZWZpbmVkJztcbiAgfVxuXG4gIHJlbW92ZVRhYihcbiAgICB0YWI6IFRhYkRpcmVjdGl2ZSxcbiAgICBvcHRpb25zID0geyByZXNlbGVjdDogdHJ1ZSwgZW1pdDogdHJ1ZSB9XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy50YWJzLmluZGV4T2YodGFiKTtcbiAgICBpZiAoaW5kZXggPT09IC0xIHx8IHRoaXMuaXNEZXN0cm95ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gU2VsZWN0IGEgbmV3IHRhYiBpZiB0aGUgdGFiIHRvIGJlIHJlbW92ZWQgaXMgc2VsZWN0ZWQgYW5kIG5vdCBkZXN0cm95ZWRcbiAgICBpZiAob3B0aW9ucy5yZXNlbGVjdCAmJiB0YWIuYWN0aXZlICYmIHRoaXMuaGFzQXZhaWxhYmxlVGFicyhpbmRleCkpIHtcbiAgICAgIGNvbnN0IG5ld0FjdGl2ZUluZGV4ID0gdGhpcy5nZXRDbG9zZXN0VGFiSW5kZXgoaW5kZXgpO1xuICAgICAgdGhpcy50YWJzW25ld0FjdGl2ZUluZGV4XS5hY3RpdmUgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5lbWl0KSB7XG4gICAgICB0YWIucmVtb3ZlZC5lbWl0KHRhYik7XG4gICAgfVxuICAgIHRoaXMudGFicy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIGlmICh0YWIuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGUpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQoXG4gICAgICAgIHRhYi5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZSxcbiAgICAgICAgdGFiLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGN5Y2xvbWF0aWMtY29tcGxleGl0eSAqL1xuICBrZXlOYXZBY3Rpb25zKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBpbmRleDogbnVtYmVyKSB7XG4gICAgY29uc3QgbGlzdDogSFRNTEVsZW1lbnRbXSA9IEFycmF5LmZyb20odGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5hdi1saW5rJykpO1xuICAgIC8vIGNvbnN0IGFjdGl2ZUVsTGlzdCA9IGxpc3QuZmlsdGVyKChlbDogSFRNTEVsZW1lbnQpID0+ICFlbC5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpO1xuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzIHx8IGV2ZW50LmtleSA9PT0gJ0VudGVyJyB8fCBldmVudC5rZXlDb2RlID09PSAzMiB8fCBldmVudC5rZXkgPT09ICdTcGFjZScpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb25zdCBjdXJyZW50VGFiID0gbGlzdFsoaW5kZXgpICUgbGlzdC5sZW5ndGhdO1xuICAgICAgY3VycmVudFRhYi5jbGljaygpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5IHx8IGV2ZW50LmtleSA9PT0gJ1JpZ2h0QXJyb3cnKSB7XG4gICAgICBsZXQgbmV4dFRhYjogYW55O1xuICAgICAgbGV0IHNoaWZ0ID0gMTtcblxuICAgICAgZG8ge1xuICAgICAgICBuZXh0VGFiID0gbGlzdFsoaW5kZXggKyBzaGlmdCkgJSBsaXN0Lmxlbmd0aF07XG5cbiAgICAgICAgc2hpZnQrKztcbiAgICAgIH0gd2hpbGUgKG5leHRUYWIuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKTtcblxuICAgICAgbmV4dFRhYi5mb2N1cygpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM3IHx8IGV2ZW50LmtleSA9PT0gJ0xlZnRBcnJvdycpIHtcbiAgICAgIGxldCBwcmV2aW91c1RhYjogYW55O1xuICAgICAgbGV0IHNoaWZ0ID0gMTtcbiAgICAgIGxldCBpID0gaW5kZXg7XG5cbiAgICAgIGRvIHtcbiAgICAgICAgaWYgKChpIC0gc2hpZnQpIDwgMCkge1xuICAgICAgICAgIGkgPSBsaXN0Lmxlbmd0aCAtIDE7XG4gICAgICAgICAgcHJldmlvdXNUYWIgPSBsaXN0W2ldO1xuICAgICAgICAgIHNoaWZ0ID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcmV2aW91c1RhYiA9IGxpc3RbaSAtIHNoaWZ0XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNoaWZ0Kys7XG4gICAgICB9IHdoaWxlIChwcmV2aW91c1RhYi5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpO1xuXG4gICAgICBwcmV2aW91c1RhYi5mb2N1cygpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM2IHx8IGV2ZW50LmtleSA9PT0gJ0hvbWUnKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBsZXQgZmlyc3RUYWI6IGFueTtcbiAgICAgIGxldCBzaGlmdCA9IDA7XG5cbiAgICAgIGRvIHtcbiAgICAgICAgZmlyc3RUYWIgPSBsaXN0W3NoaWZ0ICUgbGlzdC5sZW5ndGhdO1xuXG4gICAgICAgIHNoaWZ0Kys7XG4gICAgICB9IHdoaWxlIChmaXJzdFRhYi5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpO1xuXG4gICAgICBmaXJzdFRhYi5mb2N1cygpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM1IHx8IGV2ZW50LmtleSA9PT0gJ0VuZCcpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGxldCBsYXN0VGFiOiBhbnk7XG4gICAgICBsZXQgc2hpZnQgPSAxO1xuICAgICAgbGV0IGkgPSBpbmRleDtcblxuICAgICAgZG8ge1xuICAgICAgICBpZiAoKGkgLSBzaGlmdCkgPCAwKSB7XG4gICAgICAgICAgaSA9IGxpc3QubGVuZ3RoIC0gMTtcbiAgICAgICAgICBsYXN0VGFiID0gbGlzdFtpXTtcbiAgICAgICAgICBzaGlmdCA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGFzdFRhYiA9IGxpc3RbaSAtIHNoaWZ0XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNoaWZ0Kys7XG4gICAgICB9IHdoaWxlIChsYXN0VGFiLmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSk7XG5cbiAgICAgIGxhc3RUYWIuZm9jdXMoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvblxuICAgIGlmIChldmVudC5rZXlDb2RlID09PSA0NiB8fCBldmVudC5rZXkgPT09ICdEZWxldGUnKSB7XG4gICAgICBpZiAodGhpcy50YWJzW2luZGV4XS5yZW1vdmFibGUpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVUYWIodGhpcy50YWJzW2luZGV4XSk7XG5cbiAgICAgICAgaWYgKGxpc3RbaW5kZXggKyAxXSkge1xuICAgICAgICAgIGxpc3RbKGluZGV4ICsgMSkgJSBsaXN0Lmxlbmd0aF0uZm9jdXMoKTtcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaXN0W2xpc3QubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgICBsaXN0WzBdLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0Q2xvc2VzdFRhYkluZGV4KGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IHRhYnNMZW5ndGggPSB0aGlzLnRhYnMubGVuZ3RoO1xuICAgIGlmICghdGFic0xlbmd0aCkge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIGZvciAobGV0IHN0ZXAgPSAxOyBzdGVwIDw9IHRhYnNMZW5ndGg7IHN0ZXAgKz0gMSkge1xuICAgICAgY29uc3QgcHJldkluZGV4ID0gaW5kZXggLSBzdGVwO1xuICAgICAgY29uc3QgbmV4dEluZGV4ID0gaW5kZXggKyBzdGVwO1xuICAgICAgaWYgKHRoaXMudGFic1twcmV2SW5kZXhdICYmICF0aGlzLnRhYnNbcHJldkluZGV4XS5kaXNhYmxlZCkge1xuICAgICAgICByZXR1cm4gcHJldkluZGV4O1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMudGFic1tuZXh0SW5kZXhdICYmICF0aGlzLnRhYnNbbmV4dEluZGV4XS5kaXNhYmxlZCkge1xuICAgICAgICByZXR1cm4gbmV4dEluZGV4O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIHByb3RlY3RlZCBoYXNBdmFpbGFibGVUYWJzKGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBjb25zdCB0YWJzTGVuZ3RoID0gdGhpcy50YWJzLmxlbmd0aDtcbiAgICBpZiAoIXRhYnNMZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhYnNMZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKCF0aGlzLnRhYnNbaV0uZGlzYWJsZWQgJiYgaSAhPT0gaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldENsYXNzTWFwKCk6IHZvaWQge1xuICAgIHRoaXMuY2xhc3NNYXAgPSB7XG4gICAgICAnbmF2LXN0YWNrZWQnOiB0aGlzLnZlcnRpY2FsLFxuICAgICAgJ2ZsZXgtY29sdW1uJzogdGhpcy52ZXJ0aWNhbCxcbiAgICAgICduYXYtanVzdGlmaWVkJzogdGhpcy5qdXN0aWZpZWQsXG4gICAgICBbYG5hdi0ke3RoaXMudHlwZX1gXTogdHJ1ZVxuICAgIH07XG4gIH1cbn1cbiJdfQ==