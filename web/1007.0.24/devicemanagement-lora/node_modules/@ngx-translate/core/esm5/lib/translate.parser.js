/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { Injectable } from "@angular/core";
import { isDefined } from "./util";
/**
 * @abstract
 */
var /**
 * @abstract
 */
TranslateParser = /** @class */ (function () {
    function TranslateParser() {
    }
    return TranslateParser;
}());
/**
 * @abstract
 */
export { TranslateParser };
if (false) {
    /**
     * Interpolates a string to replace parameters
     * "This is a {{ key }}" ==> "This is a value", with params = { key: "value" }
     * @abstract
     * @param {?} expr
     * @param {?=} params
     * @return {?}
     */
    TranslateParser.prototype.interpolate = function (expr, params) { };
    /**
     * Gets a value from an object by composed key
     * parser.getValue({ key1: { keyA: 'valueI' }}, 'key1.keyA') ==> 'valueI'
     * @abstract
     * @param {?} target
     * @param {?} key
     * @return {?}
     */
    TranslateParser.prototype.getValue = function (target, key) { };
}
var TranslateDefaultParser = /** @class */ (function (_super) {
    __extends(TranslateDefaultParser, _super);
    function TranslateDefaultParser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.templateMatcher = /{{\s?([^{}\s]*)\s?}}/g;
        return _this;
    }
    /**
     * @param {?} expr
     * @param {?=} params
     * @return {?}
     */
    TranslateDefaultParser.prototype.interpolate = /**
     * @param {?} expr
     * @param {?=} params
     * @return {?}
     */
    function (expr, params) {
        /** @type {?} */
        var result;
        if (typeof expr === 'string') {
            result = this.interpolateString(expr, params);
        }
        else if (typeof expr === 'function') {
            result = this.interpolateFunction(expr, params);
        }
        else {
            // this should not happen, but an unrelated TranslateService test depends on it
            result = (/** @type {?} */ (expr));
        }
        return result;
    };
    /**
     * @param {?} target
     * @param {?} key
     * @return {?}
     */
    TranslateDefaultParser.prototype.getValue = /**
     * @param {?} target
     * @param {?} key
     * @return {?}
     */
    function (target, key) {
        /** @type {?} */
        var keys = typeof key === 'string' ? key.split('.') : [key];
        key = '';
        do {
            key += keys.shift();
            if (isDefined(target) && isDefined(target[key]) && (typeof target[key] === 'object' || !keys.length)) {
                target = target[key];
                key = '';
            }
            else if (!keys.length) {
                target = undefined;
            }
            else {
                key += '.';
            }
        } while (keys.length);
        return target;
    };
    /**
     * @private
     * @param {?} fn
     * @param {?=} params
     * @return {?}
     */
    TranslateDefaultParser.prototype.interpolateFunction = /**
     * @private
     * @param {?} fn
     * @param {?=} params
     * @return {?}
     */
    function (fn, params) {
        return fn(params);
    };
    /**
     * @private
     * @param {?} expr
     * @param {?=} params
     * @return {?}
     */
    TranslateDefaultParser.prototype.interpolateString = /**
     * @private
     * @param {?} expr
     * @param {?=} params
     * @return {?}
     */
    function (expr, params) {
        var _this = this;
        if (!params) {
            return expr;
        }
        return expr.replace(this.templateMatcher, (/**
         * @param {?} substring
         * @param {?} b
         * @return {?}
         */
        function (substring, b) {
            /** @type {?} */
            var r = _this.getValue(params, b);
            return isDefined(r) ? r : substring;
        }));
    };
    TranslateDefaultParser.decorators = [
        { type: Injectable }
    ];
    return TranslateDefaultParser;
}(TranslateParser));
export { TranslateDefaultParser };
if (false) {
    /** @type {?} */
    TranslateDefaultParser.prototype.templateMatcher;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLnBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtdHJhbnNsYXRlL2NvcmUvIiwic291cmNlcyI6WyJsaWIvdHJhbnNsYXRlLnBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLFFBQVEsQ0FBQzs7OztBQUVqQzs7OztJQUFBO0lBZ0JBLENBQUM7SUFBRCxzQkFBQztBQUFELENBQUMsQUFoQkQsSUFnQkM7Ozs7Ozs7Ozs7Ozs7O0lBVEMsb0VBQW9FOzs7Ozs7Ozs7SUFRcEUsZ0VBQWdEOztBQUdsRDtJQUM0QywwQ0FBZTtJQUQzRDtRQUFBLHFFQW1EQztRQWpEQyxxQkFBZSxHQUFXLHVCQUF1QixDQUFDOztJQWlEcEQsQ0FBQzs7Ozs7O0lBL0NRLDRDQUFXOzs7OztJQUFsQixVQUFtQixJQUF1QixFQUFFLE1BQVk7O1lBQ2xELE1BQWM7UUFFbEIsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDNUIsTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDL0M7YUFBTSxJQUFJLE9BQU8sSUFBSSxLQUFLLFVBQVUsRUFBRTtZQUNyQyxNQUFNLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNqRDthQUFNO1lBQ0wsK0VBQStFO1lBQy9FLE1BQU0sR0FBRyxtQkFBQSxJQUFJLEVBQVUsQ0FBQztTQUN6QjtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Ozs7OztJQUVELHlDQUFROzs7OztJQUFSLFVBQVMsTUFBVyxFQUFFLEdBQVc7O1lBQzNCLElBQUksR0FBRyxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQzNELEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDVCxHQUFHO1lBQ0QsR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNwQixJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3BHLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3JCLEdBQUcsR0FBRyxFQUFFLENBQUM7YUFDVjtpQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDdkIsTUFBTSxHQUFHLFNBQVMsQ0FBQzthQUNwQjtpQkFBTTtnQkFDTCxHQUFHLElBQUksR0FBRyxDQUFDO2FBQ1o7U0FDRixRQUFRLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFFdEIsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7Ozs7OztJQUVPLG9EQUFtQjs7Ozs7O0lBQTNCLFVBQTRCLEVBQVksRUFBRSxNQUFZO1FBQ3BELE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BCLENBQUM7Ozs7Ozs7SUFFTyxrREFBaUI7Ozs7OztJQUF6QixVQUEwQixJQUFZLEVBQUUsTUFBWTtRQUFwRCxpQkFTQztRQVJDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlOzs7OztRQUFFLFVBQUMsU0FBaUIsRUFBRSxDQUFTOztnQkFDakUsQ0FBQyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUNoQyxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDdEMsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOztnQkFsREYsVUFBVTs7SUFtRFgsNkJBQUM7Q0FBQSxBQW5ERCxDQUM0QyxlQUFlLEdBa0QxRDtTQWxEWSxzQkFBc0I7OztJQUNqQyxpREFBa0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge2lzRGVmaW5lZH0gZnJvbSBcIi4vdXRpbFwiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVHJhbnNsYXRlUGFyc2VyIHtcbiAgLyoqXG4gICAqIEludGVycG9sYXRlcyBhIHN0cmluZyB0byByZXBsYWNlIHBhcmFtZXRlcnNcbiAgICogXCJUaGlzIGlzIGEge3sga2V5IH19XCIgPT0+IFwiVGhpcyBpcyBhIHZhbHVlXCIsIHdpdGggcGFyYW1zID0geyBrZXk6IFwidmFsdWVcIiB9XG4gICAqIEBwYXJhbSBleHByXG4gICAqIEBwYXJhbSBwYXJhbXNcbiAgICovXG4gIGFic3RyYWN0IGludGVycG9sYXRlKGV4cHI6IHN0cmluZyB8IEZ1bmN0aW9uLCBwYXJhbXM/OiBhbnkpOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEdldHMgYSB2YWx1ZSBmcm9tIGFuIG9iamVjdCBieSBjb21wb3NlZCBrZXlcbiAgICogcGFyc2VyLmdldFZhbHVlKHsga2V5MTogeyBrZXlBOiAndmFsdWVJJyB9fSwgJ2tleTEua2V5QScpID09PiAndmFsdWVJJ1xuICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAqIEBwYXJhbSBrZXlcbiAgICovXG4gIGFic3RyYWN0IGdldFZhbHVlKHRhcmdldDogYW55LCBrZXk6IHN0cmluZyk6IGFueVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVHJhbnNsYXRlRGVmYXVsdFBhcnNlciBleHRlbmRzIFRyYW5zbGF0ZVBhcnNlciB7XG4gIHRlbXBsYXRlTWF0Y2hlcjogUmVnRXhwID0gL3t7XFxzPyhbXnt9XFxzXSopXFxzP319L2c7XG5cbiAgcHVibGljIGludGVycG9sYXRlKGV4cHI6IHN0cmluZyB8IEZ1bmN0aW9uLCBwYXJhbXM/OiBhbnkpOiBzdHJpbmcge1xuICAgIGxldCByZXN1bHQ6IHN0cmluZztcblxuICAgIGlmICh0eXBlb2YgZXhwciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuaW50ZXJwb2xhdGVTdHJpbmcoZXhwciwgcGFyYW1zKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHByID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXN1bHQgPSB0aGlzLmludGVycG9sYXRlRnVuY3Rpb24oZXhwciwgcGFyYW1zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdGhpcyBzaG91bGQgbm90IGhhcHBlbiwgYnV0IGFuIHVucmVsYXRlZCBUcmFuc2xhdGVTZXJ2aWNlIHRlc3QgZGVwZW5kcyBvbiBpdFxuICAgICAgcmVzdWx0ID0gZXhwciBhcyBzdHJpbmc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGdldFZhbHVlKHRhcmdldDogYW55LCBrZXk6IHN0cmluZyk6IGFueSB7XG4gICAgbGV0IGtleXMgPSB0eXBlb2Yga2V5ID09PSAnc3RyaW5nJyA/IGtleS5zcGxpdCgnLicpIDogW2tleV07XG4gICAga2V5ID0gJyc7XG4gICAgZG8ge1xuICAgICAga2V5ICs9IGtleXMuc2hpZnQoKTtcbiAgICAgIGlmIChpc0RlZmluZWQodGFyZ2V0KSAmJiBpc0RlZmluZWQodGFyZ2V0W2tleV0pICYmICh0eXBlb2YgdGFyZ2V0W2tleV0gPT09ICdvYmplY3QnIHx8ICFrZXlzLmxlbmd0aCkpIHtcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0W2tleV07XG4gICAgICAgIGtleSA9ICcnO1xuICAgICAgfSBlbHNlIGlmICgha2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdGFyZ2V0ID0gdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAga2V5ICs9ICcuJztcbiAgICAgIH1cbiAgICB9IHdoaWxlIChrZXlzLmxlbmd0aCk7XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgcHJpdmF0ZSBpbnRlcnBvbGF0ZUZ1bmN0aW9uKGZuOiBGdW5jdGlvbiwgcGFyYW1zPzogYW55KSB7XG4gICAgcmV0dXJuIGZuKHBhcmFtcyk7XG4gIH1cblxuICBwcml2YXRlIGludGVycG9sYXRlU3RyaW5nKGV4cHI6IHN0cmluZywgcGFyYW1zPzogYW55KSB7XG4gICAgaWYgKCFwYXJhbXMpIHtcbiAgICAgIHJldHVybiBleHByO1xuICAgIH1cblxuICAgIHJldHVybiBleHByLnJlcGxhY2UodGhpcy50ZW1wbGF0ZU1hdGNoZXIsIChzdWJzdHJpbmc6IHN0cmluZywgYjogc3RyaW5nKSA9PiB7XG4gICAgICBsZXQgciA9IHRoaXMuZ2V0VmFsdWUocGFyYW1zLCBiKTtcbiAgICAgIHJldHVybiBpc0RlZmluZWQocikgPyByIDogc3Vic3RyaW5nO1xuICAgIH0pO1xuICB9XG59XG4iXX0=