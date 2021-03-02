"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function loaderManifest(content) {
    let manifest = JSON.parse(content);
    manifest = Object.assign(manifest, manifest.webpackOverride);
    const { context } = this;
    const callback = this.async();
    const plugin = this._compiler.c8yPluginInstance;
    const isBrandingContext = plugin.isBrandingContext(this.context) || (this.resourceQuery || '').match(/branding/i);
    const isC8yBranding = plugin.isC8yBranding(this.context) || (this.resourceQuery || '').match(/c8ybranding/i);
    const isApp = !!manifest.contextPath;
    const isPlugin = !isApp;
    manifest = isApp ? plugin.transformAppManifest(manifest) : manifest; // targets applied if present
    if (isPlugin) {
        if (manifest.imports) {
            manifest.imports = manifest.imports.map(plugin.transformLegacyPluginPath);
        }
    }
    source().then((finalSource) => callback(null, finalSource), (err) => callback(err));
    async function source() {
        const ngModulesStr = manifest.ngModules && JSON.stringify(manifest.ngModules);
        let sourceStr = isApp ? 'require(\'@c8y/ng1-modules/core\');\n' : '';
        if (isPlugin) {
            manifest.webpackFiles = await plugin.findModuleFiles(context, extraPatterns());
        }
        sourceStr += sourceImports();
        sourceStr += sourceFiles();
        sourceStr += await sourceCopy();
        if (ngModulesStr) {
            sourceStr += `require('@c8y/ng1-modules/core/bootstrap').registerNgModule(${ngModulesStr});`;
        }
        if (isBrandingContext && !isC8yBranding) {
            // this only copies the assets. no less is loaded
            sourceStr = `${sourceStr}require('@c8y/style/export.cumulocity.json?c8yBranding');
require('font-awesome/less/font-awesome.less');`;
        }
        return sourceStr;
    }
    function extraPatterns() {
        if (isC8yBranding && manifest.export) {
            // for c8y branding we want to skip the ico and the logos
            return ['{**/,}*.(webp|jpg|gif|png|woff|woff2|eot|ttf|svg)', '!{**/,}*logo*'];
        }
        else if (isBrandingContext) {
            return ['{**/,}*.(webp|jpg|gif|png|woff|woff2|eot|ttf|svg|ico)'];
        }
        return [];
    }
    function sourceImports() {
        return (manifest.imports || [])
            .reduce(
        /* Don't import brandings here. they are added as the branding entry*/
        (src, importString) => (/branding/i).test(importString) ? src : `${src}require('${importString}');\n`, '');
    }
    function sourceFiles() {
        const { js = [], less = [], css = [], webpackFiles = [] } = manifest;
        return [...js, ...less, ...css, ...webpackFiles]
            .filter(Boolean)
            .filter(plugin.filterIfUpgrade(manifest))
            .reduce(importsReducer, '');
    }
    async function sourceCopy() {
        let importStatements = [];
        // we are finding with a glob all the files from brandings so we ignore the copy
        if (manifest.copy) {
            importStatements = [].concat(...(await Promise.all(manifest.copy
                .map((c) => plugin.copyDefinitionToImports(c, context)))));
        }
        return importStatements
            .filter(Boolean)
            .map((importPath) => `require('${importPath}');`)
            .join('\n');
    }
    function importsReducer(block, importString) {
        let requireString = importString;
        if (requireString.match(/node_modules/)) {
            requireString = requireString.split('node_modules/')[1];
        }
        else {
            requireString = `./${requireString}`;
        }
        // we are loading moment in core/index.js so we skip it here
        if (requireString === 'moment/min/moment-with-locales.js') {
            return block;
        }
        else if (requireString === 'jquery/dist/jquery.js') {
            // other require jquery and we need to share the same instance
            requireString = 'jquery';
        }
        else if (requireString.match(/favicon\.(png|svg|ico)$/i)) {
            // favicon special case
            requireString = `!file-loader?name=favicon.ico!${requireString}`;
        }
        else if (requireString.match(/(webp|jpg|gif|png|woff|woff2|eot|ttf|svg|ico)$/)) {
            // everything goes to the root
            requireString = `!file-loader?name=${requireString}!${requireString}`;
        }
        return `${block}require('${requireString}');\n`;
    }
}
exports.default = loaderManifest;
//# sourceMappingURL=loader-manifest.js.map