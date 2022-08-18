const axios = require('axios');
const cheerio = require('cheerio');
const request = require('request');
const puppeteer = require('puppeteer');
const fs = require('fs');

const rebelPLink = 'https://t.me/s/rebeldealz';
const mamaDealsPLink = 'https://t.me/s/mamadeals1';

const deals = [];

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
        writeToJsonFile();
        readInDeals();
    }
  });
  //writeToJsonFile();
}

async function writeToJsonFile(){
  fs.writeFileSync('deals.json', JSON.stringify(deals));
}

async function readInDeals(){
  return new Promise((resolve, reject) => {
    fs.readFile('deals.json', (err, data) => {
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
