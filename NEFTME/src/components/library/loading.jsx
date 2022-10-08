import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';

const Loading = ({ visible }) => (
  <Modal animationType="fade" transparent isVisible={visible}>
    <ActivityIndicator animating color="white" size="large" style={{ flex: 1 }} />
  </Modal>
);

Loading.defaultProps = {
  visible: true,
};

Loading.propTypes = {
  visible: PropTypes.bool,
};

export default Loading;
