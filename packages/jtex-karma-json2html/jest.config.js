const path = require('path');

module.exports = {
    preset: 'ts-jest',
    transform: {
        '^.+\\.(txt|css)$': 'jest-text-transformer'
    },
    globals: {
        'ts-jest': {
            tsconfig: path.resolve(__dirname, './__tests__/tsconfig.json')
        }
    },
    // runner: 'jest-runner-tsc',
    moduleFileExtensions: ['ts', 'tsx', 'css', 'txt', 'js'],
    testEnvironment: 'node',
    testMatch: [path.resolve(__dirname, '__tests__/**/*.spec.ts')],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/node_modules/**'],
    coveragePathIgnorePatterns: ['src/debug.ts'],
    coverageDirectory: './report/coverage',
    coverageReporters: ['cobertura', 'html', 'text-summary'],
    reporters: [
        'default',
        [
            'jest-html-reporter',
            {
                pageTitle: '@jtex/karma-plugin Test Report',
                outputPath: './report/test-report.html'
            }
        ]
    ]
};
