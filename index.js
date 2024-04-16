// index.js
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const dotenv = require('dotenv');
const categoryRoutes = require('./src/routes/categoryRoutes');
const bookRoutes = require('./src/routes/bookRoutes');

app.use(express.json());
app.use('/api', categoryRoutes);
app.use('/api', bookRoutes);

module.exports.handler = serverless(app);