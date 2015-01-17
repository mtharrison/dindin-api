var Mysql = require('mysql');
var Bcrypt = require('bcrypt');

var routes = require('./routes');
var methods = require('./methods');
var auth = require('./auth');


exports.register = function (server, options, next) {

    var connection = Mysql.createConnection(options.db);

    server.bind({
        db: connection
    });

    // Add server methods

    server.method('retrieve', methods.retrieve, {
        cache: {
            expiresIn: 10 * 60 * 1000 // 10 mins
        },
        bind: connection
    });

    server.register(require('hapi-auth-basic'), function (err) {

        if (err) {
            return next(err);
        }

        server.auth.strategy('api', 'basic', { 
            validateFunc: function (username, password, callback) {
                auth.validateFunc(connection, username, password, callback);
            }
        });

        // Add routes

        server.route(routes(connection));

        next();

    });
};

exports.register.attributes = {
    pkg: require('./package.json')
};