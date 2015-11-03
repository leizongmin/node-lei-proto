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

  it('#1 - int LE', function () {
    var p = parseProto([
      ['a', 'int', 1, 'LE'],
      ['b', 'int', 2, 'LE'],
      ['c', 'int', 3, 'LE'],
      ['d', 'int', 4, 'LE'],
      ['e', 'int', 5, 'LE'],
      ['f', 'int', 6, 'LE']
    ]);
    var b = p.encode(123, 456, 789, 101112, 131415, 1617181920);
    var c = p.decode(b);
    dump(b);
    dump(c);
    assert.equal(b.length, 1 + 2 + 3 + 4 + 5 + 6);
    assert.deepEqual(c, {
      a: 123,
      b: 456,
      c: 789,
      d: 101112,
      e: 131415,
      f: 1617181920
    });
  });

  it('#2 - int - BE', function () {
    var p = parseProto([
      ['a', 'int', 1, 'BE'],
      ['b', 'int', 2, 'BE'],
      ['c', 'int', 3, 'BE'],
      ['d', 'int', 4, 'BE'],
      ['e', 'int', 5, 'BE'],
      ['f', 'int', 6, 'BE']
    ]);
    var b = p.encode(123, 456, 789, 101112, 131415, 1617181920);
    var c = p.decode(b);
    dump(b);
    dump(c);
    assert.equal(b.length, 1 + 2 + 3 + 4 + 5 + 6);
    assert.deepEqual(c, {
      a: 123,
      b: 456,
      c: 789,
      d: 101112,
      e: 131415,
      f: 1617181920
    });
  });

  it('#3 - uint LE', function () {
    var p = parseProto([
      ['a', 'uint', 1, 'LE'],
      ['b', 'uint', 2, 'LE'],
      ['c', 'uint', 3, 'LE'],
      ['d', 'uint', 4, 'LE'],
      ['e', 'uint', 5, 'LE'],
      ['f', 'uint', 6, 'LE']
    ]);
    var b = p.encode(123, 456, 789, 101112, 131415, 1617181920);
    var c = p.decode(b);
    dump(b);
    dump(c);
    assert.equal(b.length, 1 + 2 + 3 + 4 + 5 + 6);
    assert.deepEqual(c, {
      a: 123,
      b: 456,
      c: 789,
      d: 101112,
      e: 131415,
      f: 1617181920
    });
  });

  it('#4 - uint BE', function () {
    var p = parseProto([
      ['a', 'uint', 1, 'BE'],
      ['b', 'uint', 2, 'BE'],
      ['c', 'uint', 3, 'BE'],
      ['d', 'uint', 4, 'BE'],
      ['e', 'uint', 5, 'BE'],
      ['f', 'uint', 6, 'BE']
    ]);
    var b = p.encode(123, 456, 789, 101112, 131415, 1617181920);
    var c = p.decode(b);
    dump(b);
    dump(c);
    assert.equal(b.length, 1 + 2 + 3 + 4 + 5 + 6);
    assert.deepEqual(c, {
      a: 123,
      b: 456,
      c: 789,
      d: 101112,
      e: 131415,
      f: 1617181920
    });
  });

  it('#5 - float & double LE', function () {
    var p = parseProto([
      ['a', 'float', 0, 'LE'],
      ['b', 'double', 0, 'LE']
    ]);
    var b = p.encode(12.345, 67.891011);
    var c = p.decode(b);
    dump(b);
    dump(c);
    assert.equal(b.length, 4 + 8);
    assert.equal(Number(c.a.toFixed(3)), 12.345);
    assert.equal(Number(c.b.toFixed(6)), 67.891011);
  });

  it('#5 - float & double BE', function () {
    var p = parseProto([
      ['a', 'float', 0, 'BE'],
      ['b', 'double', 0, 'BE']
    ]);
    var b = p.encode(12.345, 67.891011);
    var c = p.decode(b);
    dump(b);
    dump(c);
    assert.equal(b.length, 4 + 8);
    assert.equal(Number(c.a.toFixed(3)), 12.345);
    assert.equal(Number(c.b.toFixed(6)), 67.891011);
  });

});
