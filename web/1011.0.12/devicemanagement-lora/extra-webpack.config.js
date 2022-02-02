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
                    { from: 'node_modules/ngx-monaco-editor/assets/monaco', to:  path.join(__dirname, './dist/apps/devicemanagement-lora/assets/monaco') },
                ],
            })
        ],
    }
};