var Recipes = require('./handlers/recipes');
var Users = require('./handlers/users');

module.exports = [{
    method: 'GET',
    path: '/api/recipes',
    handler: Recipes.find
}, {
    method: 'GET',
    path: '/api/recipes/{id}',
    handler: Recipes.findOne
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
    handler: Recipes.create
}, {
    method: 'POST',
    path: '/api/recipes/{id}/star',
    handler: Recipes.star
}, {
    method: 'POST',
    path: '/api/login',
    config: {
        payload: {                  
            output: 'data',
            parse: true
        }
    },
    handler: Users.login
}];