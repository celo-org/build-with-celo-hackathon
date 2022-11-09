import _extends from "@babel/runtime/helpers/esm/extends";
import React, { memo, forwardRef } from 'react';
import Icon from '../src/Icon';
var svgPaths16 = ['M8 3a5 5 0 100 10A5 5 0 108 3z'];
var svgPaths20 = ['M10 3a7 7 0 100 14 7 7 0 100-14z'];
export var RecordIcon = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(function RecordIcon(props, ref) {
  return /*#__PURE__*/React.createElement(Icon, _extends({
    svgPaths16: svgPaths16,
    svgPaths20: svgPaths20,
    ref: ref,
    name: "record"
  }, props));
}));