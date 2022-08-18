const axios = require('axios');
const cheerio = require('cheerio');

const { getLink, getDeals, getTesthook, addDeal } = require('./../models/h_steals.model.js');

const { sendToWebhook, } = require('./../controllers/discord.controller.js');

const monitorIntervarl = 60000;

let STATUS = 'STOPPED';

async function scrapeHtml(link){
    axios.get(link).then((res) => {
      parseDeals(res.data);
    }).catch((err) => {
      console.log(err);
    });
}

async function loadDeals(link){
  axios.get(link).then((res) => {
    console.log('Heavenly Steals ==> LOADED');
    loadData(res.data);
  }).catch((err) => {
    console.log(err);
  });
}

async function loadData(html){
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
    }
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
      sendToWebhook(`${dealData.title}  LINK: ${dealData.link}`, await getTesthook());
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

async function monitor(req, res) {
  let link = await getLink();
  STATUS = 'RUNNING';
  loadDeals(link);
  const interval = setInterval( async function() {
    scrapeHtml(link);
    console.log('heavenly steals ==> CHECKED');
  }, monitorIntervarl);
}

async function getStatus(){
  return new Promise((resolve, reject) => {
    resolve(STATUS);
  });
}

monitor();

module.exports = {
  getStatus,
};
