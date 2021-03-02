/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:max-line-length
import { Component } from '@angular/core';
export class BsTimepickerViewComponent {
    constructor() {
        this.ampm = 'ok';
        this.hours = 0;
        this.minutes = 0;
    }
}
BsTimepickerViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'bs-timepicker',
                template: `
    <div class="bs-timepicker-container">
      <div class="bs-timepicker-controls">
        <button class="bs-decrease">-</button>
        <input type="text" [value]="hours" placeholder="00">
        <button class="bs-increase">+</button>
      </div>
      <div class="bs-timepicker-controls">
        <button class="bs-decrease">-</button>
        <input type="text" [value]="minutes" placeholder="00">
        <button class="bs-increase">+</button>
      </div>
      <button class="switch-time-format">{{ ampm }}
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAABSElEQVQYV3XQPUvDUBQG4HNuagtVqc6KgouCv6GIuIntYBLB9hcIQpLStCAIV7DYmpTcRWcXqZio3Vwc/UCc/QEqfgyKGbr0I7nS1EiHeqYzPO/h5SD0jaxUZjmSLCB+OFb+UFINFwASAEAdpu9gaGXVyAHHFQBkHpKHc6a9dzECvADyY9sqlAMsK9W0jzxDXqeytr3mhQckxSji27TJJ5/rPmIpwJJq3HrtduriYOurv1a4i1p5HnhkG9OFymi0ReoO05cGwb+ayv4dysVygjeFmsP05f8wpZQ8fsdvfmuY9zjWSNqUtgYFVnOVReILYoBFzdQI5/GGFzNHhGbeZnopDGU29sZbscgldmC99w35VOATTycIMMcBXIfpSVGzZhA6C8hh00conln6VQ9TGgV32OEAKQC4DrBq7CJwd0ggR7Vq/rPrfgB+C3sGypY5DAAAAABJRU5ErkJggg=="
          alt="">
      </button>
    </div>
  `
            }] }
];
if (false) {
    /** @type {?} */
    BsTimepickerViewComponent.prototype.ampm;
    /** @type {?} */
    BsTimepickerViewComponent.prototype.hours;
    /** @type {?} */
    BsTimepickerViewComponent.prototype.minutes;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtdGltZXBpY2tlci12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1ib290c3RyYXAvZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbInRoZW1lcy9icy9icy10aW1lcGlja2VyLXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQXdCMUMsTUFBTSxPQUFPLHlCQUF5QjtJQXRCdEM7UUF1QkUsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFVBQUssR0FBRyxDQUFDLENBQUM7UUFDVixZQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQ2QsQ0FBQzs7O1lBMUJBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQlQ7YUFDRjs7OztJQUVDLHlDQUFZOztJQUNaLDBDQUFVOztJQUNWLDRDQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6bWF4LWxpbmUtbGVuZ3RoXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYnMtdGltZXBpY2tlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImJzLXRpbWVwaWNrZXItY29udGFpbmVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiYnMtdGltZXBpY2tlci1jb250cm9sc1wiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnMtZGVjcmVhc2VcIj4tPC9idXR0b24+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIFt2YWx1ZV09XCJob3Vyc1wiIHBsYWNlaG9sZGVyPVwiMDBcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJzLWluY3JlYXNlXCI+KzwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYnMtdGltZXBpY2tlci1jb250cm9sc1wiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnMtZGVjcmVhc2VcIj4tPC9idXR0b24+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIFt2YWx1ZV09XCJtaW51dGVzXCIgcGxhY2Vob2xkZXI9XCIwMFwiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnMtaW5jcmVhc2VcIj4rPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJzd2l0Y2gtdGltZS1mb3JtYXRcIj57eyBhbXBtIH19XG4gICAgICAgIDxpbWdcbiAgICAgICAgICBzcmM9XCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFzQUFBQUtDQVlBQUFCaThLU0RBQUFCU0VsRVFWUVlWM1hRUFV2RFVCUUc0SE51YWd0VnFjNktnb3VDdjZHSXVJbnRZQkxCOWhjSVFwTFN0Q0FJVjdEWW1wVGNSV2NYcVppbzNWd2MvVUNjL1FFcWZneUtHYnIwSTduUzFFaUhlcVl6UE8vaDVTRDBqYXhVWmptU0xDQitPRmIrVUZJTkZ3QVNBRUFkcHU5Z2FHWFZ5QUhIRlFCa0hwS0hjNmE5ZHpFQ3ZBRHlZOXNxbEFNc0s5VzBqenhEWHFleXRyM21oUWNreFNqaTI3VEpKNS9yUG1JcHdKSnEzSHJ0ZHVyaVlPdXJ2MWE0aTFwNUhuaGtHOU9GeW1pMFJlb08wNWNHd2IrYXl2NGR5c1Z5Z2plRm1zUDA1Zjh3cFpROGZzZHZmbXVZOXpqV1NOcVV0Z1lGVm5PVlJlSUxZb0JGemRRSTUvR0dGek5IaEdiZVpub3BER1UyOXNaYnNjZ2xkbUM5OXczNVZPQVRUeWNJTU1jQlhJZnBTVkd6WmhBNkM4aGgwMGNvbmxuNlZROVRHZ1YzMk9FQUtRQzREckJxN0NKd2QwZ2dSN1ZxL3JQcmZnQitDM3NHeXBZNURBQUFBQUJKUlU1RXJrSmdnZz09XCJcbiAgICAgICAgICBhbHQ9XCJcIj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIEJzVGltZXBpY2tlclZpZXdDb21wb25lbnQge1xuICBhbXBtID0gJ29rJztcbiAgaG91cnMgPSAwO1xuICBtaW51dGVzID0gMDtcbn1cbiJdfQ==