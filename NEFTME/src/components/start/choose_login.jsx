import React, { useState } from 'react';
import {
  Alert, Text, TouchableOpacity, View,
} from 'react-native';
import { Button, Loading, StatusBar } from '@library';
import { doLogin } from '@services/login';
import { removeData } from '@services/storage';
import { LinearGradient } from 'expo-linear-gradient';
import NeftmeLogo from '@assets/icons/neftme_grey.svg';
import { CommonActions, useNavigation } from '@react-navigation/native';
import InstagramLogin from '../instagram_login';
import styles from './styles';

const ChooseLogin = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const onSkipPress = async () => {
    setIsLoading(true);
    try {
      const response = await doLogin('guest@neftme.com', 'neftmeTest');
      if (response?.success) {
        await removeData('newUser');
        setIsLoading(false);
        navigation.dispatch(CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        }));
      } else {
        setIsLoading(false);
        Alert.alert('Something went wrong, please try again');
      }
    } catch (err) {
      setIsLoading(false);
      Alert.alert('Something went wrong, please try again');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <LinearGradient
        colors={['#303040', '#141316']}
        start={[0, 0]}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1 }}
      >
        {isLoading && <Loading />}
        <View style={styles.skipContainer}>
          <TouchableOpacity onPress={onSkipPress}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <NeftmeLogo width={82} height={82} />
        </View>
        <View style={styles.mainContainer}>
          <InstagramLogin />
          <Button
            text="Create new account"
            textStyle={styles.newAccountButtonText}
            buttonStyle={[styles.newAccountButton, styles.disabledButton]}
            onPress={() => { }}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

export default ChooseLogin;
