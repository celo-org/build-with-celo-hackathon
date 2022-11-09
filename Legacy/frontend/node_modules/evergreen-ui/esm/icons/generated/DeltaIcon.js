import _extends from "@babel/runtime/helpers/esm/extends";
import React, { memo, forwardRef } from 'react';
import Icon from '../src/Icon';
var svgPaths16 = ['M8 0L0 16h16L8 0zM7 5l5 10H2L7 5z'];
var svgPaths20 = ['M10 0L0 20h20L10 0zM9 6l6 12H3L9 6z'];
export var DeltaIcon = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(function DeltaIcon(props, ref) {
  return /*#__PURE__*/React.createElement(Icon, _extends({
    svgPaths16: svgPaths16,
    svgPaths20: svgPaths20,
    ref: ref,
    name: "delta"
  }, props));
}));