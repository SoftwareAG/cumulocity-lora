/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, HostBinding, Input } from '@angular/core';
import { CarouselComponent } from './carousel.component';
export class SlideComponent {
    /**
     * @param {?} carousel
     */
    constructor(carousel) {
        this.itemWidth = '100%';
        this.order = 0;
        /**
         * Wraps element by appropriate CSS classes
         */
        this.addClass = true;
        this.carousel = carousel;
    }
    /**
     * Fires changes in container collection after adding a new slide instance
     * @return {?}
     */
    ngOnInit() {
        this.carousel.addSlide(this);
        this.itemWidth = `${100 / this.carousel.itemsPerSlide}%`;
    }
    /**
     * Fires changes in container collection after removing of this slide instance
     * @return {?}
     */
    ngOnDestroy() {
        this.carousel.removeSlide(this);
    }
}
SlideComponent.decorators = [
    { type: Component, args: [{
                selector: 'slide',
                template: `
    <div [class.active]="active" class="item">
      <ng-content></ng-content>
    </div>
  `,
                host: {
                    '[attr.aria-hidden]': '!active'
                }
            }] }
];
/** @nocollapse */
SlideComponent.ctorParameters = () => [
    { type: CarouselComponent }
];
SlideComponent.propDecorators = {
    active: [{ type: HostBinding, args: ['class.active',] }, { type: Input }],
    itemWidth: [{ type: HostBinding, args: ['style.width',] }],
    order: [{ type: HostBinding, args: ['style.order',] }],
    addClass: [{ type: HostBinding, args: ['class.item',] }, { type: HostBinding, args: ['class.carousel-item',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWJvb3RzdHJhcC9jYXJvdXNlbC8iLCJzb3VyY2VzIjpbInNsaWRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxXQUFXLEVBRVgsS0FBSyxFQUVOLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBYXpELE1BQU0sT0FBTyxjQUFjOzs7O0lBaUJ6QixZQUFZLFFBQTJCO1FBWFgsY0FBUyxHQUFHLE1BQU0sQ0FBQztRQUNuQixVQUFLLEdBQUcsQ0FBQyxDQUFDOzs7O1FBS3RDLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFNZCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDOzs7OztJQUdELFFBQVE7UUFDTixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxHQUFHLENBQUM7SUFDM0QsQ0FBQzs7Ozs7SUFHRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7O1lBekNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsT0FBTztnQkFDakIsUUFBUSxFQUFFOzs7O0dBSVQ7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLG9CQUFvQixFQUFFLFNBQVM7aUJBQ2hDO2FBQ0Y7Ozs7WUFaUSxpQkFBaUI7OztxQkFldkIsV0FBVyxTQUFDLGNBQWMsY0FDMUIsS0FBSzt3QkFHTCxXQUFXLFNBQUMsYUFBYTtvQkFDekIsV0FBVyxTQUFDLGFBQWE7dUJBR3pCLFdBQVcsU0FBQyxZQUFZLGNBQ3hCLFdBQVcsU0FBQyxxQkFBcUI7Ozs7Ozs7SUFUbEMsZ0NBRWdCOztJQUVoQixtQ0FBK0M7O0lBQy9DLCtCQUFzQzs7Ozs7SUFHdEMsa0NBRWdCOzs7Ozs7SUFHaEIsa0NBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBIb3N0QmluZGluZyxcbiAgT25EZXN0cm95LFxuICBJbnB1dCxcbiAgT25Jbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDYXJvdXNlbENvbXBvbmVudCB9IGZyb20gJy4vY2Fyb3VzZWwuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2xpZGUnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW2NsYXNzLmFjdGl2ZV09XCJhY3RpdmVcIiBjbGFzcz1cIml0ZW1cIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbYXR0ci5hcmlhLWhpZGRlbl0nOiAnIWFjdGl2ZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBTbGlkZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLyoqIElzIGN1cnJlbnQgc2xpZGUgYWN0aXZlICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYWN0aXZlJylcbiAgQElucHV0KClcbiAgYWN0aXZlOiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgnKSBpdGVtV2lkdGggPSAnMTAwJSc7XG4gIEBIb3N0QmluZGluZygnc3R5bGUub3JkZXInKSBvcmRlciA9IDA7XG5cbiAgLyoqIFdyYXBzIGVsZW1lbnQgYnkgYXBwcm9wcmlhdGUgQ1NTIGNsYXNzZXMgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5pdGVtJylcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5jYXJvdXNlbC1pdGVtJylcbiAgYWRkQ2xhc3MgPSB0cnVlO1xuXG4gIC8qKiBMaW5rIHRvIFBhcmVudChjb250YWluZXItY29sbGVjdGlvbikgY29tcG9uZW50ICovXG4gIHByb3RlY3RlZCBjYXJvdXNlbDogQ2Fyb3VzZWxDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3IoY2Fyb3VzZWw6IENhcm91c2VsQ29tcG9uZW50KSB7XG4gICAgdGhpcy5jYXJvdXNlbCA9IGNhcm91c2VsO1xuICB9XG5cbiAgLyoqIEZpcmVzIGNoYW5nZXMgaW4gY29udGFpbmVyIGNvbGxlY3Rpb24gYWZ0ZXIgYWRkaW5nIGEgbmV3IHNsaWRlIGluc3RhbmNlICovXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY2Fyb3VzZWwuYWRkU2xpZGUodGhpcyk7XG4gICAgdGhpcy5pdGVtV2lkdGggPSBgJHsxMDAgLyB0aGlzLmNhcm91c2VsLml0ZW1zUGVyU2xpZGV9JWA7XG4gIH1cblxuICAvKiogRmlyZXMgY2hhbmdlcyBpbiBjb250YWluZXIgY29sbGVjdGlvbiBhZnRlciByZW1vdmluZyBvZiB0aGlzIHNsaWRlIGluc3RhbmNlICovXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuY2Fyb3VzZWwucmVtb3ZlU2xpZGUodGhpcyk7XG4gIH1cbn1cbiJdfQ==