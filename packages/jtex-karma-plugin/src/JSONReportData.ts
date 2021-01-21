import { TestResults } from 'karma';

export interface BrowserLastResult {
    startTime: number;
    total: number;
    success: number;
    failed: number;
    skipped: number;
    totalTime: number;
    netTime: number;
    error: false;
}

export interface BrowserInfo {
    id: string;
    fullName: string;
    name: string;
    lastResult: BrowserLastResult;
}
export interface TestSummary {
    success: number;
    failed: number;
    skipped: number;
    error: boolean;
    disconnected: boolean;
    exitCode: number;
}
export interface BrowserStats {
    browser: BrowserInfo;
    errors: Array<any>;
    results: Array<TestResults>;
}

export interface JSONReportData {
    summary: TestSummary;
    browsers: BrowserStats[];
}
