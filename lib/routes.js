module.exports = function (db) {

    return [{
        method: 'GET',
        path: '/recipes',
        handler: function (request, reply) {

            var sql = 'SELECT * FROM recipes';
            var params = [];

            if (request.query.cuisine) {
                sql += ' WHERE cuisine = ?';
                params.push(request.query.cuisine);
            }

            db.all(sql, params, function (err, results) {

                if (err) {
                    throw err;
                }

                reply(results);
            });
        }
    }, {
        method: 'GET',
        path: '/recipes/{id}',
        handler: function (request, reply) {

            request.server.methods.retrieve(request.params.id, function (err, result) {

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
        path: '/recipes',
        config: {
            auth: 'api',
            payload: {                  
                output: 'data',
                parse: true
            }
        },
        handler: function (request, reply) {

            var sql = 'INSERT INTO recipes (name, cooking_time, prep_time, serves, cuisine, ingredients, directions, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

            db.run(sql, 
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
    }];

};