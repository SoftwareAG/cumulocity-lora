"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function config(content) {
    // as we can only load the less entry point this one is not of much use.
    const cssUrl = {
        find: /@import\s+(url\(.?http)/gi,
        replace: '@import (css) $1'
    };
    const baseBranding = {
        find: /["'][^"]+cumulocity-ui-build\/__baseBranding__\/([^"']+)["']/gi,
        replace: '"~@c8y/style/$1"'
    };
    const baseBrandingInSource = {
        find: /["'][^"]+\.\.\/c8yBranding\/([^"']+)["']/gi,
        replace: '"~@c8y/style/$1"'
    };
    return content
        .replace(baseBranding.find, baseBranding.replace)
        .replace(baseBrandingInSource.find, baseBrandingInSource.replace)
        .replace(cssUrl.find, cssUrl.replace);
}
exports.default = config;
//# sourceMappingURL=loader-less.js.map