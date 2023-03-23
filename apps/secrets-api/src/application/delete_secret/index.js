const NotFoundSecretError = require('../../domain/secret/errors/not-found-secret-error');

class DeleteSecret {
  constructor({ secretRepository, cipher }) {
    this.secretRepository = secretRepository;
    this.cipher = cipher;
  }

  async execute({ id, secretKey }) {
    const findSecret = await this.secretRepository.findById(id);
    this._assertSecretExists({ secret: findSecret });
    this._attempToDecrypt({ secret: findSecret, secretKey })
    await this.secretRepository.delete(id);
  }

  _assertSecretExists({ secret }) {
    if (!secret) {
      throw new NotFoundSecretError('Secret not found');
    }
  }

  _attempToDecrypt({ secret, secretKey }) {
    const hash = { content: secret._secret, secretKey, iv: secret._iv };
    return this.cipher.decrypt(hash);
  }
}

module.exports = DeleteSecret;
