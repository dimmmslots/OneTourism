const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const authController = require('../controllers/authControllers.js');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
