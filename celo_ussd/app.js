const express = require('express');
const bodyParser = require('body-parser');
const { ussd } = require('./index');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
const port = 3000;


// Registering USSD handler with Express
app.post('/', (req, res) => {

    let args = {
        phoneNumber: req.body.phoneNumber,
        sessionId: req.body.sessionId,
        serviceCode: req.body.serviceCode,
        Operator: req.body.networkCode || req.body.Operator,
        // text: req.body.text ?? '0'
    };
    ussd.run(req.body, ussdResult => {
        res.send(ussdResult);
    });

});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;





// const express = require("express");
// const ussdRoute = require("./index");
// const bodyParser = require("body-parser");
// // const { ussd } = require('./celo/ussd_builder');


// const app = express();
// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => console.log(`running on localhost:${PORT}`));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use("/", ussdRoute);

// app.post('/ussd', (req, res) => {

//     let args = {
//         phoneNumber: req.body.phoneNumber,
//         sessionId: req.body.sessionId,
//         serviceCode: req.body.serviceCode,
//         Operator: req.body.networkCode || req.body.Operator,
//         // text: req.body.text ?? '0'
//     };
//     console.log(args)
//     ussd.run(args, ussdResult => {
//         res.send(ussdResult);
//     });
// });

// module.exports = app;