import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: '#F6C138',
  },
  secondary: {
    backgroundColor: '#41414A',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 16,
  },
  primaryTxt: {
    color: '#2C2C39',
  },
  secondaryTxt: {
    color: '#fff',
  },
});

const Button = ({
  primary, buttonStyle, onPress, text, textStyle, Icon, iconStyle,
}) => (
  <TouchableOpacity
    style={[styles.button, primary ? styles.primary : styles.secondary, buttonStyle]}
    onPress={onPress}
  >
    {Icon && <Icon style={iconStyle} />}
    <Text style={[styles.buttonText, primary ? styles.primaryTxt : styles.secondaryTxt, textStyle]}>
      {text}
    </Text>
  </TouchableOpacity>
);

Button.defaultProps = {
  primary: true,
  buttonStyle: {},
  onPress: () => { },
  textStyle: {},
  Icon: null,
  iconStyle: {},
};

Button.propTypes = {
  primary: PropTypes.bool,
  buttonStyle: PropTypes.instanceOf(Object),
  onPress: PropTypes.func,
  text: PropTypes.string.isRequired,
  textStyle: PropTypes.instanceOf(Object),
  Icon: PropTypes.elementType,
  iconStyle: PropTypes.instanceOf(Object),
};

export default Button;
