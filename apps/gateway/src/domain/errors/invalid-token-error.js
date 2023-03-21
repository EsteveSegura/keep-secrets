class InvalidTokenError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

module.exports = InvalidTokenError;
