"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const options_1 = require("../options");
const Commands_1 = require("./Commands");
const logUpdate = require("log-update");
class BuildCommand extends Commands_1.Commands {
    constructor() {
        super(...arguments);
        this.name = 'build [appPaths...]';
        this.description = options_1.options['TXT.BUILD'];
        this.options = [
            {
                name: '-o, --output [outputPath]',
                description: options_1.options['TXT.BUILD.OUTPUTPATH']
            }
        ];
        this.log = logUpdate.create(process.stdout);
    }
    async action(_appPaths, cmd) {
        try {
            const appFolderGlobs = _appPaths.length ? _appPaths : options_1.options['PATH.APPS'];
            const apps = await this.getApps(appFolderGlobs);
            for (const app of apps) {
                console.log(`Building app ${app.contextPath}...`);
                if (cmd.branding) {
                    console.log(`with branding from ${cmd.branding}`);
                    app.branding = cmd.branding;
                }
                app.events.on('build.progress', () => this.log(app.getLogMsg()));
                const stats = await app.build(Object.assign({ mode: 'production' }, this.getWebpackExtraOptions()));
                this.log.done();
                if (stats.errors) {
                    console.log(chalk_1.default.red(stats.errors));
                }
                else {
                    console.log(stats.toString({
                        assets: false,
                        cached: false,
                        children: false,
                        chunks: false,
                        chunkModules: false,
                        colors: true,
                        hash: true,
                        modules: false,
                        reasons: false,
                        source: false,
                        timings: true,
                        version: true,
                        warnings: false,
                    }));
                }
                if (stats.errors || (stats.compilation.errors && stats.compilation.errors.length)) {
                    process.exit(1);
                }
            }
        }
        catch (ex) {
            console.log(chalk_1.default.bold.red(options_1.options['TXT.BUILD.FAILED']));
            console.log(chalk_1.default.red(ex));
            process.exit(1);
        }
    }
}
exports.BuildCommand = BuildCommand;
//# sourceMappingURL=BuildCommand.js.map