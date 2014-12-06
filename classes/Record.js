"use strict";

function Record() {
  this.init(arguments);
}

Record.prototype.init = function (id, name, tags) {
  this.id = id;
  this.name = name;
  this.tags = tags || [];
  if (this.onInit) {
    this.onInit();
  }
}

Record.prototype.getTagTree = function () {
  return this.tags.reduce(function (collection, tag) {
    return collection.concat(tag, tag.getTagTree());
  }, []);
}

exports.Record = Record;