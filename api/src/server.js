require('dotenv').config();
const {API_PORT} = process.env;
const express = require('express');
const app = express();
const cors = require('cors');
const {connect} = require('./configs/database.js');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.js');
const destinationRoutes = require('./routes/destination.js');

app.use(cors({origin: '*'}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRoutes);
app.use('/destination', destinationRoutes);


connect();
mongoose.connection.on('connected', () => {
  app.listen(API_PORT, () => {
    console.log(`Server is running on port ${API_PORT}`);
  },
  );
});

mongoose.connection.on('error', (err) => {
  console.log(err);
});


