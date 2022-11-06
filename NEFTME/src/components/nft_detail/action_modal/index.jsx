import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  KeyboardAvoidingView,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as Device from 'expo-device';
import { Button, Loading } from '@library';

import GestureRecognizer from 'react-native-swipe-gestures';
import styles from './styles';

const PERCENTAGES = [25, 50, 75, 100];

const ActionModal = ({
  actionModalVisible,
  children,
  inputSubTitle,
  isLoading,
  modalTitle,
  neftBalance,
  setActionModalVisible,
  showPercentages,
  tokensAmount,
  setTokensAmount,
}) => {
  const [selectedPercentage, setSelectedPercentage] = useState(null);

  const onPercentagePress = (value) => {
    setTokensAmount((neftBalance * (value / 100)).toFixed(2));
    setSelectedPercentage(value);
  };

  return (
    <GestureRecognizer
      onSwipeDown={() => setActionModalVisible((prevValue) => !prevValue)}
    >
      <Modal
        animationType="slide"
        transparent
        visible={actionModalVisible}
        onRequestClose={() => setActionModalVisible((prevValue) => !prevValue)}
      >
        {isLoading ? <Loading /> : null}
        <TouchableOpacity
          style={styles.actionModal}
          activeOpacity={1}
          onPressOut={() => setActionModalVisible((prevValue) => !prevValue)}
        >
          <KeyboardAvoidingView
            behavior={Device.osName === 'iOS' ? 'padding' : 'height'}
            style={styles.container}
          >
            <View style={styles.topBar} />
            <View style={styles.actionModalView}>
              <TouchableWithoutFeedback>
                <View>
                  <Text style={styles.actionTitle}>{modalTitle}</Text>
                  <View style={styles.actionContainer}>
                    <TextInput
                      underlineColorAndroid="transparent"
                      keyboardType="numeric"
                      style={styles.neftAmountText}
                      value={tokensAmount}
                      onChange={(event) =>
                        setTokensAmount(event.nativeEvent.text)
                      }
                    />
                    <Text style={styles.availableNeftText}>
                      {inputSubTitle}
                    </Text>
                  </View>
                  {showPercentages ? (
                    <View style={styles.percentageButtonsContainer}>
                      {PERCENTAGES.map((p, index) => (
                        <Button
                          key={`percentage_${p}`}
                          primary={selectedPercentage === p}
                          buttonStyle={[
                            styles.actionPercentageButton,
                            index > 0
                              ? styles.actionPercentageButtonMargin
                              : {},
                          ]}
                          onPress={() => onPercentagePress(p)}
                          text={`${p}%`}
                        />
                      ))}
                    </View>
                  ) : null}
                  {children}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </KeyboardAvoidingView>
        </TouchableOpacity>
      </Modal>
    </GestureRecognizer>
  );
};

ActionModal.propTypes = {
  actionModalVisible: PropTypes.bool.isRequired,
  children: PropTypes.instanceOf(Object).isRequired,
  inputSubTitle: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  modalTitle: PropTypes.string.isRequired,
  neftBalance: PropTypes.number.isRequired,
  setActionModalVisible: PropTypes.func.isRequired,
  showPercentages: PropTypes.bool.isRequired,
  tokensAmount: PropTypes.string.isRequired,
  setTokensAmount: PropTypes.func.isRequired,
};

export default ActionModal;
