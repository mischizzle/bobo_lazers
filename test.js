"use strict";

var Record  = require('./classes/Record').Record;
var Tag     = require('./classes/Tag').Tag;
var Article = require('./classes/Article').Article;

function RecordFactory() {}

RecordFactory.prototype = {

  tagsCache:  {},
  tags:       {},
  articles:   [],

  prepare: function(records) {
    var self = this;

    records.forEach(function(record) {
      switch(record.type) {
        case 'tag':
          self.tags[record.id] = record;
          break;
        case 'article':
          self.articles.push(record);
          break;
      }
    });
  },

  create: function(record) {
    var tags = this.loadTags(record.tagRefs || []);

    switch(record.type) {
      case 'tag':
        if (this.tagsCache[record.id]) {
          return this.tagsCache[record.id];
        } else {
          return this.tagsCache[record.id] = new Tag(record.id, record.name, tags);
        }
      case 'article':
        return new Article(record.id, record.name, tags);
    }
  },

  loadTags: function(tagRefs) {
    var self = this;

    return tagRefs.reduce(function(collection, id){
      var record = self.tags[id];
      return collection.concat(self.create(record));
    }, []);
  }

};

function load(path, callback) {
  var fs = require('fs');

  fs.readFile(path, function (err, buffer) {
    callback(JSON.parse(buffer));
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