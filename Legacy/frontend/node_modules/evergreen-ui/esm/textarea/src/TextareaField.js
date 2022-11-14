import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["appearance", "description", "disabled", "hint", "id", "inputHeight", "inputWidth", "isInvalid", "label", "placeholder", "required", "resize", "spellCheck", "validationMessage"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { splitBoxProps } from 'ui-box';
import { FormField } from '../../form-field';
import { useId } from '../../hooks';
import { generateAriaDescribedBy } from '../../lib/generate-aria-describedby';
import Textarea from './Textarea';
var TextareaField = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(function TextareaField(props, ref) {
  var id = useId('TextareaField', props.id);

  var appearance = props.appearance,
      description = props.description,
      disabled = props.disabled,
      hint = props.hint,
      unusedId = props.id,
      _props$inputHeight = props.inputHeight,
      inputHeight = _props$inputHeight === void 0 ? 80 : _props$inputHeight,
      _props$inputWidth = props.inputWidth,
      inputWidth = _props$inputWidth === void 0 ? '100%' : _props$inputWidth,
      isInvalid = props.isInvalid,
      label = props.label,
      placeholder = props.placeholder,
      required = props.required,
      resize = props.resize,
      spellCheck = props.spellCheck,
      validationMessage = props.validationMessage,
      rest = _objectWithoutProperties(props, _excluded);
  /**
   * Split the wrapper props from the input props.
   */


  var _splitBoxProps = splitBoxProps(rest),
      matchedProps = _splitBoxProps.matchedProps,
      remainingProps = _splitBoxProps.remainingProps;

  return /*#__PURE__*/React.createElement(FormField, _extends({
    marginBottom: 24,
    label: label,
    isRequired: required,
    hint: hint,
    description: description,
    validationMessage: validationMessage,
    labelFor: id
  }, matchedProps), /*#__PURE__*/React.createElement(Textarea, _extends({
    id: id,
    ref: ref,
    width: inputWidth,
    height: inputHeight,
    disabled: disabled,
    required: required,
    isInvalid: isInvalid,
    appearance: appearance,
    placeholder: placeholder,
    spellCheck: spellCheck,
    resize: resize,
    "aria-describedby": generateAriaDescribedBy(id, {
      description: description,
      hint: hint,
      validationMessage: validationMessage
    })
  }, remainingProps)));
}));
TextareaField.propTypes = _objectSpread(_objectSpread(_objectSpread({}, Textarea.propTypes), FormField.propTypes), {}, {
  /**
   * The label used above the input element.
   */
  label: PropTypes.node.isRequired,

  /**
   * Whether or not to show an asterix after the label.
   */
  required: PropTypes.bool,

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
  validationMessage: PropTypes.node,

  /**
   * The height of the input element.
   */
  inputHeight: PropTypes.number,

  /**
   * The width of the input width.
   */
  inputWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
});
export default TextareaField;