const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const config = {
    headers: {
      'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'User-Agent':'Mozilla/5.0 (Windows NT 10.0; W in64; x64; rv:103.0) Gecko/20100101 Firefox/103.0',
    }
  }

const link = 'https://www.amazon.com/deals?ref_=nav_cs_gb&deals-widget=%257B%2522version%2522%253A1%252C%2522viewIndex%2522%253A0%252C%2522presetId%2522%253A%2522AB48D68973BA06D9DFD05723DA760601%2522%252C%2522discountRanges%2522%253A%255B%257B%2522sectionText%2522%253A%2522Discount%2522%252C%2522optionText%2522%253A%252210%2525%2520off%2520or%2520more%2522%252C%2522from%2522%253A10%252C%2522to%2522%253Anull%252C%2522selected%2522%253Afalse%257D%252C%257B%2522sectionText%2522%253A%2522Discount%2522%252C%2522optionText%2522%253A%252225%2525%2520off%2520or%2520more%2522%252C%2522from%2522%253A25%252C%2522to%2522%253Anull%252C%2522selected%2522%253Afalse%257D%252C%257B%2522sectionText%2522%253A%2522Discount%2522%252C%2522optionText%2522%253A%252250%2525%2520off%2520or%2520more%2522%252C%2522from%2522%253A50%252C%2522to%2522%253Anull%252C%2522selected%2522%253Afalse%257D%252C%257B%2522sectionText%2522%253A%2522Discount%2522%252C%2522optionText%2522%253A%252270%2525%2520off%2520or%2520more%2522%252C%2522from%2522%253A70%252C%2522to%2522%253Anull%252C%2522selected%2522%253Atrue%257D%255D%252C%2522primeExclusive%2522%253Atrue%252C%2522sorting%2522%253A%2522BY_SCORE%2522%257D';

async function getDealsPage(){
    return new Promise((resolve, reject) => {
        axios.get(link, config).then( async (res) => {
            resolve(res.data);
            fs.writeFile('./page.html', res.data, err => {
                if (err) {
                  console.error(err);
                }
                // file written successfully
              });
        }).catch((err) => {
            resolve(err);
        }); 
    });
}

async function parseDeals(html){
    return new Promise((resolve, reject) => {
        const $ = cheerio.load(html);
        $('a').each( async (index,element)=>{
            console.log($(element).text());
        });
    });
}

async function test(){
    let html = await getDealsPage();
    parseDeals(html);
    console.log('done');
}

test();