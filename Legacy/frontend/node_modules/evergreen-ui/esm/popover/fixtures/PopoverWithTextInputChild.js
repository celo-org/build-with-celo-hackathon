import _extends from "@babel/runtime/helpers/esm/extends";
import React from 'react';
import { Popover } from '../';
import { Button } from '../../buttons';
import { Pane } from '../../layers';
import { TextInput } from '../../text-input';

function PopoverWithTextInputChild(props) {
  return /*#__PURE__*/React.createElement(Popover, _extends({
    content: /*#__PURE__*/React.createElement(Pane, {
      "data-testid": "popover-container",
      width: 320,
      height: 320,
      paddingX: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column"
    }, /*#__PURE__*/React.createElement(TextInput, {
      "data-testid": "popover-input",
      width: "100%"
    }))
  }, props), /*#__PURE__*/React.createElement(Button, {
    "data-testid": "popover-trigger"
  }, "Trigger Popover"));
}

PopoverWithTextInputChild.displayName = "PopoverWithTextInputChild";
export default PopoverWithTextInputChild;