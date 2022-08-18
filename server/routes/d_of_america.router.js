const express = require('express');

const { getStatus, } = require('./../controllers/d_of_america.controller');

const dealsOfAmericaRouter = express.Router();

dealsOfAmericaRouter.get('/status', getStatus);

module.exports = dealsOfAmericaRouter;