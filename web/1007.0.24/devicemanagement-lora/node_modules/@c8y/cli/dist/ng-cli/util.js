"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const schematics_1 = require("@angular-devkit/schematics");
function getSourceFile(host, path) {
    const buffer = host.read(path);
    if (!buffer) {
        throw new schematics_1.SchematicsException(`Could not find ${path}.`);
    }
    const content = buffer.toString();
    const source = ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true);
    return source;
}
exports.getSourceFile = getSourceFile;
function getProjectFromWorkspace(workspace, projectName) {
    const project = workspace.projects[projectName || workspace.defaultProject];
    if (!project) {
        throw new schematics_1.SchematicsException(`Could not find project in workspace: ${projectName}`);
    }
    return project;
}
exports.getProjectFromWorkspace = getProjectFromWorkspace;
//# sourceMappingURL=util.js.map