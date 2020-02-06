//CONTROLLERS/forms
const User = require('../models/user');
const Schedule = require('../models/schedule');
const Feeding = require('../models/feeding');
const moment = require('moment');

exports.addSchedule = async (req, res, next) => {
  const userId = req.userId;
  const country = req.body.country;
  const city = req.body.city;
  const park = req.body.park;
  const state = req.body.state;
  const time = req.body.time;
  const duckNumber = req.body.duckNumber;
  const foodType = req.body.foodType;
  const foodAmount = req.body.foodAmount;
  const day = req.body.day;
  const dayName = req.body.dayName;
  const schedule = new Schedule({userId, day, dayName, city, country, state, park,  time, duckNumber, foodType, foodAmount});

  Schedule.create(schedule)
  .then(res => {
    console.log(res.id);
    const scheduleId = res.id;
    User.findById(userId)
    .then(user => {
      const scheds = user.scheds;
      scheds.push(scheduleId);
      console.log(scheds);
      User.findByIdAndUpdate(userId, {scheds})
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

  
exports.fetchSchedule = async (req, res, next) => {
  const userId = req.userId;
  User.findById(userId)
  .populate('scheds')
  .then(result => {
    console.log(result);
    res.status(201).json( {scheds: result.scheds} );
  })
  .catch(err => {
    if (!err.statusCode) {
      console.log("auth/login error not authenticated")
      err.statusCode = 500;
    }
    next(err);
  })
}

exports.addSchedFeds = async (req, res, next) => {
  Schedule.find({day: moment().day()})
  .then(toScFe => {
    var parseDate = moment(moment().format()).format("MMM D, YYYY");
    for(var i = 0; i <  toScFe.length; i++){
      const userId = toScFe[i].userId;
      const country = toScFe[i].country;
      const city = toScFe[i].city;
      const park = toScFe[i].park;
      const state = toScFe[i].state;
      const time = toScFe[i].time;
      const date = parseDate;
      const dateTime = moment().format();
      const duckNumber = toScFe[i].duckNumber;
      const foodType = toScFe[i].foodType;
      const foodAmount = toScFe[i].foodAmount;

      const feeding = new Feeding({userId, city, country, state, park, date, time, dateTime, duckNumber, foodType, foodAmount});
      Feeding.create(feeding)
      .then(res => {
        const feedId = res.id;
        User.findById(userId)
        .then(user => {
          const feedData = user.feedData;
          feedData.push(feedId);
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
  })
  .catch(err => {
    if (!err.statusCode) {
      console.log("auth/login error not authenticated")
      err.statusCode = 500;
    }
    next(err);
  })
}







