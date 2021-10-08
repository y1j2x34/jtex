module.exports = {
    preset: 'ts-jest',
    globals: {
        'ts-jest': {
            tsconfig: './__tests__/tsconfig.json'
        }
    },
    testEnvironment: 'node',
    testMatch: ['**/__tests__/*.spec.ts'],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.ts', '!**/node_modules/**'],
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
