import * as elements from 'typed-html';
import { generateBrowserList } from './browser-list';
import { translater } from './utils/i18n';
import { ReportOptions } from './ReportOptions';
import { logoHtml } from './logo';
import { searchHtml } from './search';

export function navbar(options: ReportOptions) {
    const t = translater(options);
    return (
        <nav class="navbar navbar-dark bg-primary">
            <a class="navbar-brand" href="javascript:;">
                {logoHtml(options)}
                {t(options.reportTitle)}
            </a>
            <div class="mr-auto">{generateBrowserList(options)}</div>
            <div class="test-summary">
                <span class="badge badge-light">
                    <i class="material-icons">access_alarms</i> <span id="browser-total-time"></span>
                </span>
                <span class="badge badge-light" title={t('header.total-count')}>
                    <i class="material-icons">view_list</i>: <span id="browser-total-count"></span>
                </span>
                <span class="badge badge-success" title={t('header.success-count')}>
                    <i class="material-icons">done</i> <span id="browser-success-count"></span>
                </span>
                <span class="badge badge-danger" title={t('header.failed-count')}>
                    <i class="material-icons">error</i>
                    <span id="browser-error-count"></span>
                </span>
                <span class="badge badge-dark" title={t('header.skipped-count')}>
                    <i class="material-icons">highlight_off</i> <span id="browser-skipped-count"></span>
                </span>
            </div>
        </nav>
    );
}
