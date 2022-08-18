const express = require('express');

const { getStatus } = require('./../controllers/slick_deals.controller.js');

const sDealsRouter = express.Router();

sDealsRouter.get('/status', getStatus);

module.exports = sDealsRouter;
