'use strict'

var escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;'
};

var onRegExpMatch = function(match) {
  return escapeMap[match];
};

module.exports = function(stringToEscape) {
  var regExpSource = '(?:' + Object.keys(escapeMap).join('|') + ')',
      testRegExp = new RegExp(regExpSource),
      matchRegExp = new RegExp(regExpSource, 'g'),
      result = testRegExp.test(stringToEscape) ?
        stringToEscape.replace(matchRegExp, onRegExpMatch) :
        stringToEscape;
  return result;
};
