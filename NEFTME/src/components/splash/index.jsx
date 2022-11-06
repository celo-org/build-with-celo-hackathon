import React, { useCallback, useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { isNewUser } from '@services/user';
import Constants from 'expo-constants';
import { removeData } from '@services/storage';
import { useGetCurrentUserQuery } from '@features/current_user';

const splashImage = require('@assets/splash.png');

const styles = StyleSheet.create({
  splashImage: {
    width: '100%',
    height: '100%',
  },
});

const Splash = () => {
  const navigation = useNavigation();
  const connector = useWalletConnect();
  const { data: currentUser, isError, error } = useGetCurrentUserQuery();

  const navigateTo = useCallback(
    (route) => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [route],
        })
      );
    },
    [navigation]
  );

  useEffect(() => {
    (async () => {
      if (isError && [401, 403].includes(error?.originalStatus)) {
        await removeData('auth_token');
        navigateTo({ name: 'Start' });
      }
    })();
  }, [currentUser, isError, error, navigateTo]);

  useEffect(() => {
    (async () => {
      if (connector && currentUser) {
        if (
          connector.connected &&
          connector.chainId === Constants.expoConfig.extra.chainId
        ) {
          if (await isNewUser()) {
            navigateTo({
              name: 'Start',
              params: { screen: 'Categories' },
            });
          } else {
            navigateTo({ name: 'Home' });
          }
        } else {
          navigateTo({
            name: 'Start',
            params: { screen: 'Wallet' },
          });
        }
      }
    })();
  }, [connector, currentUser, navigateTo]);

  return <Image source={splashImage} style={styles.splashImage} />;
};

export default Splash;
