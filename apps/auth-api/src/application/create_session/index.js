const FindSessionReponse = require('./create-session-response');
const InvalidClientError = require('../../domain/session/errors/invalid-client-error');
const {keepsecrets: {signature, allowedClient}} = require('../../infrastructure/config')

class CreateSession {
  constructor({ jwt, idGenerator }) {
    this.jwt = jwt;
    this.idGenerator = idGenerator
  }

  async execute({ aud }) {
    this._checkIfAudExists(aud);
    const iat = Date.now();
    const exp = iat + 86400000
    const sub = this.idGenerator.generate();
    const scope = "read write";
    
    const accessToken = this.jwt.sign({ iat, exp, aud, sub, scope }, signature);
    return new FindSessionReponse({ accessToken });
  }

  _checkIfAudExists(aud) {
    const clients = allowedClient.split(',');
    if(!clients.includes(aud)) {
      throw new InvalidClientError('Invalid client');
    }
  }
}

module.exports = CreateSession;
