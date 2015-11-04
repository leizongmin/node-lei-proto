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

describe('normal', function () {

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
    assert.equal(p.size, 1 + 2 + 3 + 4 + 5 + 6);
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
    assert.equal(p.size, 1 + 2 + 3 + 4 + 5 + 6);
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
    assert.equal(p.size, 1 + 2 + 3 + 4 + 5 + 6);
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
    assert.equal(p.size, 1 + 2 + 3 + 4 + 5 + 6);
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
    assert.equal(p.size, 4 + 8);
    assert.equal(b.length, 4 + 8);
    assert.equal(Number(c.a.toFixed(3)), 12.345);
    assert.equal(Number(c.b.toFixed(6)), 67.891011);
  });

  it('#6 - float & double BE', function () {
    var p = parseProto([
      ['a', 'float', 0, 'BE'],
      ['b', 'double', 0, 'BE']
    ]);
    var b = p.encode(12.345, 67.891011);
    var c = p.decode(b);
    dump(b);
    dump(c);
    assert.equal(p.size, 4 + 8);
    assert.equal(b.length, 4 + 8);
    assert.equal(Number(c.a.toFixed(3)), 12.345);
    assert.equal(Number(c.b.toFixed(6)), 67.891011);
  });

  it('#7 - string & buffer', function () {
    var p = parseProto([
      ['a', 'string', 10],
      ['b', 'buffer', 10]
    ]);
    var b = p.encode('abcdefghij', new Buffer('klmnopqrst'));
    var c = p.decode(b);
    dump(b);
    dump(c);
    assert.equal(p.size, 20);
    assert.equal(b.length, 20);
    assert.equal(c.a, 'abcdefghij');
    assert.ok(Buffer.isBuffer(c.b));
    assert.equal(c.b.toString(), 'klmnopqrst');
  });

});

describe('missing `size`', function () {

  it('#1 int', function () {
    assert.throws(function () {
      var p = parseProto([['a', 'int']]);
    }, function (err) {
      dump(err);
      return err.code === 'INVALID_DATA_SIZE';
    });
  });

  it('#2 uint', function () {
    assert.throws(function () {
      var p = parseProto([['a', 'uint']]);
    }, function (err) {
      dump(err);
      return err.code === 'INVALID_DATA_SIZE';
    });
  });

  it('#3 string', function () {
    assert.throws(function () {
      var p = parseProto([
        ['a', 'string'],
        ['b', 'string']
      ]);
    }, function (err) {
      dump(err);
      return err.code === 'INVALID_DATA_SIZE';
    });
  });

  it('#4 buffer', function () {
    assert.throws(function () {
      var p = parseProto([
        ['a', 'buffer'],
        ['b', 'buffer']
      ]);
    }, function (err) {
      dump(err);
      return err.code === 'INVALID_DATA_SIZE';
    });
  });

});

describe('invalid data type', function () {

  it('#1 not support type', function () {
    assert.throws(function () {
      var p = parseProto([['a', 'byte']]);
    }, function (err) {
      dump(err);
      return err.code === 'NOT_SUPPORT_TYPE';
    });
  });

  it('#2 invalid type - int', function () {
    assert.throws(function () {
      var p = parseProto([['a', 'int', 1]]);
      var b = p.encode('123');
      dump(b);
    }, function (err) {
      dump(err);
      return err.code === 'INVALID_TYPE';
    });
  });

  it('#3 invalid type - uint', function () {
    assert.throws(function () {
      var p = parseProto([['a', 'uint', 1]]);
      var b = p.encode('123');
      dump(b);
    }, function (err) {
      dump(err);
      return err.code === 'INVALID_TYPE';
    });
  });

  it('#4 invalid type - float', function () {
    assert.throws(function () {
      var p = parseProto([['a', 'float']]);
      var b = p.encode('123');
      dump(b);
    }, function (err) {
      dump(err);
      return err.code === 'INVALID_TYPE';
    });
  });

  it('#5 invalid type - double', function () {
    assert.throws(function () {
      var p = parseProto([['a', 'double']]);
      var b = p.encode('123');
      dump(b);
    }, function (err) {
      dump(err);
      return err.code === 'INVALID_TYPE';
    });
  });

  it('#6 invalid type - string', function () {
    assert.throws(function () {
      var p = parseProto([['a', 'string']]);
      var b = p.encode(123);
      dump(b);
    }, function (err) {
      dump(err);
      return err.code === 'INVALID_TYPE';
    });
  });

  it('#7 invalid type - buffer', function () {
    assert.throws(function () {
      var p = parseProto([['a', 'buffer']]);
      var b = p.encode('123');
      dump(b);
    }, function (err) {
      dump(err);
      return err.code === 'INVALID_TYPE';
    });
  });

});

describe('not need `size`', function () {

  it('#1 float & double', function () {
    var p = parseProto([
      ['a', 'float'],
      ['b', 'double']
    ]);
    var b = p.encode(12.345, 67.891011);
    var c = p.decode(b);
    dump(b);
    dump(c);
    assert.equal(p.size, 4 + 8);
    assert.equal(b.length, 4 + 8);
    assert.equal(Number(c.a.toFixed(3)), 12.345);
    assert.equal(Number(c.b.toFixed(6)), 67.891011);
  });

  it('#2 last `string` item', function () {
    var p = parseProto([
      ['a', 'string', 5],
      ['b', 'string']
    ]);
    var b = p.encode('1234567890', 'abcdefghij');
    var c = p.decode(b);
    dump(b);
    dump(c);
    assert.equal(p.size, 5);
    assert.equal(b.length, 15);
    assert.equal(c.a, '12345');
    assert.equal(c.b, 'abcdefghij');
  });

  it('#3 last `buffer` item', function () {
    var p = parseProto([
      ['a', 'buffer', 5],
      ['b', 'buffer']
    ]);
    var b = p.encode(new Buffer('1234567890'), new Buffer('abcdefghij'));
    var c = p.decode(b);
    dump(b);
    dump(c);
    assert.equal(p.size, 5);
    assert.equal(b.length, 15);
    assert.equal(c.a.toString(), '12345');
    assert.equal(c.b.toString(), 'abcdefghij');
  });

});

describe('other error', function () {

  it('#1 repeated field', function () {
    assert.throws(function () {
      var p = parseProto([
        ['a', 'float'],
        ['a', 'float']
      ]);
    }, function (err) {
      dump(err);
      return err.code === 'INVALID_PARAMETER_FORMAT';
    });
  });

  it('#2 invalid field name', function () {
    assert.throws(function () {
      var p = parseProto([
        ['0a', 'float']
      ]);
    }, function (err) {
      dump(err);
      return err.code === 'INVALID_PARAMETER_FORMAT';
    });
  });

});
