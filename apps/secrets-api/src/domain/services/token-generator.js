const tokenGenerator = ({crypto}) => {
  return {
    generate: () => crypto.randomBytes(32).toString('hex'),
  };
};

module.exports = tokenGenerator;
