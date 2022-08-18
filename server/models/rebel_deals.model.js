const rDealsTesthook = 'https://discord.com/api/webhooks/1006760350550605834/aFgOkgUt3_208kMV6Du-07IYrAYyexE-ohd7FEMUfl6XJcSWVaALvqE9QsFdxUZ12fHI';
const rDealsLink = 'https://t.me/s/rebeldealz';

const hotDeals = [];

async function getLink(){
    return new Promise((resolve, reject) => {
        resolve(rDealsLink);
    });
}

async function getTesthook(){
    return new Promise((resolve, reject) => {
        resolve(rDealsTesthook);
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