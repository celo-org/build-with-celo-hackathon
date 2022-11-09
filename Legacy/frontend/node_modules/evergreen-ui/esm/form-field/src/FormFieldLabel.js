import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["children", "isAstrixShown"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Label } from '../../typography';
var FormFieldLabel = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(function FormFieldLabel(props, ref) {
  var children = props.children,
      isAstrixShown = props.isAstrixShown,
      rest = _objectWithoutProperties(props, _excluded);

  return /*#__PURE__*/React.createElement(Label, _extends({
    display: "block",
    marginBottom: 0
  }, rest, {
    ref: ref
  }), children, isAstrixShown && /*#__PURE__*/React.createElement(React.Fragment, null, ' ', /*#__PURE__*/React.createElement("span", {
    title: "This field is required."
  }, "*")));
}));
FormFieldLabel.propTypes = _objectSpread(_objectSpread({}, Label.propTypes), {}, {
  /**
   * Whether or not to show an asterix after the label.
   */
  isAstrixShown: PropTypes.bool
});
export default FormFieldLabel;