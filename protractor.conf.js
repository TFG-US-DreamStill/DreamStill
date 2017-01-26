exports.config = {
    baseUrl: 'http://localhost:3000',
    getPageTimeout: 60000,
    allScriptsTimeout: 500000,
    seleniumAddress: 'http://localhost:4444/wd/hub',

    capabilities: {
        browserName: 'chrome',
        version: '',
        platform: 'ANY'
    },

    framework: 'custom',
    frameworkPath: 'node_modules/protractor-cucumber-framework',

    specs: [
        'features/*.feature'
    ],

    jasmineNodeOpts: {
        showColors: true
    },
    //useAllAngular2AppRoots: true,
    cucumberOpts: {
        require: 'features/stepDefinitions.js',
        format: 'pretty', // or summary
        keepAlive: false
    }
};