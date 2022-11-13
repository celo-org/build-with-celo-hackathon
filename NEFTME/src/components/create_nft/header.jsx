import React from 'react';
import PropTypes from 'prop-types';
import {
  Pressable, StyleSheet, Text, View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BACKGROUND_COLOR = '#21212b';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: BACKGROUND_COLOR,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
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
  navDots: {
    flex: 1,
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    borderRadius: 50,
  },
  activeDot: {
    backgroundColor: '#fff',
  },
  marginX8: {
    marginHorizontal: 8,
  },
  pressBtn: {
    color: '#F6C138',
  },
  noPressBtn: {
    color: 'rgba(255, 255, 255, 0.22)',
  },
});

const Header = ({ step, showNext, onPress }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable style={styles.centerHorVert} onPress={navigation.goBack}>
        <Text style={styles.button}>Back</Text>
      </Pressable>
      <View style={styles.navDots}>
        <View style={[styles.dot, step === 1 ? styles.activeDot : {}]} />
        <View style={[styles.dot, styles.marginX8, step === 2 ? styles.activeDot : {}]} />
        <View style={[styles.dot, step === 3 ? styles.activeDot : {}]} />
      </View>
      <Pressable style={styles.centerHorVert}>
        <Text
          style={[
            styles.button,
            onPress ? styles.pressBtn : styles.noPressBtn,
            showNext ? {} : { color: BACKGROUND_COLOR },
          ]}
          onPress={onPress}
        >
          Next
        </Text>
      </Pressable>
    </View>
  );
};

Header.defaultProps = {
  onPress: null,
};

Header.propTypes = {
  step: PropTypes.number.isRequired,
  showNext: PropTypes.bool.isRequired,
  onPress: PropTypes.func,
};

export default Header;
