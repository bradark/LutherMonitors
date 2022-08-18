const express = require('express');

const {start, httpCheckStock} = require('./../controllers/amazon.controller.js');

const amazonRouter = express.Router();

amazonRouter.get('/start', start);
amazonRouter.post('/checkStock', httpCheckStock);

module.exports = amazonRouter;
