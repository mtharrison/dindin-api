var Bcrypt = require('bcrypt');

module.exports = [{
    method: 'GET',
    path: '/api/recipes',
    handler: function (request, reply) {

        var sql = 'SELECT * FROM recipes';
        var params = [];

        if (request.query.cuisine) {
            sql += ' WHERE cuisine = ?';
            params.push(request.query.cuisine);
        }

        this.db.all(sql, params, function (err, results) {

            if (err) {
                throw err;
            }

            reply(results);
        });
    }
}, {
    method: 'GET',
    path: '/api/recipes/{id}',
    handler: function (request, reply) {

        this.db.get('SELECT * FROM recipes WHERE id = ?', [request.params.id], function(err, result) {

            if (err) {
                throw err;
            }

            if (result) {
                reply(result);
            } else {
                reply('Not found').code(404);
            }
        });
    }
}, {
    method: 'POST',
    path: '/api/recipes',
    config: {
        auth: 'api',
        payload: {                  
            output: 'data',
            parse: true
        }
    },
    handler: function (request, reply) {

        var sql = 'INSERT INTO recipes (name, cooking_time, prep_time, serves, cuisine, ingredients, directions, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

        this.db.run(sql, 
        [
            request.payload.name,
            request.payload.cooking_time,
            request.payload.prep_time,
            request.payload.serves,
            request.payload.cuisine,
            request.payload.ingredients,
            request.payload.directions,
            request.auth.credentials.id,
        ], 
        function (err) {

            if(err) {
                throw err;
            }

            reply({status: 'ok'});
        });
    }
}, {
    method: 'POST',
    path: '/api/recipes/{id}/star',
    handler: function (request, reply) {

        var sql = 'UPDATE recipes SET stars = stars + 1 WHERE id = ?';

        this.db.run(sql, 
        [
            request.params.id
        ], 
        function (err) {

            if(err) {
                throw err;
            }

            reply({status: 'ok'});
        });
    }
}, {
    method: 'POST',
    path: '/api/login',
    config: {
        payload: {                  
            output: 'data',
            parse: true
        }
    },
    handler: function (request, reply) {

        var sql = 'SELECT * from users where username = ?';

        this.db.get(sql, [request.payload.username], function (err, result) {

            if (err) {
                throw err;
            }

            var user = result;

            if(!user) {
                return reply('Not authorized').code(401);
            }

            Bcrypt.compare(request.payload.password, user.password, function(err, res) {
                if(!res) {
                    return reply('Not authorized').code(401);
                }

                reply({
                    token: user.token
                });
            });

        });

    }
}];