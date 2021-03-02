/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
var ModalOptions = /** @class */ (function () {
    function ModalOptions() {
    }
    ModalOptions.decorators = [
        { type: Injectable }
    ];
    return ModalOptions;
}());
export { ModalOptions };
if (false) {
    /**
     *  Includes a modal-backdrop element. Alternatively,
     *  specify static for a backdrop which doesn't close the modal on click.
     * @type {?}
     */
    ModalOptions.prototype.backdrop;
    /**
     * Closes the modal when escape key is pressed.
     * @type {?}
     */
    ModalOptions.prototype.keyboard;
    /** @type {?} */
    ModalOptions.prototype.focus;
    /**
     * Shows the modal when initialized.
     * @type {?}
     */
    ModalOptions.prototype.show;
    /**
     * Ignore the backdrop click
     * @type {?}
     */
    ModalOptions.prototype.ignoreBackdropClick;
    /**
     * Css class for opened modal
     * @type {?}
     */
    ModalOptions.prototype.class;
    /**
     * Toggle animation
     * @type {?}
     */
    ModalOptions.prototype.animated;
    /**
     * Modal data
     * @type {?}
     */
    ModalOptions.prototype.initialState;
}
/** @type {?} */
export var modalConfigDefaults = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: false,
    ignoreBackdropClick: false,
    class: '',
    animated: true,
    initialState: {}
};
/** @type {?} */
export var CLASS_NAME = {
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    IN: 'in',
    // bs3
    SHOW: 'show' // bs4
};
/** @type {?} */
export var SELECTOR = {
    DIALOG: '.modal-dialog',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.navbar-fixed-top, .navbar-fixed-bottom, .is-fixed'
};
/** @type {?} */
export var TRANSITION_DURATIONS = {
    MODAL: 300,
    BACKDROP: 150
};
/** @type {?} */
export var DISMISS_REASONS = {
    BACKRDOP: 'backdrop-click',
    ESC: 'esc'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtb3B0aW9ucy5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1ib290c3RyYXAvbW9kYWwvIiwic291cmNlcyI6WyJtb2RhbC1vcHRpb25zLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDO0lBQUE7SUFpQ0EsQ0FBQzs7Z0JBakNBLFVBQVU7O0lBaUNYLG1CQUFDO0NBQUEsQUFqQ0QsSUFpQ0M7U0FoQ1ksWUFBWTs7Ozs7OztJQUt2QixnQ0FBOEI7Ozs7O0lBSTlCLGdDQUFtQjs7SUFFbkIsNkJBQWdCOzs7OztJQUloQiw0QkFBZTs7Ozs7SUFJZiwyQ0FBOEI7Ozs7O0lBSTlCLDZCQUFlOzs7OztJQUlmLGdDQUFtQjs7Ozs7SUFJbkIsb0NBQXNCOzs7QUFJeEIsTUFBTSxLQUFPLG1CQUFtQixHQUFpQjtJQUMvQyxRQUFRLEVBQUUsSUFBSTtJQUNkLFFBQVEsRUFBRSxJQUFJO0lBQ2QsS0FBSyxFQUFFLElBQUk7SUFDWCxJQUFJLEVBQUUsS0FBSztJQUNYLG1CQUFtQixFQUFFLEtBQUs7SUFDMUIsS0FBSyxFQUFFLEVBQUU7SUFDVCxRQUFRLEVBQUUsSUFBSTtJQUNkLFlBQVksRUFBRSxFQUFFO0NBQ2pCOztBQUVELE1BQU0sS0FBTyxVQUFVLEdBQWM7SUFDbkMsa0JBQWtCLEVBQUUseUJBQXlCO0lBQzdDLFFBQVEsRUFBRSxnQkFBZ0I7SUFDMUIsSUFBSSxFQUFFLFlBQVk7SUFDbEIsSUFBSSxFQUFFLE1BQU07SUFDWixFQUFFLEVBQUUsSUFBSTs7SUFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLE1BQU07Q0FDcEI7O0FBRUQsTUFBTSxLQUFPLFFBQVEsR0FBYTtJQUNoQyxNQUFNLEVBQUUsZUFBZTtJQUN2QixXQUFXLEVBQUUsdUJBQXVCO0lBQ3BDLFlBQVksRUFBRSx3QkFBd0I7SUFDdEMsYUFBYSxFQUFFLG9EQUFvRDtDQUNwRTs7QUFFRCxNQUFNLEtBQU8sb0JBQW9CLEdBQXdCO0lBQ3ZELEtBQUssRUFBRSxHQUFHO0lBQ1YsUUFBUSxFQUFFLEdBQUc7Q0FDZDs7QUFFRCxNQUFNLEtBQU8sZUFBZSxHQUFtQjtJQUM3QyxRQUFRLEVBQUUsZ0JBQWdCO0lBQzFCLEdBQUcsRUFBRSxLQUFLO0NBQ1giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbGFzc05hbWUsIERpc21pc3NSZWFzb25zLCBTZWxlY3RvciwgVHJhbnNpdGlvbkR1cmF0aW9ucyB9IGZyb20gJy4vbW9kZWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vZGFsT3B0aW9ucyB7XG4gIC8qKlxuICAgKiAgSW5jbHVkZXMgYSBtb2RhbC1iYWNrZHJvcCBlbGVtZW50LiBBbHRlcm5hdGl2ZWx5LFxuICAgKiAgc3BlY2lmeSBzdGF0aWMgZm9yIGEgYmFja2Ryb3Agd2hpY2ggZG9lc24ndCBjbG9zZSB0aGUgbW9kYWwgb24gY2xpY2suXG4gICAqL1xuICBiYWNrZHJvcD86IGJvb2xlYW4gfCAnc3RhdGljJztcbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgbW9kYWwgd2hlbiBlc2NhcGUga2V5IGlzIHByZXNzZWQuXG4gICAqL1xuICBrZXlib2FyZD86IGJvb2xlYW47XG5cbiAgZm9jdXM/OiBib29sZWFuO1xuICAvKipcbiAgICogU2hvd3MgdGhlIG1vZGFsIHdoZW4gaW5pdGlhbGl6ZWQuXG4gICAqL1xuICBzaG93PzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIElnbm9yZSB0aGUgYmFja2Ryb3AgY2xpY2tcbiAgICovXG4gIGlnbm9yZUJhY2tkcm9wQ2xpY2s/OiBib29sZWFuO1xuICAvKipcbiAgICogQ3NzIGNsYXNzIGZvciBvcGVuZWQgbW9kYWxcbiAgICovXG4gIGNsYXNzPzogc3RyaW5nO1xuICAvKipcbiAgICogVG9nZ2xlIGFuaW1hdGlvblxuICAgKi9cbiAgYW5pbWF0ZWQ/OiBib29sZWFuO1xuICAvKipcbiAgICogTW9kYWwgZGF0YVxuICAgKi9cbiAgaW5pdGlhbFN0YXRlPzogT2JqZWN0O1xufVxuXG5cbmV4cG9ydCBjb25zdCBtb2RhbENvbmZpZ0RlZmF1bHRzOiBNb2RhbE9wdGlvbnMgPSB7XG4gIGJhY2tkcm9wOiB0cnVlLFxuICBrZXlib2FyZDogdHJ1ZSxcbiAgZm9jdXM6IHRydWUsXG4gIHNob3c6IGZhbHNlLFxuICBpZ25vcmVCYWNrZHJvcENsaWNrOiBmYWxzZSxcbiAgY2xhc3M6ICcnLFxuICBhbmltYXRlZDogdHJ1ZSxcbiAgaW5pdGlhbFN0YXRlOiB7fVxufTtcblxuZXhwb3J0IGNvbnN0IENMQVNTX05BTUU6IENsYXNzTmFtZSA9IHtcbiAgU0NST0xMQkFSX01FQVNVUkVSOiAnbW9kYWwtc2Nyb2xsYmFyLW1lYXN1cmUnLFxuICBCQUNLRFJPUDogJ21vZGFsLWJhY2tkcm9wJyxcbiAgT1BFTjogJ21vZGFsLW9wZW4nLFxuICBGQURFOiAnZmFkZScsXG4gIElOOiAnaW4nLCAvLyBiczNcbiAgU0hPVzogJ3Nob3cnIC8vIGJzNFxufTtcblxuZXhwb3J0IGNvbnN0IFNFTEVDVE9SOiBTZWxlY3RvciA9IHtcbiAgRElBTE9HOiAnLm1vZGFsLWRpYWxvZycsXG4gIERBVEFfVE9HR0xFOiAnW2RhdGEtdG9nZ2xlPVwibW9kYWxcIl0nLFxuICBEQVRBX0RJU01JU1M6ICdbZGF0YS1kaXNtaXNzPVwibW9kYWxcIl0nLFxuICBGSVhFRF9DT05URU5UOiAnLm5hdmJhci1maXhlZC10b3AsIC5uYXZiYXItZml4ZWQtYm90dG9tLCAuaXMtZml4ZWQnXG59O1xuXG5leHBvcnQgY29uc3QgVFJBTlNJVElPTl9EVVJBVElPTlM6IFRyYW5zaXRpb25EdXJhdGlvbnMgPSB7XG4gIE1PREFMOiAzMDAsXG4gIEJBQ0tEUk9QOiAxNTBcbn07XG5cbmV4cG9ydCBjb25zdCBESVNNSVNTX1JFQVNPTlM6IERpc21pc3NSZWFzb25zID0ge1xuICBCQUNLUkRPUDogJ2JhY2tkcm9wLWNsaWNrJyxcbiAgRVNDOiAnZXNjJ1xufTtcbiJdfQ==