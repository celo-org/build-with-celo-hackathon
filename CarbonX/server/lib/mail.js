//Dependencies

var nodemailer = require('nodemailer');


// Container for mail
let mail = {};

// var trans = nodemailer.createTransport({
//   pool: true,
//   host: "localhost",
//   port: 25,
//   secure: false, // use TLS
//   auth: {
//     user: "cyfa@localhost.com",
//     pass: "achicago",
//   },
// });

let trans = nodemailer.createTransport({
  pool: true,
  host: "mail.caca.ng",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: "mails@caca.ng",
    pass: "teezardachicago",
  },
});

// let trans = nodemailer.createTransport({
//   pool: true,
//   host: "smtp.zoho.com",
//   port: 465,
//   secure: true, // use TLS
//   auth: {
//     user: "mails@megacare.ng",
//     pass: "Teezardachicago11!",
//   },
// });

// mail init
mail.init = () => {

  let transporter = nodemailer.createTransport({
    pool: true,
    host: "mail.ifexes.com",
    port: 465,
    secure: true, // use TLS
    auth: {
      user: "mails@ifexes.com",
      pass: "teezardachicago",
    },
  });
  var mailOptions = {
    from: `"Fire Box 👻" johnpaul@localhost.com`, // sender address
    // to: "bar@example.com, baz@example.com", // list of receivers
    to: 'achigonye@gmail.com',
    header: 'Content Mail',
    subject: "Hello ✔👻", // Subject line
    text: "Hello world?", // plain text body
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
                <span>Gary</span>
                !
              </h1>
            </div>
            <div class="first-sec-mid">
              <p>
                Thank you for choosing Coinazer. Use the followin OTP to complete
                your Sign Up procedures. OTP is valid for 1 hour.
                <br />
                <span>Thank you!</span>
              </p>
            </div>
            <div class="first-sec-lst">
              <p>028387</p>
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

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

// mail send
mail.send = (mailOptions, callback) => {
  trans.sendMail(mailOptions, function (err, info) {
    if (!err) {
      callback(200);
      console.log('Email sent: ' + info.response);
      console.log('Mail sent successfully ');
    } else {
      callback(500);
      console.log('Mail not sent');
    }
  });
};

module.exports = mail;