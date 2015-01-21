exports.retrieve = function(id, callback) {

    this.get('SELECT * FROM recipes WHERE id = ?', [id], function(err, result) {

        if (err) {
            return callback(err, null);
        }

        callback(null, result);
    });

};