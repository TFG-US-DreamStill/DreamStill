var fs = require('fs');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports = function() {
    this.setDefaultTimeout(60 * 1000);
    this.registerHandler('AfterScenario', function (event, callback) {
        // clear localStorage
        //browser.executeScript('window.localStorage.clear();');
        callback();
    });

    this.Given(/I am on the homepage/, function(next) {
        browser.ignoreSynchronization = true;
        browser.get('/');
        next();
    });

    this.Then(/register to the Login Page as "([^"]*)"$/, function(text, next) {
            element(by.name('username')).sendKeys(text);
            element(by.name('password')).sendKeys("");
            element(by.css('#loginContainer #flow-button')).click();
            next();
    });

    this.Then(/the title should equal "([^"]*)"$/, function(text, next) {
            expect(browser.getTitle())
            .to.eventually.equal(text)
            .and.notify(next);
            //next();
    });
};