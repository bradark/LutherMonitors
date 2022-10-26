const gDealsTesthook = "";
const gDealsWebhook = "";
const gDealsLink = 'https://glitchndealz.com/glitchingdeals/';

const hotDeals = [];

async function getLink(){
    return new Promise((resolve, reject) => {
        resolve(gDealsLink);
    });
}

async function getTesthook(){
    return new Promise((resolve, reject) => {
        resolve(gDealsWebhook);
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