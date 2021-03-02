"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const chalk_1 = require("chalk");
const fast_glob_1 = require("fast-glob");
const Commands_1 = require("./Commands");
const LocaleCompiler_1 = require("../utils/LocaleCompiler");
const options_1 = require("../options");
class LocaleCompileCommand extends Commands_1.Commands {
    constructor() {
        super(...arguments);
        this.name = 'locale-compile [poPaths...]';
        this.description = options_1.options['TXT.LOCALE_COMPILE'];
        this.options = [
            {
                name: '-o, --output [output path]',
                description: options_1.options['TXT.LOCALE_COMPILE.OUTPUT_PATH']
            }
        ];
        this.localeCompiler = new LocaleCompiler_1.LocaleCompiler();
    }
    async action(poPaths, cmd) {
        const srcGlobs = poPaths.length ? poPaths : ['./*'];
        const paths = (await fast_glob_1.async(srcGlobs, { absolute: true, onlyFiles: true })).filter((p) => /po$/.test(p));
        this.outputPath = path_1.resolve(cmd.output || './');
        const pofiles = await this.read(paths);
        pofiles.forEach((content) => this.localeCompiler.loadPo(content));
        await this.write(this.localeCompiler.compile());
        console.log(chalk_1.default.green(options_1.options['TXT.LOCALE_COMPILE.SAVED']));
    }
    async read(paths) {
        return (await Promise.all(paths.map((path) => fs_extra_1.readFile(path)))).map((buffer) => buffer.toString());
    }
    async write(files) {
        return (await Promise.all(files.map(({ language, json }) => fs_extra_1.writeFile(path_1.resolve(this.outputPath, `${language}.json`), json))));
    }
}
exports.LocaleCompileCommand = LocaleCompileCommand;
//# sourceMappingURL=LocaleCompileCommand.js.map