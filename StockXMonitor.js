const axios = require('axios');
const cheerio = require('cheerio');

const stockxCollectiblesLink = 'https://stockx.com/collectibles/release-date?page=';

const releaseCalendar = [];

async function scrapeHtml(link) {
  let config = {
    headers: {
      'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'User-Agent':'Mozilla/5.0 (Windows NT 10.0; W in64; x64; rv:103.0) Gecko/20100101 Firefox/103.0',
    }
  };

  axios.get(link, config).then((html) => {
    console.log('html scraping request successful');
    parseCollectibles(html.data);
  }).catch((err) => {
    console.log(err);
  });
}

async function parseCollectibles(html) {
  const $ = cheerio.load(html);
  $('.css-1ibvugw-GridProductTileContainer').each(function (i, element) {
    let item = $(element).find('p').text();
    let releaseDate = $(element).find('span.css-1h8gyx6').text();
    let itemData = {
      item_title: item,
      item_release_date: releaseDate,
    }
    if(isNewItem(itemData)){
      releaseCalendar.push(itemData);
      console.log(itemData);
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
    for(let i = 1; i < 3; i++){
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
    setTimeout(resolve, 5000);
  });
}

async function start(){
  await parseAllPages();
  console.log('successfully loaded all products ==> monitoring started');
  await monitor();
}

start();
