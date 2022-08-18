const express = require('express');

const { getStatus, } = require('./../controllers/mama_deals.controller.js');

const mamaDealsRouter = express.Router();

mamaDealsRouter.get('/status', getStatus);

module.exports = mamaDealsRouter;
