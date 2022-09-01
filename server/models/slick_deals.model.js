const sDealsTesthook = 'https://discord.com/api/webhooks/1006759594435022901/iAGsudj-WERkNoecWQ-KOrUV_nwr-D0GtWYleS8NQuzEV1_hSvkrDIGZ_oH68mEoQMSq';
const sDealsWebhook = "https://discord.com/api/webhooks/1002707656965894144/yGK4JA-4Zda8pwumhj7iv5XIBgLdIKiE3u4QfeoFi7DvOwZvv4l2FVcoZVpCbk9c7yHa";
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