import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["children", "color", "disabled", "dotSize"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { SymbolCircleIcon } from '../../icons';
import { majorScale } from '../../scales';
import { Text } from '../../typography';
var StatusIndicator = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(function StatusIndicator(props, ref) {
  var children = props.children,
      _props$color = props.color,
      color = _props$color === void 0 ? 'disabled' : _props$color,
      disabled = props.disabled,
      _props$dotSize = props.dotSize,
      dotSize = _props$dotSize === void 0 ? 10 : _props$dotSize,
      rest = _objectWithoutProperties(props, _excluded);

  return /*#__PURE__*/React.createElement(Text, _extends({
    display: "inline-flex",
    alignItems: "center",
    ref: ref
  }, rest), /*#__PURE__*/React.createElement(SymbolCircleIcon, {
    flexShrink: 0,
    marginRight: majorScale(1),
    size: dotSize,
    color: color
  }), children);
}));
StatusIndicator.propTypes = _objectSpread(_objectSpread({}, Text.propTypes), {}, {
  /**
   * The label of the status hint.
   */
  children: PropTypes.node,

  /**
   * The color of the status hint. Can be an intent or hex value.
   */
  color: PropTypes.string,

  /**
   * The size of the dot to the left of the text
   */
  dotSize: PropTypes.number
});
export default StatusIndicator;