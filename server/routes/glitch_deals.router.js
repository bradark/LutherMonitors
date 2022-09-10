const express = require('express');

const { getStatus } = require('./../controllers/glitch_deals.controller');

const gDealsRouter = express.Router();

gDealsRouter.get('/status', getStatus);

module.exports = gDealsRouter;
