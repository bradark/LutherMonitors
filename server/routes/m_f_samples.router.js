const express = require('express');

const { getStatus } = require('./../controllers/m_f_samples.controller');

const mFreeSamplesRouter = express.Router();

mFreeSamplesRouter.get('/status', getStatus);

module.exports = mFreeSamplesRouter;