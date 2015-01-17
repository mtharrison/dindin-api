exports.retrieve = function(id, callback) {

    this.query('SELECT * FROM recipes WHERE id = ?', [id], function(err, results) {

        if (err) {
            return callback(err, null);
        }

        callback(null, results[0]);
    });

};