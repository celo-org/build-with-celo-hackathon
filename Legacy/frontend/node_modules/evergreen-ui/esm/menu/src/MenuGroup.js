import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Pane } from '../../layers';
import { Heading } from '../../typography';
var MenuGroup = /*#__PURE__*/memo(function MenuGroup(props) {
  var children = props.children,
      title = props.title;
  return /*#__PURE__*/React.createElement(Pane, {
    paddingY: 8
  }, title && /*#__PURE__*/React.createElement(Heading, {
    size: 100,
    marginX: 16,
    marginY: 8
  }, title), children);
});
MenuGroup.propTypes = {
  /**
   * Title of the menu group.
   */
  title: PropTypes.node,

  /**
   * The children of the menu group.
   */
  children: PropTypes.node
};
export default MenuGroup;