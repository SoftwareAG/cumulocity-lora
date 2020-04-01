/**
 * Buffer override for browsers compatibility
 */
function Buffer(string, encoding) {
    return fromHexString(string);
};

/**
 * Buffer::from override for browsers compatibility
 */
Buffer.from = function (string, encoding) {
    return fromHexString(string);
};

/**
 * Buffer::alloc override for browsers compatibility
 */
Buffer.alloc = function (length) {
    return new Uint8Array(length);
};

/**
 * Uint8Array::readUInt16BE override for browsers compatibility
 */
Uint8Array.prototype.readUInt16BE = function (offset) {
    var dataView = new DataView(this.buffer);
    return dataView.getUint16(offset);
};

/**
 * Uint8Array::readInt16BE override for browsers compatibility
 */
Uint8Array.prototype.readInt16BE = function (offset) {
    var dataView = new DataView(this.buffer);
    return dataView.getInt16(offset);
};

/**
 * Uint8Array::readUInt8 override for browsers compatibility
 */
Uint8Array.prototype.readUInt8 = function (offset) {
    var dataView = new DataView(this.buffer);
    return dataView.getUint8(offset);
};

/**
 * Uint8Array::readUInt32BE override for browsers compatibility
 */
Uint8Array.prototype.readUInt32BE = function (offset) {
    var dataView = new DataView(this.buffer);
    return dataView.getUint32(offset);
};

/**
 * Uint8Array::writeUInt16BE override for browsers compatibility
 */
Uint8Array.prototype.writeUInt16BE = function (value, offset) {
    var dataView = new DataView(this.buffer);
    return dataView.setUint16(offset, value);
};

/**
 * Uint8Array::writeUInt8 override for browsers compatibility
 */
Uint8Array.prototype.writeUInt8 = function (value, offset) {
    var dataView = new DataView(this.buffer);
    return dataView.setUint8(offset, value);
};

/**
 * Uint8Array::writeUInt32BE override for browsers compatibility
 */
Uint8Array.prototype.writeUInt32BE = function (value, offset) {
    var dataView = new DataView(this.buffer);
    return dataView.setUint32(offset, value);
};

/**
 * Uint8Array::toString override for browsers compatibility
 */
Uint8Array.prototype.toString = function () {
    return toHexString(this);
};

/**
 * From hex string
 * @param {string} hexString 
 */
function fromHexString(hexString) {
    var matches = hexString.match(/.{1,2}/g);
    if (!matches) {
        return new Uint8Array();
    }

    return new Uint8Array(
        matches.map(function (byte) {
            return parseInt(byte, 16);
        })
    );
};

/**
 * To hex string
 * @param {Uint8Array} bytes 
 */
function toHexString(bytes) {
    return bytes.reduce(function (str, byte) {
        return str + byte.toString(16).padStart(2, '0')
    }, '');
};
