// ROUTES/FORMS
const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
const auth = require('../middleware/is-auth')

const fedController = require('../controllers/fed');

// ADD FEEDING DATA POINT
router.post('/api/addFeeding', auth, fedController.addFeeding);

// FETCH ALL USER FEEDININGS
router.get('/api/fetchFeedings', auth, fedController.fetchFeedings);

// FETCH NUMBER OF DUCKS FED TODAY
router.get('api/fetchTodayDucks', fedController.fetchTodayDucks);


module.exports = router;   