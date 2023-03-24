const awilix = require('awilix');

const logger = require('./infrastructure/logger/logger');
const MUUID = require('uuid-mongodb');
const MongoSecretRepository = require('./infrastructure/persistance/mongo/mongo-secret-repository');
const secretDocumentParser = require('./infrastructure/persistance/mongo/secret-document-parser');
const mongoDbHandler = require('./infrastructure/persistance/mongo/db-handler');
const crypto = require('crypto');
const {v4: uuidv4} = require('uuid');
const SaveSecret = require('./application/save_secret');
const idGenerator = require('./domain/services/id-generator');
const tokenGenerator = require('./domain/services/token-generator');
const Cipher = require('./domain/services/cipher');
const findSecret = require('./application/find_secret');
const deleteSecret = require('./application/delete_secret');
const garbageCollector = require('./infrastructure/services/garbage-collector');

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  logger: awilix.asValue(logger),
  muid: awilix.asValue(MUUID),
  secretRepository: awilix.asClass(MongoSecretRepository),
  secretDocumentParser: awilix.asFunction(secretDocumentParser),
  mongoDbHandler: awilix.asFunction(mongoDbHandler),
  crypto: awilix.asValue(crypto),
  uuidv4: awilix.asValue(uuidv4),
  saveSecret: awilix.asClass(SaveSecret),
  idGenerator: awilix.asFunction(idGenerator),
  tokenGenerator: awilix.asFunction(tokenGenerator),
  cipher: awilix.asClass(Cipher),
  findSecret: awilix.asClass(findSecret),
  deleteSecret: awilix.asClass(deleteSecret),
  global: awilix.asValue(global),
  garbageCollector: awilix.asClass(garbageCollector),
});

module.exports = container;
