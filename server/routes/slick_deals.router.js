const express = require('express');

const { getStatus, getDealsList } = require('./../controllers/slick_deals.controller.js');

const sDealsRouter = express.Router();

sDealsRouter.get('/status', getStatus);
sDealsRouter.get('/deals', getDealsList);

module.exports = sDealsRouter;
