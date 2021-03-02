/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Injectable, Pipe } from '@angular/core';
import { isObservable } from 'rxjs';
import { TranslateService } from './translate.service';
import { equals, isDefined } from './util';
export class TranslatePipe {
    /**
     * @param {?} translate
     * @param {?} _ref
     */
    constructor(translate, _ref) {
        this.translate = translate;
        this._ref = _ref;
        this.value = '';
    }
    /**
     * @param {?} key
     * @param {?=} interpolateParams
     * @param {?=} translations
     * @return {?}
     */
    updateValue(key, interpolateParams, translations) {
        /** @type {?} */
        let onTranslation = (/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            this.value = res !== undefined ? res : key;
            this.lastKey = key;
            this._ref.markForCheck();
        });
        if (translations) {
            /** @type {?} */
            let res = this.translate.getParsedResult(translations, key, interpolateParams);
            if (isObservable(res.subscribe)) {
                res.subscribe(onTranslation);
            }
            else {
                onTranslation(res);
            }
        }
        this.translate.get(key, interpolateParams).subscribe(onTranslation);
    }
    /**
     * @param {?} query
     * @param {...?} args
     * @return {?}
     */
    transform(query, ...args) {
        if (!query || !query.length) {
            return query;
        }
        // if we ask another time for the same key, return the last value
        if (equals(query, this.lastKey) && equals(args, this.lastParams)) {
            return this.value;
        }
        /** @type {?} */
        let interpolateParams;
        if (isDefined(args[0]) && args.length) {
            if (typeof args[0] === 'string' && args[0].length) {
                // we accept objects written in the template such as {n:1}, {'n':1}, {n:'v'}
                // which is why we might need to change it to real JSON objects such as {"n":1} or {"n":"v"}
                /** @type {?} */
                let validArgs = args[0]
                    .replace(/(\')?([a-zA-Z0-9_]+)(\')?(\s)?:/g, '"$2":')
                    .replace(/:(\s)?(\')(.*?)(\')/g, ':"$3"');
                try {
                    interpolateParams = JSON.parse(validArgs);
                }
                catch (e) {
                    throw new SyntaxError(`Wrong parameter in TranslatePipe. Expected a valid Object, received: ${args[0]}`);
                }
            }
            else if (typeof args[0] === 'object' && !Array.isArray(args[0])) {
                interpolateParams = args[0];
            }
        }
        // store the query, in case it changes
        this.lastKey = query;
        // store the params, in case they change
        this.lastParams = args;
        // set the value
        this.updateValue(query, interpolateParams);
        // if there is a subscription to onLangChange, clean it
        this._dispose();
        // subscribe to onTranslationChange event, in case the translations change
        if (!this.onTranslationChange) {
            this.onTranslationChange = this.translate.onTranslationChange.subscribe((/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                if (this.lastKey && event.lang === this.translate.currentLang) {
                    this.lastKey = null;
                    this.updateValue(query, interpolateParams, event.translations);
                }
            }));
        }
        // subscribe to onLangChange event, in case the language changes
        if (!this.onLangChange) {
            this.onLangChange = this.translate.onLangChange.subscribe((/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                if (this.lastKey) {
                    this.lastKey = null; // we want to make sure it doesn't return the same value until it's been updated
                    this.updateValue(query, interpolateParams, event.translations);
                }
            }));
        }
        // subscribe to onDefaultLangChange event, in case the default language changes
        if (!this.onDefaultLangChange) {
            this.onDefaultLangChange = this.translate.onDefaultLangChange.subscribe((/**
             * @return {?}
             */
            () => {
                if (this.lastKey) {
                    this.lastKey = null; // we want to make sure it doesn't return the same value until it's been updated
                    this.updateValue(query, interpolateParams);
                }
            }));
        }
        return this.value;
    }
    /**
     * Clean any existing subscription to change events
     * @private
     * @return {?}
     */
    _dispose() {
        if (typeof this.onTranslationChange !== 'undefined') {
            this.onTranslationChange.unsubscribe();
            this.onTranslationChange = undefined;
        }
        if (typeof this.onLangChange !== 'undefined') {
            this.onLangChange.unsubscribe();
            this.onLangChange = undefined;
        }
        if (typeof this.onDefaultLangChange !== 'undefined') {
            this.onDefaultLangChange.unsubscribe();
            this.onDefaultLangChange = undefined;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._dispose();
    }
}
TranslatePipe.decorators = [
    { type: Injectable },
    { type: Pipe, args: [{
                name: 'translate',
                pure: false // required to update the value when the promise is resolved
            },] }
];
/** @nocollapse */
TranslatePipe.ctorParameters = () => [
    { type: TranslateService },
    { type: ChangeDetectorRef }
];
if (false) {
    /** @type {?} */
    TranslatePipe.prototype.value;
    /** @type {?} */
    TranslatePipe.prototype.lastKey;
    /** @type {?} */
    TranslatePipe.prototype.lastParams;
    /** @type {?} */
    TranslatePipe.prototype.onTranslationChange;
    /** @type {?} */
    TranslatePipe.prototype.onLangChange;
    /** @type {?} */
    TranslatePipe.prototype.onDefaultLangChange;
    /**
     * @type {?}
     * @private
     */
    TranslatePipe.prototype.translate;
    /**
     * @type {?}
     * @private
     */
    TranslatePipe.prototype._ref;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LXRyYW5zbGF0ZS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3RyYW5zbGF0ZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsaUJBQWlCLEVBQWdCLFVBQVUsRUFBYSxJQUFJLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBQzFHLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDbEMsT0FBTyxFQUEwQyxnQkFBZ0IsRUFBeUIsTUFBTSxxQkFBcUIsQ0FBQztBQUN0SCxPQUFPLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLFFBQVEsQ0FBQztBQVF6QyxNQUFNLE9BQU8sYUFBYTs7Ozs7SUFReEIsWUFBb0IsU0FBMkIsRUFBVSxJQUF1QjtRQUE1RCxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQW1CO1FBUGhGLFVBQUssR0FBVyxFQUFFLENBQUM7SUFRbkIsQ0FBQzs7Ozs7OztJQUVELFdBQVcsQ0FBQyxHQUFXLEVBQUUsaUJBQTBCLEVBQUUsWUFBa0I7O1lBQ2pFLGFBQWE7Ozs7UUFBRyxDQUFDLEdBQVcsRUFBRSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDM0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7WUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUE7UUFDRCxJQUFJLFlBQVksRUFBRTs7Z0JBQ1osR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUUsaUJBQWlCLENBQUM7WUFDOUUsSUFBSSxZQUFZLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxF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QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsU0FBUyxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQzs7O1lBOUhGLFVBQVU7WUFDVixJQUFJLFNBQUM7Z0JBQ0osSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLElBQUksRUFBRSxLQUFLLENBQUMsNERBQTREO2FBQ3pFOzs7O1lBUmdELGdCQUFnQjtZQUZ6RCxpQkFBaUI7Ozs7SUFZdkIsOEJBQW1COztJQUNuQixnQ0FBZ0I7O0lBQ2hCLG1DQUFrQjs7SUFDbEIsNENBQWtDOztJQUNsQyxxQ0FBMkI7O0lBQzNCLDRDQUFrQzs7Ozs7SUFFdEIsa0NBQW1DOzs7OztJQUFFLDZCQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIEV2ZW50RW1pdHRlciwgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aXNPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7RGVmYXVsdExhbmdDaGFuZ2VFdmVudCwgTGFuZ0NoYW5nZUV2ZW50LCBUcmFuc2xhdGVTZXJ2aWNlLCBUcmFuc2xhdGlvbkNoYW5nZUV2ZW50fSBmcm9tICcuL3RyYW5zbGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7ZXF1YWxzLCBpc0RlZmluZWR9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKVxuQFBpcGUoe1xuICBuYW1lOiAndHJhbnNsYXRlJyxcbiAgcHVyZTogZmFsc2UgLy8gcmVxdWlyZWQgdG8gdXBkYXRlIHRoZSB2YWx1ZSB3aGVuIHRoZSBwcm9taXNlIGlzIHJlc29sdmVkXG59KVxuZXhwb3J0IGNsYXNzIFRyYW5zbGF0ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtLCBPbkRlc3Ryb3kge1xuICB2YWx1ZTogc3RyaW5nID0gJyc7XG4gIGxhc3RLZXk6IHN0cmluZztcbiAgbGFzdFBhcmFtczogYW55W107XG4gIG9uVHJhbnNsYXRpb25DaGFuZ2U6IFN1YnNjcmlwdGlvbjtcbiAgb25MYW5nQ2hhbmdlOiBTdWJzY3JpcHRpb247XG4gIG9uRGVmYXVsdExhbmdDaGFuZ2U6IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSwgcHJpdmF0ZSBfcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICB9XG5cbiAgdXBkYXRlVmFsdWUoa2V5OiBzdHJpbmcsIGludGVycG9sYXRlUGFyYW1zPzogT2JqZWN0LCB0cmFuc2xhdGlvbnM/OiBhbnkpOiB2b2lkIHtcbiAgICBsZXQgb25UcmFuc2xhdGlvbiA9IChyZXM6IHN0cmluZykgPT4ge1xuICAgICAgdGhpcy52YWx1ZSA9IHJlcyAhPT0gdW5kZWZpbmVkID8gcmVzIDoga2V5O1xuICAgICAgdGhpcy5sYXN0S2V5ID0ga2V5O1xuICAgICAgdGhpcy5fcmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH07XG4gICAgaWYgKHRyYW5zbGF0aW9ucykge1xuICAgICAgbGV0IHJlcyA9IHRoaXMudHJhbnNsYXRlLmdldFBhcnNlZFJlc3VsdCh0cmFuc2xhdGlvbnMsIGtleSwgaW50ZXJwb2xhdGVQYXJhbXMpO1xuICAgICAgaWYgKGlzT2JzZXJ2YWJsZShyZXMuc3Vic2NyaWJlKSkge1xuICAgICAgICByZXMuc3Vic2NyaWJlKG9uVHJhbnNsYXRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb25UcmFuc2xhdGlvbihyZXMpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnRyYW5zbGF0ZS5nZXQoa2V5LCBpbnRlcnBvbGF0ZVBhcmFtcykuc3Vic2NyaWJlKG9uVHJhbnNsYXRpb24pO1xuICB9XG5cbiAgdHJhbnNmb3JtKHF1ZXJ5OiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKTogYW55IHtcbiAgICBpZiAoIXF1ZXJ5IHx8ICFxdWVyeS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBxdWVyeTtcbiAgICB9XG5cbiAgICAvLyBpZiB3ZSBhc2sgYW5vdGhlciB0aW1lIGZvciB0aGUgc2FtZSBrZXksIHJldHVybiB0aGUgbGFzdCB2YWx1ZVxuICAgIGlmIChlcXVhbHMocXVlcnksIHRoaXMubGFzdEtleSkgJiYgZXF1YWxzKGFyZ3MsIHRoaXMubGFzdFBhcmFtcykpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH1cblxuICAgIGxldCBpbnRlcnBvbGF0ZVBhcmFtczogT2JqZWN0O1xuICAgIGlmIChpc0RlZmluZWQoYXJnc1swXSkgJiYgYXJncy5sZW5ndGgpIHtcbiAgICAgIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ3N0cmluZycgJiYgYXJnc1swXS5sZW5ndGgpIHtcbiAgICAgICAgLy8gd2UgYWNjZXB0IG9iamVjdHMgd3JpdHRlbiBpbiB0aGUgdGVtcGxhdGUgc3VjaCBhcyB7bjoxfSwgeyduJzoxfSwge246J3YnfVxuICAgICAgICAvLyB3aGljaCBpcyB3aHkgd2UgbWlnaHQgbmVlZCB0byBjaGFuZ2UgaXQgdG8gcmVhbCBKU09OIG9iamVjdHMgc3VjaCBhcyB7XCJuXCI6MX0gb3Ige1wiblwiOlwidlwifVxuICAgICAgICBsZXQgdmFsaWRBcmdzOiBzdHJpbmcgPSBhcmdzWzBdXG4gICAgICAgICAgLnJlcGxhY2UoLyhcXCcpPyhbYS16QS1aMC05X10rKShcXCcpPyhcXHMpPzovZywgJ1wiJDJcIjonKVxuICAgICAgICAgIC5yZXBsYWNlKC86KFxccyk/KFxcJykoLio/KShcXCcpL2csICc6XCIkM1wiJyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaW50ZXJwb2xhdGVQYXJhbXMgPSBKU09OLnBhcnNlKHZhbGlkQXJncyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYFdyb25nIHBhcmFtZXRlciBpbiBUcmFuc2xhdGVQaXBlLiBFeHBlY3RlZCBhIHZhbGlkIE9iamVjdCwgcmVjZWl2ZWQ6ICR7YXJnc1swXX1gKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoYXJnc1swXSkpIHtcbiAgICAgICAgaW50ZXJwb2xhdGVQYXJhbXMgPSBhcmdzWzBdO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHN0b3JlIHRoZSBxdWVyeSwgaW4gY2FzZSBpdCBjaGFuZ2VzXG4gICAgdGhpcy5sYXN0S2V5ID0gcXVlcnk7XG5cbiAgICAvLyBzdG9yZSB0aGUgcGFyYW1zLCBpbiBjYXNlIHRoZXkgY2hhbmdlXG4gICAgdGhpcy5sYXN0UGFyYW1zID0gYXJncztcblxuICAgIC8vIHNldCB0aGUgdmFsdWVcbiAgICB0aGlzLnVwZGF0ZVZhbHVlKHF1ZXJ5LCBpbnRlcnBvbGF0ZVBhcmFtcyk7XG5cbiAgICAvLyBpZiB0aGVyZSBpcyBhIHN1YnNjcmlwdGlvbiB0byBvbkxhbmdDaGFuZ2UsIGNsZWFuIGl0XG4gICAgdGhpcy5fZGlzcG9zZSgpO1xuXG4gICAgLy8gc3Vic2NyaWJlIHRvIG9uVHJhbnNsYXRpb25DaGFuZ2UgZXZlbnQsIGluIGNhc2UgdGhlIHRyYW5zbGF0aW9ucyBjaGFuZ2VcbiAgICBpZiAoIXRoaXMub25UcmFuc2xhdGlvbkNoYW5nZSkge1xuICAgICAgdGhpcy5vblRyYW5zbGF0aW9uQ2hhbmdlID0gdGhpcy50cmFuc2xhdGUub25UcmFuc2xhdGlvbkNoYW5nZS5zdWJzY3JpYmUoKGV2ZW50OiBUcmFuc2xhdGlvbkNoYW5nZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmxhc3RLZXkgJiYgZXZlbnQubGFuZyA9PT0gdGhpcy50cmFuc2xhdGUuY3VycmVudExhbmcpIHtcbiAgICAgICAgICB0aGlzLmxhc3RLZXkgPSBudWxsO1xuICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUocXVlcnksIGludGVycG9sYXRlUGFyYW1zLCBldmVudC50cmFuc2xhdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBzdWJzY3JpYmUgdG8gb25MYW5nQ2hhbmdlIGV2ZW50LCBpbiBjYXNlIHRoZSBsYW5ndWFnZSBjaGFuZ2VzXG4gICAgaWYgKCF0aGlzLm9uTGFuZ0NoYW5nZSkge1xuICAgICAgdGhpcy5vbkxhbmdDaGFuZ2UgPSB0aGlzLnRyYW5zbGF0ZS5vbkxhbmdDaGFuZ2Uuc3Vic2NyaWJlKChldmVudDogTGFuZ0NoYW5nZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmxhc3RLZXkpIHtcbiAgICAgICAgICB0aGlzLmxhc3RLZXkgPSBudWxsOyAvLyB3ZSB3YW50IHRvIG1ha2Ugc3VyZSBpdCBkb2Vzbid0IHJldHVybiB0aGUgc2FtZSB2YWx1ZSB1bnRpbCBpdCdzIGJlZW4gdXBkYXRlZFxuICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUocXVlcnksIGludGVycG9sYXRlUGFyYW1zLCBldmVudC50cmFuc2xhdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBzdWJzY3JpYmUgdG8gb25EZWZhdWx0TGFuZ0NoYW5nZSBldmVudCwgaW4gY2FzZSB0aGUgZGVmYXVsdCBsYW5ndWFnZSBjaGFuZ2VzXG4gICAgaWYgKCF0aGlzLm9uRGVmYXVsdExhbmdDaGFuZ2UpIHtcbiAgICAgIHRoaXMub25EZWZhdWx0TGFuZ0NoYW5nZSA9IHRoaXMudHJhbnNsYXRlLm9uRGVmYXVsdExhbmdDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubGFzdEtleSkge1xuICAgICAgICAgIHRoaXMubGFzdEtleSA9IG51bGw7IC8vIHdlIHdhbnQgdG8gbWFrZSBzdXJlIGl0IGRvZXNuJ3QgcmV0dXJuIHRoZSBzYW1lIHZhbHVlIHVudGlsIGl0J3MgYmVlbiB1cGRhdGVkXG4gICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShxdWVyeSwgaW50ZXJwb2xhdGVQYXJhbXMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhbiBhbnkgZXhpc3Rpbmcgc3Vic2NyaXB0aW9uIHRvIGNoYW5nZSBldmVudHNcbiAgICovXG4gIHByaXZhdGUgX2Rpc3Bvc2UoKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9uVHJhbnNsYXRpb25DaGFuZ2UgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLm9uVHJhbnNsYXRpb25DaGFuZ2UudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMub25UcmFuc2xhdGlvbkNoYW5nZSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9uTGFuZ0NoYW5nZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMub25MYW5nQ2hhbmdlLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLm9uTGFuZ0NoYW5nZSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9uRGVmYXVsdExhbmdDaGFuZ2UgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLm9uRGVmYXVsdExhbmdDaGFuZ2UudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMub25EZWZhdWx0TGFuZ0NoYW5nZSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kaXNwb3NlKCk7XG4gIH1cbn1cbiJdfQ==