const axios = require('axios');
const cheerio = require('cheerio');

const {getFreebieLink, addFreebie, getFreebies} = require('./../models/d_of_america.model.js');

const { sendToWebhook, sendToHFWebhook, sendToPriceErrorWebhook, sendToFreebieWebhook } =  require('./../controllers/discord.controller');

const monitorIntervarl = 60000;

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
    console.log('DofA Freebies ==> LOADED');
    loadData(res.data);
  }).catch((err) => {
    console.log(err);
  });
}

async function loadData(html){
  const $ = cheerio.load(html);
  $('.deal').each(async(index, element) => {
    let freebieData = {
      title: $(element).find('.title').text(),
      link: $(element).find('.title').find('a').attr('href')
    }
    let newF = await newFreebie(freebieData);
    if(newF == true){
      addFreebie(freebieData);
    }
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
      addFreebie(freebieData);
      sendToFreebieWebhook(`${freebieData.title} --- ${freebieData.link}`);
    }
  });
}

async function newFreebie(freebie){
  return new Promise(async (resolve, reject) => {
    var contains = true;
    let freebies = await getFreebies();
    freebies.forEach((item, i) => {
      if(item.title == freebie.title){
        contains = false;
      }
    });
    resolve(contains);
  });
}

async function monitor() {
  let link = await getFreebieLink();
  STATUS = 'RUNNING';
  loadDeals(link);
  const interval = setInterval( async function() {
    scrapeHtml(link);
    console.log('DofA ==> CHECKED');
  }, monitorIntervarl)
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