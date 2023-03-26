const createSession = require('./auth/create-session');
const getSecret = require('./secrets/get-secret');
const createSecret = require('./secrets/create-secret');
const deleteSecret = require('./secrets/delete-secret');

module.exports = {
    paths:{
        '/auth': {
            ...createSession,
        },
        '/secrets': {
            ...createSecret,
        },
        '/secrets/{id}/{secretKey}': {
            ...getSecret,
            ...deleteSecret,
        }
    }
}