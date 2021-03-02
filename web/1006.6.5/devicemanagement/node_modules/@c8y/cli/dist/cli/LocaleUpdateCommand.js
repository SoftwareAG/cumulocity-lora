"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const path_1 = require("path");
const fast_glob_1 = require("fast-glob");
const fs_extra_1 = require("fs-extra");
const LocaleUtils_1 = require("../utils/LocaleUtils");
const Commands_1 = require("./Commands");
const _ = require("lodash");
const options_1 = require("../options");
const ensureDir = util_1.promisify(fs_extra_1.ensureDir);
class LocaleUpdateCommand extends Commands_1.Commands {
    constructor() {
        super(...arguments);
        this.name = 'locale-update';
        // tslint:disable-next-line
        this.description = options_1.options['TXT.LOCALE_UPDATE'];
        this.options = [
            {
                name: '-i, --input [inputPath]',
                // tslint:disable-next-line
                description: options_1.options['TXT.LOCALE_UPDATE.INPUT']
            }
        ];
        this.localeUtils = new LocaleUtils_1.LocaleUtils();
    }
    getExtractedPoFiles(inputDir) {
        return fast_glob_1.async(path_1.join(this.inputDir, '*.po'));
    }
    async action(cmd) {
        const root = process.cwd();
        const getExtractor = this.localeUtils.getExtractor.bind(this.localeUtils);
        this.inputDir = path_1.resolve(root, cmd.input || '.');
        const [modulePaths, pos] = await Promise.all([
            this.localeUtils.findModulePaths(root),
            this.localeUtils.getPoObjects([this.inputDir])
        ]);
        const modules = await Promise.all(modulePaths
            .map((path) => getExtractor([path]).then((extractor) => ({ extractor, path }))));
        this.preparePosForModules(modules, pos);
    }
    async extractorForModule(path) {
        return await this.localeUtils.getExtractor([path]);
    }
    async preparePosForModules(modules, pos) {
        const promises = [];
        modules.forEach((mod) => {
            const { path, extractor } = mod;
            const newPos = this.combinePosForPlugin(extractor.toPo(), pos);
            promises.push(this.saveNewPos(newPos, path));
        });
        return await Promise.all(promises);
    }
    combinePosForPlugin(modulePo, extractedPos) {
        const newPos = [];
        _.forEach(extractedPos, (p) => {
            const po = this.localeUtils.createNewPo();
            _.extend(po.headers, p.headers);
            delete po.headers['X-Generator'];
            _.forEach(p.items, (i) => {
                const isPresent = _.find(modulePo.items, { msgid: i.msgid });
                if (isPresent) {
                    po.items.push(i);
                }
            });
            if (po.items.length) {
                newPos.push(po);
            }
        });
        return newPos;
    }
    async saveNewPos(newPos, modulePath) {
        const promises = [];
        _.forEach(newPos, (newPo) => {
            const { Language } = newPo.headers;
            const folder = path_1.resolve(modulePath, 'locales');
            const file = path_1.resolve(folder, `${Language}.po`);
            const save = util_1.promisify(newPo.save.bind(newPo));
            promises.push(ensureDir(folder).then(() => save(file)));
        });
        return await Promise.all(promises).catch((err) => console.log(err));
    }
}
exports.LocaleUpdateCommand = LocaleUpdateCommand;
//# sourceMappingURL=LocaleUpdateCommand.js.map