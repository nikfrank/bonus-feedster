var express = require('express');
var MemoryStore = require('connect').session.MemoryStore;
var path = require('path');
var env = process.env.NODE_ENV || 'development';

//var RedisStore = require('connect-redis')(express);
//var redisClient = require('redis').createClient(14761, 'pub-redis-14761.us-west-1.1.azure.garantiadata.com');

module.exports = function (app) {

    app.set('port', process.env.PORT || 8500);
    app.set('views', __dirname+'/../app');
    app.engine('ejs', require('ejs').renderFile);
    app.use(express.favicon());
    app.use(express.static(__dirname + '/app'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'app')));

};
