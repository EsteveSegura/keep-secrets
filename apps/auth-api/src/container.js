const awilix = require('awilix');

const logger = require('./infrastructure/logger/logger');
const {v4: uuidv4} = require('uuid');
const idGenerator = require('./domain/services/id-generator');
const createSession = require('./application/create_session');
const jwt = require('jsonwebtoken');

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  logger: awilix.asValue(logger),
  uuidv4: awilix.asValue(uuidv4),
  idGenerator: awilix.asFunction(idGenerator),
  createSession: awilix.asClass(createSession),
  jwt: awilix.asValue(jwt)
});

module.exports = container;
