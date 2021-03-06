import baseConfig from './webpack.base';
import path from 'path';
import webpackMerge from 'webpack-merge';
import pkg from '../../package.json';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const srcDirectory = path.resolve(__dirname, '../../src');
const distDirectory = path.resolve(__dirname, '../..', pkg.distDir);

baseConfig.module!.rules[0].use = {
    loader: 'ts-loader',
    options: {
        compilerOptions: {
            declaration: true,
            declarationDir: distDirectory
        }
    }
};

export default webpackMerge(baseConfig, {
    entry: {
        index: path.resolve(srcDirectory, 'index.ts')
    },
    output: {
        filename: '[name].js',
        path: distDirectory,
        library: 'jtex',
        libraryTarget: 'umd'
    },
    mode: 'production',
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'package.json',
                    to: distDirectory
                },
                {
                    from: 'README.md',
                    to: distDirectory
                }
            ]
        })
    ]
});
