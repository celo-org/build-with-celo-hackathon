import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput, Image, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#41414A',
    borderRadius: 8,
    padding: 16,
    textAlignVertical: 'top',
    marginTop: 8,
    paddingRight: 45,
    flexDirection: 'row',
  },
  textInput: {
    fontWeight: '400',
    fontSize: 16,
    color: '#F8F8F8',
    marginLeft: 10,
    marginTop: 5,
    maxWidth: 200,
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 8,
  },
});

const CustomTextInput = ({
  inputStyle,
  value,
  resource,
  inputPlaceholder,
  onChangeText,
  keyboardType,
  ...rest
}) => (
  <View style={styles.container}>
    {resource && <Image source={{ uri: resource }} style={styles.image} />}
    <TextInput
      style={[styles.textInput, inputStyle]}
      value={value}
      placeholder={inputPlaceholder}
      onChangeText={onChangeText}
      placeholderTextColor="rgba(248, 248, 248, 0.5)"
      keyboardType={keyboardType}
      {...rest}
    />
  </View>
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
