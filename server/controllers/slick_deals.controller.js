const axios = require('axios');
const cheerio = require('cheerio');

const { getDeals, addDeal, getLink, getTesthook } = require('./../models/slick_deals.model');

const { sendToWebhook, sendToHFWebhook, sendToPriceErrorWebhook, sendToLogHook } =  require('./../controllers/discord.controller');

const monitorIntervarl = 150000;

let logHook = "";

let STATUS = 'STOPPED';

async function scrapeHtml(link){
  axios.get(link).then((res) => {
    parsePosts(res.data);
  }).catch((err) => {
    console.log(err);
  });
}

async function loadDeals(link){
  axios.get(link).then((res) => {
    console.log('Slick Deals ==> LOADED');
    loadData(res.data);
  }).catch((err) => {
    console.log(err);
  });
}

async function loadData(html){
  const $ = cheerio.load(html);
  $('.bp-p-dealLink').each(async (index, element) => {
    if($(element).text() != '1' && $(element).text() != 'Last Page' && $(element).text() != ''){
      let isNew = await newDeal($(element).text());
      if( isNew == true){
        addDeal($(element).text());
      }
    }
  });
}

async function newDeal(deal){
  return new Promise(async (resolve, reject) => {
    let deals = await getDeals();
    let isNew = true;
    for(let i = 0; i < deals.length; i++){
      if(deal == deals[i]){
        isNew = false;
      }
    }
    resolve(isNew);
  });
}

async function parsePosts(html){
  const $ = cheerio.load(html);
  $('.bp-p-dealLink').each(async (index, element) => {
    if($(element).text() != '1' && $(element).text() != 'Last Page' && $(element).text() != ''){
      let isNew = await newDeal($(element).text());
      if( isNew == true){
        console.log($(element).text());
        addDeal($(element).text());
        if($(element).text().toLowerCase().includes('price error') || $(element).text().toLowerCase().includes('price mistake') || $(element).text().toLowerCase().includes('error') || $(element).text().toLowerCase().includes('mistake') || $(element).text().toLowerCase().includes('glitch')){
                sendToPriceErrorWebhook(`${$(element).text()} https://slickdeals.net${$(element).attr('href')}`);
                sendToLogHook(`${$(element).text()} https://slickdeals.net${$(element).attr('href')}`, logHook)
        }
        if($(element).text().toLowerCase().includes('limited edition') || $(element).text().toLowerCase().includes('limited release')){
            sendToHFWebhook(`${$(element).text()} https://slickdeals.net${$(element).attr('href')}`);
            sendToLogHook(`${$(element).text()} https://slickdeals.net${$(element).attr('href')}`, logHook)
        }
        sendToWebhook(`${$(element).text()} https://slickdeals.net${$(element).attr('href')}`, await getTesthook());
        
      }
    }
  });
}

async function monitor(){
  let link = await getLink();
  loadDeals(link);
  const interval = setInterval(function() {
    scrapeHtml(link);
    console.log('Slick Deals ==> CHECKED');
  }, monitorIntervarl);
}

async function getStatus(req, res) {
  res.send(STATUS);
}

async function getDealsList(req, res){
  let deals = await getDeals();
  res.send(deals);
}

monitor();

module.exports = {
  getStatus,
  getDealsList
}