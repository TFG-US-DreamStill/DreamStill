var fs = require('fs');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports = function() {
    this.registerHandler('AfterScenario', function (event, callback) {
        // clear localStorage
        //browser.executeScript('window.localStorage.clear();');
        callback();
    });

    this.Given(/^I am on the loginpage$/, function(next) {
        browser.ignoreSynchronization = true;
        browser.get('/');
        next();
    });

    this.Then(/login to the Login Page that time as "([^"]*)"$/, function(text, next) {
            element.all(by.name('username')).get(0).sendKeys(text);
            element.all(by.name('password')).get(0).sendKeys("");
            element(by.css('#loginContainer #flow-button')).click();
            next();
    });

    this.Then(/^there are must be "([^"]*)" events on current month$/, function(text, next) {
            browser.waitForAngular();
            browser.sleep(5000); 
            console.log((element.all(by.css('.cal-event'))));
            //next();
    });

};