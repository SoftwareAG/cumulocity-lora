(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ngx-bootstrap/utils'), require('ngx-bootstrap/positioning'), require('@angular/animations'), require('rxjs/operators'), require('@angular/forms'), require('rxjs'), require('ngx-bootstrap/component-loader'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-bootstrap/typeahead', ['exports', '@angular/core', 'ngx-bootstrap/utils', 'ngx-bootstrap/positioning', '@angular/animations', 'rxjs/operators', '@angular/forms', 'rxjs', 'ngx-bootstrap/component-loader', '@angular/common'], factory) :
    (global = global || self, factory((global['ngx-bootstrap'] = global['ngx-bootstrap'] || {}, global['ngx-bootstrap'].typeahead = {}), global.ng.core, global.utils, global.positioning, global.ng.animations, global.rxjs.operators, global.ng.forms, global.rxjs, global.componentLoader, global.ng.common));
}(this, function (exports, core, utils, positioning, animations, operators, forms, rxjs, componentLoader, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /* tslint:disable */
    /** @type {?} */
    var latinMap = {
        'Á': 'A',
        'Ă': 'A',
        'Ắ': 'A',
        'Ặ': 'A',
        'Ằ': 'A',
        'Ẳ': 'A',
        'Ẵ': 'A',
        'Ǎ': 'A',
        'Â': 'A',
        'Ấ': 'A',
        'Ậ': 'A',
        'Ầ': 'A',
        'Ẩ': 'A',
        'Ẫ': 'A',
        'Ä': 'A',
        'Ǟ': 'A',
        'Ȧ': 'A',
        'Ǡ': 'A',
        'Ạ': 'A',
        'Ȁ': 'A',
        'À': 'A',
        'Ả': 'A',
        'Ȃ': 'A',
        'Ā': 'A',
        'Ą': 'A',
        'Å': 'A',
        'Ǻ': 'A',
        'Ḁ': 'A',
        'Ⱥ': 'A',
        'Ã': 'A',
        'Ꜳ': 'AA',
        'Æ': 'AE',
        'Ǽ': 'AE',
        'Ǣ': 'AE',
        'Ꜵ': 'AO',
        'Ꜷ': 'AU',
        'Ꜹ': 'AV',
        'Ꜻ': 'AV',
        'Ꜽ': 'AY',
        'Ḃ': 'B',
        'Ḅ': 'B',
        'Ɓ': 'B',
        'Ḇ': 'B',
        'Ƀ': 'B',
        'Ƃ': 'B',
        'Ć': 'C',
        'Č': 'C',
        'Ç': 'C',
        'Ḉ': 'C',
        'Ĉ': 'C',
        'Ċ': 'C',
        'Ƈ': 'C',
        'Ȼ': 'C',
        'Ď': 'D',
        'Ḑ': 'D',
        'Ḓ': 'D',
        'Ḋ': 'D',
        'Ḍ': 'D',
        'Ɗ': 'D',
        'Ḏ': 'D',
        'ǲ': 'D',
        'ǅ': 'D',
        'Đ': 'D',
        'Ƌ': 'D',
        'Ǳ': 'DZ',
        'Ǆ': 'DZ',
        'É': 'E',
        'Ĕ': 'E',
        'Ě': 'E',
        'Ȩ': 'E',
        'Ḝ': 'E',
        'Ê': 'E',
        'Ế': 'E',
        'Ệ': 'E',
        'Ề': 'E',
        'Ể': 'E',
        'Ễ': 'E',
        'Ḙ': 'E',
        'Ë': 'E',
        'Ė': 'E',
        'Ẹ': 'E',
        'Ȅ': 'E',
        'È': 'E',
        'Ẻ': 'E',
        'Ȇ': 'E',
        'Ē': 'E',
        'Ḗ': 'E',
        'Ḕ': 'E',
        'Ę': 'E',
        'Ɇ': 'E',
        'Ẽ': 'E',
        'Ḛ': 'E',
        'Ꝫ': 'ET',
        'Ḟ': 'F',
        'Ƒ': 'F',
        'Ǵ': 'G',
        'Ğ': 'G',
        'Ǧ': 'G',
        'Ģ': 'G',
        'Ĝ': 'G',
        'Ġ': 'G',
        'Ɠ': 'G',
        'Ḡ': 'G',
        'Ǥ': 'G',
        'Ḫ': 'H',
        'Ȟ': 'H',
        'Ḩ': 'H',
        'Ĥ': 'H',
        'Ⱨ': 'H',
        'Ḧ': 'H',
        'Ḣ': 'H',
        'Ḥ': 'H',
        'Ħ': 'H',
        'Í': 'I',
        'Ĭ': 'I',
        'Ǐ': 'I',
        'Î': 'I',
        'Ï': 'I',
        'Ḯ': 'I',
        'İ': 'I',
        'Ị': 'I',
        'Ȉ': 'I',
        'Ì': 'I',
        'Ỉ': 'I',
        'Ȋ': 'I',
        'Ī': 'I',
        'Į': 'I',
        'Ɨ': 'I',
        'Ĩ': 'I',
        'Ḭ': 'I',
        'Ꝺ': 'D',
        'Ꝼ': 'F',
        'Ᵹ': 'G',
        'Ꞃ': 'R',
        'Ꞅ': 'S',
        'Ꞇ': 'T',
        'Ꝭ': 'IS',
        'Ĵ': 'J',
        'Ɉ': 'J',
        'Ḱ': 'K',
        'Ǩ': 'K',
        'Ķ': 'K',
        'Ⱪ': 'K',
        'Ꝃ': 'K',
        'Ḳ': 'K',
        'Ƙ': 'K',
        'Ḵ': 'K',
        'Ꝁ': 'K',
        'Ꝅ': 'K',
        'Ĺ': 'L',
        'Ƚ': 'L',
        'Ľ': 'L',
        'Ļ': 'L',
        'Ḽ': 'L',
        'Ḷ': 'L',
        'Ḹ': 'L',
        'Ⱡ': 'L',
        'Ꝉ': 'L',
        'Ḻ': 'L',
        'Ŀ': 'L',
        'Ɫ': 'L',
        'ǈ': 'L',
        'Ł': 'L',
        'Ǉ': 'LJ',
        'Ḿ': 'M',
        'Ṁ': 'M',
        'Ṃ': 'M',
        'Ɱ': 'M',
        'Ń': 'N',
        'Ň': 'N',
        'Ņ': 'N',
        'Ṋ': 'N',
        'Ṅ': 'N',
        'Ṇ': 'N',
        'Ǹ': 'N',
        'Ɲ': 'N',
        'Ṉ': 'N',
        'Ƞ': 'N',
        'ǋ': 'N',
        'Ñ': 'N',
        'Ǌ': 'NJ',
        'Ó': 'O',
        'Ŏ': 'O',
        'Ǒ': 'O',
        'Ô': 'O',
        'Ố': 'O',
        'Ộ': 'O',
        'Ồ': 'O',
        'Ổ': 'O',
        'Ỗ': 'O',
        'Ö': 'O',
        'Ȫ': 'O',
        'Ȯ': 'O',
        'Ȱ': 'O',
        'Ọ': 'O',
        'Ő': 'O',
        'Ȍ': 'O',
        'Ò': 'O',
        'Ỏ': 'O',
        'Ơ': 'O',
        'Ớ': 'O',
        'Ợ': 'O',
        'Ờ': 'O',
        'Ở': 'O',
        'Ỡ': 'O',
        'Ȏ': 'O',
        'Ꝋ': 'O',
        'Ꝍ': 'O',
        'Ō': 'O',
        'Ṓ': 'O',
        'Ṑ': 'O',
        'Ɵ': 'O',
        'Ǫ': 'O',
        'Ǭ': 'O',
        'Ø': 'O',
        'Ǿ': 'O',
        'Õ': 'O',
        'Ṍ': 'O',
        'Ṏ': 'O',
        'Ȭ': 'O',
        'Ƣ': 'OI',
        'Ꝏ': 'OO',
        'Ɛ': 'E',
        'Ɔ': 'O',
        'Ȣ': 'OU',
        'Ṕ': 'P',
        'Ṗ': 'P',
        'Ꝓ': 'P',
        'Ƥ': 'P',
        'Ꝕ': 'P',
        'Ᵽ': 'P',
        'Ꝑ': 'P',
        'Ꝙ': 'Q',
        'Ꝗ': 'Q',
        'Ŕ': 'R',
        'Ř': 'R',
        'Ŗ': 'R',
        'Ṙ': 'R',
        'Ṛ': 'R',
        'Ṝ': 'R',
        'Ȑ': 'R',
        'Ȓ': 'R',
        'Ṟ': 'R',
        'Ɍ': 'R',
        'Ɽ': 'R',
        'Ꜿ': 'C',
        'Ǝ': 'E',
        'Ś': 'S',
        'Ṥ': 'S',
        'Š': 'S',
        'Ṧ': 'S',
        'Ş': 'S',
        'Ŝ': 'S',
        'Ș': 'S',
        'Ṡ': 'S',
        'Ṣ': 'S',
        'Ṩ': 'S',
        'Ť': 'T',
        'Ţ': 'T',
        'Ṱ': 'T',
        'Ț': 'T',
        'Ⱦ': 'T',
        'Ṫ': 'T',
        'Ṭ': 'T',
        'Ƭ': 'T',
        'Ṯ': 'T',
        'Ʈ': 'T',
        'Ŧ': 'T',
        'Ɐ': 'A',
        'Ꞁ': 'L',
        'Ɯ': 'M',
        'Ʌ': 'V',
        'Ꜩ': 'TZ',
        'Ú': 'U',
        'Ŭ': 'U',
        'Ǔ': 'U',
        'Û': 'U',
        'Ṷ': 'U',
        'Ü': 'U',
        'Ǘ': 'U',
        'Ǚ': 'U',
        'Ǜ': 'U',
        'Ǖ': 'U',
        'Ṳ': 'U',
        'Ụ': 'U',
        'Ű': 'U',
        'Ȕ': 'U',
        'Ù': 'U',
        'Ủ': 'U',
        'Ư': 'U',
        'Ứ': 'U',
        'Ự': 'U',
        'Ừ': 'U',
        'Ử': 'U',
        'Ữ': 'U',
        'Ȗ': 'U',
        'Ū': 'U',
        'Ṻ': 'U',
        'Ų': 'U',
        'Ů': 'U',
        'Ũ': 'U',
        'Ṹ': 'U',
        'Ṵ': 'U',
        'Ꝟ': 'V',
        'Ṿ': 'V',
        'Ʋ': 'V',
        'Ṽ': 'V',
        'Ꝡ': 'VY',
        'Ẃ': 'W',
        'Ŵ': 'W',
        'Ẅ': 'W',
        'Ẇ': 'W',
        'Ẉ': 'W',
        'Ẁ': 'W',
        'Ⱳ': 'W',
        'Ẍ': 'X',
        'Ẋ': 'X',
        'Ý': 'Y',
        'Ŷ': 'Y',
        'Ÿ': 'Y',
        'Ẏ': 'Y',
        'Ỵ': 'Y',
        'Ỳ': 'Y',
        'Ƴ': 'Y',
        'Ỷ': 'Y',
        'Ỿ': 'Y',
        'Ȳ': 'Y',
        'Ɏ': 'Y',
        'Ỹ': 'Y',
        'Ź': 'Z',
        'Ž': 'Z',
        'Ẑ': 'Z',
        'Ⱬ': 'Z',
        'Ż': 'Z',
        'Ẓ': 'Z',
        'Ȥ': 'Z',
        'Ẕ': 'Z',
        'Ƶ': 'Z',
        'Ĳ': 'IJ',
        'Œ': 'OE',
        'ᴀ': 'A',
        'ᴁ': 'AE',
        'ʙ': 'B',
        'ᴃ': 'B',
        'ᴄ': 'C',
        'ᴅ': 'D',
        'ᴇ': 'E',
        'ꜰ': 'F',
        'ɢ': 'G',
        'ʛ': 'G',
        'ʜ': 'H',
        'ɪ': 'I',
        'ʁ': 'R',
        'ᴊ': 'J',
        'ᴋ': 'K',
        'ʟ': 'L',
        'ᴌ': 'L',
        'ᴍ': 'M',
        'ɴ': 'N',
        'ᴏ': 'O',
        'ɶ': 'OE',
        'ᴐ': 'O',
        'ᴕ': 'OU',
        'ᴘ': 'P',
        'ʀ': 'R',
        'ᴎ': 'N',
        'ᴙ': 'R',
        'ꜱ': 'S',
        'ᴛ': 'T',
        'ⱻ': 'E',
        'ᴚ': 'R',
        'ᴜ': 'U',
        'ᴠ': 'V',
        'ᴡ': 'W',
        'ʏ': 'Y',
        'ᴢ': 'Z',
        'á': 'a',
        'ă': 'a',
        'ắ': 'a',
        'ặ': 'a',
        'ằ': 'a',
        'ẳ': 'a',
        'ẵ': 'a',
        'ǎ': 'a',
        'â': 'a',
        'ấ': 'a',
        'ậ': 'a',
        'ầ': 'a',
        'ẩ': 'a',
        'ẫ': 'a',
        'ä': 'a',
        'ǟ': 'a',
        'ȧ': 'a',
        'ǡ': 'a',
        'ạ': 'a',
        'ȁ': 'a',
        'à': 'a',
        'ả': 'a',
        'ȃ': 'a',
        'ā': 'a',
        'ą': 'a',
        'ᶏ': 'a',
        'ẚ': 'a',
        'å': 'a',
        'ǻ': 'a',
        'ḁ': 'a',
        'ⱥ': 'a',
        'ã': 'a',
        'ꜳ': 'aa',
        'æ': 'ae',
        'ǽ': 'ae',
        'ǣ': 'ae',
        'ꜵ': 'ao',
        'ꜷ': 'au',
        'ꜹ': 'av',
        'ꜻ': 'av',
        'ꜽ': 'ay',
        'ḃ': 'b',
        'ḅ': 'b',
        'ɓ': 'b',
        'ḇ': 'b',
        'ᵬ': 'b',
        'ᶀ': 'b',
        'ƀ': 'b',
        'ƃ': 'b',
        'ɵ': 'o',
        'ć': 'c',
        'č': 'c',
        'ç': 'c',
        'ḉ': 'c',
        'ĉ': 'c',
        'ɕ': 'c',
        'ċ': 'c',
        'ƈ': 'c',
        'ȼ': 'c',
        'ď': 'd',
        'ḑ': 'd',
        'ḓ': 'd',
        'ȡ': 'd',
        'ḋ': 'd',
        'ḍ': 'd',
        'ɗ': 'd',
        'ᶑ': 'd',
        'ḏ': 'd',
        'ᵭ': 'd',
        'ᶁ': 'd',
        'đ': 'd',
        'ɖ': 'd',
        'ƌ': 'd',
        'ı': 'i',
        'ȷ': 'j',
        'ɟ': 'j',
        'ʄ': 'j',
        'ǳ': 'dz',
        'ǆ': 'dz',
        'é': 'e',
        'ĕ': 'e',
        'ě': 'e',
        'ȩ': 'e',
        'ḝ': 'e',
        'ê': 'e',
        'ế': 'e',
        'ệ': 'e',
        'ề': 'e',
        'ể': 'e',
        'ễ': 'e',
        'ḙ': 'e',
        'ë': 'e',
        'ė': 'e',
        'ẹ': 'e',
        'ȅ': 'e',
        'è': 'e',
        'ẻ': 'e',
        'ȇ': 'e',
        'ē': 'e',
        'ḗ': 'e',
        'ḕ': 'e',
        'ⱸ': 'e',
        'ę': 'e',
        'ᶒ': 'e',
        'ɇ': 'e',
        'ẽ': 'e',
        'ḛ': 'e',
        'ꝫ': 'et',
        'ḟ': 'f',
        'ƒ': 'f',
        'ᵮ': 'f',
        'ᶂ': 'f',
        'ǵ': 'g',
        'ğ': 'g',
        'ǧ': 'g',
        'ģ': 'g',
        'ĝ': 'g',
        'ġ': 'g',
        'ɠ': 'g',
        'ḡ': 'g',
        'ᶃ': 'g',
        'ǥ': 'g',
        'ḫ': 'h',
        'ȟ': 'h',
        'ḩ': 'h',
        'ĥ': 'h',
        'ⱨ': 'h',
        'ḧ': 'h',
        'ḣ': 'h',
        'ḥ': 'h',
        'ɦ': 'h',
        'ẖ': 'h',
        'ħ': 'h',
        'ƕ': 'hv',
        'í': 'i',
        'ĭ': 'i',
        'ǐ': 'i',
        'î': 'i',
        'ï': 'i',
        'ḯ': 'i',
        'ị': 'i',
        'ȉ': 'i',
        'ì': 'i',
        'ỉ': 'i',
        'ȋ': 'i',
        'ī': 'i',
        'į': 'i',
        'ᶖ': 'i',
        'ɨ': 'i',
        'ĩ': 'i',
        'ḭ': 'i',
        'ꝺ': 'd',
        'ꝼ': 'f',
        'ᵹ': 'g',
        'ꞃ': 'r',
        'ꞅ': 's',
        'ꞇ': 't',
        'ꝭ': 'is',
        'ǰ': 'j',
        'ĵ': 'j',
        'ʝ': 'j',
        'ɉ': 'j',
        'ḱ': 'k',
        'ǩ': 'k',
        'ķ': 'k',
        'ⱪ': 'k',
        'ꝃ': 'k',
        'ḳ': 'k',
        'ƙ': 'k',
        'ḵ': 'k',
        'ᶄ': 'k',
        'ꝁ': 'k',
        'ꝅ': 'k',
        'ĺ': 'l',
        'ƚ': 'l',
        'ɬ': 'l',
        'ľ': 'l',
        'ļ': 'l',
        'ḽ': 'l',
        'ȴ': 'l',
        'ḷ': 'l',
        'ḹ': 'l',
        'ⱡ': 'l',
        'ꝉ': 'l',
        'ḻ': 'l',
        'ŀ': 'l',
        'ɫ': 'l',
        'ᶅ': 'l',
        'ɭ': 'l',
        'ł': 'l',
        'ǉ': 'lj',
        'ſ': 's',
        'ẜ': 's',
        'ẛ': 's',
        'ẝ': 's',
        'ḿ': 'm',
        'ṁ': 'm',
        'ṃ': 'm',
        'ɱ': 'm',
        'ᵯ': 'm',
        'ᶆ': 'm',
        'ń': 'n',
        'ň': 'n',
        'ņ': 'n',
        'ṋ': 'n',
        'ȵ': 'n',
        'ṅ': 'n',
        'ṇ': 'n',
        'ǹ': 'n',
        'ɲ': 'n',
        'ṉ': 'n',
        'ƞ': 'n',
        'ᵰ': 'n',
        'ᶇ': 'n',
        'ɳ': 'n',
        'ñ': 'n',
        'ǌ': 'nj',
        'ó': 'o',
        'ŏ': 'o',
        'ǒ': 'o',
        'ô': 'o',
        'ố': 'o',
        'ộ': 'o',
        'ồ': 'o',
        'ổ': 'o',
        'ỗ': 'o',
        'ö': 'o',
        'ȫ': 'o',
        'ȯ': 'o',
        'ȱ': 'o',
        'ọ': 'o',
        'ő': 'o',
        'ȍ': 'o',
        'ò': 'o',
        'ỏ': 'o',
        'ơ': 'o',
        'ớ': 'o',
        'ợ': 'o',
        'ờ': 'o',
        'ở': 'o',
        'ỡ': 'o',
        'ȏ': 'o',
        'ꝋ': 'o',
        'ꝍ': 'o',
        'ⱺ': 'o',
        'ō': 'o',
        'ṓ': 'o',
        'ṑ': 'o',
        'ǫ': 'o',
        'ǭ': 'o',
        'ø': 'o',
        'ǿ': 'o',
        'õ': 'o',
        'ṍ': 'o',
        'ṏ': 'o',
        'ȭ': 'o',
        'ƣ': 'oi',
        'ꝏ': 'oo',
        'ɛ': 'e',
        'ᶓ': 'e',
        'ɔ': 'o',
        'ᶗ': 'o',
        'ȣ': 'ou',
        'ṕ': 'p',
        'ṗ': 'p',
        'ꝓ': 'p',
        'ƥ': 'p',
        'ᵱ': 'p',
        'ᶈ': 'p',
        'ꝕ': 'p',
        'ᵽ': 'p',
        'ꝑ': 'p',
        'ꝙ': 'q',
        'ʠ': 'q',
        'ɋ': 'q',
        'ꝗ': 'q',
        'ŕ': 'r',
        'ř': 'r',
        'ŗ': 'r',
        'ṙ': 'r',
        'ṛ': 'r',
        'ṝ': 'r',
        'ȑ': 'r',
        'ɾ': 'r',
        'ᵳ': 'r',
        'ȓ': 'r',
        'ṟ': 'r',
        'ɼ': 'r',
        'ᵲ': 'r',
        'ᶉ': 'r',
        'ɍ': 'r',
        'ɽ': 'r',
        'ↄ': 'c',
        'ꜿ': 'c',
        'ɘ': 'e',
        'ɿ': 'r',
        'ś': 's',
        'ṥ': 's',
        'š': 's',
        'ṧ': 's',
        'ş': 's',
        'ŝ': 's',
        'ș': 's',
        'ṡ': 's',
        'ṣ': 's',
        'ṩ': 's',
        'ʂ': 's',
        'ᵴ': 's',
        'ᶊ': 's',
        'ȿ': 's',
        'ɡ': 'g',
        'ᴑ': 'o',
        'ᴓ': 'o',
        'ᴝ': 'u',
        'ť': 't',
        'ţ': 't',
        'ṱ': 't',
        'ț': 't',
        'ȶ': 't',
        'ẗ': 't',
        'ⱦ': 't',
        'ṫ': 't',
        'ṭ': 't',
        'ƭ': 't',
        'ṯ': 't',
        'ᵵ': 't',
        'ƫ': 't',
        'ʈ': 't',
        'ŧ': 't',
        'ᵺ': 'th',
        'ɐ': 'a',
        'ᴂ': 'ae',
        'ǝ': 'e',
        'ᵷ': 'g',
        'ɥ': 'h',
        'ʮ': 'h',
        'ʯ': 'h',
        'ᴉ': 'i',
        'ʞ': 'k',
        'ꞁ': 'l',
        'ɯ': 'm',
        'ɰ': 'm',
        'ᴔ': 'oe',
        'ɹ': 'r',
        'ɻ': 'r',
        'ɺ': 'r',
        'ⱹ': 'r',
        'ʇ': 't',
        'ʌ': 'v',
        'ʍ': 'w',
        'ʎ': 'y',
        'ꜩ': 'tz',
        'ú': 'u',
        'ŭ': 'u',
        'ǔ': 'u',
        'û': 'u',
        'ṷ': 'u',
        'ü': 'u',
        'ǘ': 'u',
        'ǚ': 'u',
        'ǜ': 'u',
        'ǖ': 'u',
        'ṳ': 'u',
        'ụ': 'u',
        'ű': 'u',
        'ȕ': 'u',
        'ù': 'u',
        'ủ': 'u',
        'ư': 'u',
        'ứ': 'u',
        'ự': 'u',
        'ừ': 'u',
        'ử': 'u',
        'ữ': 'u',
        'ȗ': 'u',
        'ū': 'u',
        'ṻ': 'u',
        'ų': 'u',
        'ᶙ': 'u',
        'ů': 'u',
        'ũ': 'u',
        'ṹ': 'u',
        'ṵ': 'u',
        'ᵫ': 'ue',
        'ꝸ': 'um',
        'ⱴ': 'v',
        'ꝟ': 'v',
        'ṿ': 'v',
        'ʋ': 'v',
        'ᶌ': 'v',
        'ⱱ': 'v',
        'ṽ': 'v',
        'ꝡ': 'vy',
        'ẃ': 'w',
        'ŵ': 'w',
        'ẅ': 'w',
        'ẇ': 'w',
        'ẉ': 'w',
        'ẁ': 'w',
        'ⱳ': 'w',
        'ẘ': 'w',
        'ẍ': 'x',
        'ẋ': 'x',
        'ᶍ': 'x',
        'ý': 'y',
        'ŷ': 'y',
        'ÿ': 'y',
        'ẏ': 'y',
        'ỵ': 'y',
        'ỳ': 'y',
        'ƴ': 'y',
        'ỷ': 'y',
        'ỿ': 'y',
        'ȳ': 'y',
        'ẙ': 'y',
        'ɏ': 'y',
        'ỹ': 'y',
        'ź': 'z',
        'ž': 'z',
        'ẑ': 'z',
        'ʑ': 'z',
        'ⱬ': 'z',
        'ż': 'z',
        'ẓ': 'z',
        'ȥ': 'z',
        'ẕ': 'z',
        'ᵶ': 'z',
        'ᶎ': 'z',
        'ʐ': 'z',
        'ƶ': 'z',
        'ɀ': 'z',
        'ﬀ': 'ff',
        'ﬃ': 'ffi',
        'ﬄ': 'ffl',
        'ﬁ': 'fi',
        'ﬂ': 'fl',
        'ĳ': 'ij',
        'œ': 'oe',
        'ﬆ': 'st',
        'ₐ': 'a',
        'ₑ': 'e',
        'ᵢ': 'i',
        'ⱼ': 'j',
        'ₒ': 'o',
        'ᵣ': 'r',
        'ᵤ': 'u',
        'ᵥ': 'v',
        'ₓ': 'x'
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TypeaheadOptions = /** @class */ (function () {
        function TypeaheadOptions(options) {
            Object.assign(this, options);
        }
        return TypeaheadOptions;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TypeaheadMatch = /** @class */ (function () {
        // tslint:disable-next-line:no-any
        function TypeaheadMatch(item, value, header) {
            if (value === void 0) { value = item; }
            if (header === void 0) { header = false; }
            this.item = item;
            this.value = value;
            this.header = header;
        }
        /**
         * @return {?}
         */
        TypeaheadMatch.prototype.isHeader = /**
         * @return {?}
         */
        function () {
            return this.header;
        };
        /**
         * @return {?}
         */
        TypeaheadMatch.prototype.toString = /**
         * @return {?}
         */
        function () {
            return this.value;
        };
        return TypeaheadMatch;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} str
     * @return {?}
     */
    function latinize(str) {
        if (!str) {
            return '';
        }
        return str.replace(/[^A-Za-z0-9\[\] ]/g, (/**
         * @param {?} a
         * @return {?}
         */
        function (a) {
            return latinMap[a] || a;
        }));
    }
    /**
     * @param {?} queryToEscape
     * @return {?}
     */
    function escapeRegexp(queryToEscape) {
        // Regex: capture the whole query string and replace it with the string
        // that will be used to match the results, for example if the capture is
        // 'a' the result will be \a
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }
    /* tslint:disable */
    /**
     * @param {?} str
     * @param {?=} wordRegexDelimiters
     * @param {?=} phraseRegexDelimiters
     * @return {?}
     */
    function tokenize(str, wordRegexDelimiters, phraseRegexDelimiters) {
        if (wordRegexDelimiters === void 0) { wordRegexDelimiters = ' '; }
        if (phraseRegexDelimiters === void 0) { phraseRegexDelimiters = ''; }
        /* tslint:enable */
        /** @type {?} */
        var regexStr = "(?:[" + phraseRegexDelimiters + "])([^" + phraseRegexDelimiters + "]+)" +
            ("(?:[" + phraseRegexDelimiters + "])|([^" + wordRegexDelimiters + "]+)");
        /** @type {?} */
        var preTokenized = str.split(new RegExp(regexStr, 'g'));
        /** @type {?} */
        var result = [];
        /** @type {?} */
        var preTokenizedLength = preTokenized.length;
        /** @type {?} */
        var token;
        /** @type {?} */
        var replacePhraseDelimiters = new RegExp("[" + phraseRegexDelimiters + "]+", 'g');
        for (var i = 0; i < preTokenizedLength; i += 1) {
            token = preTokenized[i];
            if (token && token.length && token !== wordRegexDelimiters) {
                result.push(token.replace(replacePhraseDelimiters, ''));
            }
        }
        return result;
    }
    // tslint:disable-next-line:no-any
    /**
     * @param {?} object
     * @param {?} option
     * @return {?}
     */
    function getValueFromObject(object, option) {
        var e_1, _a;
        if (!option || typeof object !== 'object') {
            return object.toString();
        }
        if (option.endsWith('()')) {
            /** @type {?} */
            var functionName = option.slice(0, option.length - 2);
            return object[functionName]().toString();
        }
        /** @type {?} */
        var properties = option
            .replace(/\[(\w+)\]/g, '.$1')
            .replace(/^\./, '');
        /** @type {?} */
        var propertiesArray = properties.split('.');
        try {
            for (var propertiesArray_1 = __values(propertiesArray), propertiesArray_1_1 = propertiesArray_1.next(); !propertiesArray_1_1.done; propertiesArray_1_1 = propertiesArray_1.next()) {
                var property = propertiesArray_1_1.value;
                if (property in object) {
                    // tslint:disable-next-line
                    object = object[property];
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (propertiesArray_1_1 && !propertiesArray_1_1.done && (_a = propertiesArray_1.return)) _a.call(propertiesArray_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (!object) {
            return '';
        }
        return object.toString();
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var TYPEAHEAD_ANIMATION_TIMING = '220ms cubic-bezier(0, 0, 0.2, 1)';
    /** @type {?} */
    var typeaheadAnimation = animations.trigger('typeaheadAnimation', [
        animations.state('animated-down', animations.style({ height: '*', overflow: 'hidden' })),
        animations.transition('* => animated-down', [
            animations.style({ height: 0, overflow: 'hidden' }),
            animations.animate(TYPEAHEAD_ANIMATION_TIMING)
        ]),
        animations.state('animated-up', animations.style({ height: '*', overflow: 'hidden' })),
        animations.transition('* => animated-up', [
            animations.style({ height: '*', overflow: 'hidden' }),
            animations.animate(TYPEAHEAD_ANIMATION_TIMING)
        ]),
        animations.transition('* => unanimated', animations.animate('0s'))
    ]);

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TypeaheadContainerComponent = /** @class */ (function () {
        function TypeaheadContainerComponent(positionService, renderer, element) {
            this.positionService = positionService;
            this.renderer = renderer;
            this.element = element;
            this.isFocused = false;
            this.visibility = 'hidden';
            this.height = 0;
            this._matches = [];
            this.isScrolledIntoView = (/**
             * @param {?} elem
             * @return {?}
             */
            function (elem) {
                /** @type {?} */
                var containerViewTop = this.ulElement.nativeElement.scrollTop;
                /** @type {?} */
                var containerViewBottom = containerViewTop + Number(this.ulElement.nativeElement.offsetHeight);
                /** @type {?} */
                var elemTop = elem.offsetTop;
                /** @type {?} */
                var elemBottom = elemTop + elem.offsetHeight;
                return ((elemBottom <= containerViewBottom) && (elemTop >= containerViewTop));
            });
        }
        Object.defineProperty(TypeaheadContainerComponent.prototype, "isBs4", {
            get: /**
             * @return {?}
             */
            function () {
                return !utils.isBs3();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TypeaheadContainerComponent.prototype, "active", {
            get: /**
             * @return {?}
             */
            function () {
                return this._active;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TypeaheadContainerComponent.prototype, "matches", {
            get: /**
             * @return {?}
             */
            function () {
                return this._matches;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                var _this = this;
                this.positionService.setOptions({
                    modifiers: { flip: { enabled: this.adaptivePosition } },
                    allowedPositions: ['top', 'bottom']
                });
                this.positionService.event$
                    .pipe(operators.take(1))
                    .subscribe((/**
                 * @return {?}
                 */
                function () {
                    _this.positionService.disable();
                    _this.visibility = _this.typeaheadScrollable ? 'hidden' : 'visible';
                    if (_this.isAnimated) {
                        _this.animationState = _this.isTopPosition ? 'animated-up' : 'animated-down';
                        return;
                    }
                    _this.animationState = 'unanimated';
                }));
                this._matches = value;
                this.needScrollbar = this.typeaheadScrollable && this.typeaheadOptionsInScrollableView < this.matches.length;
                if (this.typeaheadScrollable) {
                    setTimeout((/**
                     * @return {?}
                     */
                    function () {
                        _this.setScrollableMode();
                    }));
                }
                if (this.typeaheadIsFirstItemActive && this._matches.length > 0) {
                    this._active = this._matches[0];
                    if (this._active.isHeader()) {
                        this.nextActiveMatch();
                    }
                }
                if (this._active && !this.typeaheadIsFirstItemActive) {
                    /** @type {?} */
                    var concurrency = this._matches.find((/**
                     * @param {?} match
                     * @return {?}
                     */
                    function (match) { return match.value === _this._active.value; }));
                    if (concurrency) {
                        this.selectActive(concurrency);
                        return;
                    }
                    this._active = null;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TypeaheadContainerComponent.prototype, "isTopPosition", {
            get: /**
             * @return {?}
             */
            function () {
                return this.element.nativeElement.classList.contains('top');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TypeaheadContainerComponent.prototype, "optionsListTemplate", {
            // tslint:disable-next-line:no-any
            get: 
            // tslint:disable-next-line:no-any
            /**
             * @return {?}
             */
            function () {
                return this.parent ? this.parent.optionsListTemplate : undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TypeaheadContainerComponent.prototype, "isAnimated", {
            get: /**
             * @return {?}
             */
            function () {
                return this.parent ? this.parent.isAnimated : false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TypeaheadContainerComponent.prototype, "adaptivePosition", {
            get: /**
             * @return {?}
             */
            function () {
                return this.parent ? this.parent.adaptivePosition : false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TypeaheadContainerComponent.prototype, "typeaheadScrollable", {
            get: /**
             * @return {?}
             */
            function () {
                return this.parent ? this.parent.typeaheadScrollable : false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TypeaheadContainerComponent.prototype, "typeaheadOptionsInScrollableView", {
            get: /**
             * @return {?}
             */
            function () {
                return this.parent ? this.parent.typeaheadOptionsInScrollableView : 5;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TypeaheadContainerComponent.prototype, "typeaheadIsFirstItemActive", {
            get: /**
             * @return {?}
             */
            function () {
                return this.parent ? this.parent.typeaheadIsFirstItemActive : true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TypeaheadContainerComponent.prototype, "itemTemplate", {
            // tslint:disable-next-line:no-any
            get: 
            // tslint:disable-next-line:no-any
            /**
             * @return {?}
             */
            function () {
                return this.parent ? this.parent.typeaheadItemTemplate : undefined;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?=} isActiveItemChanged
         * @return {?}
         */
        TypeaheadContainerComponent.prototype.selectActiveMatch = /**
         * @param {?=} isActiveItemChanged
         * @return {?}
         */
        function (isActiveItemChanged) {
            if (this._active && this.parent.typeaheadSelectFirstItem) {
                this.selectMatch(this._active);
            }
            if (!this.parent.typeaheadSelectFirstItem && isActiveItemChanged) {
                this.selectMatch(this._active);
            }
        };
        /**
         * @return {?}
         */
        TypeaheadContainerComponent.prototype.positionServiceEnable = /**
         * @return {?}
         */
        function () {
            this.positionService.enable();
        };
        /**
         * @return {?}
         */
        TypeaheadContainerComponent.prototype.prevActiveMatch = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var index = this.matches.indexOf(this._active);
            this._active = this.matches[index - 1 < 0 ? this.matches.length - 1 : index - 1];
            if (this._active.isHeader()) {
                this.prevActiveMatch();
            }
            if (this.typeaheadScrollable) {
                this.scrollPrevious(index);
            }
        };
        /**
         * @return {?}
         */
        TypeaheadContainerComponent.prototype.nextActiveMatch = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var index = this.matches.indexOf(this._active);
            this._active = this.matches[index + 1 > this.matches.length - 1 ? 0 : index + 1];
            if (this._active.isHeader()) {
                this.nextActiveMatch();
            }
            if (this.typeaheadScrollable) {
                this.scrollNext(index);
            }
        };
        /**
         * @param {?} value
         * @return {?}
         */
        TypeaheadContainerComponent.prototype.selectActive = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.isFocused = true;
            this._active = value;
        };
        /**
         * @param {?} match
         * @param {?} query
         * @return {?}
         */
        TypeaheadContainerComponent.prototype.highlight = /**
         * @param {?} match
         * @param {?} query
         * @return {?}
         */
        function (match, query) {
            /** @type {?} */
            var itemStr = match.value;
            /** @type {?} */
            var itemStrHelper = (this.parent && this.parent.typeaheadLatinize
                ? latinize(itemStr)
                : itemStr).toLowerCase();
            /** @type {?} */
            var startIdx;
            /** @type {?} */
            var tokenLen;
            // Replaces the capture string with the same string inside of a "strong" tag
            if (typeof query === 'object') {
                /** @type {?} */
                var queryLen = query.length;
                for (var i = 0; i < queryLen; i += 1) {
                    // query[i] is already latinized and lower case
                    startIdx = itemStrHelper.indexOf(query[i]);
                    tokenLen = query[i].length;
                    if (startIdx >= 0 && tokenLen > 0) {
                        itemStr =
                            itemStr.substring(0, startIdx) + "<strong>" + itemStr.substring(startIdx, startIdx + tokenLen) + "</strong>" +
                                ("" + itemStr.substring(startIdx + tokenLen));
                        itemStrHelper =
                            itemStrHelper.substring(0, startIdx) + "        " + ' '.repeat(tokenLen) + "         " +
                                ("" + itemStrHelper.substring(startIdx + tokenLen));
                    }
                }
            }
            else if (query) {
                // query is already latinized and lower case
                startIdx = itemStrHelper.indexOf(query);
                tokenLen = query.length;
                if (startIdx >= 0 && tokenLen > 0) {
                    itemStr =
                        itemStr.substring(0, startIdx) + "<strong>" + itemStr.substring(startIdx, startIdx + tokenLen) + "</strong>" +
                            ("" + itemStr.substring(startIdx + tokenLen));
                }
            }
            return itemStr;
        };
        /**
         * @return {?}
         */
        TypeaheadContainerComponent.prototype.focusLost = /**
         * @return {?}
         */
        function () {
            this.isFocused = false;
        };
        /**
         * @param {?} value
         * @return {?}
         */
        TypeaheadContainerComponent.prototype.isActive = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return this._active === value;
        };
        /**
         * @param {?} value
         * @param {?=} e
         * @return {?}
         */
        TypeaheadContainerComponent.prototype.selectMatch = /**
         * @param {?} value
         * @param {?=} e
         * @return {?}
         */
        function (value, e) {
            var _this = this;
            if (e === void 0) { e = void 0; }
            if (e) {
                e.stopPropagation();
                e.preventDefault();
            }
            this.parent.changeModel(value);
            setTimeout((/**
             * @return {?}
             */
            function () { return _this.parent.typeaheadOnSelect.emit(value); }), 0);
            return false;
        };
        /**
         * @return {?}
         */
        TypeaheadContainerComponent.prototype.setScrollableMode = /**
         * @return {?}
         */
        function () {
            if (!this.ulElement) {
                this.ulElement = this.element;
            }
            if (this.liElements.first) {
                /** @type {?} */
                var ulStyles = utils.Utils.getStyles(this.ulElement.nativeElement);
                /** @type {?} */
                var liStyles = utils.Utils.getStyles(this.liElements.first.nativeElement);
                /** @type {?} */
                var ulPaddingBottom = parseFloat((ulStyles['padding-bottom'] ? ulStyles['padding-bottom'] : '')
                    .replace('px', ''));
                /** @type {?} */
                var ulPaddingTop = parseFloat((ulStyles['padding-top'] ? ulStyles['padding-top'] : '0')
                    .replace('px', ''));
                /** @type {?} */
                var optionHeight = parseFloat((liStyles.height ? liStyles.height : '0')
                    .replace('px', ''));
                /** @type {?} */
                var height = this.typeaheadOptionsInScrollableView * optionHeight;
                this.guiHeight = height + ulPaddingTop + ulPaddingBottom + "px";
            }
            this.renderer.setStyle(this.element.nativeElement, 'visibility', 'visible');
        };
        /**
         * @param {?} index
         * @return {?}
         */
        TypeaheadContainerComponent.prototype.scrollPrevious = /**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            if (index === 0) {
                this.scrollToBottom();
                return;
            }
            if (this.liElements) {
                /** @type {?} */
                var liElement = this.liElements.toArray()[index - 1];
                if (liElement && !this.isScrolledIntoView(liElement.nativeElement)) {
                    this.ulElement.nativeElement.scrollTop = liElement.nativeElement.offsetTop;
                }
            }
        };
        /**
         * @param {?} index
         * @return {?}
         */
        TypeaheadContainerComponent.prototype.scrollNext = /**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            if (index + 1 > this.matches.length - 1) {
                this.scrollToTop();
                return;
            }
            if (this.liElements) {
                /** @type {?} */
                var liElement = this.liElements.toArray()[index + 1];
                if (liElement && !this.isScrolledIntoView(liElement.nativeElement)) {
                    this.ulElement.nativeElement.scrollTop =
                        liElement.nativeElement.offsetTop -
                            Number(this.ulElement.nativeElement.offsetHeight) +
                            Number(liElement.nativeElement.offsetHeight);
                }
            }
        };
        /**
         * @private
         * @return {?}
         */
        TypeaheadContainerComponent.prototype.scrollToBottom = /**
         * @private
         * @return {?}
         */
        function () {
            this.ulElement.nativeElement.scrollTop = this.ulElement.nativeElement.scrollHeight;
        };
        /**
         * @private
         * @return {?}
         */
        TypeaheadContainerComponent.prototype.scrollToTop = /**
         * @private
         * @return {?}
         */
        function () {
            this.ulElement.nativeElement.scrollTop = 0;
        };
        TypeaheadContainerComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'typeahead-container',
                        template: "<!-- inject options list template -->\n<ng-template [ngTemplateOutlet]=\"optionsListTemplate || (isBs4 ? bs4Template : bs3Template)\"\n             [ngTemplateOutletContext]=\"{matches:matches, itemTemplate:itemTemplate, query:query}\"></ng-template>\n\n<!-- default options item template -->\n<ng-template #bsItemTemplate let-match=\"match\" let-query=\"query\"><span [innerHtml]=\"highlight(match, query)\"></span>\n</ng-template>\n\n<!-- Bootstrap 3 options list template -->\n<ng-template #bs3Template>\n  <ul class=\"dropdown-menu\"\n      #ulElement\n      [style.overflow-y]=\"needScrollbar ? 'scroll': 'auto'\"\n      [style.height]=\"needScrollbar ? guiHeight: 'auto'\">\n    <ng-template ngFor let-match let-i=\"index\" [ngForOf]=\"matches\">\n      <li #liElements *ngIf=\"match.isHeader()\" class=\"dropdown-header\">{{ match }}</li>\n      <li #liElements\n          *ngIf=\"!match.isHeader()\"\n          [@typeaheadAnimation]=\"animationState\"\n          (@typeaheadAnimation.done)=\"positionServiceEnable()\"\n          [class.active]=\"isActive(match)\"\n          (mouseenter)=\"selectActive(match)\">\n\n        <a href=\"#\" (click)=\"selectMatch(match, $event)\" tabindex=\"-1\">\n          <ng-template [ngTemplateOutlet]=\"itemTemplate || bsItemTemplate\"\n                       [ngTemplateOutletContext]=\"{item:match.item, index:i, match:match, query:query}\"></ng-template>\n        </a>\n      </li>\n    </ng-template>\n  </ul>\n</ng-template>\n\n<!-- Bootstrap 4 options list template -->\n<ng-template #bs4Template>\n  <ng-template ngFor let-match let-i=\"index\" [ngForOf]=\"matches\">\n    <h6 *ngIf=\"match.isHeader()\" class=\"dropdown-header\">{{ match }}</h6>\n    <ng-template [ngIf]=\"!match.isHeader()\">\n      <button #liElements\n              [@typeaheadAnimation]=\"animationState\"\n              (@typeaheadAnimation.done)=\"positionServiceEnable()\"\n              class=\"dropdown-item\"\n              (click)=\"selectMatch(match, $event)\"\n              (mouseenter)=\"selectActive(match)\"\n              [class.active]=\"isActive(match)\">\n        <ng-template [ngTemplateOutlet]=\"itemTemplate || bsItemTemplate\"\n                     [ngTemplateOutletContext]=\"{item:match.item, index:i, match:match, query:query}\"></ng-template>\n      </button>\n    </ng-template>\n  </ng-template>\n</ng-template>\n",
                        host: {
                            class: 'dropdown open bottom',
                            '[class.dropdown-menu]': 'isBs4',
                            '[style.overflow-y]': "isBs4 && needScrollbar ? 'scroll': 'visible'",
                            '[style.height]': "isBs4 && needScrollbar ? guiHeight: 'auto'",
                            '[style.visibility]': "visibility",
                            '[class.dropup]': 'dropup',
                            style: 'position: absolute;display: block;'
                        },
                        animations: [typeaheadAnimation],
                        styles: ["\n    :host.dropdown {\n      z-index: 1000;\n    }\n  "]
                    }] }
        ];
        /** @nocollapse */
        TypeaheadContainerComponent.ctorParameters = function () { return [
            { type: positioning.PositioningService },
            { type: core.Renderer2 },
            { type: core.ElementRef }
        ]; };
        TypeaheadContainerComponent.propDecorators = {
            ulElement: [{ type: core.ViewChild, args: ['ulElement', { static: false },] }],
            liElements: [{ type: core.ViewChildren, args: ['liElements',] }],
            focusLost: [{ type: core.HostListener, args: ['mouseleave',] }, { type: core.HostListener, args: ['blur',] }]
        };
        return TypeaheadContainerComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
            { type: core.Injectable }
        ];
        return TypeaheadConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TypeaheadDirective = /** @class */ (function () {
        function TypeaheadDirective(cis, config, changeDetection, element, ngControl, renderer, viewContainerRef) {
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
            this.typeaheadLoading = new core.EventEmitter();
            /**
             * fired on every key event and returns true
             * in case of matches are not detected
             */
            this.typeaheadNoResults = new core.EventEmitter();
            /**
             * fired when option was selected, return object with data of this option
             */
            this.typeaheadOnSelect = new core.EventEmitter();
            /**
             * fired when blur event occurs. returns the active item
             */
            // tslint:disable-next-line:no-any
            this.typeaheadOnBlur = new core.EventEmitter();
            /**
             * This attribute indicates that the dropdown should be opened upwards
             */
            this.dropup = false;
            this.isActiveItemChanged = false;
            this.isTypeaheadOptionsListActive = false;
            // tslint:disable-next-line:no-any
            this.keyUpEventEmitter = new core.EventEmitter();
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
        TypeaheadDirective.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.typeaheadOptionsLimit = this.typeaheadOptionsLimit || 20;
            this.typeaheadMinLength =
                this.typeaheadMinLength === void 0 ? 1 : this.typeaheadMinLength;
            this.typeaheadWaitMs = this.typeaheadWaitMs || 0;
            // async should be false in case of array
            if (this.typeaheadAsync === undefined &&
                !(rxjs.isObservable(this.typeahead))) {
                this.typeaheadAsync = false;
            }
            if (rxjs.isObservable(this.typeahead)) {
                this.typeaheadAsync = true;
            }
            if (this.typeaheadAsync) {
                this.asyncActions();
            }
            else {
                this.syncActions();
            }
        };
        /**
         * @param {?} e
         * @return {?}
         */
        // tslint:disable-next-line:no-any
        TypeaheadDirective.prototype.onInput = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            // For `<input>`s, use the `value` property. For others that don't have a
            // `value` (such as `<span contenteditable="true">`), use either
            // `textContent` or `innerText` (depending on which one is supported, i.e.
            // Firefox or IE).
            /** @type {?} */
            var value = e.target.value !== undefined
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
        };
        /**
         * @param {?} event
         * @return {?}
         */
        TypeaheadDirective.prototype.onChange = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
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
        };
        /**
         * @return {?}
         */
        TypeaheadDirective.prototype.onFocus = /**
         * @return {?}
         */
        function () {
            if (this.typeaheadMinLength === 0) {
                this.typeaheadLoading.emit(true);
                this.keyUpEventEmitter.emit(this.element.nativeElement.value || '');
            }
        };
        /**
         * @return {?}
         */
        TypeaheadDirective.prototype.onBlur = /**
         * @return {?}
         */
        function () {
            if (this._container && !this._container.isFocused) {
                this.typeaheadOnBlur.emit(this._container.active);
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        TypeaheadDirective.prototype.onKeydown = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
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
        };
        /**
         * @param {?} match
         * @return {?}
         */
        TypeaheadDirective.prototype.changeModel = /**
         * @param {?} match
         * @return {?}
         */
        function (match) {
            /** @type {?} */
            var valueStr = match.value;
            this.ngControl.viewToModelUpdate(valueStr);
            (this.ngControl.control).setValue(valueStr);
            this.changeDetection.markForCheck();
            this.hide();
        };
        Object.defineProperty(TypeaheadDirective.prototype, "matches", {
            get: /**
             * @return {?}
             */
            function () {
                return this._matches;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        TypeaheadDirective.prototype.show = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this._typeahead
                .attach(TypeaheadContainerComponent)
                // todo: add append to body, after updating positioning service
                .to(this.container)
                .position({ attachment: (this.dropup ? 'top' : 'bottom') + " start" })
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
            function (e) {
                if (_this.typeaheadMinLength === 0 && _this.element.nativeElement.contains(e.target)) {
                    return undefined;
                }
                if (!_this.typeaheadHideResultsOnBlur || _this.element.nativeElement.contains(e.target)) {
                    return undefined;
                }
                _this.onOutsideClick();
            }));
            this._container = this._typeahead.instance;
            this._container.parent = this;
            // This improves the speed as it won't have to be done for each list item
            /** @type {?} */
            var normalizedQuery = (this.typeaheadLatinize
                ? latinize(this.ngControl.control.value)
                : this.ngControl.control.value)
                .toString()
                .toLowerCase();
            this._container.query = this.typeaheadSingleWords
                ? tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters)
                : normalizedQuery;
            this._container.matches = this._matches;
            this.element.nativeElement.focus();
        };
        /**
         * @return {?}
         */
        TypeaheadDirective.prototype.hide = /**
         * @return {?}
         */
        function () {
            if (this._typeahead.isShown) {
                this._typeahead.hide();
                this._outsideClickListener();
                this._container = null;
            }
        };
        /**
         * @return {?}
         */
        TypeaheadDirective.prototype.onOutsideClick = /**
         * @return {?}
         */
        function () {
            if (this._container && !this._container.isFocused) {
                this.hide();
            }
        };
        /**
         * @return {?}
         */
        TypeaheadDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            var e_1, _a;
            try {
                // clean up subscriptions
                for (var _b = __values(this._subscriptions), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var sub = _c.value;
                    sub.unsubscribe();
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this._typeahead.dispose();
        };
        /**
         * @protected
         * @return {?}
         */
        TypeaheadDirective.prototype.asyncActions = /**
         * @protected
         * @return {?}
         */
        function () {
            var _this = this;
            this._subscriptions.push(this.keyUpEventEmitter
                .pipe(operators.debounceTime(this.typeaheadWaitMs), operators.switchMap((/**
             * @return {?}
             */
            function () { return _this.typeahead; })))
                .subscribe((/**
             * @param {?} matches
             * @return {?}
             */
            function (matches) {
                _this.finalizeAsyncCall(matches);
            })));
        };
        /**
         * @protected
         * @return {?}
         */
        TypeaheadDirective.prototype.syncActions = /**
         * @protected
         * @return {?}
         */
        function () {
            var _this = this;
            this._subscriptions.push(this.keyUpEventEmitter
                .pipe(operators.debounceTime(this.typeaheadWaitMs), operators.mergeMap((/**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                /** @type {?} */
                var normalizedQuery = _this.normalizeQuery(value);
                return rxjs.from(_this.typeahead)
                    .pipe(operators.filter((/**
                 * @param {?} option
                 * @return {?}
                 */
                function (option) {
                    return (option &&
                        _this.testMatch(_this.normalizeOption(option), normalizedQuery));
                })), operators.toArray());
            })))
                .subscribe((/**
             * @param {?} matches
             * @return {?}
             */
            function (matches) {
                _this.finalizeAsyncCall(matches);
            })));
        };
        // tslint:disable-next-line:no-any
        // tslint:disable-next-line:no-any
        /**
         * @protected
         * @param {?} option
         * @return {?}
         */
        TypeaheadDirective.prototype.normalizeOption = 
        // tslint:disable-next-line:no-any
        /**
         * @protected
         * @param {?} option
         * @return {?}
         */
        function (option) {
            /** @type {?} */
            var optionValue = getValueFromObject(option, this.typeaheadOptionField);
            /** @type {?} */
            var normalizedOption = this.typeaheadLatinize
                ? latinize(optionValue)
                : optionValue;
            return normalizedOption.toLowerCase();
        };
        /**
         * @protected
         * @param {?} value
         * @return {?}
         */
        TypeaheadDirective.prototype.normalizeQuery = /**
         * @protected
         * @param {?} value
         * @return {?}
         */
        function (value) {
            // If singleWords, break model here to not be doing extra work on each
            // iteration
            /** @type {?} */
            var normalizedQuery = (this.typeaheadLatinize
                ? latinize(value)
                : value)
                .toString()
                .toLowerCase();
            normalizedQuery = this.typeaheadSingleWords
                ? tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters)
                : normalizedQuery;
            return normalizedQuery;
        };
        /**
         * @protected
         * @param {?} match
         * @param {?} test
         * @return {?}
         */
        TypeaheadDirective.prototype.testMatch = /**
         * @protected
         * @param {?} match
         * @param {?} test
         * @return {?}
         */
        function (match, test) {
            /** @type {?} */
            var spaceLength;
            if (typeof test === 'object') {
                spaceLength = test.length;
                for (var i = 0; i < spaceLength; i += 1) {
                    if (test[i].length > 0 && match.indexOf(test[i]) < 0) {
                        return false;
                    }
                }
                return true;
            }
            return match.indexOf(test) >= 0;
        };
        /**
         * @protected
         * @param {?} matches
         * @return {?}
         */
        TypeaheadDirective.prototype.finalizeAsyncCall = /**
         * @protected
         * @param {?} matches
         * @return {?}
         */
        function (matches) {
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
                var _controlValue = (this.typeaheadLatinize
                    ? latinize(this.ngControl.control.value)
                    : this.ngControl.control.value) || '';
                // This improves the speed as it won't have to be done for each list item
                /** @type {?} */
                var normalizedQuery = _controlValue.toString().toLowerCase();
                this._container.query = this.typeaheadSingleWords
                    ? tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters)
                    : normalizedQuery;
                this._container.matches = this._matches;
            }
            else {
                this.show();
            }
        };
        /**
         * @protected
         * @param {?} options
         * @return {?}
         */
        TypeaheadDirective.prototype.prepareMatches = /**
         * @protected
         * @param {?} options
         * @return {?}
         */
        function (options) {
            var _this = this;
            /** @type {?} */
            var limited = options.slice(0, this.typeaheadOptionsLimit);
            if (this.typeaheadGroupField) {
                /** @type {?} */
                var matches_1 = [];
                // extract all group names
                /** @type {?} */
                var groups = limited
                    .map((/**
                 * @param {?} option
                 * @return {?}
                 */
                function (option) {
                    return getValueFromObject(option, _this.typeaheadGroupField);
                }))
                    .filter((/**
                 * @param {?} v
                 * @param {?} i
                 * @param {?} a
                 * @return {?}
                 */
                function (v, i, a) { return a.indexOf(v) === i; }));
                groups.forEach((/**
                 * @param {?} group
                 * @return {?}
                 */
                function (group) {
                    // add group header to array of matches
                    matches_1.push(new TypeaheadMatch(group, group, true));
                    // add each item of group to array of matches
                    matches_1 = matches_1.concat(limited
                        .filter((
                    // tslint:disable-next-line:no-any
                    // tslint:disable-next-line:no-any
                    /**
                     * @param {?} option
                     * @return {?}
                     */
                    function (option) {
                        return getValueFromObject(option, _this.typeaheadGroupField) === group;
                    }))
                        .map((
                    // tslint:disable-next-line:no-any
                    // tslint:disable-next-line:no-any
                    /**
                     * @param {?} option
                     * @return {?}
                     */
                    function (option) {
                        return new TypeaheadMatch(option, getValueFromObject(option, _this.typeaheadOptionField));
                    })));
                }));
                this._matches = matches_1;
            }
            else {
                this._matches = limited.map((
                // tslint:disable-next-line:no-any
                // tslint:disable-next-line:no-any
                /**
                 * @param {?} option
                 * @return {?}
                 */
                function (option) {
                    return new TypeaheadMatch(option, getValueFromObject(option, _this.typeaheadOptionField));
                }));
            }
        };
        /**
         * @protected
         * @return {?}
         */
        TypeaheadDirective.prototype.hasMatches = /**
         * @protected
         * @return {?}
         */
        function () {
            return this._matches.length > 0;
        };
        TypeaheadDirective.decorators = [
            { type: core.Directive, args: [{ selector: '[typeahead]', exportAs: 'bs-typeahead' },] }
        ];
        /** @nocollapse */
        TypeaheadDirective.ctorParameters = function () { return [
            { type: componentLoader.ComponentLoaderFactory },
            { type: TypeaheadConfig },
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: forms.NgControl },
            { type: core.Renderer2 },
            { type: core.ViewContainerRef }
        ]; };
        TypeaheadDirective.propDecorators = {
            typeahead: [{ type: core.Input }],
            typeaheadMinLength: [{ type: core.Input }],
            adaptivePosition: [{ type: core.Input }],
            isAnimated: [{ type: core.Input }],
            typeaheadWaitMs: [{ type: core.Input }],
            typeaheadOptionsLimit: [{ type: core.Input }],
            typeaheadOptionField: [{ type: core.Input }],
            typeaheadGroupField: [{ type: core.Input }],
            typeaheadAsync: [{ type: core.Input }],
            typeaheadLatinize: [{ type: core.Input }],
            typeaheadSingleWords: [{ type: core.Input }],
            typeaheadWordDelimiters: [{ type: core.Input }],
            typeaheadPhraseDelimiters: [{ type: core.Input }],
            typeaheadItemTemplate: [{ type: core.Input }],
            optionsListTemplate: [{ type: core.Input }],
            typeaheadScrollable: [{ type: core.Input }],
            typeaheadOptionsInScrollableView: [{ type: core.Input }],
            typeaheadHideResultsOnBlur: [{ type: core.Input }],
            typeaheadSelectFirstItem: [{ type: core.Input }],
            typeaheadIsFirstItemActive: [{ type: core.Input }],
            typeaheadLoading: [{ type: core.Output }],
            typeaheadNoResults: [{ type: core.Output }],
            typeaheadOnSelect: [{ type: core.Output }],
            typeaheadOnBlur: [{ type: core.Output }],
            container: [{ type: core.Input }],
            dropup: [{ type: core.Input }],
            onInput: [{ type: core.HostListener, args: ['input', ['$event'],] }],
            onChange: [{ type: core.HostListener, args: ['keyup', ['$event'],] }],
            onFocus: [{ type: core.HostListener, args: ['click',] }, { type: core.HostListener, args: ['focus',] }],
            onBlur: [{ type: core.HostListener, args: ['blur',] }],
            onKeydown: [{ type: core.HostListener, args: ['keydown', ['$event'],] }]
        };
        return TypeaheadDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TypeaheadModule = /** @class */ (function () {
        function TypeaheadModule() {
        }
        /**
         * @return {?}
         */
        TypeaheadModule.forRoot = /**
         * @return {?}
         */
        function () {
            return {
                ngModule: TypeaheadModule,
                providers: [componentLoader.ComponentLoaderFactory, positioning.PositioningService, TypeaheadConfig]
            };
        };
        TypeaheadModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        declarations: [TypeaheadContainerComponent, TypeaheadDirective],
                        exports: [TypeaheadContainerComponent, TypeaheadDirective],
                        entryComponents: [TypeaheadContainerComponent]
                    },] }
        ];
        return TypeaheadModule;
    }());

    exports.TypeaheadConfig = TypeaheadConfig;
    exports.TypeaheadContainerComponent = TypeaheadContainerComponent;
    exports.TypeaheadDirective = TypeaheadDirective;
    exports.TypeaheadMatch = TypeaheadMatch;
    exports.TypeaheadModule = TypeaheadModule;
    exports.TypeaheadOptions = TypeaheadOptions;
    exports.escapeRegexp = escapeRegexp;
    exports.getValueFromObject = getValueFromObject;
    exports.latinMap = latinMap;
    exports.latinize = latinize;
    exports.tokenize = tokenize;
    exports.ɵa = typeaheadAnimation;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ngx-bootstrap-typeahead.umd.js.map
