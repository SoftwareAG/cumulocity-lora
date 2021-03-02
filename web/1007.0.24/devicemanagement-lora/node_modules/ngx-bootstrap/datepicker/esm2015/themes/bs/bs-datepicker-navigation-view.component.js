/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BsNavigationDirection } from '../../models';
export class BsDatepickerNavigationViewComponent {
    constructor() {
        this.onNavigate = new EventEmitter();
        this.onViewMode = new EventEmitter();
    }
    /**
     * @param {?} down
     * @return {?}
     */
    navTo(down) {
        this.onNavigate.emit(down ? BsNavigationDirection.DOWN : BsNavigationDirection.UP);
    }
    /**
     * @param {?} viewMode
     * @return {?}
     */
    view(viewMode) {
        this.onViewMode.emit(viewMode);
    }
}
BsDatepickerNavigationViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'bs-datepicker-navigation-view',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <button class="previous"
            [disabled]="calendar.disableLeftArrow"
            [style.visibility]="calendar.hideLeftArrow ? 'hidden' : 'visible'"
            (click)="navTo(true)"><span>&lsaquo;</span>
    </button>

    &#8203;  <!-- zero-width space needed for correct alignement
                  with preserveWhitespaces: false in Angular -->

    <button class="current"
            *ngIf="calendar.monthTitle"
            (click)="view('month')"
    ><span>{{ calendar.monthTitle }}</span>
    </button>

    &#8203;  <!-- zero-width space needed for correct alignement
                  with preserveWhitespaces: false in Angular -->

    <button class="current" (click)="view('year')"
    ><span>{{ calendar.yearTitle }}</span></button>

    &#8203;  <!-- zero-width space needed for correct alignement
                  with preserveWhitespaces: false in Angular -->

    <button class="next"
            [disabled]="calendar.disableRightArrow"
            [style.visibility]="calendar.hideRightArrow ? 'hidden' : 'visible'"
            (click)="navTo(false)"><span>&rsaquo;</span>
    </button>
  `
            }] }
];
BsDatepickerNavigationViewComponent.propDecorators = {
    calendar: [{ type: Input }],
    onNavigate: [{ type: Output }],
    onViewMode: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    BsDatepickerNavigationViewComponent.prototype.calendar;
    /** @type {?} */
    BsDatepickerNavigationViewComponent.prototype.onNavigate;
    /** @type {?} */
    BsDatepickerNavigationViewComponent.prototype.onViewMode;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWJvb3RzdHJhcC9kYXRlcGlja2VyLyIsInNvdXJjZXMiOlsidGhlbWVzL2JzL2JzLWRhdGVwaWNrZXItbmF2aWdhdGlvbi12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUVMLHFCQUFxQixFQUV0QixNQUFNLGNBQWMsQ0FBQztBQXFDdEIsTUFBTSxPQUFPLG1DQUFtQztJQW5DaEQ7UUFzQ1ksZUFBVSxHQUFHLElBQUksWUFBWSxFQUF5QixDQUFDO1FBQ3ZELGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBd0IsQ0FBQztJQVdsRSxDQUFDOzs7OztJQVRDLEtBQUssQ0FBQyxJQUFhO1FBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUNsQixJQUFJLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUM3RCxDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFFRCxJQUFJLENBQUMsUUFBOEI7UUFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakMsQ0FBQzs7O1lBakRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsK0JBQStCO2dCQUN6QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4QlQ7YUFDRjs7O3VCQUVFLEtBQUs7eUJBRUwsTUFBTTt5QkFDTixNQUFNOzs7O0lBSFAsdURBQXlDOztJQUV6Qyx5REFBaUU7O0lBQ2pFLHlEQUFnRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEJzRGF0ZXBpY2tlclZpZXdNb2RlLFxuICBCc05hdmlnYXRpb25EaXJlY3Rpb24sXG4gIERheXNDYWxlbmRhclZpZXdNb2RlbFxufSBmcm9tICcuLi8uLi9tb2RlbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdicy1kYXRlcGlja2VyLW5hdmlnYXRpb24tdmlldycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxidXR0b24gY2xhc3M9XCJwcmV2aW91c1wiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiY2FsZW5kYXIuZGlzYWJsZUxlZnRBcnJvd1wiXG4gICAgICAgICAgICBbc3R5bGUudmlzaWJpbGl0eV09XCJjYWxlbmRhci5oaWRlTGVmdEFycm93ID8gJ2hpZGRlbicgOiAndmlzaWJsZSdcIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm5hdlRvKHRydWUpXCI+PHNwYW4+JmxzYXF1bzs8L3NwYW4+XG4gICAgPC9idXR0b24+XG5cbiAgICAmIzgyMDM7ICA8IS0tIHplcm8td2lkdGggc3BhY2UgbmVlZGVkIGZvciBjb3JyZWN0IGFsaWduZW1lbnRcbiAgICAgICAgICAgICAgICAgIHdpdGggcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UgaW4gQW5ndWxhciAtLT5cblxuICAgIDxidXR0b24gY2xhc3M9XCJjdXJyZW50XCJcbiAgICAgICAgICAgICpuZ0lmPVwiY2FsZW5kYXIubW9udGhUaXRsZVwiXG4gICAgICAgICAgICAoY2xpY2spPVwidmlldygnbW9udGgnKVwiXG4gICAgPjxzcGFuPnt7IGNhbGVuZGFyLm1vbnRoVGl0bGUgfX08L3NwYW4+XG4gICAgPC9idXR0b24+XG5cbiAgICAmIzgyMDM7ICA8IS0tIHplcm8td2lkdGggc3BhY2UgbmVlZGVkIGZvciBjb3JyZWN0IGFsaWduZW1lbnRcbiAgICAgICAgICAgICAgICAgIHdpdGggcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UgaW4gQW5ndWxhciAtLT5cblxuICAgIDxidXR0b24gY2xhc3M9XCJjdXJyZW50XCIgKGNsaWNrKT1cInZpZXcoJ3llYXInKVwiXG4gICAgPjxzcGFuPnt7IGNhbGVuZGFyLnllYXJUaXRsZSB9fTwvc3Bhbj48L2J1dHRvbj5cblxuICAgICYjODIwMzsgIDwhLS0gemVyby13aWR0aCBzcGFjZSBuZWVkZWQgZm9yIGNvcnJlY3QgYWxpZ25lbWVudFxuICAgICAgICAgICAgICAgICAgd2l0aCBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSBpbiBBbmd1bGFyIC0tPlxuXG4gICAgPGJ1dHRvbiBjbGFzcz1cIm5leHRcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImNhbGVuZGFyLmRpc2FibGVSaWdodEFycm93XCJcbiAgICAgICAgICAgIFtzdHlsZS52aXNpYmlsaXR5XT1cImNhbGVuZGFyLmhpZGVSaWdodEFycm93ID8gJ2hpZGRlbicgOiAndmlzaWJsZSdcIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm5hdlRvKGZhbHNlKVwiPjxzcGFuPiZyc2FxdW87PC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIEJzRGF0ZXBpY2tlck5hdmlnYXRpb25WaWV3Q29tcG9uZW50IHtcbiAgQElucHV0KCkgY2FsZW5kYXI6IERheXNDYWxlbmRhclZpZXdNb2RlbDtcblxuICBAT3V0cHV0KCkgb25OYXZpZ2F0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8QnNOYXZpZ2F0aW9uRGlyZWN0aW9uPigpO1xuICBAT3V0cHV0KCkgb25WaWV3TW9kZSA9IG5ldyBFdmVudEVtaXR0ZXI8QnNEYXRlcGlja2VyVmlld01vZGU+KCk7XG5cbiAgbmF2VG8oZG93bjogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMub25OYXZpZ2F0ZS5lbWl0KFxuICAgICAgZG93biA/IEJzTmF2aWdhdGlvbkRpcmVjdGlvbi5ET1dOIDogQnNOYXZpZ2F0aW9uRGlyZWN0aW9uLlVQXG4gICAgKTtcbiAgfVxuXG4gIHZpZXcodmlld01vZGU6IEJzRGF0ZXBpY2tlclZpZXdNb2RlKTogdm9pZCB7XG4gICAgdGhpcy5vblZpZXdNb2RlLmVtaXQodmlld01vZGUpO1xuICB9XG59XG4iXX0=