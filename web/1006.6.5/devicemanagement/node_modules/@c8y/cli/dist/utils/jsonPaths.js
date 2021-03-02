"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const jsonPath = require("JSONPath");
const dataTranslate = {
    smartrules: [
        '$..label.[input,output]',
        '$..description',
        '$..category',
        '$..info',
        '$..paramGroups.[input,output].label',
        '$..paramGroups.[input,output].info',
        '$..paramGroups.[input,output].params.[label,default,info,placeholder]',
        '$..paramGroups.[input,output].params.default.description',
        '$..paramGroups.[input,output].params.stepTypes.[label,default,info,placeholder]',
        '$..paramGroups.[input,output].params.stepTypes.default.description'
    ],
    devicecommands: [
        '$.name',
        '$.templates..[name,category]'
    ],
    properties: [
        '$..title'
    ],
    trackers: [
        '$..description'
    ]
};
function createJsFromJson(jsonpaths) {
    return (content) => {
        const obj = JSON.parse(content);
        return jsonpaths.reduce((src, path) => {
            const values = jsonPath.eval(obj, path);
            return src + values
                .filter((v) => typeof v === 'string')
                .map((v) => `gettext('${v}');`)
                .join('\n');
        }, '');
    };
}
const keys = Object.keys(dataTranslate);
exports.jsonPathsGlobs = `(${keys.join('|')})`;
exports.default = keys.map((key) => {
    return {
        glob: `${key}/*.json`,
        matches: (filename) => path_1.basename(path_1.dirname(filename)) === key,
        transform: createJsFromJson(dataTranslate[key])
    };
});
//# sourceMappingURL=jsonPaths.js.map