const express = require('express');

const { getStatus } = require('./../controllers/twitter.controller');

const tRouter = express.Router();

tRouter.get('/status', getStatus);

module.exports = tRouter;