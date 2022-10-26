const mDealsTestHook = "";
const mDealsWebhook = "";
const mDealsLink = 'https://t.me/s/mamadeals1';

const hotDeals = [];

async function getLink(){
    return new Promise((resolve, reject) => {
        resolve(mDealsLink);
    });
}

async function getTestHook(){
    return new Promise((resolve, reject) => {
        resolve(mDealsWebhook);
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
  getTestHook,
}
