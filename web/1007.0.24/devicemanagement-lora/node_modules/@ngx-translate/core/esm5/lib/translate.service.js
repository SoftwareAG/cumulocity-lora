/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign, __values } from "tslib";
import { EventEmitter, Inject, Injectable, InjectionToken } from "@angular/core";
import { concat, forkJoin, isObservable, of, defer } from "rxjs";
import { concatMap, map, shareReplay, switchMap, take } from "rxjs/operators";
import { MissingTranslationHandler } from "./missing-translation-handler";
import { TranslateCompiler } from "./translate.compiler";
import { TranslateLoader } from "./translate.loader";
import { TranslateParser } from "./translate.parser";
import { TranslateStore } from "./translate.store";
import { isDefined, mergeDeep } from "./util";
/** @type {?} */
export var USE_STORE = new InjectionToken('USE_STORE');
/** @type {?} */
export var USE_DEFAULT_LANG = new InjectionToken('USE_DEFAULT_LANG');
/** @type {?} */
export var DEFAULT_LANGUAGE = new InjectionToken('DEFAULT_LANGUAGE');
/** @type {?} */
export var USE_EXTEND = new InjectionToken('USE_EXTEND');
/**
 * @record
 */
export function TranslationChangeEvent() { }
if (false) {
    /** @type {?} */
    TranslationChangeEvent.prototype.translations;
    /** @type {?} */
    TranslationChangeEvent.prototype.lang;
}
/**
 * @record
 */
export function LangChangeEvent() { }
if (false) {
    /** @type {?} */
    LangChangeEvent.prototype.lang;
    /** @type {?} */
    LangChangeEvent.prototype.translations;
}
/**
 * @record
 */
