const Secret = require('../../domain/secret/Secret');
const AlreadyExistsSecretError = require('../../domain/secret/errors/already-exists-secret-error');
const SaveSecretResponse = require('./save-secret-response');

class SaveSecret {
  constructor({idGenerator, secretRepository, cipher, garbageCollector, logger}) {
    this.idGenerator = idGenerator;
    this.secretRepository = secretRepository;
    this.cipher = cipher;
    this.garbageCollector = garbageCollector;
    this.logger = logger;
  }

  async execute({payload, expireAt}) {
    const id = this.idGenerator.generate();
    const getSecret = await this.secretRepository.findById(id);
    this._assertSecretExists(getSecret);

    const {iv, secretKey, secret} = this._encryptPayload(payload);

    const currentDate = new Date();
    const expirationDate = new Date(currentDate.getTime() + expireAt * 60000);

    const secretDomain = new Secret({
      id,
      secret,
      iv,
      expireAt: expirationDate,
      createdAt: currentDate,
      updatedAt: currentDate,
    });

    await this.secretRepository.save(secretDomain);
    // Running garbageCollector for deleting all
    // remainins of the keys used for encryptios
    // and deleting all traces from RAM.
    this.garbageCollector.run();
    return new SaveSecretResponse({id, secretKey});
  }

  _assertSecretExists(secret) {
    if (secret) {
      throw new AlreadyExistsSecretError('Secret id already exists');
    }
  }

  _encryptPayload(payload) {
    const secretEncrypted = this.cipher.encrypt(payload);
    const {iv, secretKey, secret} = secretEncrypted;

    return {iv, secretKey, secret};
  }
}

module.exports = SaveSecret;
