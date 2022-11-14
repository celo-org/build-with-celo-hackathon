import colors from './colors';
var borderShadowColor = 'rgba(67, 90, 111, 0.3)';
var blurryShadowColor = 'rgba(67, 90, 111, 0.47)';
/**
 * Elevation styles are applied as box shadows.
 * Available levels: 0, 1, 2, 3, 4.
 */

var shadows = ["0 0 1px ".concat(borderShadowColor), "0 0 1px ".concat(borderShadowColor, ", 0 2px 4px -2px ").concat(blurryShadowColor), "0 0 1px ".concat(borderShadowColor, ", 0 5px 8px -4px ").concat(blurryShadowColor), "0 0 1px ".concat(borderShadowColor, ", 0 8px 10px -4px ").concat(blurryShadowColor), "0 0 1px ".concat(borderShadowColor, ", 0 16px 24px -8px ").concat(blurryShadowColor)];
shadows.focusRing = "0 0 0 2px ".concat(colors.blue100);
export default shadows;