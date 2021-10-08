import { mockOptions } from '../common/mock-report-options';
import { progressbar } from '../../src/progressbar';

it('should render progressbar correctly', () => {
    expect(progressbar(mockOptions({}))).toMatchSnapshot();
});
