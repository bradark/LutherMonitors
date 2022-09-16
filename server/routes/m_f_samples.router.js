const express = require('express');

const { getStatus, getDealsList } = require('./../controllers/m_f_samples.controller');

const mFreeSamplesRouter = express.Router();

mFreeSamplesRouter.get('/status', getStatus);
mFreeSamplesRouter.get('/deals', getDealsList);

module.exports = mFreeSamplesRouter;