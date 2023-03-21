class SaveSecretCommand {
  constructor({payload, expireAt}) {
    this.payload = payload;
    this.expireAt = expireAt;
  }
}

module.exports = SaveSecretCommand;
