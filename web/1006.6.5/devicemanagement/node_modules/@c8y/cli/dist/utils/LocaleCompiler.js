"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pofile = require("pofile");
const angular_gettext_tools_1 = require("angular-gettext-tools");
class LocaleCompiler {
    constructor() {
        this.groupedPos = {};
    }
    loadPo(content) {
        const po = pofile.parse(content);
        const grouped = this.groupedPos;
        const { Language } = po.headers;
        if (!grouped[Language]) {
            grouped[Language] = new pofile();
        }
        const finalPo = grouped[Language];
        const { headers, items } = finalPo;
        Object.assign(headers, po.headers);
        const uniqueNewItems = po.items.filter((item) => !items.some(({ msgid }) => msgid === item.msgid));
        finalPo.items = items.concat(uniqueNewItems);
        return '';
    }
    compile() {
        const grouped = this.groupedPos;
        return Object.keys(grouped).map((po) => ({
            language: po,
            json: (new angular_gettext_tools_1.Compiler({ format: 'json' })).convertPo([grouped[po].toString()])
        }));
    }
}
exports.LocaleCompiler = LocaleCompiler;
//# sourceMappingURL=LocaleCompiler.js.map