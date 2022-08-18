const request = require('request');

const hStealsWebhooks = ['https://discord.com/api/webhooks/1003920354072338513/nrzmH4Sn-fWAd09_WQVEiaMuxvjP_l29ISNDOsPuSrWdurYx_Uhm1EtxeFU5FEzo0d9I'];
const hStealsLink = 'https://www.heavenlysteals.com/search/label/Hot%20Deals';

const hotDeals = [];

async function getWebhooks(){
  return new Promise((resolve, reject) => {
    resolve(hStealsWebhooks);
  });
}

async function getDeals(){
  return new Promise((resolve, reject) => {
    resolve(hotDeals);
  });
}

async function getHStealsLink(){
  return new Promise((resolve, reject) => {
    resolve(hStealsLink);
  });
}

async function addDeal(deal){
  return new Promise((resolve, reject) => {
    hotDeals.push(deal);
    resolve('Deal Added');
  });
}

module.exports = {
  getWebhooks,
  getDeals,
  getHStealsLink,
  addDeal,
}
