const tsp = require('rollup-plugin-typescript2');
const pkg = require('../../package.json');
const path = require('path');

const srcDirectory = path.resolve(__dirname, '../../src');
const distDirectory = path.resolve(__dirname, '../..', pkg.distDir);

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
            })
        ]
    }
];
