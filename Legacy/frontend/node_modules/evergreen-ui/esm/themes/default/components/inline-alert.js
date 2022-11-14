var baseStyle = function baseStyle(theme, _ref) {
  var _ref$intent = _ref.intent,
      intent = _ref$intent === void 0 ? 'info' : _ref$intent;
  return {
    color: theme.intents[intent].text
  };
};

var appearances = {};
var sizes = {};
export default {
  baseStyle: baseStyle,
  appearances: appearances,
  sizes: sizes
};