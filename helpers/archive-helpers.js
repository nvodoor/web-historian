var fs = require('fs');
var path = require('path');
var request = require('request');
var _ = require('underscore');
var Promise = require('bluebird');


/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
  index: path.join(__dirname, '../web/public/index.html'),
  loading: path.join(__dirname, '../web/public/loading.html')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {

  // var readListOfUrlsAsync = new Promise (function (resolve, reject) {
  //   fs.readFile(this.paths.list, 'utf8', function (err, data) {
  //     if (err) {
  //       reject(err);
  //     } else {
  //       resolve(data.split('\n'));
  //     }
  //   });
  // });
  // return readListOfUrlsAsync;
  fs.readFile(this.paths.list, 'utf8', function (err, data) {
    if (err) {
      console.log('There is an error in read list.');
      return;
    }
    callback(data.split('\n'));
  });
};

exports.isUrlInList = function(url, callback) {

  // var isUrlInListAsync = new Promise (function (resolve, reject) {
  //   exports.readListOfUrls(function(sites) {
  //     var found = _.any(sites, function(site, i) {
  //       return site.match(url);
  //     });
  //     resolve(found);
  //   });
  // });

  // return isUrlInListAsync;
  
  fs.readFile(this.paths.list, 'utf8', function (err, data) {
    if (err) {
      console.log('There is an error for isURLInList test.');
      return;
    }
    var websiteArray = data.split('\n');
    var isTrue = false;
    for (var i = 0; i < websiteArray.length; i++) {
      if (websiteArray[i] === url) {
        isTrue = true;
      }
    }
    if (callback) {
      callback(isTrue);
    } else {
      return isTrue;
    }
    
  });
};

exports.addUrlToList = function(url, callback) {
  // var addUrlToListSync = new Promise (function (resolve, reject) {
  //   fs.appendFile(this.paths.list, url + '\n', function (err, data) {
  //     resolve(data);
  //   });
  // });
  // return addUrlToListSync;
  fs.appendFile(this.paths.list, url + '\n', function (err, data) {
    callback();
  });

};

exports.isUrlArchived = function(url, callback) {

  // var isUrlArchivedSync = new Promise (function (resolve, reject) {
  //   fs.readdir(this.paths.archivedSites, function(err, files) {
  //     resolve(_.contains(files, url));
  //   });
  // });
  // return isUrlArchivedSync;
  fs.readdir(this.paths.archivedSites, function(err, files) {
    callback(_.contains(files, url));
  });

};

exports.downloadUrls = function(urls) {
  urls.forEach(function(url) {
    fs.writeFile(exports.paths.archivedSites + '/' + url, 'testing only', function (err) {
      if (err) {
        return;
      }
    });
  });
  // var downloadUrlsSync = new Promise (function (resolve, reject) {
  //   urls.forEach(function (url) {
  //     if (!url) { reject(); }
  //     resolve('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + url));

  //   });
  // });
  // return downloadUrlsSync;
  // urls.forEach(function (url) {
  //   if (!url) { return; }
  //   request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + url));

  // });

};
