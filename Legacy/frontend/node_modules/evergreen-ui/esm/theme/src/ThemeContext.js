import React from 'react';
import defaultTheme from '../../themes/default';
/**
 * Use React 16.3+ createContext API.
 */
// NOTE(allen) - switch this back once we properly refactor Toasts to render
// them in the existing DOM tree flow, instead of mounting a new root
// outside of whatever app root an EG consumer is using.

var ThemeContext = /*#__PURE__*/React.createContext(defaultTheme);
var ThemeConsumer = ThemeContext.Consumer,
    ThemeProvider = ThemeContext.Provider;
/**
 * Returns a typed version of the ThemeContext when using a custom theme
 */

var getThemeContext = function getThemeContext() {
  return ThemeContext;
};

export default ThemeContext;
export { getThemeContext, ThemeProvider, ThemeConsumer };