'use strict';

/**
 * lei-proto
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */


const DATA_TYPES = [ 'int', 'uint', 'float', 'double', 'string', 'buffer' ];

function NotSupportDataTypeError(parameter, type) {
  const err = new Error('not support type `' + type + '`');
  err.code = 'NOT_SUPPORT_TYPE';
  err.parameter = parameter;
  err.type = type;
  return err;
}

// eslint-disable-next-line
function InvalidDataTypeError(parameter, type) {
  const err = new Error('`' + parameter + '` is not a ' + type);
  err.code = 'INVALID_TYPE';
  err.parameter = parameter;
  err.type = type;
  return err;
}

function InvalidDataSizeError(parameter, size) {
  const err = new Error('invalid size for `' + parameter + '`');
  err.code = 'INVALID_DATA_SIZE';
  err.parameter = parameter;
  err.size = size;
  return err;
}

function InvalidParameterNameFormatError(name) {
  const err = new Error('invalid parameter format `' + name + '`');
  err.code = 'INVALID_PARAMETER_FORMAT';
  err.name = name;
  return err;
}

function InvalidProtocolInfoError(msg) {
  const err = new Error('invalid protocol info: ' + msg);
  err.code = 'INVALID_PROTOCOL_INFO';
  err.info = msg;
  return err;
}

function generateJsCodes(encodeSource, encodeExSource, encodeStrictSource, encodeExStrictSource, decodeSource, decodeStrictSource, offset) {
  return `(function () {
    var proto = {
      // 编码器
      encode: ${encodeSource},
      // 编码器，参数为一个对象
      encodeEx: ${encodeExSource},
      // 严格模式的编码器
      encodeStrict: ${encodeStrictSource},
      // 严格模式的编码器，参数为一个对象
      encodeExStrict: ${encodeExStrictSource},
      // 解码器
      decode: ${decodeSource},
      // 严格模式的解码器
      decodeStrict: ${decodeStrictSource},
      // 数据包长度，如果最后一项是不定长的，则总长度为size+最后一项的长度
      size: offset,
    };
    return proto;
  })()`;
}

