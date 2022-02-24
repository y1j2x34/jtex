import path from 'path';
import fs from 'fs';
import { BrowserStats, JSONReportData } from '@jtex/common';

export {
    JSONReportData,
    AssertionError,
    SuiteResultInfo,
    BrowserLastResult,
    BrowserInfo,
    TestSummary,
    BrowserStats
} from '@jtex/common';

export interface JSONReporterConfig {
    outputFile: string | fs.WriteStream;
}

export interface LogInterface {
    warn(message: string);
    error(message: string);
    debug(message: string);
}
interface PartialKarmaConfiguration {
    basePath: string;
}

export class JSONReporter {
    static get $inject() {
        return ['formatError', 'config', 'config.jtexReporter.json', 'helper', 'logger'];
    }
    private browsers: Record<string, BrowserStats> = {};
    private log: LogInterface;
    private fileWritingFinished = () => {};

    constructor(
        private formatError: (error: any) => string,
        protected karmaConfig: PartialKarmaConfiguration,
        protected reporterConfig: JSONReporterConfig,
        private helper: any,
        loggerFactory: any
    ) {
        this.log = loggerFactory.create('jtex-json-reporter') as LogInterface;
        this.karmaConfig.basePath = path.resolve( this.karmaConfig.basePath ||'.');

        if (!reporterConfig || !this.isValidOutputConfig(reporterConfig.outputFile)) {
            this.log.warn('Invalid configuration: jtexReporter.json.outputFile, it should be file path or fs.WriteStream');
        }
    }
    private isValidOutputConfig(output: string | fs.WriteStream): boolean {
        return typeof output === 'string' || output instanceof fs.WriteStream;
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
        this.writeTextData(JSON.stringify(outputData));
    }
    writeTextData(text: string) {
        const output = this.reporterConfig.outputFile;
        if (typeof output === 'string') {
            const absolutePath = this.resolvePath(output);
            this.helper.normalizeWinPath(absolutePath);
            this.makeDir(absolutePath).then(() => {
                fs.writeFile(absolutePath, text, err => {
                    this.fileWritingFinished();
                    if (err) {
                        this.log.warn(`Cannot write test results to file\n\t${err.message}\n\t${err.stack}`);
                    } else {
                        this.log.debug(`Test results were written to JSON file ${output}`);
                    }
                });
            });
        } else {
            output.write(text);
        }
    }
    resolvePath(relativePath: string) {
        const { helper, karmaConfig } = this;
        if (helper.isUrlAbsolute(relativePath)) {
            return relativePath;
        }

        if (!helper.isDefined(karmaConfig.basePath) || !helper.isDefined(relativePath)) {
            return '';
        }

        return path.resolve(karmaConfig.basePath as string, relativePath);
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
    onExit(done) {
        this.fileWritingFinished = done;
    }

}
