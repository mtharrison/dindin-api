var Bcrypt = require('bcrypt');

exports.validateFunc = function(db, username, password, callback) {

    db.get('SELECT * FROM users WHERE username = ?', [username], function(err, user) {

        if (err) {
            return callback(err, false);
        }

        Bcrypt.compare(password, user.password, function(err, isValid) {
            callback(err, isValid, {
                id: user.id,
                username: user.username
            });
        });

    });
}