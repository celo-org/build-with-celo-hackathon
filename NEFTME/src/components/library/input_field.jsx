/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import CustomTextInput from './custom_text_input';

const styles = StyleSheet.create({
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

const InputField = ({
  labelName, value, containerStyle, inputPlaceholder, inputStyle,
  onFieldChange, keyboardType, ...rest
}) => (
  <View style={containerStyle}>
    <Text style={styles.label}>{labelName}</Text>
    <CustomTextInput
      value={value}
      onChangeText={onFieldChange}
      inputPlaceholder={inputPlaceholder}
      inputStyle={inputStyle}
      keyboardType={keyboardType}
      {...rest}
    />
  </View>
);

InputField.defaultProps = {
  inputStyle: {},
  containerStyle: {},
  value: '',
  keyboardType: 'default',
};

InputField.propTypes = {
  labelName: PropTypes.string.isRequired,
  value: PropTypes.string,
  keyboardType: PropTypes.string,
  inputPlaceholder: PropTypes.string.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  inputStyle: PropTypes.instanceOf(Object),
  containerStyle: PropTypes.instanceOf(Object),
};

export default InputField;
