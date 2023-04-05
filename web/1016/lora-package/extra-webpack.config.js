const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = function config(env) {
    return {
        output: {
            path: path.join(__dirname, './dist/apps/sag-ps-iot-pkg-lora-package')
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    { from: 'node_modules/monaco-editor/min/vs', to:  'assets/monaco/min/vs' },
                    { context: path.resolve('../../..'), from: '*.png', to: 'assets/img'}
                ],
            }, {debug: true})
        ],
    }
};