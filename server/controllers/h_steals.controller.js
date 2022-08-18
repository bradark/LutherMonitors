const axios = require('axios');
const cheerio = require('cheerio');
const request = require('request');

const { getWebhooks, getDeals, getHStealsLink, addDeal } = require('./../../models/h_steals.model.js');
const { sendToWebhook, } = require('./../../models/discord.model.js');

const hStealsLink = 'https://www.heavenlysteals.com/search/label/Hot%20Deals';

const stealsWebHook = 'https://discord.com/api/webhooks/1003920354072338513/nrzmH4Sn-fWAd09_WQVEiaMuxvjP_l29ISNDOsPuSrWdurYx_Uhm1EtxeFU5FEzo0d9I';

async function scrapeHtml(link){
    axios.get(link).then((res) => {
      parseDeals(res.data);
    }).catch((err) => {
      console.log(err);
    });
}

async function parseDeals(html){
  const $ = cheerio.load(html);
  $('.post-outer').each( async(index, element) => {
    let title = $(element).find('a').text();
    let link = $(element).find('a').attr('href');
    let dealData = {
      title: title,
      link: link,
    }
    let isNew = await newDeal(dealData);
    if(isNew == true){
      addDeal(dealData);
      sendToWebhook(`${dealData.title}  LINK: ${dealData.link}`, stealsWebHook);
    }
  });
}

async function newDeal(deal){
  return new Promise(async (resolve, reject) => {
    var contains = true;
    let deals = await getDeals();
    deals.forEach((item, i) => {
      if(item.title == deal.title){
        contains = false;
      }
    });
    resolve(contains);
  });
}

async function getAllDeals(req, res) {
  res.json(getDeals());
}

async function start(req, res) {
  let url = await getHStealsLink();
  scrapeHtml(url);
  //res.send('HSteals Monitor Started');
  const interval = setInterval( async function() {
    console.log('=> heavenly steals checked');
    let url = await getHStealsLink();
    scrapeHtml(url);
  }, 60000);
}

start();

module.exports = {
  start,
  getAllDeals,
};
