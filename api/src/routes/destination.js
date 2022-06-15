const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
// eslint-disable-next-line max-len
const destinationControllers = require('../controllers/destinationControllers.js');

router.put('/:id', destinationControllers.updateDestination);

router.get('/', destinationControllers.getDestinations);

router.post('/', destinationControllers.addDestination);

router.get('/:id', destinationControllers.getDestinationById);

router.get('/search/:name', destinationControllers.getDestinationByName);

router.delete('/:id', destinationControllers.deleteDestination);

module.exports = router;
