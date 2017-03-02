var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers');
// require more modules/folders here!
var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

var statusCode = 200;

// exports.handleRequest = function (req, res) {

//   console.log('Serving request type ' + req.method + ' for url ' + req.url);
//   statusCode = statusCode || 200;
//   res.writeHead(statusCode, headers);
//   res.end(archive.paths.index);
//   // res.end(JSON.stringify(data));
// };

var actions = {
  'GET': function(req, res) {
    handleRequest(res, {results: messages});
  },
  'POST': function(req, res) {
    collectData(req, function(message) {
      message.objectId = ++objectIdCounter;
      messages.push(message);
      handleRequest(res, {objectId: message.objectId}, 201);
    });
  },
  'OPTIONS': function(req, res) {
    handleRequest(res, null);
  }
};

exports.handleRequest = function(res, data, statusCode) {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  statusCode = statusCode || 200;
  res.writeHead(statusCode, headers);
  res.end(archive.paths.index);
  // response.end(JSON.stringify(data));
};