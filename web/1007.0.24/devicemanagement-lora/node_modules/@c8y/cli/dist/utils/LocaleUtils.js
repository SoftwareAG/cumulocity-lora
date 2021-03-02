"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const fast_glob_1 = require("fast-glob");
const pofile_1 = require("pofile");
const angular_gettext_tools_1 = require("angular-gettext-tools");
const jsonPaths_1 = require("./jsonPaths");
const _ = require("lodash");
const loadPo = util_1.promisify(pofile_1.load);
class LocaleUtils {
    async findModulePaths(root) {
        const manifestsPath = await this.findManifests(root);
        return manifestsPath.map((manifestPath) => path_1.dirname(manifestPath));
    }
    async getPoObjects(paths) {
        const g = '{**/,}*.po';
        let poFilePaths = [];
        for (const cwd of paths) {
            const options = {
                cwd,
                absolute: true,
                ignore: ['dist/**']
            };
            poFilePaths = poFilePaths.concat(await fast_glob_1.async(g, options));
        }
        const poPromises = poFilePaths.map((p) => loadPo(String(p)));
        return Promise.all(poPromises);
    }
    async getExtractor(paths) {
        const patterns = paths.map((p) => path_1.join(p, '{**/,}*.{ts,js,html}'))
            .concat(paths.map((p) => path_1.join(p, jsonPaths_1.jsonPathsGlobs, '*.json')));
        const options = {
            unique: true,
            ignore: ['**/node_modules/**', '**/*spec.*s', '.tmp/**', '**/modules/dist/**'],
            absolute: true
        };
        const transformFile = (filename) => {
            let transform = (a) => a;
            if (/json$/.test(filename)) {
                filename = filename.replace(/json$/, 'js');
                const matched = jsonPaths_1.default.find(({ matches }) => matches(filename));
                transform = matched ? matched.transform : () => '';
            }
            return (data) => ({ filename, data: transform(data) });
        };
        const filePaths = await fast_glob_1.async(patterns, options);
        const promises = filePaths.map((file) => {
            return fs_extra_1.readFile(String(file), 'utf8')
                .then(transformFile(file));
        });
        const files = await Promise.all(promises);
        const extractor = this.createExtractor();
        files.forEach(({ filename, data }) => extractor.parse(filename, data));
        return extractor;
    }
    createNewPo(po) {
        const newPo = pofile_1.parse('');
        Object.assign(newPo.headers, po && po.headers);
        return newPo;
    }
    async findManifests(root) {
        const PATTERN = '{modules,app/plugins,plugins}/*/cumulocity.json';
        const options = {
            unique: true,
            cwd: root,
            ignore: ['node_modules'],
            absolute: true
        };
        return fast_glob_1.async([PATTERN], options);
    }
    createExtractor() {
        const ext = new angular_gettext_tools_1.Extractor();
        ext.toPo = function () {
            const catalog = pofile_1.parse('');
            catalog.headers = {
                'Content-Type': 'text/plain; charset=UTF-8',
                'Content-Transfer-Encoding': '8bit',
                'Project-Id-Version': ''
            };
            _.forEach(this.strings, (msg) => {
                const contexts = Object.keys(msg).sort();
                for (const ctx of contexts) {
                    catalog.items.push(msg[ctx]);
                }
            });
            catalog.items.sort((a, b) => a.msgid.localeCompare(b.msgid));
            this.options.postProcess(catalog);
            return catalog;
        };
        return ext;
    }
}
exports.LocaleUtils = LocaleUtils;
//# sourceMappingURL=LocaleUtils.js.map