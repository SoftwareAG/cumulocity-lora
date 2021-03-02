'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = isPossibleNumber;
exports.is_possible_number = is_possible_number;

var _metadata = require('./metadata');

var _metadata2 = _interopRequireDefault(_metadata);

var _getNumberType_ = require('./getNumberType_');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isPossibleNumber(input, options, metadata) {
	/* istanbul ignore if */
	if (options === undefined) {
		options = {};
	}

	metadata = new _metadata2.default(metadata);

	if (options.v2) {
		if (!input.countryCallingCode) {
			throw new Error('Invalid phone number object passed');
		}
		metadata.chooseCountryByCountryCallingCode(input.countryCallingCode);
	} else {
		if (!input.phone) {
			return false;
		}
		if (input.country) {
			if (!metadata.hasCountry(input.country)) {
				throw new Error('Unknown country: ' + input.country);
			}
			metadata.country(input.country);
		} else {
			if (!input.countryCallingCode) {
				throw new Error('Invalid phone number object passed');
			}
			metadata.chooseCountryByCountryCallingCode(input.countryCallingCode);
		}
	}

	if (!metadata.possibleLengths()) {
		throw new Error('Metadata too old');
	}

	return is_possible_number(input.phone || input.nationalNumber, undefined, metadata);
}

function is_possible_number(national_number, is_international, metadata) {
	switch ((0, _getNumberType_.checkNumberLengthForType)(national_number, undefined, metadata)) {
		case 'IS_POSSIBLE':
			return true;
		// case 'IS_POSSIBLE_LOCAL_ONLY':
		// 	return !is_international
		default:
			return false;
	}
}
//# sourceMappingURL=isPossibleNumber_.js.map