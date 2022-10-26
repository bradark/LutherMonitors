const request = require('request');

const hStealsWebhook = "";
const hStealsTesthook = "";
const hStealsLink = 'https://www.heavenlysteals.com/search/label/Hot%20Deals';

const hotDeals = [];

async function getLink(){
  return new Promise((resolve, reject) => {
      resolve(hStealsLink);
  });
}

async function getTesthook(){
  return new Promise((resolve, reject) => {
      resolve(hStealsWebhook);
  });
}

async function getDeals(){
  return new Promise((resolve, reject) => {
      resolve(hotDeals);
  });
}

async function addDeal(deal){
  return new Promise((resolve, reject) => {
      hotDeals.push(deal);
      resolve('Deal Added');
  });
}

module.exports = {
  getDeals,
  addDeal,
  getLink,
  getTesthook,
}