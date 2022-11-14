import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["color", "icon", "size", "title"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';
import ReactIs from 'react-is';
import Box from 'ui-box';
/**
 * This is an internal helper component for rendering custom or Evergreen icons
 * Box props are applied to the outer Box container, and Evergreen icon-specific props are added to the icon element.
 */

export var IconWrapper = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(function Icon(_ref, ref) {
  var color = _ref.color,
      icon = _ref.icon,
      size = _ref.size,
      title = _ref.title,
      props = _objectWithoutProperties(_ref, _excluded);

  if (!icon || typeof icon === 'string') {
    return null;
  }

  var iconProps = {
    color: color,
    size: size,
    title: title
  };
  var iconWithProps = null;

  if (ReactIs.isValidElementType(icon)) {
    var Component = icon;
    iconWithProps = /*#__PURE__*/React.createElement(Component, _extends({
      ref: ref
    }, iconProps));
  } else if ( /*#__PURE__*/React.isValidElement(icon)) {
    iconWithProps = /*#__PURE__*/React.cloneElement(icon, _objectSpread(_objectSpread(_objectSpread({}, iconProps), icon.props), {}, {
      ref: ref
    }));
  }

  return /*#__PURE__*/React.createElement(Box, _extends({
    display: "inline-flex"
  }, props), iconWithProps);
}));
IconWrapper.propTypes = {
  /**
   * Color of icon. Equivalent to setting CSS `fill` property.
   */
  color: PropTypes.string,

  /**
   * The icon component - whether an Evergreen icon or a custom icon node:
   *
   * - If `null` or `undefined` or `false`, this component will render nothing.
   * - If given a `JSX.Element`, that element will be rendered, with size/color/title props cloned into it
   * - If given a React element type, it will be rendered with the other icon props
   *   As a consumer, you should never use `<IconWrapper icon={<element />}` directly; simply render `<element />` instead.
   */
  icon: PropTypes.oneOfType([PropTypes.elementType, PropTypes.element]),

  /**
   * Size of the icon, in pixels.
   * Icons contains 16px and 20px SVG icon paths,
   * and chooses the appropriate resolution based on this prop.
   */
  size: PropTypes.number,

  /**
   * Description string.
   * Browsers usually render this as a tooltip on hover, whereas screen
   * readers will use it for aural feedback.
   * By default, this is set to the icon's name for accessibility.
   */
  title: PropTypes.string
};