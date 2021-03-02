"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const loader_pluginpath_1 = require("./loader-pluginpath");
function dataLoader(content) {
    const collectionName = path.basename(this.context);
    const pluginPathTransform = loader_pluginpath_1.default.bind(this);
    let obj;
    let keys = [];
    let contents = [content];
    try {
        obj = JSON.parse(content);
    }
    catch (e) {
        obj = {};
    }
    switch (collectionName) {
        case 'devicecommands':
            keys = [path.basename(this.resource, '.json')];
            break;
        case 'properties':
            keys = [path.basename(this.resource, '.json')];
            break;
        case 'devicetypes':
            keys = [path.basename(this.resource, '.json')];
            contents = [JSON.stringify(Object.assign({}, obj.c8y_ModbusDeviceTypeInfo, { id: keys[0], _item: obj }))];
            break;
        case 'trackers':
            keys = obj.map(({ name }) => name);
            contents = obj.map((o) => JSON.stringify(o));
        default:
            break;
    }
    if (keys.length) {
        content = `const win = window;
      const c8y = win.c8y = win.c8y || {};
      const collections = c8y.collections = c8y.collections || {};
      const colName = '${collectionName}';
      const col = collections[colName] = collections[colName] || {};`;
        content = keys.reduce((existingContent, key, index) => {
            return `${existingContent}
      col['${key}']=${pluginPathTransform(contents[index])};`;
        }, content);
    }
    return content;
}
exports.default = dataLoader;
//# sourceMappingURL=loader-data.js.map