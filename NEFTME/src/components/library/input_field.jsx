import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image } from 'react-native';
import CustomTextInput from './custom_text_input';

const styles = StyleSheet.create({
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  image: {
    height: 50,
    width: 80,
  },
});

const InputField = ({
  labelName,
  value,
  containerStyle,
  inputPlaceholder,
  inputStyle,
  resource,
  onFieldChange,
  keyboardType,
  ...rest
}) => (
  <View style={containerStyle}>
    <Text style={styles.label}>{labelName}</Text>
    <CustomTextInput
      value={value}
      resource={resource}
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
  resource: PropTypes.string,
  keyboardType: PropTypes.string,
  inputPlaceholder: PropTypes.string.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  inputStyle: PropTypes.instanceOf(Object),
  containerStyle: PropTypes.instanceOf(Object),
};

export default InputField;
