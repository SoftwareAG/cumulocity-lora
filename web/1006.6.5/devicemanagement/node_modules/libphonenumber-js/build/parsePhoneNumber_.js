'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = parsePhoneNumber;

var _parse_ = require('./parse_');

var _parse_2 = _interopRequireDefault(_parse_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parsePhoneNumber(text, options, metadata) {
	return (0, _parse_2.default)(text, _extends({}, options, { v2: true }), metadata);
}
//# sourceMappingURL=parsePhoneNumber_.js.map