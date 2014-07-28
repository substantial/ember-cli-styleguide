var glob = require("glob")

var filesToMatch = 'app/styles/**/*.{css,scss,less}';

function listStylesheets() {
  return glob.sync(filesToMatch);
}

module.exports = function(options) {
  var html = [];
  var stylesheets = listStylesheets();
  stylesheets.forEach(function(stylesheet) {
    // render the template block for each stylesheet
    html.push( options.fn(stylesheet) );
  })
  return html.join('/n');
};
