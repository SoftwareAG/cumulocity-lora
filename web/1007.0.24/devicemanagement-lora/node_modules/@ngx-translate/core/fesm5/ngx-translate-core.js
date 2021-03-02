import { Injectable, EventEmitter, InjectionToken, Inject, Directive, ElementRef, ChangeDetectorRef, Input, Pipe, NgModule } from '@angular/core';
import { __extends, __assign, __values } from 'tslib';
import { of, isObservable, forkJoin, concat, defer } from 'rxjs';
import { take, shareReplay, map, concatMap, switchMap } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
TranslateLoader = /** @class */ (function () {
    function TranslateLoader() {
    }
    return TranslateLoader;
}());
if (false) {
    /**
     * @abstract
     * @param {?} lang
     * @return {?}
     */
    TranslateLoader.prototype.getTranslation = function (lang) { };
}
/**
 * This loader is just a placeholder that does nothing, in case you don't need a loader at all
 */
var TranslateFakeLoader = /** @class */ (function (_super) {
    __extends(TranslateFakeLoader, _super);
    function TranslateFakeLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} lang
     * @return {?}
     */
    TranslateFakeLoader.prototype.getTranslation = /**
     * @param {?} lang
     * @return {?}
     */
    function (lang) {
        return of({});
    };
    TranslateFakeLoader.decorators = [
        { type: Injectable }
    ];
    return TranslateFakeLoader;
}(TranslateLoader));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function MissingTranslationHandlerParams() { }
if (false) {
    /**
     * the key that's missing in translation files
     * @type {?}
     */
    MissingTranslationHandlerParams.prototype.key;
    /**
     * an instance of the service that was unable to translate the key.
     * @type {?}
     */
    MissingTranslationHandlerParams.prototype.translateService;
    /**
     * interpolation params that were passed along for translating the given key.
     * @type {?|undefined}
     */
    MissingTranslationHandlerParams.prototype.interpolateParams;
}
/**
 * @abstract
 */
var  /**
 * @abstract
 */
MissingTranslationHandler = /** @class */ (function () {
    function MissingTranslationHandler() {
    }
    return MissingTranslationHandler;
}());
if (false) {
    /**
     * A function that handles missing translations.
     *
     * @abstract
     * @param {?} params context for resolving a missing translation
     * @return {?} a value or an observable
     * If it returns a value, then this value is used.
     * If it return an observable, the value returned by this observable will be used (except if the method was "instant").
     * If it doesn't return then the key will be used as a value
     */
    MissingTranslationHandler.prototype.handle = function (params) { };
}
/**
 * This handler is just a placeholder that does nothing, in case you don't need a missing translation handler at all
 */
var FakeMissingTranslationHandler = /** @class */ (function () {
    function FakeMissingTranslationHandler() {
    }
    /**
     * @param {?} params
     * @return {?}
     */
    FakeMissingTranslationHandler.prototype.handle = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        return params.key;
    };
    FakeMissingTranslationHandler.decorators = [
        { type: Injectable }
    ];
    return FakeMissingTranslationHandler;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* tslint:disable */
/**
 * Determines if two objects or two values are equivalent.
 *
 * Two objects or values are considered equivalent if at least one of the following is true:
 *
 * * Both objects or values pass `===` comparison.
 * * Both objects or values are of the same type and all of their properties are equal by
 *   comparing them with `equals`.
 *
 * @param {?} o1 Object or value to compare.
 * @param {?} o2 Object or value to compare.
 * @return {?} true if arguments are equal.
 */
function equals(o1, o2) {
    if (o1 === o2)
        return true;
    if (o1 === null || o2 === null)
        return false;
    if (o1 !== o1 && o2 !== o2)
        return true; // NaN === NaN
    // NaN === NaN
    /** @type {?} */
    var t1 = typeof o1;
    /** @type {?} */
    var t2 = typeof o2;
    /** @type {?} */
    var length;
    /** @type {?} */
    var key;
    /** @type {?} */
    var keySet;
    if (t1 == t2 && t1 == 'object') {
        if (Array.isArray(o1)) {
            if (!Array.isArray(o2))
                return false;
            if ((length = o1.length) == o2.length) {
                for (key = 0; key < length; key++) {
                    if (!equals(o1[key], o2[key]))
                        return false;
                }
                return true;
            }
        }
        else {
            if (Array.isArray(o2)) {
                return false;
            }
            keySet = Object.create(null);
            for (key in o1) {
                if (!equals(o1[key], o2[key])) {
                    return false;
                }
                keySet[key] = true;
            }
            for (key in o2) {
                if (!(key in keySet) && typeof o2[key] !== 'undefined') {
                    return false;
                }
            }
            return true;
        }
    }
    return false;
}
/* tslint:enable */
/**
 * @param {?} value
 * @return {?}
 */
function isDefined(value) {
    return typeof value !== 'undefined' && value !== null;
}
/**
 * @param {?} item
 * @return {?}
 */
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}
/**
 * @param {?} target
 * @param {?} source
 * @return {?}
 */
