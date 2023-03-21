const InvalidSecretError = require('./errors/invalid-secret-error');

class Secret {
  constructor({id, secret, iv, expireAt, createdAt, updatedAt}) {
    this._createdAt = createdAt;
    this._id = id;
    this._secret = secret;
    this._iv = iv;
    this._expireAt = expireAt;
    this._updatedAt = updatedAt;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    if (!value) {
      throw new InvalidSecretError('Field id in Secret cannot be empty');
    }
    this._id = value;
  }

  get secret() {
    return this._secret;
  }

  set secret(value) {
    if (!value) {
      throw new InvalidSecretError('Field secret in Secret cannot be empty');
    }

    this._secret = value;
  }

  get iv() {
    return this._iv;
  }

  set iv(value) {
    if (!value) {
      throw new InvalidSecretError('Field iv in Secret cannot be empty');
    }

    this._iv = value;
  }

  get expireAt() {
    return this._expireAt;
  }

  set expireAt(value) {
    if (!value) {
      throw new InvalidSecretError('Field expireAt in Secret cannot be empty');
    }

    this._expireAt = value;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  set updatedAt(value) {
    if (!value) {
      throw new InvalidSecretError('Field updatedAt in Secret cannot be empty');
    }

    this._updatedAt = value;
  }

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(value) {
    if (!value) {
      throw new InvalidSecretError('Field createdAt in Secret cannot be empty');
    }

    this._createdAt = value;
  }
}

module.exports = Secret;
