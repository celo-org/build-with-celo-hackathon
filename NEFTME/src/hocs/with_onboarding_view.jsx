import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { StatusBar } from '@library';
import { LinearGradient } from 'expo-linear-gradient';
import NeftmeLogo from '@assets/icons/neftme_grey.svg';
import { useNavigation, useRoute } from '@react-navigation/native';

const styles = StyleSheet.create({
  skipContainer: {
    width: '100%',
    alignItems: 'flex-end',
    padding: 16,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#878787',
  },
  logoContainer: {
    marginTop: 31,
    alignItems: 'center',
  },
});

const withStartHoc = (onSkipPress) => (WrappedComponent) => (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const onSkipPressFn = () => onSkipPress(navigation, route);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <LinearGradient
        colors={['#303040', '#141316']}
        start={[0, 0]}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1 }}
      >
        {onSkipPress ? (
          <View style={styles.skipContainer}>
            <TouchableOpacity onPress={onSkipPressFn}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={styles.logoContainer}>
          <NeftmeLogo width={82} height={82} />
        </View>
        <WrappedComponent {...props} />
      </LinearGradient>
    </View>
  );
};

export default withStartHoc;
