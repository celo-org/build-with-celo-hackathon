import _extends from "@babel/runtime/helpers/esm/extends";
import React, { memo, forwardRef } from 'react';
import Icon from '../src/Icon';
var svgPaths16 = ['M9 14v2H7v-2h2zm1-14L9 12H7L6 0h4z'];
var svgPaths20 = ['M12 16v4H8v-4h4zm1-16l-1 14H8L7 0h6z'];
export var HighPriorityIcon = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(function HighPriorityIcon(props, ref) {
  return /*#__PURE__*/React.createElement(Icon, _extends({
    svgPaths16: svgPaths16,
    svgPaths20: svgPaths20,
    ref: ref,
    name: "high-priority"
  }, props));
}));