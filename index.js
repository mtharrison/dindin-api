var sqlite3 = require('sqlite3');

var routes = require('./lib/routes');
var auth = require('./lib/auth');

var DB_FILE = __dirname + '/data/dindin.sqlite';

exports.register = function (server, options, next) {

    var db = new sqlite3.Database(DB_FILE, function (err) {

        if (err) {
            return next(err);
        }

        server.bind({
            db: db
        });

        // Register plugins

        server.register(require('hapi-auth-basic'), function (err) {

            if (err) {
                return next(err);
            }

            server.auth.strategy('api', 'basic', { 
                validateFunc: function (username, password, callback) {
                    auth.validateFunc(db, username, password, callback);
                }
            });

            // Add routes

            server.route(routes(db));

            next();

        });

    });

};

exports.register.attributes = {
    pkg: require('./package.json')
};