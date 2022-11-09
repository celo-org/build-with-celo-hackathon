import _extends from "@babel/runtime/helpers/esm/extends";
import React from 'react';
import { Intent } from '../../constants';
import { TickCircleIcon, ErrorIcon, WarningSignIcon, InfoSignIcon } from '../../icons';
/**
 * Get the properties for an icon based on the intent.
 * @param {Intent} intent
 */

export var getIconForIntent = function getIconForIntent(intent) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (intent) {
    case Intent.SUCCESS:
      return /*#__PURE__*/React.createElement(TickCircleIcon, _extends({
        color: "success"
      }, props));

    case Intent.DANGER:
      return /*#__PURE__*/React.createElement(ErrorIcon, _extends({
        color: "danger"
      }, props));

    case Intent.WARNING:
      return /*#__PURE__*/React.createElement(WarningSignIcon, _extends({
        color: "warning"
      }, props));

    case Intent.NONE:
    default:
      return /*#__PURE__*/React.createElement(InfoSignIcon, _extends({
        color: "info"
      }, props));
  }
};