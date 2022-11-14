import _extends from "@babel/runtime/helpers/esm/extends";
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../buttons';
import { Pane } from '../../layers';
import { majorScale, minorScale } from '../../scales';
import { useTheme } from '../../theme';
import { Link, Heading, Paragraph } from '../../typography';
/* eslint-disable react/prop-types */

var HorizontalOrientation = /*#__PURE__*/memo(function HorizontalOrientation(_ref) {
  var anchorCta = _ref.anchorCta,
      background = _ref.background,
      description = _ref.description,
      icon = _ref.icon,
      iconBgColor = _ref.iconBgColor,
      primaryCta = _ref.primaryCta,
      title = _ref.title;
  var hasFooter = primaryCta || anchorCta;

  var _useTheme = useTheme(),
      colors = _useTheme.colors;

  var backgroundColor = background === 'light' ? 'white' : colors.gray75;
  return /*#__PURE__*/React.createElement(Pane, {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: majorScale(6),
    backgroundColor: backgroundColor,
    justifyContent: "center"
  }, /*#__PURE__*/React.createElement(Pane, {
    display: "flex",
    alignItems: "flex-start",
    flex: 1,
    height: "100%"
  }, /*#__PURE__*/React.createElement(Pane, {
    paddingRight: majorScale(6)
  }, /*#__PURE__*/React.createElement(Pane, {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    backgroundColor: iconBgColor,
    width: majorScale(9),
    height: majorScale(9)
  }, /*#__PURE__*/React.cloneElement(icon, {
    size: majorScale(4)
  }))), /*#__PURE__*/React.createElement(Pane, {
    display: "flex",
    flexDirection: "column",
    paddingRight: majorScale(6)
  }, /*#__PURE__*/React.createElement(Heading, {
    size: 500,
    color: colors.gray700
  }, title), description && /*#__PURE__*/React.createElement(Paragraph, {
    color: "muted",
    marginTop: majorScale(2)
  }, description), hasFooter && /*#__PURE__*/React.createElement(Pane, {
    marginTop: majorScale(5),
    display: "flex"
  }, primaryCta, primaryCta && anchorCta && /*#__PURE__*/React.cloneElement(anchorCta, {
    marginLeft: majorScale(4)
  }), !primaryCta && anchorCta))));
});
/* eslint-enable react/prop-types */

/* eslint-disable react/prop-types */

var VerticalOrientation = /*#__PURE__*/memo(function VerticalOrientation(_ref2) {
  var background = _ref2.background,
      description = _ref2.description,
      icon = _ref2.icon,
      iconBgColor = _ref2.iconBgColor,
      primaryCta = _ref2.primaryCta,
      title = _ref2.title;

  var _useTheme2 = useTheme(),
      colors = _useTheme2.colors;

  var backgroundColor = background === 'light' ? 'white' : colors.gray75;
  return /*#__PURE__*/React.createElement(Pane, {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
    backgroundColor: backgroundColor,
    paddingX: majorScale(5),
    paddingY: majorScale(5),
    height: "100%",
    width: "100%"
  }, /*#__PURE__*/React.createElement(Pane, {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    backgroundColor: iconBgColor,
    width: majorScale(7),
    height: majorScale(7)
  }, /*#__PURE__*/React.cloneElement(icon, {
    size: majorScale(3)
  })), /*#__PURE__*/React.createElement(Heading, {
    marginTop: majorScale(2),
    textAlign: "center",
    color: colors.gray700
  }, title), /*#__PURE__*/React.createElement(Paragraph, {
    marginTop: majorScale(2),
    textAlign: "center",
    color: colors.gray700
  }, description), primaryCta && /*#__PURE__*/React.cloneElement(primaryCta, {
    marginTop: minorScale(5)
  }));
});
/* eslint-enable react/prop-types */

var PrimaryButton = function PrimaryButton(props) {
  return /*#__PURE__*/React.createElement(Button, _extends({
    appearance: "primary"
  }, props));
};

PrimaryButton.displayName = "PrimaryButton";

var LinkButton = function LinkButton(props) {
  return /*#__PURE__*/React.createElement(Link, _extends({}, props, {
    size: 300,
    lineHeight: "34px"
  }));
};

LinkButton.displayName = "LinkButton";
var EmptyState = /*#__PURE__*/memo(function EmptyState(_ref3) {
  var anchorCta = _ref3.anchorCta,
      _ref3$background = _ref3.background,
      background = _ref3$background === void 0 ? 'light' : _ref3$background,
      description = _ref3.description,
      icon = _ref3.icon,
      iconBgColor = _ref3.iconBgColor,
      _ref3$orientation = _ref3.orientation,
      orientation = _ref3$orientation === void 0 ? 'horizontal' : _ref3$orientation,
      primaryCta = _ref3.primaryCta,
      title = _ref3.title;

  if (orientation === 'vertical') {
    return /*#__PURE__*/React.createElement(VerticalOrientation, {
      title: title,
      icon: icon,
      iconBgColor: iconBgColor,
      background: background,
      description: description,
      primaryCta: primaryCta
    });
  } else {
    return /*#__PURE__*/React.createElement(HorizontalOrientation, {
      title: title,
      icon: icon,
      iconBgColor: iconBgColor,
      background: background,
      description: description,
      primaryCta: primaryCta,
      anchorCta: anchorCta
    });
  }
});
EmptyState.PrimaryButton = PrimaryButton;
EmptyState.LinkButton = LinkButton;
EmptyState.propTypes = {
  /** The title of the empty state */
  title: PropTypes.string.isRequired,

  /** The icon used in the empty state */
  icon: PropTypes.element.isRequired,

  /** The background color used for the icon circle */
  iconBgColor: PropTypes.string.isRequired,

  /** The direction in which to align the empty state elements */
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),

  /** The description of the empty state */
  description: PropTypes.node,

  /** The background used for the entire empty state container */
  background: PropTypes.oneOf(['light', 'dark']),

  /** The primary CTA of the empty state */
  primaryCta: PropTypes.element,

  /** The link CTA of the empty state */
  anchorCta: PropTypes.element
};
export default EmptyState;