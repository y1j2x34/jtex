import rollup from 'rollup';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import { string } from 'rollup-plugin-string';
import json from '@rollup/plugin-json';
import pkg from './package.json';

let input = './src/index.tsx';

if (process.argv.indexOf('-w') > -1) {
    input = './src/debug.ts';
}

export default {
    input: input,
    output: [
        { file: pkg.main, name: 'json2html', format: 'umd', sourcemap: false },
        { file: pkg.module, format: 'esm', sourcemap: false }
    ],
    external: [],
    plugins: [
        typescript(),
        commonjs(),
        nodeResolve(),
        json(),
        string({
            include: 'src/res/*.{css,txt,js}'
        })
    ]
} as rollup.RollupOptions;
