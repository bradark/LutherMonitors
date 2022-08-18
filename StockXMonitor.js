const axios = require('axios');
const cheerio = require('cheerio');
const request = require('request');

const stockxCollectiblesLink = 'https://stockx.com/collectibles/release-date?page=';

const releaseCalendar = [];

async function sendToWebhook(item){
  var embed = {
    title: "New Release",
    description: `${item.item_title}  releases on ${item.item_release_date}`,
    footer: {
      text:"Built By lilcpap#3949",
      icon_url: "https://cdn.discordapp.com/avatars/503957762586443786/fdfa11db515c18a86a71623a78cbbb30.png"
    }
  }
  var options = { method: 'POST',
    url: 'https://discord.com/api/webhooks/1004974575928479825/MFS2XyJryJ18hK5B5h49cDzCti07D1bdJauF_RXhielkbo8RjRQ2aeZ-g2pwrfOSZRZ0',
    headers:
     { 'cache-control': 'no-cache',
       'content-type': 'application/json' },
    body: { embeds:[embed] },
    json: true };

  request(options, function (error, response, body) {
    console.log(body);
  });
}

async function scrapeHtml(link) {
  let config = {
    headers: {
      'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'User-Agent':'Mozilla/5.0 (Windows NT 10.0; W in64; x64; rv:103.0) Gecko/20100101 Firefox/103.0',
    }
  };

  axios.get(link, config).then(async (html) => {
    console.log('html scraping request successful');
    await delay();
    parseCollectibles(html.data);
  }).catch((err) => {
    console.log(err);
  });
}

async function parseCollectibles(html) {
  const $ = cheerio.load(html);
  $('.css-1ibvugw-GridProductTileContainer').each(async function (i, element) {
    await delay();
    let item = $(element).find('p').text();
    let releaseDate = $(element).find('span.css-1h8gyx6').text();
    let itemData = {
      item_title: item,
      item_release_date: releaseDate,
    }
    if(isNewItem(itemData)){
      releaseCalendar.push(itemData);
      console.log(itemData);
      sendToWebhook(itemData);
    }
  });
}

async function isNewItem(itemData) {
  return new Promise((resolve, reject) => {
    for(let i = 0; i < releaseCalendar.length; i++){
      if(itemData.item_title == releaseCalendar[i].item_title){
        resolve(false);
      }
    }
    resolve(true);
  });
}

async function parseAllPages() {
  return new Promise(async (resolve, reject) => {
    for(let i = 1; i < 25; i++){
      await delay();
      console.log('scraping =>  ' + stockxCollectiblesLink + '' + i);
      scrapeHtml(stockxCollectiblesLink + '' + i);
    }
    resolve(1);
  });
}

async function monitor(){
  scrapeHtml(stockxCollectiblesLink + '' + '1');
  const interval = setInterval(function() {
    scrapeHtml(stockxCollectiblesLink + '' + '1');
  }, 3600000);
}

async function delay(){
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
  });
}

async function start(){
  await parseAllPages();
  console.log('successfully loaded all products ==> monitoring started');
  await monitor();
}

start();
