const accessToken = require('./accessToken');

const authMiddleware = (req, res, next) => {
  const { authToken } = req.headers;

  try {
    const user = accessToken.decodeAccessToken(authToken);
    req.user = user;
    next();
  } catch(error) {
    res.status(401).json({ message: 'Invalid access token.'});
  }
}

module.exports = authMiddleware;