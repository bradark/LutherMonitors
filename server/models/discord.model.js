const request = require('request');

const highFilterWebhook = '';
const priceErrorWebhook = '';
const highFilterTesthook = 'https://discord.com/api/webhooks/1006760612321312788/KwO_2t9XgVPZG0eD2pWOB6BWbQtri8z3whofu8KVGBYoKnGy9tT01JjafLDFq7bgqa4u';
const priceErrorTesthook = 'https://discord.com/api/webhooks/1006759201374216267/sHTECDDv3X0fKFIizGCaRriY_CjZh3cmRNqQJQVqkMumEGKtSBzQxE8dVF8R9nUy9dFG';

async function getHFWebhook(){
  return new Promise((resolve, reject) => {
    resolve(highFilterTesthook);
  });
}

async function getPriceErrorWebhook(){
  return new Promise((resolve, reject) => {
    resolve(priceErrorTesthook);
  });
}

module.exports = {
  getHFWebhook,
  getPriceErrorWebhook,
}
