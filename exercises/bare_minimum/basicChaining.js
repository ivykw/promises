/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var pluckFirstLineFromFileAsync = require('./promiseConstructor.js').pluckFirstLineFromFileAsync;
var getGitHubProfileAsync = require('./promisification.js').getGitHubProfileAsync;

const writeData = (path, data, callback) => {
  fs.writeFile(path, data, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, data);
    }
  });
};
const writeDataAsync = Promise.promisify(writeData);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // use pluck function to get the first line and print it
  return pluckFirstLineFromFileAsync(readFilePath)
    .then((data) => {
      if (data) {
        return data;
      } else {
        throw new Error('user does not exist');
      }
    })
    .then((username) => {
      return getGitHubProfileAsync(username);
    })
    .then((data) => {
      // console.log(typeOf data);
      return writeDataAsync(writeFilePath, JSON.stringify(data));
    });
  // use get profile async
  // write body to writeFilePath
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
