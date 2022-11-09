import _extends from "@babel/runtime/helpers/esm/extends";
import React, { memo, forwardRef } from 'react';
import Icon from '../src/Icon';
var svgPaths16 = ['M8 0a8 8 0 100 16A8 8 0 108 0z'];
var svgPaths20 = ['M9.96 0a10 10 0 100 20 10 10 0 100-20z'];
export var FullCircleIcon = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(function FullCircleIcon(props, ref) {
  return /*#__PURE__*/React.createElement(Icon, _extends({
    svgPaths16: svgPaths16,
    svgPaths20: svgPaths20,
    ref: ref,
    name: "full-circle"
  }, props));
}));