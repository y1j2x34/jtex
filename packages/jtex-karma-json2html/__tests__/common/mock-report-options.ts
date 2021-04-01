import path from 'path';
import { ReportOptions } from '../../src/ReportOptions';
import enUS from '../../src/locales/en-US.json';
import reportData from '../../src/debug/debug.karma-result.json';

export function mockOptions({
    lang = 'en-US',
    pageTitle = '',
    reportTitle = '',
    focusOnFailures = false,
    collapsed = false,
    logoFile = path.resolve(__dirname, '../../src/res/logo.svg')
}: Partial<ReportOptions>): ReportOptions {
    return {
        lang,
        i18nResources: {
            'en-US': enUS
        },
        pageTitle,
        reportTitle,
        focusOnFailures,
        data: reportData,
        collapsed,
        logoFile
    };
}
