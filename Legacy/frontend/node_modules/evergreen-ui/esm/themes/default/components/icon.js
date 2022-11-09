import { get } from '../../../theme/src/theme-tools';

var baseStyle = function baseStyle(theme, _ref) {
  var color = _ref.color;
  return {
    fill: get(theme, "intents.".concat(color, ".icon")) || get(theme, "colors.icon.".concat(color)) || get(theme, "colors.".concat(color)) || color
  };
};

var appearances = {};
var sizes = {};
export default {
  baseStyle: baseStyle,
  appearances: appearances,
  sizes: sizes
};