import React from 'react';
import { LockIcon } from '../../icons';
import { Pane } from '../../layers';
import { useTheme } from '../../theme';
import EmptyState from '../src/EmptyState';

var BasicWithLinkExample = function BasicWithLinkExample() {
  var _useTheme = useTheme(),
      colors = _useTheme.colors;

  return /*#__PURE__*/React.createElement(Pane, {
    maxWidth: 1152
  }, /*#__PURE__*/React.createElement(EmptyState, {
    background: "dark",
    title: "You need permission to access these sources",
    orientation: "horizontal",
    icon: /*#__PURE__*/React.createElement(LockIcon, {
      color: colors.orange500
    }),
    iconBgColor: colors.orange100,
    description: "If you believe you should have accesss to this page, please check with your Workspace Owner or request access below.",
    primaryCta: /*#__PURE__*/React.createElement(EmptyState.PrimaryButton, null, "Request Access"),
    anchorCta: /*#__PURE__*/React.createElement(EmptyState.LinkButton, {
      href: "https://segment.com/docs/",
      target: "_blank"
    }, "Learn more about permission")
  }));
};

BasicWithLinkExample.displayName = "BasicWithLinkExample";
export default BasicWithLinkExample;