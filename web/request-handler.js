var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');
var fetcher = require('../workers/htmlfetcher.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  var statusCode = 200;
  var slicedReqUrl = req.url.slice(1);
  console.log('top slice url:', req.url);

  // BELOW IS GET REQUEST FROM THE CLIENT
  if (req.method === 'GET') {
    console.log('These are the test case URLs', req.url);
    // CONDITION 1: load index.html when we land the page
    if (req.url === '/') { // 127.0.0.1:8000/
      fs.readFile(archive.paths.siteAssets + '/index.html', function(err, data) {
        // console.log('line 19', req.url);
        if (err) {
          // console.log('err');
          return;
        } else {
          res.writeHead(statusCode, httpHelpers.headers);
          res.end(data);
        }
      });
    } else if (req.url !== '/') {
        // CONDITION 2: load archived page if url is already in archived
      archive.isUrlArchived(slicedReqUrl, function(exist) {
        console.log('this is the req url!!!!!!', slicedReqUrl);
        console.log('this is exist', exist);
        if (exist) {
          fs.readFile(archive.paths.archivedSites + '/' + slicedReqUrl, function (err, data) {
            if (err) {
              return;
            } else {
              res.writeHead(statusCode, httpHelpers.headers);
              res.end(data);
            }
          });
        } else {
            // CONDITION 3: load loading.html if url is in url list
          archive.isUrlInList(slicedReqUrl, function(exist) {
            if (exist) {
              fs.readFile(archive.paths.list, function(err, data) {
                if (err) {
                  return;
                } else {
                  res.writeHead(statusCode, httpHelpers.headers);
                  res.end(data);
                }
              });
            } else {
              // CONDITION 4: load nothing if no page to load
              statusCode = 404;
              res.writeHead(statusCode, httpHelpers.headers);
              res.end('Page is not found. 404 error.');
            } 
          });
        }
      });
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

      // might also need to check if the url already exists in list, or, archives/sites
      archive.addUrlToList(stringifyInputUrl, function(exist) {
        // calling the fetcher.websiteFetcher function by passing in the url
        res.writeHead(statusCode, httpHelpers.headers);
        res.end(loadingPageHTML);
      });
    });
  }
};
    



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
