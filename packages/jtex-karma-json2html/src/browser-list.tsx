import * as elements from 'typed-html';
import { translater } from './utils/i18n';
import { ReportOptions } from './ReportOptions';

export function generateBrowserList(options: ReportOptions): string {
    const data = options.data;
    const t = translater(options);
    return (
        <div class="dropdown jtex--dropdown">
            <button class="btn btn-primary dropdown-toggle" data-toggle="dropdown" type="button">
                {t('header.browsers')}
            </button>
            <div class="dropdown-menu switch-browser-dropdown-menu">
                {data.browsers.map(browser => {
                    const browserInfo = browser.browser;
                    return (
                        <a
                            class="dropdown-item switch-browser-menu-item"
                            href="javascript:;"
                            menu-browser={browserInfo.id}
                        >
                            <i class="material-icons text-primary">check</i> {browserInfo.name}
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
