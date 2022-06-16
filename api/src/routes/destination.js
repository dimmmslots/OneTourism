const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
// eslint-disable-next-line max-len
const destinationControllers = require('../controllers/destinationControllers.js');
const miscControllers = require('../controllers/miscControllers.js');

router.get('/', destinationControllers.getDestinations);

router.post('/', destinationControllers.addDestination);

router.put('/:id', destinationControllers.updateDestination);

router.delete('/:id', destinationControllers.deleteDestination);

router.get('/id/:id', destinationControllers.getDestinationById);

router.get('/name/:name', destinationControllers.getDestinationByName);

// catch all other routes
router.all('*', miscControllers.catchAll);

module.exports = router;
