import _extends from "@babel/runtime/helpers/esm/extends";
import React, { memo, forwardRef } from 'react';
import Icon from '../src/Icon';
var svgPaths16 = ['M-.01 6.66l7.34 2 2 7.33 6.66-16z'];
var svgPaths20 = ['M0 8.33l9.17 2.5 2.5 9.17L20 0z'];
export var GeolocationIcon = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(function GeolocationIcon(props, ref) {
  return /*#__PURE__*/React.createElement(Icon, _extends({
    svgPaths16: svgPaths16,
    svgPaths20: svgPaths20,
    ref: ref,
    name: "geolocation"
  }, props));
}));