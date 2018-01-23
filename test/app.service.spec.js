var nock = require('nock');
var proxyquire = require('proxyquire').noPreserveCache();
var chai = require('chai');
var sinon = require('sinon');
var assert = chai.assert;

var config = {
    apiUrl: "http://www.test.com",
};

var getPeopleApi = proxyquire('../source/src/app.service', { 'superagent-legacyiesupport': sinon.stub() });

describe("When getPeopleApi called", function () {
    beforeEach(function () {
        nock(config.apiUrl)
            .filteringPath(function () { return '/'; })
            .persist()
            .get('/')
            .reply(200, { value: 'hello' });
    });

    afterEach(function () {
        nock.cleanAll();
    });

    it("should execute callback once getPeopleApi returned", function (done) {
        var callback = function (err, res) {
            assert.isDefined(res);
            done();
            nock.isDone();
        };
        getPeopleApi.getPeople(config.apiUrl, callback);
    });
});