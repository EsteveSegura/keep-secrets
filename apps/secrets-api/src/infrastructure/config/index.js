const env = process.env.NODE_ENV;
const mongoTimeout = 5000;
const mongoConnectionUri = process.env.MONGO_URI || 'mongodb://admin:admin@localhost:27017/';

const run = {
  server: {
    port: process.env.SECRET_API_PORT || 3001,
  },
  mongo: {
    mongoConnectionUri,
    mongoTimeout,
    dbName: 'secrets',
  },
};

const test = {
  server: {
    port: 3000,
  },
  mongo: {
    mongoConnectionUri: null,
    mongoTimeout: 1,
    dbName: 'NOT EXISTS',
  },
};

const config = {
  run,
  test,
};

module.exports = config[env];
