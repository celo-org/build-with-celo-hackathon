import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["children", "isNumber", "placeholder", "textProps"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Text } from '../../typography';
import TableCell from './TableCell';
var ellipsis = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
};
var TextTableCell = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(function TextTableCell(props, ref) {
  var children = props.children,
      _props$isNumber = props.isNumber,
      isNumber = _props$isNumber === void 0 ? false : _props$isNumber,
      placeholder = props.placeholder,
      textProps = props.textProps,
      rest = _objectWithoutProperties(props, _excluded);

  return /*#__PURE__*/React.createElement(TableCell, _extends({
    ref: ref
  }, rest), /*#__PURE__*/React.createElement(Text, _extends({
    size: 300,
    flex: "1",
    title: typeof children === 'string' ? children : undefined
  }, ellipsis, isNumber ? {
    fontFamily: 'mono'
  } : {}, textProps), children));
}));
TextTableCell.propTypes = _objectSpread(_objectSpread({}, TableCell.propTypes), {}, {
  /**
   * Adds fontFamily: mono.
   */
  isNumber: PropTypes.bool,

  /**
   * Pass additional props to the Text component.
   */
  textProps: PropTypes.object
});
export default TextTableCell;