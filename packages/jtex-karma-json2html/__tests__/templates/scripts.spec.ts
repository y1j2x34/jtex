import { mockOptions } from '../common/mock-report-options';
import { scripts } from '../../src/scripts';

it('should render scripts correctly', () => {
    expect(scripts(mockOptions({}))).toMatchSnapshot();
});
