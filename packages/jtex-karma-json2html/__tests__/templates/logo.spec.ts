import { mockOptions } from '../common/mock-report-options';
import { logoHtml } from '../../src/logo';

it('should render logo html correctly', () => {
    const options = mockOptions({});
    const headerHtml = logoHtml(options);
    expect(headerHtml).toMatchSnapshot();

    expect(
        logoHtml(
            mockOptions({
                logoFile: ''
            })
        )
    ).toBe('');

    expect(
        logoHtml(
            mockOptions({
                logoFile: '~/nonexistent'
            })
        )
    ).toMatchSnapshot();
});
