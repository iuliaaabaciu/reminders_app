const jwt = require('jsonwebtoken');

const secretKey = 'b55a284133937656f59727bb3e0f6078f99d54ce551b068a8eb0c1ea4cdd7e4727fb66073eb5bd83bd24174965db7abc3c3b929e56ca200795cbc14c0f7fdace';

exports.generateAccessToken = (user) => 
  jwt.sign({ 
    id: user.id, 
    email: user.email,
  }, secretKey);

exports.decodeAccessToken = (accessToken) => 
  jwt.verify(accessToken, secretKey);