//CONTROLLERS/forms
const Feeding = require('../models/feeding');
const User = require('../models/user');
const {validationResult} = require('express-validator');

exports.addFeeding = async (req, res, next) => {
  //console.log(req.userId)
  //console.log(req.body);
  console.log(req.body.time)
  const userId = req.userId;
  const country = req.body.country;
  const city = req.body.city;
  const state = req.body.state;
  const dateTime = req.body.dateTime;
  const time = req.body.time;
  const date = req.body.date;
  const duckNumber = req.body.duckNumber;
  const foodType = req.body.foodType;
  const foodAmount = req.body.foodAmount;

  const feeding = new Feeding({userId, city, country, state, dateTime, time, date, duckNumber, foodType, foodAmount});

  Feeding.create(feeding)
  .then(res => {
    console.log(res);
    const feedId = res.id;
    User.findById(userId)
    .then(user => {
      const feedData = user.feedData;
      console.log(feedData);
      feedData.push(feedId);
      console.log(feedData);
      User.findByIdAndUpdate(userId, {feedData})
      .then(res => console.log(res))
      .catch(err => {
        if (!err.statusCode) {
          console.log("auth/login error")
          err.statusCode = 500;
        }
        next(err);
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        console.log("auth/login error")
        err.statusCode = 500;
      }
      next(err);
    })
    
  })
  .catch(err => {
    if (!err.statusCode) {
      console.log("auth/login error")
      err.statusCode = 500;
    }
    next(err);
  })
}
  
exports.fetchFeedings = async (req, res, next) => {
  const userId = req.userId;
  User.findById(userId)
  // .select('feedData')
  .populate('feedData')
  .then(result => {
    console.log(result);
    res.status(201).json( {feedings: result.feedData} );
   
    // console.log(res._id.feedData);
    // res.status(200).json({res});
  })
  .catch(err => {
    if (!err.statusCode) {
      console.log("auth/login error not authenticated")
      err.statusCode = 500;
    }
    next(err);
  })

}

