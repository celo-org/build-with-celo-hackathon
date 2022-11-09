import _extends from "@babel/runtime/helpers/esm/extends";
import React, { forwardRef } from 'react';
import Box from 'ui-box';
var TabNavigation = /*#__PURE__*/forwardRef(function TabNavigation(props, ref) {
  return /*#__PURE__*/React.createElement(Box, _extends({
    is: "nav",
    role: "navigation"
  }, props, {
    ref: ref
  }));
});
TabNavigation.propTypes = Box.propTypes;
export default TabNavigation;