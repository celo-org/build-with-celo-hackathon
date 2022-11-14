import _extends from "@babel/runtime/helpers/esm/extends";
import React, { memo, forwardRef } from 'react';
import Icon from '../src/Icon';
var svgPaths16 = ['M8 3.01a5 5 0 100 10 5 5 0 100-10z'];
var svgPaths20 = ['M10 4.01a6 6 0 100 12 6 6 0 100-12z'];
export var SymbolCircleIcon = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(function SymbolCircleIcon(props, ref) {
  return /*#__PURE__*/React.createElement(Icon, _extends({
    svgPaths16: svgPaths16,
    svgPaths20: svgPaths20,
    ref: ref,
    name: "symbol-circle"
  }, props));
}));