class NotFoundSecretError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

module.exports = NotFoundSecretError;
