import { JSONReportData } from '../../../common/jtex-karma-json-report-core';

export interface I18NResource {
    [key: string]: string | I18NResource;
}

export interface ReportOptions {
    lang: string;
    i18nResources: {
        [lang: string]: I18NResource;
    };
    pageTitle: string;
    reportTitle: string;
    forcusOnFailures: boolean;
    data: JSONReportData;
}
