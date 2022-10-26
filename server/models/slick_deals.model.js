const sDealsTesthook = "";
const sDealsWebhook = "";
const sDealsLink = 'https://slickdeals.net/forums/filtered/?daysprune=1&vote=0&f=9&sort=threadstarted&order=desc&r=1&perpage=80';

const hotDeals = [];

async function getLink(){
    return new Promise((resolve, reject) => {
        resolve(sDealsLink);
    });
}

async function getTesthook(){
    return new Promise((resolve, reject) => {
        resolve(sDealsWebhook);
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