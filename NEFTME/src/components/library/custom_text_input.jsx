/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#41414A',
    borderRadius: 8,
    padding: 16,
    fontWeight: '400',
    fontSize: 16,
    color: '#F8F8F8',
    textAlignVertical: 'top',
    marginTop: 8,
    paddingRight: 45,
  },
});

const CustomTextInput = ({
  inputStyle, value, inputPlaceholder, onChangeText, keyboardType, ...rest
}) => (
  <TextInput
    style={[styles.textInput, inputStyle]}
    value={value}
    placeholder={inputPlaceholder}
    onChangeText={onChangeText}
    placeholderTextColor="rgba(248, 248, 248, 0.5)"
    keyboardType={keyboardType}
    {...rest}
  />
);

CustomTextInput.defaultProps = {
  inputStyle: {},
  value: '',
};

CustomTextInput.propTypes = {
  inputStyle: PropTypes.instanceOf(Object),
  value: PropTypes.string,
  keyboardType: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  inputPlaceholder: PropTypes.string.isRequired,
};

export default CustomTextInput;
