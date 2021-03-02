'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = findNumbers;

var _PhoneNumberMatcher = require('./PhoneNumberMatcher');

var _PhoneNumberMatcher2 = _interopRequireDefault(_PhoneNumberMatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findNumbers(text, options, metadata) {
	var matcher = new _PhoneNumberMatcher2.default(text, options, metadata);
	var results = [];
	while (matcher.hasNext()) {
		results.push(matcher.next());
	}
	return results;
}
//# sourceMappingURL=findNumbers_.js.map