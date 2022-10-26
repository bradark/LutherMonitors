const axios = require('axios');
const cheerio = require('cheerio');

const { getDeals, addDeal, getLink, getTesthook } = require('./../models/glitch_deals.model');

const { sendToWebhook, sendToHFWebhook, sendToPriceErrorWebhook } =  require('./../controllers/discord.controller');

const monitorIntervarl = 60000;

let logHook = "";

let STATUS = 'STOPPED';

async function scrapeHtml(link){
    let config = {
      headers: {
        'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; W in64; x64; rv:103.0) Gecko/20100101 Firefox/103.0',
      }
    };
    axios.get(link, config).then((res) => {
      parseNewPosts(res.data);
    }).catch((err) => {
      console.log(err);
    });
}

async function loadDeals(link){
    let config = {
      headers: {
        'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; W in64; x64; rv:103.0) Gecko/20100101 Firefox/103.0',
      }
    };
    axios.get(link, config).then((res) => {
      loadData(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }

async function loadData(html){
  const $ = cheerio.load(html);
  $('.col_item').each(async (i, element) => {
    let text = $(element).find('a').text();
    let link = $(element).find('a').attr('href')
    let dealData = {
        deal_text: text,
        deal_link: link,
    }
    let isNew = await isNewDeal(dealData.deal_text);
    if(isNew == true){
        addDeal(dealData);
    }
  });
  console.log('GLITCH DEALZ ==> LOADED');
}

async function isNewDeal(deal){
    return new Promise(async (resolve, reject) => {
      let deals = await getDeals();
      let isNew = true;
      for(let i = 0; i < deals.length; i++){
        if(deal == deals[i].deal_text){
          isNew = false;
        }
      }
      resolve(isNew);
    });
}

async function parseNewPosts(html){
  const $ = cheerio.load(html);
  $('.col_item').each(async (i, element) => {
    let text = $(element).find('a').text();
    let link = $(element).find('a').attr('href')
    let dealData = {
        deal_text: text,
        deal_link: link,
    }
    let isNew = await isNewDeal(dealData.deal_text);
    if(isNew == true){
        addDeal(dealData);
        if(dealData.deal_text.toLowerCase().includes('glitch') || dealData.deal_text.toLowerCase().includes('error')){
            sendToPriceErrorWebhook(`${text} \n **LINK:** ${link}`);
            sendToLogHook(`${text} \n **LINK:** ${link}`, logHook)
        }
        sendToWebhook(`${text} \n **LINK:** ${link}`, await getTesthook());
        console.log(dealData);
    }
  });
}

async function getStatus(req, res) {
    res.send(STATUS);  
}

async function getDealsList(req, res){
  let deals = await getDeals();
  res.send(deals);
}

async function test(){
    let link = await getLink();
    scrapeHtml(link);
}

async function monitor(){
    let link = await getLink();
    STATUS = 'RUNNING';
    loadDeals(link);
    const interval = setInterval(function() {
      scrapeHtml(link);
      console.log('GLITCH DEALS ==> CHECKED');
    }, monitorIntervarl);
}

monitor();

module.exports = {
    getStatus,
    getDealsList,
}