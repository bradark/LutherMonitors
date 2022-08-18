const mDealsTestHook = 'https://discord.com/api/webhooks/1006760444020670525/PKH24ohpwhu0CrnbqpgsMj9g3jVrhOYr0m9MyvoVwh1GZFW-yo9-_9gEz7RKTuuj8HdH';
const mDealsLink = 'https://t.me/s/mamadeals1';

const hotDeals = [];

async function getLink(){
    return new Promise((resolve, reject) => {
        resolve(mDealsLink);
    });
}

async function getTestHook(){
    return new Promise((resolve, reject) => {
        resolve(mDealsTestHook);
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
