/* eslint-disable max-len */
import React from 'react';
import {
  StyleSheet, View, Modal, TouchableOpacity, Pressable, Text, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import VectorIcon from '@assets/icons/Vector.svg';
import WalletIcon from '@assets/icons/WalletStroke.svg';
import ExitIcon from '@assets/icons/exit.svg';
import Icon from '@assets/icons/Icon.svg';
import { useNavigation } from '@react-navigation/native';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { doLogout } from '../../../services/login';
import { removeData } from '../../../services/storage';

const styles = StyleSheet.create({
  backIcon: {
    position: 'absolute',
    left: 16,
    top: 60,
  },
  settingsBar: {
    position: 'absolute',
    left: 326,
    top: 60,
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  modalView: {
    position: 'absolute',
    width: 198,
    height: 180,
    left: 55,
    top: -5,
    marginTop: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginLeft: 100,
    backgroundColor: '#2C2C39',
    justifyContent: 'center',
  },
  touchableOpacityStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
  individualSettingView: {
    flexDirection: 'row',
    padding: 10,
  },
  settingsFont: {
    paddingLeft: 15,
    fontWeight: '500',
    color: '#FFFFFF',
    fontSize: 16,
  },
});

const SettingsModal = ({
  isCurrentUser, isSettingsModalVisible, setSettingsModalVisible,
}) => {
  const navigation = useNavigation();
  const connector = useWalletConnect();

  const disconnectAccountAndNavigate = async () => {
    try {
      await doLogout();
      await removeData('auth_token');
      await removeData('newUser');
      setSettingsModalVisible(false);
      navigation.navigate({
        name: 'Start',
        params: { screen: 'ChooseLogin' },
      });
    } catch (err) {
      // console.log('something went wrong while logging out');
    }
  };

  const disconnectWalletAndNavigate = () => {
    try {
      connector.killSession();
      setSettingsModalVisible(false);
      navigation.navigate({
        name: 'Start',
        params: { screen: 'Wallet' },
      });
    } catch (err) {
      // console.log('something went wrong while disconnecting wallet');
    }
  };

  return (isCurrentUser && (
    <Modal
      animationType="fade"
      transparent
      visible={isSettingsModalVisible}
      onRequestClose={() => setSettingsModalVisible((prevValue) => !prevValue)}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={styles.touchableOpacityStyle}
        onPressOut={() => { setSettingsModalVisible(false); }}
      >
        <View style={styles.modalView}>

          <View style={styles.individualSettingView}>
            <WalletIcon width={16} height={16} />
            <Pressable
              onPress={() => disconnectWalletAndNavigate()}
            >
              <Text style={styles.settingsFont}>Disconnect Wallet</Text>
            </Pressable>
          </View>

          <View style={styles.individualSettingView}>
            <Icon width={16} height={16} />
            <Pressable
              onPress={() => Alert.alert('Available soon!')}
            >
              <Text style={styles.settingsFont}>Settings</Text>
            </Pressable>
          </View>

          <View style={styles.individualSettingView}>
            <VectorIcon width={16} height={16} />
            <Pressable
              onPress={() => Alert.alert('Available soon!')}
            >
              <Text style={styles.settingsFont}>Switch Account</Text>
            </Pressable>
          </View>

          <View style={styles.individualSettingView}>
            <ExitIcon width={16} height={16} />
            <Pressable
              onPress={() => disconnectAccountAndNavigate()}
            >
              <Text style={styles.settingsFont}>Logout</Text>
            </Pressable>
          </View>

        </View>
      </TouchableOpacity>
    </Modal>
  )
  );
};

SettingsModal.propTypes = {
  isCurrentUser: PropTypes.bool.isRequired,
  isSettingsModalVisible: PropTypes.bool.isRequired,
  setSettingsModalVisible: PropTypes.func.isRequired,
};

export default SettingsModal;
