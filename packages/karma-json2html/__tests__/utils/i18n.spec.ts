import { t } from '../../src/utils/i18n';
import en from '../../src/locales/en-US.json';
import zh from '../../src/locales/zh-CN.json';

describe('utils/i18n', () => {
    const i18nResource = {
        'en-US': en,
        'zh-CN': zh
    };
    it('should return itself if it is not in the i18n resource', () => {
        const KEY = 'nonexistent';
        const ret = t(KEY, i18nResource, 'en-US');
        expect(ret).toBe(KEY);
        const KEY2 = 'header.nonexistent';
        expect(t(KEY2, i18nResource, 'en-US')).toBe(KEY2);
        const KEY3 = 'header.browsers.nonexistent';
        expect(t(KEY3, i18nResource, 'en-US')).toBe(KEY3);
    });
    it('should use "en-US" by default if the language configuration is not exist', () => {
        const KEY = 'page-title';
        const ret = t(KEY, i18nResource, 'ja-JP');
        expect(ret).toBe(t(KEY, i18nResource, 'en-US'));
    });
    it('should return itself if "en-US" is not configured in i18n resource', () => {
        const KEY = 'page-title';
        const ret = t(KEY, {}, 'en-US');
        expect(ret).toBe(KEY);
    });
    it('should translate correctly', () => {
        expect(t('page-title', i18nResource, 'en-US')).toBe('Test Result');
        expect(t('page-title', i18nResource, 'zh-CN')).toBe('测试结果');
        expect(t('header.browsers', i18nResource, 'en-US')).toBe('Browsers');
    });
});
