const jwt = require('jsonwebtoken');
const {keepsecrets: {signature}} = require('../../config');

const tokenValidator = async (req, res, next) => {
  const {headers} = req;

  if (!headers['authorization']) {
    next();
    return;
  }
  const [bearer, token] = headers['authorization'].split(' ');

  if (bearer.toLowerCase() !== 'bearer') {
    return res.status(400).json({message: 'Invalid bearer token.'});
  }

  try {
    await jwt.verify(token, signature);
    next();
  } catch (err) {
    return res.status(403).json({message: 'Invalid token'});
  }
};

module.exports = tokenValidator;
