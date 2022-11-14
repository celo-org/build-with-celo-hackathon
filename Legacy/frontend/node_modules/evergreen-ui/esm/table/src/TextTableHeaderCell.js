import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["children", "isSortable", "sortOrder", "textProps"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Box from 'ui-box';
import TableHeaderCell from './TableHeaderCell';
var TextTableHeaderCell = /*#__PURE__*/memo(function TextTableHeaderCell(props) {
  var children = props.children,
      isSortable = props.isSortable,
      sortOrder = props.sortOrder,
      textProps = props.textProps,
      rest = _objectWithoutProperties(props, _excluded);

  return /*#__PURE__*/React.createElement(TableHeaderCell, rest, /*#__PURE__*/React.createElement(Box, _extends({
    flex: "1"
  }, textProps), children, ' '));
});
TextTableHeaderCell.propTypes = _objectSpread(_objectSpread({}, TableHeaderCell.propTypes), {}, {
  /**
   * Pass additional props to the Text component.
   */
  textProps: PropTypes.objectOf(PropTypes.string)
});
export default TextTableHeaderCell;