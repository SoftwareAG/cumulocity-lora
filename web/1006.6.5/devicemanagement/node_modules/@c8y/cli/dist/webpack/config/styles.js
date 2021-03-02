"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const autoprefixer = require("autoprefixer");
const mini_css_extract_plugin_1 = require("mini-css-extract-plugin");
function config(env) {
    const devMode = env.mode !== 'production';
    const { sourceMapLess: sourceMap } = env;
    const lessLoader = (relativeUrls) => ({
        loader: 'less-loader',
        options: {
            sourceMap,
            noIeCompat: true,
            relativeUrls,
        }
    });
    const sassLoader = () => ({
        loader: 'sass-loader',
        options: {
            sourceMap
        }
    });
    const cssLoader = (url, importLoaders) => ({
        loader: 'css-loader',
        options: {
            importLoaders: importLoaders + (devMode ? 0 : 1),
            sourceMap,
            url,
        }
    });
    const postcssLoader = () => (!devMode && {
        loader: 'postcss-loader',
        options: {
            sourceMap,
            plugins: [autoprefixer({
                    // This should probabbly me moved out to .browserlistrc
                    browsers: ['last 2 major versions']
                })]
        }
    });
    const styleLoader = () => devMode ? 'style-loader' : mini_css_extract_plugin_1.loader;
    const rules = [
        {
            test: /\.css$/,
            oneOf: [
                {
                    issuer: /cumulocity\.json/,
                    exclude: /node_modules/,
                    use: [styleLoader(), cssLoader(false, 0), postcssLoader()].filter(Boolean)
                },
                {
                    issuer: /\.ts$/,
                    use: ['raw-loader', postcssLoader()].filter(Boolean)
                },
                {
                    use: [styleLoader(), cssLoader(true, 0), postcssLoader()].filter(Boolean)
                }
            ]
        },
        {
            test: /\.less$/,
            oneOf: [
                {
                    issuer: /cumulocity\.json/,
                    exclude: /node_modules/,
                    use: [
                        styleLoader(),
                        cssLoader(false, 2),
                        postcssLoader(),
                        lessLoader(false),
                        'c8y-less'
                    ].filter(Boolean)
                },
                {
                    issuer: /\.ts$/,
                    use: [
                        'raw-loader',
                        postcssLoader(),
                        lessLoader(true)
                    ].filter(Boolean)
                },
                {
                    use: [
                        styleLoader(),
                        cssLoader(true, 1),
                        postcssLoader(),
                        lessLoader(true)
                    ].filter(Boolean)
                }
            ]
        },
        {
            test: /\.scss$/,
            oneOf: [
                {
                    issuer: /\.ts$/,
                    use: [
                        'raw-loader',
                        postcssLoader(),
                        sassLoader()
                    ].filter(Boolean)
                },
                {
                    use: [
                        styleLoader(),
                        cssLoader(true, 1),
                        postcssLoader(),
                        sassLoader()
                    ].filter(Boolean)
                }
            ]
        }
    ];
    return {
        module: { rules }
    };
}
exports.config = config;
//# sourceMappingURL=styles.js.map