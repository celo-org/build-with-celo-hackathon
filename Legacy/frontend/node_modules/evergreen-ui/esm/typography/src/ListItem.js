import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["children", "icon", "iconColor", "size"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';
import { IconWrapper } from '../../icons/src/IconWrapper';
import { minorScale } from '../../scales';
import Text from './Text';
var ListItem = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(function ListItem(props, ref) {
  var children = props.children,
      icon = props.icon,
      iconColor = props.iconColor,
      size = props.size,
      rest = _objectWithoutProperties(props, _excluded);

  var paddingLeft;
  if (size === 300) paddingLeft = minorScale(1);
  if (size === 400) paddingLeft = minorScale(2);
  if (size === 500) paddingLeft = minorScale(2);
  if (size === 600) paddingLeft = minorScale(3);
  var iconTop;
  if (size === 300) iconTop = 1;
  if (size === 400) iconTop = 3;
  if (size === 500) iconTop = 3;
  if (size === 600) iconTop = 4;
  var iconSize;
  if (size === 300) iconSize = 12;
  if (size === 400) iconSize = 14;
  if (size === 500) iconSize = 14;
  if (size === 600) iconSize = 16;
  var iconLeft = -iconSize - 4;
  if (size === 600) iconLeft = -iconSize;
  return /*#__PURE__*/React.createElement(Text, _extends({
    is: "li",
    position: "relative",
    marginY: "0.5em",
    size: size,
    listStyleType: icon ? 'none' : undefined,
    paddingLeft: icon ? paddingLeft : undefined,
    ref: ref
  }, rest), icon && /*#__PURE__*/React.createElement(IconWrapper, {
    icon: icon,
    color: iconColor,
    position: "absolute",
    size: iconSize,
    left: iconLeft,
    top: iconTop
  }), children);
}));
ListItem.propTypes = _objectSpread(_objectSpread({}, Text.propTypes), {}, {
  /**
   * When provided, adds a icon before the list item.
   */
  icon: PropTypes.oneOfType([PropTypes.elementType, PropTypes.element]),

  /**
   * The color of the icon.
   */
  iconColor: PropTypes.string
});
export default ListItem;