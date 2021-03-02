'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = isValidNumberForRegion;

var _isViablePhoneNumber = require('./isViablePhoneNumber');

var _isViablePhoneNumber2 = _interopRequireDefault(_isViablePhoneNumber);

var _parse_ = require('./parse_');

var _parse_2 = _interopRequireDefault(_parse_);

var _isValidNumberForRegion_ = require('./isValidNumberForRegion_');

var _isValidNumberForRegion_2 = _interopRequireDefault(_isValidNumberForRegion_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isValidNumberForRegion(number, country, metadata) {
	if (typeof number !== 'string') {
		throw new TypeError('number must be a string');
	}

	if (typeof country !== 'string') {
		throw new TypeError('country must be a string');
	}

	// `parse` extracts phone numbers from raw text,
	// therefore it will cut off all "garbage" characters,
	// while this `validate` function needs to verify
	// that the phone number contains no "garbage"
	// therefore the explicit `isViablePhoneNumber` check.
	var input = void 0;
	if ((0, _isViablePhoneNumber2.default)(number)) {
		input = (0, _parse_2.default)(number, { defaultCountry: country }, metadata);
	} else {
		input = {};
	}

	return (0, _isValidNumberForRegion_2.default)(input, country, undefined, metadata);
}
//# sourceMappingURL=isValidNumberForRegion.js.map