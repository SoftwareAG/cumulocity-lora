const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = function config(env) {
    return {
        output: {
            path: path.join(__dirname, './dist/apps/devicemanagement-lora')
        },
        plugins: [
            new WriteFilePlugin(), // Force the webpack-dev-server to write to a folder (so we can copy other assets into it)
            new CopyPlugin({
                patterns: [
                    { from: 'node_modules/ngx-monaco-editor/assets/monaco', to:  path.join(__dirname, './dist/apps/devicemanagement-lora/assets/monaco') },
                ],
            })
        ],
    }
};