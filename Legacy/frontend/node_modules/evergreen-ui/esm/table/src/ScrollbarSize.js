import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { memo, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

var noop = function noop() {};

var style = {
  position: 'fixed',
  top: -500,
  left: -500,
  width: 100,
  overflowY: 'scroll'
};
var ScrollbarSize = /*#__PURE__*/memo(function ScrollbarSize(_ref) {
  var _ref$handleScrollbarS = _ref.handleScrollbarSize,
      handleScrollbarSize = _ref$handleScrollbarS === void 0 ? noop : _ref$handleScrollbarS;
  var innerRef = useRef();
  var outerRef = useRef();

  var _useState = useState({
    innerWidth: null,
    outerWidth: null
  }),
      _useState2 = _slicedToArray(_useState, 2),
      widths = _useState2[0],
      setWidths = _useState2[1];

  useEffect(function () {
    var newWidths = {
      innerWidth: null,
      outerWidth: null
    };

    if (innerRef.current) {
      newWidths.innerWidth = innerRef.current.getBoundingClientRect().width;
    }

    if (outerRef.current) {
      newWidths.outerWidth = outerRef.current.getBoundingClientRect().width;
    }

    setWidths(newWidths);
  }, []);
  useEffect(function () {
    if (widths.innerWidth && widths.outerWidth) {
      handleScrollbarSize(widths.outerWidth - widths.innerWidth);
    }
  }, [widths, handleScrollbarSize]);
  return /*#__PURE__*/React.createElement("div", {
    ref: outerRef,
    "aria-hidden": true,
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    ref: innerRef
  }));
});
ScrollbarSize.propTypes = {
  /**
   * Returns the size of the scrollbar by creating a hidden fixed div.
   */
  handleScrollbarSize: PropTypes.func
};
export default ScrollbarSize;