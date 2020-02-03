/* eslint-disable no-console */
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const schedule = require('node-schedule');
const moment = require('moment');
const scheduledFeeds = require('./controllers/schedule.js');

//Middleware===============================================================
app.use(bodyParser.json());
app.use(cors());

//Database=================================================================
mongoose.connect('mongodb+srv://kevincox:PTbCtnxPZLqLRF2I@kcdcox-ysm9g.mongodb.net/kcdcox?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    app.listen(3000, () => console.log("Connected to MongoDB via Mongoose:)"));
  })
  .catch(err => { console.log(err);}); 

//Routes===================================================================
const authRoutes = require('./routes/auth');
const fedRoutes = require('./routes/fed');
const schRoutes = require('./routes/sched');

//USE====================================================================
app.use(authRoutes);
app.use(fedRoutes);
app.use(schRoutes);

//FUNCTIONS
function addSchedFeds(){ scheduledFeeds.addSchedFeds();}
var j = schedule.scheduleJob( '* 7 * * *', addSchedFeds());

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({message: message, data: data})
});

//For Deployment Only======================================================
app.use(express.static(__dirname + '/public/'));
app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));

//LISTEN===================================================================
app.listen(5009, () => console.log("Server listening on port 5009"));



