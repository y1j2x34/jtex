import { generateBrowserList } from '../../src/browser-list';
import { mockOptions } from '../common/mock-report-options';

it('render browser list correctly', () => {
    const options = mockOptions({});
    const browserListHTML = generateBrowserList(options);
    expect(browserListHTML).toMatchSnapshot();
});
