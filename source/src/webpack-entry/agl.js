var app = require('../app');
var config = require('../config/config.js');

module.exports = {
    load: function(containerName,failCallBack) {
        app.load(containerName, config,failCallBack);
    }
};