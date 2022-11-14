import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["appearance", "disabled", "height"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { memo, forwardRef } from 'react';
import Box, { splitBoxProps } from 'ui-box';
import { StackingOrder } from '../../constants';
import { SearchIcon } from '../../icons';
import { TextInput } from '../../text-input';

var getIconSizeForInput = function getIconSizeForInput(height) {
  if (height <= 28) return 12;
  if (height <= 32) return 14;
  if (height <= 40) return 16;
  if (height <= 48) return 18;
  return 20;
};

var SearchInput = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(function SearchInput(props, ref) {
  var _props$appearance = props.appearance,
      appearance = _props$appearance === void 0 ? 'default' : _props$appearance,
      disabled = props.disabled,
      _props$height = props.height,
      height = _props$height === void 0 ? 32 : _props$height,
      restProps = _objectWithoutProperties(props, _excluded);

  var _splitBoxProps = splitBoxProps(restProps),
      matchedProps = _splitBoxProps.matchedProps,
      remainingProps = _splitBoxProps.remainingProps;

  var width = matchedProps.width;
  var iconSize = getIconSizeForInput(height);
  return /*#__PURE__*/React.createElement(Box, _extends({
    position: "relative",
    display: "inline-flex",
    height: height
  }, matchedProps), /*#__PURE__*/React.createElement(Box, {
    height: height,
    width: height,
    pointerEvents: "none",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }, /*#__PURE__*/React.createElement(SearchIcon, {
    color: "default",
    zIndex: StackingOrder.FOCUSED + 1,
    size: iconSize
  })), /*#__PURE__*/React.createElement(TextInput, _extends({
    ref: ref,
    height: height,
    paddingLeft: height,
    appearance: appearance,
    disabled: disabled,
    width: width,
    type: "search"
  }, remainingProps)));
}));
SearchInput.propTypes = _objectSpread({}, TextInput.propTypes);
export default SearchInput;