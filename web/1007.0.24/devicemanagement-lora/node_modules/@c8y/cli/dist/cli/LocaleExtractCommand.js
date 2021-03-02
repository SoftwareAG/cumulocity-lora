"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const _ = require("lodash");
const chalk_1 = require("chalk");
const fast_glob_1 = require("fast-glob");
const Commands_1 = require("./Commands");
const LocaleUtils_1 = require("../utils/LocaleUtils");
const options_1 = require("../options");
class LocaleExtractCommand extends Commands_1.Commands {
    constructor() {
        super(...arguments);
        this.name = 'locale-extract [srcPaths...]';
        this.description = options_1.options['TXT.EXTRACT'];
        this.options = [
            {
                name: '-o, --output [output path]',
                description: options_1.options['TXT.EXTRACT.OUTPUT_PATH']
            },
            {
                name: '-r, --refs',
                description: options_1.options['TXT.EXTRACT.INCLUDE_REFERENCES']
            }
        ];
        this.localeUtils = new LocaleUtils_1.LocaleUtils();
    }
    async action(srcPaths, opts) {
        const srcGlobs = srcPaths.length ? srcPaths : ['./'];
        const paths = await fast_glob_1.async(srcGlobs, { absolute: true, onlyDirectories: true });
        this.outputPath = path_1.resolve(opts.output || './locales');
        this.includeReferences = opts.refs || false;
        await this.createCombinedFiles(paths);
    }
    async createCombinedFiles(paths) {
        const [pos, extractor] = await Promise.all([
            this.localeUtils.getPoObjects(paths),
            this.localeUtils.getExtractor(paths)
        ]);
        pos.push(extractor.toPo());
        fs_extra_1.ensureDir(this.outputPath);
        this.savePoFiles(this.combinePos(pos));
    }
    combinePos(pos) {
        const combinedPos = {};
        _.forEach(pos, (po) => {
            const lang = po.headers.Language || 'template';
            if (!combinedPos[lang]) {
                combinedPos[lang] = this.localeUtils.createNewPo(po);
            }
            const combinePo = combinedPos[lang];
            combinePo.extractedComments = _.uniq(_.union(combinePo.extractedComments, po.extractedComments));
            combinePo.comments = _.uniq(_.union(combinePo.comments, po.comments));
            _.forEach(po.items, (i) => {
                const exists = _.find(combinePo.items, { msgid: i.msgid });
                if (!this.includeReferences) {
                    i.references.length = 0;
                }
                i.extractedComments.length = 0;
                if (exists) {
                    exists.extractedComments = _.uniq(exists.extractedComments.concat(i.extractedComments));
                    exists.comments = _.uniq(exists.comments.concat(i.comments));
                    exists.references = _.uniq(exists.references.concat(i.references));
                }
                else {
                    combinePo.items.push(i);
                }
            });
            combinePo.items = _.sortBy(combinePo.items, (item) => item.msgid);
        });
        return combinedPos;
    }
    savePoFiles(extractedPos) {
        _.forEach(extractedPos, (po) => {
            const { Language } = po.headers;
            const filename = Language ? `${Language}.po` : 'locales.pot';
            const outputFilePath = path_1.join(this.outputPath, filename);
            po.save(outputFilePath, (err) => {
                if (err) {
                    console.log(err);
                    process.exit(1);
                }
                const msg = options_1.options['TXT.EXTRACT.SAVED'](outputFilePath);
                console.log(chalk_1.default.green(msg));
            });
        });
    }
}
exports.LocaleExtractCommand = LocaleExtractCommand;
//# sourceMappingURL=LocaleExtractCommand.js.map