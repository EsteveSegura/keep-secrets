const {MongoClient: mongo} = require('mongodb');
const {mongo: {mongoConnectionUri, dbName, mongoTimeout}} = require('../../config');
let db;
let client;
let instance;

const _connect = async () => {
  try {
    client = await mongo.connect(mongoConnectionUri,
        {useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: mongoTimeout});
    db = await client.db(dbName);
    return db;
  } catch (err) {
    const error = err.message ? err.message : err;
    console.error(`Error in database connection: ${error}`);
    throw new Error(`Error in database connection: ${error}`);
  }
};

const MongoDbHandler = (({logger}) => {
  const createInstance = async () => {
    const db = await _connect();

    await db.collection('secrets').createIndex( {'expireAt': 1}, {expireAfterSeconds: 1} );
    await db.collection('secrets').createIndexes([
      {name: 'token', key: {token: 1}},
      {name: '_id', key: {_id: 1}}],
    (err, result) => {
      if (!err) {
        logger.info('mongodb indexes created');
      }
    });

    return db;
  };

  return {
    getInstance: async () => {
      if (!instance) {
        instance = await createInstance();
      }
      return instance;
    },
    disconnect: () => {
      if (client) {
        client.close();
      }
      db = null;
      instance = null;
      client = null;
    },
  };
});

module.exports = MongoDbHandler;
