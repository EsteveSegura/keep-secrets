class InvalidSecretError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

module.exports = InvalidSecretError;
