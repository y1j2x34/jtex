import * as elements from 'typed-html';
import { ReportOptions } from './ReportOptions';

function percent(value: number, total: number) {
    return Math.round((value / total) * 10000) / 100 + '%';
}

export function progressbar(options: ReportOptions) {
    return (
        <div class="summaries-progress-bar">
            {options.data.browsers.map(it => {
                const browserInfo = it.browser;
                const successPercent = percent(browserInfo.lastResult.success, browserInfo.lastResult.total);
                const failedPercent = percent(browserInfo.lastResult.failed, browserInfo.lastResult.total);
                const skippedPercent = percent(browserInfo.lastResult.skipped, browserInfo.lastResult.total);
                return (
                    <div class="progress" browser-id={browserInfo.id}>
                        <div class="progress-bar bg-success" style={'width:' + successPercent}></div>
                        <div class="progress-bar bg-danger" style={'width:' + failedPercent}></div>
                        <div class="progress-bar bg-dark" style={'width:' + skippedPercent}></div>
                    </div>
                );
            })}
        </div>
    );
}
