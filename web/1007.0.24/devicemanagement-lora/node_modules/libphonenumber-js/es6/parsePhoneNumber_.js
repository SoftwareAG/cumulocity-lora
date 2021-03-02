var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import parseNumber from './parse_';

export default function parsePhoneNumber(text, options, metadata) {
	return parseNumber(text, _extends({}, options, { v2: true }), metadata);
}
//# sourceMappingURL=parsePhoneNumber_.js.map