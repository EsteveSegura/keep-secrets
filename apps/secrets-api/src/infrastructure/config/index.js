const env = process.env.NODE_ENV;
const mongoTimeout = 5000;
const mongoConnectionUri = process.env.MONGO_URI || 'mongodb://admin:admin@localhost:27017/';

const run = {
  server: {
    port: 3000,
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
