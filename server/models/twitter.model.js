const tTesthook = 'https://discord.com/api/webhooks/1019808723637633174/GWXOQIRupbWO-ipRGTFMxvb3vuxaJlA0JKpyqyEXuqAZ6jZJpsk6xX1g0EZjlomiag5e';
const tWebhook = 'https://discord.com/api/webhooks/1019813684828192818/ejT2I6AHyTsdNsjgwxoZ4gezo69DksJVF6nNud4rjEo23GpYwLxJ6MsbZ40M7AmDq7jn';

async function getTesthook(){
    return new Promise((resolve, reject) => {
        resolve(tTesthook);
    });
}

async function getWebhook(){
    return new Promise((resolve, reject) => {
        resolve(tWebhook);
    });
}

module.exports = {
    getTesthook,
    getWebhook,
}