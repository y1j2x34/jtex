import en from '../../src/locales/en-US.json';
import zh from '../../src/locales/zh-CN.json';
import { mergeI18nResources } from '../../src/utils/mergeI18nResources';
describe('mergeI18nResources', () => {
    function clone<T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj));
    }
    const enUS = clone(en);
    const zhCN = clone(zh);

    it('should merge empty i18n resource correctly', () => {
        const a = mergeI18nResources({});
        expect(a).toStrictEqual({
            'en-US': enUS,
            'zh-CN': zhCN
        });
    });
    it('should merge i18n resource with same language correctly', () => {
        const PAGE_TITLE = 'Test page title';
        const TEST_BROWSERS = 'Test Browsers';
        const a = mergeI18nResources({
            'en-US': {
                'page-title': PAGE_TITLE,
                header: {
                    browsers: TEST_BROWSERS
                }
            }
        });
        const cloneENUS = clone(enUS);
        cloneENUS['page-title'] = PAGE_TITLE;
        cloneENUS.header.browsers = TEST_BROWSERS;
        expect(a).toEqual({
            'en-US': cloneENUS,
            'zh-CN': zhCN
        });
    });
    it('should merge i18n resource with differen language correctly', () => {
        const koKR = {
            'page-title': '시험 결과'
        };
        const a = mergeI18nResources({
            'ko-KR': koKR
        });
        expect(a).toEqual({
            'en-US': enUS,
            'zh-CN': zhCN,
            'ko-KR': koKR
        });
    });
});
