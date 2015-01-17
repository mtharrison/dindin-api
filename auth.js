exports.validateFunc = function(connection, username, password, callback) {

    connection.query('SELECT * FROM users WHERE username = ?', [username], function(err, results) {

        if (err) {
            return callback(err, false);
        }

        if (results.length !== 1) {
            return callback(null, false);
        }

        var user = results[0];

        Bcrypt.compare(password, user.password, function(err, isValid) {
            callback(err, isValid, {
                id: user.id,
                username: user.username
            });
        });

    });
}