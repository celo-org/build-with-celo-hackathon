/*
 * Server-related tasks
 *
 */

// Dependencies
var http = require("http");
var https = require("https");
var url = require("url");
var StringDecoder = require("string_decoder").StringDecoder;
var config = require("./config");
var fs = require("fs");
var handlers = require("./handlers");
var helpers = require("./helpers");
var userAuth = require("./userAuth.js");
var path = require("path");
var util = require("util");
var debug = util.debuglog("server");
const axios = require("axios").default;

// var formidable = require('formidable');
var fs = require("fs");

// Instantiate the server module object
var server = {};

// Instantiate the HTTP server
server.httpServer = http.createServer(function (req, res) {
  server.unifiedServer(req, res);
});

/////////////////////////////////////////////////////////
// const io = require("socket.io")(server.httpServer);

// io.on("connection", (socket) => {

//   //   socket.on("chat message", (msg) => {
//   //     // let endpoints = [
//   //     //   'https://api.coingecko.com/api/v3/coins/bitcoin',
//   //     //   'https://api.coingecko.com/api/v3/coins/ethereum',
//   //     //   'https://api.coingecko.com/api/v3/coins/binancecoin',
//   //     //   'https://api.coingecko.com/api/v3/coins/tether'
//   //     // ];


//   //     // io.emit('chat message', msg + ' From the server ');
//   //   });
// });

// Instantiate the HTTPS server
// server.httpsServerOptions = {
//    'key': fs.readFileSync(path.join(__dirname,'/../https/key.pem')),
//    'cert': fs.readFileSync(path.join(__dirname,'/../https/cert.pem'))
//  };
//  server.httpsServer = https.createServer(server.httpsServerOptions,function(req,res){
//    server.unifiedServer(req,res);
//  });

// All the server logic for both the http and https server

server.unifiedServer = function (req, res) {
  // Parse the url
  var parsedUrl = url.parse(req.url, true);

  // Get the path
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // Get the query string as an object
  var queryStringObject = parsedUrl.query;

  // Get the HTTP method
  var method = req.method.toLowerCase();

  //Get the headers as an object
  var headers = req.headers;

  // Get the payload,if any
  var decoder = new StringDecoder("utf-8");
  var buffer = "";
  req.on("data", function (data) {
    buffer += decoder.write(data);
  });
  req.on("end", function () {
    buffer += decoder.end();

    // Check the router for a matching path for a handler. If one is not found, use the notFound handler instead.
    var chosenHandler =
      typeof server.router[trimmedPath] !== "undefined"
        ? server.router[trimmedPath]
        : handlers.notFound;

    // If the request is within the public directory use to the public handler instead
    chosenHandler =
      trimmedPath.indexOf("public/") > -1 ? handlers.public : chosenHandler;
    chosenHandler =
      trimmedPath.indexOf("public/css/") > -1 ? handlers.css : chosenHandler;
    chosenHandler =
      trimmedPath.indexOf("public/images/") > -1
        ? handlers.images
        : chosenHandler;
    chosenHandler =
      trimmedPath.indexOf("public/images/svg/") > -1
        ? handlers.svg
        : chosenHandler;
    chosenHandler =
      trimmedPath.indexOf("public/js/") > -1 ? handlers.js : chosenHandler;
    chosenHandler =
      trimmedPath.indexOf("public/fonts/") > -1
        ? handlers.fonts
        : chosenHandler;

    // Construct the data object to send to the handler
    var data = {
      trimmedPath: trimmedPath,
      queryStringObject: queryStringObject,
      method: method,
      headers: headers,
      payload: helpers.parseJsonToObject(buffer),
    };

    // Route the request to the handler specified in the router
    chosenHandler(data, function (statusCode, payload, contentType) {
      // Determine the type of response (fallback to JSON)
      contentType = typeof contentType == "string" ? contentType : "json";

      // Use the status code returned from the handler, or set the default status code to 200
      statusCode = typeof statusCode == "number" ? statusCode : 200;

      // Return the response parts that are content-type specific
      var payloadString = "";
      if (contentType == "json") {
        res.setHeader("Content-Type", "application/json");
        payload = typeof payload == "object" ? payload : {};
        payloadString = JSON.stringify(payload);
      }

      if (contentType == "html") {
        res.setHeader("Content-Type", "text/html");
        payloadString = typeof payload == "string" ? payload : "";
      }

      if (contentType == "favicon") {
        res.setHeader("Content-Type", "image/x-icon");
        payloadString = typeof payload !== "undefined" ? payload : "";
      }

      if (contentType == "plain") {
        res.setHeader("Content-Type", "text/plain");
        // res.setHeader("Content-Type", "text/javascript");
        payloadString = typeof payload !== "undefined" ? payload : "";
      }
      // else if (contentType == "plain") {
      //   res.setHeader("Content-Type", "text/javascript");
      //   payloadString = typeof payload !== "undefined" ? payload : "";
      // }

      if (contentType == "css") {
        res.setHeader("Content-Type", "text/css");
        payloadString = typeof payload !== "undefined" ? payload : "";
      }

      if (contentType == "png") {
        res.setHeader("Content-Type", "image/png");
        payloadString = typeof payload !== "undefined" ? payload : "";
      }

      if (contentType == "jpg") {
        res.setHeader("Content-Type", "image/jpeg");
        payloadString = typeof payload !== "undefined" ? payload : "";
      }

      if (contentType == "gif") {
        res.setHeader("Content-Type", "image/gif");
        payloadString = typeof payload !== "undefined" ? payload : "";
      }

      if (contentType == "svg") {
        res.setHeader("Content-Type", "image/svg+xml");
        payloadString = typeof payload !== "undefined" ? payload : "";
      }

      if (contentType == "woff2") {
        res.setHeader("Content-Type", "font/woff2");
        payloadString = typeof payload !== "undefined" ? payload : "";
      }

      if (contentType == "woff") {
        res.setHeader("Content-Type", "font/woff");
        payloadString = typeof payload !== "undefined" ? payload : "";
      }

      if (contentType == "ttf") {
        res.setHeader("Content-Type", "font/ttf");
        payloadString = typeof payload !== "undefined" ? payload : "";
      }

      if (contentType == "eot") {
        res.setHeader("Content-Type", "font/eot");
        payloadString = typeof payload !== "undefined" ? payload : "";
      }

      if (contentType == "otf") {
        res.setHeader("Content-Type", "font/otf");
        payloadString = typeof payload !== "undefined" ? payload : "";
      }

      // Return the response-parts common to all content-types
      res.writeHead(statusCode);
      res.end(payloadString);

      // If the response is 200, print green, otherwise print red
      if (statusCode == 200) {
        debug(
          "\x1b[32m%s\x1b[0m",
          method.toUpperCase() + " /" + trimmedPath + " " + statusCode
        );
      } else {
        debug(
          "\x1b[31m%s\x1b[0m",
          method.toUpperCase() + " /" + trimmedPath + " " + statusCode
        );
      }
    });
  });
};

// Define the request router


// Init script
server.init = function () {
  // Start the HTTP server
  server.httpServer.listen(config.httpPort, function () {
    console.log(
      "\x1b[36m%s\x1b[0m",
      "Coinazer is running on port " + config.httpPort
    );
  });

  // Start the HTTPS server
  // server.httpsServer.listen(config.httpsPort,function(){
  //   console.log('\x1b[35m%s\x1b[0m','The HTTPS server is running on port '+config.httpsPort);
  // });
};

// Export the module
module.exports = server;
