const getSecret = require('./get-secret');
const createSecret = require('./create-secret');
const deleteSecret = require('./delete-secret');

module.exports = {
    paths:{
        '/secrets': {
            ...createSecret,
        },
        '/secrets/{id}/{secretKey}': {
            ...getSecret,
            ...deleteSecret,
        }

    }
}