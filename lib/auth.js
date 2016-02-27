'use strict';

exports.validateFunc = function (token, callback) {

    this.get('SELECT * FROM users WHERE token = ?', [token], (err, result) => {

        if (err) {
            return callback(err, false);
        }

        const user = result;

        if (!user) {
            return callback(null, false);
        }

        callback(null, true, {
            id: user.id,
            username: user.username
        });
    });
};
