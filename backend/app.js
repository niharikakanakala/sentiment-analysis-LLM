const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require("openai");
const cors = require('cors');

const app = express();

app.use(cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Other app configuration...

const sentimentRoutes = require('./routes/sentimentRoutes');
app.use('/', sentimentRoutes); // Use the sentiment routes

module.exports = app; // Export the app instance
