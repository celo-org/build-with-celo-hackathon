const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
const axios = require('axios');
// const sql = require('./sql');

var cryptoData = {};

// var episode = new Object();
// episode.title = response.title;
// episodes.push(episode);



cryptoData.getPricingData = async (data, callback) => {

    let btc = await CoinGeckoClient.coins.fetch('bitcoin', {});
    let eth = await CoinGeckoClient.coins.fetch('ethereum', {});
    let bnb = await CoinGeckoClient.coins.fetch('binancecoin', {});
    let usdt = await CoinGeckoClient.coins.fetch('tether', {});

    var arr1 = [btc];
    var arr2 = [eth];
    var arr3 = [bnb];
    var arr4 = [usdt];

    Array.prototype.push.apply(arr1, arr2);
    Array.prototype.push.apply(arr3, arr4);

    Array.prototype.push.apply(arr1, arr3);

    callback(200, arr1);
};

cryptoData.allCrypto = async function(data, callback) {
    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cbinancecoin%2Ctether%2Cethereum&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true')
    .then( await function(e){
         callback(200, e);
    });
};


cryptoData.returnData = function (data) {
    // callback(200, data);
    console.log(data);
}

axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cbinancecoin%2Ctether%2Cethereum&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true')
    .then(function(e){

        // console.log(e.data.bitcoin);

        e.data.forEach((x) => {
            console.log(x);
        })

        // for (var key in e.data.bitcoin) {
        //     if (p.hasOwnProperty(key)) {
        //         console.log(key + " -> " + p[key]);
        //     }
        // }


        // for (const key of Object.keys(e.data.bitcoin)) { Didn't work
        //     console.log(key, obj[key]);
        // }

        // Object.keys(e.data).forEach(function (key) { //// Didn't work
        //     console.log(key, obj[key]);
        // });

        // Object.size = function (obj) {
        //     var size = 0, key;
        //     for (key in obj) {
        //         if (obj.hasOwnProperty(key)) size++;
        //     }
        //     return size;
        // };    // Get the size of an object
        // const myObj = e.data;
        // var size = Object.size(myObj);
        // console.log(size);

        //   let dataObj = {
        //     price: e.data.market_data.current_price.usd.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
        //     img: e.data.image.small,
        //     name: e.data.localization.en
        //   };

    }).catch(function (error) {
        // handle error
        // console.log(error);
    }).then(function () {
        // always executed
    });



module.exports = cryptoData;
