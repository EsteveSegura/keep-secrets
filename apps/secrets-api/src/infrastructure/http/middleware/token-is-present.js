const jwt = require('jsonwebtoken');

const isTokenPresent = (req, res, next) => {
  const {headers} = req;

  if (!headers.authorization) {
    return res.status(400).json({message: 'Authorization not present'});
  }

  const [bearer, token] = headers.authorization.split(' ');

  if (bearer !== 'Bearer') {
    return res.status(400).json({message: 'Bearer token not present'});
  }

  const tokenDecoded = jwt.decode(token);

  req.token = tokenDecoded;
  next();
};

module.exports = isTokenPresent;
