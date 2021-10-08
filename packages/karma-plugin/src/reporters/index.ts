import jsonReporter from './json';
import htmlReporter from './html';

export default {
    ...jsonReporter,
    ...htmlReporter
};
