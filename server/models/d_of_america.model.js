const freebieLink = 'https://www.dealsofamerica.com/free-after-rebates.php';

const freebies = [];

async function getFreebieLink(){
  return new Promise(async (resolve, reject) => {
    resolve(freebieLink);
  });
}

async function addFreebie(freebieData){
  return new Promise((resolve, reject) => {
    freebies.push(freebieData);
  });
}

module.exports = {
  getFreebieLink,
  addFreebie,
}
