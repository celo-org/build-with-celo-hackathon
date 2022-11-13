import React from "react";
import useKeyboardHeight from 'react-native-use-keyboard-height';

export const withHooksHOC = (Component) => {
  return (props) => {
    const keyboardHeight = useKeyboardHeight();
    return <Component keyboardHeight={keyboardHeight} {...props} />;
  };
};