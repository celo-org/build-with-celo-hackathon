
    // cryptoData.Oauth.getUser = function (email, callback) {
    //     var sql = 'SELECT * FROM coin_azer_user WHERE user_email = ?';
    //     con.query(sql, [email], function (err, res) {
    //       if (!err) {
    //         if (res.length === 1) {
    //           callback(200, res);
    //           // console.log(res);
    //         } else {
    //           callback(500, res)
    //           console.log(' sql.Oauth.getUser => User not found ');
    //         }
    //       } else {
    //         callback(500, { 'message': err });
    //         console.log(' sql.Oauth.getUser => Error ');
    //       }
    //     });
    // };

    sql.coin.allQuery((err, res) => {
        if (err) {
            res.forEach((data) => {
                // data.name = `${data.name} coin`
                axios.get(`https://api.coingecko.com/api/v3/coins/${data.coin_id}`)
                    .then(e => {
                        return e;
                    }).then(async (x) => {
                        if (x.status === 200) {
                            res.push(x);
                            // await callback(200, res);
                            // console.log(x);
                            await callback(res);
                        }
                    }).catch(function (error) {
                        // handle error
                        callback(500, error);
                    });
            })
            // callback(200, res)
            // console.log(res);
        }
    });

    
    
    // let endpoints = [
    //     'https://api.github.com/users/ejirocodes',
    //     'https://api.github.com/users/ejirocodes/repos',
    //     'https://api.github.com/users/ejirocodes/followers',
    //     'https://api.github.com/users/ejirocodes/following'
    // ];

    // await axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
    //     (data) => callback(data),
    // );
    
    
    // let btc = await CoinGeckoClient.coins.fetch('bitcoin', {});
    // let eth = await CoinGeckoClient.coins.fetch('ethereum', {});
    // let bnb = await CoinGeckoClient.coins.fetch('binancecoin', {});
    // let usdt = await CoinGeckoClient.coins.fetch('tether', {});

    // var arr1 = [btc];
    // var arr2 = [eth];
    // var arr3 = [bnb];
    // var arr4 = [usdt];

    // Array.prototype.push.apply(arr1, arr2, arr3);
    // callback(200, arr1);

    // axios.get("https://api.coingecko.com/api/v3/coins/binancecoin")
    //     .then((e) => {
    //         let dataObj = {
    //             // price: e.data.market_data.current_price.usd.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
    //             price: e.data.market_data.current_price.usd,
    //             img: e.data.image.small,
    //             name: e.data.localization.en,
    //             market_cap_rank: e.data.market_data.market_cap_rank,
    //             market_cap: e.data.market_data.market_cap.usd,

    //         };

    //         // callback(200, dataObj);
    //     })

    // axios.get('https://api.coingecko.com/api/v3/coins/binancecoin').then(function (e) {

    //     let dataObj = {
    //         price: e.data.market_data.current_price.usd.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
    //         img: e.data.image.small,
    //         name: e.data.localization.en
    //     };

    //     callback(200, dataObj);
    //     // io.emit('chat message', msg + ' ' + e.data.localization.en + '<==> Price : ' + e.data.market_data.current_price.usd.toLocaleString('en-US', { style: 'currency', currency: 'USD' }))
    // }).catch(function (error) {
    //     // handle error
    //     console.log(error);
    // }).then(function () {
    //     // always executed
    // });

