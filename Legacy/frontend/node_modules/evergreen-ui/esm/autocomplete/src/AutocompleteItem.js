import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["children", "isHighlighted", "isSelected", "style"];
import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Image } from '../../image';
import Option from '../../select-menu/src/Option';
var AutocompleteItem = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(function AutocompleteItem(props, ref) {
  var children = props.children,
      isHighlighted = props.isHighlighted,
      isSelected = props.isSelected,
      style = props.style,
      restProps = _objectWithoutProperties(props, _excluded);

  return /*#__PURE__*/React.createElement(Option, _extends({
    ref: ref,
    isHighlighted: isHighlighted,
    isSelected: isSelected,
    style: style
  }, restProps), restProps.icon && /*#__PURE__*/React.createElement(Image, {
    src: restProps.icon,
    width: 24,
    marginRight: 8
  }), children);
}));
AutocompleteItem.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  isSelected: PropTypes.bool,
  isHighlighted: PropTypes.bool
};
export default AutocompleteItem;