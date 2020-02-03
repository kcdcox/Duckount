// ROUTES/FORMS
const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
const auth = require('../middleware/is-auth')

const schedController = require('../controllers/schedule');

// FETCH USER SCHEDULES
router.get('/api/fetchSchedule',     auth, schedController.fetchSchedule);

// ADD SCHEDULE
router.post('/api/addSchedule',       auth, schedController.addSchedule);


module.exports = router;   