const axios = require('axios');
const cheerio = require('cheerio');
const request = require('request');
const puppeteer = require('puppeteer');
const fs = require('fs');

const rebelPLink = 'https://t.me/s/rebeldealz';
const rebelDealsWebhook = 'https://discord.com/api/webhooks/1005368242044411935/pZ9xyCsTrNargFd06JZWd_DnoAL3vA4mbgr1mef0pmLzEcTfAvaqlNLkiIT0hUTOhG0j';
const highFilterWebhook = 'https://discord.com/api/webhooks/1005366519502491708/Y47sOCr5vq9t-XXH5kYmZ5yjKM14B_cw0Lpd4_qHskWyJ9H4sZdku6TICwPdg3apBPtq';

const deals = [];

async function sendToHFWebhook(msg){
  var embed = {
    title: "New HIGH FILTERED Post",
    description: `${msg}`,
    footer: {
      text:"Built By lilcpap#3949",
      icon_url: "https://cdn.discordapp.com/avatars/503957762586443786/fdfa11db515c18a86a71623a78cbbb30.png"
    }
  }
  var options = { method: 'POST',
    url: highFilterWebhook,
    headers:
     { 'cache-control': 'no-cache',
       'content-type': 'application/json' },
    body: { embeds:[embed] },
    json: true };

  request(options, function (error, response, body) {
    console.log(body);
  });
}

async function sendToWebhook(msg){
  var embed = {
    title: "New Post",
    description: `${msg}`,
    footer: {
      text:"Built By lilcpap#3949",
      icon_url: "https://cdn.discordapp.com/avatars/503957762586443786/fdfa11db515c18a86a71623a78cbbb30.png"
    }
  }
  var options = { method: 'POST',
    url: rebelDealsWebhook,
    headers:
     { 'cache-control': 'no-cache',
       'content-type': 'application/json' },
    body: { embeds:[embed] },
    json: true };

  request(options, function (error, response, body) {
    console.log(body);
  });
}

async function scrapeHtml(link){
  let config = {
    headers: {
      'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'User-Agent':'Mozilla/5.0 (Windows NT 10.0; W in64; x64; rv:103.0) Gecko/20100101 Firefox/103.0',
    }
  };
  axios.get(link, config).then((res) => {
    console.log('Succesfully Scraped HTML');
    parseTelegramMessages(res.data);
  }).catch((err) => {
    console.log(err);
  });
}

async function isNewDeal(deal){
  return new Promise((resolve, reject) => {
    let isNew = true;
    for(let i = 0; i < deals.length; i++){
      if(deal == deals[i]){
        isNew = false;
      }
    }
    resolve(isNew);
  });
}

async function cleanTextData(data){
  return new Promise((resolve, reject) => {
    if(data.includes('https://amzn.to/')){let splitTxt = data.split('https://amzn.to/');
    try{
      let messyCodeData = (splitTxt[1]).split('');
      let splitCodeData = messyCodeData.slice(0,5);
      resolve(`https://amzn.to/${splitCodeData[0]}${splitCodeData[1]}${splitCodeData[2]}${splitCodeData[3]}${splitCodeData[4]}${splitCodeData[5]}`);
    }catch(err){
      console.log(err);
      resolve(``);
    }}else{
      resolve(``);
    }
  });
}

async function parseTelegramMessages(html){
  const $ = cheerio.load(html);
  $('.tgme_widget_message_text').each(async (i, element) => {
    let dealTxt = $(element).text();
    if(dealTxt.includes('http')){
      dealTxt = dealTxt.replace('http', ' http');
    }
    let isNew = await isNewDeal(dealTxt);
    if(isNew == true){
      console.log(`NEW DEAL => ${dealTxt}`);
        deals.push(`${dealTxt}`);
        if(dealTxt.includes('RUN')){
          sendToHFWebhook(`${dealTxt}`);
        }
        sendToWebhook(`${dealTxt}`);
        writeToJsonFile();
        readInDeals();
    }
  });
  //writeToJsonFile();
}

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

async function monitor(link){
  await readInDeals();
  scrapeHtml(link);
  const interval = setInterval(function() {
    scrapeHtml(link);
  }, 60000);
}

//scrapeHtml(mamaDealsPLink);
//console.log('Done');

monitor(rebelPLink);
