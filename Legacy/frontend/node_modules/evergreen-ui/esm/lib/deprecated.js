import warning from './warning';
export default (function (propType, explanation) {
  return function (props, propName, componentName) {
    if (process.env.NODE_ENV !== 'production') {
      warning(propName in props, "\"".concat(propName, "\" property of \"").concat(componentName, "\" has been deprecated.\n").concat(explanation));
    }

    for (var _len = arguments.length, rest = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      rest[_key - 3] = arguments[_key];
    }

    return propType.apply(void 0, [props, propName, componentName].concat(rest));
  };
});