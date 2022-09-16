const Twitter = require('twitter');

const { getWebhook, getTesthook } = require('./../models/twitter.model');

const { sendToWebhook, sendToHFWebhook, sendToPriceErrorWebhook } =  require('./../controllers/discord.controller');

const twitterClient = new Twitter({
   consumer_key: '',
   consumer_secret: '',           
   access_token_key: '',
   access_token_secret: ''
});

const filters = {
    follow: '1334977387386302471', 
    follow:'4438948518'
}

const stream = twitterClient.stream('statuses/filter', filters);

const STATUS = 'RUNNING';

stream.on('data', (data) => {
    parseTweetData(data.text);
})

async function parseTweetData(data){
    let testHook = await getTesthook();
    let webhook = await getWebhook();
    sendToWebhook(`**New Tweet: ** ${data}`, webhook)
    if(data.toLowerCase().includes('glitch') ||
       data.toLowerCase().includes('price error')){

        sendToPriceErrorWebhook(`**New Tweet: ** ${data}`);
    
    }
}

async function getStatus(req, res){
    res.send(STATUS);
}

module.exports = {
    getStatus,
}