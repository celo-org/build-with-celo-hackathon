import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
var _excluded = ["children", "size", "selectMenuProps", "disabled", "placeholder", "isSelectable", "textProps"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { memo, useState, useEffect, useCallback, useMemo } from 'react';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import { CaretDownIcon } from '../../icons';
import { SelectMenu } from '../../select-menu';
import TableCell from './TableCell';
import TextTableCell from './TextTableCell';
var MIN_SELECT_MENU_WIDTH = 240;
var emptyProps = {};
var SelectMenuCell = /*#__PURE__*/memo(function SelectMenuCell(props) {
  var _useState = useState(MIN_SELECT_MENU_WIDTH),
      _useState2 = _slicedToArray(_useState, 2),
      targetWidth = _useState2[0],
      setTargetWidth = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      shouldClickToggle = _useState4[0],
      setShouldClickToggle = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isFocused = _useState6[0],
      setIsFocused = _useState6[1];

  var _useState7 = useState(),
      _useState8 = _slicedToArray(_useState7, 2),
      mainRef = _useState8[0],
      setMainRef = _useState8[1];

  var children = props.children,
      _props$size = props.size,
      size = _props$size === void 0 ? 300 : _props$size,
      selectMenuProps = props.selectMenuProps,
      disabled = props.disabled,
      placeholder = props.placeholder,
      _props$isSelectable = props.isSelectable,
      isSelectable = _props$isSelectable === void 0 ? true : _props$isSelectable,
      _props$textProps = props.textProps,
      textProps = _props$textProps === void 0 ? emptyProps : _props$textProps,
      rest = _objectWithoutProperties(props, _excluded);

  var updateOnResize = function updateOnResize() {
    if (!mainRef) return;
    var mainRefWidth = mainRef.offsetWidth;
    setTargetWidth(Math.max(MIN_SELECT_MENU_WIDTH, mainRefWidth));
  };

  var onResize = debounce(updateOnResize, 200);
  useEffect(function () {
    updateOnResize();
    window.addEventListener('resize', onResize, false);
    return function () {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  var onMainRef = function onMainRef(getRef, ref) {
    setMainRef(ref);
    getRef(ref);
  }; // TODO consider `useClickable`


  var handleKeyDown = function handleKeyDown(toggle, isShown, e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();

      if (!isShown && isSelectable && !disabled) {
        toggle();
      }
    }
  };

  var handleDoubleClick = function handleDoubleClick(toggle, isShown) {
    if (!isShown && isSelectable && !disabled) {
      toggle();
    }
  };

  var handleClick = function handleClick(toggle, isShown) {
    if (!shouldClickToggle && !isShown) {
      setShouldClickToggle(true);
      return;
    }

    if (isSelectable && !disabled) {
      toggle();
      setShouldClickToggle(true);
    }
  };

  var handleFocus = useCallback(function () {
    setIsFocused(true);
  }, []);
  var handleBlur = useCallback(function () {
    setShouldClickToggle(false);
    setIsFocused(false);
  }, []);
  var cursor = 'default';

  if (disabled) {
    cursor = 'not-allowed';
  } else if (isSelectable) {
    if (isFocused) {
      cursor = 'pointer';
    } else {
      cursor = 'default';
    }
  } else {
    cursor = 'text';
  }

  var lessOpacity = useMemo(function () {
    return disabled || !children && placeholder;
  }, [disabled, children, placeholder]);
  var mergedTextProps = useMemo(function () {
    return _objectSpread({
      size: size,
      opacity: lessOpacity ? 0.5 : 1
    }, textProps);
  }, [lessOpacity, size, textProps]);
  return /*#__PURE__*/React.createElement(SelectMenu, _extends({
    width: targetWidth
  }, selectMenuProps), function (_ref) {
    var getRef = _ref.getRef,
        isShown = _ref.isShown,
        toggle = _ref.toggle;
    return /*#__PURE__*/React.createElement(TextTableCell, _extends({
      ref: onMainRef.bind(null, getRef),
      onClick: handleClick.bind(null, toggle, isShown),
      onFocus: handleFocus,
      onBlur: handleBlur,
      isSelectable: isSelectable && !disabled,
      rightView: isSelectable ? /*#__PURE__*/React.createElement(CaretDownIcon, {
        color: "muted"
      }) : null,
      "aria-haspopup": true,
      "aria-expanded": isShown,
      cursor: isShown ? 'pointer' : cursor,
      textProps: mergedTextProps,
      onKeyDown: handleKeyDown.bind(null, toggle, isShown),
      onDoubleClick: handleDoubleClick.bind(null, toggle, isShown)
    }, rest), children || placeholder);
  });
});
SelectMenuCell.propTypes = _objectSpread(_objectSpread({}, TableCell.propTypes), {}, {
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
  selectMenuProps: PropTypes.object
});
export default SelectMenuCell;