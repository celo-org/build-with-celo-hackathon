import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Button } from '@library';
import ShareIcon from '@assets/icons/share_white.svg';

const styles = StyleSheet.create({
  buttonStyle: {
    flex: 1,
    marginLeft: 16,
  },
  buttonText: {
    marginLeft: 13,
    fontWeight: '500',
    fontSize: 16,
  },
  buttonIcon: {
    width: 14.53,
    height: 15.55,
  },
});

const ShareButton = () => (
  <Button
    primary={false}
    buttonStyle={styles.buttonStyle}
    onPress={() => Alert.alert('Available soon')}
    text="Share"
    textStyle={styles.buttonText}
    Icon={ShareIcon}
    iconStyle={styles.buttonIcon}
  />
);

export default ShareButton;
