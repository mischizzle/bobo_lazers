"use strict";

var Record        = require('./classes/Record').Record;
var Article       = require('./classes/Article').Article;
var Tag           = require('./classes/Tag').Tag;
var RecordFactory = require('./classes/RecordFactory').RecordFactory;


function load(path, callback) {
  var fs = require('fs');

  fs.readFile(path, function (err, buffer) {
    if(err) {
      console.log("Sorry, there was a problem with the data feed... " + err);
    } else {
      callback(JSON.parse(buffer));
    }
  });
}

function readArticles(path, outputStream) {

  load(path, function(records) {
    var recordFactory = new RecordFactory();

    recordFactory.prepare(records);

    recordFactory.articles.forEach(function(article) {
      outputStream(recordFactory.create(article).toString());
    });
  });
}

readArticles('./data.json', console.log);