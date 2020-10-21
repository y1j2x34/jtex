import baseConfig from './webpack.base';
import path from 'path';
import pkg from '../../package.json';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import { IPluginOptions } from 'webpack-extension-reloader';
const ExtensionReloader = require('webpack-extension-reloader');

const srcDirectory = path.resolve(__dirname, '../../src');
const distDirectory = path.resolve(__dirname, '../..', pkg.distDir);

export default webpackMerge(baseConfig, {
    entry: {
        'content-script': path.resolve(srcDirectory, 'content-script/index.ts'),
        background: path.resolve(srcDirectory, 'background/index.ts')
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
    plugins: [
        new ExtensionReloader({
            port: 9998,
            entries: {
                contentScript: 'content-script',
                background: 'background'
            },
            reloadPage: true,
            manifest: path.resolve(srcDirectory, 'manifest.json')
        } as IPluginOptions)
    ]
} as webpack.Configuration);
