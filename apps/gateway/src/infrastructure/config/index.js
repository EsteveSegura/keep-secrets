const env = process.env.NODE_ENV;

const run = {
  server: {
    port: process.env.GATEWAY_PORT || 3000,
  },
  keepsecrets: {
    signature: process.env.JWT_KEY || 'MySuperSecret',
    allowedClient: process.env.ALLOWED_AUDS || 'web',
  },
};

const test = {
  server: {
    port: 3000,
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
