const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = function config(env) {
    return {
        output: {
            path: path.join(__dirname, './dist/apps/devicemanagement-lora')
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    { from: 'node_modules/monaco-editor', to:  'assets/monaco-editor/' },
                ],
            }, {debug: true})
        ],
    }
};