import { mockOptions } from '../common/mock-report-options';
import { suiteList } from '../../src/suite-list';

beforeAll(() => {
    Math.floor = jest.fn().mockReturnValue(14203822251);
});

it('should render suite list correctly', () => {
    expect(suiteList(mockOptions({}))).toMatchSnapshot();
});
