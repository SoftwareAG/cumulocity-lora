"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
function default_1(content) {
    const issuerContext = this._module.issuer.context; // eslint-disable-line
    const PLUGIN_PATH = `${path.basename(issuerContext)}`;
    return content.replace(/:::PLUGIN_PATH:::/g, PLUGIN_PATH);
}
exports.default = default_1;
//# sourceMappingURL=loader-pluginpath.js.map