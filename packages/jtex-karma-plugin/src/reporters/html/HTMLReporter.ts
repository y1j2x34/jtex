import { JSONReportData, JSONReporter } from '../json/JSONReporter';
import { html } from '@jtex/karma-json2html';
import { Writable } from 'stream';

export interface HTMLReporterConfig {
    output: string | Writable;
    pageTitle: string;
    reportTitle: string;
    forcusOnFailures: boolean;
    collapsed: boolean;
    logoFile?: string;
}

export class HTMLReporter extends JSONReporter {
    static get $inject() {
        return ['baseReporterDecorator', 'formatError', 'config.jtexReporter.html', 'helper', 'logger'];
    }
    writeReportData(data: JSONReportData) {
        const config = this.config as HTMLReporterConfig;
        const htmlStr = html({
            data,
            ...config
        });
        this.writeTextData(htmlStr);
    }
}
