const express = require('express');
// cross origin package import
const cors = require("cors");
const app = express();

// routes
const authRoute = require('./routes/auth');
const inventoryRoute = require('./routes/inventory');

app.use(express.json());
// cross origin package use
app.use(cors());

app.use('/auth', authRoute)
app.use('/user', inventoryRoute)

module.exports = app;