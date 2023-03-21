class FailedDecryptError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

module.exports = FailedDecryptError;
