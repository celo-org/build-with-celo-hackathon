import PropTypes from 'prop-types';
var OptionShapePropType = PropTypes.shape({
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  disabled: PropTypes.bool,
  // Optional
  icon: PropTypes.string // Optional

});
export default OptionShapePropType;