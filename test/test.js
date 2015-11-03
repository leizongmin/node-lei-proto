/**
 * lei-proto tests
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var assert = require('assert');
var parseProto = require('../');

function dump () {
  console.log.apply(console, arguments);
}

describe('lei-proto', function () {

  it('#1 - int', function () {
    var proto = parseProto([
      ['a', 'int', 1],
      ['b', 'int', 2],
      ['c', 'int', 3],
      ['d', 'int', 4],
      ['e', 'int', 5],
      ['f', 'int', 6]
    ]);
    var b = proto.encode(123, 456, 789, 101112, 131415, 1617181920);
    var c = proto.decode(b);
    dump(b);
    dump(c);
    assert.deepEqual(c, {
      a: 123,
      b: 456,
      c: 789,
      d: 101112,
      e: 131415,
      f: 1617181920
    });
  });

  it('#2 - uint', function () {
    var proto = parseProto([
      ['a', 'uint', 1],
      ['b', 'uint', 2],
      ['c', 'uint', 3],
      ['d', 'uint', 4],
      ['e', 'uint', 5],
      ['f', 'uint', 6]
    ]);
    var b = proto.encode(123, 456, 789, 101112, 131415, 1617181920);
    var c = proto.decode(b);
    dump(b);
    dump(c);
    assert.deepEqual(c, {
      a: 123,
      b: 456,
      c: 789,
      d: 101112,
      e: 131415,
      f: 1617181920
    });
  });

});
