class InvalidSessionError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

module.exports = InvalidSessionError;
