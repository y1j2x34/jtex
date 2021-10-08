import baseConfig from './webpack.base';
import path from 'path';
import pkg from '../../package.json';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';

const srcDirectory = path.resolve(__dirname, '../../src');
const distDirectory = path.resolve(__dirname, '../..', pkg.distDir);

export default webpackMerge(baseConfig, {
    entry: {
        index: path.resolve(srcDirectory, 'index.ts')
    },
    mode: 'development',
    devtool: 'cheap-module-source-map',
    output: {
        filename: '[name].js',
        path: distDirectory
    },
    watch: true,
    watchOptions: {
        ignored: ['node_modules/**']
    },
    plugins: []
} as webpack.Configuration);
