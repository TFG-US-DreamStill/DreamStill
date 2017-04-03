var fs = require('fs');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

var params = browser.params;

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

    this.Then(/login to the Login Page as "([^"]*)"$/, function(text, next) {
            element.all(by.name('username')).get(0).sendKeys(text);
            element.all(by.name('password')).get(0).sendKeys(params.passwords[text]);
            element(by.css('#loginContainer #flow-button')).click();
            next();
    });

    this.Then(/the title should equal "([^"]*)"$/, function(text, next) {
            browser.waitForAngular();
            browser.sleep(5000); 
            expect(browser.getTitle())
            .to.eventually.equal(text)
            .and.notify(next);
    });

    this.Then(/I logout$/, function(next) {
            element(by.css('.menu-button')).click();
            element.all(by.css('.mdMenuItem')).get(3).click();
            next();
    });
    
};