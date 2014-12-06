"use strict";

var Record = require('./Record').Record;

function Tag(id, name, tags) {
    this.init(id, name, tags);
}
Tag.prototype = new Record();
Tag.prototype.toString = function() {
    return this.name;
};
Tag.prototype.onInit = function() {
    // Imagine there is some heavy calculation here, taking long time
    //console.log('Tag ' + this.name + ' initialised');
};

exports.Tag = Tag;