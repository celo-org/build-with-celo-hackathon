import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, Text, View,
} from 'react-native';

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#2B2F3A',
    flexDirection: 'row',
    marginBottom: 8,
    borderRadius: 16,
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    color: '#FCFCFC',
    fontWeight: '600',
  },
  textBox: {
    alignItems: 'center',
    padding: 28,
  },
});

const EmptyItem = ({ text }) => (
  <View style={styles.itemContainer}>

    <View style={styles.textBox}>
      <Text style={styles.name}>{text}</Text>
    </View>
  </View>
);

EmptyItem.propTypes = {
  text: PropTypes.string.isRequired,
};

export default EmptyItem;
