"use strict";

var Tag = require('./Tag').Tag;
var Article = require('./Article').Article;

function RecordFactory() {
  this.tagsCache = {};
  this.tags = {};
  this.articles = [];
}

RecordFactory.prototype.prepare = function (records) {
  var self = this;

  records.forEach(function (record) {
    switch (record.type) {
      case 'tag':
        self.tags[record.id] = record;
        break;
      case 'article':
        self.articles.push(record);
        break;
    }
  });
};

RecordFactory.prototype.create = function (record) {
  var tags = this.loadTags(record.tagRefs || []);

  switch (record.type) {
    case 'tag':
      if (this.tagsCache[record.id]) {
        return this.tagsCache[record.id];
      } else {
        return this.tagsCache[record.id] = new Tag(record.id, record.name, tags);
      }
    case 'article':
      return new Article(record.id, record.name, tags);
  }
};

RecordFactory.prototype.loadTags = function (tagRefs) {
  var self = this;

  return tagRefs.reduce(function (collection, id) {
    var record = self.tags[id];
    return collection.concat(self.create(record));
  }, []);
};

exports.RecordFactory = RecordFactory;