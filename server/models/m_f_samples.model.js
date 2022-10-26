const mFreeSamplesTesthook = "";
const mFreeSamplesWebhook = "";
const mFreeSamplesLink = 'https://campsite.bio/my_free_samples_usa/';

const freebies = [];

async function getLink(){
    return new Promise((resolve, reject) => {
        resolve(mFreeSamplesLink);
    });
}

async function getTesthook(){
    return new Promise((resolve, reject) => {
        resolve(mFreeSamplesWebhook);
    });
}

async function getDeals(){
    return new Promise((resolve, reject) => {
        resolve(freebies);
    });
}

async function addDeal(deal){
    return new Promise((resolve, reject) => {
        freebies.push(deal);
        resolve('Deal Added');
    });
}

module.exports = {
    getLink,
    getTesthook,
    getDeals,
    addDeal,
}