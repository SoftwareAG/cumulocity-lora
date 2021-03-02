"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_1 = require("./plugin/plugin");
const path_1 = require("path");
const RESOLVER_NAME = 'CumulocityLegacyManifestResolver';
class LegacyManifestResolver {
    apply(resolver) {
        let localPlugins = [];
        let nodeModulesPlugins = [];
        try {
            localPlugins = resolver.fileSystem
                .readdirSync('plugins')
                .map((p) => path_1.resolve('./plugins', p));
        }
        catch (e) {
            // nothing
        }
        try {
            nodeModulesPlugins = resolver.fileSystem
                .readdirSync('node_modules')
                .filter((p) => p.match(/^cumulocity-ui/) && p !== 'cumulocity-ui-build')
                .map((pkg) => ({
                pkg,
                dirs: resolver.readdirSync(resolver.join('node_modules', pkg))
            }))
                .reduce((list, o) => list.concat(o.dirs.map((dir) => resolver.join(o.pkg, dir))), []);
        }
        catch (e) {
            // nothing
        }
        resolver.hooks.resolve.tapAsync(RESOLVER_NAME, (request, resolveContext, callback) => {
            if (!request.request.match(plugin_1.LEGACY_MANIFEST)) {
                return callback();
            }
            const originalRequest = request.request.replace(plugin_1.LEGACY_MANIFEST, '');
            const builtInApps = ['core', 'administration', 'cockpit', 'devicemanagement'];
            const parts = originalRequest.split('/');
            const matchers = [
                new RegExp(`[/\\\\]${parts.join('-')}$`),
                new RegExp(`[/\\\\]${parts.slice(1).join('-')}$`)
            ];
            const [part0] = parts;
            const inLocalPlugins = builtInApps.indexOf(part0) === -1 &&
                localPlugins.find((p) => matchers.some((m) => p.match(m)));
            const inLegacyNodeModules = nodeModulesPlugins.find((p) => matchers.some((m) => p.match(m)));
            const finalRequest = inLocalPlugins || inLegacyNodeModules;
            if (parts.indexOf('c8yBranding') > -1) {
                const ix = parts.indexOf('c8yBranding');
                request.request = `@c8y/style/${parts.slice(ix + 1).join('/')}`;
            }
            else if (finalRequest) {
                request.request = path_1.join(finalRequest, 'cumulocity.json');
            }
            else {
                request.request = `${plugin_1.NG1_PACKAGE}/${(part0 === 'core' ? parts.slice(1) : parts).join('-')}/cumulocity.json`;
            }
            return resolver.doResolve(resolver.hooks.undescribedRawFile, request, `${RESOLVER_NAME} ${request.request}`, resolveContext, callback);
        });
    }
}
exports.LegacyManifestResolver = LegacyManifestResolver;
//# sourceMappingURL=LegacyManifestResolver.js.map