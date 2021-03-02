const { c8yServePath: appPath, c8yUrl: instance, c8yUrlLocal: localServer } = global;
const proxies = {};
proxies[appPath] = {
    target: localServer,
    pathRewrite: {}
};
proxies[appPath].pathRewrite[`^${appPath}`] = '';
proxies['/**!(apps)/**/*'] = {
    target: instance,
    changeOrigin: true,
    secure: false,
    ws: true
};
module.exports = proxies;
//# sourceMappingURL=proxy.js.map