const tsp = require('rollup-plugin-typescript2');
const commonjs = require('@rollup/plugin-commonjs');
const nodeResolve = require('@rollup/plugin-node-resolve').nodeResolve;
const pkg = require('../../package.json');
const path = require('path');

const srcDirectory = path.resolve(__dirname, '../../src');
const distDirectory = path.resolve(__dirname, '../..', pkg.distDir);

const pkgdependencies = Object.keys(pkg.dependencies);

module.exports = [
    {
        input: path.resolve(srcDirectory, 'index.ts'),
        output: {
            file: path.resolve(distDirectory, 'index.js'),
            format: 'cjs',
            exports: 'default'
        },
        plugins: [
            tsp({
                tsconfig: path.resolve(__dirname, '../../tsconfig.json'),
                tsconfigOverride: {
                    compilerOptions: {
                        declaration: true,
                        declarationDir: distDirectory
                    }
                }
            }),
            commonjs(),
            nodeResolve()
        ],
        externals: id => pkgdependencies.includes(id)
    }
];
