const request = require('request');

const {getHFWebhook, getPriceErrorWebhook} = require('./../models/discord.model');

async function sendToPriceErrorWebhook(msg){
    console.log('sending to p-error hook');
    let webhook = await getPriceErrorWebhook();
    var embed = {
      title: "Price Error",
      description: `${msg}`,
        footer: {
        text:"Built By lilcpap#3949",
        icon_url: "https://cdn.discordapp.com/avatars/503957762586443786/fdfa11db515c18a86a71623a78cbbb30.png"
      }
    }
    var options = { method: 'POST',
      url: webhook,
      headers:
       { 'cache-control': 'no-cache',
         'content-type': 'application/json' },
      body: { embeds:[embed] },
      json: true };
  
    request(options, function (error, response, body) {
      console.log(response);
    });
  }
  
  async function sendToHFWebhook(msg){
    let webhook = await getHFWebhook();
    var embed = {
      title: "New HIGH FILTERED Post",
      description: `${msg}`,
      footer: {
        text:"Built By lilcpap#3949",
        icon_url: "https://cdn.discordapp.com/avatars/503957762586443786/fdfa11db515c18a86a71623a78cbbb30.png"
      }
    }
    var options = { method: 'POST',
      url: webhook,
      headers:
       { 'cache-control': 'no-cache',
         'content-type': 'application/json' },
      body: { embeds:[embed] },
      json: true };
  
    request(options, function (error, response, body) {
      console.log(body);
    });
  }
  
  async function sendToWebhook(msg, webhook){
    var embed = {
      title: "New Post",
      description: `${msg}`,
      footer: {
        text:"Built By lilcpap#3949",
        icon_url: "https://cdn.discordapp.com/avatars/503957762586443786/fdfa11db515c18a86a71623a78cbbb30.png"
      }
    }
    var options = { method: 'POST',
      url: webhook,
      headers:
       { 'cache-control': 'no-cache',
         'content-type': 'application/json' },
      body: { embeds:[embed] },
      json: true };
  
    request(options, function (error, response, body) {
      console.log(body);
    });
  }

  module.exports = {
    sendToWebhook,
    sendToHFWebhook,
    sendToPriceErrorWebhook,
  }