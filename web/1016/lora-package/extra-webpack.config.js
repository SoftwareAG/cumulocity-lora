const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = function config(env) {
    return {
        output: {
            path: path.join(__dirname, './dist/apps/lora-package')
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    { from: 'node_modules/monaco-editor/min/vs', to:  'assets/monaco/min/vs' },
                ],
            }, {debug: true})
        ],
    }
};