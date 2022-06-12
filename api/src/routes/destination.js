const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
// eslint-disable-next-line max-len
const destinationControllers = require('../controllers/destinationControllers.js');

router.get('/', destinationControllers.getDestinations);

router.post('/', destinationControllers.addDestination);

module.exports = router;
