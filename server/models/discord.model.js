const request = require('request');

const highFilterWebhook = "";
const priceErrorWebhook = "";
const freebiesWebhook = "";
const highFilterTesthook = "";
const priceErrorTesthook = "";
const freebiesTesthook = "";

async function getHFWebhook(){
  return new Promise((resolve, reject) => {
    resolve(highFilterWebhook);
  });
}

async function getPriceErrorWebhook(){
  return new Promise((resolve, reject) => {
    resolve(priceErrorWebhook);
  });
}

async function getFreebieWebhook(){
  return new Promise((resolve, reject) => {
    resolve(freebiesWebhook);
  });
}

module.exports = {
  getHFWebhook,
  getPriceErrorWebhook,
  getFreebieWebhook,
}
