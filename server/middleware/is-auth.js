const jwt = require('jsonwebtoken');
const secretKey = require('./privateKey.json');

module.exports = async (req, res, next) => {
  var authHeader =  req.get('authorization');
  if (!authHeader) {
    const error = new Error('Not Authenticated - No Authorization Header');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, secretKey[0].jsonKey);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  } 
  if(!decodedToken){
    const error = new Error('Not Authenticated - Invalid Token');
    error.statusCode = 401;
    throw ErrorEvent;
  } 
  req.userId = decodedToken.userId;
  next();

};