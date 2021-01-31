import * as elements from 'typed-html';
import { SuiteResultInfo, AssertionError } from '../../../common/jtex-karma-json-report-core';
import { ReportOptions } from './ReportOptions';

export function suiteList(options: ReportOptions) {
    return (
        <div class="suite-list" data-spy="scroll">
            {options.data.browsers.map(browserStat => {
                const browserInfo = browserStat.browser;
                const grouped = groupSuitesByName(browserStat.results);
                return (
                    <div data-browser={browserInfo.id}>
                        <div class="suite-card-group">
                            {grouped.map(({ suiteName, cases }) => {
                                return suiteCard(suiteName, cases);
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
function groupSuitesByName(suites: SuiteResultInfo[]): Array<{ suiteName: string; cases: SuiteResultInfo[] }> {
    const suiteMap = {};
    suites.forEach(result => {
        const suiteName = result.suite.join('-');
        if (!suiteMap[suiteName]) {
            suiteMap[suiteName] = [];
        }
        suiteMap[suiteName].push(result);
    });
    return Object.keys(suiteMap).map(suiteName => {
        return {
            suiteName: suiteName,
            cases: suiteMap[suiteName]
        };
    });
}

function suiteCard(name: string, cases: SuiteResultInfo[]) {
    return (
        <div class="card">
            <div class="card-body">
                <h5 class="cart-title">{name}</h5>
                {cases.map(suiteCase => {
                    if (suiteCase.success) {
                        return suiteCaseTemplate(suiteCase, {
                            itemClass: 'case-success',
                            alertClass: 'alert-success',
                            icon: 'done'
                        });
                    } else if (suiteCase.skipped) {
                        return suiteCaseTemplate(suiteCase, {
                            itemClass: 'case-skipped',
                            alertClass: 'alert-dark',
                            icon: 'highlight_off'
                        });
                    } else if (suiteCase.pending) {
                        return suiteCaseTemplate(suiteCase, {
                            itemClass: 'case-pending',
                            alertClass: 'alert-secondary',
                            icon: 'hourglass_empty'
                        });
                    } else {
                        return suiteCaseTemplate(suiteCase, {
                            itemClass: 'case-error',
                            alertClass: 'alert-danger',
                            icon: 'error'
                        });
                    }
                })}
            </div>
        </div>
    );
}

function suiteCaseTemplate(suiteCase: SuiteResultInfo, data: TemplateData) {
    return (
        <div class={'suite-case-item ' + data.itemClass}>
            <div class={'alert ' + data.alertClass}>
                <i class="material-icons">{data.icon}</i>
                <span class="suite-case-desc">{suiteCase.description}</span>
                <span class="suite-case-time">
                    <i class="material-icons">update</i>
                    {suiteCase.endTime - suiteCase.startTime}ms
                </span>
            </div>
            {Array.isArray(suiteCase.log) ? logsTemplate(suiteCase.log) : ''}
            {assertionErrorsTemplate(suiteCase.assertionErrors)}
        </div>
    );
}
function logsTemplate(log: string[]) {
    return log
        .map(logItem => {
            return <pre class="suite-case-log">{logItem}</pre>;
        })
        .join('');
}
function assertionErrorsTemplate(assertionErrors: AssertionError[]) {
    return assertionErrors
        .map(assertionError => {
            return (
                <div class="suite-case-assertion-error">
                    <span class="suite-case-assertion-error-message text-danger">{assertionError.message}</span>
                    <span class="suite-case-assertion-error-actual text-danger">{assertionError.actual}</span>
                    <span class="suite-case-assertion-error-expected text-primary">{assertionError.expected}</span>
                </div>
            );
        })
        .join('');
}
interface TemplateData {
    itemClass: string;
    alertClass: string;
    icon: string;
}
