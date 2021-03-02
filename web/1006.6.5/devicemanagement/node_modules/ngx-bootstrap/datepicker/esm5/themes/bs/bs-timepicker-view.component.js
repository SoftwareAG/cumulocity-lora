/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:max-line-length
import { Component } from '@angular/core';
var BsTimepickerViewComponent = /** @class */ (function () {
    function BsTimepickerViewComponent() {
        this.ampm = 'ok';
        this.hours = 0;
        this.minutes = 0;
    }
    BsTimepickerViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'bs-timepicker',
                    template: "\n    <div class=\"bs-timepicker-container\">\n      <div class=\"bs-timepicker-controls\">\n        <button class=\"bs-decrease\">-</button>\n        <input type=\"text\" [value]=\"hours\" placeholder=\"00\">\n        <button class=\"bs-increase\">+</button>\n      </div>\n      <div class=\"bs-timepicker-controls\">\n        <button class=\"bs-decrease\">-</button>\n        <input type=\"text\" [value]=\"minutes\" placeholder=\"00\">\n        <button class=\"bs-increase\">+</button>\n      </div>\n      <button class=\"switch-time-format\">{{ ampm }}\n        <img\n          src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAABSElEQVQYV3XQPUvDUBQG4HNuagtVqc6KgouCv6GIuIntYBLB9hcIQpLStCAIV7DYmpTcRWcXqZio3Vwc/UCc/QEqfgyKGbr0I7nS1EiHeqYzPO/h5SD0jaxUZjmSLCB+OFb+UFINFwASAEAdpu9gaGXVyAHHFQBkHpKHc6a9dzECvADyY9sqlAMsK9W0jzxDXqeytr3mhQckxSji27TJJ5/rPmIpwJJq3HrtduriYOurv1a4i1p5HnhkG9OFymi0ReoO05cGwb+ayv4dysVygjeFmsP05f8wpZQ8fsdvfmuY9zjWSNqUtgYFVnOVReILYoBFzdQI5/GGFzNHhGbeZnopDGU29sZbscgldmC99w35VOATTycIMMcBXIfpSVGzZhA6C8hh00conln6VQ9TGgV32OEAKQC4DrBq7CJwd0ggR7Vq/rPrfgB+C3sGypY5DAAAAABJRU5ErkJggg==\"\n          alt=\"\">\n      </button>\n    </div>\n  "
                }] }
    ];
    return BsTimepickerViewComponent;
}());
export { BsTimepickerViewComponent };
if (false) {
    /** @type {?} */
    BsTimepickerViewComponent.prototype.ampm;
    /** @type {?} */
    BsTimepickerViewComponent.prototype.hours;
    /** @type {?} */
    BsTimepickerViewComponent.prototype.minutes;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtdGltZXBpY2tlci12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1ib290c3RyYXAvZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbInRoZW1lcy9icy9icy10aW1lcGlja2VyLXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQztJQUFBO1FBdUJFLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsWUFBTyxHQUFHLENBQUMsQ0FBQztJQUNkLENBQUM7O2dCQTFCQSxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRSxrcUNBa0JUO2lCQUNGOztJQUtELGdDQUFDO0NBQUEsQUExQkQsSUEwQkM7U0FKWSx5QkFBeUI7OztJQUNwQyx5Q0FBWTs7SUFDWiwwQ0FBVTs7SUFDViw0Q0FBWSIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aFxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JzLXRpbWVwaWNrZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJicy10aW1lcGlja2VyLWNvbnRhaW5lclwiPlxuICAgICAgPGRpdiBjbGFzcz1cImJzLXRpbWVwaWNrZXItY29udHJvbHNcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJzLWRlY3JlYXNlXCI+LTwvYnV0dG9uPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBbdmFsdWVdPVwiaG91cnNcIiBwbGFjZWhvbGRlcj1cIjAwXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJicy1pbmNyZWFzZVwiPis8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImJzLXRpbWVwaWNrZXItY29udHJvbHNcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJzLWRlY3JlYXNlXCI+LTwvYnV0dG9uPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBbdmFsdWVdPVwibWludXRlc1wiIHBsYWNlaG9sZGVyPVwiMDBcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJzLWluY3JlYXNlXCI+KzwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwic3dpdGNoLXRpbWUtZm9ybWF0XCI+e3sgYW1wbSB9fVxuICAgICAgICA8aW1nXG4gICAgICAgICAgc3JjPVwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBc0FBQUFLQ0FZQUFBQmk4S1NEQUFBQlNFbEVRVlFZVjNYUVBVdkRVQlFHNEhOdWFndFZxYzZLZ291Q3Y2R0l1SW50WUJMQjloY0lRcExTdENBSVY3RFltcFRjUldjWHFaaW8zVndjL1VDYy9RRXFmZ3lLR2JyMEk3blMxRWlIZXFZelBPL2g1U0QwamF4VVpqbVNMQ0IrT0ZiK1VGSU5Gd0FTQUVBZHB1OWdhR1hWeUFISEZRQmtIcEtIYzZhOWR6RUN2QUR5WTlzcWxBTXNLOVcwanp4RFhxZXl0cjNtaFFja3hTamkyN1RKSjUvclBtSXB3SkpxM0hydGR1cmlZT3VydjFhNGkxcDVIbmhrRzlPRnltaTBSZW9PMDVjR3diK2F5djRkeXNWeWdqZUZtc1AwNWY4d3BaUThmc2R2Zm11WTl6aldTTnFVdGdZRlZuT1ZSZUlMWW9CRnpkUUk1L0dHRnpOSGhHYmVabm9wREdVMjlzWmJzY2dsZG1DOTl3MzVWT0FUVHljSU1NY0JYSWZwU1ZHelpoQTZDOGhoMDBjb25sbjZWUTlUR2dWMzJPRUFLUUM0RHJCcTdDSndkMGdnUjdWcS9yUHJmZ0IrQzNzR3lwWTVEQUFBQUFCSlJVNUVya0pnZ2c9PVwiXG4gICAgICAgICAgYWx0PVwiXCI+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBCc1RpbWVwaWNrZXJWaWV3Q29tcG9uZW50IHtcbiAgYW1wbSA9ICdvayc7XG4gIGhvdXJzID0gMDtcbiAgbWludXRlcyA9IDA7XG59XG4iXX0=