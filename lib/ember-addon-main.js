var path = require('path');
var fs   = require('fs');
var util = require('util');

var pickFiles = require('broccoli-static-compiler');

var CSSPages = require('broccoli-styleguide').CSSPages;
var MarkdownPages = require('broccoli-styleguide').MarkdownPages;
var HTMLPages = require('broccoli-styleguide').HTMLPages;
var HBSPages = require('broccoli-styleguide').HBSPages;

var options = {
  templates: path.resolve(__dirname, 'templates'),
  helpers: path.resolve(__dirname, 'helpers'),
  partials: path.resolve(__dirname, 'templates/partials'),
  globals: {
  }
};

var styleguideContent = pickFiles('app/styles', {
  srcDir: '/',
  // Select all picked files recursively from:
  files: ['**/*.*'],
  // Render static HTML styleguide to:
  destDir: '/public/styleguide/'
});


function EmberCLIStyleguide(project) {
  this.project = project;
  this.name    = 'Ember CLI Styleguide';
}

EmberCLIStyleguide.prototype.treeFor = function treeFor(name) {
  console.log('~~~~~~~~~~~ EmberCLIStyleguide#treeFor name '+name);
  if (name === 'app') {
    var styleguideHTML;
    styleguideHTML = CSSPages(styleguideContent, options);
    styleguideHTML = HTMLPages(styleguideHTML, options);
    styleguideHTML = MarkdownPages(styleguideHTML, options);
    styleguideHTML = HBSPages(styleguideHTML, options);
    return styleguideHTML;
  }
};

EmberCLIStyleguide.prototype.included = function included(app) {
  console.log('~~~~~~~~~~~ EmberCLIStyleguide#included app '+util.inspect(app));
};

module.exports = EmberCLIStyleguide;
