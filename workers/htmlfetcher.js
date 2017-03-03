// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

  // after user input URL
    // input URL will be written into sites.txt
archive.readListOfUrls(archive.downloadUrls);

// create a function that takes the URL as parameter
// exports.websiteFetcher = function(url) {
//   // check if the URL is in the txt list
//   archive.isUrlInList(url, function (exist) {
//     // if URL is already in txt file
//     if (exist) {
//       // should check if it's also in archive folder
//       archive.isUrlArchived(url, function (exist) {
//         // if yes
//         if (exist) {
//           // display the webpage
//           fs.readFile(archive.paths.archivedSites + url, function(err, data) {
//             if (err) {
//               return;
//             } else {
//               res.end(data); // HOW TO CHANGE RESPONSE?
//             }
//           });
//         // if not
//         } else {
//           // download that url webpage into archive / sites
//           fs.appendFile(archive.paths.archivedSites + url, data, function(err) {
//             if (err) {
//               return;
//             }
//           });
//         }
//       });
//     // if it is not
//     }
//   });
// };



















  // var archivedSiteNames = [];
  // var allSiteNames = [];
  // var unarchivedSiteNames = [];
  // // get the array list of the archivedSites names
  // fs.readdir(this.paths.archivedSites, function(err, files) {
  //   // console.log("Archived", files);
  //   archivedSiteNames = files;
  //   // console.log('96', archivedSiteNames);
  // });

  // // get the array list of the sites.txt
  // fs.readFile(this.paths.list, 'utf8', function (err, data) {
  //   if (err) {
  //     return;
  //   }
  //   // console.log('Paths', data);
  //   allSiteNames = data.split('\n');
  //   // console.log('97', allSiteNames);
  //   unarchivedSiteNames = _.difference(allSiteNames, archivedSiteNames);

  //   unarchivedSiteNames.forEach(function(siteName) {
  //     fs.writeFile(exports.paths.archivedSites + '/' + siteName, 'testing only', function(err) {
  //       if (err) {
  //         return;
  //       }
  //     });
  //   });
  // });