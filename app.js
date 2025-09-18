const express = require('express');
// cross origin package import
const cors = require("cors");
const app = express();

app.use(express.json());
// cross origin package use
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World from Express!');
});

module.exports = app;