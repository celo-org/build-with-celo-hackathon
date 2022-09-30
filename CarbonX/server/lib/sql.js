/*
 *  
 * All Query goes here
 * 
 */

// Dependencies
const helpers = require("./helpers");
const mysql = require('mysql');
const mail = require('./mail');
var Sniffr = require("sniffr");
var s = new Sniffr();


// Bitcoin
const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

// Ethereum Network
var Web3 = require('web3')
var url = "https://mainnet.infura.io/v3/96272c583c704637946557e18fb3508e"
var web3 = new Web3(url)

// Ethereum Classic
var etherClassicUrl = "https://blockscout.com/etc/mainnet/api/eth-rpc"
var etherClassic = new Web3(etherClassicUrl)

// Solana
const solanaWeb3 = require('@solana/web3.js');

// connection = new solanaWeb3.Connection(rpcUrl, 'confirmed');

// Litecoin and Dogecoin 
var CoinKey = require('coinkey')    //1.0.0
var coinKeyWallet = new CoinKey.createRandom();
var coinInfo = require('coininfo')  //0.1.0
var dogeInfo = coinInfo('DOGE').versions //Doge
var ltc = coinInfo('LTC').versions // Litecoin

// XRP(Ripple)
const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI();
const xrpAddress = api.generateAddress();


// Connect to mysql server
// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     // Database: "nodejsmydb"
//     database: "coinazer_db"
// });

// Connect to mysql server
var con = mysql.createConnection({
  host: "localhost",
  user: "coinazer_user",
  password: "Cyfa________@Inc1.",
  // database: "nodejsmydb"
  database: "coinazer_db"
});

let sql = {};

// Get Countries Json
sql.getCountries = function (callback) {
  var sql = 'SELECT * FROM countries';
  con.query(sql, function (err, res) {
    if (!err) {
      callback(200, res);
    } else {
      callback(500, err);
    }
  });
}

/*
 * 
 * Get users 
 * 
*/

sql.user = {};

sql.user.create = function () {

};

// Checking whether email exist
sql.user.query = function (email, callback) {
  var sql = 'SELECT * FROM coin_azer_user WHERE user_email = ?';
  con.query(sql, [email], function (err, result) {
    if (!err) {
      callback(200, result.length);
      console.log('From sql.user.query => ' + result.length);
    } else {
      callback(500, { 'message': err });
    }
  });
  // con.end();

  // Object.keys(result).forEach(function(key) {
  //     var row = result[key];
  //     console.log(row.name)
  //   });
};

// Get All user information
sql.user.getUserInfo = function (email, callback) {
  var sql = 'SELECT * FROM coin_azer_user WHERE user_email = ?';
  con.query(sql, [email], function (err, result) {
    if (!err) {
      callback(200, result);
    } else {
      callback(500, err);
    }
  });
  // con.end();

  // Object.keys(result).forEach(function(key) {
  //     var row = result[key];
  //     console.log(row.name)
  //   });
};

