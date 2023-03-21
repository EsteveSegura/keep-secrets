const Secret = require('../../../domain/secret/Secret');

const mongoSecretParser = ({muid}) => {
  return {
    toDomain: ({
      createdAt,
      _id,
      secret,
      iv,
      expireAt,
      updatedAt,
    }) => {
      const id = (muid.from(_id)).toString();
      return new Secret({
        createdAt,
        id,
        secret,
        iv,
        expireAt,
        updatedAt,
      });
    },
    toDocument: ({
      createdAt,
      id,
      secret,
      iv,
      expireAt,
      updatedAt,
    }) => {
      const _id = muid.from(id);
      return {
        createdAt,
        _id,
        secret,
        iv,
        expireAt,
        updatedAt,
      };
    },
  };
};

module.exports = mongoSecretParser;
