'use strict';

var _phantom = require('phantom');

var _phantom2 = _interopRequireDefault(_phantom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ph = void 0;
var _page = void 0;
var _outObj = void 0;
_phantom2.default.create().then(function (ph) {
  _ph = ph;
  return _ph.createPage();
}).then(function (page) {
  _page = page;
  return _page.open('https://stackoverflow.com/');
}).then(function (status) {
  console.log(status);
  return _page.property('content');
}).then(function (content) {
  console.log(content);
  _page.close();
  _ph.exit();
});