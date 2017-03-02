var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!



exports.handleRequest = function (req, res) {

  if (req.method === 'GET') {
    fs.readFile(archive.paths.index, 'utf8', function(err, data) {
      if (err) {
        return;
      } else {
        res.writeHead(200, httpHelpers.headers);
        // console.log(typeof data);
        // console.log('this is data', data);
        res.end(JSON.stringify(data));
      }
    });
  } 
  //<- need to get actual html text
  // use httpHelpers.serveAssets ???
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
