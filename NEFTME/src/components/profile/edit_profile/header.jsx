import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  centerHorVert: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    fontSize: 16,
    fontWeight: '500',
    margin: 16,
    color: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    color: '#fff',
    flex: 1,
    marginVertical: 16,
    textAlign: 'center',
  },
  saveButton: {
    color: '#F6C138',
  },
});

const Header = ({ onSavePress }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.centerHorVert} onPress={navigation.goBack}>
        <Text style={styles.button}>Cancel</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Edit profile</Text>
      <TouchableOpacity style={styles.centerHorVert} onPress={onSavePress}>
        <Text style={[styles.button, styles.saveButton]}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

Header.propTypes = {
  onSavePress: PropTypes.func.isRequired,
};

export default Header;
