//CONTROLLERS/AUTH
const User = require('../models/user');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const user = new User({
        email: email, 
        password: hashedPw,
        firstName: firstName, 
        lastName: lastName,
      });
      return user.save();
    })
    .then(result => {
      const token = jwt.sign({
        email: email,
        userId: result._id
        }, 'somesuperdupersecretsillywilly', 
        { expiresIn: '1hr'}
      );
      res.status(201).json({message: 'User Created!', token: token, userId: result._id });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}
exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email: email})
    .then(user => {
      if (!user){
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong Password!');
        error.statusCode = 401;
        res.status(401);
        throw error;
      }
      const token = jwt.sign({
        email: loadedUser.email,
        userId: loadedUser._id.toString()
        }, 'somesuperdupersecretsillywilly', 
        { expiresIn: '1hr'}
      );
      res.status(200)
      .json({token: token, userId: loadedUser._id.toString()});
    })
    .catch(err=> {
      if (!err.statusCode) {
        console.log("auth/login error")
        err.statusCode = 500;
      }
      next(err);
    })
}
exports.fetchUser = async (req, res, next) => {
  const user = await User.findOne({_id: req.userId});
  res.send(user);
}
exports.checkUserEmails = async (req, res, next) => {
  const emailExists = await User.findOne(
    {email: req.headers.email}, {email: 1});
  res.send(emailExists);
}