function parseProto(list, options) {
  options = options || {};

  const encodeArgs = [];
  const encodeCheck = [];
  const encodeBody = [];
  const decodeBody = [];
  let offset = 0;

  list.forEach(function (item, i) {
    if (!Array.isArray(item)) throw new InvalidProtocolInfoError('item must be an array');
    if (item.length < 2) throw new InvalidProtocolInfoError('missing `name` and `type`');

    const name = String(item[0]);
    const type = String(item[1]).toLowerCase();
    let size = Number(item[2]);
    let bytes = String(item[3]).toUpperCase();

    if (!(size > 0)) size = 0;
    if (bytes !== 'LE') bytes = 'BE';
    if (type === 'float') size = 4;
    if (type === 'double') size = 8;

    if (!/^[a-zA-Z_]/.test(name)) throw new InvalidParameterNameFormatError(name);
    if (encodeArgs.indexOf(name) !== -1) throw new InvalidParameterNameFormatError(name);

    if (DATA_TYPES.indexOf(type) === -1) throw new NotSupportDataTypeError(name, type);

    if (type === 'string' || type === 'buffer') {
      if (size < 1 && i < list.length - 1) {
        throw new InvalidDataSizeError(name, size);
      }
    } else if (size < 1) {
      throw new InvalidDataSizeError(name, size);
    }

    encodeArgs.push(name);
    switch (type) {
    case 'int':
      encodeCheck.push('if (typeof a !== "number" || isNaN(' + name + ')) throw new InvalidDataTypeError("' + name + '", "' + type + '");');
      if (size === 1) {
        encodeBody.push('$buf.writeUInt8(' + name + ', ' + offset + ');');
        decodeBody.push(name + ': $buf.readUInt8(' + offset + ')');
      } else if (size === 2) {
        encodeBody.push('$buf.writeInt16' + bytes + '(' + name + ', ' + offset + ');');
        decodeBody.push(name + ': $buf.readInt16' + bytes + '(' + offset + ')');
      } else if (size === 4) {
        encodeBody.push('$buf.writeInt32' + bytes + '(' + name + ', ' + offset + ');');
        decodeBody.push(name + ': $buf.readInt32' + bytes + '(' + offset + ')');
      } else {
        encodeBody.push('$buf.writeInt' + bytes + '(' + name + ', ' + offset + ', ' + size + ');');
        decodeBody.push(name + ': $buf.readInt' + bytes + '(' + offset + ', ' + size + ')');
      }
      break;
    case 'uint':
      encodeCheck.push('if (typeof a !== "number" || isNaN(' + name + ')) throw new InvalidDataTypeError("' + name + '", "' + type + '");');
      if (size === 1) {
        encodeBody.push('$buf.writeUInt8(' + name + ', ' + offset + ');');
        decodeBody.push(name + ': $buf.readUInt8(' + offset + ')');
      } else if (size === 2) {
        encodeBody.push('$buf.writeUInt16' + bytes + '(' + name + ', ' + offset + ');');
        decodeBody.push(name + ': $buf.readUInt16' + bytes + '(' + offset + ')');
      } else if (size === 4) {
        encodeBody.push('$buf.writeUInt32' + bytes + '(' + name + ', ' + offset + ');');
        decodeBody.push(name + ': $buf.readUInt32' + bytes + '(' + offset + ')');
      } else {
        encodeBody.push('$buf.writeUInt' + bytes + '(' + name + ', ' + offset + ', ' + size + ');');
        decodeBody.push(name + ': $buf.readUInt' + bytes + '(' + offset + ', ' + size + ')');
      }
      break;
    case 'float':
      encodeCheck.push('if (typeof a !== "number" || isNaN(' + name + ')) throw new InvalidDataTypeError("' + name + '", "' + type + '");');
      encodeBody.push('$buf.writeFloat' + bytes + '(' + name + ', ' + offset + ');');
      decodeBody.push(name + ': $buf.readFloat' + bytes + '(' + offset + ')');
      break;
    case 'double':
      encodeCheck.push('if (typeof a !== "number" || isNaN(' + name + ')) throw new InvalidDataTypeError("' + name + '", "' + type + '");');
      encodeBody.push('$buf.writeDouble' + bytes + '(' + name + ', ' + offset + ');');
      decodeBody.push(name + ': $buf.readDouble' + bytes + '(' + offset + ')');
      break;
    case 'string':
      encodeCheck.push('if (typeof ' + name + ' !== "string") throw new InvalidDataTypeError("' + name + '", "' + type + '");');
      if (size > 0) {
        encodeBody.push('Buffer.from(' + name + ').copy($buf, ' + offset + ', 0, ' + size + ')');
        decodeBody.push(name + ': $buf.slice(' + offset + ', ' + (offset + size) + ').toString()');
      } else {
        encodeBody.push('Buffer.from(' + name + ').copy($buf, ' + offset + ', 0)');
        decodeBody.push(name + ': $buf.slice(' + offset + ').toString()');
      }
      break;
    case 'buffer':
      encodeCheck.push('if (!Buffer.isBuffer(' + name + ')) throw new InvalidDataTypeError("' + name + '", "' + type + '");');
      if (size > 0) {
        encodeBody.push(name + '.copy($buf, ' + offset + ', 0, ' + size + ')');
        decodeBody.push(name + ': $buf.slice(' + offset + ', ' + (offset + size) + ')');
      } else {
        encodeBody.push(name + '.copy($buf, ' + offset + ', 0)');
        decodeBody.push(name + ': $buf.slice(' + offset + ')');
      }
      break;
    default:
      throw new NotSupportDataTypeError(name, type);
    }

    offset += size;
  });

  const lastItemType = String(list[list.length - 1][1]).toLowerCase();
  let lastItemSize = Number(list[list.length - 1][2]);
  if (lastItemType === 'float') lastItemSize = 4;
  if (lastItemType === 'double') lastItemSize = 8;
  const lastItemName = list[list.length - 1][0];
  const encodeSource = '(function (' + encodeArgs.join(', ') + ') {\n' +
                     'var $buf = Buffer.alloc(' + (lastItemSize > 0 ? offset : offset + ' + ' + lastItemName + '.length') + ')\n' +
                     encodeBody.join('\n') + '\n' +
                     'return $buf;\n' +
                     '})';
  const encodeStrictSource = '(function (' + encodeArgs.join(', ') + ') {\n' +
                     encodeCheck.join('\n') + '\n' +
                     'var $buf = Buffer.alloc(' + (lastItemSize > 0 ? offset : offset + ' + ' + lastItemName + '.length') + ')\n' +
                     encodeBody.join('\n') + '\n' +
                     'return $buf;\n' +
                     '})';
  const encodeExSource = '(function (data) {\n' +
                       'return proto.encode(' + encodeArgs.map(function (n) { return 'data.' + n; }).join(', ') + ');\n' +
                       '})';
  const encodeExStrictSource = '(function (data) {\n' +
                       'return proto.encodeStrict(' + encodeArgs.map(function (n) { return 'data.' + n; }).join(', ') + ');\n' +
                       '})';
  const decodeSource = '(function ($buf) {\n' +
                     'return {\n' +
                     decodeBody.join(',\n') + '\n' +
                     '};\n' +
                     '})';
  const decodeStrictSource = '(function ($buf) {\n' +
                     'if ($buf.length < ' + offset + ') throw new IncorrectBufferSizeError(' + offset + ', $buf.length);\n' +
                     'return {\n' +
                     decodeBody.join(',\n') + '\n' +
                     '};\n' +
                     '})';

  const js = generateJsCodes(encodeSource, encodeExSource, encodeStrictSource, encodeExStrictSource, decodeSource, decodeStrictSource, offset);
  if (options.sourceCode) {
    return js;
  }
  return eval(js);
}

module.exports = parseProto;
