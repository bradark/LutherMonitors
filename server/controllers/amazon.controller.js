const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');
const request = require('request');

const isLink = 'https://www.amazon.com/dp/B09TBLBFXC/ref=olp-opf-redir?aod=1&f_new=true&f_primeEligible=true&tag=gibbrands0e-20&m=ATVPDKIKX0DER';
const oosLink = 'https://www.amazon.com/dp/B08FC5L3RG/ref=olp-opf-redir?aod=1&f_new=true&f_primeEligible=true';

const amazonConf = {
  headers: {
    'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; W in64; x64; rv:103.0) Gecko/20100101 Firefox/103.0',
  }
}

async function sendToWebhook(msg) {
  var embed = {
    author: {
      name: "Twitter Bot for Discord - V0.0.1 - Dev"
    },
    title: `New Deal`,
    description: msg
  }
  var options = { method: 'POST',
    url: 'https://discord.com/api/webhooks/1002707656965894144/yGK4JA-4Zda8pwumhj7iv5XIBgLdIKiE3u4QfeoFi7DvOwZvv4l2FVcoZVpCbk9c7yHa',
    headers:
     { 'cache-control': 'no-cache',
       'content-type': 'application/json' },
    body: { embeds:[embed] },
    json: true };

  request(options, function (error, response, body) {
    console.log('==> Amazon Restock webhook sent');
  });
}

async function scrapeHtml(link){
  return new Promise((resolve, reject) => {
    axios.get(link, amazonConf).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err);
    })
  });
}

async function inStock(html){
  return new Promise((resolve, reject) => {
    const $ = cheerio.load(html);
    let stockStatus = 0;
    if(($('a[id="sellerProfileTriggerId"]').text()).includes('Amazon.com') || ($('.mbcMerchantName').text()).includes('Amazon.com')){
      resolve('In Stock');
    }else{
      resolve('OOS');
    }
  })
}

async function parseStockStatus(html){
  const $ = cheerio.load(html);
  console.log($('a[id="sellerProfileTriggerId"]').text());
  console.log('\n');
  console.log($('.mbcMerchantName').text());
}

async function checkStock(link){
  return new Promise(async (resolve, reject) => {
    scrapeHtml(link).then((html) => {
      inStock(html).then((status) => {
        resolve(status);
      })
    });
  });
}

async function httpCheckStock(req, res){
  checkStock(req.body.link).then((status) => {
    res.send(status);
  });
}

async function start(){

}

async function test(link, testType){
  scrapeHtml(link).then((html) => {
    inStock(html).then((status) => {
      console.log(`TESTING ${testType} LINK ==> ${status}`);
    })
  });
}

test(isLink, 'IN STOCK');
test(oosLink, 'OUT OF STOCK');

module.exports = {
  start,
  httpCheckStock,
}
