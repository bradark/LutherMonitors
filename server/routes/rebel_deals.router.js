const express = require('express');

const {getStatus, } = require('./../controllers/rebel_deals.controller');

const rebelDealsRouter = express.Router();

rebelDealsRouter.get('/status', getStatus);

module.exports = rebelDealsRouter;