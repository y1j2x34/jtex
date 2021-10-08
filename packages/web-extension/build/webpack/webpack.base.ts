import webpack from 'webpack';
import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import pkg from '../../package.json';

const srcDirectory = path.resolve(__dirname, '../../src');
const distDirectory = path.resolve(__dirname, '../..', pkg.distDir);

export default {
    resolve: {
        extensions: ['.ts']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(srcDirectory, 'manifest.json'),
                    to: distDirectory,
                    force: true
                },
                {
                    from: path.resolve(srcDirectory, 'assets'),
                    to: path.resolve(distDirectory, 'assets'),
                    force: true
                }
            ]
        }),
        new CleanWebpackPlugin({ verbose: true })
    ]
} as webpack.Configuration;
