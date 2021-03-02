var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import parsePhoneNumber from './parsePhoneNumber_';
import ParseError from './ParseError';
import { isSupportedCountry } from './metadata';

export default function parsePhoneNumberFromString(text, options, metadata) {
	// Validate `defaultCountry`.
	if (options && options.defaultCountry && !isSupportedCountry(options.defaultCountry, metadata)) {
		options = _extends({}, options, {
			defaultCountry: undefined
		});
	}
	// Parse phone number.
	try {
		return parsePhoneNumber(text, options, metadata);
	} catch (error) {
		/* istanbul ignore else */
		if (error instanceof ParseError) {
			//
		} else {
			throw error;
		}
	}
}
//# sourceMappingURL=parsePhoneNumberFromString_.js.map