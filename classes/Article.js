"use strict";

var Record = require('./Record').Record;

function Article(id, name, tags) {
    this.init(id, name, tags);
}

Article.prototype = new Record();

Article.prototype.toString = function() {
    return this.name + ': ' + this.getTagTree().join(', ');
};

exports.Article = Article;