"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
function loaderNgTemplate(content) {
    const callback = this.async();
    const issuerPath = this._module.issuer.context;
    const templatePath = path
        .relative(path.dirname(issuerPath), this.resource)
        .replace(new RegExp(`\\${path.sep}`, 'g'), '/');
    callback(null, functionTemplate(content, templatePath));
}
exports.default = loaderNgTemplate;
function functionTemplate(content, templatePath) {
    return `require('@c8y/ng1-modules/core/bootstrap').registerTemplate('${templatePath}', ${JSON.stringify(content)})`;
}
//# sourceMappingURL=loader-ngtemplate.js.map