var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!



exports.handleRequest = function (req, res) {

  var statusCode = 200;
  console.log('req.method', req.method);
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
};
    





  //<- need to get actual html text
  // use httpHelpers.serveAssets ???

//   if (req.method === 'POST') {
//     request.on('data', function(url) {
//       statusCode = 302;
//       archive.addUrlToList(url, function(exist) {
//         res.writeHead(statusCode, httpHelpers.headers);
//         res.end();
//       });
//     });
//   };
// };



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
