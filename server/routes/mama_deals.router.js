const express = require('express');

const { getStatus, getDealsList } = require('./../controllers/mama_deals.controller.js');

const mamaDealsRouter = express.Router();

mamaDealsRouter.get('/status', getStatus);
mamaDealsRouter.get('/deals', getDealsList);

module.exports = mamaDealsRouter;
