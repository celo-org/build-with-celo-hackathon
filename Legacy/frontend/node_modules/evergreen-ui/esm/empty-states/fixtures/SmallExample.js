import _extends from "@babel/runtime/helpers/esm/extends";
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../buttons';
import { LockIcon } from '../../icons';
import { Pane } from '../../layers';
import { Popover } from '../../popover';
import { majorScale } from '../../scales';
import { useTheme } from '../../theme';
import EmptyState from '../src/EmptyState';

var SmallExample = function SmallExample(props) {
  var _useTheme = useTheme(),
      colors = _useTheme.colors;

  return /*#__PURE__*/React.createElement(Pane, {
    marginBottom: majorScale(20)
  }, /*#__PURE__*/React.createElement(Popover, _extends({}, props.popoverProps, {
    content: /*#__PURE__*/React.createElement(Pane, {
      width: 450,
      height: "auto"
    }, /*#__PURE__*/React.createElement(EmptyState, {
      background: "light",
      title: "You need permission to access these sources",
      orientation: "vertical",
      icon: /*#__PURE__*/React.createElement(LockIcon, {
        color: colors.blue300
      }),
      iconBgColor: colors.blue100,
      description: "If you believe you should have accesss to this page, please check with your Workspace Owner or request access below.",
      primaryCta: /*#__PURE__*/React.createElement(EmptyState.PrimaryButton, {
        appearance: "primary"
      }, "Request Access")
    }))
  }), /*#__PURE__*/React.createElement(Button, null, "Trigger Popover")));
};

SmallExample.displayName = "SmallExample";
SmallExample.propTypes = {
  popoverProps: PropTypes.any
};
export default SmallExample;