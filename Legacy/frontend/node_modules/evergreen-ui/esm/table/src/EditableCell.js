import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["children", "size", "disabled", "placeholder", "isSelectable", "textProps", "autoFocus", "onChange"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useLatest } from '../../hooks';
import safeInvoke from '../../lib/safe-invoke';
import { Portal } from '../../portal';
import { Stack } from '../../stack';
import EditableCellField from './EditableCellField';
import TableCell from './TableCell';
import TextTableCell from './TextTableCell';
var emptyProps = {};
var EditableCell = /*#__PURE__*/memo(function EditableCell(props) {
  var children = props.children,
      _props$size = props.size,
      size = _props$size === void 0 ? 300 : _props$size,
      disabled = props.disabled,
      placeholder = props.placeholder,
      _props$isSelectable = props.isSelectable,
      isSelectable = _props$isSelectable === void 0 ? true : _props$isSelectable,
      _props$textProps = props.textProps,
      textProps = _props$textProps === void 0 ? emptyProps : _props$textProps,
      _props$autoFocus = props.autoFocus,
      autoFocus = _props$autoFocus === void 0 ? false : _props$autoFocus,
      onChange = props.onChange,
      rest = _objectWithoutProperties(props, _excluded);

  var cursor = 'text';
  var mainRef = useRef(null);

  var _useState = useState(children),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var _useState3 = useState(autoFocus),
      _useState4 = _slicedToArray(_useState3, 2),
      isEditing = _useState4[0],
      setIsEditing = _useState4[1];

  var onChangeRef = useLatest(onChange);
  useEffect(function () {
    setValue(children);
  }, [children]);
  var handleDoubleClick = useCallback(function () {
    if (disabled || !isSelectable) return;
    setIsEditing(true);
  }, [disabled, isSelectable]);
  var handleKeyDown = useCallback(function (e) {
    if (disabled) return;
    var key = e.key;
    /**
     * When the user presses a character on the keyboard, use that character
     * as the value in the text field.
     */

    if (key === 'Enter' || key === 'Shift') {
      setIsEditing(true);
    } else if (key.match(/^[a-z]{0,10}$/) && !e.metaKey && !e.ctrlKey && !e.altKey) {
      setIsEditing(true);
      setValue(function (prev) {
        return prev + key;
      });
    }
  }, [disabled]);
  var handleFieldChangeComplete = useCallback(function (value) {
    setIsEditing(false);
    setValue(value);
    safeInvoke(onChangeRef.current, value);

    if (mainRef.current && isSelectable) {
      mainRef.current.focus();
    }
  }, // onChangeRef is a ref
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [isSelectable]);
  var handleFieldCancel = useCallback(function () {
    setIsEditing(false);
  }, []);
  var handleClick = useCallback(function () {
    if (mainRef.current) {
      mainRef.current.focus();
    }
  }, []);
  var getTargetRef = useCallback(function () {
    return mainRef.current;
  }, []);

  if (disabled) {
    cursor = 'not-allowed';
  } else if (isSelectable) {
    cursor = 'default';
  }

  var lessOpacity = useMemo(function () {
    return disabled || !value && placeholder;
  }, [disabled, value, placeholder]);
  var mergedTextProps = useMemo(function () {
    return _objectSpread({
      size: size,
      opacity: lessOpacity ? 0.5 : 1
    }, textProps);
  }, [lessOpacity, size, textProps]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TextTableCell, _extends({
    ref: mainRef,
    isSelectable: isSelectable,
    onClick: handleClick,
    onDoubleClick: handleDoubleClick,
    onKeyDown: handleKeyDown,
    cursor: cursor,
    textProps: mergedTextProps
  }, rest), value || placeholder), isEditing && /*#__PURE__*/React.createElement(Portal, null, /*#__PURE__*/React.createElement(Stack, null, function (zIndex) {
    return /*#__PURE__*/React.createElement(EditableCellField, {
      zIndex: zIndex,
      getTargetRef: getTargetRef,
      value: value,
      onEscape: handleFieldCancel,
      onChangeComplete: handleFieldChangeComplete,
      onCancel: handleFieldCancel,
      size: size
    });
  })));
});
EditableCell.propTypes = _objectSpread(_objectSpread({}, TableCell.propTypes), {}, {
  /*
   * Makes the TableCell focusable.
   * Will add tabIndex={-1 || this.props.tabIndex}.
   */
  isSelectable: PropTypes.bool,

  /**
   * When true, the cell can't be edited.
   */
  disabled: PropTypes.bool,

  /**
   * Optional placeholder when children is falsy.
   */
  placeholder: PropTypes.node,

  /**
   * The size used for the TextTableCell and Textarea.
   */
  size: PropTypes.oneOf([300, 400]),

  /**
   * This is the value of the cell.
   */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Function called when value changes. (value: string) => void.
   */
  onChange: PropTypes.func,

  /**
   * When true, the cell will initialize in the editing state.
   */
  autoFocus: PropTypes.bool
});
export default EditableCell;