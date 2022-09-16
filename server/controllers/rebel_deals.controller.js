const axios = require('axios');
const cheerio = require('cheerio');

const { getDeals, addDeal, getLink, getTesthook } = require('./../models/rebel_deals.model');

const { sendToWebhook, sendToHFWebhook, sendToPriceErrorWebhook } =  require('./../controllers/discord.controller');

const monitorIntervarl = 60000;

let STATUS = 'STOPPED';

async function scrapeHtml(link){
    let config = {
      headers: {
        'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; W in64; x64; rv:103.0) Gecko/20100101 Firefox/103.0',
      }
    };
    axios.get(link, config).then((res) => {
      console.log('Rebel Deals ==> CHECKED');
      parseTelegramMessages(res.data);
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
    console.log('Rebel Deals ==> LOADED');
    loadData(res.data);
  }).catch((err) => {
    console.log(err);
  });
}

async function loadData(html){
  const $ = cheerio.load(html);
  $('.tgme_widget_message_wrap').each(async (i, element) => {
    let dealTxt = $(element).find('.tgme_widget_message_text').text(); //$(element).text();
    let telegramLink = '';
    if($(element).find('.tgme_widget_message_photo_wrap').attr('href')){
        telegramLink = `\n **Telegram Post Link:** ${$(element).find('.tgme_widget_message_photo_wrap').attr('href')}`;
    }
    if(dealTxt.includes('http')){
      dealTxt = dealTxt.replace('http', ' http');
    }
    dealTxt = dealTxt + telegramLink;
    let isNew = await isNewDeal(dealTxt);
    if(isNew == true){
        addDeal(`${dealTxt}`);
    }
  });
}

async function isNewDeal(deal){
    return new Promise( async (resolve, reject) => {
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
  
async function parseTelegramMessages(html){
    const $ = cheerio.load(html);
    $('.tgme_widget_message_wrap').each(async (i, element) => {
      let dealTxt = $(element).find('.tgme_widget_message_text').text(); //$(element).text();
      let telegramLink = '';
      if($(element).find('.tgme_widget_message_photo_wrap').attr('href')){
          telegramLink = `\n **Telegram Post Link:** ${$(element).find('.tgme_widget_message_photo_wrap').attr('href')}`;
      }
      if(dealTxt.includes('http')){
        dealTxt = dealTxt.replace('http', ' http');
      }
      dealTxt = dealTxt + telegramLink;
      let isNew = await isNewDeal(dealTxt);
      if(isNew == true){
        console.log(`NEW DEAL => ${dealTxt}`);
          addDeal(`${dealTxt}`);
          if(dealTxt.toLowerCase().includes('run')){
            sendToHFWebhook(`${dealTxt}`);
          }
          if(dealTxt.toLowerCase().includes('error') || dealTxt.toLowerCase().includes('glitch')){
            sendToPriceErrorWebhook(`${dealTxt}`);
          }
          sendToWebhook(`${dealTxt}`, await getTesthook());
      }
    });
}

async function testFilters(dealTxt){
    let isNew = await isNewDeal(dealTxt);
      if(isNew == true){
        console.log(`NEW DEAL => ${dealTxt}`);
          addDeal(`${dealTxt}`);
          if(dealTxt.toLowerCase().includes('run') || dealTxt.toLowerCase().includes('stacking')){
            sendToHFWebhook(`${dealTxt}`);
          }
          if(dealTxt.toLowerCase().includes('error') || dealTxt.toLowerCase().includes('glitch')){
            sendToPriceErrorWebhook(`${dealTxt}`);
          }
          sendToWebhook(`${dealTxt}`, await getTesthook());
    }
}

/*
async function writeToJsonFile(){
    fs.writeFileSync('rebel_deals.json', JSON.stringify(deals));
}
  
async function readInDeals(){
    return new Promise((resolve, reject) => {
      fs.readFile('rebel_deals.json', (err, data) => {
        if (err) throw err;
        let deals = JSON.parse(data);
      })
      resolve();
    });
}
*/
  
async function monitor(){
    let link = await getLink();
    STATUS = 'RUNNING';
    loadDeals(link);
    const interval = setInterval(function() {
      scrapeHtml(link);
    }, monitorIntervarl);
}

async function getStatus(req, res){
  res.send(STATUS);
}

async function getDealsList(req, res){
  let deals = await getDeals();
  res.send(deals);
}

//testFilters('Oop definitely a price error last night! Hope y’all grabbed one ! https://t.me/rebeldealz/61532Telegram Post Link: https://t.me/rebeldealz/61655');

monitor();

module.exports = {
    getStatus,
    getDealsList,
}