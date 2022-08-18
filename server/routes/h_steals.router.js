const express = require('express');

const { getStatus } = require('./../controllers/h_steals.controller');

const hStealsRouter = express.Router();

hStealsRouter.get('/status', getStatus);

module.exports = hStealsRouter;
