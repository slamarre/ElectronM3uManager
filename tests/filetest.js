const fs = require('fs');
var assert = require('assert');


exports["file directroy"] = function (test) {

    var path = process.cwd();
    var files = fs.readdirSync(path);
    test.notEqual(files.length, 0);
    test.done();
}
assert.equal(true, true);
