class DeleteSecretCommand {
  constructor({id, secretKey}) {
    this.id = id;
    this.secretKey = secretKey;
  }
}

module.exports = DeleteSecretCommand;
