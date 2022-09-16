const express = require('express');

const { getStatus, getDealsList } = require('./../controllers/glitch_deals.controller');

const gDealsRouter = express.Router();

gDealsRouter.get('/status', getStatus);
gDealsRouter.get('/deals', getDealsList);

module.exports = gDealsRouter;
