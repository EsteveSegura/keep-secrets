const getSecret = require('./get-secret');
const createSecret = require('./create-secret');

module.exports = {
    paths:{
        '/secrets': {
            ...createSecret,
        },
        '/secrets/{id}/{secretKey}': {
            ...getSecret
        }

    }
}