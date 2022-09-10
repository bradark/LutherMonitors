const gDealsTesthook = 'https://discord.com/api/webhooks/1017982482953547837/FNIS1smmxyA_yx95q53huEMmMPvZPSMEznqJzuvWoY7nBlK5XuU2l-XvLGOhGLC8cwkR';
const gDealsWebhook = "https://discord.com/api/webhooks/1018212934335336579/Emj-gLLsWlTu7oJONipJWhQY0f0O_zAbRPyntnB-cx44-lkTaL_4BvK7KntbNhJ_0c0B";
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