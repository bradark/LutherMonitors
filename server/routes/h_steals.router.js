const express = require('express');

const {start, getAllDeals} = require('./../controllers/h_steals.controller');

const hStealsRouter = express.Router();

hStealsRouter.get('/start', start);
hStealsRouter.get('/deals', getAllDeals);

module.exports = hStealsRouter;
