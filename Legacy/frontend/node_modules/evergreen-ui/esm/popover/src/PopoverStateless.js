import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["children"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Card } from '../../layers';
var PopoverStateless = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(function PopoverStateless(props, ref) {
  var children = props.children,
      rest = _objectWithoutProperties(props, _excluded);

  return /*#__PURE__*/React.createElement(Card, _extends({
    role: "dialog",
    elevation: 3,
    overflow: "hidden",
    minWidth: 200,
    backgroundColor: "white",
    ref: ref
  }, rest), children);
}));
PopoverStateless.propTypes = _objectSpread(_objectSpread({}, Card.propTypes), {}, {
  /**
   * The content of the Popover.
   */
  children: PropTypes.node
});
export default PopoverStateless;