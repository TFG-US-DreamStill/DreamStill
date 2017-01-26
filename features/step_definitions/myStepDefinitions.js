var fs = require('fs');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports = function() {

    this.registerHandler('AfterScenario', function (event, callback) {
        // clear localStorage
        browser.executeScript('window.localStorage.clear();');
        callback();
    });

    this.Given(/I am on the homepage/, function(next) {
        browser.get('/');
        next();
    });

    this.Then(/the title should equal "([^"]*)"$/, function(text, next) {
        expect(browser.getTitle())
            .to.eventually.equal(text)
            .and.notify(next);
    });
};