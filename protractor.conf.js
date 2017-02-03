require('dotenv').config()
var ancillaryMethods = require('./ancillaryMethods.js');

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
        events: ancillaryMethods.getNumMorpheuzEventsOfCurrentMonthForUserId(18),
        date: {
            currentMonth: ancillaryMethods.getDates()[0],
            twoMonthsBefore: ancillaryMethods.getDates()[1],
            oneMonthBefore: ancillaryMethods.getDates()[2]
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