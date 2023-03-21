const SECRETS = 'secrets';

class MongoSecretRepository {
  constructor({mongoDbHandler, secretDocumentParser, muid}) {
    this.secretDocumentParser = secretDocumentParser;
    this.mongoDbHandler = mongoDbHandler;
    this.muid = muid;
  }

  async findById(id) {
    const db = await this.mongoDbHandler.getInstance();
    try {
      const secretDomain = await db.collection(SECRETS).findOne({_id: this.muid.from(id)});
      return secretDomain ? this.secretDocumentParser.toDomain(secretDomain) : null;
    } catch (err) {
      throw new Error(err);
    }
  }

  async save(secret) {
    const db = await this.mongoDbHandler.getInstance();
    try {
      const secretDomain = this.secretDocumentParser.toDocument(secret);
      await db.collection(SECRETS).insertOne(secretDomain);

      return Promise.resolve();
    } catch (err) {
      throw new Error(err);
    }
  }

  async delete(id) {
    const db = await this.mongoDbHandler.getInstance();
    try {
      await db.collection(SECRETS).deleteOne({_id: this.muid.from(id)});
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = MongoSecretRepository;
