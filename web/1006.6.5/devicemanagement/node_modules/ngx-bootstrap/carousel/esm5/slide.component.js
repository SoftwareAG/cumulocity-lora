/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, HostBinding, Input } from '@angular/core';
import { CarouselComponent } from './carousel.component';
var SlideComponent = /** @class */ (function () {
    function SlideComponent(carousel) {
        this.itemWidth = '100%';
        this.order = 0;
        /**
         * Wraps element by appropriate CSS classes
         */
        this.addClass = true;
        this.carousel = carousel;
    }
    /** Fires changes in container collection after adding a new slide instance */
    /**
     * Fires changes in container collection after adding a new slide instance
     * @return {?}
     */
    SlideComponent.prototype.ngOnInit = /**
     * Fires changes in container collection after adding a new slide instance
     * @return {?}
     */
    function () {
        this.carousel.addSlide(this);
        this.itemWidth = 100 / this.carousel.itemsPerSlide + "%";
    };
    /** Fires changes in container collection after removing of this slide instance */
    /**
     * Fires changes in container collection after removing of this slide instance
     * @return {?}
     */
    SlideComponent.prototype.ngOnDestroy = /**
     * Fires changes in container collection after removing of this slide instance
     * @return {?}
     */
    function () {
        this.carousel.removeSlide(this);
    };
    SlideComponent.decorators = [
        { type: Component, args: [{
                    selector: 'slide',
                    template: "\n    <div [class.active]=\"active\" class=\"item\">\n      <ng-content></ng-content>\n    </div>\n  ",
                    host: {
                        '[attr.aria-hidden]': '!active'
                    }
                }] }
    ];
    /** @nocollapse */
    SlideComponent.ctorParameters = function () { return [
        { type: CarouselComponent }
    ]; };
    SlideComponent.propDecorators = {
        active: [{ type: HostBinding, args: ['class.active',] }, { type: Input }],
        itemWidth: [{ type: HostBinding, args: ['style.width',] }],
        order: [{ type: HostBinding, args: ['style.order',] }],
        addClass: [{ type: HostBinding, args: ['class.item',] }, { type: HostBinding, args: ['class.carousel-item',] }]
    };
    return SlideComponent;
}());
export { SlideComponent };
if (false) {
    /**
     * Is current slide active
     * @type {?}
     */
    SlideComponent.prototype.active;
    /** @type {?} */
    SlideComponent.prototype.itemWidth;
    /** @type {?} */
    SlideComponent.prototype.order;
    /**
     * Wraps element by appropriate CSS classes
     * @type {?}
     */
    SlideComponent.prototype.addClass;
    /**
     * Link to Parent(container-collection) component
     * @type {?}
     * @protected
     */
    SlideComponent.prototype.carousel;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWJvb3RzdHJhcC9jYXJvdXNlbC8iLCJzb3VyY2VzIjpbInNsaWRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxXQUFXLEVBRVgsS0FBSyxFQUVOLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXpEO0lBNEJFLHdCQUFZLFFBQTJCO1FBWFgsY0FBUyxHQUFHLE1BQU0sQ0FBQztRQUNuQixVQUFLLEdBQUcsQ0FBQyxDQUFDOzs7O1FBS3RDLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFNZCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRUQsOEVBQThFOzs7OztJQUM5RSxpQ0FBUTs7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLE1BQUcsQ0FBQztJQUMzRCxDQUFDO0lBRUQsa0ZBQWtGOzs7OztJQUNsRixvQ0FBVzs7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7Z0JBekNGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsT0FBTztvQkFDakIsUUFBUSxFQUFFLHVHQUlUO29CQUNELElBQUksRUFBRTt3QkFDSixvQkFBb0IsRUFBRSxTQUFTO3FCQUNoQztpQkFDRjs7OztnQkFaUSxpQkFBaUI7Ozt5QkFldkIsV0FBVyxTQUFDLGNBQWMsY0FDMUIsS0FBSzs0QkFHTCxXQUFXLFNBQUMsYUFBYTt3QkFDekIsV0FBVyxTQUFDLGFBQWE7MkJBR3pCLFdBQVcsU0FBQyxZQUFZLGNBQ3hCLFdBQVcsU0FBQyxxQkFBcUI7O0lBb0JwQyxxQkFBQztDQUFBLEFBMUNELElBMENDO1NBL0JZLGNBQWM7Ozs7OztJQUV6QixnQ0FFZ0I7O0lBRWhCLG1DQUErQzs7SUFDL0MsK0JBQXNDOzs7OztJQUd0QyxrQ0FFZ0I7Ozs7OztJQUdoQixrQ0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEhvc3RCaW5kaW5nLFxuICBPbkRlc3Ryb3ksXG4gIElucHV0LFxuICBPbkluaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENhcm91c2VsQ29tcG9uZW50IH0gZnJvbSAnLi9jYXJvdXNlbC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzbGlkZScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBbY2xhc3MuYWN0aXZlXT1cImFjdGl2ZVwiIGNsYXNzPVwiaXRlbVwiPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1thdHRyLmFyaWEtaGlkZGVuXSc6ICchYWN0aXZlJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIFNsaWRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvKiogSXMgY3VycmVudCBzbGlkZSBhY3RpdmUgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hY3RpdmUnKVxuICBASW5wdXQoKVxuICBhY3RpdmU6IGJvb2xlYW47XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aCcpIGl0ZW1XaWR0aCA9ICcxMDAlJztcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5vcmRlcicpIG9yZGVyID0gMDtcblxuICAvKiogV3JhcHMgZWxlbWVudCBieSBhcHByb3ByaWF0ZSBDU1MgY2xhc3NlcyAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLml0ZW0nKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmNhcm91c2VsLWl0ZW0nKVxuICBhZGRDbGFzcyA9IHRydWU7XG5cbiAgLyoqIExpbmsgdG8gUGFyZW50KGNvbnRhaW5lci1jb2xsZWN0aW9uKSBjb21wb25lbnQgKi9cbiAgcHJvdGVjdGVkIGNhcm91c2VsOiBDYXJvdXNlbENvbXBvbmVudDtcblxuICBjb25zdHJ1Y3RvcihjYXJvdXNlbDogQ2Fyb3VzZWxDb21wb25lbnQpIHtcbiAgICB0aGlzLmNhcm91c2VsID0gY2Fyb3VzZWw7XG4gIH1cblxuICAvKiogRmlyZXMgY2hhbmdlcyBpbiBjb250YWluZXIgY29sbGVjdGlvbiBhZnRlciBhZGRpbmcgYSBuZXcgc2xpZGUgaW5zdGFuY2UgKi9cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jYXJvdXNlbC5hZGRTbGlkZSh0aGlzKTtcbiAgICB0aGlzLml0ZW1XaWR0aCA9IGAkezEwMCAvIHRoaXMuY2Fyb3VzZWwuaXRlbXNQZXJTbGlkZX0lYDtcbiAgfVxuXG4gIC8qKiBGaXJlcyBjaGFuZ2VzIGluIGNvbnRhaW5lciBjb2xsZWN0aW9uIGFmdGVyIHJlbW92aW5nIG9mIHRoaXMgc2xpZGUgaW5zdGFuY2UgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5jYXJvdXNlbC5yZW1vdmVTbGlkZSh0aGlzKTtcbiAgfVxufVxuIl19