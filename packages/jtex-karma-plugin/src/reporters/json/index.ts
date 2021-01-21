import { BrowserStats, JSONReportData } from '../../JSONReportData';
import path from 'path';
import fs from 'fs';

export interface JSONReporterConfig {
    outputFile: string;
}

class JsonReporter {
    static get $inject() {
        return ['baseReporterDecorator', 'formatError', 'config.jtexReporter.json', 'helper', 'logger'];
    }
    private browsers: Record<string, BrowserStats> = {};
    constructor(
        baseReporterDecorator: (reporter: JsonReporter) => void,
        private formatError: (error: any) => string,
        private config: JSONReporterConfig,
        private helper: any,
        private logger: any
    ) {
        baseReporterDecorator(this);
    }
    clear() {
        this.browsers = {};
    }
    onSpecComplete(browser, result) {
        this.getBrowser(browser.browserId, browser).results.push(result);
    }
    onRunComplete(browsers, summary) {
        const browserResults = Object.values(this.browsers).map(browser => {
            browser.errors = browser.errors.map(it => this.formatError(it));
            return browser;
        });
        const output: JSONReportData = {
            summary: {
                success: summary.success,
                failed: summary.failed,
                skipped: summary.skipped,
                error: summary.error,
                disconnected: summary.disconnected,
                exitCode: summary.exitCode
            },
            browsers: browserResults
        };
        this.writeReportData(output);
    }
    getBrowser(browserId: string, browser): BrowserStats {
        if (browserId in this.browsers) {
            return this.browsers[browserId];
        }
        this.browsers[browserId] = {
            browser: browser,
            errors: [],
            results: []
        };
        return this.browsers[browserId];
    }
    writeReportData(output: JSONReportData) {
        const outputFile = this.config.outputFile;
        this.helper.mkdirIfNotExists(path.dirname(outputFile), () => {
            fs.writeFile(outputFile, JSON.stringify(output), err => {
                if (err) {
                    this.logger.warn(`Cannot write test results to file\n\t${err.message}\n\t${err.stack}`);
                } else {
                    this.logger.debug(`Test results were written to JSON file ${outputFile}`);
                }
            });
        });
    }
    onBrowserError(browser, error) {
        this.getBrowser(browser.browserId, browser).errors.push(error);
    }
}

export default {
    'reporter:jtex-json': ['type', JsonReporter]
};
