const express = require('express');

const { getStatus, getDealsList } = require('./../controllers/rebel_deals.controller');

const rebelDealsRouter = express.Router();

rebelDealsRouter.get('/status', getStatus);
rebelDealsRouter.get('/deals', getDealsList);

module.exports = rebelDealsRouter;