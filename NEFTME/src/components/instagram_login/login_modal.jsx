import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  View, Modal, TouchableOpacity, Image,
} from 'react-native';
import qs from 'qs';
import { WebView } from 'react-native-webview';
import { doInstagramLogin } from '@services/login';
import Constants from 'expo-constants';
import styles from './styles';

const closeButtonImage = require('@assets/close-button.png');

const LoginModal = ({
  onLoginSuccess, onLoginFailure, modalVisible, setModalVisible, setShowLoading,
}) => {
  const webView = useRef(null);
  const {
    clientID, redirectUrl, oauthScopes, apiUrl,
  } = Constants.manifest.extra.instagram;

  const onNavigationStateChange = async (webViewState) => {
    const { url } = webViewState;

    if (url && url.startsWith(redirectUrl)) {
      webView.current.stopLoading();
      const match = url.match(/(#|\?)(.*)/);
      const results = qs.parse(match[2]);
      setModalVisible(false);
      setShowLoading(true);

      if (results.code) {
        const { code } = results;
        if ((await doInstagramLogin(code.split('#_').join('')))?.success) {
          onLoginSuccess();
        } else {
          onLoginFailure();
        }
      } else {
        onLoginFailure(results);
      }
    }
  };

  const uri = `${apiUrl}/oauth/authorize/?client_id=${clientID}&redirect_uri=${redirectUrl}&response_type=code&scope=${oauthScopes.join(',')}`;

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      transparent
    >
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <WebView
            style={styles.webView}
            source={{ uri }}
            startInLoadingState
            onNavigationStateChange={onNavigationStateChange}
            onError={onNavigationStateChange}
            ref={webView}
          />
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={styles.close}
          accessibilityComponentType="button"
          accessibilityTraits={['button']}
        >
          <Image
            source={closeButtonImage}
            style={styles.imageClose}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

LoginModal.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
  onLoginFailure: PropTypes.func.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  setShowLoading: PropTypes.func.isRequired,
};

export default LoginModal;
