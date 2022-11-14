import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Pane } from '../../layers';
import { Heading } from '../../typography';
import MenuOption from './MenuOption';
var MenuOptionsGroup = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(function MenuOptionsGroup(props, ref) {
  var onChange = props.onChange,
      options = props.options,
      selected = props.selected,
      title = props.title;
  return /*#__PURE__*/React.createElement(Pane, {
    ref: ref,
    paddingY: 8
  }, title && /*#__PURE__*/React.createElement(Heading, {
    size: 100,
    marginLeft: 44,
    marginRight: 16,
    marginY: 8
  }, title), /*#__PURE__*/React.createElement(Pane, null, options.map(function (option) {
    return /*#__PURE__*/React.createElement(MenuOption, {
      key: option.value,
      isSelected: option.value === selected,
      onSelect: function onSelect() {
        return onChange(option.value);
      }
    }, option.label);
  })));
}));
MenuOptionsGroup.propTypes = {
  /**
   * Title of the menu group.
   */
  title: PropTypes.node,

  /**
   * The current value of the option group.
   */
  selected: PropTypes.any,

  /**
   * Function called when selection changes.
   */
  onChange: PropTypes.func,

  /**
   * List of options rendered in the group.
   */
  options: PropTypes.array
};
export default MenuOptionsGroup;