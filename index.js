'use strict';

const Sqlite3 = require('sqlite3');

const Routes = require('./lib/routes');
const Auth = require('./lib/auth');

const DB_FILE = __dirname + '/data/dindin.sqlite';

exports.register = function (server, options, next) {

    const db = new Sqlite3.Database(DB_FILE);

    server.bind({ db: db });

    server.register(require('hapi-auth-bearer-token'), (err) => {

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
