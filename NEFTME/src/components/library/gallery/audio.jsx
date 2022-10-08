import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import CameraIcon from '@assets/icons/camera_yellow.svg';

const styles = StyleSheet.create({
  chip: {
    width: 103,
    height: 103,
    backgroundColor: '#41414A',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  text: {
    marginTop: 8,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

const Audio = ({ startRecording, stopRecording, record }) => (
  <TouchableOpacity style={styles.chip}>
    {record
    && (
      <View>
        <CameraIcon width={34.7} height={27.8} onPress={startRecording} />
        <Text style={styles.text}>Start Recording</Text>
      </View>
    )}

    {!record
    && (
    <View>
      <CameraIcon width={34.7} height={27.8} onPress={stopRecording} />
      <Text style={styles.text}>Stop Recording</Text>
    </View>
    )}
  </TouchableOpacity>
);

Audio.propTypes = {
  startRecording: PropTypes.func.isRequired,
  stopRecording: PropTypes.func.isRequired,
  record: PropTypes.bool.isRequired,
};

export default Audio;
