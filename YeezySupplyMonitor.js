const axios = require('axios');
const cheerio = require('cheerio');

const ysTestLink = 'https://www.yeezysupply.com';

const ysConf = {
  headers: {
    'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; W in64; x64; rv:103.0) Gecko/20100101 Firefox/103.0',
  }
}

async function scrapeHtml(link){
    axios.get(link, ysConf).then((result) => {
      console.log(result);
      //parseStockStatus(result.data);
    }).catch((err) => {
      console.error(err);
    });
}

async function parseStockStatus(html){
  const $ = cheerio.load(html);
  console.log($);
}

async function checkStock(link){
  scrapeHtml(link);
}

scrapeHtml(ysTestLink);
