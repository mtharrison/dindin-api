var Sqlite3 = require('sqlite3');

var Routes = require('./lib/routes');
var Auth = require('./lib/auth');

var DB_FILE = __dirname + '/data/dindin.sqlite';

exports.register = function (server, options, next) {

    var db = new Sqlite3.Database(DB_FILE);

    server.bind({db: db});

    server.register(require('hapi-auth-bearer-token'), function (err) {

        if (err) {
            return next(err);
        }

        server.auth.strategy('api', 'bearer-access-token', { 
            validateFunc: Auth.validateFunc.bind(db)
        });

        server.route(Routes);

        next();

    });

};

exports.register.attributes = {
    pkg: require('./package.json')
};