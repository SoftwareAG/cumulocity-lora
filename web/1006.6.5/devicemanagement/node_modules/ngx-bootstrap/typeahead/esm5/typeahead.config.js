/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 * Default values provider for typeahead
 */
var TypeaheadConfig = /** @class */ (function () {
    function TypeaheadConfig() {
        /**
         * sets use adaptive position
         */
        this.adaptivePosition = false;
        /**
         * turn on/off animation
         */
        this.isAnimated = false;
        /**
         * used to hide results on blur
         */
        this.hideResultsOnBlur = true;
        /**
         * used to choose the first item in typeahead container
         */
        this.selectFirstItem = true;
        /**
         * used to active/inactive the first item in typeahead container
         */
        this.isFirstItemActive = true;
        /**
         * used to choose set minimal no of characters that needs to
         * be entered before typeahead kicks-in
         */
        this.minLength = 1;
    }
    TypeaheadConfig.decorators = [
        { type: Injectable }
    ];
    return TypeaheadConfig;
}());
export { TypeaheadConfig };
if (false) {
    /**
     * sets use adaptive position
     * @type {?}
     */
    TypeaheadConfig.prototype.adaptivePosition;
    /**
     * turn on/off animation
     * @type {?}
     */
    TypeaheadConfig.prototype.isAnimated;
    /**
     * used to hide results on blur
     * @type {?}
     */
    TypeaheadConfig.prototype.hideResultsOnBlur;
    /**
     * used to choose the first item in typeahead container
     * @type {?}
     */
    TypeaheadConfig.prototype.selectFirstItem;
    /**
     * used to active/inactive the first item in typeahead container
     * @type {?}
     */
    TypeaheadConfig.prototype.isFirstItemActive;
    /**
     * used to choose set minimal no of characters that needs to
     * be entered before typeahead kicks-in
     * @type {?}
     */
    TypeaheadConfig.prototype.minLength;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1ib290c3RyYXAvdHlwZWFoZWFkLyIsInNvdXJjZXMiOlsidHlwZWFoZWFkLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUczQztJQUFBOzs7O1FBR0UscUJBQWdCLEdBQUcsS0FBSyxDQUFDOzs7O1FBRXpCLGVBQVUsR0FBRyxLQUFLLENBQUM7Ozs7UUFFbkIsc0JBQWlCLEdBQUcsSUFBSSxDQUFDOzs7O1FBRXpCLG9CQUFlLEdBQUcsSUFBSSxDQUFDOzs7O1FBRXZCLHNCQUFpQixHQUFHLElBQUksQ0FBQzs7Ozs7UUFJekIsY0FBUyxHQUFHLENBQUMsQ0FBQztJQUNoQixDQUFDOztnQkFoQkEsVUFBVTs7SUFnQlgsc0JBQUM7Q0FBQSxBQWhCRCxJQWdCQztTQWZZLGVBQWU7Ozs7OztJQUUxQiwyQ0FBeUI7Ozs7O0lBRXpCLHFDQUFtQjs7Ozs7SUFFbkIsNENBQXlCOzs7OztJQUV6QiwwQ0FBdUI7Ozs7O0lBRXZCLDRDQUF5Qjs7Ozs7O0lBSXpCLG9DQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKiogRGVmYXVsdCB2YWx1ZXMgcHJvdmlkZXIgZm9yIHR5cGVhaGVhZCAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFR5cGVhaGVhZENvbmZpZyB7XG4gIC8qKiBzZXRzIHVzZSBhZGFwdGl2ZSBwb3NpdGlvbiAqL1xuICBhZGFwdGl2ZVBvc2l0aW9uID0gZmFsc2U7XG4gIC8qKiB0dXJuIG9uL29mZiBhbmltYXRpb24gKi9cbiAgaXNBbmltYXRlZCA9IGZhbHNlO1xuICAvKiogdXNlZCB0byBoaWRlIHJlc3VsdHMgb24gYmx1ciAqL1xuICBoaWRlUmVzdWx0c09uQmx1ciA9IHRydWU7XG4gIC8qKiB1c2VkIHRvIGNob29zZSB0aGUgZmlyc3QgaXRlbSBpbiB0eXBlYWhlYWQgY29udGFpbmVyICovXG4gIHNlbGVjdEZpcnN0SXRlbSA9IHRydWU7XG4gIC8qKiB1c2VkIHRvIGFjdGl2ZS9pbmFjdGl2ZSB0aGUgZmlyc3QgaXRlbSBpbiB0eXBlYWhlYWQgY29udGFpbmVyICovXG4gIGlzRmlyc3RJdGVtQWN0aXZlID0gdHJ1ZTtcbiAgLyoqIHVzZWQgdG8gY2hvb3NlIHNldCBtaW5pbWFsIG5vIG9mIGNoYXJhY3RlcnMgdGhhdCBuZWVkcyB0b1xuICAgKiBiZSBlbnRlcmVkIGJlZm9yZSB0eXBlYWhlYWQga2lja3MtaW5cbiAgICovXG4gIG1pbkxlbmd0aCA9IDE7XG59XG4iXX0=