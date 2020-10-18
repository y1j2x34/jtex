import karma from 'karma';
interface CustomLaunchers {
    [key: string]: karma.CustomLauncher;
}
declare function initJtex(files: karma.FilePattern[], browsers: string[], customLaunchers: CustomLaunchers, args: any): void;
declare namespace initJtex {
    var $inject: string[];
}
declare const _default: {
    'framework:jtex': (string | typeof initJtex)[];
};
export default _default;
