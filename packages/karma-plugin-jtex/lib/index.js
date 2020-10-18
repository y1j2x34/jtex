'use strict';

var path = require('path');
function isLaunchWithChromeBrowser(browsers) {
    try {
        var chromeLauncherModuleName = 'karma-chrome-launcher';
        var chromeLauncher = require(chromeLauncherModuleName);
        var chromeNames = Object.keys(chromeLauncher).map(function (it) { return it.slice('launcher:'.length); });
        return chromeNames.some(function (it) { return browsers.indexOf(it) > -1; });
    }
    catch (error) {
        return false;
    }
}
function customBrowserNameToBase(customBrowserName, customLaunchers) {
    var browserName = customBrowserName;
    while (!!customLaunchers[browserName]) {
        browserName = customLaunchers[browserName].base;
    }
    return browserName;
}
function initJtex(files, browsers, customLaunchers, args) {
    files.push({
        pattern: require.resolve('jtex-api'),
        included: true,
        served: true,
        watched: false
    });
    var flags = args.flags || [];
    args.flags = flags;
    var baseBrowserNames = browsers;
    if (!!customLaunchers) {
        baseBrowserNames = browsers.map(function (it) { return customBrowserNameToBase(it, customLaunchers); });
    }
    if (isLaunchWithChromeBrowser(baseBrowserNames)) {
        var extensionManifestPath = require.resolve('jtex-chrome-extension');
        var extensionPath = path.resolve(extensionManifestPath, '..');
        flags.push('--load-extension=' + extensionPath);
    }
    else {
        console.warn('[jtex]Unsupported browser', browsers);
    }
}
initJtex.$inject = ['config.files', 'config.browsers', 'config.customLaunchers', 'args'];
var index = {
    'framework:jtex': ['factory', initJtex]
};

module.exports = index;
