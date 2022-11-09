import _extends from "@babel/runtime/helpers/esm/extends";
import React, { memo, forwardRef } from 'react';
import Icon from '../src/Icon';
var svgPaths16 = ['M15 1H1c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h14c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm1 4H0V3h16v2zm-3-2h-2V1h2v2z'];
var svgPaths20 = ['M20 5v13a1 1 0 01-1 1H1a1 1 0 01-1-1V5h20zm-3-4h2a1 1 0 011 1v1h-3V1zm-2 2H0V2a1 1 0 011-1h14v2z'];
export var ModalFilledIcon = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(function ModalFilledIcon(props, ref) {
  return /*#__PURE__*/React.createElement(Icon, _extends({
    svgPaths16: svgPaths16,
    svgPaths20: svgPaths20,
    ref: ref,
    name: "modal-filled"
  }, props));
}));