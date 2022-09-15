const axios = require('axios');
const cheerio = require('cheerio');

const INTERVAL = 30000;

const config = {
  headers: {
    'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; W in64; x64; rv:103.0) Gecko/20100101 Firefox/103.0',
  }
}

async function getProdPage(link){
  return new Promise((resolve, reject) => {
    axios.get(link, config).then( async (res) => {
      resolve(res.data);
    }).catch((err) => {
      console.log(err);
      resolve(err);
    });
  });
}

async function parseStock(html){
  return new Promise((resolve, reject) => {
    const $ = cheerio.load(html);
    try{
      if($('[name=submit.addToCart]').attr('aria-label').includes('Add to Cart from seller Amazon.com')){
        resolve('IN-STOCK');
      }else{
        resolve('OOS');
      }
    }catch(err){
      resolve('OOS');
    }
  });
}

async function buildLink(sku){
  return new Promise((resolve, reject) => {
    let link = `https://www.amazon.com/gp/product/ajax/ref=auto_load_aod?asin=${sku}&m=ATVPDKIKX0DER&pc=dp&experienceId=aodAjaxMain`;
    resolve(link);
  });
}

async function httpCheckStock(req, res){

}

async function start(){

}

async function test(sku){
  let link = await buildLink(sku);
  let prodPage = await getProdPage(link);
  let stockStatus = await parseStock(prodPage);
  console.log(`${sku} --- ${stockStatus}`);
}

async function monitor(sku){
  let link = await buildLink(sku);
  const interval = setInterval( async function() {
    let prodPage = await getProdPage(link);
    let stockStatus = await parseStock(prodPage);
    if(stockStatus == 'IN-STOCK'){
      console.log(`${sku} --- ${stockStatus}`);
    }
  }, INTERVAL);
}

test('B09QL5BRZH');
monitor('B09QL5BRZH');

module.exports = {
  start,
  httpCheckStock,
}
