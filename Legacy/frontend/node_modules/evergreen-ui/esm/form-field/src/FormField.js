import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["hint", "label", "labelFor", "children", "isRequired", "labelProps", "description", "validationMessage"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import Box, { dimensions, spacing, position, layout } from 'ui-box';
import FormFieldDescription from './FormFieldDescription';
import FormFieldHint from './FormFieldHint';
import FormFieldLabel from './FormFieldLabel';
import FormFieldValidationMessage from './FormFieldValidationMessage';
var FormField = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(function FormField(props, ref) {
  var hint = props.hint,
      label = props.label,
      labelFor = props.labelFor,
      children = props.children,
      isRequired = props.isRequired,
      _props$labelProps = props.labelProps,
      labelProps = _props$labelProps === void 0 ? {
    size: 400
  } : _props$labelProps,
      description = props.description,
      validationMessage = props.validationMessage,
      rest = _objectWithoutProperties(props, _excluded);

  return /*#__PURE__*/React.createElement(Box, _extends({}, rest, {
    ref: ref
  }), /*#__PURE__*/React.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    marginBottom: 8
  }, /*#__PURE__*/React.createElement(FormFieldLabel, _extends({
    htmlFor: labelFor,
    isAstrixShown: isRequired
  }, labelProps), label), typeof description === 'string' ? /*#__PURE__*/React.createElement(FormFieldDescription, {
    id: labelFor + '__description'
  }, description) : description), children, typeof validationMessage === 'string' ? /*#__PURE__*/React.createElement(FormFieldValidationMessage, {
    marginTop: 8,
    id: labelFor + '__validation-message'
  }, validationMessage) : validationMessage, typeof hint === 'string' ? /*#__PURE__*/React.createElement(FormFieldHint, {
    marginTop: 6,
    id: labelFor + '__hint'
  }, hint) : hint);
}));
FormField.propTypes = _objectSpread(_objectSpread(_objectSpread(_objectSpread({
  /**
   * The label used above the input element.
   */
  label: PropTypes.node,

  /**
   * Passed on the label as a htmlFor prop.
   */
  labelFor: PropTypes.string,

  /**
   * Whether or not show an asterix after the label.
   */
  isRequired: PropTypes.bool,

  /**
   * An optional description of the field under the label, above the input element.
   */
  description: PropTypes.node,

  /**
   * An optional hint under the input element.
   */
  hint: PropTypes.node,

  /**
   * If a validation message is passed it is shown under the input element
   * and above the hint. This is unaffected by `isInvalid`.
   */
  validationMessage: PropTypes.node
}, dimensions.propTypes), spacing.propTypes), position.propTypes), layout.propTypes);
export default FormField;