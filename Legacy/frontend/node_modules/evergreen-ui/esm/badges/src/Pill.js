import _extends from "@babel/runtime/helpers/esm/extends";
import React, { memo, forwardRef } from 'react';
import Badge from './Badge';
var Pill = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(function Pill(props, ref) {
  return /*#__PURE__*/React.createElement(Badge, _extends({
    borderRadius: 999,
    ref: ref
  }, props));
}));
Pill.propTypes = Badge.propTypes;
export default Pill;