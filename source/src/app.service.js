var request = require('superagent');
var legacyIESupport = require('superagent-legacyiesupport');

module.exports = {
    getPeople: getPeople
};

function getPeople(apiUrl, callback) {
    return request.get(apiUrl)
        .use(legacyIESupport)
        .end(callback);
}