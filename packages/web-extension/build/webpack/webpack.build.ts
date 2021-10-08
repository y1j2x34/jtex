import baseConfig from './webpack.dev';
import webpackMerge from 'webpack-merge';

export default webpackMerge(baseConfig, {
    watch: false,
    mode: 'production',
    devtool: 'nosources-source-map'
});
