import { I18NResource } from '../ReportOptions';

import enUS from '../locales/en-US.json';
import zhCN from '../locales/zh-CN.json';

export function mergeI18nResources(userI18nResources: I18NResource = {}): { [lang: string]: I18NResource } {
    const enus = JSON.parse(JSON.stringify(enUS));
    const zhcn = JSON.parse(JSON.stringify(zhCN));
    let result = userI18nResources ? JSON.parse(JSON.stringify(userI18nResources)) : {};

    result['en-US'] = mergeObject(enus, userI18nResources['en-US'] as I18NResource);
    result['zh-CN'] = mergeObject(zhcn, userI18nResources['zh-CN'] as I18NResource);

    return result;
}

function mergeObject(a: I18NResource, b?: I18NResource): I18NResource {
    if (!b) {
        return a;
    }
    for (const key in b) {
        const bvalue = b[key];
        if (key in a) {
            const avalue = a[key];
            if (typeof bvalue === 'object') {
                if (typeof avalue === 'object') {
                    a[key] = mergeObject(avalue, bvalue);
                    continue;
                }
            }
        }
        a[key] = bvalue;
    }
    return a;
}
