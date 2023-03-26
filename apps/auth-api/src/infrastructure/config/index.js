const env = process.env.NODE_ENV;

const run = {
  server: {
    port: process.env.AUTH_API_PORT || 3003,
  },
  keepsecrets: {
    signature: process.env.JWT_KEY || 'MySuperSecret',
    allowedClient: process.env.ALLOWED_AUDS || 'web',
  },
};

const test = {
  server: {
    port: 3003,
  },
  keepsecrets: {
    signature: 'MySuperSecret',
    allowedClient: 'web',
  },
};

const config = {
  run,
  test,
};

module.exports = config[env];
