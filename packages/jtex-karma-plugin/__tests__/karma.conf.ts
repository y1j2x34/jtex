const path = require('path');
module.exports = config => {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'jtex'],
        files: ['__tests__/**/*.spec.js'],
        // preprocessors: {
        //     '__tests__/**/*.spec.ts': ['sourcemap']
        // },
        mime: {
            'text/x-typescript': ['ts', 'tsx']
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        autoWatch: true,
        singleRun: false,
        concurrency: Infinity,
        browsers: ['Chrome'],
        plugins: [path.resolve(__dirname, '../lib/index.js'), 'karma-mocha', 'karma-chrome-launcher']
    });
};
