const env = process.env.NODE_ENV;

const run = {
  server: {
    port: 3000,
  },
  keepsecrets: {
    signature: process.env.JWT_KEY || 'MySuperSecret',
  },
};

const test = {
  server: {
    port: 3000,
  },
  keepsecrets: {
    signature: 'MySuperSecret',
  },
};

const config = {
  run,
  test,
};

module.exports = config[env];
