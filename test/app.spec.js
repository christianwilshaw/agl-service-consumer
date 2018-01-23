var nock = require('nock');
var proxyquire = require('proxyquire').noPreserveCache();
var chai = require('chai');
var sinon = require('sinon');
var assert = chai.assert;

var config = {
    api_url: "http://www.test.com",
};
var containerName = "#test";

var getPeopleJsonApp = proxyquire('../source/src/app', { 'superagent-legacyiesupport': sinon.stub() });
var staticResponse={};
var body = require('./mockjson/mockjson.json');

describe("When getPeopleJsonApp called", function () {
    staticResponse.body=body;
    beforeEach(function () {
        sinon.stub(getPeopleJsonApp,'writeMarkup');
    });
    it("should execute callback once returned", function (done) {
        var callback = function (err, res) {
            done();
            nock.isDone();
            assert.isDefined(res);
        };
        getPeopleJsonApp.processReturnedPeople('',staticResponse,containerName, config, callback);
    });
});
