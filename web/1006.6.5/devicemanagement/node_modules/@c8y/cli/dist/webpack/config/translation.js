"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
function config(env) {
    return {
        resolveLoader: {
            alias: {
                'c8y-po': path_1.resolve(__dirname, '../loaders/loader-po')
            }
        },
        module: {
            rules: [
                {
                    test: /\.po$/,
                    use: ['c8y-po']
                }
            ]
        }
    };
}
exports.config = config;
//# sourceMappingURL=translation.js.map