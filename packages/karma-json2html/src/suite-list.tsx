import * as elements from 'typed-html';
import { SuiteResultInfo, AssertionError } from '@jtex/common';
import { ReportOptions } from './ReportOptions';
import { formatTime } from './utils/formatTime';
import { translater } from './utils/i18n';

export function suiteList(options: ReportOptions) {
    const t = translater(options);
    return (
        <div class="suite-list" data-spy="scroll">
            {options.data.browsers.map(browserStat => {
                const browserInfo = browserStat.browser;
                const grouped = groupSuitesByName(browserStat.results);
                return (
                    <div data-browser={browserInfo.id}>
                        <div class="suite-card-group">
                            {grouped.map(({ suiteName, cases }) => {
                                return suiteCard(suiteName, cases, t, options.collapsed);
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

function suiteCard(name: string, cases: SuiteResultInfo[], t: (key: string) => string, collapsed: boolean) {
    const cardBodyId = Math.floor(Date.now() * Math.random()).toString(16);
    const hasError = cases.some(it => {
        return it.assertionErrors.length > 0 || !(it.success || it.skipped || it.pending);
    });
    const totalTime = cases.map(it => it.time).reduce((sum, it) => sum + it);
    return (
        <div class="card" id={hasError ? 'has-error-suite' : ''}>
            <div class="card-body">
                <div
                    class="card-header"
                    data-toggle="collapse"
                    data-target={'#' + cardBodyId}
                    aria-expanded="true"
                    aria-controls="collapseOne"
                >
                    <h5 class="cart-title">
                        <i class="material-icons expand_less align-middle">expand_less</i>
                        <i class="material-icons expand_more align-middle">expand_more</i>
                        {hasError ? (
                            <i class="material-icons text-danger align-middle">error</i>
                        ) : (
                            <i class="material-icons text-success align-middle">check_circle</i>
                        )}
                        {name}
                        <span class="show-case-total-time">
                            <i class="material-icons">access_alarm</i> {formatTime(totalTime, t)}
                        </span>
                    </h5>
                </div>
                <div id={cardBodyId} class={'collapse ' + (collapsed ? '' : 'show')}>
                    <div class="card-body">
                        {cases.map(suiteCase => {
                            if (suiteCase.success) {
                                return suiteCaseTemplate(
                                    suiteCase,
                                    {
                                        itemClass: 'case-success',
                                        alertClass: 'alert-success',
                                        icon: 'check_circle'
                                    },
                                    t
                                );
                            } else if (suiteCase.skipped) {
                                return suiteCaseTemplate(
                                    suiteCase,
                                    {
                                        itemClass: 'case-skipped',
                                        alertClass: 'alert-dark',
                                        icon: 'highlight_off'
                                    },
                                    t
                                );
                            } else if (suiteCase.pending) {
                                return suiteCaseTemplate(
                                    suiteCase,
                                    {
                                        itemClass: 'case-pending',
                                        alertClass: 'alert-secondary',
                                        icon: 'hourglass_empty'
                                    },
                                    t
                                );
                            } else {
                                return suiteCaseTemplate(
                                    suiteCase,
                                    {
                                        itemClass: 'case-error',
                                        alertClass: 'alert-danger',
                                        icon: 'error'
                                    },
                                    t
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

function suiteCaseTemplate(suiteCase: SuiteResultInfo, data: TemplateData, t: (key: string) => string) {
    return (
        <div class={'suite-case-item ' + data.itemClass}>
            <div class={'alert ' + data.alertClass}>
                <i class="material-icons">{data.icon}</i>
                <span class="suite-case-desc">{suiteCase.description}</span>
                <span class="suite-case-time">
                    <i class="material-icons">update</i>
                    {formatTime(suiteCase.endTime - suiteCase.startTime, t)}
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
