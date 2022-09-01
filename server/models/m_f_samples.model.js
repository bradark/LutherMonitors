const mFreeSamplesTesthook = 'https://discord.com/api/webhooks/1015026971882831974/mRM9b6MnhnJwXktXRKwg_Eo0Fdn4kuKKiGPPXZhfzhrgm-iScIs5wJ_SPphhHIIKUyb5';
const mFreeSamplesWebhook = 'https://discord.com/api/webhooks/1015044178859790357/j_YZX8MRZhWB3Gd0hA7f7rkVHt8IKQOYL8DG7aJRqRHZRvcLLc_GREnwBpVwa4RE08pQ';
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