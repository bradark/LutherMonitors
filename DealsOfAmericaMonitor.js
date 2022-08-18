const axios = require('axios');
const cheerio = require('cheerio');
const request = require('request');

const freebieLink = 'https://www.dealsofamerica.com/free-after-rebates.php';

const freebies = [];

async function sendToFreebieWebhook(msg, link){
  var embed = {
    author: {
      name: "New Freebie"
    },
    title: `${msg}`,
    description: `${link}`
  }
  var options = { method: 'POST',
    url: 'https://discord.com/api/webhooks/1004942422142353448/EbTzY4kVNrw2XYhTd_vyzjozGPyWn4t02XzhRPEeWVbaI7QLVaEdk1pZ_46vfSQbXXTp',
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
    parseFreebies(res.data);
  }).catch((err) => {
    console.log(err);
  });
}

async function parseFreebies(html){
  const $ = cheerio.load(html);
  $('.deal').each(async(index, element) => {
    let freebieData = {
      title: $(element).find('.title').text(),
      link: $(element).find('.title').find('a').attr('href')
    }
    let newF = await newFreebie(freebieData);
    if(newF == true){
      console.log(freebieData);
      freebies.push(freebieData);
      sendToFreebieWebhook(freebieData.title, freebieData.link);
    }
  });
}

async function newFreebie(freebie){
  return new Promise(async (resolve, reject) => {
    var contains = true;
    freebies.forEach((item, i) => {
      if(item.title == freebie.title){
        contains = false;
      }
    });
    resolve(contains);
  });
}

async function start() {
  scrapeHtml(freebieLink);
  const interval = setInterval( async function() {
    scrapeHtml(freebieLink);
  }, 300000)
}

async function test(){
  scrapeHtml(freebieLink);
}

test();
