const User = require('../models/User.js');

const authController = {};

authController.register = (req, res) => {
  const {username, password} = req.body;
  // check for username duplication
  User.findOne({username: username}, (err, user) => {
    if (user) {
      res.status(400).json({
        message: 'Username already exists',
        code: 400,
      });
    } else {
      // create new user
      const newUser = new User({
        username: username,
        password: password,
      });
        // save new user
      newUser.save((err) => {
        if (err) {
          res.status(400).json({
            message: 'Error creating user',
            code: 400,
          });
        } else {
          res.status(201).json({
            message: 'User created',
            code: 201,
          });
        }
      });
    }
  });
};

authController.login = (req, res) => {
  const {username, password} = req.body;
  User.findOne({username: username}, (err, user) => {
    if (user) {
      if (user.password === password) {
        res.status(200).json({
          message: '',
          auth: true,
        });
      } else {
        res.status(400).json({
          message: 'Incorrect Username or Password',
          auth: false,
        });
      }
    } else {
      res.status(400).json({
        message: 'Incorrect Username or Password',
        auth: false,
      });
    }
  });
};


module.exports = authController;
