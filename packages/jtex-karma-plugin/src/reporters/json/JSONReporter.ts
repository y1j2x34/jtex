import path from 'path';
import fs from 'fs';
import { BrowserStats, JSONReportData } from '../../../../../common/jtex-karma-json-report-core';
import { Writable } from 'stream';

export * from '../../../../../common/jtex-karma-json-report-core';

export interface JSONReporterConfig {
    output: string | Writable;
}

export interface LogInterface {
    warn(message: string);
    error(message: string);
    debug(message: string);
}

export class JSONReporter {
    static get $inject() {
        return ['baseReporterDecorator', 'formatError', 'config.jtexReporter.json', 'helper', 'logger'];
    }
    private browsers: Record<string, BrowserStats> = {};
    private log: LogInterface;

    constructor(
        baseReporterDecorator: (reporter: JSONReporter) => void,
        private formatError: (error: any) => string,
        private config: JSONReporterConfig,
        private helper: any,
        loggerFactory: any
    ) {
        baseReporterDecorator(this);
        this.log = loggerFactory.create('jtex-json-reporter') as LogInterface;
        if (!config || !this.isValidOutputConfig(config.output)) {
            this.log.warn('Invalid configuration: jtexReporter.json.output, it should be file path or fs.WriteStream');
        }
    }
    private isValidOutputConfig(output: string | Writable): boolean {
        return typeof output === 'string' || output instanceof Writable;
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
    writeReportData(outputData: JSONReportData) {
        const output = this.config.output;
        if (typeof output === 'string') {
            const absolutePath = path.resolve(output);
            this.makeDir(absolutePath).then(() => {
                fs.writeFile(absolutePath, JSON.stringify(outputData), err => {
                    if (err) {
                        this.log.warn(`Cannot write test results to file\n\t${err.message}\n\t${err.stack}`);
                    } else {
                        this.log.debug(`Test results were written to JSON file ${output}`);
                    }
                });
            });
        } else if (output instanceof Writable) {
            output.write(JSON.stringify(outputData));
        }
    }
    makeDir(absolutePath) {
        return new Promise<void>(resolve => {
            this.helper.mkdirIfNotExists(path.dirname(absolutePath), () => {
                resolve();
            });
        });
    }
    onBrowserError(browser, error) {
        this.getBrowser(browser.browserId, browser).errors.push(error);
    }
}
