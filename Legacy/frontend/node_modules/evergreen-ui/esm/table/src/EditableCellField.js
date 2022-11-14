import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { memo, useRef, useState, useMemo, useCallback, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { useLatest } from '../../hooks';
import { Textarea } from '../../textarea';

function getTableBodyRef(currentRef) {
  var ref = currentRef;
  if (!ref) return;

  while (ref) {
    var isTableBody = ref.hasAttribute('data-evergreen-table-body');

    if (isTableBody) {
      return ref;
    }

    if (ref.parentElement) {
      ref = ref.parentElement;
    } else {
      return null;
    }
  }

  return ref;
}

var EditableCellField = /*#__PURE__*/memo(function EditableCellField(props) {
  var _props$minHeight = props.minHeight,
      minHeight = _props$minHeight === void 0 ? 40 : _props$minHeight,
      _props$minWidth = props.minWidth,
      minWidth = _props$minWidth === void 0 ? 80 : _props$minWidth,
      size = props.size,
      value = props.value,
      zIndex = props.zIndex;
  var latestAnimationFrame = useRef();
  var textareaRef = useRef();
  var tableBodyRef = useRef();
  var onCancelRef = useLatest(props.onCancel);
  var onChangeCompleteRef = useLatest(props.onChangeComplete);
  var getTargetRef = useLatest(props.getTargetRef);

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      height = _useState2[0],
      setHeight = _useState2[1];

  var _useState3 = useState(0),
      _useState4 = _slicedToArray(_useState3, 2),
      width = _useState4[0],
      setWidth = _useState4[1];

  var _useState5 = useState(0),
      _useState6 = _slicedToArray(_useState5, 2),
      left = _useState6[0],
      setLeft = _useState6[1];

  var _useState7 = useState(0),
      _useState8 = _slicedToArray(_useState7, 2),
      top = _useState8[0],
      setTop = _useState8[1];

  var update = useCallback(function () {
    function updater() {
      var targetRef = getTargetRef.current();
      if (!targetRef) return;
      tableBodyRef.current = getTableBodyRef(targetRef);

      var _targetRef$getBoundin = targetRef.getBoundingClientRect(),
          targetHeight = _targetRef$getBoundin.height,
          targetLeft = _targetRef$getBoundin.left,
          targetTop = _targetRef$getBoundin.top,
          targetWidth = _targetRef$getBoundin.width;

      var calculatedTop;

      if (tableBodyRef.current) {
        var bounds = tableBodyRef.current.getBoundingClientRect();
        calculatedTop = Math.min(Math.max(targetTop, bounds.top), bounds.bottom - targetHeight);
      } else {
        calculatedTop = targetTop;
      }

      setHeight(targetHeight);
      setWidth(targetWidth);
      setLeft(targetLeft);
      setTop(calculatedTop); // recursively run the updater

      latestAnimationFrame.current = requestAnimationFrame(function () {
        return updater();
      });
    } // kick off the updater


    updater(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Mirrors functionality of componentDidMount and componentWillUnmount.
  // Focus on mount

  useLayoutEffect(function () {
    update();
    var requestId = requestAnimationFrame(function () {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    });
    return function () {
      cancelAnimationFrame(requestId);

      if (latestAnimationFrame.current) {
        cancelAnimationFrame(latestAnimationFrame.current);
      } // eslint-disable-next-line react-hooks/exhaustive-deps


      onCancelRef.current();
    }; // we only want `update` to run once, and `onCancelRef` is a ref
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var handleFocus = useCallback(function (e) {
    e.target.selectionStart = e.target.value.length;
  }, []);
  var handleBlur = useCallback(function () {
    if (textareaRef.current) {
      onChangeCompleteRef.current(textareaRef.current.value);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);
  var handleKeyDown = useCallback(function (e) {
    switch (e.key) {
      case 'Escape':
        onCancelRef.current();
        if (textareaRef.current) textareaRef.current.blur();
        break;

      case 'Enter':
        if (textareaRef.current) textareaRef.current.blur();
        e.preventDefault();
        break;

      case 'Tab':
        if (textareaRef.current) textareaRef.current.blur();
        break;

      default:
        break;
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);
  var style = useMemo(function () {
    return {
      left: left,
      top: top,
      height: height,
      minHeight: Math.max(height, minHeight),
      width: width,
      minWidth: Math.max(width, minWidth),
      zIndex: zIndex
    };
  }, [left, top, height, width, minHeight, minWidth, zIndex]);
  return /*#__PURE__*/React.createElement(Textarea, {
    ref: textareaRef,
    onKeyDown: handleKeyDown,
    onBlur: handleBlur,
    onFocus: handleFocus,
    appearance: "editable-cell",
    size: size,
    style: style,
    height: null,
    width: null,
    minHeight: null,
    position: "fixed",
    defaultValue: value
  });
});
EditableCellField.propTypes = {
  /**
   * Used as the defaultValue of the textarea.
   */
  value: PropTypes.string.isRequired,

  /**
   * The z-index placed on the element.
   */
  zIndex: PropTypes.number.isRequired,

  /**
   * Function to get the target ref of the parent.
   * Used to mirror the position.
   */
  getTargetRef: PropTypes.func.isRequired,

  /**
   * Min width of the textarea.
   * The textarea can never be smaller than the cell.
   */
  minWidth: PropTypes.number,

  /**
   * Min height of the textarea.
   * The textarea can never be smaller than the cell.
   */
  minHeight: PropTypes.number,

  /**
   * Called when the textarea is blurred, pass the value back to the cell.
   */
  onChangeComplete: PropTypes.func.isRequired,

  /**
   * Called when Escape is hit or componentWillUnmount.
   */
  onCancel: PropTypes.func.isRequired,

  /**
   * Text size of the textarea.
   */
  size: PropTypes.number
};
export default EditableCellField;