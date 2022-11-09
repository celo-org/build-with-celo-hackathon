import React, { useContext, memo } from 'react';
import PropTypes from 'prop-types';
import { StackingOrder } from '../../constants';
import StackingContext from './StackingContext';
var Stack = /*#__PURE__*/memo(function Stack(_ref) {
  var children = _ref.children,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? StackingOrder.STACKING_CONTEXT : _ref$value;
  var previousValue = useContext(StackingContext);
  var currentValue = Math.max(value, previousValue);
  var nextValue = currentValue + 1;
  return /*#__PURE__*/React.createElement(StackingContext.Provider, {
    value: nextValue
  }, children(currentValue));
});
Stack.propTypes = {
  /**
   * Function that takes the current z-index and returns a React Node.
   * (zIndex) => ReactNode.
   */
  children: PropTypes.func.isRequired,

  /**
   * Set the value of the stack. This will increment for children.
   */
  value: PropTypes.number
};
export default Stack;