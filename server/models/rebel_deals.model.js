const rDealsTesthook = "";
const rDealsWebhook = "";
const rDealsLink = 'https://t.me/s/rebeldealz';

const hotDeals = [];

async function getLink(){
    return new Promise((resolve, reject) => {
        resolve(rDealsLink);
    });
}

async function getTesthook(){
    return new Promise((resolve, reject) => {
        resolve(rDealsWebhook);
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