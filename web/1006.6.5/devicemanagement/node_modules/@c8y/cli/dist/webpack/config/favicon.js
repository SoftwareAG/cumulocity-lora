"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function config(env) {
    return {
        module: {
            rules: [
                {
                    test: /favicon\.(ico|png|svg)$/,
                    use: [{ loader: 'file-loader', options: { name: 'favicon.ico' } }]
                }
            ]
        }
    };
}
exports.config = config;
//# sourceMappingURL=favicon.js.map