class AlreadyExistsSecretError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

module.exports = AlreadyExistsSecretError;