// Insertting new data
sql.user.insert = function (firstName, lastName, email, password, device, callback) {

  var hashedPassword = helpers.hash(password);
  let mnemonic = coinKeyWallet.privateKey.toString('hex');
  let live_Key = "live_key_" + helpers.createRandomString(38);
  let live_Pub = "live_pub_" + helpers.createRandomString(88);
  let test_Pub = "test_pub_" + helpers.createRandomString(88);
  let api_Key = helpers.hash(mnemonic);
  let webhook_key = helpers.createRandomString(48);
  let zero = '0';
  let otp = helpers.otp(6);
  // let test_Key = "test_key_"+helpers.createRandomString(38);

  let mailOptions = {
    from: `customerdeck@coinazer.com`, // sender address
    to: email,
    subject: "Your Coinazer OTP", // Subject line
    html: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link
            href="https://fonts.googleapis.com/css?family=Quicksand:400,500,600,700&amp;display=swap"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="css/all.css" />
          <!-- <link href="public/css/email-verify.css" rel="stylesheet" type="text/css" /> -->
          <title>Document</title>
        </head>
        <style>
          body {
            background: rgb(238, 238, 238);
            font-family: 'Roboto', sans-serif;
          }
          p {
            margin: 0;
          }
          .container {
            width: 50%;
            margin: auto;
          }
          header {
            width: 100%;
            display: flex;
            justify-content: center;
            padding: 20px 0;
            background: #fff;
            border-bottom: 3px solid rgb(0, 153, 255);
          }
          .head-logo {
            width: 20%;
          }
          .head-logo img {
            width: 100%;
          }
          .first-sec {
            width: 100%;
            background: #fff;
            border-radius: 5px 5px 0px 0px;
            padding-top: 30px;
          }
          .first-sec-top {
            margin-bottom: 30px;
            width: 80%;
            margin: auto;
          }
          .first-sec-top h1 {
            text-align: center;
            font-size: 3rem;
            line-height: 5rem;
            color: #444;
          }
          .first-sec-mid {
            width: 80%;
            margin: auto;
          }
          .first-sec-mid p {
            text-align: center;
            font-weight: 600;
            color: rgb(80, 79, 79);
            line-height: 2rem;
            font-size: 1.1rem;
          }
          .first-sec-mid p span {
            color: rgb(0, 153, 255);
          }
          .first-sec-lst {
            margin-top: 30px;
            width: 80%;
            margin: 0 auto;
            text-align: center;
          }
          .first-sec-lst p {
            font-size: 3rem;
            letter-spacing: 2rem;
            font-weight: 600;
            color: rgb(0, 153, 255);
            padding-bottom: 20px;
            padding-top: 50px;
          }
          .second-sec {
            background: #fff;
            width: 100%;
            padding-top: 50px;
          }
          .secnd-top {
            width: 100%;
            margin: auto;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .secnd-top-p {
            margin-right: 20px;
          }
          .secnd-top-p h4 {
            font-size: 1.1rem;
            color: #777;
            margin: 0;
          }
          .secnd-top-i {
            display: flex;
          }
          .secnd-top-i i {
            margin-right: 20px;
            font-size: 1.1rem;
            color: #777;
          }
          .second-btm {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 10px;
          }
          .second-btm p {
            font-size: 0.9rem;
            color: #777;
            font-weight: 600;
            padding-bottom: 20px;
            text-align: center;
          }
          .third-sec {
            background: rgb(0, 153, 255);
            padding: 10px;
            padding-left: 50px;
          }
          .third-sec h3,
          .third-sec p {
            margin: 0;
          }
          .third-sec h3 {
            font-size: 1rem;
            color: #fff;
            padding-bottom: 15px;
          }
          .third-sec p {
            font-size: 0.9rem;
            color: #fff;
            padding-bottom: 15px;
          }
          footer {
            width: 100%;
            padding-top: 20px;
            padding-bottom: 20px;
            background: #fff;
          }
          .first-foot {
            display: flex;
          }
          .first-foot div {
            width: 33.3%;
            text-align: center;
          }
          .first-foot div:nth-child(2) {
            border-right: 1px solid rgb(0, 153, 255);
            border-left: 1px solid rgb(0, 153, 255);
          }
          .first-foot div a {
            text-decoration: none;
            font-weight: 600;
            font-size: 0.9rem;
          }
          .second-foot {
            padding-top: 20px;
            text-align: center;
            color: #777;
            font-size: 0.9rem;
          }
      
          /*
      
      <----MEDIA QUERY---->
      
      
      */
          @media (max-width: 1280px) {
            .container {
              width: 70%;
            }
          }
          @media (max-width: 940px) {
            .container {
              width: 70%;
            }
            .first-sec-top h1 {
              text-align: center;
              font-size: 2.5rem;
              line-height: 3rem;
            }
            .first-sec-mid p {
              text-align: center;
              font-weight: 600;
              color: rgb(80, 79, 79);
              line-height: 1.8rem;
              font-size: 1rem;
            }
          }
          @media (max-width: 800px) {
            .container {
              width: 90%;
            }
          }
          @media (max-width: 615px) {
            .container {
              width: 100%;
            }
            .head-logo {
              width: 30%;
            }
            .first-sec-top h1 {
              text-align: center;
              font-size: 2rem;
            }
          }
          @media (max-width: 415px) {
            .first-sec-lst p {
              font-size: 2.5rem;
            }
          }
        </style>
        <body>
          <div class="container">
            <header>
              <div class="head-logo">
                <img src="localhost:3000/public/images/coinazer-full.png" alt="" />
              </div>
            </header>
            <section class="first-sec">
              <div class="first-sec-top">
                <h1>
                  Thanks for signing up,
                  <br />
                  <span>${firstName} ${lastName}</span>
                  !
                </h1>
              </div>
              <div class="first-sec-mid">
                <p>
                  Thank you for choosing Coinazer. Use the following OTP to complete
                  your Sign Up procedures. OTP is valid for 1 hour.
                  <br />
                  <span>Thank you!</span>
                </p>
              </div>
              <div class="first-sec-lst">
                <p>${otp}</p>
              </div>
            </section>
            <section class="second-sec">
              <div class="secnd-top">
                <div class="secnd-top-p">
                  <h4>Follow us:</h4>
                </div>
                <div class="secnd-top-i">
                  <a href="#"><i class="fa-brands fa-facebook-square"></i></a>
                  <a href="#"><i class="fa-brands fa-twitter-square"></i></a>
                  <a href="#"><i class="fa-brands fa-instagram-square"></i></a>
                  <a href="#"><i class="fa-brands fa-linkedin"></i></a>
                </div>
              </div>
              <div class="second-btm">
                <p>Contact us: +234 704 4591 458 | info@coinazar.com</p>
              </div>
            </section>
            <div class="third-sec">
              <h3>Have question?</h3>
              <p>
                We are here to help. Learn more about us here
                <br />
                or contact us
              </p>
            </div>
            <footer>
              <div class="first-foot">
                <div>
                  <a href="#">Sign Up</a>
                </div>
                <div>
                  <a href="#">Blog</a>
                </div>
                <div>
                  <a href="#">About Us</a>
                </div>
              </div>
              <div class="second-foot">
                Copyright &copy; Coinazer 2022
              </div>
            </footer>
          </div>
        </body>
        </html>`,
  };

  let outputData = {
    Oauth_hash: api_Key,
    firstname: firstName,
    lastname: lastName,
    emailAccount: email,
    verified: 0
  };

  var sql_user = `INSERT INTO coin_azer_user (first_name, last_name, user_email, password, verify_user, live_secret_key, live_public_key, test_public_key, test_webhook_key, api_key, device) 
            VALUES ('${firstName}', '${lastName}', '${email}', '${hashedPassword}', '${zero}', '${live_Key}', '${live_Pub}', '${test_Pub}', '${webhook_key}', '${api_Key}', '${device}')`;
  con.query(sql_user, function (err, result) {
    if (!err) {
      sql.Oauth.query(email, (err, rez) => {
        if (err) { // I don't why error handling work the opposite way here
          if (rez > 0) {

            sql.Oauth.delete(email, (err, res) => {
              if (err) {
                sql.Oauth.insert(email, otp, api_Key, webhook_key, device, (err, res) => {
                  if (err) {
                    mail.send(mailOptions, (err) => {
                      if (err) {
                        callback(200, outputData);
                      } else {
                        callback(500, { 'meaasge': 'Error sending email' });
                        console.log('Error sending email');
                      }
                    });
                  } else {
                    callback(500, { 'message': 'Error inserting email' });
                    console.log('Error inserting email to email_oauth database 1');
                  }
                });
              } else {
                callback(500, { 'message': 'Error deleting mail' });
                console.log('Error deleting mail from email_oauth database 1');
              }
            });

          } else {

            sql.Oauth.insert(email, otp, api_Key, webhook_key, device, (err, res) => {
              if (err) {
                mail.send(mailOptions, (err) => {
                  if (err) {
                    callback(200, outputData);
                  } else {
                    callback(500, { 'meaasge': 'Error sending email' });
                    console.log('Error sending email');
                  }
                });
              } else {
                callback(500, { 'message': 'Error inserting email' });
                console.log('Error inserting email to email_oauth database 2');
              }
            });
          }
        } else {
          callback(500, { 'message': 'Error querying email' });
          console.log('Error querying email from email_oauth');
        }
      });
      // sql.Oauth.query()
      // callback(false);
      // console.log("From sql.user.insert => Message" + result.message);
    } else {
      callback(500, { 'Error': 'An error occured' });
    }
  });
  //  var sql = `INSERT INTO coin_azer_user (first_name, last_name, user_email, password, verify_user, live_secret_key, live_public_key, test_public_key, test_webhook_key, api_key, device) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;
  //  var values = [firstName, lastName, email, hashedPassword, zero, live_Key, live_Pub, test_Pub, webhook_key, api_Key, device];
};
///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/**
 * 
 *   Oauth Objects
 * 
 **/

sql.Oauth = {};

/**
 *  Query for email_oauth for an exiting otp
 * @param {*} email  
 */
sql.Oauth.query = function (email, callback) {
  var sql = 'SELECT * FROM email_oauth WHERE userEmail = ?';
  con.query(sql, [email], function (err, result) {
    if (!err) {
      callback(200, result.length);
    } else {
      callback(500, { 'message': err });
    }
  });
};

/**
 *  Query for email_oauth for looping out data
 * @param {*} email  
 */
sql.Oauth.queryEmailOauth = function (email, callback) {
  var sql = 'SELECT * FROM email_oauth WHERE userEmail = ?';
  con.query(sql, [email], function (err, result, fields) {
    if (!err) {
      callback(200, result);
    } else {
      callback(500, { 'message': err });
    }
  });
};

/**
 * 
 * Inserting data to email_oauth for OTP Authentication
 * 
 * @param {*} email 
 * @param {*} otp 
 * @param {*} keyChain 
 * @param {*} hash 
 * @param {*} callback
 * 
 */
sql.Oauth.insert = function (email, otp, keyChain, hash, device, callback) {
  let expires = Date.now() + 1000 * 60 * 60;
  let created = Date.now();

  let sql = `INSERT INTO email_oauth (OauthCode, created_at, expire_at, userEmail, keyChain, hash, device) 
            VALUES ('${otp}', '${created}', '${expires}', '${email}', '${keyChain}', '${hash}',  '${device}')`;
  con.query(sql, function (err, result) {
    if (!err) {
      callback(200, result.affectedRows);
      console.log("From sql.Oauth.insert => serverStatus" + result.serverStatus);
    } else {
      callback(500, { 'Error': 'An error occured' });
    }
  });
};

/**
 *  Delete exiting otp before inserting a new one
 * @param {*} email  
 * @param {*} callback  
 */
sql.Oauth.delete = function (email, callback) {
  var sql = 'DELETE FROM email_oauth WHERE userEmail = ?';
  con.query(sql, [email], function (err, result) {
    if (!err) {
      callback(200, result.affectedRows);
    } else {
      callback(500, { 'message': err });
    }
  });
};

/**
 *  Verify OTP Process
 * @param {*} queryString
 *  
 */
sql.Oauth.verifyOTPQueryString = function (queryString, callback) {
  var sql = 'SELECT * FROM email_oauth WHERE keyChain = ?';
  con.query(sql, [queryString], function (err, res) {
    if (!err) {
      if (res.length === 1) {
        callback(200, { 'message': res.length, 'result': res });
      } else {
        callback(500, { 'message': `Invalid Url(${queryString}), Kindly request for another OTP` })
      }
    } else {
      callback(500, { 'message': err });
    }
  });
};

/**
 *  Get otp process
 * @param {*} otp 
 * 
 */
sql.Oauth.getOtp = function (otp, callback) {
  var sql = 'SELECT * FROM email_oauth WHERE OauthCode = ?';
  con.query(sql, [otp], function (err, res) {
    if (!err) {
      if (res.length === 1) {
        callback(200, { 'message': res.length, 'result': res });
      } else {
        callback(500, { 'message': `Invalid Code(${otp}), Kindly request for another OTP` })
      }
    } else {
      callback(500, { 'message': err });
    }
  });
};

/**
 *  Resend otp process
 * @param {*} email 
 * 
 */
sql.Oauth.resendOtp = function (email, device, callback) {
  let mnemonic = coinKeyWallet.privateKey.toString('hex');
  let api_Key = helpers.hash(mnemonic);
  let webhook_key = helpers.createRandomString(48);
  let zero = '0';
  let otp = helpers.otp(6);
  let mailOptions = {
    from: `customerdeck@coinazer.com`, // sender address
    to: email,
    subject: "Your Coinazer OTP", // Subject line
    //   text: "Hello world?", // plain text body
    html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css?family=Quicksand:400,500,600,700&amp;display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="css/all.css" />
        <!-- <link href="public/css/email-verify.css" rel="stylesheet" type="text/css" /> -->
        <title>Document</title>
      </head>
      <style>
        body {
          background: rgb(238, 238, 238);
          font-family: 'Roboto', sans-serif;
        }
        p {
          margin: 0;
        }
        .container {
          width: 50%;
          margin: auto;
        }
        header {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 20px 0;
          background: #fff;
          border-bottom: 3px solid rgb(0, 153, 255);
        }
        .head-logo {
          width: 20%;
        }
        .head-logo img {
          width: 100%;
        }
        .first-sec {
          width: 100%;
          background: #fff;
          border-radius: 5px 5px 0px 0px;
          padding-top: 30px;
        }
        .first-sec-top {
          margin-bottom: 30px;
          width: 80%;
          margin: auto;
        }
        .first-sec-top h1 {
          text-align: center;
          font-size: 3rem;
          line-height: 5rem;
          color: #444;
        }
        .first-sec-mid {
          width: 80%;
          margin: auto;
        }
        .first-sec-mid p {
          text-align: center;
          font-weight: 600;
          color: rgb(80, 79, 79);
          line-height: 2rem;
          font-size: 1.1rem;
        }
        .first-sec-mid p span {
          color: rgb(0, 153, 255);
        }
        .first-sec-lst {
          margin-top: 30px;
          width: 80%;
          margin: 0 auto;
          text-align: center;
        }
        .first-sec-lst p {
          font-size: 3rem;
          letter-spacing: 2rem;
          font-weight: 600;
          color: rgb(0, 153, 255);
          padding-bottom: 20px;
          padding-top: 50px;
        }
        .second-sec {
          background: #fff;
          width: 100%;
          padding-top: 50px;
        }
        .secnd-top {
          width: 100%;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .secnd-top-p {
          margin-right: 20px;
        }
        .secnd-top-p h4 {
          font-size: 1.1rem;
          color: #777;
          margin: 0;
        }
        .secnd-top-i {
          display: flex;
        }
        .secnd-top-i i {
          margin-right: 20px;
          font-size: 1.1rem;
          color: #777;
        }
        .second-btm {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 10px;
        }
        .second-btm p {
          font-size: 0.9rem;
          color: #777;
          font-weight: 600;
          padding-bottom: 20px;
          text-align: center;
        }
        .third-sec {
          background: rgb(0, 153, 255);
          padding: 10px;
          padding-left: 50px;
        }
        .third-sec h3,
        .third-sec p {
          margin: 0;
        }
        .third-sec h3 {
          font-size: 1rem;
          color: #fff;
          padding-bottom: 15px;
        }
        .third-sec p {
          font-size: 0.9rem;
          color: #fff;
          padding-bottom: 15px;
        }
        footer {
          width: 100%;
          padding-top: 20px;
          padding-bottom: 20px;
          background: #fff;
        }
        .first-foot {
          display: flex;
        }
        .first-foot div {
          width: 33.3%;
          text-align: center;
        }
        .first-foot div:nth-child(2) {
          border-right: 1px solid rgb(0, 153, 255);
          border-left: 1px solid rgb(0, 153, 255);
        }
        .first-foot div a {
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .second-foot {
          padding-top: 20px;
          text-align: center;
          color: #777;
          font-size: 0.9rem;
        }
    
        /*
    
    <----MEDIA QUERY---->
    
    
    */
        @media (max-width: 1280px) {
          .container {
            width: 70%;
          }
        }
        @media (max-width: 940px) {
          .container {
            width: 70%;
          }
          .first-sec-top h1 {
            text-align: center;
            font-size: 2.5rem;
            line-height: 3rem;
          }
          .first-sec-mid p {
            text-align: center;
            font-weight: 600;
            color: rgb(80, 79, 79);
            line-height: 1.8rem;
            font-size: 1rem;
          }
        }
        @media (max-width: 800px) {
          .container {
            width: 90%;
          }
        }
        @media (max-width: 615px) {
          .container {
            width: 100%;
          }
          .head-logo {
            width: 30%;
          }
          .first-sec-top h1 {
            text-align: center;
            font-size: 2rem;
          }
        }
        @media (max-width: 415px) {
          .first-sec-lst p {
            font-size: 2.5rem;
          }
        }
      </style>
      <body>
        <div class="container">
          <header>
            <div class="head-logo">
              <img src="localhost:3000/public/images/coinazer-full.png" alt="" />
            </div>
          </header>
          <section class="first-sec">
            <div class="first-sec-top">
              <h1>
                Thanks for signing up,
                <br />
              </h1>
            </div>
            <div class="first-sec-mid">
              <p>
                Thank you for choosing Coinazer. Use the following OTP to complete
                your Sign Up procedures. OTP is valid for 1 hour.
                <br />
                <span>Thank you!</span>
              </p>
            </div>
            <div class="first-sec-lst">
              <p>${otp}</p>
            </div>
          </section>
          <section class="second-sec">
            <div class="secnd-top">
              <div class="secnd-top-p">
                <h4>Follow us:</h4>
              </div>
              <div class="secnd-top-i">
                <a href="#"><i class="fa-brands fa-facebook-square"></i></a>
                <a href="#"><i class="fa-brands fa-twitter-square"></i></a>
                <a href="#"><i class="fa-brands fa-instagram-square"></i></a>
                <a href="#"><i class="fa-brands fa-linkedin"></i></a>
              </div>
            </div>
            <div class="second-btm">
              <p>Contact us: +234 704 4591 458 | info@coinazar.com</p>
            </div>
          </section>
          <div class="third-sec">
            <h3>Have question?</h3>
            <p>
              We are here to help. Learn more about us here
              <br />
              or contact us
            </p>
          </div>
          <footer>
            <div class="first-foot">
              <div>
                <a href="#">Sign Up</a>
              </div>
              <div>
                <a href="#">Blog</a>
              </div>
              <div>
                <a href="#">About Us</a>
              </div>
            </div>
            <div class="second-foot">
              Copyright &copy; Coinazer 2022
            </div>
          </footer>
        </div>
      </body>
              </html>`, // html body
  };
  let outputData = {
    Oauth_hash: api_Key,
    emailAccount: email,
  };

  sql.Oauth.query(email, (err, rez) => {
    if (err) { // I don't why error handling work the opposite way here
      if (rez > 0) {
        sql.Oauth.delete(email, (err, res) => {
          if (err) {
            sql.Oauth.insert(email, otp, api_Key, webhook_key, device, (err, res) => {
              if (err) {
                mail.send(mailOptions, (err) => { // Sending mail
                  if (err) {
                    callback(200, outputData);
                    //Getting user information
                    // sql.user.getUserInfo(email, function(err, res){
                    //   if(err){
                    //     callback(200, res);
                    //   }else{
                    //     callback(500, {'message': 'User not found'});
                    //     console.log('sql.Oauth.resendOtp => User not found');
                    //   }
                    // });
                  } else {
                    callback(500, { 'meaasge': 'Error sending email' });
                  }
                });
              } else {
                callback(500, { 'message': 'Error inserting email' });
                console.log('sql.Oauth.query => Error inserting email to email_oauth database 1');
              }
            });
          } else {
            callback(500, { 'message': 'Error deleting mail' });
            console.log('sql.Oauth.query => Error deleting mail from email_oauth database 1');
          }
        });
      } else {

        sql.Oauth.insert(email, otp, api_Key, webhook_key, device, (err, res) => {
          if (err) {
            mail.send(mailOptions, (err) => {
              if (err) {
                callback(200, outputData);
                //Getting user information
                // sql.user.getUserInfo(email, function(err, res){
                //   if(err){
                //     callback(200, res);
                //   }else{
                //     callback(500, {'message': 'User not found'});
                //     console.log('sql.Oauth.resendOtp 2 =>User not found');
                //   }
                // });  
              } else {
                callback(500, { 'meaasge': 'Error sending email' });
                console.log('sql.Oauth.resendOtp =>Error sending email');
              }
            });
          } else {
            callback(500, { 'message': 'Error inserting email' });
            console.log('Error inserting email to email_oauth database 2');
          }
        });
      }
    } else {
      callback(500, { 'message': 'Error querying email' });
      console.log('sql.Oauth.resendOtp => Error querying email from email_oauth');
    }
  });
};

/**
 * Get all user info from coin_azer_user
 * @param {*} email 
 * @param {*} callback 
 */
sql.Oauth.getUser = function (email, callback) {
  var sql = 'SELECT * FROM coin_azer_user WHERE user_email = ?';
  con.query(sql, [email], function (err, res) {
    if (!err) {
      if (res.length === 1) {
        callback(200, res);
        // console.log(res);
      } else {
        callback(500, res)
        console.log(' sql.Oauth.getUser => User not found ');
      }
    } else {
      callback(500, { 'message': err });
      console.log(' sql.Oauth.getUser => Error ');
    }
  });
};

/**
 * Change user password
 * @param {*} email 
 * @param {*} password 
 * @param {*} callback 
 */
sql.Oauth.changePassword = function (email, password, callback) {
  var sql = "UPDATE coin_azer_user SET password  = ? WHERE user_email = ?";
  con.query(sql, [password, email], function (err, result) {
    if (!err) {
      callback(200, result.affectedRows);
    } else {
      callback(500, err);
    }
  });
};

/**
 *  Update User Info
 * @param {*} email 
 * @param {*} first_name 
 * @param {*} last_name 
 * @param {*} profession 
 * @param {*} country 
 * @param {*} country_iso2 
 * @param {*} twitter 
 * @param {*} instagram 
 * @param {*} callback 
 */
sql.Oauth.updateUserInfo = function (email, first_name, last_name, profession, country, country_iso2, twitter, instagram, callback) {

  var sql = "UPDATE coin_azer_user SET first_name = ?, last_name = ?, profession = ?, country = ?, country_iso2 = ?, twitter = ?, instagram = ? WHERE user_email = ?";
  con.query(sql, [first_name, last_name, profession, country, country_iso2, twitter, instagram, email], function (err, result) {
    if (!err) {
      callback(200, result.affectedRows);
    } else {
      callback(500, err);
    }
  });
};
////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
/**
 * 
 * Handling Token
 * 
 */
sql.Oauth._token = {};

// let mnemonic = coinKeyWallet.privateKey.toString('hex');

/**
 * Inserting a token to azer_auth_user
 * @param {*} email 
 * @param {*} device 
 * @param {*} callback
 *  
 */
sql.Oauth._token.post = function (email, device, callback) {

  // let hashedPassword = helpers.hash(password);
  let mnemonic = coinKeyWallet.privateKey.toString('hex');
  let tokenId = helpers.hash(mnemonic);
  let expires_at = Date.now() + 1000 * 60 * 60;
  let created_at = Date.now();
  let track_code = helpers.createRandomString(10);

  let tokenObject = {
    azer_token: tokenId,
    expires_at: expires_at
  };
  sql.Oauth.getUser(email, (err, res) => {
    if (err) {
      if (res.length > 0) {
        //  if(hashedPassword === res.result[0].password){
        sql.Oauth._token.queryEmail(email, (err, emailResult) => {
          if (emailResult.length > 0) {
            sql.Oauth._token.delete(email, (err, delResult) => {
              if (delResult > 0) {

                let sql = `INSERT INTO azer_auth_token (userEmail, token, created_at, expire_at, track_code, device) 
                      VALUES ('${email}', '${tokenId}', '${created_at}', '${expires_at}', '${track_code}', '${device}')`;
                con.query(sql, function (err, result) {
                  if (!err) {
                    callback(200, tokenObject);
                  } else {
                    callback(500, { 'Error': 'An error occured' });
                  }
                });

              } else {
                callback(500, 'Error occured while tring to delete the token data');
                console.log(' sql.Oauth._token.post => Error occured while tring to delete the token data');
              }
            });
          } else {

            let sql = `INSERT INTO azer_auth_token (userEmail, token, created_at, expire_at, track_code, device) 
                VALUES ('${email}', '${tokenId}', '${created_at}', '${expires_at}', '${track_code}', '${device}')`;
            con.query(sql, function (err, result) {
              if (!err) {
                callback(200, tokenObject);
              } else {
                callback(500, { 'Error': 'An error occured' });
              }
            });

          }
        });

        //  }else{
        //     callback(500, {'message': 'Incorrect password, try again'});
        //     console.log('sql.Oauth._token.post => Password is does not match the account');
        //  }
        //  console.log(res.result[0]);
      } else {
        callback(500, { 'message': 'User not found' });
        console.log('sql.Oauth._token.post => Data is not > 0');
      }
      // console.log( `Success: ${res.result[0].api_key}`);
    } else {
      callback(500)
      console.log('sql.Oauth._token.post => Error');
    }
  });
};

/**
 *  Deleting a token with email, so that there will be duplicate email in database
 * @param {*} email 
 * @param {*} callback 
 */

sql.Oauth._token.delete = function (email, callback) {
  var sql = 'DELETE FROM azer_auth_token WHERE userEmail = ?';
  con.query(sql, [email], function (err, result) {
    if (!err) {
      callback(200, result.affectedRows);
    } else {
      callback(500, { 'message': err });
    }
  });
};

/**
 *  Update a token
 * @param {*} token 
 * @param {*} callback 
 */
sql.Oauth._token.put = function (token, callback) {
  let expires_at = Date.now() + 1000 * 60 * 60;
  var sql = "UPDATE azer_auth_token SET expire_at = ? WHERE token = ?";
  con.query(sql, [expires_at, token], function (err, result) {
    if (!err) {
      callback(200, { 'result': result.affectedRows });
    } else {
      callback(500, { 'message': err });
    }
  });
};

/**
 * Query azerOauth Token
 * @param {*} token 
 * @param {*} callback 
 */
sql.Oauth._token.queryToken = function (token, callback) {
  var sql = 'SELECT * FROM azer_auth_token WHERE token = ?';
  con.query(sql, [token], function (err, res) {
    if (!err) {
      callback(200, res);
    } else {
      callback(500, { 'message': err });
    }
  });
};


/**
 * Query azerOauth Email
 * @param {*} email 
 * @param {*} callback 
 */
sql.Oauth._token.queryEmail = function (email, callback) {
  var sql = 'SELECT * FROM azer_auth_token WHERE userEmail = ?';
  con.query(sql, [email], function (err, res) {
    if (!err) {
      callback(200, res);
    } else {
      callback(500, res);
    }
  });
};
//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/*
 * 
 * Password Recovery Process
 * 
 */

sql.Oauth.recovery = {};


/**
 * Inserting password recovery key chain
 * 
 * @param {*} email 
 * @param {*} device 
 * @param {*} callback 
 **/

sql.Oauth.recovery.insert = function (email, device, callback) {

  let expires = Date.now() + 1000 * 60 * 60;
  let created = Date.now();
  let mnemonic = coinKeyWallet.privateKey.toString('hex');
  let hash = helpers.hash(mnemonic);
  let track_code = helpers.createRandomString(8);
  let token = helpers.createRandomString(50);

  s.sniff(device);

  let outputData = {
    token: token,
    hash: hash
  };

  let mailOptions = {
    from: `customerdeck@coinazer.com`, // sender address
    to: email,
    subject: "Your token to reset Coinazer Wallet password ", // Subject line
    html: `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        href="https://fonts.googleapis.com/css?family=Quicksand:400,500,600,700&amp;display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="css/all.css" />
      <!-- <link href="public/css/email-verify.css" rel="stylesheet" type="text/css" /> -->
      <title>Document</title>
    </head>
    <style>
      body {
        background: rgb(238, 238, 238);
        font-family: 'Roboto', sans-serif;
      }
      p {
        margin: 0;
      }
      .container {
        width: 50%;
        margin: auto;
      }
      header {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 20px 0;
        background: #fff;
        border-bottom: 3px solid rgb(0, 153, 255);
      }
      .head-logo {
        width: 20%;
      }
      .head-logo img {
        width: 100%;
      }
      .first-sec {
        width: 100%;
        background: #fff;
        border-radius: 5px 5px 0px 0px;
        padding-top: 30px;
      }
      .first-sec-top {
        margin-bottom: 30px;
        width: 80%;
        margin: auto;
      }
      .first-sec-top h1 {
        text-align: center;
        font-size: 3rem;
        line-height: 5rem;
        color: #444;
      }
      .first-sec-mid {
        width: 80%;
        margin: auto;
      }
      .first-sec-mid p {
        text-align: center;
        font-weight: 600;
        color: rgb(80, 79, 79);
        line-height: 2rem;
        font-size: 1.1rem;
      }
      .first-sec-mid p span {
        color: rgb(0, 153, 255);
      }
      .first-sec-lst {
        margin-top: 30px;
        width: 80%;
        margin: 0 auto;
        text-align: center;
      }
      .first-sec-lst p {
        font-size: 3rem;
        letter-spacing: 2rem;
        font-weight: 600;
        color: rgb(0, 153, 255);
        padding-bottom: 20px;
        padding-top: 50px;
      }
      .second-sec {
        background: #fff;
        width: 100%;
        padding-top: 50px;
      }
      .secnd-top {
        width: 100%;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .secnd-top-p {
        margin-right: 20px;
      }
      .secnd-top-p h4 {
        font-size: 1.1rem;
        color: #777;
        margin: 0;
      }
      .secnd-top-i {
        display: flex;
      }
      .secnd-top-i i {
        margin-right: 20px;
        font-size: 1.1rem;
        color: #777;
      }
      .second-btm {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
      }
      .second-btm p {
        font-size: 0.9rem;
        color: #777;
        font-weight: 600;
        padding-bottom: 20px;
        text-align: center;
      }
      .third-sec {
        background: rgb(0, 153, 255);
        padding: 10px;
        padding-left: 50px;
      }
      .third-sec h3,
      .third-sec p {
        margin: 0;
      }
      .third-sec h3 {
        font-size: 1rem;
        color: #fff;
        padding-bottom: 15px;
      }
      .third-sec p {
        font-size: 0.9rem;
        color: #fff;
        padding-bottom: 15px;
      }
      footer {
        width: 100%;
        padding-top: 20px;
        padding-bottom: 20px;
        background: #fff;
      }
      .first-foot {
        display: flex;
      }
      .first-foot div {
        width: 33.3%;
        text-align: center;
      }
      .first-foot div:nth-child(2) {
        border-right: 1px solid rgb(0, 153, 255);
        border-left: 1px solid rgb(0, 153, 255);
      }
      .first-foot div a {
        text-decoration: none;
        font-weight: 600;
        font-size: 0.9rem;
      }
      .second-foot {
        padding-top: 20px;
        text-align: center;
        color: #777;
        font-size: 0.9rem;
      }
  
      /*
  
  <----MEDIA QUERY---->
  
  
  */
      @media (max-width: 1280px) {
        .container {
          width: 70%;
        }
      }
      @media (max-width: 940px) {
        .container {
          width: 70%;
        }
        .first-sec-top h1 {
          text-align: center;
          font-size: 2.5rem;
          line-height: 3rem;
        }
        .first-sec-mid p {
          text-align: center;
          font-weight: 600;
          color: rgb(80, 79, 79);
          line-height: 1.8rem;
          font-size: 1rem;
        }
      }
      @media (max-width: 800px) {
        .container {
          width: 90%;
        }
      }
      @media (max-width: 615px) {
        .container {
          width: 100%;
        }
        .head-logo {
          width: 30%;
        }
        .first-sec-top h1 {
          text-align: center;
          font-size: 2rem;
        }
      }
      @media (max-width: 415px) {
        .first-sec-lst p {
          font-size: 2.5rem;
        }
      }
    </style>
    <body>
      <div class="container">
        <header>
          <div class="head-logo">
            <img src="localhost:3000/public/images/coinazer-full.png" alt="" />
          </div>
        </header>
        <section class="first-sec">
          <div class="first-sec-top">
            <h1>
              Dear ${email},
            </h1>
          </div>
          <div class="first-sec-mid">
            <p>
              Thank you for choosing Coinazer. Use the following Link to complete
              your password recovery procedures, Link is valid for 1 hour.
              <br />
              <span>Thank you!</span>
            </p>
            <p>Operating System: ${s.os.name}, version: ${s.os.versionString}</p>
            <p>Browser: ${s.browser.name}, version: ${s.browser.versionString}</p>
          </div>
          <div class="first-sec-lst">
            <p><a href="localhost:4000/user/recovery/password?token=${token}&hash=${hash}">Click here</></a></p><br>
            copy this to your browser
            <p>localhost:4000/user/recovery/password?token=${token}&hash=${hash}</p>
          </div>
        </section>
        <section class="second-sec">
          <div class="secnd-top">
            <div class="secnd-top-p">
              <h4>Follow us:</h4>
            </div>
            <div class="secnd-top-i">
              <a href="#"><i class="fa-brands fa-facebook-square"></i></a>
              <a href="#"><i class="fa-brands fa-twitter-square"></i></a>
              <a href="#"><i class="fa-brands fa-instagram-square"></i></a>
              <a href="#"><i class="fa-brands fa-linkedin"></i></a>
            </div>
          </div>
          <div class="second-btm">
            <p>Contact us: +234 704 4591 458 | info@coinazer.com</p>
          </div>
        </section>
        <div class="third-sec">
          <h3>Have question?</h3>
          <p>
            We are here to help. Learn more about us here
            <br />
            or contact us
          </p>
        </div>
        <footer>
          <div class="first-foot">
            <div>
              <a href="#">Sign Up</a>
            </div>
            <div>
              <a href="#">Blog</a>
            </div>
            <div>
              <a href="#">About Us</a>
            </div>
          </div>
          <div class="second-foot">
            Copyright &copy; Coinazer 2022
          </div>
        </footer>
      </div>
    </body>
        </html>`, // html body
  };

  let sql = `INSERT INTO azer_password_recovery (track_code, created_at, expire_at, userEmail, token, hash, device) 
          VALUES ('${track_code}', '${created}', '${expires}', '${email}', '${token}', '${hash}',  '${device}')`;
  con.query(sql, function (err, result) {
    if (!err) {
      mail.send(mailOptions, (err) => {
        if (err) {
          callback(200, outputData);
        } else {
          callback(500, { 'meaasge': 'Error sending email' });
          console.log('Error sending email');
        }
      });

    } else {
      callback(500, { 'Error': 'sql.Oauth.recovery.insert => An error occured' });
    }
  });
};

/**
 *   Query azer_password_recovery {email}
 * @param {*} email 
 * @param {*} callback 
 */
sql.Oauth.recovery.query = function (email, callback) {
  var sql = 'SELECT * FROM azer_password_recovery WHERE userEmail = ?';
  con.query(sql, [email], function (err, res) {
    if (!err) {
      callback(200, res);
    } else {
      callback(500, res);
    }
  });
};

/**
 * Query azer_password_recovery {hash}
 * @param {*} hash 
 * @param {*} callback 
 */
sql.Oauth.recovery.queryHash = function (hash, callback) {
  var sql = 'SELECT * FROM azer_password_recovery WHERE hash = ?';
  con.query(sql, [hash], function (err, res) {
    if (!err) {
      callback(200, res);
    } else {
      callback(500, res);
    }
  });
};

/**
 * Query azer_password_recovery {token}
 * @param {*} token 
 * @param {*} callback 
 */
sql.Oauth.recovery.queryToken = function (token, callback) {
  var sql = 'SELECT * FROM azer_password_recovery WHERE token = ?';
  con.query(sql, [token], function (err, res) {
    if (!err) {
      callback(200, res);
    } else {
      callback(500, res);
    }
  });
};

/**
 *  Delete from azer_password_recovery {email}
 * @param {*} email 
 * @param {*} callback 
 */
sql.Oauth.recovery.delete = function (email, callback) {
  var sql = 'DELETE FROM azer_password_recovery WHERE userEmail = ?';
  con.query(sql, [email], function (err, result) {
    if (!err) {
      callback(200, result.affectedRows);
    } else {
      callback(500, { 'message': err });
    }
  });
};


/**
 *  User coin address.
 */

sql.coin = {};

/**
 * Handling Coin address private key 
 * @param {*} hash 
 * @param {*} token 
 * @param {*} device 
 * @param {*} callback 
 * 
 */
sql.coin.hashPost = function (hash, privateKey, device, callback) {
  let created_at = Date.now()
  let track_code = helpers.createRandomString(10)
  let sql = `INSERT INTO azer_hash (hash, token, created_at, trackCode, device) 
    VALUES ('${hash}', '${privateKey}', '${created_at}', '${track_code}', '${device}')`;
  con.query(sql, function (err, r) {
    if (!err) {
      callback(200, r);
    } else {
      callback(500, { 'Error': 'An error occured' });
    }
  });
}


// Export the module
module.exports = sql;

