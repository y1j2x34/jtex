import * as elements from 'typed-html';
import { ReportOptions } from './ReportOptions';
import { translater } from './utils/i18n';

export function searchHtml(options: ReportOptions) {
    const t = translater(options);
    return (
        <form id="search-cases" class="inline-form" onsubmit="return false;">
            <input
                class="form-control mr-sm2"
                type="search"
                placeholder={t('header.search')}
                aria-label={t('header.search')}
                name="keywords"
            />
        </form>
    );
}
