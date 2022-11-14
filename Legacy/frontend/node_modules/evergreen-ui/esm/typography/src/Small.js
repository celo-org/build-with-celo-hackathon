import _extends from "@babel/runtime/helpers/esm/extends";
import React, { memo, forwardRef } from 'react';
import Box from 'ui-box';
var Small = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(function Small(props, ref) {
  return /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref,
    is: "small",
    fontSize: "85%"
  }, props));
}));
export default Small;