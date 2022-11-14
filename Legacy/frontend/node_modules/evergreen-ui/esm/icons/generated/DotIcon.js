import _extends from "@babel/runtime/helpers/esm/extends";
import React, { memo, forwardRef } from 'react';
import Icon from '../src/Icon';
var svgPaths16 = ['M8 5a3 3 0 100 6 3 3 0 100-6z'];
var svgPaths20 = ['M10 6a4 4 0 100 8 4 4 0 100-8z'];
export var DotIcon = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(function DotIcon(props, ref) {
  return /*#__PURE__*/React.createElement(Icon, _extends({
    svgPaths16: svgPaths16,
    svgPaths20: svgPaths20,
    ref: ref,
    name: "dot"
  }, props));
}));