const express = require('express');
const cors = require('cors');

//const discordRouter = require('./routes/Discord/discord.router.js');
//const hStealsMonitorRouter = require('./routes/HSteals/h_steals.router.js');
const slickDealsMonitorRouter = require('./routes/slick_deals.router.js');
//const amazonMonitorRouter = require('./routes/Amazon/amazon.router.js');
const mamaDealsRouter = require('./routes/mama_deals.router.js');
const rebelDealsRouter = require('./routes/rebel_deals.router.js');

const app = express();

app.use(cors());
app.use(express.json());

//app.use('/discord', discordRouter);
//app.use('/monitors/hsteals', hStealsMonitorRouter);
app.use('/monitors/slickdeals', slickDealsMonitorRouter);
//app.use('/monitors/amazon', amazonMonitorRouter);
app.use('/monitors/mamadeals', mamaDealsRouter);
app.use('/monitors/rebeldeals', rebelDealsRouter);

module.exports = app;
