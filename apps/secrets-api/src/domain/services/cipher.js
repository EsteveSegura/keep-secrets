const FailedDecryptError = require('../errors/failed-decrypt-error');

class Cipher {
  constructor({crypto}) {
    this.crypto = crypto;
  }

  encrypt(text) {
    const secretKey = this.crypto.randomBytes(32);
    const iv = this.crypto.randomBytes(16);
    const cipher = this.crypto.createCipheriv('aes-256-ctr', secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
      iv: iv.toString('hex'),
      secret: encrypted.toString('hex'),
      secretKey: secretKey.toString('hex'),
    };
  }

  decrypt(hash) {
    try {
      const secretKey = Buffer.from(hash.secretKey, 'hex');
      const iv = Buffer.from(hash.iv, 'hex');

      const decipher = this.crypto.createCipheriv('aes-256-ctr', secretKey, iv);
      const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

      return decrypted.toString();
    } catch (err) {
      throw new FailedDecryptError('Decrypt failed');
    }
  }
}

module.exports = Cipher;
