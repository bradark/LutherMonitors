const axios = require('axios');
const cheerio = require('cheerio');

const TEST_URL = 'https://redsky.target.com/redsky_aggregations/v1/web_platform/product_fulfillment_v1?key=9f36aeafbe60771e321a7cc95a78140772ab3e96&is_bot=false&tcin=81114595&store_id=4&zip=55806&state=MN&latitude=46.760&longitude=-92.150&scheduled_delivery_store_id=4&required_store_id=4&has_required_store_id=true&channel=WEB&page=/p/undefined';

async function getProductInfo(link){
    let config = {
        headers: {
          'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
          'User-Agent':'Mozilla/5.0 (Windows NT 10.0; W in64; x64; rv:103.0) Gecko/20100101 Firefox/103.0',
        }
      };
      axios.get(link, config).then((res) => {
        let prodData = res.data;
        let fullfilData = res.data.data.product.fulfillment;
        let stockStatus = res.data.data.product.fulfillment.shipping_options.availability_status;
        console.log({ STOCK_STATUS: stockStatus, full_data: fullfilData, });
      }).catch((err) => {
        console.log(err);
      });
}

async function buildUrl(zip, sku){
    let url = 'https://redsky.target.com/redsky_aggregations/v1/web_platform/product_fulfillment_v1?key=9f36aeafbe60771e321a7cc95a78140772ab3e96&is_bot=false&tcin=81114595&store_id=4&zip=55806&state=MN&latitude=46.760&longitude=-92.150&scheduled_delivery_store_id=4&required_store_id=4&has_required_store_id=true&channel=WEB&page=/p/undefined';
}

async function monitor(){
    const interval = setInterval(function() {
        getProductInfo(TEST_URL);
    }, 30000);
}

getProductInfo();

//monitor();