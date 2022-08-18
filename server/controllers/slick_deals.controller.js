const axios = require('axios');
const cheerio = require('cheerio');
const request = require('request');

const { getDeals, addDeal, getLink, getTesthook } = require('./../models/slick_deals.model');

const { sendToWebhook, sendToHFWebhook, sendToPriceErrorWebhook } =  require('./../controllers/discord.controller');

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
        }
        if($(element).text().toLowerCase().includes('99%') || $(element).text().toLowerCase().includes('98%') ||
           $(element).text().toLowerCase().includes('97%') || $(element).text().toLowerCase().includes('96%') ||
           $(element).text().toLowerCase().includes('95%') || $(element).text().toLowerCase().includes('94%') ||
           $(element).text().toLowerCase().includes('93%') || $(element).text().toLowerCase().includes('92%') ||
           $(element).text().toLowerCase().includes('91%') || $(element).text().toLowerCase().includes('90%') ||
           $(element).text().toLowerCase().includes('89%') || $(element).text().toLowerCase().includes('88%') ||
           $(element).text().toLowerCase().includes('limited edition') || $(element).text().toLowerCase().includes('limited release')
        ){
            sendToHFWebhook(`${$(element).text()} https://slickdeals.net${$(element).attr('href')}`);
        }
        sendToWebhook(`${$(element).text()} https://slickdeals.net${$(element).attr('href')}`, await getTesthook());
      }
    }
  });
}

async function start(){
  let link = await getLink();
  loadDeals(link);
  const interval = setInterval(function() {
    console.log('Slick Deals ==> CHECKED');
    scrapeHtml(link);
  }, 60000);
}

async function getStatus(req, res) {
  res.send(STATUS);
}

start();

module.exports = {
  getStatus,
}