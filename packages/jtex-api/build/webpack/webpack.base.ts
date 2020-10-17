import webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

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
    plugins: [new CleanWebpackPlugin({ verbose: true })]
} as webpack.Configuration;
