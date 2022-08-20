const request = require('request');

const highFilterWebhook = 'https://discord.com/api/webhooks/1005366519502491708/Y47sOCr5vq9t-XXH5kYmZ5yjKM14B_cw0Lpd4_qHskWyJ9H4sZdku6TICwPdg3apBPtq';
const priceErrorWebhook = 'https://discord.com/api/webhooks/1003485734352732280/KLc3NZRM_7XhfpbrZ9LsW-SnylARkQ4ZxGPiQeydNLEPQNyquWJHLYci6wGNo7Wyhmu_';
const freebiesWebhook = 'https://discord.com/api/webhooks/1004942422142353448/EbTzY4kVNrw2XYhTd_vyzjozGPyWn4t02XzhRPEeWVbaI7QLVaEdk1pZ_46vfSQbXXTp';
const highFilterTesthook = 'https://discord.com/api/webhooks/1006760612321312788/KwO_2t9XgVPZG0eD2pWOB6BWbQtri8z3whofu8KVGBYoKnGy9tT01JjafLDFq7bgqa4u';
const priceErrorTesthook = 'https://discord.com/api/webhooks/1006759201374216267/sHTECDDv3X0fKFIizGCaRriY_CjZh3cmRNqQJQVqkMumEGKtSBzQxE8dVF8R9nUy9dFG';
const freebiesTesthook = 'https://discord.com/api/webhooks/1009674073841860690/h4Lsv-aV66gcobNg_E6GkxXQCCezkQk6WbnrHTUsxgjQOnik8PjgugsibsIIvUIQ_yaQ';

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

async function getFreebieWebhook(){
  return new Promise((resolve, reject) => {
    resolve(freebiesTesthook);
  });
}

module.exports = {
  getHFWebhook,
  getPriceErrorWebhook,
  getFreebieWebhook,
}
