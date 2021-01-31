import karma from 'karma';
const path = require('path');
import reporters from './reporters';
interface CustomLaunchers {
    [key: string]: karma.CustomLauncher;
}

function isLaunchWithChromeBrowser(browsers: string[]) {
    try {
        const chromeLauncherModuleName = 'karma-chrome-launcher';
        const chromeLauncher = require(chromeLauncherModuleName);
        const chromeNames = Object.keys(chromeLauncher).map(it => it.slice('launcher:'.length));
        return chromeNames.some(it => browsers.indexOf(it) > -1);
    } catch (error) {
        return false;
    }
}
function customBrowserNameToBase(customBrowserName: string, customLaunchers: CustomLaunchers) {
    let browserName = customBrowserName;
    while (!!customLaunchers[browserName]) {
        browserName = customLaunchers[browserName].base;
    }
    return browserName;
}

function initJtex(files: karma.FilePattern[], browsers: string[], customLaunchers: CustomLaunchers, args: any) {
    files.push({
        pattern: require.resolve('jtex-api'),
        included: true,
        served: true,
        watched: false
    });
    const flags = args.flags || [];
    args.flags = flags;
    let baseBrowserNames = browsers;
    if (!!customLaunchers) {
        baseBrowserNames = browsers.map(it => customBrowserNameToBase(it, customLaunchers));
    }
    if (isLaunchWithChromeBrowser(baseBrowserNames)) {
        const extensionManifestPath = require.resolve('jtex-chrome-extension');
        const extensionPath = path.resolve(extensionManifestPath, '..');
        flags.push('--load-extension=' + extensionPath);
    } else {
        console.warn('[jtex]Unsupported browser', browsers);
    }
}

initJtex.$inject = ['config.files', 'config.browsers', 'config.customLaunchers', 'args'];

export default {
    'framework:jtex': ['factory', initJtex],
    ...reporters
};
