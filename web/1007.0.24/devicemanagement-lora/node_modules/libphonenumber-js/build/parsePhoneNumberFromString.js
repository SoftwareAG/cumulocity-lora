'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = parsePhoneNumberFromString;

var _parsePhoneNumber = require('./parsePhoneNumber');

var _parsePhoneNumberFromString_ = require('./parsePhoneNumberFromString_');

var _parsePhoneNumberFromString_2 = _interopRequireDefault(_parsePhoneNumberFromString_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parsePhoneNumberFromString() {
	var _normalizeArguments = (0, _parsePhoneNumber.normalizeArguments)(arguments),
	    text = _normalizeArguments.text,
	    options = _normalizeArguments.options,
	    metadata = _normalizeArguments.metadata;

	return (0, _parsePhoneNumberFromString_2.default)(text, options, metadata);
}
//# sourceMappingURL=parsePhoneNumberFromString.js.map