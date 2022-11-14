import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function getColor(theme, _ref) {
  var color = _ref.color,
      hashValue = _ref.hashValue;

  if (color === 'automatic') {
    var keys = Object.keys(theme.fills);

    if (hashValue) {
      return theme.fills[keys[hashValue % keys.length]];
    } else {
      return theme.fills[keys[Math.floor(Math.random() * keys.length)]];
    }
  }

  return theme.fills[color];
}

var baseStyle = function baseStyle(theme, props) {
  return _objectSpread({
    borderRadius: props.shape === 'round' ? '100%' : 'radii.1'
  }, getColor(theme, props));
};

var appearances = {};
var sizes = {};
export default {
  baseStyle: baseStyle,
  appearances: appearances,
  sizes: sizes
};