import { html } from '../../src/index';
import { ReportOptions } from '../../src/ReportOptions';
import { mockOptions } from '../common/mock-report-options';

beforeAll(() => {
    Math.floor = jest.fn().mockReturnValue(14203822251);
});

describe('complete html', () => {
    const defaultOptions = mockOptions({});
    it('should render correctly', () => {
        expect(html(defaultOptions)).toMatchSnapshot();
    });
    it("default value of lang option should be 'en-US' ", () => {
        expect(
            html({
                ...defaultOptions,
                lang: undefined
            })
        ).toEqual(
            html({
                ...defaultOptions,
                lang: 'en-US'
            })
        );
    });
    it("should default value of 'focusOnFailure' option be false", () => {
        const optsWithoutFocusOnFailures = {
            ...defaultOptions,
            focusOnFailures: undefined
        } as Partial<ReportOptions>;
        expect(html(optsWithoutFocusOnFailures as ReportOptions)).toEqual(
            html({
                ...defaultOptions,
                focusOnFailures: false
            })
        );
    });
    it("should default value of 'pageTitle' option be 'page-title'", () => {
        const optsWithoutPageTitle = {
            ...defaultOptions,
            pageTitle: undefined
        } as Partial<ReportOptions>;
        expect(html(optsWithoutPageTitle as ReportOptions)).toEqual(
            html({
                ...defaultOptions,
                pageTitle: 'page-title'
            })
        );
    });

    it("should default value of 'reportTitle' option be the value of 'pageTitle' option", () => {
        const optsWithoutReportTitle = {
            ...defaultOptions,
            pageTitle: 'page-title',
            reportTitle: undefined
        } as Partial<ReportOptions>;

        expect(html(optsWithoutReportTitle as ReportOptions)).toEqual(
            html({
                ...defaultOptions,
                reportTitle: optsWithoutReportTitle.pageTitle
            })
        );
    });

    it("should default value of 'collapsed' option be false", () => {
        const optsWithoutCollapsed = {
            ...defaultOptions,
            collapsed: undefined
        } as Partial<ReportOptions>;

        expect(html(optsWithoutCollapsed as ReportOptions)).toEqual(
            html({
                ...defaultOptions,
                collapsed: false
            })
        );
    });
});
