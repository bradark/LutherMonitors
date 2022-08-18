const axios = require('axios');
const cheerio = require('cheerio');
const request = require('request');

const {getFreebieLink,} = require('./../models/d_of_america.model.js');

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
      link: $(element).find('a').first().attr('href')
    }
    console.log(freebieData);
  });
}

async function start() {
  let link = await getFreebieLink();
  scrapeHtml(link);
  const interval = setInterval( async function() {
    let link = await getFreebieLink();
    scrapeHtml(link);
  }, 300000)
}

async function test(){
  let link = await getFreebieLink();
  scrapeHtml(link);
}

test();
