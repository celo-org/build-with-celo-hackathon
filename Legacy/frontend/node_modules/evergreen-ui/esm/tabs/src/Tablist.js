import _extends from "@babel/runtime/helpers/esm/extends";
import React, { forwardRef } from 'react';
import Box from 'ui-box';
var Tablist = /*#__PURE__*/forwardRef(function Tablist(props, ref) {
  return /*#__PURE__*/React.createElement(Box, _extends({
    role: "tablist"
  }, props, {
    ref: ref
  }));
});
Tablist.propTypes = Box.propTypes;
export default Tablist;