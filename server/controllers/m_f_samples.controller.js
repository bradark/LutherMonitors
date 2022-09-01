const axios = require('axios');
const cheerio = require('cheerio');

const { getLink, getDeals, getTesthook, addDeal } = require('./../models/m_f_samples.model');

const { sendToFreebieWebhook, sendToWebhook } =  require('./../controllers/discord.controller');

const monitorInterval = 120000;

let STATUS = 'STOPPED';

async function scrapeHtml(link){
    axios.get(link).then((res) => {
        parseFreebies(res.data);
    }).catch((err) => {
        console.log(err);
    });
}

async function loadDeals(link){
    axios.get(link).then((res) => {
        console.log('MFREESAMPLES ==> LOADED');
        loadData(res.data);
    }).catch((err) => {
        console.log(err);
    });
}

async function loadData(html){
    const $ = cheerio.load(html);
    $('.site__links__li').each(async(index, element) => {
        let freebieData = {
            title: $(element).text(),
            link: $(element).find('a').attr('href'),
        }
        let testHook = await getTesthook();
        let newF = await newFreebie(freebieData);
        if(newF == true){
            addDeal(freebieData);
            //sendToWebhook(`${freebieData.title} --- ${freebieData.link}`, testHook);
        }
    });
}

async function parseFreebies(html){
    const $ = cheerio.load(html);
    $('.site__links__li').each(async(index, element) => {
        let freebieData = {
            title: $(element).text(),
            link: $(element).find('a').attr('href'),
        }
        let newF = await newFreebie(freebieData);
        let testHook = await getTesthook();
        if(newF == true){
            console.log(freebieData);
            addDeal(freebieData);
            sendToFreebieWebhook(`${freebieData.title} --- ${freebieData.link}`);
            sendToWebhook(`${freebieData.title} --- ${freebieData.link}`, testHook);
        }
    });
}

async function newFreebie(freebie){
    return new Promise(async (resolve, reject) => {
      var contains = true;
      let freebies = await getDeals();
      freebies.forEach((item, i) => {
        if(item.title == freebie.title){
          contains = false;
        }
      });
      resolve(contains);
    });
  }

async function monitor(){
    let link = await getLink();
    STATUS = 'RUNNING';
    loadDeals(link);
    const interval = setInterval( async function() {
        scrapeHtml(link);
        console.log('M Free Samples ==> CHECKED');
      }, monitorInterval)
}

async function getStatus(){
    return new Promise((resolve, reject) => {
      resolve(STATUS);
    });
}

monitor();

module.exports = {
    getStatus,
}