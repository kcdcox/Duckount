//ROUTES/AUTH
const express = require('express');
const {body} = require('express-validator');
const User = require('../models/user')
const router = express.Router();
const auth = require('../middleware/is-auth')

const authController = require('../controllers/auth');

//SIGN UP
router.post('/api/signup', [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, {req}) => {
        return User.findOne({email:value}).then(userDoc => {
          if(userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }    
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({min: 5}),
    body('confirmPassword')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }
        return true;
      }),
    body('firstName')
      .trim()
      .not()
      .isEmpty(),
    body('lastName')
      .trim()
      .not()
      .isEmpty()  
  ],
  authController.signup
);

//LOGIN
router.post('/api/login', authController.login)

//FETCH USERS
router.get('/api/fetchUser', auth, authController.fetchUser)

//CHECK USER EMAILS
router.get('/api/checkUserEmails', authController.checkUserEmails)

module.exports = router;  