"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const merge = require("webpack-merge");
const babelNgAnnotate = require("babel-plugin-angularjs-annotate");
const plugin_proposal_object_rest_spread_1 = require("@babel/plugin-proposal-object-rest-spread");
const plugin_syntax_dynamic_import_1 = require("@babel/plugin-syntax-dynamic-import");
// this is not great, but i couldn't solve this with webpack merge
// TODO: Find a better solution for this
Object.defineProperty(config, 'mergeFn', {
    value: (finalConfig, babelConfig) => {
        const tsRuleFinder = ({ test }) => String(test).match(/\.ts\)?\$\/$/);
        const productionTsRule = babelConfig.module.rules.find(tsRuleFinder);
        const finalTsRule = finalConfig.module.rules.find(tsRuleFinder);
        if (productionTsRule && finalTsRule) {
            finalTsRule.use = [...productionTsRule.use, ...finalTsRule.use];
            babelConfig.module.rules = babelConfig.module.rules.filter((rule) => rule !== productionTsRule);
        }
        return merge(finalConfig, babelConfig);
    }
});
function config(env) {
    let presets = [];
    try {
        presets = [require('babel-preset-env')];
    }
    catch (e) {
        // do nothing
    }
    const jsRules = {
        test: /\.js$/,
        exclude: [/node_modules.(?!@c8y.ngx-components)/, /packages.client/, /app-bootstrap/],
        use: [{
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    plugins: [
                        plugin_syntax_dynamic_import_1.default,
                        babelNgAnnotate,
                        plugin_proposal_object_rest_spread_1.default
                    ],
                    presets,
                }
            }]
    };
    const tsRules = {
        test: /\.ts$/,
        exclude: [/app-bootstrap/],
        use: [{
                loader: 'babel-loader',
                options: { plugins: [babelNgAnnotate], babelrc: false }
            }]
    };
    return {
        module: {
            rules: [
                jsRules,
                tsRules
            ]
        }
    };
}
exports.config = config;
//# sourceMappingURL=babel.js.map