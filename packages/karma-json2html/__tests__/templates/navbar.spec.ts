import { mockOptions } from '../common/mock-report-options';
import { navbar } from '../../src/navbar';

it('should render navbar correctly', () => {
    const options = mockOptions({
        reportTitle: 'page-title'
    });
    const headerHtml = navbar(options);
    expect(headerHtml).toMatchSnapshot();
});
