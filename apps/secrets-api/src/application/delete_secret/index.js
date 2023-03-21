const NotFoundSecretError = require('../../domain/secret/errors/not-found-secret-error');

class DeleteSecret {
  constructor({secretRepository}) {
    this.secretRepository = secretRepository;
  }

  async execute({id}) {
    const findSecret = await this.secretRepository.findById(id);

    this._assertSecretExists({secret: findSecret});
    await this.secretRepository.delete(id);
  }

  _assertSecretExists({secret}) {
    if (!secret) {
      throw new NotFoundSecretError('Secret not found');
    }
  }
}

module.exports = DeleteSecret;
