import { mockOptions } from '../common/mock-report-options';
import { generateHeader } from '../../src/header';

it('should render header correctly', () => {
    const options = mockOptions({});
    const headerHtml = generateHeader(options);
    expect(headerHtml).toMatchSnapshot();
});
