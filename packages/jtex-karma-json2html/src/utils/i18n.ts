import { I18NResource, ReportOptions } from '../ReportOptions';

export function t(key: string, res: I18NResource, lng = 'en-US'): string {
    const entries = res[lng];
    if (!entries) {
        return key;
    }
    if (typeof entries === 'string') {
        return entries;
    }

    const ks = key.split('.');
    const lastIndex = ks.length - 1;
    let entryMap = entries;
    for (let i = 0, j = lastIndex; i < j; i++) {
        const k = ks[i];
        if (!entryMap[k]) {
            return key;
        }
        if (typeof entryMap[k] === 'string') {
            return key;
        }
        entryMap = entryMap[k] as I18NResource;
    }
    const result = entryMap[ks[lastIndex]];
    if (typeof result === 'string') {
        return result;
    }
    return key;
}
export function translater(options: ReportOptions) {
    return (key: string) => t(key, options.i18nResources, options.lang);
}
