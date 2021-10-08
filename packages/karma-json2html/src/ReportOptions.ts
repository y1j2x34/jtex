import { JSONReportData } from '@jtex/common';

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
    focusOnFailures: boolean;
    data: JSONReportData;
    collapsed: boolean;
    logoFile?: string;
}
