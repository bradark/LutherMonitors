const axios = require('axios');
const cheerio = require('cheerio');

const wmTestLink = 'https://www.walmart.com/ip/seort/936421531';
const wmTestLinkTwo = 'https://www.walmart.com/ip/Barbie-Extra-Doll-7-In-Top-Furry-Shrug-W-Ith-Pet-Pomeranian-For-Kids-3-Years-Old-Up/537986576';

const wmConf = {
  headers: {
    'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Host':'www.walmart.com',
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; W in64; x64; rv:103.0) Gecko/20100101 Firefox/103.0',
  }
}

async function scrapeHtml(link){
    axios.get(link, wmConf).then((result) => {
      //console.log(result.data);
      parseStockStatus(result.data);
    }).catch((err) => {
      console.error(err);
    });
}

async function parseStockStatus(html){
  const $ = cheerio.load(html);
  let atcBtnTxt = $('.lh-title').text();
  console.log(atcBtnTxt);
  inStock(atcBtnTxt).then((status) => {
    console.log(status);
  });
}

async function inStock(btnTxt){
  console.log(btnTxt.includes('Sold and shipped by Walmart.com'));
  return new Promise((resolve, reject) => {
    if(btnTxt.includes('Sold and shipped by Walmart.com')){
      console.log('returning true');
      resolve('In Stock');
    }else{
      console.log('returning false');
      resolve('Out of Stock');
    }
  });
}

async function checkStock(link){
  scrapeHtml(link);
}

checkStock(wmTestLinkTwo);
