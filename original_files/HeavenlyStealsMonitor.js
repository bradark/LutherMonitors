const axios = require('axios');
const cheerio = require('cheerio');
const request = require('request');

const hStealsLink = 'https://www.heavenlysteals.com/search/label/Hot%20Deals';
const stealsWebHook = 'https://discord.com/api/webhooks/1003920354072338513/nrzmH4Sn-fWAd09_WQVEiaMuxvjP_l29ISNDOsPuSrWdurYx_Uhm1EtxeFU5FEzo0d9I';

const hotDeals = [];

async function sendToWebhook(msg){
  var embed = {
    author: {
      name: "Twitter Bot for Discord - V0.0.1 - Dev"
    },
    title: `New Steal`,
    description: msg
  }
  var options = { method: 'POST',
    url: stealsWebHook,
    headers:
     { 'cache-control': 'no-cache',
       'content-type': 'application/json' },
    body: { embeds:[embed] },
    json: true };

  request(options, function (error, response, body) {
    console.log(body);
  });
}

async function scrapeHtml(link){
    axios.get(link).then((res) => {
      parseDeals(res.data);
    }).catch((err) => {
      console.log(err);
    });
}

async function parseDeals(html){
  const $ = cheerio.load(html);
  $('.post-outer').each((index, element) => {
    let title = $(element).find('a').text();
    let link = $(element).find('a').attr('href');
    let dealData = {
      title: title,
      link: link,
    }
    if(newDeal(dealData) == true){
      hotDeals.push(dealData);
      console.log(dealData);
      sendToWebhook(`${dealData.title}  LINK: ${dealData.link}`);
    }else{
      console.log('old deal');
    }
  });
}

function newDeal(deal){
  var contains = true;
  hotDeals.forEach((item, i) => {
    if(item.title == deal.title){
      contains = false;
    }
  });
  return contains;
}

async function start() {
  scrapeHtml(hStealsLink);
  const interval = setInterval(function() {
    console.log('checked');
    scrapeHtml(hStealsLink);
  }, 60000);
}

start(hStealsLink);
