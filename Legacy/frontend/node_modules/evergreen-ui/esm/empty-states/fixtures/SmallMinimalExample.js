import _extends from "@babel/runtime/helpers/esm/extends";
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../buttons';
import { HandUpIcon } from '../../icons';
import { Pane } from '../../layers';
import { Popover } from '../../popover';
import { majorScale } from '../../scales';
import { useTheme } from '../../theme';
import EmptyState from '../src/EmptyState';

var SmallMinimalExample = function SmallMinimalExample(props) {
  var _useTheme = useTheme(),
      colors = _useTheme.colors;

  return /*#__PURE__*/React.createElement(Pane, {
    marginBottom: majorScale(50)
  }, /*#__PURE__*/React.createElement(Popover, _extends({}, props.popoverProps, {
    content: /*#__PURE__*/React.createElement(Pane, {
      width: 300,
      height: "auto"
    }, /*#__PURE__*/React.createElement(EmptyState, {
      background: "light",
      title: "No source selected",
      orientation: "vertical",
      icon: /*#__PURE__*/React.createElement(HandUpIcon, {
        color: colors.gray500
      }),
      iconBgColor: colors.gray300
    }))
  }), /*#__PURE__*/React.createElement(Button, null, "Trigger Popover")));
};

SmallMinimalExample.displayName = "SmallMinimalExample";
SmallMinimalExample.propTypes = {
  popoverProps: PropTypes.any
};
export default SmallMinimalExample;