var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  // console.log('This is how "req" looks like:', req);
  var statusCode = 200;
  // console.log('This is the req.method', req.method);
  // BELOW IS GET REQUEST FROM THE CLIENT
  if (req.method === 'GET') {
    // CONDITION 1: load index.html when we land the page
    if (req.url === '/') {

      fs.readFile(archive.paths.siteAssets + '/index.html', function(err, data) {
        if (err) {
          // console.log('err');
          return;
        } else {
          res.writeHead(statusCode, httpHelpers.headers);
          res.end(data);
        }
      });
      // CONDITION 2: load archived page if url is already in archived
      archive.isUrlArchived(req.url, function(exist) {
        if (exist) {
          fs.readFile(archive.paths.archivedSites + req.url, function (err, data) {
            if (err) {
              return;
            } else {
              res.writeHead(statusCode, httpHelpers.headers);
              res.end(data);
            }
          });
        }
      });
      // CONDITION 3: load loading.html if url is in url list
      archive.isUrlInList(req.url, function(exist) {
        if (exist) {
          fs.readFile(archive.paths.list, function(err, data) {
            if (err) {
              return;
            } else {
              res.writeHead(statusCode, httpHelpers.headers);
              res.end(data);
            }
          });
        }
      });
    } else {
      // CONDITION 4: load nothing if no page to load
      statusCode = 404;
      res.writeHead(statusCode, httpHelpers.headers);
      res.end('Page is not found. 404 error.');
    } 
  }
  // BELOW IS POST REQUEST FROM THE CLIENT
  if (req.method === 'POST') {    
    req.on('data', function(url) {
      // console.log('this is url', url.toString('utf8'));
      // console.log(url.toString());
      // console.log(typeof url);
      statusCode = 302;
      var stringifyInputUrl = url.toString().slice(4);
      // console.log(stringifyInputUrl);
      // console.log('This is the URL we are typing in:', stringifyInputUrl);
      
      var loadingPageHTML;
      fs.readFile(archive.paths.loading, function(err, data) {
        if (err) {
          return;
        } else {
          loadingPageHTML = data;
        }
      });

      archive.addUrlToList(stringifyInputUrl, function(exist) {
        res.writeHead(statusCode, httpHelpers.headers);
        res.end(loadingPageHTML);
      });
    });
  }
};
    





  //<- need to get actual html text
  // use httpHelpers.serveAssets ???




// // COPIED FROM RESULT HANDLER FILE FROM CHATTERBOX SERVER
// var actions = {
//   'GET': function(request, response) {
//     utils.sendResponse(response, {results: messages});
//   },
//   'POST': function(request, response) {
//     utils.collectData(request, function(message) {
//       message.objectId = ++objectIdCounter;
//       messages.push(message);
//       utils.sendResponse(response, {objectId: message.objectId}, 201);
//     });
//   },
//   'OPTIONS': function(request, response) {
//     utils.sendResponse(response, null);
//   }
// };

// // exports.requestHandler = utils.makeActionHandler(actions);
