const destinationControllers = {};
const Destination = require('../models/Destination.js');
const mongoose = require('mongoose');

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

destinationControllers.getDestinationById = (req, res, next) => {
  const id = req.params.id;
  // eslint-disable-next-line new-cap
  Destination.find({_id: mongoose.Types.ObjectId(id).toString()})
      .then((destination) => {
        res.status(200).json({
          message: 'Destination fetched successfully!',
          success: true,
          data: destination,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Fetching destination failed!',
          success: false,
          error: err,
        });
      });
};

destinationControllers.getDestinationByName = (req, res, next) => {
  let name = req.params.name;
  // regex to remove spaces from name and change to lowercase
  name = name.replace(/\s+/g, '').toLowerCase();
  // find collection that contains the name
  Destination.find({slug: {$regex: name, $options: 'i'}})
      .then((destination) => {
        if (destination.length === 0) {
          res.status(404).json({
            message: 'Destination not found!',
            success: false,
          });
        }
        res.status(200).json({
          message: 'Destination fetched successfully!',
          success: true,
          data: destination,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Fetching destination failed!',
          success: false,
          error: err,
        });
      });
};

destinationControllers.addDestination = (req, res, next) => {
  const {name, description, rating, price} = req.body;
  const image = 'placeholder.jpg';
  // remove spaces from name and change to lowercase
  const slug = name.replace(/\s+/g, '').toLowerCase();

  const newDestination = new Destination({
    name,
    description,
    image,
    rating,
    price,
    slug,
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

destinationControllers.updateDestination = (req, res, next) => {
  let id = req.params.id;
  const {name, description, rating, price} = req.body;
  id = mongoose.Types.ObjectId(id).toString();
  // remove spaces from name and change to lowercase
  const slug = name.replace(/\s+/g, '').toLowerCase();
  const image = 'placeholder.jpg';
  // update destination
  // eslint-disable-next-line max-len
  Destination.updateOne({_id: id}, {$set: {name, description, rating, price, slug, image}})
      .then((destination) => {
        res.status(200).json({
          message: 'Destination updated successfully!',
          success: true,
          data: destination,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Updating destination failed!',
          success: false,
          error: err,
        });
      });
};

destinationControllers.deleteDestination = (req, res, next) => {
  const id = req.params.id;
  Destination.find({_id: mongoose.Types.ObjectId(id).toString()})
      .then((destination) => {
        if (destination.length === 0) {
          res.status(404).json({
            message: 'Destination not found!',
            success: false,
          });
        }
        // eslint-disable-next-line max-len
        Destination.findOneAndDelete({_id: mongoose.Types.ObjectId(id).toString()})
            .then((destination) => {
              res.status(200).json({
                message: 'Destination deleted successfully!',
                success: true,
                data: destination,
              });
            })
            .catch((err) => {
              res.status(500).json({
                message: 'Deleting destination failed!',
                success: false,
                error: err,
              });
            });
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Deleting destination failed!',
          success: false,
          error: err,
        });
      });
};

module.exports = destinationControllers;
