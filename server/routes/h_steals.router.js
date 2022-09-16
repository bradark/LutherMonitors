const express = require('express');

const { getStatus, getDealsList } = require('./../controllers/h_steals.controller');

const hStealsRouter = express.Router();

hStealsRouter.get('/status', getStatus);
hStealsRouter.get('/deals', getDealsList);

module.exports = hStealsRouter;
