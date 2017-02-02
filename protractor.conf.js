require('dotenv').config()

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

    // This can be changed via the command line as:
    // --params.login.user 'ngrocks'
    params: {
        passwords: {
        test: process.env.TEST_PASSWORD,
        juanra: process.env.JUANRA_PASSWORD
        },
        date: {
            currentMonth: '',
            twoMonthsBefore: '',
            oneMonthBefore: ''
        }
    },

    framework: 'custom',
    frameworkPath: 'node_modules/protractor-cucumber-framework',

    specs: [
        'features/*.feature'
    ],

    jasmineNodeOpts: {
        showColors: true
    },
    useAllAngular2AppRoots: true,
    cucumberOpts: {
        require: 'features/step_definitions/*.js',
        format: 'pretty', // or summary
        keepAlive: false
    }
};