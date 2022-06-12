const destinationControllers = {};
const Destination = require('../models/Destination.js');

destinationControllers.getDestinations = (req, res, next) => {
  Destination.find()
      .then((destinations) => {
        res.status(200).json({
          message: 'Destinations fetched successfully!',
          success: true,
          data: destinations,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Fetching destinations failed!',
          success: false,
          error: err,
        });
      });
};

destinationControllers.addDestination = (req, res, next) => {
  const {name, description, image, rating, price} = req.body;

  const newDestination = new Destination({
    name,
    description,
    image,
    rating,
    price,
  });

  newDestination.save()
      .then((destination) => {
        res.status(201).json({
          message: 'Destination added successfully!',
          success: true,
          data: destination,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Adding destination failed!',
          success: false,
          error: err,
        });
      });
};

module.exports = destinationControllers;
