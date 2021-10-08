import { JSONReporter, LogInterface, JSONReportData, JSONReporterConfig } from '../src/reporters/json/JSONReporter';
import fs from 'fs';
import os from 'os';
import path from 'path';
import del from 'del';
import mkdirp from 'mkdirp';
import { Writable } from 'stream';

interface MockHelper {
    mkdirIfNotExists: (path: string, callback: () => void) => void;
}
interface LoggerFactory {
    create(name: string): LogInterface;
}
describe('JSONReporter', () => {
    let reporterDecorator: (reporter: JSONReporter) => void;
    let formatError: (error: any) => typeof error;
    let helper: MockHelper;
    let loggerFactory: LoggerFactory;
    let logger: LogInterface = {
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn()
    };
    beforeEach(() => {
        reporterDecorator = jest.fn();
        formatError = jest.fn().mockImplementation(error => error);
        helper = {
            mkdirIfNotExists: jest.fn().mockImplementation((absolutePath: string, callback: () => void) => {
                if (!fs.existsSync(absolutePath)) {
                    mkdirp.sync(absolutePath);
                }
                callback();
            })
        };
        loggerFactory = {
            create: jest.fn().mockImplementation(name => {
                return logger;
            })
        };
    });
    it('should be instantiable', () => {
        const config = {
            output: ''
        };
        const reporter = new JSONReporter(reporterDecorator, formatError, config, helper, loggerFactory);
        expect(reporter).not.toBeNull();
        expect(reporterDecorator).toBeCalledTimes(1);
        expect(loggerFactory.create).toBeCalledTimes(1);
    });
    it('should print warning message when configuration parameter is incorrect', () => {
        const config = {} as JSONReporterConfig;
        new JSONReporter(reporterDecorator, formatError, config, helper, loggerFactory);
        expect(logger.warn).toBeCalledTimes(1);
    });
    describe('with real files', () => {
        const ERROR_TEXT = 'test error';
        let browser, summary;
        let tempDir: string;
        beforeEach(() => {
            browser = {
                id: '123456',
                name: 'MockBrowser'
            };
            summary = {
                success: 4,
                failed: 2,
                error: false,
                disconnected: false,
                exitCode: 1
            };
            tempDir = path.resolve(os.tmpdir(), 'jtex-json-reporter');
        });
        afterEach(() => {
            del(tempDir, {
                force: true
            });
        });
        it('should write error to config output file', async () => {
            const reportFilePath = path.resolve(tempDir, 'report-file.json');
            const config = {
                output: reportFilePath
            };
            const reporter = new JSONReporter(reporterDecorator, formatError, config, helper, loggerFactory);
            reporter.onBrowserError(browser, ERROR_TEXT);
            reporter.onRunComplete({}, summary);
            await waitForResult(reportFilePath);
            const json = await readResult(reportFilePath);
            const browserResult = json.browsers[0];
            expect(browserResult.errors).toContain(ERROR_TEXT);
            expect(browserResult.browser).toEqual(browser);
            expect(json.summary).toEqual(summary);
        });
        it('should be able write report to nested path', async () => {
            const reportFilePath = path.resolve(tempDir, 'nest/dir/report-file-json');
            const config = {
                output: reportFilePath
            };
            const reporter = new JSONReporter(reporterDecorator, formatError, config, helper, loggerFactory);

            reporter.onBrowserError(browser, ERROR_TEXT);
            reporter.onBrowserError(browser, ERROR_TEXT);
            reporter.onRunComplete([], summary);

            await waitForResult(reportFilePath);
            const json = await readResult(reportFilePath);
            const browserResult = json.browsers[0];
            expect(browserResult.errors).toContain(ERROR_TEXT);
            expect(browserResult.browser).toEqual(browser);
            expect(json.summary).toEqual(summary);
        });

        it('should browsers cache be cleared correctly', async () => {
            const reportFilePath = path.resolve(tempDir, 'nest/dir/report-file-json');
            const config = {
                output: reportFilePath
            };
            const reporter = new JSONReporter(reporterDecorator, formatError, config, helper, loggerFactory);
            reporter.onBrowserError(browser, ERROR_TEXT);
            reporter.onRunComplete([], summary);
            await waitForResult(reportFilePath);
            reporter.clear();
            expect(reporter['browsers']).toEqual({});
        });
    });

    describe('with write stream', () => {
        let browser, summary;
        let browserTestResult;
        beforeEach(() => {
            browser = {
                id: '123456',
                name: 'MockBrowser'
            };
            summary = {
                success: 4,
                failed: 2,
                error: false,
                disconnected: false,
                exitCode: 1
            };
            browserTestResult = {
                disconnected: false,
                error: false,
                exitCode: 0,
                failed: 2,
                success: 10
            };
        });
        it('should be able write report to stream.Writable', () => {
            let result!: string;
            class WritableStream extends Writable {
                public write(chunk, callback): boolean {
                    result = chunk;
                    return true;
                }
            }
            const config = {
                output: new WritableStream({
                    emitClose: true,
                    autoDestroy: true
                })
            };
            const reporter = new JSONReporter(reporterDecorator, formatError, config, helper, loggerFactory);
            reporter.onSpecComplete(browser, browserTestResult);
            reporter.onRunComplete([], summary);
            expect(result).not.toBeNull();
            const json = JSON.parse(result) as JSONReportData;
            const browserResult = json.browsers[0];
            expect(browserResult.results[0]).toEqual(browserTestResult);
            expect(browserResult.browser).toEqual(browser);
            expect(json.summary).toEqual(summary);
        });
    });

    function waitForResult(filePath: string) {
        return new Promise<void>(resolve => {
            setImmediate(function check() {
                if (fs.existsSync(filePath)) {
                    resolve();
                } else {
                    setImmediate(check);
                }
            });
        });
    }
    function readResult(filePath: string) {
        return new Promise<JSONReportData>((resolve, reject) => {
            fs.readFile(filePath, (err, result: Buffer) => {
                if (err) {
                    reject(`Read file error - ${filePath}: ${err}`);
                } else {
                    resolve(JSON.parse(result.toString()));
                }
            });
        });
    }
});
