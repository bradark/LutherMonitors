const request = require('request');

const hStealsTesthook = 'https://discord.com/api/webhooks/1009687192504913970/fuxNpporXyfdBLw5DBrnCAHM7J1vvob9kw15bFAjQjodG1mecZAM97Uf205Yyb6zEY9M';
const hStealsLink = 'https://www.heavenlysteals.com/search/label/Hot%20Deals';

const hotDeals = [];

async function getLink(){
  return new Promise((resolve, reject) => {
      resolve(hStealsLink);
  });
}

async function getTesthook(){
  return new Promise((resolve, reject) => {
      resolve(hStealsTesthook);
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