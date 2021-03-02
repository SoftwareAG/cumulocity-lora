'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = parsePhoneNumberFromString;

var _parsePhoneNumber_ = require('./parsePhoneNumber_');

var _parsePhoneNumber_2 = _interopRequireDefault(_parsePhoneNumber_);

var _ParseError = require('./ParseError');

var _ParseError2 = _interopRequireDefault(_ParseError);

var _metadata = require('./metadata');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parsePhoneNumberFromString(text, options, metadata) {
	// Validate `defaultCountry`.
	if (options && options.defaultCountry && !(0, _metadata.isSupportedCountry)(options.defaultCountry, metadata)) {
		options = _extends({}, options, {
			defaultCountry: undefined
		});
	}
	// Parse phone number.
	try {
		return (0, _parsePhoneNumber_2.default)(text, options, metadata);
	} catch (error) {
		/* istanbul ignore else */
		if (error instanceof _ParseError2.default) {
			//
		} else {
			throw error;
		}
	}
}
//# sourceMappingURL=parsePhoneNumberFromString_.js.map