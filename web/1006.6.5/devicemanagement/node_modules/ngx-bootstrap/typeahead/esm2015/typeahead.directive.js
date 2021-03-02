/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* tslint:disable:max-file-line-count */
import { ChangeDetectorRef, Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { from, isObservable } from 'rxjs';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { TypeaheadContainerComponent } from './typeahead-container.component';
import { TypeaheadMatch } from './typeahead-match.class';
import { TypeaheadConfig } from './typeahead.config';
import { getValueFromObject, latinize, tokenize } from './typeahead-utils';
import { debounceTime, filter, mergeMap, switchMap, toArray } from 'rxjs/operators';
export class TypeaheadDirective {
    /**
     * @param {?} cis
     * @param {?} config
     * @param {?} changeDetection
     * @param {?} element
     * @param {?} ngControl
     * @param {?} renderer
     * @param {?} viewContainerRef
     */
    constructor(cis, config, changeDetection, element, ngControl, renderer, viewContainerRef) {
        this.changeDetection = changeDetection;
        this.element = element;
        this.ngControl = ngControl;
        this.renderer = renderer;
        /**
         * minimal no of characters that needs to be entered before
         * typeahead kicks-in. When set to 0, typeahead shows on focus with full
         * list of options (limited as normal by typeaheadOptionsLimit)
         */
        this.typeaheadMinLength = void 0;
        /**
         * turn on/off animation
         */
        this.isAnimated = false;
        /**
         * should be used only in case of typeahead attribute is array.
         * If true - loading of options will be async, otherwise - sync.
         * true make sense if options array is large.
         */
        this.typeaheadAsync = void 0;
        /**
         * match latin symbols.
         * If true the word súper would match super and vice versa.
         */
        this.typeaheadLatinize = true;
        /**
         * Can be use to search words by inserting a single white space between each characters
         *  for example 'C a l i f o r n i a' will match 'California'.
         */
        this.typeaheadSingleWords = true;
        /**
         * should be used only in case typeaheadSingleWords attribute is true.
         * Sets the word delimiter to break words. Defaults to space.
         */
        this.typeaheadWordDelimiters = ' ';
        /**
         * should be used only in case typeaheadSingleWords attribute is true.
         * Sets the word delimiter to match exact phrase.
         * Defaults to simple and double quotes.
         */
        this.typeaheadPhraseDelimiters = '\'"';
        /**
         * specifies if typeahead is scrollable
         */
        this.typeaheadScrollable = false;
        /**
         * specifies number of options to show in scroll view
         */
        this.typeaheadOptionsInScrollableView = 5;
        /**
         * fired when an options list was opened and the user clicked Tab
         * If a value equal true, it will be chosen first or active item in the list
         * If value equal false, it will be chosen an active item in the list or nothing
         */
        this.typeaheadSelectFirstItem = true;
        /**
         * makes active first item in a list
         */
        this.typeaheadIsFirstItemActive = true;
        /**
         * fired when 'busy' state of this component was changed,
         * fired on async mode only, returns boolean
         */
        this.typeaheadLoading = new EventEmitter();
        /**
         * fired on every key event and returns true
         * in case of matches are not detected
         */
        this.typeaheadNoResults = new EventEmitter();
        /**
         * fired when option was selected, return object with data of this option
         */
        this.typeaheadOnSelect = new EventEmitter();
        /**
         * fired when blur event occurs. returns the active item
         */
        // tslint:disable-next-line:no-any
        this.typeaheadOnBlur = new EventEmitter();
        /**
         * This attribute indicates that the dropdown should be opened upwards
         */
        this.dropup = false;
        this.isActiveItemChanged = false;
        this.isTypeaheadOptionsListActive = false;
        // tslint:disable-next-line:no-any
        this.keyUpEventEmitter = new EventEmitter();
        this.placement = 'bottom-left';
        this._subscriptions = [];
        this._typeahead = cis.createLoader(element, viewContainerRef, renderer)
            .provide({ provide: TypeaheadConfig, useValue: config });
        Object.assign(this, {
            typeaheadHideResultsOnBlur: config.hideResultsOnBlur,
            typeaheadSelectFirstItem: config.selectFirstItem,
            typeaheadIsFirstItemActive: config.isFirstItemActive,
            typeaheadMinLength: config.minLength,
            adaptivePosition: config.adaptivePosition,
            isAnimated: config.isAnimated
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.typeaheadOptionsLimit = this.typeaheadOptionsLimit || 20;
        this.typeaheadMinLength =
            this.typeaheadMinLength === void 0 ? 1 : this.typeaheadMinLength;
        this.typeaheadWaitMs = this.typeaheadWaitMs || 0;
        // async should be false in case of array
        if (this.typeaheadAsync === undefined &&
            !(isObservable(this.typeahead))) {
            this.typeaheadAsync = false;
        }
        if (isObservable(this.typeahead)) {
            this.typeaheadAsync = true;
        }
        if (this.typeaheadAsync) {
            this.asyncActions();
        }
        else {
            this.syncActions();
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    // tslint:disable-next-line:no-any
    onInput(e) {
        // For `<input>`s, use the `value` property. For others that don't have a
        // `value` (such as `<span contenteditable="true">`), use either
        // `textContent` or `innerText` (depending on which one is supported, i.e.
        // Firefox or IE).
        /** @type {?} */
        const value = e.target.value !== undefined
            ? e.target.value
            : e.target.textContent !== undefined
                ? e.target.textContent
                : e.target.innerText;
        if (value != null && value.trim().length >= this.typeaheadMinLength) {
            this.typeaheadLoading.emit(true);
            this.keyUpEventEmitter.emit(e.target.value);
        }
        else {
            this.typeaheadLoading.emit(false);
            this.typeaheadNoResults.emit(false);
            this.hide();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onChange(event) {
        if (this._container) {
            // esc
            /* tslint:disable-next-line: deprecation */
            if (event.keyCode === 27 || event.key === 'Escape') {
                this.hide();
                return;
            }
            // up
            /* tslint:disable-next-line: deprecation */
            if (event.keyCode === 38 || event.key === 'ArrowUp') {
                this.isActiveItemChanged = true;
                this._container.prevActiveMatch();
                return;
            }
            // down
            /* tslint:disable-next-line: deprecation */
            if (event.keyCode === 40 || event.key === 'ArrowDown') {
                this.isActiveItemChanged = true;
                this._container.nextActiveMatch();
                return;
            }
            // enter
            /* tslint:disable-next-line: deprecation */
            if (event.keyCode === 13 || event.key === 'Enter') {
                this._container.selectActiveMatch();
                return;
            }
        }
    }
    /**
     * @return {?}
     */
    onFocus() {
        if (this.typeaheadMinLength === 0) {
            this.typeaheadLoading.emit(true);
            this.keyUpEventEmitter.emit(this.element.nativeElement.value || '');
        }
    }
    /**
     * @return {?}
     */
    onBlur() {
        if (this._container && !this._container.isFocused) {
            this.typeaheadOnBlur.emit(this._container.active);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeydown(event) {
        // no container - no problems
        if (!this._container) {
            return;
        }
        /* tslint:disable-next-line: deprecation */
        if (event.keyCode === 9 || event.key === 'Tab' || event.keyCode === 13 || event.key === 'Enter') {
            event.preventDefault();
            if (this.typeaheadSelectFirstItem) {
                this._container.selectActiveMatch();
                return;
            }
            if (!this.typeaheadSelectFirstItem) {
                this._container.selectActiveMatch(this.isActiveItemChanged);
                this.isActiveItemChanged = false;
                this.hide();
            }
        }
    }
    /**
     * @param {?} match
     * @return {?}
     */
    changeModel(match) {
        /** @type {?} */
        const valueStr = match.value;
        this.ngControl.viewToModelUpdate(valueStr);
        (this.ngControl.control).setValue(valueStr);
        this.changeDetection.markForCheck();
        this.hide();
    }
    /**
     * @return {?}
     */
    get matches() {
        return this._matches;
    }
    /**
     * @return {?}
     */
    show() {
        this._typeahead
            .attach(TypeaheadContainerComponent)
            // todo: add append to body, after updating positioning service
            .to(this.container)
            .position({ attachment: `${this.dropup ? 'top' : 'bottom'} start` })
            .show({
            typeaheadRef: this,
            placement: this.placement,
            animation: false,
            dropup: this.dropup
        });
        this._outsideClickListener = this.renderer.listen('document', 'click', (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (this.typeaheadMinLength === 0 && this.element.nativeElement.contains(e.target)) {
                return undefined;
            }
            if (!this.typeaheadHideResultsOnBlur || this.element.nativeElement.contains(e.target)) {
                return undefined;
            }
            this.onOutsideClick();
        }));
        this._container = this._typeahead.instance;
        this._container.parent = this;
        // This improves the speed as it won't have to be done for each list item
        /** @type {?} */
        const normalizedQuery = (this.typeaheadLatinize
            ? latinize(this.ngControl.control.value)
            : this.ngControl.control.value)
            .toString()
            .toLowerCase();
        this._container.query = this.typeaheadSingleWords
            ? tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters)
            : normalizedQuery;
        this._container.matches = this._matches;
        this.element.nativeElement.focus();
    }
    /**
     * @return {?}
     */
    hide() {
        if (this._typeahead.isShown) {
            this._typeahead.hide();
            this._outsideClickListener();
            this._container = null;
        }
    }
    /**
     * @return {?}
     */
    onOutsideClick() {
        if (this._container && !this._container.isFocused) {
            this.hide();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // clean up subscriptions
        for (const sub of this._subscriptions) {
            sub.unsubscribe();
        }
        this._typeahead.dispose();
    }
    /**
     * @protected
     * @return {?}
     */
    asyncActions() {
        this._subscriptions.push(this.keyUpEventEmitter
            .pipe(debounceTime(this.typeaheadWaitMs), switchMap((/**
         * @return {?}
         */
        () => this.typeahead)))
            .subscribe((/**
         * @param {?} matches
         * @return {?}
         */
        (matches) => {
            this.finalizeAsyncCall(matches);
        })));
    }
    /**
     * @protected
     * @return {?}
     */
    syncActions() {
        this._subscriptions.push(this.keyUpEventEmitter
            .pipe(debounceTime(this.typeaheadWaitMs), mergeMap((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            /** @type {?} */
            const normalizedQuery = this.normalizeQuery(value);
            return from(this.typeahead)
                .pipe(filter((/**
             * @param {?} option
             * @return {?}
             */
            (option) => {
                return (option &&
                    this.testMatch(this.normalizeOption(option), normalizedQuery));
            })), toArray());
        })))
            .subscribe((/**
         * @param {?} matches
         * @return {?}
         */
        (matches) => {
            this.finalizeAsyncCall(matches);
        })));
    }
    // tslint:disable-next-line:no-any
    /**
     * @protected
     * @param {?} option
     * @return {?}
     */
    normalizeOption(option) {
        /** @type {?} */
        const optionValue = getValueFromObject(option, this.typeaheadOptionField);
        /** @type {?} */
        const normalizedOption = this.typeaheadLatinize
            ? latinize(optionValue)
            : optionValue;
        return normalizedOption.toLowerCase();
    }
    /**
     * @protected
     * @param {?} value
     * @return {?}
     */
    normalizeQuery(value) {
        // If singleWords, break model here to not be doing extra work on each
        // iteration
        /** @type {?} */
        let normalizedQuery = (this.typeaheadLatinize
            ? latinize(value)
            : value)
            .toString()
            .toLowerCase();
        normalizedQuery = this.typeaheadSingleWords
            ? tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters)
            : normalizedQuery;
        return normalizedQuery;
    }
    /**
     * @protected
     * @param {?} match
     * @param {?} test
     * @return {?}
     */
    testMatch(match, test) {
        /** @type {?} */
        let spaceLength;
        if (typeof test === 'object') {
            spaceLength = test.length;
            for (let i = 0; i < spaceLength; i += 1) {
                if (test[i].length > 0 && match.indexOf(test[i]) < 0) {
                    return false;
                }
            }
            return true;
        }
        return match.indexOf(test) >= 0;
    }
    /**
     * @protected
     * @param {?} matches
     * @return {?}
     */
    finalizeAsyncCall(matches) {
        this.prepareMatches(matches || []);
        this.typeaheadLoading.emit(false);
        this.typeaheadNoResults.emit(!this.hasMatches());
        if (!this.hasMatches()) {
            this.hide();
            return;
        }
        if (this._container) {
            // fix: remove usage of ngControl internals
            /** @type {?} */
            const _controlValue = (this.typeaheadLatinize
                ? latinize(this.ngControl.control.value)
                : this.ngControl.control.value) || '';
            // This improves the speed as it won't have to be done for each list item
            /** @type {?} */
            const normalizedQuery = _controlValue.toString().toLowerCase();
            this._container.query = this.typeaheadSingleWords
                ? tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters)
                : normalizedQuery;
            this._container.matches = this._matches;
        }
        else {
            this.show();
        }
    }
    /**
     * @protected
     * @param {?} options
     * @return {?}
     */
    prepareMatches(options) {
        /** @type {?} */
        const limited = options.slice(0, this.typeaheadOptionsLimit);
        if (this.typeaheadGroupField) {
            /** @type {?} */
            let matches = [];
            // extract all group names
            /** @type {?} */
            const groups = limited
                .map((/**
             * @param {?} option
             * @return {?}
             */
            (option) => getValueFromObject(option, this.typeaheadGroupField)))
                .filter((/**
             * @param {?} v
             * @param {?} i
             * @param {?} a
             * @return {?}
             */
            (v, i, a) => a.indexOf(v) === i));
            groups.forEach((/**
             * @param {?} group
             * @return {?}
             */
            (group) => {
                // add group header to array of matches
                matches.push(new TypeaheadMatch(group, group, true));
                // add each item of group to array of matches
                matches = matches.concat(limited
                    .filter((
                // tslint:disable-next-line:no-any
                /**
                 * @param {?} option
                 * @return {?}
                 */
                (option) => getValueFromObject(option, this.typeaheadGroupField) === group))
                    .map((
                // tslint:disable-next-line:no-any
                /**
                 * @param {?} option
                 * @return {?}
                 */
                (option) => new TypeaheadMatch(option, getValueFromObject(option, this.typeaheadOptionField)))));
            }));
            this._matches = matches;
        }
        else {
            this._matches = limited.map((
            // tslint:disable-next-line:no-any
            /**
             * @param {?} option
             * @return {?}
             */
            (option) => new TypeaheadMatch(option, getValueFromObject(option, this.typeaheadOptionField))));
        }
    }
    /**
     * @protected
     * @return {?}
     */
    hasMatches() {
        return this._matches.length > 0;
    }
}
TypeaheadDirective.decorators = [
    { type: Directive, args: [{ selector: '[typeahead]', exportAs: 'bs-typeahead' },] }
];
/** @nocollapse */
TypeaheadDirective.ctorParameters = () => [
    { type: ComponentLoaderFactory },
    { type: TypeaheadConfig },
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgControl },
    { type: Renderer2 },
    { type: ViewContainerRef }
];
TypeaheadDirective.propDecorators = {
    typeahead: [{ type: Input }],
    typeaheadMinLength: [{ type: Input }],
    adaptivePosition: [{ type: Input }],
    isAnimated: [{ type: Input }],
    typeaheadWaitMs: [{ type: Input }],
    typeaheadOptionsLimit: [{ type: Input }],
    typeaheadOptionField: [{ type: Input }],
    typeaheadGroupField: [{ type: Input }],
    typeaheadAsync: [{ type: Input }],
    typeaheadLatinize: [{ type: Input }],
    typeaheadSingleWords: [{ type: Input }],
    typeaheadWordDelimiters: [{ type: Input }],
    typeaheadPhraseDelimiters: [{ type: Input }],
    typeaheadItemTemplate: [{ type: Input }],
    optionsListTemplate: [{ type: Input }],
    typeaheadScrollable: [{ type: Input }],
    typeaheadOptionsInScrollableView: [{ type: Input }],
    typeaheadHideResultsOnBlur: [{ type: Input }],
    typeaheadSelectFirstItem: [{ type: Input }],
    typeaheadIsFirstItemActive: [{ type: Input }],
    typeaheadLoading: [{ type: Output }],
    typeaheadNoResults: [{ type: Output }],
    typeaheadOnSelect: [{ type: Output }],
    typeaheadOnBlur: [{ type: Output }],
    container: [{ type: Input }],
    dropup: [{ type: Input }],
    onInput: [{ type: HostListener, args: ['input', ['$event'],] }],
    onChange: [{ type: HostListener, args: ['keyup', ['$event'],] }],
    onFocus: [{ type: HostListener, args: ['click',] }, { type: HostListener, args: ['focus',] }],
    onBlur: [{ type: HostListener, args: ['blur',] }],
    onKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
if (false) {
    /**
     * options source, can be Array of strings, objects or
     * an Observable for external matching process
     * @type {?}
     */
    TypeaheadDirective.prototype.typeahead;
    /**
     * minimal no of characters that needs to be entered before
     * typeahead kicks-in. When set to 0, typeahead shows on focus with full
     * list of options (limited as normal by typeaheadOptionsLimit)
     * @type {?}
     */
    TypeaheadDirective.prototype.typeaheadMinLength;
    /**
     * sets use adaptive position
     * @type {?}
     */
    TypeaheadDirective.prototype.adaptivePosition;
    /**
     * turn on/off animation
     * @type {?}
     */
    TypeaheadDirective.prototype.isAnimated;
    /**
     * minimal wait time after last character typed before typeahead kicks-in
     * @type {?}
     */
    TypeaheadDirective.prototype.typeaheadWaitMs;
    /**
     * maximum length of options items list. The default value is 20
     * @type {?}
     */
    TypeaheadDirective.prototype.typeaheadOptionsLimit;
    /**
     * when options source is an array of objects, the name of field
     * that contains the options value, we use array item as option in case
     * of this field is missing. Supports nested properties and methods.
     * @type {?}
     */
    TypeaheadDirective.prototype.typeaheadOptionField;
    /**
     * when options source is an array of objects, the name of field that
     * contains the group value, matches are grouped by this field when set.
     * @type {?}
     */
    TypeaheadDirective.prototype.typeaheadGroupField;
    /**
     * should be used only in case of typeahead attribute is array.
     * If true - loading of options will be async, otherwise - sync.
     * true make sense if options array is large.
     * @type {?}
     */
    TypeaheadDirective.prototype.typeaheadAsync;
    /**
     * match latin symbols.
     * If true the word súper would match super and vice versa.
     * @type {?}
     */
    TypeaheadDirective.prototype.typeaheadLatinize;
    /**
     * Can be use to search words by inserting a single white space between each characters
     *  for example 'C a l i f o r n i a' will match 'California'.
     * @type {?}
     */
    TypeaheadDirective.prototype.typeaheadSingleWords;
    /**
     * should be used only in case typeaheadSingleWords attribute is true.
     * Sets the word delimiter to break words. Defaults to space.
     * @type {?}
     */
    TypeaheadDirective.prototype.typeaheadWordDelimiters;
    /**
     * should be used only in case typeaheadSingleWords attribute is true.
     * Sets the word delimiter to match exact phrase.
     * Defaults to simple and double quotes.
     * @type {?}
     */
    TypeaheadDirective.prototype.typeaheadPhraseDelimiters;
    /**
     * used to specify a custom item template.
     * Template variables exposed are called item and index;
     * @type {?}
     */
    TypeaheadDirective.prototype.typeaheadItemTemplate;
    /**
     * used to specify a custom options list template.
     * Template variables: matches, itemTemplate, query
     * @type {?}
     */
    TypeaheadDirective.prototype.optionsListTemplate;
    /**
     * specifies if typeahead is scrollable
     * @type {?}
     */
    TypeaheadDirective.prototype.typeaheadScrollable;
    /**
     * specifies number of options to show in scroll view
     * @type {?}
     */
    TypeaheadDirective.prototype.typeaheadOptionsInScrollableView;
    /**
     * used to hide result on blur
     * @type {?}
     */
    TypeaheadDirective.prototype.typeaheadHideResultsOnBlur;
    /**
     * fired when an options list was opened and the user clicked Tab
     * If a value equal true, it will be chosen first or active item in the list
     * If value equal false, it will be chosen an active item in the list or nothing
     * @type {?}
     */
    TypeaheadDirective.prototype.typeaheadSelectFirstItem;
    /**
     * makes active first item in a list
     * @type {?}
     */
    TypeaheadDirective.prototype.typeaheadIsFirstItemActive;
    /**
     * fired when 'busy' state of this component was changed,
     * fired on async mode only, returns boolean
     * @type {?}
     */
    TypeaheadDirective.prototype.typeaheadLoading;
    /**
     * fired on every key event and returns true
     * in case of matches are not detected
     * @type {?}
     */
    TypeaheadDirective.prototype.typeaheadNoResults;
    /**
     * fired when option was selected, return object with data of this option
     * @type {?}
     */
    TypeaheadDirective.prototype.typeaheadOnSelect;
    /**
     * fired when blur event occurs. returns the active item
     * @type {?}
     */
    TypeaheadDirective.prototype.typeaheadOnBlur;
    /**
     * A selector specifying the element the typeahead should be appended to.
     * @type {?}
     */
    TypeaheadDirective.prototype.container;
    /**
     * This attribute indicates that the dropdown should be opened upwards
     * @type {?}
     */
    TypeaheadDirective.prototype.dropup;
    /**
     * if false don't focus the input element the typeahead directive is associated with on selection
     * @type {?}
     */
    TypeaheadDirective.prototype._container;
    /** @type {?} */
    TypeaheadDirective.prototype.isActiveItemChanged;
    /** @type {?} */
    TypeaheadDirective.prototype.isTypeaheadOptionsListActive;
    /**
     * @type {?}
     * @protected
     */
    TypeaheadDirective.prototype.keyUpEventEmitter;
    /**
     * @type {?}
     * @protected
     */
    TypeaheadDirective.prototype._matches;
    /**
     * @type {?}
     * @protected
     */
    TypeaheadDirective.prototype.placement;
    /**
     * @type {?}
     * @private
     */
    TypeaheadDirective.prototype._typeahead;
    /**
     * @type {?}
     * @private
     */
    TypeaheadDirective.prototype._subscriptions;
    /**
     * @type {?}
     * @private
     */
    TypeaheadDirective.prototype._outsideClickListener;
    /**
     * @type {?}
     * @private
     */
    TypeaheadDirective.prototype.changeDetection;
    /**
     * @type {?}
     * @private
     */
    TypeaheadDirective.prototype.element;
    /**
     * @type {?}
     * @private
     */
    TypeaheadDirective.prototype.ngControl;
    /**
     * @type {?}
     * @private
     */
    TypeaheadDirective.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1ib290c3RyYXAvdHlwZWFoZWFkLyIsInNvdXJjZXMiOlsidHlwZWFoZWFkLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxFQUNULFdBQVcsRUFDWCxnQkFBZ0IsRUFDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxJQUFJLEVBQWdCLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN4RCxPQUFPLEVBQW1CLHNCQUFzQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDekYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDOUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzNFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHcEYsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7Ozs7OztJQTJIN0IsWUFDRSxHQUEyQixFQUMzQixNQUF1QixFQUNmLGVBQWtDLEVBQ2xDLE9BQW1CLEVBQ25CLFNBQW9CLEVBQ3BCLFFBQW1CLEVBQzNCLGdCQUFrQztRQUoxQixvQkFBZSxHQUFmLGVBQWUsQ0FBbUI7UUFDbEMsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixjQUFTLEdB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a0RBQXNDOzs7Ozs7SUFJdEMsaURBQXFDOzs7Ozs7O0lBS3JDLDRDQUEwQzs7Ozs7O0lBSTFDLCtDQUFrQzs7Ozs7O0lBSWxDLGtEQUFxQzs7Ozs7O0lBSXJDLHFEQUF1Qzs7Ozs7OztJQUt2Qyx1REFBMkM7Ozs7OztJQUszQyxtREFBaUQ7Ozs7OztJQUtqRCxpREFBK0M7Ozs7O0lBRS9DLGlEQUFxQzs7Ozs7SUFFckMsOERBQThDOzs7OztJQUU5Qyx3REFBNkM7Ozs7Ozs7SUFLN0Msc0RBQXlDOzs7OztJQUV6Qyx3REFBMkM7Ozs7OztJQUkzQyw4Q0FBeUQ7Ozs7OztJQUl6RCxnREFBMkQ7Ozs7O0lBRTNELCtDQUFpRTs7Ozs7SUFHakUsNkNBQW9EOzs7OztJQUtwRCx1Q0FBMkI7Ozs7O0lBRzNCLG9DQUF3Qjs7Ozs7SUFnQnhCLHdDQUF3Qzs7SUFDeEMsaURBQTRCOztJQUM1QiwwREFBcUM7Ozs7O0lBR3JDLCtDQUFvRTs7Ozs7SUFDcEUsc0NBQXFDOzs7OztJQUNyQyx1Q0FBb0M7Ozs7O0lBR3BDLHdDQUFpRTs7Ozs7SUFDakUsNENBQTRDOzs7OztJQUM1QyxtREFBd0M7Ozs7O0lBS3RDLDZDQUEwQzs7Ozs7SUFDMUMscUNBQTJCOzs7OztJQUMzQix1Q0FBNEI7Ozs7O0lBQzVCLHNDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlOm1heC1maWxlLWxpbmUtY291bnQgKi9cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgZnJvbSwgU3Vic2NyaXB0aW9uLCBpc09ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbXBvbmVudExvYWRlciwgQ29tcG9uZW50TG9hZGVyRmFjdG9yeSB9IGZyb20gJ25neC1ib290c3RyYXAvY29tcG9uZW50LWxvYWRlcic7XG5pbXBvcnQgeyBUeXBlYWhlYWRDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL3R5cGVhaGVhZC1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFR5cGVhaGVhZE1hdGNoIH0gZnJvbSAnLi90eXBlYWhlYWQtbWF0Y2guY2xhc3MnO1xuaW1wb3J0IHsgVHlwZWFoZWFkQ29uZmlnIH0gZnJvbSAnLi90eXBlYWhlYWQuY29uZmlnJztcbmltcG9ydCB7IGdldFZhbHVlRnJvbU9iamVjdCwgbGF0aW5pemUsIHRva2VuaXplIH0gZnJvbSAnLi90eXBlYWhlYWQtdXRpbHMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBmaWx0ZXIsIG1lcmdlTWFwLCBzd2l0Y2hNYXAsIHRvQXJyYXkgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW3R5cGVhaGVhZF0nLCBleHBvcnRBczogJ2JzLXR5cGVhaGVhZCd9KVxuZXhwb3J0IGNsYXNzIFR5cGVhaGVhZERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLyoqIG9wdGlvbnMgc291cmNlLCBjYW4gYmUgQXJyYXkgb2Ygc3RyaW5ncywgb2JqZWN0cyBvclxuICAgKiBhbiBPYnNlcnZhYmxlIGZvciBleHRlcm5hbCBtYXRjaGluZyBwcm9jZXNzXG4gICAqL1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgQElucHV0KCkgdHlwZWFoZWFkOiBhbnk7XG4gIC8qKiBtaW5pbWFsIG5vIG9mIGNoYXJhY3RlcnMgdGhhdCBuZWVkcyB0byBiZSBlbnRlcmVkIGJlZm9yZVxuICAgKiB0eXBlYWhlYWQga2lja3MtaW4uIFdoZW4gc2V0IHRvIDAsIHR5cGVhaGVhZCBzaG93cyBvbiBmb2N1cyB3aXRoIGZ1bGxcbiAgICogbGlzdCBvZiBvcHRpb25zIChsaW1pdGVkIGFzIG5vcm1hbCBieSB0eXBlYWhlYWRPcHRpb25zTGltaXQpXG4gICAqL1xuICBASW5wdXQoKSB0eXBlYWhlYWRNaW5MZW5ndGg6IG51bWJlciA9IHZvaWQgMDtcbiAgLyoqIHNldHMgdXNlIGFkYXB0aXZlIHBvc2l0aW9uICovXG4gIEBJbnB1dCgpIGFkYXB0aXZlUG9zaXRpb246IGJvb2xlYW47XG4gIC8qKiB0dXJuIG9uL29mZiBhbmltYXRpb24gKi9cbiAgQElucHV0KCkgaXNBbmltYXRlZCA9IGZhbHNlO1xuICAvKiogbWluaW1hbCB3YWl0IHRpbWUgYWZ0ZXIgbGFzdCBjaGFyYWN0ZXIgdHlwZWQgYmVmb3JlIHR5cGVhaGVhZCBraWNrcy1pbiAqL1xuICBASW5wdXQoKSB0eXBlYWhlYWRXYWl0TXM6IG51bWJlcjtcbiAgLyoqIG1heGltdW0gbGVuZ3RoIG9mIG9wdGlvbnMgaXRlbXMgbGlzdC4gVGhlIGRlZmF1bHQgdmFsdWUgaXMgMjAgKi9cbiAgQElucHV0KCkgdHlwZWFoZWFkT3B0aW9uc0xpbWl0OiBudW1iZXI7XG4gIC8qKiB3aGVuIG9wdGlvbnMgc291cmNlIGlzIGFuIGFycmF5IG9mIG9iamVjdHMsIHRoZSBuYW1lIG9mIGZpZWxkXG4gICAqIHRoYXQgY29udGFpbnMgdGhlIG9wdGlvbnMgdmFsdWUsIHdlIHVzZSBhcnJheSBpdGVtIGFzIG9wdGlvbiBpbiBjYXNlXG4gICAqIG9mIHRoaXMgZmllbGQgaXMgbWlzc2luZy4gU3VwcG9ydHMgbmVzdGVkIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMuXG4gICAqL1xuICBASW5wdXQoKSB0eXBlYWhlYWRPcHRpb25GaWVsZDogc3RyaW5nO1xuICAvKiogd2hlbiBvcHRpb25zIHNvdXJjZSBpcyBhbiBhcnJheSBvZiBvYmplY3RzLCB0aGUgbmFtZSBvZiBmaWVsZCB0aGF0XG4gICAqIGNvbnRhaW5zIHRoZSBncm91cCB2YWx1ZSwgbWF0Y2hlcyBhcmUgZ3JvdXBlZCBieSB0aGlzIGZpZWxkIHdoZW4gc2V0LlxuICAgKi9cbiAgQElucHV0KCkgdHlwZWFoZWFkR3JvdXBGaWVsZDogc3RyaW5nO1xuICAvKiogc2hvdWxkIGJlIHVzZWQgb25seSBpbiBjYXNlIG9mIHR5cGVhaGVhZCBhdHRyaWJ1dGUgaXMgYXJyYXkuXG4gICAqIElmIHRydWUgLSBsb2FkaW5nIG9mIG9wdGlvbnMgd2lsbCBiZSBhc3luYywgb3RoZXJ3aXNlIC0gc3luYy5cbiAgICogdHJ1ZSBtYWtlIHNlbnNlIGlmIG9wdGlvbnMgYXJyYXkgaXMgbGFyZ2UuXG4gICAqL1xuICBASW5wdXQoKSB0eXBlYWhlYWRBc3luYzogYm9vbGVhbiA9IHZvaWQgMDtcbiAgLyoqIG1hdGNoIGxhdGluIHN5bWJvbHMuXG4gICAqIElmIHRydWUgdGhlIHdvcmQgc8O6cGVyIHdvdWxkIG1hdGNoIHN1cGVyIGFuZCB2aWNlIHZlcnNhLlxuICAgKi9cbiAgQElucHV0KCkgdHlwZWFoZWFkTGF0aW5pemUgPSB0cnVlO1xuICAvKiogQ2FuIGJlIHVzZSB0byBzZWFyY2ggd29yZHMgYnkgaW5zZXJ0aW5nIGEgc2luZ2xlIHdoaXRlIHNwYWNlIGJldHdlZW4gZWFjaCBjaGFyYWN0ZXJzXG4gICAqICBmb3IgZXhhbXBsZSAnQyBhIGwgaSBmIG8gciBuIGkgYScgd2lsbCBtYXRjaCAnQ2FsaWZvcm5pYScuXG4gICAqL1xuICBASW5wdXQoKSB0eXBlYWhlYWRTaW5nbGVXb3JkcyA9IHRydWU7XG4gIC8qKiBzaG91bGQgYmUgdXNlZCBvbmx5IGluIGNhc2UgdHlwZWFoZWFkU2luZ2xlV29yZHMgYXR0cmlidXRlIGlzIHRydWUuXG4gICAqIFNldHMgdGhlIHdvcmQgZGVsaW1pdGVyIHRvIGJyZWFrIHdvcmRzLiBEZWZhdWx0cyB0byBzcGFjZS5cbiAgICovXG4gIEBJbnB1dCgpIHR5cGVhaGVhZFdvcmREZWxpbWl0ZXJzID0gJyAnO1xuICAvKiogc2hvdWxkIGJlIHVzZWQgb25seSBpbiBjYXNlIHR5cGVhaGVhZFNpbmdsZVdvcmRzIGF0dHJpYnV0ZSBpcyB0cnVlLlxuICAgKiBTZXRzIHRoZSB3b3JkIGRlbGltaXRlciB0byBtYXRjaCBleGFjdCBwaHJhc2UuXG4gICAqIERlZmF1bHRzIHRvIHNpbXBsZSBhbmQgZG91YmxlIHF1b3Rlcy5cbiAgICovXG4gIEBJbnB1dCgpIHR5cGVhaGVhZFBocmFzZURlbGltaXRlcnMgPSAnXFwnXCInO1xuICAvKiogdXNlZCB0byBzcGVjaWZ5IGEgY3VzdG9tIGl0ZW0gdGVtcGxhdGUuXG4gICAqIFRlbXBsYXRlIHZhcmlhYmxlcyBleHBvc2VkIGFyZSBjYWxsZWQgaXRlbSBhbmQgaW5kZXg7XG4gICAqL1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgQElucHV0KCkgdHlwZWFoZWFkSXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAvKiogdXNlZCB0byBzcGVjaWZ5IGEgY3VzdG9tIG9wdGlvbnMgbGlzdCB0ZW1wbGF0ZS5cbiAgICogVGVtcGxhdGUgdmFyaWFibGVzOiBtYXRjaGVzLCBpdGVtVGVtcGxhdGUsIHF1ZXJ5XG4gICAqL1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgQElucHV0KCkgb3B0aW9uc0xpc3RUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgLyoqIHNwZWNpZmllcyBpZiB0eXBlYWhlYWQgaXMgc2Nyb2xsYWJsZSAgKi9cbiAgQElucHV0KCkgdHlwZWFoZWFkU2Nyb2xsYWJsZSA9IGZhbHNlO1xuICAvKiogc3BlY2lmaWVzIG51bWJlciBvZiBvcHRpb25zIHRvIHNob3cgaW4gc2Nyb2xsIHZpZXcgICovXG4gIEBJbnB1dCgpIHR5cGVhaGVhZE9wdGlvbnNJblNjcm9sbGFibGVWaWV3ID0gNTtcbiAgLyoqIHVzZWQgdG8gaGlkZSByZXN1bHQgb24gYmx1ciAqL1xuICBASW5wdXQoKSB0eXBlYWhlYWRIaWRlUmVzdWx0c09uQmx1cjogYm9vbGVhbjtcbiAgLyoqIGZpcmVkIHdoZW4gYW4gb3B0aW9ucyBsaXN0IHdhcyBvcGVuZWQgYW5kIHRoZSB1c2VyIGNsaWNrZWQgVGFiXG4gICAqIElmIGEgdmFsdWUgZXF1YWwgdHJ1ZSwgaXQgd2lsbCBiZSBjaG9zZW4gZmlyc3Qgb3IgYWN0aXZlIGl0ZW0gaW4gdGhlIGxpc3RcbiAgICogSWYgdmFsdWUgZXF1YWwgZmFsc2UsIGl0IHdpbGwgYmUgY2hvc2VuIGFuIGFjdGl2ZSBpdGVtIGluIHRoZSBsaXN0IG9yIG5vdGhpbmdcbiAgICovXG4gIEBJbnB1dCgpIHR5cGVhaGVhZFNlbGVjdEZpcnN0SXRlbSA9IHRydWU7XG4gIC8qKiBtYWtlcyBhY3RpdmUgZmlyc3QgaXRlbSBpbiBhIGxpc3QgKi9cbiAgQElucHV0KCkgdHlwZWFoZWFkSXNGaXJzdEl0ZW1BY3RpdmUgPSB0cnVlO1xuICAvKiogZmlyZWQgd2hlbiAnYnVzeScgc3RhdGUgb2YgdGhpcyBjb21wb25lbnQgd2FzIGNoYW5nZWQsXG4gICAqIGZpcmVkIG9uIGFzeW5jIG1vZGUgb25seSwgcmV0dXJucyBib29sZWFuXG4gICAqL1xuICBAT3V0cHV0KCkgdHlwZWFoZWFkTG9hZGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgLyoqIGZpcmVkIG9uIGV2ZXJ5IGtleSBldmVudCBhbmQgcmV0dXJucyB0cnVlXG4gICAqIGluIGNhc2Ugb2YgbWF0Y2hlcyBhcmUgbm90IGRldGVjdGVkXG4gICAqL1xuICBAT3V0cHV0KCkgdHlwZWFoZWFkTm9SZXN1bHRzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICAvKiogZmlyZWQgd2hlbiBvcHRpb24gd2FzIHNlbGVjdGVkLCByZXR1cm4gb2JqZWN0IHdpdGggZGF0YSBvZiB0aGlzIG9wdGlvbiAqL1xuICBAT3V0cHV0KCkgdHlwZWFoZWFkT25TZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPFR5cGVhaGVhZE1hdGNoPigpO1xuICAvKiogZmlyZWQgd2hlbiBibHVyIGV2ZW50IG9jY3Vycy4gcmV0dXJucyB0aGUgYWN0aXZlIGl0ZW0gKi9cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICBAT3V0cHV0KCkgdHlwZWFoZWFkT25CbHVyID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLyoqXG4gICAqIEEgc2VsZWN0b3Igc3BlY2lmeWluZyB0aGUgZWxlbWVudCB0aGUgdHlwZWFoZWFkIHNob3VsZCBiZSBhcHBlbmRlZCB0by5cbiAgICovXG4gIEBJbnB1dCgpIGNvbnRhaW5lcjogc3RyaW5nO1xuXG4gIC8qKiBUaGlzIGF0dHJpYnV0ZSBpbmRpY2F0ZXMgdGhhdCB0aGUgZHJvcGRvd24gc2hvdWxkIGJlIG9wZW5lZCB1cHdhcmRzICovXG4gIEBJbnB1dCgpIGRyb3B1cCA9IGZhbHNlO1xuXG4gIC8vIG5vdCB5ZXQgaW1wbGVtZW50ZWRcbiAgLyoqIGlmIGZhbHNlIHJlc3RyaWN0IG1vZGVsIHZhbHVlcyB0byB0aGUgb25lcyBzZWxlY3RlZCBmcm9tIHRoZSBwb3B1cCBvbmx5IHdpbGwgYmUgcHJvdmlkZWQgKi9cbiAgLy8gQElucHV0KCkgcHJvdGVjdGVkIHR5cGVhaGVhZEVkaXRhYmxlOmJvb2xlYW47XG4gIC8qKiBpZiBmYWxzZSB0aGUgZmlyc3QgbWF0Y2ggYXV0b21hdGljYWxseSB3aWxsIG5vdCBiZSBmb2N1c2VkIGFzIHlvdSB0eXBlICovXG4gIC8vIEBJbnB1dCgpIHByb3RlY3RlZCB0eXBlYWhlYWRGb2N1c0ZpcnN0OmJvb2xlYW47XG4gIC8qKiBmb3JtYXQgdGhlIG5nLW1vZGVsIHJlc3VsdCBhZnRlciBzZWxlY3Rpb24gKi9cbiAgLy8gQElucHV0KCkgcHJvdGVjdGVkIHR5cGVhaGVhZElucHV0Rm9ybWF0dGVyOmFueTtcbiAgLyoqIGlmIHRydWUgYXV0b21hdGljYWxseSBzZWxlY3QgYW4gaXRlbSB3aGVuIHRoZXJlIGlzIG9uZSBvcHRpb24gdGhhdCBleGFjdGx5IG1hdGNoZXMgdGhlIHVzZXIgaW5wdXQgKi9cbiAgLy8gQElucHV0KCkgcHJvdGVjdGVkIHR5cGVhaGVhZFNlbGVjdE9uRXhhY3Q6Ym9vbGVhbjtcbiAgLyoqICBpZiB0cnVlIHNlbGVjdCB0aGUgY3VycmVudGx5IGhpZ2hsaWdodGVkIG1hdGNoIG9uIGJsdXIgKi9cbiAgLy8gQElucHV0KCkgcHJvdGVjdGVkIHR5cGVhaGVhZFNlbGVjdE9uQmx1cjpib29sZWFuO1xuICAvKiogIGlmIGZhbHNlIGRvbid0IGZvY3VzIHRoZSBpbnB1dCBlbGVtZW50IHRoZSB0eXBlYWhlYWQgZGlyZWN0aXZlIGlzIGFzc29jaWF0ZWQgd2l0aCBvbiBzZWxlY3Rpb24gKi9cbiAgICAvLyBASW5wdXQoKSBwcm90ZWN0ZWQgdHlwZWFoZWFkRm9jdXNPblNlbGVjdDpib29sZWFuO1xuXG4gIF9jb250YWluZXI6IFR5cGVhaGVhZENvbnRhaW5lckNvbXBvbmVudDtcbiAgaXNBY3RpdmVJdGVtQ2hhbmdlZCA9IGZhbHNlO1xuICBpc1R5cGVhaGVhZE9wdGlvbnNMaXN0QWN0aXZlID0gZmFsc2U7XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICBwcm90ZWN0ZWQga2V5VXBFdmVudEVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwcm90ZWN0ZWQgX21hdGNoZXM6IFR5cGVhaGVhZE1hdGNoW107XG4gIHByb3RlY3RlZCBwbGFjZW1lbnQgPSAnYm90dG9tLWxlZnQnO1xuICAvLyBwcm90ZWN0ZWQgcG9wdXA6Q29tcG9uZW50UmVmPFR5cGVhaGVhZENvbnRhaW5lckNvbXBvbmVudD47XG5cbiAgcHJpdmF0ZSBfdHlwZWFoZWFkOiBDb21wb25lbnRMb2FkZXI8VHlwZWFoZWFkQ29udGFpbmVyQ29tcG9uZW50PjtcbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBfb3V0c2lkZUNsaWNrTGlzdGVuZXI6IEZ1bmN0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGNpczogQ29tcG9uZW50TG9hZGVyRmFjdG9yeSxcbiAgICBjb25maWc6IFR5cGVhaGVhZENvbmZpZyxcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgbmdDb250cm9sOiBOZ0NvbnRyb2wsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWZcbiAgKSB7XG5cbiAgICB0aGlzLl90eXBlYWhlYWQgPSBjaXMuY3JlYXRlTG9hZGVyPFR5cGVhaGVhZENvbnRhaW5lckNvbXBvbmVudD4oXG4gICAgICBlbGVtZW50LFxuICAgICAgdmlld0NvbnRhaW5lclJlZixcbiAgICAgIHJlbmRlcmVyXG4gICAgKVxuICAgICAgLnByb3ZpZGUoeyBwcm92aWRlOiBUeXBlYWhlYWRDb25maWcsIHVzZVZhbHVlOiBjb25maWcgfSk7XG5cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsXG4gICAgICB7XG4gICAgICAgIHR5cGVhaGVhZEhpZGVSZXN1bHRzT25CbHVyOiBjb25maWcuaGlkZVJlc3VsdHNPbkJsdXIsXG4gICAgICAgIHR5cGVhaGVhZFNlbGVjdEZpcnN0SXRlbTogY29uZmlnLnNlbGVjdEZpcnN0SXRlbSxcbiAgICAgICAgdHlwZWFoZWFkSXNGaXJzdEl0ZW1BY3RpdmU6IGNvbmZpZy5pc0ZpcnN0SXRlbUFjdGl2ZSxcbiAgICAgICAgdHlwZWFoZWFkTWluTGVuZ3RoOiBjb25maWcubWluTGVuZ3RoLFxuICAgICAgICBhZGFwdGl2ZVBvc2l0aW9uOiBjb25maWcuYWRhcHRpdmVQb3NpdGlvbixcbiAgICAgICAgaXNBbmltYXRlZDogY29uZmlnLmlzQW5pbWF0ZWRcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy50eXBlYWhlYWRPcHRpb25zTGltaXQgPSB0aGlzLnR5cGVhaGVhZE9wdGlvbnNMaW1pdCB8fCAyMDtcblxuICAgIHRoaXMudHlwZWFoZWFkTWluTGVuZ3RoID1cbiAgICAgIHRoaXMudHlwZWFoZWFkTWluTGVuZ3RoID09PSB2b2lkIDAgPyAxIDogdGhpcy50eXBlYWhlYWRNaW5MZW5ndGg7XG5cbiAgICB0aGlzLnR5cGVhaGVhZFdhaXRNcyA9IHRoaXMudHlwZWFoZWFkV2FpdE1zIHx8IDA7XG5cbiAgICAvLyBhc3luYyBzaG91bGQgYmUgZmFsc2UgaW4gY2FzZSBvZiBhcnJheVxuICAgIGlmIChcbiAgICAgIHRoaXMudHlwZWFoZWFkQXN5bmMgPT09IHVuZGVmaW5lZCAmJlxuICAgICAgIShpc09ic2VydmFibGUodGhpcy50eXBlYWhlYWQpKVxuICAgICkge1xuICAgICAgdGhpcy50eXBlYWhlYWRBc3luYyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChpc09ic2VydmFibGUodGhpcy50eXBlYWhlYWQpKSB7XG4gICAgICB0aGlzLnR5cGVhaGVhZEFzeW5jID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy50eXBlYWhlYWRBc3luYykge1xuICAgICAgdGhpcy5hc3luY0FjdGlvbnMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zeW5jQWN0aW9ucygpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2lucHV0JywgWyckZXZlbnQnXSlcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICBvbklucHV0KGU6IGFueSk6IHZvaWQge1xuICAgIC8vIEZvciBgPGlucHV0PmBzLCB1c2UgdGhlIGB2YWx1ZWAgcHJvcGVydHkuIEZvciBvdGhlcnMgdGhhdCBkb24ndCBoYXZlIGFcbiAgICAvLyBgdmFsdWVgIChzdWNoIGFzIGA8c3BhbiBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCI+YCksIHVzZSBlaXRoZXJcbiAgICAvLyBgdGV4dENvbnRlbnRgIG9yIGBpbm5lclRleHRgIChkZXBlbmRpbmcgb24gd2hpY2ggb25lIGlzIHN1cHBvcnRlZCwgaS5lLlxuICAgIC8vIEZpcmVmb3ggb3IgSUUpLlxuICAgIGNvbnN0IHZhbHVlID1cbiAgICAgIGUudGFyZ2V0LnZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgICAgPyBlLnRhcmdldC52YWx1ZVxuICAgICAgICA6IGUudGFyZ2V0LnRleHRDb250ZW50ICE9PSB1bmRlZmluZWRcbiAgICAgICAgPyBlLnRhcmdldC50ZXh0Q29udGVudFxuICAgICAgICA6IGUudGFyZ2V0LmlubmVyVGV4dDtcbiAgICBpZiAodmFsdWUgIT0gbnVsbCAmJiB2YWx1ZS50cmltKCkubGVuZ3RoID49IHRoaXMudHlwZWFoZWFkTWluTGVuZ3RoKSB7XG4gICAgICB0aGlzLnR5cGVhaGVhZExvYWRpbmcuZW1pdCh0cnVlKTtcbiAgICAgIHRoaXMua2V5VXBFdmVudEVtaXR0ZXIuZW1pdChlLnRhcmdldC52YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudHlwZWFoZWFkTG9hZGluZy5lbWl0KGZhbHNlKTtcbiAgICAgIHRoaXMudHlwZWFoZWFkTm9SZXN1bHRzLmVtaXQoZmFsc2UpO1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5dXAnLCBbJyRldmVudCddKVxuICBvbkNoYW5nZShldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jb250YWluZXIpIHtcbiAgICAgIC8vIGVzY1xuICAgICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvbiAqL1xuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDI3IHx8IGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyB1cFxuICAgICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvbiAqL1xuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM4IHx8IGV2ZW50LmtleSA9PT0gJ0Fycm93VXAnKSB7XG4gICAgICAgIHRoaXMuaXNBY3RpdmVJdGVtQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5wcmV2QWN0aXZlTWF0Y2goKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGRvd25cbiAgICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb24gKi9cbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSA0MCB8fCBldmVudC5rZXkgPT09ICdBcnJvd0Rvd24nKSB7XG4gICAgICAgIHRoaXMuaXNBY3RpdmVJdGVtQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5uZXh0QWN0aXZlTWF0Y2goKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGVudGVyXG4gICAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uICovXG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMgfHwgZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5zZWxlY3RBY3RpdmVNYXRjaCgpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJylcbiAgb25Gb2N1cygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50eXBlYWhlYWRNaW5MZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMudHlwZWFoZWFkTG9hZGluZy5lbWl0KHRydWUpO1xuICAgICAgdGhpcy5rZXlVcEV2ZW50RW1pdHRlci5lbWl0KHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlIHx8ICcnKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgb25CbHVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jb250YWluZXIgJiYgIXRoaXMuX2NvbnRhaW5lci5pc0ZvY3VzZWQpIHtcbiAgICAgIHRoaXMudHlwZWFoZWFkT25CbHVyLmVtaXQodGhpcy5fY29udGFpbmVyLmFjdGl2ZSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIC8vIG5vIGNvbnRhaW5lciAtIG5vIHByb2JsZW1zXG4gICAgaWYgKCF0aGlzLl9jb250YWluZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uICovXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDkgfHwgZXZlbnQua2V5ID09PSAnVGFiJyB8fCBldmVudC5rZXlDb2RlID09PSAxMyB8fCBldmVudC5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAodGhpcy50eXBlYWhlYWRTZWxlY3RGaXJzdEl0ZW0pIHtcbiAgICAgICAgdGhpcy5fY29udGFpbmVyLnNlbGVjdEFjdGl2ZU1hdGNoKCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMudHlwZWFoZWFkU2VsZWN0Rmlyc3RJdGVtKSB7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5zZWxlY3RBY3RpdmVNYXRjaCh0aGlzLmlzQWN0aXZlSXRlbUNoYW5nZWQpO1xuICAgICAgICB0aGlzLmlzQWN0aXZlSXRlbUNoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2hhbmdlTW9kZWwobWF0Y2g6IFR5cGVhaGVhZE1hdGNoKTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWVTdHI6IHN0cmluZyA9IG1hdGNoLnZhbHVlO1xuICAgIHRoaXMubmdDb250cm9sLnZpZXdUb01vZGVsVXBkYXRlKHZhbHVlU3RyKTtcbiAgICAodGhpcy5uZ0NvbnRyb2wuY29udHJvbCkuc2V0VmFsdWUodmFsdWVTdHIpO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0aW9uLm1hcmtGb3JDaGVjaygpO1xuICAgIHRoaXMuaGlkZSgpO1xuICB9XG5cbiAgZ2V0IG1hdGNoZXMoKTogVHlwZWFoZWFkTWF0Y2hbXSB7XG4gICAgcmV0dXJuIHRoaXMuX21hdGNoZXM7XG4gIH1cblxuICBzaG93KCk6IHZvaWQge1xuICAgIHRoaXMuX3R5cGVhaGVhZFxuICAgICAgLmF0dGFjaChUeXBlYWhlYWRDb250YWluZXJDb21wb25lbnQpXG4gICAgICAvLyB0b2RvOiBhZGQgYXBwZW5kIHRvIGJvZHksIGFmdGVyIHVwZGF0aW5nIHBvc2l0aW9uaW5nIHNlcnZpY2VcbiAgICAgIC50byh0aGlzLmNvbnRhaW5lcilcbiAgICAgIC5wb3NpdGlvbih7YXR0YWNobWVudDogYCR7dGhpcy5kcm9wdXAgPyAndG9wJyA6ICdib3R0b20nfSBzdGFydGB9KVxuICAgICAgLnNob3coe1xuICAgICAgICB0eXBlYWhlYWRSZWY6IHRoaXMsXG4gICAgICAgIHBsYWNlbWVudDogdGhpcy5wbGFjZW1lbnQsXG4gICAgICAgIGFuaW1hdGlvbjogZmFsc2UsXG4gICAgICAgIGRyb3B1cDogdGhpcy5kcm9wdXBcbiAgICAgIH0pO1xuXG4gICAgdGhpcy5fb3V0c2lkZUNsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAnY2xpY2snLCAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgaWYgKHRoaXMudHlwZWFoZWFkTWluTGVuZ3RoID09PSAwICYmIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGUudGFyZ2V0KSkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLnR5cGVhaGVhZEhpZGVSZXN1bHRzT25CbHVyIHx8IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGUudGFyZ2V0KSkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgdGhpcy5vbk91dHNpZGVDbGljaygpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fY29udGFpbmVyID0gdGhpcy5fdHlwZWFoZWFkLmluc3RhbmNlO1xuICAgIHRoaXMuX2NvbnRhaW5lci5wYXJlbnQgPSB0aGlzO1xuICAgIC8vIFRoaXMgaW1wcm92ZXMgdGhlIHNwZWVkIGFzIGl0IHdvbid0IGhhdmUgdG8gYmUgZG9uZSBmb3IgZWFjaCBsaXN0IGl0ZW1cbiAgICBjb25zdCBub3JtYWxpemVkUXVlcnkgPSAodGhpcy50eXBlYWhlYWRMYXRpbml6ZVxuICAgICAgPyBsYXRpbml6ZSh0aGlzLm5nQ29udHJvbC5jb250cm9sLnZhbHVlKVxuICAgICAgOiB0aGlzLm5nQ29udHJvbC5jb250cm9sLnZhbHVlKVxuICAgICAgLnRvU3RyaW5nKClcbiAgICAgIC50b0xvd2VyQ2FzZSgpO1xuICAgIHRoaXMuX2NvbnRhaW5lci5xdWVyeSA9IHRoaXMudHlwZWFoZWFkU2luZ2xlV29yZHNcbiAgICAgID8gdG9rZW5pemUoXG4gICAgICAgIG5vcm1hbGl6ZWRRdWVyeSxcbiAgICAgICAgdGhpcy50eXBlYWhlYWRXb3JkRGVsaW1pdGVycyxcbiAgICAgICAgdGhpcy50eXBlYWhlYWRQaHJhc2VEZWxpbWl0ZXJzXG4gICAgICApXG4gICAgICA6IG5vcm1hbGl6ZWRRdWVyeTtcbiAgICB0aGlzLl9jb250YWluZXIubWF0Y2hlcyA9IHRoaXMuX21hdGNoZXM7XG4gICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIGhpZGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3R5cGVhaGVhZC5pc1Nob3duKSB7XG4gICAgICB0aGlzLl90eXBlYWhlYWQuaGlkZSgpO1xuICAgICAgdGhpcy5fb3V0c2lkZUNsaWNrTGlzdGVuZXIoKTtcbiAgICAgIHRoaXMuX2NvbnRhaW5lciA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgb25PdXRzaWRlQ2xpY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2NvbnRhaW5lciAmJiAhdGhpcy5fY29udGFpbmVyLmlzRm9jdXNlZCkge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgLy8gY2xlYW4gdXAgc3Vic2NyaXB0aW9uc1xuICAgIGZvciAoY29uc3Qgc3ViIG9mIHRoaXMuX3N1YnNjcmlwdGlvbnMpIHtcbiAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICB0aGlzLl90eXBlYWhlYWQuZGlzcG9zZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFzeW5jQWN0aW9ucygpOiB2b2lkIHtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmtleVVwRXZlbnRFbWl0dGVyXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGRlYm91bmNlVGltZSh0aGlzLnR5cGVhaGVhZFdhaXRNcyksXG4gICAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMudHlwZWFoZWFkKVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKG1hdGNoZXM6IFR5cGVhaGVhZE1hdGNoW10pID0+IHtcbiAgICAgICAgICB0aGlzLmZpbmFsaXplQXN5bmNDYWxsKG1hdGNoZXMpO1xuICAgICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc3luY0FjdGlvbnMoKTogdm9pZCB7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5rZXlVcEV2ZW50RW1pdHRlclxuICAgICAgICAucGlwZShcbiAgICAgICAgICBkZWJvdW5jZVRpbWUodGhpcy50eXBlYWhlYWRXYWl0TXMpLFxuICAgICAgICAgIG1lcmdlTWFwKCh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBub3JtYWxpemVkUXVlcnkgPSB0aGlzLm5vcm1hbGl6ZVF1ZXJ5KHZhbHVlKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZyb20odGhpcy50eXBlYWhlYWQpXG4gICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIGZpbHRlcigob3B0aW9uOiBUeXBlYWhlYWRNYXRjaCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICBvcHRpb24gJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXN0TWF0Y2godGhpcy5ub3JtYWxpemVPcHRpb24ob3B0aW9uKSwgbm9ybWFsaXplZFF1ZXJ5KVxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB0b0FycmF5KClcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKG1hdGNoZXM6IFR5cGVhaGVhZE1hdGNoW10pID0+IHtcbiAgICAgICAgICB0aGlzLmZpbmFsaXplQXN5bmNDYWxsKG1hdGNoZXMpO1xuICAgICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gIHByb3RlY3RlZCBub3JtYWxpemVPcHRpb24ob3B0aW9uOiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IG9wdGlvblZhbHVlOiBzdHJpbmcgPSBnZXRWYWx1ZUZyb21PYmplY3QoXG4gICAgICBvcHRpb24sXG4gICAgICB0aGlzLnR5cGVhaGVhZE9wdGlvbkZpZWxkXG4gICAgKTtcbiAgICBjb25zdCBub3JtYWxpemVkT3B0aW9uID0gdGhpcy50eXBlYWhlYWRMYXRpbml6ZVxuICAgICAgPyBsYXRpbml6ZShvcHRpb25WYWx1ZSlcbiAgICAgIDogb3B0aW9uVmFsdWU7XG5cbiAgICByZXR1cm4gbm9ybWFsaXplZE9wdGlvbi50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG5vcm1hbGl6ZVF1ZXJ5KHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcgfCBzdHJpbmdbXSB7XG4gICAgLy8gSWYgc2luZ2xlV29yZHMsIGJyZWFrIG1vZGVsIGhlcmUgdG8gbm90IGJlIGRvaW5nIGV4dHJhIHdvcmsgb24gZWFjaFxuICAgIC8vIGl0ZXJhdGlvblxuICAgIGxldCBub3JtYWxpemVkUXVlcnk6IHN0cmluZyB8IHN0cmluZ1tdID0gKHRoaXMudHlwZWFoZWFkTGF0aW5pemVcbiAgICAgID8gbGF0aW5pemUodmFsdWUpXG4gICAgICA6IHZhbHVlKVxuICAgICAgLnRvU3RyaW5nKClcbiAgICAgIC50b0xvd2VyQ2FzZSgpO1xuICAgIG5vcm1hbGl6ZWRRdWVyeSA9IHRoaXMudHlwZWFoZWFkU2luZ2xlV29yZHNcbiAgICAgID8gdG9rZW5pemUoXG4gICAgICAgIG5vcm1hbGl6ZWRRdWVyeSxcbiAgICAgICAgdGhpcy50eXBlYWhlYWRXb3JkRGVsaW1pdGVycyxcbiAgICAgICAgdGhpcy50eXBlYWhlYWRQaHJhc2VEZWxpbWl0ZXJzXG4gICAgICApXG4gICAgICA6IG5vcm1hbGl6ZWRRdWVyeTtcblxuICAgIHJldHVybiBub3JtYWxpemVkUXVlcnk7XG4gIH1cblxuICBwcm90ZWN0ZWQgdGVzdE1hdGNoKG1hdGNoOiBzdHJpbmcsIHRlc3Q6IHN0cmluZ1tdIHwgc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgbGV0IHNwYWNlTGVuZ3RoOiBudW1iZXI7XG5cbiAgICBpZiAodHlwZW9mIHRlc3QgPT09ICdvYmplY3QnKSB7XG4gICAgICBzcGFjZUxlbmd0aCA9IHRlc3QubGVuZ3RoO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcGFjZUxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmICh0ZXN0W2ldLmxlbmd0aCA+IDAgJiYgbWF0Y2guaW5kZXhPZih0ZXN0W2ldKSA8IDApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hdGNoLmluZGV4T2YodGVzdCkgPj0gMDtcbiAgfVxuXG4gIHByb3RlY3RlZCBmaW5hbGl6ZUFzeW5jQ2FsbChtYXRjaGVzOiBUeXBlYWhlYWRNYXRjaFtdKTogdm9pZCB7XG4gICAgdGhpcy5wcmVwYXJlTWF0Y2hlcyhtYXRjaGVzIHx8IFtdKTtcblxuICAgIHRoaXMudHlwZWFoZWFkTG9hZGluZy5lbWl0KGZhbHNlKTtcbiAgICB0aGlzLnR5cGVhaGVhZE5vUmVzdWx0cy5lbWl0KCF0aGlzLmhhc01hdGNoZXMoKSk7XG5cbiAgICBpZiAoIXRoaXMuaGFzTWF0Y2hlcygpKSB7XG4gICAgICB0aGlzLmhpZGUoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9jb250YWluZXIpIHtcbiAgICAgIC8vIGZpeDogcmVtb3ZlIHVzYWdlIG9mIG5nQ29udHJvbCBpbnRlcm5hbHNcbiAgICAgIGNvbnN0IF9jb250cm9sVmFsdWUgPSAodGhpcy50eXBlYWhlYWRMYXRpbml6ZVxuICAgICAgICA/IGxhdGluaXplKHRoaXMubmdDb250cm9sLmNvbnRyb2wudmFsdWUpXG4gICAgICAgIDogdGhpcy5uZ0NvbnRyb2wuY29udHJvbC52YWx1ZSkgfHwgJyc7XG4gICAgICAvLyBUaGlzIGltcHJvdmVzIHRoZSBzcGVlZCBhcyBpdCB3b24ndCBoYXZlIHRvIGJlIGRvbmUgZm9yIGVhY2ggbGlzdCBpdGVtXG4gICAgICBjb25zdCBub3JtYWxpemVkUXVlcnkgPSBfY29udHJvbFZhbHVlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIHRoaXMuX2NvbnRhaW5lci5xdWVyeSA9IHRoaXMudHlwZWFoZWFkU2luZ2xlV29yZHNcbiAgICAgICAgPyB0b2tlbml6ZShcbiAgICAgICAgICBub3JtYWxpemVkUXVlcnksXG4gICAgICAgICAgdGhpcy50eXBlYWhlYWRXb3JkRGVsaW1pdGVycyxcbiAgICAgICAgICB0aGlzLnR5cGVhaGVhZFBocmFzZURlbGltaXRlcnNcbiAgICAgICAgKVxuICAgICAgICA6IG5vcm1hbGl6ZWRRdWVyeTtcbiAgICAgIHRoaXMuX2NvbnRhaW5lci5tYXRjaGVzID0gdGhpcy5fbWF0Y2hlcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHByZXBhcmVNYXRjaGVzKG9wdGlvbnM6IFR5cGVhaGVhZE1hdGNoW10pOiB2b2lkIHtcbiAgICBjb25zdCBsaW1pdGVkOiBUeXBlYWhlYWRNYXRjaFtdID0gb3B0aW9ucy5zbGljZSgwLCB0aGlzLnR5cGVhaGVhZE9wdGlvbnNMaW1pdCk7XG5cbiAgICBpZiAodGhpcy50eXBlYWhlYWRHcm91cEZpZWxkKSB7XG4gICAgICBsZXQgbWF0Y2hlczogVHlwZWFoZWFkTWF0Y2hbXSA9IFtdO1xuXG4gICAgICAvLyBleHRyYWN0IGFsbCBncm91cCBuYW1lc1xuICAgICAgY29uc3QgZ3JvdXBzID0gbGltaXRlZFxuICAgICAgICAubWFwKChvcHRpb246IFR5cGVhaGVhZE1hdGNoKSA9PlxuICAgICAgICAgIGdldFZhbHVlRnJvbU9iamVjdChvcHRpb24sIHRoaXMudHlwZWFoZWFkR3JvdXBGaWVsZClcbiAgICAgICAgKVxuICAgICAgICAuZmlsdGVyKCh2OiBzdHJpbmcsIGk6IG51bWJlciwgYTogc3RyaW5nW10pID0+IGEuaW5kZXhPZih2KSA9PT0gaSk7XG5cbiAgICAgIGdyb3Vwcy5mb3JFYWNoKChncm91cDogc3RyaW5nKSA9PiB7XG4gICAgICAgIC8vIGFkZCBncm91cCBoZWFkZXIgdG8gYXJyYXkgb2YgbWF0Y2hlc1xuICAgICAgICBtYXRjaGVzLnB1c2gobmV3IFR5cGVhaGVhZE1hdGNoKGdyb3VwLCBncm91cCwgdHJ1ZSkpO1xuXG4gICAgICAgIC8vIGFkZCBlYWNoIGl0ZW0gb2YgZ3JvdXAgdG8gYXJyYXkgb2YgbWF0Y2hlc1xuICAgICAgICBtYXRjaGVzID0gbWF0Y2hlcy5jb25jYXQoXG4gICAgICAgICAgbGltaXRlZFxuICAgICAgICAgICAgLmZpbHRlcihcbiAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgICAgICAgICAgICAob3B0aW9uOiBhbnkpID0+XG4gICAgICAgICAgICAgICAgZ2V0VmFsdWVGcm9tT2JqZWN0KG9wdGlvbiwgdGhpcy50eXBlYWhlYWRHcm91cEZpZWxkKSA9PT0gZ3JvdXBcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5tYXAoXG4gICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgICAgICAgICAgICAgKG9wdGlvbjogYW55KSA9PlxuICAgICAgICAgICAgICAgIG5ldyBUeXBlYWhlYWRNYXRjaChcbiAgICAgICAgICAgICAgICAgIG9wdGlvbixcbiAgICAgICAgICAgICAgICAgIGdldFZhbHVlRnJvbU9iamVjdChvcHRpb24sIHRoaXMudHlwZWFoZWFkT3B0aW9uRmllbGQpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX21hdGNoZXMgPSBtYXRjaGVzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9tYXRjaGVzID0gbGltaXRlZC5tYXAoXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgICAgICAgKG9wdGlvbjogYW55KSA9PlxuICAgICAgICAgIG5ldyBUeXBlYWhlYWRNYXRjaChcbiAgICAgICAgICAgIG9wdGlvbixcbiAgICAgICAgICAgIGdldFZhbHVlRnJvbU9iamVjdChvcHRpb24sIHRoaXMudHlwZWFoZWFkT3B0aW9uRmllbGQpXG4gICAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgaGFzTWF0Y2hlcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbWF0Y2hlcy5sZW5ndGggPiAwO1xuICB9XG59XG4iXX0=