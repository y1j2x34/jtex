import * as elements from 'typed-html';
import { JSONReportData } from '../../../common/jtex-karma-json-report-core';
import { generateHeader } from './header';
import { navbar } from './navbar';
import { progressbar } from './progressbar';
import { ReportOptions } from './ReportOptions';
import { scripts } from './scripts';
import { suiteList } from './suite-list';
import { isNotDefined } from './utils/isNotDefined';
import { mergeI18nResources } from './utils/mergeI18nResources';

export function html(opts: Partial<ReportOptions> & { data: JSONReportData }): string {
    if (!opts.lang) {
        opts.lang = 'en-US';
    }
    if (isNotDefined(opts.forcusOnFailures)) {
        opts.forcusOnFailures = false;
    }
    if (isNotDefined(opts.pageTitle)) {
        opts.pageTitle = 'page-title';
    }
    if (isNotDefined(opts.reportTitle)) {
        opts.reportTitle = opts.pageTitle;
    }
    opts.i18nResources = mergeI18nResources(opts.i18nResources);
    const options = opts as ReportOptions;
    return (
        <html>
            {generateHeader(options)}
            <body>
                {navbar(options)}
                {progressbar(options)}
                {suiteList(options)}
            </body>
            {scripts(options)}
        </html>
    );
}
