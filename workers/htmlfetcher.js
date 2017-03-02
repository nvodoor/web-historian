// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

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