function mergeDeep(target, source) {
    /** @type {?} */
    var output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            var _a, _b;
            if (isObject(source[key])) {
                if (!(key in target)) {
                    Object.assign(output, (_a = {}, _a[key] = source[key], _a));
                }
                else {
                    output[key] = mergeDeep(target[key], source[key]);
                }
            }
            else {
                Object.assign(output, (_b = {}, _b[key] = source[key], _b));
            }
        }));
    }
    return output;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
TranslateParser = /** @class */ (function () {
    function TranslateParser() {
    }
    return TranslateParser;
}());
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
if (false) {
    /** @type {?} */
    TranslateDefaultParser.prototype.templateMatcher;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
TranslateCompiler = /** @class */ (function () {
    function TranslateCompiler() {
    }
    return TranslateCompiler;
}());
if (false) {
    /**
     * @abstract
     * @param {?} value
     * @param {?} lang
     * @return {?}
     */
    TranslateCompiler.prototype.compile = function (value, lang) { };
    /**
     * @abstract
     * @param {?} translations
     * @param {?} lang
     * @return {?}
     */
    TranslateCompiler.prototype.compileTranslations = function (translations, lang) { };
}
/**
 * This compiler is just a placeholder that does nothing, in case you don't need a compiler at all
 */
var TranslateFakeCompiler = /** @class */ (function (_super) {
    __extends(TranslateFakeCompiler, _super);
    function TranslateFakeCompiler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} value
     * @param {?} lang
     * @return {?}
     */
    TranslateFakeCompiler.prototype.compile = /**
     * @param {?} value
     * @param {?} lang
     * @return {?}
     */
    function (value, lang) {
        return value;
    };
    /**
     * @param {?} translations
     * @param {?} lang
     * @return {?}
     */
    TranslateFakeCompiler.prototype.compileTranslations = /**
     * @param {?} translations
     * @param {?} lang
     * @return {?}
     */
    function (translations, lang) {
        return translations;
    };
    TranslateFakeCompiler.decorators = [
        { type: Injectable }
    ];
    return TranslateFakeCompiler;
}(TranslateCompiler));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TranslateStore = /** @class */ (function () {
    function TranslateStore() {
        /**
         * The lang currently used
         */
        this.currentLang = this.defaultLang;
        /**
         * a list of translations per lang
         */
        this.translations = {};
        /**
         * an array of langs
         */
        this.langs = [];
        /**
         * An EventEmitter to listen to translation change events
         * onTranslationChange.subscribe((params: TranslationChangeEvent) => {
         *     // do something
         * });
         */
        this.onTranslationChange = new EventEmitter();
        /**
         * An EventEmitter to listen to lang change events
         * onLangChange.subscribe((params: LangChangeEvent) => {
         *     // do something
         * });
         */
        this.onLangChange = new EventEmitter();
        /**
         * An EventEmitter to listen to default lang change events
         * onDefaultLangChange.subscribe((params: DefaultLangChangeEvent) => {
         *     // do something
         * });
         */
        this.onDefaultLangChange = new EventEmitter();
    }
    return TranslateStore;
}());
if (false) {
    /**
     * The default lang to fallback when translations are missing on the current lang
     * @type {?}
     */
    TranslateStore.prototype.defaultLang;
    /**
     * The lang currently used
     * @type {?}
     */
    TranslateStore.prototype.currentLang;
    /**
     * a list of translations per lang
     * @type {?}
     */
    TranslateStore.prototype.translations;
    /**
     * an array of langs
     * @type {?}
     */
    TranslateStore.prototype.langs;
    /**
     * An EventEmitter to listen to translation change events
     * onTranslationChange.subscribe((params: TranslationChangeEvent) => {
     *     // do something
     * });
     * @type {?}
     */
    TranslateStore.prototype.onTranslationChange;
    /**
     * An EventEmitter to listen to lang change events
     * onLangChange.subscribe((params: LangChangeEvent) => {
     *     // do something
     * });
     * @type {?}
     */
    TranslateStore.prototype.onLangChange;
    /**
     * An EventEmitter to listen to default lang change events
     * onDefaultLangChange.subscribe((params: DefaultLangChangeEvent) => {
     *     // do something
     * });
     * @type {?}
     */
    TranslateStore.prototype.onDefaultLangChange;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var USE_STORE = new InjectionToken('USE_STORE');
/** @type {?} */
var USE_DEFAULT_LANG = new InjectionToken('USE_DEFAULT_LANG');
/** @type {?} */
var DEFAULT_LANGUAGE = new InjectionToken('DEFAULT_LANGUAGE');
/** @type {?} */
var USE_EXTEND = new InjectionToken('USE_EXTEND');
/**
 * @record
 */
function TranslationChangeEvent() { }
if (false) {
    /** @type {?} */
    TranslationChangeEvent.prototype.translations;
    /** @type {?} */
    TranslationChangeEvent.prototype.lang;
}
/**
 * @record
 */
function LangChangeEvent() { }
if (false) {
    /** @type {?} */
    LangChangeEvent.prototype.lang;
    /** @type {?} */
    LangChangeEvent.prototype.translations;
}
/**
 * @record
 */
function DefaultLangChangeEvent() { }
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TranslateDirective = /** @class */ (function () {
    function TranslateDirective(translateService, element, _ref) {
        var _this = this;
        this.translateService = translateService;
        this.element = element;
        this._ref = _ref;
        // subscribe to onTranslationChange event, in case the translations of the current lang change
        if (!this.onTranslationChangeSub) {
            this.onTranslationChangeSub = this.translateService.onTranslationChange.subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                if (event.lang === _this.translateService.currentLang) {
                    _this.checkNodes(true, event.translations);
                }
            }));
        }
        // subscribe to onLangChange event, in case the language changes
        if (!this.onLangChangeSub) {
            this.onLangChangeSub = this.translateService.onLangChange.subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                _this.checkNodes(true, event.translations);
            }));
        }
        // subscribe to onDefaultLangChange event, in case the default language changes
        if (!this.onDefaultLangChangeSub) {
            this.onDefaultLangChangeSub = this.translateService.onDefaultLangChange.subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                _this.checkNodes(true);
            }));
        }
    }
    Object.defineProperty(TranslateDirective.prototype, "translate", {
        set: /**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            if (key) {
                this.key = key;
                this.checkNodes();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TranslateDirective.prototype, "translateParams", {
        set: /**
         * @param {?} params
         * @return {?}
         */
        function (params) {
            if (!equals(this.currentParams, params)) {
                this.currentParams = params;
                this.checkNodes(true);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TranslateDirective.prototype.ngAfterViewChecked = /**
     * @return {?}
     */
    function () {
        this.checkNodes();
    };
    /**
     * @param {?=} forceUpdate
     * @param {?=} translations
     * @return {?}
     */
    TranslateDirective.prototype.checkNodes = /**
     * @param {?=} forceUpdate
     * @param {?=} translations
     * @return {?}
     */
    function (forceUpdate, translations) {
        if (forceUpdate === void 0) { forceUpdate = false; }
        /** @type {?} */
        var nodes = this.element.nativeElement.childNodes;
        // if the element is empty
        if (!nodes.length) {
            // we add the key as content
            this.setContent(this.element.nativeElement, this.key);
            nodes = this.element.nativeElement.childNodes;
        }
        for (var i = 0; i < nodes.length; ++i) {
            /** @type {?} */
            var node = nodes[i];
            if (node.nodeType === 3) { // node type 3 is a text node
                // node type 3 is a text node
                /** @type {?} */
                var key = void 0;
                if (forceUpdate) {
                    node.lastKey = null;
                }
                if (isDefined(node.lookupKey)) {
                    key = node.lookupKey;
                }
                else if (this.key) {
                    key = this.key;
                }
                else {
                    /** @type {?} */
                    var content = this.getContent(node);
                    /** @type {?} */
                    var trimmedContent = content.trim();
                    if (trimmedContent.length) {
                        node.lookupKey = trimmedContent;
                        // we want to use the content as a key, not the translation value
                        if (content !== node.currentValue) {
                            key = trimmedContent;
                            // the content was changed from the user, we'll use it as a reference if needed
                            node.originalContent = content || node.originalContent;
                        }
                        else if (node.originalContent) { // the content seems ok, but the lang has changed
                            // the current content is the translation, not the key, use the last real content as key
                            key = node.originalContent.trim();
                        }
                        else if (content !== node.currentValue) {
                            // we want to use the content as a key, not the translation value
                            key = trimmedContent;
                            // the content was changed from the user, we'll use it as a reference if needed
                            node.originalContent = content || node.originalContent;
                        }
                    }
                }
                this.updateValue(key, node, translations);
            }
        }
    };
    /**
     * @param {?} key
     * @param {?} node
     * @param {?} translations
     * @return {?}
     */
    TranslateDirective.prototype.updateValue = /**
     * @param {?} key
     * @param {?} node
     * @param {?} translations
     * @return {?}
     */
    function (key, node, translations) {
        var _this = this;
        if (key) {
            if (node.lastKey === key && this.lastParams === this.currentParams) {
                return;
            }
            this.lastParams = this.currentParams;
            /** @type {?} */
            var onTranslation = (/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                if (res !== key) {
                    node.lastKey = key;
                }
                if (!node.originalContent) {
                    node.originalContent = _this.getContent(node);
                }
                node.currentValue = isDefined(res) ? res : (node.originalContent || key);
                // we replace in the original content to preserve spaces that we might have trimmed
                _this.setContent(node, _this.key ? node.currentValue : node.originalContent.replace(key, node.currentValue));
                _this._ref.markForCheck();
            });
            if (isDefined(translations)) {
                /** @type {?} */
                var res = this.translateService.getParsedResult(translations, key, this.currentParams);
                if (isObservable(res)) {
                    res.subscribe(onTranslation);
                }
                else {
                    onTranslation(res);
                }
            }
            else {
                this.translateService.get(key, this.currentParams).subscribe(onTranslation);
            }
        }
    };
    /**
     * @param {?} node
     * @return {?}
     */
    TranslateDirective.prototype.getContent = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        return isDefined(node.textContent) ? node.textContent : node.data;
    };
    /**
     * @param {?} node
     * @param {?} content
     * @return {?}
     */
    TranslateDirective.prototype.setContent = /**
     * @param {?} node
     * @param {?} content
     * @return {?}
     */
    function (node, content) {
        if (isDefined(node.textContent)) {
            node.textContent = content;
        }
        else {
            node.data = content;
        }
    };
    /**
     * @return {?}
     */
    TranslateDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.onLangChangeSub) {
            this.onLangChangeSub.unsubscribe();
        }
        if (this.onDefaultLangChangeSub) {
            this.onDefaultLangChangeSub.unsubscribe();
        }
        if (this.onTranslationChangeSub) {
            this.onTranslationChangeSub.unsubscribe();
        }
    };
    TranslateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[translate],[ngx-translate]'
                },] }
    ];
    /** @nocollapse */
    TranslateDirective.ctorParameters = function () { return [
        { type: TranslateService },
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
    TranslateDirective.propDecorators = {
        translate: [{ type: Input }],
        translateParams: [{ type: Input }]
    };
    return TranslateDirective;
}());
if (false) {
    /** @type {?} */
    TranslateDirective.prototype.key;
    /** @type {?} */
    TranslateDirective.prototype.lastParams;
    /** @type {?} */
    TranslateDirective.prototype.currentParams;
    /** @type {?} */
    TranslateDirective.prototype.onLangChangeSub;
    /** @type {?} */
    TranslateDirective.prototype.onDefaultLangChangeSub;
    /** @type {?} */
    TranslateDirective.prototype.onTranslationChangeSub;
    /**
     * @type {?}
     * @private
     */
    TranslateDirective.prototype.translateService;
    /**
     * @type {?}
     * @private
     */
    TranslateDirective.prototype.element;
    /**
     * @type {?}
     * @private
     */
    TranslateDirective.prototype._ref;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TranslatePipe = /** @class */ (function () {
    function TranslatePipe(translate, _ref) {
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
    TranslatePipe.prototype.updateValue = /**
     * @param {?} key
     * @param {?=} interpolateParams
     * @param {?=} translations
     * @return {?}
     */
    function (key, interpolateParams, translations) {
        var _this = this;
        /** @type {?} */
        var onTranslation = (/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            _this.value = res !== undefined ? res : key;
            _this.lastKey = key;
            _this._ref.markForCheck();
        });
        if (translations) {
            /** @type {?} */
            var res = this.translate.getParsedResult(translations, key, interpolateParams);
            if (isObservable(res.subscribe)) {
                res.subscribe(onTranslation);
            }
            else {
                onTranslation(res);
            }
        }
        this.translate.get(key, interpolateParams).subscribe(onTranslation);
    };
    /**
     * @param {?} query
     * @param {...?} args
     * @return {?}
     */
    TranslatePipe.prototype.transform = /**
     * @param {?} query
     * @param {...?} args
     * @return {?}
     */
    function (query) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!query || !query.length) {
            return query;
        }
        // if we ask another time for the same key, return the last value
        if (equals(query, this.lastKey) && equals(args, this.lastParams)) {
            return this.value;
        }
        /** @type {?} */
        var interpolateParams;
        if (isDefined(args[0]) && args.length) {
            if (typeof args[0] === 'string' && args[0].length) {
                // we accept objects written in the template such as {n:1}, {'n':1}, {n:'v'}
                // which is why we might need to change it to real JSON objects such as {"n":1} or {"n":"v"}
                /** @type {?} */
                var validArgs = args[0]
                    .replace(/(\')?([a-zA-Z0-9_]+)(\')?(\s)?:/g, '"$2":')
                    .replace(/:(\s)?(\')(.*?)(\')/g, ':"$3"');
                try {
                    interpolateParams = JSON.parse(validArgs);
                }
                catch (e) {
                    throw new SyntaxError("Wrong parameter in TranslatePipe. Expected a valid Object, received: " + args[0]);
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
            function (event) {
                if (_this.lastKey && event.lang === _this.translate.currentLang) {
                    _this.lastKey = null;
                    _this.updateValue(query, interpolateParams, event.translations);
                }
            }));
        }
        // subscribe to onLangChange event, in case the language changes
        if (!this.onLangChange) {
            this.onLangChange = this.translate.onLangChange.subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                if (_this.lastKey) {
                    _this.lastKey = null; // we want to make sure it doesn't return the same value until it's been updated
                    _this.updateValue(query, interpolateParams, event.translations);
                }
            }));
        }
        // subscribe to onDefaultLangChange event, in case the default language changes
        if (!this.onDefaultLangChange) {
            this.onDefaultLangChange = this.translate.onDefaultLangChange.subscribe((/**
             * @return {?}
             */
            function () {
                if (_this.lastKey) {
                    _this.lastKey = null; // we want to make sure it doesn't return the same value until it's been updated
                    _this.updateValue(query, interpolateParams);
                }
            }));
        }
        return this.value;
    };
    /**
     * Clean any existing subscription to change events
     */
    /**
     * Clean any existing subscription to change events
     * @private
     * @return {?}
     */
    TranslatePipe.prototype._dispose = /**
     * Clean any existing subscription to change events
     * @private
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    TranslatePipe.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._dispose();
    };
    TranslatePipe.decorators = [
        { type: Injectable },
        { type: Pipe, args: [{
                    name: 'translate',
                    pure: false // required to update the value when the promise is resolved
                },] }
    ];
    /** @nocollapse */
    TranslatePipe.ctorParameters = function () { return [
        { type: TranslateService },
        { type: ChangeDetectorRef }
    ]; };
    return TranslatePipe;
}());
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function TranslateModuleConfig() { }
if (false) {
    /** @type {?|undefined} */
    TranslateModuleConfig.prototype.loader;
    /** @type {?|undefined} */
    TranslateModuleConfig.prototype.compiler;
    /** @type {?|undefined} */
    TranslateModuleConfig.prototype.parser;
    /** @type {?|undefined} */
    TranslateModuleConfig.prototype.missingTranslationHandler;
    /** @type {?|undefined} */
    TranslateModuleConfig.prototype.isolate;
    /** @type {?|undefined} */
    TranslateModuleConfig.prototype.extend;
    /** @type {?|undefined} */
    TranslateModuleConfig.prototype.useDefaultLang;
    /** @type {?|undefined} */
    TranslateModuleConfig.prototype.defaultLanguage;
}
var TranslateModule = /** @class */ (function () {
    function TranslateModule() {
    }
    /**
     * Use this method in your root module to provide the TranslateService
     */
    /**
     * Use this method in your root module to provide the TranslateService
     * @param {?=} config
     * @return {?}
     */
    TranslateModule.forRoot = /**
     * Use this method in your root module to provide the TranslateService
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: TranslateModule,
            providers: [
                config.loader || { provide: TranslateLoader, useClass: TranslateFakeLoader },
                config.compiler || { provide: TranslateCompiler, useClass: TranslateFakeCompiler },
                config.parser || { provide: TranslateParser, useClass: TranslateDefaultParser },
                config.missingTranslationHandler || { provide: MissingTranslationHandler, useClass: FakeMissingTranslationHandler },
                TranslateStore,
                { provide: USE_STORE, useValue: config.isolate },
                { provide: USE_DEFAULT_LANG, useValue: config.useDefaultLang },
                { provide: USE_EXTEND, useValue: config.extend },
                { provide: DEFAULT_LANGUAGE, useValue: config.defaultLanguage },
                TranslateService
            ]
        };
    };
    /**
     * Use this method in your other (non root) modules to import the directive/pipe
     */
    /**
     * Use this method in your other (non root) modules to import the directive/pipe
     * @param {?=} config
     * @return {?}
     */
    TranslateModule.forChild = /**
     * Use this method in your other (non root) modules to import the directive/pipe
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: TranslateModule,
            providers: [
                config.loader || { provide: TranslateLoader, useClass: TranslateFakeLoader },
                config.compiler || { provide: TranslateCompiler, useClass: TranslateFakeCompiler },
                config.parser || { provide: TranslateParser, useClass: TranslateDefaultParser },
                config.missingTranslationHandler || { provide: MissingTranslationHandler, useClass: FakeMissingTranslationHandler },
                { provide: USE_STORE, useValue: config.isolate },
                { provide: USE_DEFAULT_LANG, useValue: config.useDefaultLang },
                { provide: USE_EXTEND, useValue: config.extend },
                { provide: DEFAULT_LANGUAGE, useValue: config.defaultLanguage },
                TranslateService
            ]
        };
    };
    TranslateModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        TranslatePipe,
                        TranslateDirective
                    ],
                    exports: [
                        TranslatePipe,
                        TranslateDirective
                    ]
                },] }
    ];
    return TranslateModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { DEFAULT_LANGUAGE, FakeMissingTranslationHandler, MissingTranslationHandler, TranslateCompiler, TranslateDefaultParser, TranslateDirective, TranslateFakeCompiler, TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateParser, TranslatePipe, TranslateService, TranslateStore, USE_DEFAULT_LANG, USE_EXTEND, USE_STORE };
//# sourceMappingURL=ngx-translate-core.js.map
