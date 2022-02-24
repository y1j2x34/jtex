import {JSONReportData, JSONReporter} from '../json/JSONReporter';
import {html} from '@jtex/karma-json2html';
import fs from 'fs';

export interface HTMLReporterConfig {
    outputFile: string | fs.WriteStream;
    pageTitle: string;
    reportTitle: string;
    focusOnFailures: boolean;
    collapsed: boolean;
    logoFile?: string;
}

export class HTMLReporter extends JSONReporter {
    static get $inject() {
        return ['formatError', 'config', 'config.jtexReporter.html', 'helper', 'logger'];
    }
    writeReportData(data: JSONReportData) {
        const config = this.reporterConfig as HTMLReporterConfig;
        const htmlStr = html({
            data,
            ...config
        });
        this.writeTextData(htmlStr);
    }
}
