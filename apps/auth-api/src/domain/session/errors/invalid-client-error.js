class InvalidClientError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

module.exports = InvalidClientError;
