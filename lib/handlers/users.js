var Bcrypt = require('bcrypt-nodejs');

exports.login = function(request, reply) {

    var sql = 'SELECT * from users where username = ?';

    this.db.get(sql, [request.payload.username], function(err, result) {

        if (err) {
            throw err;
        }

        var user = result;

        if (!user) {
            return reply('Not authorized').code(401);
        }

        Bcrypt.compare(request.payload.password, user.password, function(err, res) {
            if (!res) {
                return reply('Not authorized').code(401);
            }

            reply({
                token: user.token
            });
        });

    });

};