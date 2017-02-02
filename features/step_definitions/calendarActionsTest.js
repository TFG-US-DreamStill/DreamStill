var fs = require('fs');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

var params = browser.params;

module.exports = function() {
    this.registerHandler('AfterScenario', function (event, callback) {
        // clear localStorage
        //browser.executeScript('window.localStorage.clear();');
        callback();
    });

    this.Given(/^I am on the calendar page login as "([^"]*)"$/, function (text, next) {
        browser.ignoreSynchronization = true;
        next();
    });

    this.Then(/^click to the calendar button "([^"]*)" two times$/, function (text, next) {
        if (text==="Previous"){
            element.all(by.css('.purple-button')).get(0).click();
            element.all(by.css('.purple-button')).get(0).click();
            next();
        }
        if (text==="Today"){
            element.all(by.css('.purple-button')).get(1).click();
            element.all(by.css('.purple-button')).get(1).click();
            next();
        }
        if (text==="Next") {
            element.all(by.css('.purple-button')).get(2).click();
            element.all(by.css('.purple-button')).get(2).click();
            next();
        }
    });

    this.Then(/^we must be on the "([^"]*)" month$/, function (text, next) {
        var title = element(by.css('.title h3'));
        element(by.css('.title h3')).getText().then(function (value) {

            expect(value).to.equal(text);
            next();
        });
        
    });

    this.Then(/^click to the calendar button "([^"]*)" one time$/, function (text, next) {
        if (text==="Previous"){
            element.all(by.css('.purple-button')).get(0).click();
            next();
        }
        if (text==="Today"){
            element.all(by.css('.purple-button')).get(1).click();
            next();
        }
        if (text==="Next") {
            element.all(by.css('.purple-button')).get(2).click();
            next();
        }
    });

};