const InvalidSessionError = require('./errors/invalid-session-error');

class Session {
  constructor({id, aud, expireAt, createdAt}) {
    this._id = id;
    this._aud = aud;
    this._expireAt = expireAt;
    this._createdAt = createdAt;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    if (!value) {
      throw new InvalidSessionError('Field id in Session cannot be empty');
    }
    this._id = value;
  }

  set aud(aud) {
    if (!aud) {
      throw new InvalidSessionError('Field aud in Session cannot be empty');
    }

    this._aud = aud;
  }

  get aud() {
    return this._aud;
  }

  get expireAt() {
    return this._expireAt;
  }

  set expireAt(value) {
    if (!value) {
      throw new InvalidSessionError('Field expireAt in Session cannot be empty');
    }

    this._expireAt = value;
  }

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(value) {
    if (!value) {
      throw new InvalidSessionError('Field createdAt in Session cannot be empty');
    }

    this._createdAt = value;
  }
}

module.exports = Session;
