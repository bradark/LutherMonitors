const express = require('express');
const cors = require('cors');

const hStealsMonitorRouter = require('./routes/h_steals.router.js');
const slickDealsMonitorRouter = require('./routes/slick_deals.router.js');
const mamaDealsRouter = require('./routes/mama_deals.router.js');
const rebelDealsRouter = require('./routes/rebel_deals.router.js');
const dealsOfAmericaRouter = require('./routes/d_of_america.router.js');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/monitors/hsteals', hStealsMonitorRouter);
app.use('/monitors/slickdeals', slickDealsMonitorRouter);
app.use('/monitors/mamadeals', mamaDealsRouter);
app.use('/monitors/rebeldeals', rebelDealsRouter);
app.use('/monitors/dealsofamerica', dealsOfAmericaRouter)

module.exports = app;
