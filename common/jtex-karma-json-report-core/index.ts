export interface AssertionError {
    name: string;
    message: string;
    showDiff: true;
    actual: string;
    expected: string;
}
export interface SuiteResultInfo {
    description: string;
    suite: string[];
    success: boolean;
    skipped: boolean;
    pending: boolean;
    time: number;
    log?: string[];
    assertionErrors: AssertionError[];
    startTime: number;
    endTime: number;
}

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
    results: Array<SuiteResultInfo>;
}

export interface JSONReportData {
    summary: TestSummary;
    browsers: BrowserStats[];
}