export function DefaultLangChangeEvent() { }
if (false) {
    /** @type {?} */
    DefaultLangChangeEvent.prototype.lang;
    /** @type {?} */
    DefaultLangChangeEvent.prototype.translations;
}
var TranslateService = /** @class */ (function () {
    /**
     *
     * @param store an instance of the store (that is supposed to be unique)
     * @param currentLoader An instance of the loader currently used
     * @param compiler An instance of the compiler currently used
     * @param parser An instance of the parser currently used
     * @param missingTranslationHandler A handler for missing translations.
     * @param useDefaultLang whether we should use default language translation when current language translation is missing.
     * @param isolate whether this service should use the store or not
     * @param extend To make a child module extend (and use) translations from parent modules.
     * @param defaultLanguage Set the default language using configuration
     */
    function TranslateService(store, currentLoader, compiler, parser, missingTranslationHandler, useDefaultLang, isolate, extend, defaultLanguage) {
        if (useDefaultLang === void 0) { useDefaultLang = true; }
        if (isolate === void 0) { isolate = false; }
        if (extend === void 0) { extend = false; }
        this.store = store;
        this.currentLoader = currentLoader;
        this.compiler = compiler;
        this.parser = parser;
        this.missingTranslationHandler = missingTranslationHandler;
        this.useDefaultLang = useDefaultLang;
        this.isolate = isolate;
        this.extend = extend;
        this.pending = false;
        this._onTranslationChange = new EventEmitter();
        this._onLangChange = new EventEmitter();
        this._onDefaultLangChange = new EventEmitter();
        this._langs = [];
        this._translations = {};
        this._translationRequests = {};
        /** set the default language from configuration */
        if (defaultLanguage) {
            this.setDefaultLang(defaultLanguage);
        }
    }
    Object.defineProperty(TranslateService.prototype, "onTranslationChange", {
        /**
         * An EventEmitter to listen to translation change events
         * onTranslationChange.subscribe((params: TranslationChangeEvent) => {
           *     // do something
           * });
         */
        get: /**
         * An EventEmitter to listen to translation change events
         * onTranslationChange.subscribe((params: TranslationChangeEvent) => {
         *     // do something
         * });
         * @return {?}
         */
        function () {
            return this.isolate ? this._onTranslationChange : this.store.onTranslationChange;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TranslateService.prototype, "onLangChange", {
        /**
         * An EventEmitter to listen to lang change events
         * onLangChange.subscribe((params: LangChangeEvent) => {
           *     // do something
           * });
         */
        get: /**
         * An EventEmitter to listen to lang change events
         * onLangChange.subscribe((params: LangChangeEvent) => {
         *     // do something
         * });
         * @return {?}
         */
        function () {
            return this.isolate ? this._onLangChange : this.store.onLangChange;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TranslateService.prototype, "onDefaultLangChange", {
        /**
         * An EventEmitter to listen to default lang change events
         * onDefaultLangChange.subscribe((params: DefaultLangChangeEvent) => {
           *     // do something
           * });
         */
        get: /**
         * An EventEmitter to listen to default lang change events
         * onDefaultLangChange.subscribe((params: DefaultLangChangeEvent) => {
         *     // do something
         * });
         * @return {?}
         */
        function () {
            return this.isolate ? this._onDefaultLangChange : this.store.onDefaultLangChange;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TranslateService.prototype, "defaultLang", {
        /**
         * The default lang to fallback when translations are missing on the current lang
         */
        get: /**
         * The default lang to fallback when translations are missing on the current lang
         * @return {?}
         */
        function () {
            return this.isolate ? this._defaultLang : this.store.defaultLang;
        },
        set: /**
         * @param {?} defaultLang
         * @return {?}
         */
        function (defaultLang) {
            if (this.isolate) {
                this._defaultLang = defaultLang;
            }
            else {
                this.store.defaultLang = defaultLang;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TranslateService.prototype, "currentLang", {
        /**
         * The lang currently used
         */
        get: /**
         * The lang currently used
         * @return {?}
         */
        function () {
            return this.isolate ? this._currentLang : this.store.currentLang;
        },
        set: /**
         * @param {?} currentLang
         * @return {?}
         */
        function (currentLang) {
            if (this.isolate) {
                this._currentLang = currentLang;
            }
            else {
                this.store.currentLang = currentLang;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TranslateService.prototype, "langs", {
        /**
         * an array of langs
         */
        get: /**
         * an array of langs
         * @return {?}
         */
        function () {
            return this.isolate ? this._langs : this.store.langs;
        },
        set: /**
         * @param {?} langs
         * @return {?}
         */
        function (langs) {
            if (this.isolate) {
                this._langs = langs;
            }
            else {
                this.store.langs = langs;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TranslateService.prototype, "translations", {
        /**
         * a list of translations per lang
         */
        get: /**
         * a list of translations per lang
         * @return {?}
         */
        function () {
            return this.isolate ? this._translations : this.store.translations;
        },
        set: /**
         * @param {?} translations
         * @return {?}
         */
        function (translations) {
            if (this.isolate) {
                this._translations = translations;
            }
            else {
                this.store.translations = translations;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the default language to use as a fallback
     */
    /**
     * Sets the default language to use as a fallback
     * @param {?} lang
     * @return {?}
     */
    TranslateService.prototype.setDefaultLang = /**
     * Sets the default language to use as a fallback
     * @param {?} lang
     * @return {?}
     */
    function (lang) {
        var _this = this;
        if (lang === this.defaultLang) {
            return;
        }
        /** @type {?} */
        var pending = this.retrieveTranslations(lang);
        if (typeof pending !== "undefined") {
            // on init set the defaultLang immediately
            if (this.defaultLang == null) {
                this.defaultLang = lang;
            }
            pending.pipe(take(1))
                .subscribe((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                _this.changeDefaultLang(lang);
            }));
        }
        else { // we already have this language
            this.changeDefaultLang(lang);
        }
    };
    /**
     * Gets the default language used
     */
    /**
     * Gets the default language used
     * @return {?}
     */
    TranslateService.prototype.getDefaultLang = /**
     * Gets the default language used
     * @return {?}
     */
    function () {
        return this.defaultLang;
    };
    /**
     * Changes the lang currently used
     */
    /**
     * Changes the lang currently used
     * @param {?} lang
     * @return {?}
     */
    TranslateService.prototype.use = /**
     * Changes the lang currently used
     * @param {?} lang
     * @return {?}
     */
    function (lang) {
        var _this = this;
        // don't change the language if the language given is already selected
        if (lang === this.currentLang) {
            return of(this.translations[lang]);
        }
        /** @type {?} */
        var pending = this.retrieveTranslations(lang);
        if (typeof pending !== "undefined") {
            // on init set the currentLang immediately
            if (!this.currentLang) {
                this.currentLang = lang;
            }
            pending.pipe(take(1))
                .subscribe((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                _this.changeLang(lang);
            }));
            return pending;
        }
        else { // we have this language, return an Observable
            this.changeLang(lang);
            return of(this.translations[lang]);
        }
    };
    /**
     * Retrieves the given translations
     */
    /**
     * Retrieves the given translations
     * @private
     * @param {?} lang
     * @return {?}
     */
    TranslateService.prototype.retrieveTranslations = /**
     * Retrieves the given translations
     * @private
     * @param {?} lang
     * @return {?}
     */
    function (lang) {
        /** @type {?} */
        var pending;
        // if this language is unavailable or extend is true, ask for it
        if (typeof this.translations[lang] === "undefined" || this.extend) {
            this._translationRequests[lang] = this._translationRequests[lang] || this.getTranslation(lang);
            pending = this._translationRequests[lang];
        }
        return pending;
    };
    /**
     * Gets an object of translations for a given language with the current loader
     * and passes it through the compiler
     */
    /**
     * Gets an object of translations for a given language with the current loader
     * and passes it through the compiler
     * @param {?} lang
     * @return {?}
     */
    TranslateService.prototype.getTranslation = /**
     * Gets an object of translations for a given language with the current loader
     * and passes it through the compiler
     * @param {?} lang
     * @return {?}
     */
    function (lang) {
        var _this = this;
        this.pending = true;
        /** @type {?} */
        var loadingTranslations = this.currentLoader.getTranslation(lang).pipe(shareReplay(1), take(1));
        this.loadingTranslations = loadingTranslations.pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return _this.compiler.compileTranslations(res, lang); })), shareReplay(1), take(1));
        this.loadingTranslations
            .subscribe({
            next: (/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                _this.translations[lang] = _this.extend && _this.translations[lang] ? __assign(__assign({}, res), _this.translations[lang]) : res;
                _this.updateLangs();
                _this.pending = false;
            }),
            error: (/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
                _this.pending = false;
            })
        });
        return loadingTranslations;
    };
    /**
     * Manually sets an object of translations for a given language
     * after passing it through the compiler
     */
    /**
     * Manually sets an object of translations for a given language
     * after passing it through the compiler
     * @param {?} lang
     * @param {?} translations
     * @param {?=} shouldMerge
     * @return {?}
     */
    TranslateService.prototype.setTranslation = /**
     * Manually sets an object of translations for a given language
     * after passing it through the compiler
     * @param {?} lang
     * @param {?} translations
     * @param {?=} shouldMerge
     * @return {?}
     */
    function (lang, translations, shouldMerge) {
        if (shouldMerge === void 0) { shouldMerge = false; }
        translations = this.compiler.compileTranslations(translations, lang);
        if ((shouldMerge || this.extend) && this.translations[lang]) {
            this.translations[lang] = mergeDeep(this.translations[lang], translations);
        }
        else {
            this.translations[lang] = translations;
        }
        this.updateLangs();
        this.onTranslationChange.emit({ lang: lang, translations: this.translations[lang] });
    };
    /**
     * Returns an array of currently available langs
     */
    /**
     * Returns an array of currently available langs
     * @return {?}
     */
    TranslateService.prototype.getLangs = /**
     * Returns an array of currently available langs
     * @return {?}
     */
    function () {
        return this.langs;
    };
    /**
     * Add available langs
     */
    /**
     * Add available langs
     * @param {?} langs
     * @return {?}
     */
    TranslateService.prototype.addLangs = /**
     * Add available langs
     * @param {?} langs
     * @return {?}
     */
    function (langs) {
        var _this = this;
        langs.forEach((/**
         * @param {?} lang
         * @return {?}
         */
        function (lang) {
            if (_this.langs.indexOf(lang) === -1) {
                _this.langs.push(lang);
            }
        }));
    };
    /**
     * Update the list of available langs
     */
    /**
     * Update the list of available langs
     * @private
     * @return {?}
     */
    TranslateService.prototype.updateLangs = /**
     * Update the list of available langs
     * @private
     * @return {?}
     */
    function () {
        this.addLangs(Object.keys(this.translations));
    };
    /**
     * Returns the parsed result of the translations
     */
    /**
     * Returns the parsed result of the translations
     * @param {?} translations
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?}
     */
    TranslateService.prototype.getParsedResult = /**
     * Returns the parsed result of the translations
     * @param {?} translations
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?}
     */
    function (translations, key, interpolateParams) {
        var e_1, _a;
        /** @type {?} */
        var res;
        if (key instanceof Array) {
            /** @type {?} */
            var result_1 = {};
            /** @type {?} */
            var observables = false;
            try {
                for (var key_1 = __values(key), key_1_1 = key_1.next(); !key_1_1.done; key_1_1 = key_1.next()) {
                    var k = key_1_1.value;
                    result_1[k] = this.getParsedResult(translations, k, interpolateParams);
                    if (isObservable(result_1[k])) {
                        observables = true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (key_1_1 && !key_1_1.done && (_a = key_1.return)) _a.call(key_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (observables) {
                /** @type {?} */
                var sources = key.map((/**
                 * @param {?} k
                 * @return {?}
                 */
                function (k) { return isObservable(result_1[k]) ? result_1[k] : of((/** @type {?} */ (result_1[k]))); }));
                return forkJoin(sources).pipe(map((/**
                 * @param {?} arr
                 * @return {?}
                 */
                function (arr) {
                    /** @type {?} */
                    var obj = {};
                    arr.forEach((/**
                     * @param {?} value
                     * @param {?} index
                     * @return {?}
                     */
                    function (value, index) {
                        obj[key[index]] = value;
                    }));
                    return obj;
                })));
            }
            return result_1;
        }
        if (translations) {
            res = this.parser.interpolate(this.parser.getValue(translations, key), interpolateParams);
        }
        if (typeof res === "undefined" && this.defaultLang != null && this.defaultLang !== this.currentLang && this.useDefaultLang) {
            res = this.parser.interpolate(this.parser.getValue(this.translations[this.defaultLang], key), interpolateParams);
        }
        if (typeof res === "undefined") {
            /** @type {?} */
            var params = { key: key, translateService: this };
            if (typeof interpolateParams !== 'undefined') {
                params.interpolateParams = interpolateParams;
            }
            res = this.missingTranslationHandler.handle(params);
        }
        return typeof res !== "undefined" ? res : key;
    };
    /**
     * Gets the translated value of a key (or an array of keys)
     * @returns the translated key, or an object of translated keys
     */
    /**
     * Gets the translated value of a key (or an array of keys)
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?} the translated key, or an object of translated keys
     */
    TranslateService.prototype.get = /**
     * Gets the translated value of a key (or an array of keys)
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?} the translated key, or an object of translated keys
     */
    function (key, interpolateParams) {
        var _this = this;
        if (!isDefined(key) || !key.length) {
            throw new Error("Parameter \"key\" required");
        }
        // check if we are loading a new translation to use
        if (this.pending) {
            return this.loadingTranslations.pipe(concatMap((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                res = _this.getParsedResult(res, key, interpolateParams);
                return isObservable(res) ? res : of(res);
            })));
        }
        else {
            /** @type {?} */
            var res = this.getParsedResult(this.translations[this.currentLang], key, interpolateParams);
            return isObservable(res) ? res : of(res);
        }
    };
    /**
     * Returns a stream of translated values of a key (or an array of keys) which updates
     * whenever the translation changes.
     * @returns A stream of the translated key, or an object of translated keys
     */
    /**
     * Returns a stream of translated values of a key (or an array of keys) which updates
     * whenever the translation changes.
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?} A stream of the translated key, or an object of translated keys
     */
    TranslateService.prototype.getStreamOnTranslationChange = /**
     * Returns a stream of translated values of a key (or an array of keys) which updates
     * whenever the translation changes.
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?} A stream of the translated key, or an object of translated keys
     */
    function (key, interpolateParams) {
        var _this = this;
        if (!isDefined(key) || !key.length) {
            throw new Error("Parameter \"key\" required");
        }
        return concat(defer((/**
         * @return {?}
         */
        function () { return _this.get(key, interpolateParams); })), this.onTranslationChange.pipe(switchMap((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var res = _this.getParsedResult(event.translations, key, interpolateParams);
            if (typeof res.subscribe === 'function') {
                return res;
            }
            else {
                return of(res);
            }
        }))));
    };
    /**
     * Returns a stream of translated values of a key (or an array of keys) which updates
     * whenever the language changes.
     * @returns A stream of the translated key, or an object of translated keys
     */
    /**
     * Returns a stream of translated values of a key (or an array of keys) which updates
     * whenever the language changes.
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?} A stream of the translated key, or an object of translated keys
     */
    TranslateService.prototype.stream = /**
     * Returns a stream of translated values of a key (or an array of keys) which updates
     * whenever the language changes.
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?} A stream of the translated key, or an object of translated keys
     */
    function (key, interpolateParams) {
        var _this = this;
        if (!isDefined(key) || !key.length) {
            throw new Error("Parameter \"key\" required");
        }
        return concat(defer((/**
         * @return {?}
         */
        function () { return _this.get(key, interpolateParams); })), this.onLangChange.pipe(switchMap((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var res = _this.getParsedResult(event.translations, key, interpolateParams);
            return isObservable(res) ? res : of(res);
        }))));
    };
    /**
     * Returns a translation instantly from the internal state of loaded translation.
     * All rules regarding the current language, the preferred language of even fallback languages will be used except any promise handling.
     */
    /**
     * Returns a translation instantly from the internal state of loaded translation.
     * All rules regarding the current language, the preferred language of even fallback languages will be used except any promise handling.
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?}
     */
    TranslateService.prototype.instant = /**
     * Returns a translation instantly from the internal state of loaded translation.
     * All rules regarding the current language, the preferred language of even fallback languages will be used except any promise handling.
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?}
     */
    function (key, interpolateParams) {
        if (!isDefined(key) || !key.length) {
            throw new Error("Parameter \"key\" required");
        }
        /** @type {?} */
        var res = this.getParsedResult(this.translations[this.currentLang], key, interpolateParams);
        if (isObservable(res)) {
            if (key instanceof Array) {
                /** @type {?} */
                var obj_1 = {};
                key.forEach((/**
                 * @param {?} value
                 * @param {?} index
                 * @return {?}
                 */
                function (value, index) {
                    obj_1[key[index]] = key[index];
                }));
                return obj_1;
            }
            return key;
        }
        else {
            return res;
        }
    };
    /**
     * Sets the translated value of a key, after compiling it
     */
    /**
     * Sets the translated value of a key, after compiling it
     * @param {?} key
     * @param {?} value
     * @param {?=} lang
     * @return {?}
     */
    TranslateService.prototype.set = /**
     * Sets the translated value of a key, after compiling it
     * @param {?} key
     * @param {?} value
     * @param {?=} lang
     * @return {?}
     */
    function (key, value, lang) {
        if (lang === void 0) { lang = this.currentLang; }
        this.translations[lang][key] = this.compiler.compile(value, lang);
        this.updateLangs();
        this.onTranslationChange.emit({ lang: lang, translations: this.translations[lang] });
    };
    /**
     * Changes the current lang
     */
    /**
     * Changes the current lang
     * @private
     * @param {?} lang
     * @return {?}
     */
    TranslateService.prototype.changeLang = /**
     * Changes the current lang
     * @private
     * @param {?} lang
     * @return {?}
     */
    function (lang) {
        this.currentLang = lang;
        this.onLangChange.emit({ lang: lang, translations: this.translations[lang] });
        // if there is no default lang, use the one that we just set
        if (this.defaultLang == null) {
            this.changeDefaultLang(lang);
        }
    };
    /**
     * Changes the default lang
     */
    /**
     * Changes the default lang
     * @private
     * @param {?} lang
     * @return {?}
     */
    TranslateService.prototype.changeDefaultLang = /**
     * Changes the default lang
     * @private
     * @param {?} lang
     * @return {?}
     */
    function (lang) {
        this.defaultLang = lang;
        this.onDefaultLangChange.emit({ lang: lang, translations: this.translations[lang] });
    };
    /**
     * Allows to reload the lang file from the file
     */
    /**
     * Allows to reload the lang file from the file
     * @param {?} lang
     * @return {?}
     */
    TranslateService.prototype.reloadLang = /**
     * Allows to reload the lang file from the file
     * @param {?} lang
     * @return {?}
     */
    function (lang) {
        this.resetLang(lang);
        return this.getTranslation(lang);
    };
    /**
     * Deletes inner translation
     */
    /**
     * Deletes inner translation
     * @param {?} lang
     * @return {?}
     */
    TranslateService.prototype.resetLang = /**
     * Deletes inner translation
     * @param {?} lang
     * @return {?}
     */
    function (lang) {
        this._translationRequests[lang] = undefined;
        this.translations[lang] = undefined;
    };
    /**
     * Returns the language code name from the browser, e.g. "de"
     */
    /**
     * Returns the language code name from the browser, e.g. "de"
     * @return {?}
     */
    TranslateService.prototype.getBrowserLang = /**
     * Returns the language code name from the browser, e.g. "de"
     * @return {?}
     */
    function () {
        if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
            return undefined;
        }
        /** @type {?} */
        var browserLang = window.navigator.languages ? window.navigator.languages[0] : null;
        browserLang = browserLang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
        if (typeof browserLang === 'undefined') {
            return undefined;
        }
        if (browserLang.indexOf('-') !== -1) {
            browserLang = browserLang.split('-')[0];
        }
        if (browserLang.indexOf('_') !== -1) {
            browserLang = browserLang.split('_')[0];
        }
        return browserLang;
    };
    /**
     * Returns the culture language code name from the browser, e.g. "de-DE"
     */
    /**
     * Returns the culture language code name from the browser, e.g. "de-DE"
     * @return {?}
     */
    TranslateService.prototype.getBrowserCultureLang = /**
     * Returns the culture language code name from the browser, e.g. "de-DE"
     * @return {?}
     */
    function () {
        if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
            return undefined;
        }
        /** @type {?} */
        var browserCultureLang = window.navigator.languages ? window.navigator.languages[0] : null;
        browserCultureLang = browserCultureLang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
        return browserCultureLang;
    };
    TranslateService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    TranslateService.ctorParameters = function () { return [
        { type: TranslateStore },
        { type: TranslateLoader },
        { type: TranslateCompiler },
        { type: TranslateParser },
        { type: MissingTranslationHandler },
        { type: Boolean, decorators: [{ type: Inject, args: [USE_DEFAULT_LANG,] }] },
        { type: Boolean, decorators: [{ type: Inject, args: [USE_STORE,] }] },
        { type: Boolean, decorators: [{ type: Inject, args: [USE_EXTEND,] }] },
        { type: String, decorators: [{ type: Inject, args: [DEFAULT_LANGUAGE,] }] }
    ]; };
    return TranslateService;
}());
export { TranslateService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    TranslateService.prototype.loadingTranslations;
    /**
     * @type {?}
     * @private
     */
    TranslateService.prototype.pending;
    /**
     * @type {?}
     * @private
     */
    TranslateService.prototype._onTranslationChange;
    /**
     * @type {?}
     * @private
     */
    TranslateService.prototype._onLangChange;
    /**
     * @type {?}
     * @private
     */
    TranslateService.prototype._onDefaultLangChange;
    /**
     * @type {?}
     * @private
     */
    TranslateService.prototype._defaultLang;
    /**
     * @type {?}
     * @private
     */
    TranslateService.prototype._currentLang;
    /**
     * @type {?}
     * @private
     */
    TranslateService.prototype._langs;
    /**
     * @type {?}
     * @private
     */
    TranslateService.prototype._translations;
    /**
     * @type {?}
     * @private
     */
    TranslateService.prototype._translationRequests;
    /** @type {?} */
    TranslateService.prototype.store;
    /** @type {?} */
    TranslateService.prototype.currentLoader;
    /** @type {?} */
    TranslateService.prototype.compiler;
    /** @type {?} */
    TranslateService.prototype.parser;
    /** @type {?} */
    TranslateService.prototype.missingTranslationHandler;
    /**
     * @type {?}
     * @private
     */
    TranslateService.prototype.useDefaultLang;
    /**
     * @type {?}
     * @private
     */
    TranslateService.prototype.isolate;
    /**
     * @type {?}
     * @private
     */
    TranslateService.prototype.extend;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LXRyYW5zbGF0ZS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3RyYW5zbGF0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQWMsRUFBRSxFQUFFLEtBQUssRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUMzRSxPQUFPLEVBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzVFLE9BQU8sRUFBQyx5QkFBeUIsRUFBa0MsTUFBTSwrQkFBK0IsQ0FBQztBQUN6RyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDbkQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBRW5ELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsU0FBUyxFQUFFLFNBQVMsRUFBQyxNQUFNLFFBQVEsQ0FBQzs7QUFFNUMsTUFBTSxLQUFPLFNBQVMsR0FBRyxJQUFJLGNBQWMsQ0FBUyxXQUFXLENBQUM7O0FBQ2hFLE1BQU0sS0FBTyxnQkFBZ0IsR0FBRyxJQUFJLGNBQWMsQ0FBUyxrQkFBa0IsQ0FBQzs7QUFDOUUsTUFBTSxLQUFPLGdCQUFnQixHQUFHLElBQUksY0FBYyxDQUFTLGtCQUFrQixDQUFDOztBQUM5RSxNQUFNLEtBQU8sVUFBVSxHQUFHLElBQUksY0FBYyxDQUFTLFlBQVksQ0FBQzs7OztBQUVsRSw0Q0FHQzs7O0lBRkMsOENBQWtC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QWtCLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxlQUFlLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUM7UUFFMUksT0FBTyxrQkFBa0IsQ0FBQztJQUM1QixDQUFDOztnQkF2ZkYsVUFBVTs7OztnQkE3QkgsY0FBYztnQkFIZCxlQUFlO2dCQURmLGlCQUFpQjtnQkFFakIsZUFBZTtnQkFIZix5QkFBeUI7OENBMEpsQixNQUFNLFNBQUMsZ0JBQWdCOzhDQUN2QixNQUFNLFNBQUMsU0FBUzs4Q0FDaEIsTUFBTSxTQUFDLFVBQVU7NkNBQ2pCLE1BQU0sU0FBQyxnQkFBZ0I7O0lBNlh0Qyx1QkFBQztDQUFBLEFBeGZELElBd2ZDO1NBdmZZLGdCQUFnQjs7Ozs7O0lBQzNCLCtDQUE2Qzs7Ozs7SUFDN0MsbUNBQWlDOzs7OztJQUNqQyxnREFBZ0g7Ozs7O0lBQ2hILHlDQUEyRjs7Ozs7SUFDM0YsZ0RBQWdIOzs7OztJQUNoSCx3Q0FBNkI7Ozs7O0lBQzdCLHdDQUE2Qjs7Ozs7SUFDN0Isa0NBQW1DOzs7OztJQUNuQyx5Q0FBZ0M7Ozs7O0lBQ2hDLGdEQUF1Qzs7SUF3RzNCLGlDQUE0Qjs7SUFDNUIseUNBQXFDOztJQUNyQyxvQ0FBa0M7O0lBQ2xDLGtDQUE4Qjs7SUFDOUIscURBQTJEOzs7OztJQUMzRCwwQ0FBZ0U7Ozs7O0lBQ2hFLG1DQUFtRDs7Ozs7SUFDbkQsa0NBQW1EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge2NvbmNhdCwgZm9ya0pvaW4sIGlzT2JzZXJ2YWJsZSwgT2JzZXJ2YWJsZSwgb2YsIGRlZmVyfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtjb25jYXRNYXAsIG1hcCwgc2hhcmVSZXBsYXksIHN3aXRjaE1hcCwgdGFrZX0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5pbXBvcnQge01pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIsIE1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXJQYXJhbXN9IGZyb20gXCIuL21pc3NpbmctdHJhbnNsYXRpb24taGFuZGxlclwiO1xuaW1wb3J0IHtUcmFuc2xhdGVDb21waWxlcn0gZnJvbSBcIi4vdHJhbnNsYXRlLmNvbXBpbGVyXCI7XG5pbXBvcnQge1RyYW5zbGF0ZUxvYWRlcn0gZnJvbSBcIi4vdHJhbnNsYXRlLmxvYWRlclwiO1xuaW1wb3J0IHtUcmFuc2xhdGVQYXJzZXJ9IGZyb20gXCIuL3RyYW5zbGF0ZS5wYXJzZXJcIjtcblxuaW1wb3J0IHtUcmFuc2xhdGVTdG9yZX0gZnJvbSBcIi4vdHJhbnNsYXRlLnN0b3JlXCI7XG5pbXBvcnQge2lzRGVmaW5lZCwgbWVyZ2VEZWVwfSBmcm9tIFwiLi91dGlsXCI7XG5cbmV4cG9ydCBjb25zdCBVU0VfU1RPUkUgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignVVNFX1NUT1JFJyk7XG5leHBvcnQgY29uc3QgVVNFX0RFRkFVTFRfTEFORyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdVU0VfREVGQVVMVF9MQU5HJyk7XG5leHBvcnQgY29uc3QgREVGQVVMVF9MQU5HVUFHRSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdERUZBVUxUX0xBTkdVQUdFJyk7XG5leHBvcnQgY29uc3QgVVNFX0VYVEVORCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdVU0VfRVhURU5EJyk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJhbnNsYXRpb25DaGFuZ2VFdmVudCB7XG4gIHRyYW5zbGF0aW9uczogYW55O1xuICBsYW5nOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGFuZ0NoYW5nZUV2ZW50IHtcbiAgbGFuZzogc3RyaW5nO1xuICB0cmFuc2xhdGlvbnM6IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEZWZhdWx0TGFuZ0NoYW5nZUV2ZW50IHtcbiAgbGFuZzogc3RyaW5nO1xuICB0cmFuc2xhdGlvbnM6IGFueTtcbn1cblxuZGVjbGFyZSBpbnRlcmZhY2UgV2luZG93IHtcbiAgbmF2aWdhdG9yOiBhbnk7XG59XG5cbmRlY2xhcmUgY29uc3Qgd2luZG93OiBXaW5kb3c7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUcmFuc2xhdGVTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBsb2FkaW5nVHJhbnNsYXRpb25zOiBPYnNlcnZhYmxlPGFueT47XG4gIHByaXZhdGUgcGVuZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9vblRyYW5zbGF0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8VHJhbnNsYXRpb25DaGFuZ2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRyYW5zbGF0aW9uQ2hhbmdlRXZlbnQ+KCk7XG4gIHByaXZhdGUgX29uTGFuZ0NoYW5nZTogRXZlbnRFbWl0dGVyPExhbmdDaGFuZ2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPExhbmdDaGFuZ2VFdmVudD4oKTtcbiAgcHJpdmF0ZSBfb25EZWZhdWx0TGFuZ0NoYW5nZTogRXZlbnRFbWl0dGVyPERlZmF1bHRMYW5nQ2hhbmdlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxEZWZhdWx0TGFuZ0NoYW5nZUV2ZW50PigpO1xuICBwcml2YXRlIF9kZWZhdWx0TGFuZzogc3RyaW5nO1xuICBwcml2YXRlIF9jdXJyZW50TGFuZzogc3RyaW5nO1xuICBwcml2YXRlIF9sYW5nczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBwcml2YXRlIF90cmFuc2xhdGlvbnM6IGFueSA9IHt9O1xuICBwcml2YXRlIF90cmFuc2xhdGlvblJlcXVlc3RzOiBhbnkgPSB7fTtcblxuICAvKipcbiAgICogQW4gRXZlbnRFbWl0dGVyIHRvIGxpc3RlbiB0byB0cmFuc2xhdGlvbiBjaGFuZ2UgZXZlbnRzXG4gICAqIG9uVHJhbnNsYXRpb25DaGFuZ2Uuc3Vic2NyaWJlKChwYXJhbXM6IFRyYW5zbGF0aW9uQ2hhbmdlRXZlbnQpID0+IHtcbiAgICAgKiAgICAgLy8gZG8gc29tZXRoaW5nXG4gICAgICogfSk7XG4gICAqL1xuICBnZXQgb25UcmFuc2xhdGlvbkNoYW5nZSgpOiBFdmVudEVtaXR0ZXI8VHJhbnNsYXRpb25DaGFuZ2VFdmVudD4ge1xuICAgIHJldHVybiB0aGlzLmlzb2xhdGUgPyB0aGlzLl9vblRyYW5zbGF0aW9uQ2hhbmdlIDogdGhpcy5zdG9yZS5vblRyYW5zbGF0aW9uQ2hhbmdlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFuIEV2ZW50RW1pdHRlciB0byBsaXN0ZW4gdG8gbGFuZyBjaGFuZ2UgZXZlbnRzXG4gICAqIG9uTGFuZ0NoYW5nZS5zdWJzY3JpYmUoKHBhcmFtczogTGFuZ0NoYW5nZUV2ZW50KSA9PiB7XG4gICAgICogICAgIC8vIGRvIHNvbWV0aGluZ1xuICAgICAqIH0pO1xuICAgKi9cbiAgZ2V0IG9uTGFuZ0NoYW5nZSgpOiBFdmVudEVtaXR0ZXI8TGFuZ0NoYW5nZUV2ZW50PiB7XG4gICAgcmV0dXJuIHRoaXMuaXNvbGF0ZSA/IHRoaXMuX29uTGFuZ0NoYW5nZSA6IHRoaXMuc3RvcmUub25MYW5nQ2hhbmdlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFuIEV2ZW50RW1pdHRlciB0byBsaXN0ZW4gdG8gZGVmYXVsdCBsYW5nIGNoYW5nZSBldmVudHNcbiAgICogb25EZWZhdWx0TGFuZ0NoYW5nZS5zdWJzY3JpYmUoKHBhcmFtczogRGVmYXVsdExhbmdDaGFuZ2VFdmVudCkgPT4ge1xuICAgICAqICAgICAvLyBkbyBzb21ldGhpbmdcbiAgICAgKiB9KTtcbiAgICovXG4gIGdldCBvbkRlZmF1bHRMYW5nQ2hhbmdlKCkge1xuICAgIHJldHVybiB0aGlzLmlzb2xhdGUgPyB0aGlzLl9vbkRlZmF1bHRMYW5nQ2hhbmdlIDogdGhpcy5zdG9yZS5vbkRlZmF1bHRMYW5nQ2hhbmdlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBkZWZhdWx0IGxhbmcgdG8gZmFsbGJhY2sgd2hlbiB0cmFuc2xhdGlvbnMgYXJlIG1pc3Npbmcgb24gdGhlIGN1cnJlbnQgbGFuZ1xuICAgKi9cbiAgZ2V0IGRlZmF1bHRMYW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaXNvbGF0ZSA/IHRoaXMuX2RlZmF1bHRMYW5nIDogdGhpcy5zdG9yZS5kZWZhdWx0TGFuZztcbiAgfVxuXG4gIHNldCBkZWZhdWx0TGFuZyhkZWZhdWx0TGFuZzogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuaXNvbGF0ZSkge1xuICAgICAgdGhpcy5fZGVmYXVsdExhbmcgPSBkZWZhdWx0TGFuZztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdG9yZS5kZWZhdWx0TGFuZyA9IGRlZmF1bHRMYW5nO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbGFuZyBjdXJyZW50bHkgdXNlZFxuICAgKi9cbiAgZ2V0IGN1cnJlbnRMYW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaXNvbGF0ZSA/IHRoaXMuX2N1cnJlbnRMYW5nIDogdGhpcy5zdG9yZS5jdXJyZW50TGFuZztcbiAgfVxuXG4gIHNldCBjdXJyZW50TGFuZyhjdXJyZW50TGFuZzogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuaXNvbGF0ZSkge1xuICAgICAgdGhpcy5fY3VycmVudExhbmcgPSBjdXJyZW50TGFuZztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdG9yZS5jdXJyZW50TGFuZyA9IGN1cnJlbnRMYW5nO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBhbiBhcnJheSBvZiBsYW5nc1xuICAgKi9cbiAgZ2V0IGxhbmdzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5pc29sYXRlID8gdGhpcy5fbGFuZ3MgOiB0aGlzLnN0b3JlLmxhbmdzO1xuICB9XG5cbiAgc2V0IGxhbmdzKGxhbmdzOiBzdHJpbmdbXSkge1xuICAgIGlmICh0aGlzLmlzb2xhdGUpIHtcbiAgICAgIHRoaXMuX2xhbmdzID0gbGFuZ3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcmUubGFuZ3MgPSBsYW5ncztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogYSBsaXN0IG9mIHRyYW5zbGF0aW9ucyBwZXIgbGFuZ1xuICAgKi9cbiAgZ2V0IHRyYW5zbGF0aW9ucygpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlzb2xhdGUgPyB0aGlzLl90cmFuc2xhdGlvbnMgOiB0aGlzLnN0b3JlLnRyYW5zbGF0aW9ucztcbiAgfVxuXG4gIHNldCB0cmFuc2xhdGlvbnModHJhbnNsYXRpb25zOiBhbnkpIHtcbiAgICBpZiAodGhpcy5pc29sYXRlKSB7XG4gICAgICB0aGlzLl90cmFuc2xhdGlvbnMgPSB0cmFuc2xhdGlvbnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcmUudHJhbnNsYXRpb25zID0gdHJhbnNsYXRpb25zO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gc3RvcmUgYW4gaW5zdGFuY2Ugb2YgdGhlIHN0b3JlICh0aGF0IGlzIHN1cHBvc2VkIHRvIGJlIHVuaXF1ZSlcbiAgICogQHBhcmFtIGN1cnJlbnRMb2FkZXIgQW4gaW5zdGFuY2Ugb2YgdGhlIGxvYWRlciBjdXJyZW50bHkgdXNlZFxuICAgKiBAcGFyYW0gY29tcGlsZXIgQW4gaW5zdGFuY2Ugb2YgdGhlIGNvbXBpbGVyIGN1cnJlbnRseSB1c2VkXG4gICAqIEBwYXJhbSBwYXJzZXIgQW4gaW5zdGFuY2Ugb2YgdGhlIHBhcnNlciBjdXJyZW50bHkgdXNlZFxuICAgKiBAcGFyYW0gbWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlciBBIGhhbmRsZXIgZm9yIG1pc3NpbmcgdHJhbnNsYXRpb25zLlxuICAgKiBAcGFyYW0gdXNlRGVmYXVsdExhbmcgd2hldGhlciB3ZSBzaG91bGQgdXNlIGRlZmF1bHQgbGFuZ3VhZ2UgdHJhbnNsYXRpb24gd2hlbiBjdXJyZW50IGxhbmd1YWdlIHRyYW5zbGF0aW9uIGlzIG1pc3NpbmcuXG4gICAqIEBwYXJhbSBpc29sYXRlIHdoZXRoZXIgdGhpcyBzZXJ2aWNlIHNob3VsZCB1c2UgdGhlIHN0b3JlIG9yIG5vdFxuICAgKiBAcGFyYW0gZXh0ZW5kIFRvIG1ha2UgYSBjaGlsZCBtb2R1bGUgZXh0ZW5kIChhbmQgdXNlKSB0cmFuc2xhdGlvbnMgZnJvbSBwYXJlbnQgbW9kdWxlcy5cbiAgICogQHBhcmFtIGRlZmF1bHRMYW5ndWFnZSBTZXQgdGhlIGRlZmF1bHQgbGFuZ3VhZ2UgdXNpbmcgY29uZmlndXJhdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IocHVibGljIHN0b3JlOiBUcmFuc2xhdGVTdG9yZSxcbiAgICAgICAgICAgICAgcHVibGljIGN1cnJlbnRMb2FkZXI6IFRyYW5zbGF0ZUxvYWRlcixcbiAgICAgICAgICAgICAgcHVibGljIGNvbXBpbGVyOiBUcmFuc2xhdGVDb21waWxlcixcbiAgICAgICAgICAgICAgcHVibGljIHBhcnNlcjogVHJhbnNsYXRlUGFyc2VyLFxuICAgICAgICAgICAgICBwdWJsaWMgbWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlcjogTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlcixcbiAgICAgICAgICAgICAgQEluamVjdChVU0VfREVGQVVMVF9MQU5HKSBwcml2YXRlIHVzZURlZmF1bHRMYW5nOiBib29sZWFuID0gdHJ1ZSxcbiAgICAgICAgICAgICAgQEluamVjdChVU0VfU1RPUkUpIHByaXZhdGUgaXNvbGF0ZTogYm9vbGVhbiA9IGZhbHNlLFxuICAgICAgICAgICAgICBASW5qZWN0KFVTRV9FWFRFTkQpIHByaXZhdGUgZXh0ZW5kOiBib29sZWFuID0gZmFsc2UsXG4gICAgICAgICAgICAgIEBJbmplY3QoREVGQVVMVF9MQU5HVUFHRSkgZGVmYXVsdExhbmd1YWdlOiBzdHJpbmcpIHtcbiAgICAvKiogc2V0IHRoZSBkZWZhdWx0IGxhbmd1YWdlIGZyb20gY29uZmlndXJhdGlvbiAqL1xuICAgIGlmIChkZWZhdWx0TGFuZ3VhZ2UpIHtcbiAgICAgIHRoaXMuc2V0RGVmYXVsdExhbmcoZGVmYXVsdExhbmd1YWdlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgZGVmYXVsdCBsYW5ndWFnZSB0byB1c2UgYXMgYSBmYWxsYmFja1xuICAgKi9cbiAgcHVibGljIHNldERlZmF1bHRMYW5nKGxhbmc6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChsYW5nID09PSB0aGlzLmRlZmF1bHRMYW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHBlbmRpbmc6IE9ic2VydmFibGU8YW55PiA9IHRoaXMucmV0cmlldmVUcmFuc2xhdGlvbnMobGFuZyk7XG5cbiAgICBpZiAodHlwZW9mIHBlbmRpbmcgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIC8vIG9uIGluaXQgc2V0IHRoZSBkZWZhdWx0TGFuZyBpbW1lZGlhdGVseVxuICAgICAgaWYgKHRoaXMuZGVmYXVsdExhbmcgPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmRlZmF1bHRMYW5nID0gbGFuZztcbiAgICAgIH1cblxuICAgICAgcGVuZGluZy5waXBlKHRha2UoMSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgdGhpcy5jaGFuZ2VEZWZhdWx0TGFuZyhsYW5nKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHsgLy8gd2UgYWxyZWFkeSBoYXZlIHRoaXMgbGFuZ3VhZ2VcbiAgICAgIHRoaXMuY2hhbmdlRGVmYXVsdExhbmcobGFuZyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGRlZmF1bHQgbGFuZ3VhZ2UgdXNlZFxuICAgKi9cbiAgcHVibGljIGdldERlZmF1bHRMYW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZGVmYXVsdExhbmc7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlcyB0aGUgbGFuZyBjdXJyZW50bHkgdXNlZFxuICAgKi9cbiAgcHVibGljIHVzZShsYW5nOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIC8vIGRvbid0IGNoYW5nZSB0aGUgbGFuZ3VhZ2UgaWYgdGhlIGxhbmd1YWdlIGdpdmVuIGlzIGFscmVhZHkgc2VsZWN0ZWRcbiAgICBpZiAobGFuZyA9PT0gdGhpcy5jdXJyZW50TGFuZykge1xuICAgICAgcmV0dXJuIG9mKHRoaXMudHJhbnNsYXRpb25zW2xhbmddKTtcbiAgICB9XG5cbiAgICBsZXQgcGVuZGluZzogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5yZXRyaWV2ZVRyYW5zbGF0aW9ucyhsYW5nKTtcblxuICAgIGlmICh0eXBlb2YgcGVuZGluZyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgLy8gb24gaW5pdCBzZXQgdGhlIGN1cnJlbnRMYW5nIGltbWVkaWF0ZWx5XG4gICAgICBpZiAoIXRoaXMuY3VycmVudExhbmcpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50TGFuZyA9IGxhbmc7XG4gICAgICB9XG5cbiAgICAgIHBlbmRpbmcucGlwZSh0YWtlKDEpKVxuICAgICAgICAuc3Vic2NyaWJlKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgIHRoaXMuY2hhbmdlTGFuZyhsYW5nKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBwZW5kaW5nO1xuICAgIH0gZWxzZSB7IC8vIHdlIGhhdmUgdGhpcyBsYW5ndWFnZSwgcmV0dXJuIGFuIE9ic2VydmFibGVcbiAgICAgIHRoaXMuY2hhbmdlTGFuZyhsYW5nKTtcblxuICAgICAgcmV0dXJuIG9mKHRoaXMudHJhbnNsYXRpb25zW2xhbmddKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBnaXZlbiB0cmFuc2xhdGlvbnNcbiAgICovXG4gIHByaXZhdGUgcmV0cmlldmVUcmFuc2xhdGlvbnMobGFuZzogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgcGVuZGluZzogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gICAgLy8gaWYgdGhpcyBsYW5ndWFnZSBpcyB1bmF2YWlsYWJsZSBvciBleHRlbmQgaXMgdHJ1ZSwgYXNrIGZvciBpdFxuICAgIGlmICh0eXBlb2YgdGhpcy50cmFuc2xhdGlvbnNbbGFuZ10gPT09IFwidW5kZWZpbmVkXCIgfHwgdGhpcy5leHRlbmQpIHtcbiAgICAgIHRoaXMuX3RyYW5zbGF0aW9uUmVxdWVzdHNbbGFuZ10gPSB0aGlzLl90cmFuc2xhdGlvblJlcXVlc3RzW2xhbmddIHx8IHRoaXMuZ2V0VHJhbnNsYXRpb24obGFuZyk7XG4gICAgICBwZW5kaW5nID0gdGhpcy5fdHJhbnNsYXRpb25SZXF1ZXN0c1tsYW5nXTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGVuZGluZztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFuIG9iamVjdCBvZiB0cmFuc2xhdGlvbnMgZm9yIGEgZ2l2ZW4gbGFuZ3VhZ2Ugd2l0aCB0aGUgY3VycmVudCBsb2FkZXJcbiAgICogYW5kIHBhc3NlcyBpdCB0aHJvdWdoIHRoZSBjb21waWxlclxuICAgKi9cbiAgcHVibGljIGdldFRyYW5zbGF0aW9uKGxhbmc6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgdGhpcy5wZW5kaW5nID0gdHJ1ZTtcbiAgICBjb25zdCBsb2FkaW5nVHJhbnNsYXRpb25zID0gdGhpcy5jdXJyZW50TG9hZGVyLmdldFRyYW5zbGF0aW9uKGxhbmcpLnBpcGUoXG4gICAgICBzaGFyZVJlcGxheSgxKSxcbiAgICAgIHRha2UoMSksXG4gICAgKTtcblxuICAgIHRoaXMubG9hZGluZ1RyYW5zbGF0aW9ucyA9IGxvYWRpbmdUcmFuc2xhdGlvbnMucGlwZShcbiAgICAgIG1hcCgocmVzOiBPYmplY3QpID0+IHRoaXMuY29tcGlsZXIuY29tcGlsZVRyYW5zbGF0aW9ucyhyZXMsIGxhbmcpKSxcbiAgICAgIHNoYXJlUmVwbGF5KDEpLFxuICAgICAgdGFrZSgxKSxcbiAgICApO1xuXG4gICAgdGhpcy5sb2FkaW5nVHJhbnNsYXRpb25zXG4gICAgICAuc3Vic2NyaWJlKHtcbiAgICAgICAgbmV4dDogKHJlczogT2JqZWN0KSA9PiB7XG4gICAgICAgICAgdGhpcy50cmFuc2xhdGlvbnNbbGFuZ10gPSB0aGlzLmV4dGVuZCAmJiB0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXSA/IHsgLi4ucmVzLCAuLi50aGlzLnRyYW5zbGF0aW9uc1tsYW5nXSB9IDogcmVzO1xuICAgICAgICAgIHRoaXMudXBkYXRlTGFuZ3MoKTtcbiAgICAgICAgICB0aGlzLnBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IChlcnI6IGFueSkgPT4ge1xuICAgICAgICAgIHRoaXMucGVuZGluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIHJldHVybiBsb2FkaW5nVHJhbnNsYXRpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hbnVhbGx5IHNldHMgYW4gb2JqZWN0IG9mIHRyYW5zbGF0aW9ucyBmb3IgYSBnaXZlbiBsYW5ndWFnZVxuICAgKiBhZnRlciBwYXNzaW5nIGl0IHRocm91Z2ggdGhlIGNvbXBpbGVyXG4gICAqL1xuICBwdWJsaWMgc2V0VHJhbnNsYXRpb24obGFuZzogc3RyaW5nLCB0cmFuc2xhdGlvbnM6IE9iamVjdCwgc2hvdWxkTWVyZ2U6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgIHRyYW5zbGF0aW9ucyA9IHRoaXMuY29tcGlsZXIuY29tcGlsZVRyYW5zbGF0aW9ucyh0cmFuc2xhdGlvbnMsIGxhbmcpO1xuICAgIGlmICgoc2hvdWxkTWVyZ2UgfHwgdGhpcy5leHRlbmQpICYmIHRoaXMudHJhbnNsYXRpb25zW2xhbmddKSB7XG4gICAgICB0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXSA9IG1lcmdlRGVlcCh0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXSwgdHJhbnNsYXRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50cmFuc2xhdGlvbnNbbGFuZ10gPSB0cmFuc2xhdGlvbnM7XG4gICAgfVxuICAgIHRoaXMudXBkYXRlTGFuZ3MoKTtcbiAgICB0aGlzLm9uVHJhbnNsYXRpb25DaGFuZ2UuZW1pdCh7bGFuZzogbGFuZywgdHJhbnNsYXRpb25zOiB0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXX0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gYXJyYXkgb2YgY3VycmVudGx5IGF2YWlsYWJsZSBsYW5nc1xuICAgKi9cbiAgcHVibGljIGdldExhbmdzKCk6IEFycmF5PHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmxhbmdzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhdmFpbGFibGUgbGFuZ3NcbiAgICovXG4gIHB1YmxpYyBhZGRMYW5ncyhsYW5nczogQXJyYXk8c3RyaW5nPik6IHZvaWQge1xuICAgIGxhbmdzLmZvckVhY2goKGxhbmc6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKHRoaXMubGFuZ3MuaW5kZXhPZihsYW5nKSA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5sYW5ncy5wdXNoKGxhbmcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgbGlzdCBvZiBhdmFpbGFibGUgbGFuZ3NcbiAgICovXG4gIHByaXZhdGUgdXBkYXRlTGFuZ3MoKTogdm9pZCB7XG4gICAgdGhpcy5hZGRMYW5ncyhPYmplY3Qua2V5cyh0aGlzLnRyYW5zbGF0aW9ucykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHBhcnNlZCByZXN1bHQgb2YgdGhlIHRyYW5zbGF0aW9uc1xuICAgKi9cbiAgcHVibGljIGdldFBhcnNlZFJlc3VsdCh0cmFuc2xhdGlvbnM6IGFueSwga2V5OiBhbnksIGludGVycG9sYXRlUGFyYW1zPzogT2JqZWN0KTogYW55IHtcbiAgICBsZXQgcmVzOiBzdHJpbmcgfCBPYnNlcnZhYmxlPHN0cmluZz47XG5cbiAgICBpZiAoa2V5IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGxldCByZXN1bHQ6IGFueSA9IHt9LFxuICAgICAgICBvYnNlcnZhYmxlczogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgZm9yIChsZXQgayBvZiBrZXkpIHtcbiAgICAgICAgcmVzdWx0W2tdID0gdGhpcy5nZXRQYXJzZWRSZXN1bHQodHJhbnNsYXRpb25zLCBrLCBpbnRlcnBvbGF0ZVBhcmFtcyk7XG4gICAgICAgIGlmIChpc09ic2VydmFibGUocmVzdWx0W2tdKSkge1xuICAgICAgICAgIG9ic2VydmFibGVzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG9ic2VydmFibGVzKSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZXMgPSBrZXkubWFwKGsgPT4gaXNPYnNlcnZhYmxlKHJlc3VsdFtrXSkgPyByZXN1bHRba10gOiBvZihyZXN1bHRba10gYXMgc3RyaW5nKSk7XG4gICAgICAgIHJldHVybiBmb3JrSm9pbihzb3VyY2VzKS5waXBlKFxuICAgICAgICAgIG1hcCgoYXJyOiBBcnJheTxzdHJpbmc+KSA9PiB7XG4gICAgICAgICAgICBsZXQgb2JqOiBhbnkgPSB7fTtcbiAgICAgICAgICAgIGFyci5mb3JFYWNoKCh2YWx1ZTogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgIG9ialtrZXlbaW5kZXhdXSA9IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGlmICh0cmFuc2xhdGlvbnMpIHtcbiAgICAgIHJlcyA9IHRoaXMucGFyc2VyLmludGVycG9sYXRlKHRoaXMucGFyc2VyLmdldFZhbHVlKHRyYW5zbGF0aW9ucywga2V5KSwgaW50ZXJwb2xhdGVQYXJhbXMpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcmVzID09PSBcInVuZGVmaW5lZFwiICYmIHRoaXMuZGVmYXVsdExhbmcgIT0gbnVsbCAmJiB0aGlzLmRlZmF1bHRMYW5nICE9PSB0aGlzLmN1cnJlbnRMYW5nICYmIHRoaXMudXNlRGVmYXVsdExhbmcpIHtcbiAgICAgIHJlcyA9IHRoaXMucGFyc2VyLmludGVycG9sYXRlKHRoaXMucGFyc2VyLmdldFZhbHVlKHRoaXMudHJhbnNsYXRpb25zW3RoaXMuZGVmYXVsdExhbmddLCBrZXkpLCBpbnRlcnBvbGF0ZVBhcmFtcyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiByZXMgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGxldCBwYXJhbXM6IE1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXJQYXJhbXMgPSB7a2V5LCB0cmFuc2xhdGVTZXJ2aWNlOiB0aGlzfTtcbiAgICAgIGlmICh0eXBlb2YgaW50ZXJwb2xhdGVQYXJhbXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHBhcmFtcy5pbnRlcnBvbGF0ZVBhcmFtcyA9IGludGVycG9sYXRlUGFyYW1zO1xuICAgICAgfVxuICAgICAgcmVzID0gdGhpcy5taXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyLmhhbmRsZShwYXJhbXMpO1xuICAgIH1cblxuICAgIHJldHVybiB0eXBlb2YgcmVzICE9PSBcInVuZGVmaW5lZFwiID8gcmVzIDoga2V5O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHRyYW5zbGF0ZWQgdmFsdWUgb2YgYSBrZXkgKG9yIGFuIGFycmF5IG9mIGtleXMpXG4gICAqIEByZXR1cm5zIHRoZSB0cmFuc2xhdGVkIGtleSwgb3IgYW4gb2JqZWN0IG9mIHRyYW5zbGF0ZWQga2V5c1xuICAgKi9cbiAgcHVibGljIGdldChrZXk6IHN0cmluZyB8IEFycmF5PHN0cmluZz4sIGludGVycG9sYXRlUGFyYW1zPzogT2JqZWN0KTogT2JzZXJ2YWJsZTxzdHJpbmcgfCBhbnk+IHtcbiAgICBpZiAoIWlzRGVmaW5lZChrZXkpIHx8ICFrZXkubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciBcImtleVwiIHJlcXVpcmVkYCk7XG4gICAgfVxuICAgIC8vIGNoZWNrIGlmIHdlIGFyZSBsb2FkaW5nIGEgbmV3IHRyYW5zbGF0aW9uIHRvIHVzZVxuICAgIGlmICh0aGlzLnBlbmRpbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLmxvYWRpbmdUcmFuc2xhdGlvbnMucGlwZShcbiAgICAgICAgY29uY2F0TWFwKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgIHJlcyA9IHRoaXMuZ2V0UGFyc2VkUmVzdWx0KHJlcywga2V5LCBpbnRlcnBvbGF0ZVBhcmFtcyk7XG4gICAgICAgICAgcmV0dXJuIGlzT2JzZXJ2YWJsZShyZXMpID8gcmVzIDogb2YocmVzKTtcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgcmVzID0gdGhpcy5nZXRQYXJzZWRSZXN1bHQodGhpcy50cmFuc2xhdGlvbnNbdGhpcy5jdXJyZW50TGFuZ10sIGtleSwgaW50ZXJwb2xhdGVQYXJhbXMpO1xuICAgICAgcmV0dXJuIGlzT2JzZXJ2YWJsZShyZXMpID8gcmVzIDogb2YocmVzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHN0cmVhbSBvZiB0cmFuc2xhdGVkIHZhbHVlcyBvZiBhIGtleSAob3IgYW4gYXJyYXkgb2Yga2V5cykgd2hpY2ggdXBkYXRlc1xuICAgKiB3aGVuZXZlciB0aGUgdHJhbnNsYXRpb24gY2hhbmdlcy5cbiAgICogQHJldHVybnMgQSBzdHJlYW0gb2YgdGhlIHRyYW5zbGF0ZWQga2V5LCBvciBhbiBvYmplY3Qgb2YgdHJhbnNsYXRlZCBrZXlzXG4gICAqL1xuICBwdWJsaWMgZ2V0U3RyZWFtT25UcmFuc2xhdGlvbkNoYW5nZShrZXk6IHN0cmluZyB8IEFycmF5PHN0cmluZz4sIGludGVycG9sYXRlUGFyYW1zPzogT2JqZWN0KTogT2JzZXJ2YWJsZTxzdHJpbmcgfCBhbnk+IHtcbiAgICBpZiAoIWlzRGVmaW5lZChrZXkpIHx8ICFrZXkubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciBcImtleVwiIHJlcXVpcmVkYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbmNhdChcbiAgICAgIGRlZmVyKCgpID0+IHRoaXMuZ2V0KGtleSwgaW50ZXJwb2xhdGVQYXJhbXMpKSxcbiAgICAgIHRoaXMub25UcmFuc2xhdGlvbkNoYW5nZS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKGV2ZW50OiBUcmFuc2xhdGlvbkNoYW5nZUV2ZW50KSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzID0gdGhpcy5nZXRQYXJzZWRSZXN1bHQoZXZlbnQudHJhbnNsYXRpb25zLCBrZXksIGludGVycG9sYXRlUGFyYW1zKTtcbiAgICAgICAgICBpZiAodHlwZW9mIHJlcy5zdWJzY3JpYmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBvZihyZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBzdHJlYW0gb2YgdHJhbnNsYXRlZCB2YWx1ZXMgb2YgYSBrZXkgKG9yIGFuIGFycmF5IG9mIGtleXMpIHdoaWNoIHVwZGF0ZXNcbiAgICogd2hlbmV2ZXIgdGhlIGxhbmd1YWdlIGNoYW5nZXMuXG4gICAqIEByZXR1cm5zIEEgc3RyZWFtIG9mIHRoZSB0cmFuc2xhdGVkIGtleSwgb3IgYW4gb2JqZWN0IG9mIHRyYW5zbGF0ZWQga2V5c1xuICAgKi9cbiAgcHVibGljIHN0cmVhbShrZXk6IHN0cmluZyB8IEFycmF5PHN0cmluZz4sIGludGVycG9sYXRlUGFyYW1zPzogT2JqZWN0KTogT2JzZXJ2YWJsZTxzdHJpbmcgfCBhbnk+IHtcbiAgICBpZiAoIWlzRGVmaW5lZChrZXkpIHx8ICFrZXkubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciBcImtleVwiIHJlcXVpcmVkYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbmNhdChcbiAgICAgIGRlZmVyKCgpID0+IHRoaXMuZ2V0KGtleSwgaW50ZXJwb2xhdGVQYXJhbXMpKSxcbiAgICAgIHRoaXMub25MYW5nQ2hhbmdlLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoZXZlbnQ6IExhbmdDaGFuZ2VFdmVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlcyA9IHRoaXMuZ2V0UGFyc2VkUmVzdWx0KGV2ZW50LnRyYW5zbGF0aW9ucywga2V5LCBpbnRlcnBvbGF0ZVBhcmFtcyk7XG4gICAgICAgICAgcmV0dXJuIGlzT2JzZXJ2YWJsZShyZXMpID8gcmVzIDogb2YocmVzKTtcbiAgICAgICAgfSlcbiAgICAgICkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSB0cmFuc2xhdGlvbiBpbnN0YW50bHkgZnJvbSB0aGUgaW50ZXJuYWwgc3RhdGUgb2YgbG9hZGVkIHRyYW5zbGF0aW9uLlxuICAgKiBBbGwgcnVsZXMgcmVnYXJkaW5nIHRoZSBjdXJyZW50IGxhbmd1YWdlLCB0aGUgcHJlZmVycmVkIGxhbmd1YWdlIG9mIGV2ZW4gZmFsbGJhY2sgbGFuZ3VhZ2VzIHdpbGwgYmUgdXNlZCBleGNlcHQgYW55IHByb21pc2UgaGFuZGxpbmcuXG4gICAqL1xuICBwdWJsaWMgaW5zdGFudChrZXk6IHN0cmluZyB8IEFycmF5PHN0cmluZz4sIGludGVycG9sYXRlUGFyYW1zPzogT2JqZWN0KTogc3RyaW5nIHwgYW55IHtcbiAgICBpZiAoIWlzRGVmaW5lZChrZXkpIHx8ICFrZXkubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciBcImtleVwiIHJlcXVpcmVkYCk7XG4gICAgfVxuXG4gICAgbGV0IHJlcyA9IHRoaXMuZ2V0UGFyc2VkUmVzdWx0KHRoaXMudHJhbnNsYXRpb25zW3RoaXMuY3VycmVudExhbmddLCBrZXksIGludGVycG9sYXRlUGFyYW1zKTtcbiAgICBpZiAoaXNPYnNlcnZhYmxlKHJlcykpIHtcbiAgICAgIGlmIChrZXkgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBsZXQgb2JqOiBhbnkgPSB7fTtcbiAgICAgICAga2V5LmZvckVhY2goKHZhbHVlOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICBvYmpba2V5W2luZGV4XV0gPSBrZXlbaW5kZXhdO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH1cbiAgICAgIHJldHVybiBrZXk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHRyYW5zbGF0ZWQgdmFsdWUgb2YgYSBrZXksIGFmdGVyIGNvbXBpbGluZyBpdFxuICAgKi9cbiAgcHVibGljIHNldChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZywgbGFuZzogc3RyaW5nID0gdGhpcy5jdXJyZW50TGFuZyk6IHZvaWQge1xuICAgIHRoaXMudHJhbnNsYXRpb25zW2xhbmddW2tleV0gPSB0aGlzLmNvbXBpbGVyLmNvbXBpbGUodmFsdWUsIGxhbmcpO1xuICAgIHRoaXMudXBkYXRlTGFuZ3MoKTtcbiAgICB0aGlzLm9uVHJhbnNsYXRpb25DaGFuZ2UuZW1pdCh7bGFuZzogbGFuZywgdHJhbnNsYXRpb25zOiB0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXX0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZXMgdGhlIGN1cnJlbnQgbGFuZ1xuICAgKi9cbiAgcHJpdmF0ZSBjaGFuZ2VMYW5nKGxhbmc6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudExhbmcgPSBsYW5nO1xuICAgIHRoaXMub25MYW5nQ2hhbmdlLmVtaXQoe2xhbmc6IGxhbmcsIHRyYW5zbGF0aW9uczogdGhpcy50cmFuc2xhdGlvbnNbbGFuZ119KTtcblxuICAgIC8vIGlmIHRoZXJlIGlzIG5vIGRlZmF1bHQgbGFuZywgdXNlIHRoZSBvbmUgdGhhdCB3ZSBqdXN0IHNldFxuICAgIGlmICh0aGlzLmRlZmF1bHRMYW5nID09IG51bGwpIHtcbiAgICAgIHRoaXMuY2hhbmdlRGVmYXVsdExhbmcobGFuZyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZXMgdGhlIGRlZmF1bHQgbGFuZ1xuICAgKi9cbiAgcHJpdmF0ZSBjaGFuZ2VEZWZhdWx0TGFuZyhsYW5nOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmRlZmF1bHRMYW5nID0gbGFuZztcbiAgICB0aGlzLm9uRGVmYXVsdExhbmdDaGFuZ2UuZW1pdCh7bGFuZzogbGFuZywgdHJhbnNsYXRpb25zOiB0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXX0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsbG93cyB0byByZWxvYWQgdGhlIGxhbmcgZmlsZSBmcm9tIHRoZSBmaWxlXG4gICAqL1xuICBwdWJsaWMgcmVsb2FkTGFuZyhsYW5nOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHRoaXMucmVzZXRMYW5nKGxhbmcpO1xuICAgIHJldHVybiB0aGlzLmdldFRyYW5zbGF0aW9uKGxhbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgaW5uZXIgdHJhbnNsYXRpb25cbiAgICovXG4gIHB1YmxpYyByZXNldExhbmcobGFuZzogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fdHJhbnNsYXRpb25SZXF1ZXN0c1tsYW5nXSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBsYW5ndWFnZSBjb2RlIG5hbWUgZnJvbSB0aGUgYnJvd3NlciwgZS5nLiBcImRlXCJcbiAgICovXG4gIHB1YmxpYyBnZXRCcm93c2VyTGFuZygpOiBzdHJpbmcge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2Ygd2luZG93Lm5hdmlnYXRvciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgbGV0IGJyb3dzZXJMYW5nOiBhbnkgPSB3aW5kb3cubmF2aWdhdG9yLmxhbmd1YWdlcyA/IHdpbmRvdy5uYXZpZ2F0b3IubGFuZ3VhZ2VzWzBdIDogbnVsbDtcbiAgICBicm93c2VyTGFuZyA9IGJyb3dzZXJMYW5nIHx8IHdpbmRvdy5uYXZpZ2F0b3IubGFuZ3VhZ2UgfHwgd2luZG93Lm5hdmlnYXRvci5icm93c2VyTGFuZ3VhZ2UgfHwgd2luZG93Lm5hdmlnYXRvci51c2VyTGFuZ3VhZ2U7XG5cbiAgICBpZiAodHlwZW9mIGJyb3dzZXJMYW5nID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cblxuICAgIGlmIChicm93c2VyTGFuZy5pbmRleE9mKCctJykgIT09IC0xKSB7XG4gICAgICBicm93c2VyTGFuZyA9IGJyb3dzZXJMYW5nLnNwbGl0KCctJylbMF07XG4gICAgfVxuXG4gICAgaWYgKGJyb3dzZXJMYW5nLmluZGV4T2YoJ18nKSAhPT0gLTEpIHtcbiAgICAgIGJyb3dzZXJMYW5nID0gYnJvd3Nlckxhbmcuc3BsaXQoJ18nKVswXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnJvd3Nlckxhbmc7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY3VsdHVyZSBsYW5ndWFnZSBjb2RlIG5hbWUgZnJvbSB0aGUgYnJvd3NlciwgZS5nLiBcImRlLURFXCJcbiAgICovXG4gIHB1YmxpYyBnZXRCcm93c2VyQ3VsdHVyZUxhbmcoKTogc3RyaW5nIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIHdpbmRvdy5uYXZpZ2F0b3IgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGxldCBicm93c2VyQ3VsdHVyZUxhbmc6IGFueSA9IHdpbmRvdy5uYXZpZ2F0b3IubGFuZ3VhZ2VzID8gd2luZG93Lm5hdmlnYXRvci5sYW5ndWFnZXNbMF0gOiBudWxsO1xuICAgIGJyb3dzZXJDdWx0dXJlTGFuZyA9IGJyb3dzZXJDdWx0dXJlTGFuZyB8fCB3aW5kb3cubmF2aWdhdG9yLmxhbmd1YWdlIHx8IHdpbmRvdy5uYXZpZ2F0b3IuYnJvd3Nlckxhbmd1YWdlIHx8IHdpbmRvdy5uYXZpZ2F0b3IudXNlckxhbmd1YWdlO1xuXG4gICAgcmV0dXJuIGJyb3dzZXJDdWx0dXJlTGFuZztcbiAgfVxufVxuIl19