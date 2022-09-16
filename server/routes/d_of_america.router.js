const express = require('express');

const { getStatus, getFreebieList } = require('./../controllers/d_of_america.controller');

const dealsOfAmericaRouter = express.Router();

dealsOfAmericaRouter.get('/status', getStatus);
dealsOfAmericaRouter.get('/freebies', getFreebieList);

module.exports = dealsOfAmericaRouter;