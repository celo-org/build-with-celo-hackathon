import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FlashMode, CameraType } from 'expo-camera';
import FlipCamerIcon from '@assets/icons/flip_camera.svg';
import FlashIcon from '@assets/icons/flash.svg';
import TimerIcon from '@assets/icons/timer.svg';
import FilterIcon from '@assets/icons/filters.svg';
import ExitXIcon from '@assets/icons/exit_x.svg';
import NoFlashIcon from '@assets/icons/noflash.svg';
import AutoFlashIcon from '@assets/icons/autoflash.svg';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import styles from './photo_video_styles';

const CameraOptions = (props) => {
  const flashOptions = [FlashMode.off, FlashMode.on, FlashMode.auto];
  const navigation = useNavigation();
  const { flash, setFlash, setType } = props;

  const toggleFlash = () => {
    if (flash === flashOptions[2]) {
      setFlash(flashOptions[0]);
    } else {
      setFlash((current) => flashOptions[flashOptions.indexOf(current) + 1]);
    }
  };

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const returnFlashSvg = () => {
    switch (flash) {
      case FlashMode.off:
        return <NoFlashIcon style={styles.flashCamera} />;
      case FlashMode.on:
        return <FlashIcon style={styles.flashCamera} />;
      case FlashMode.auto:
        return <AutoFlashIcon style={styles.flashCamera} />;
      default:
        return <NoFlashIcon style={styles.flashCamera} />;
    }
  };

  const goToFeed = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.topContainer}>
      <TouchableOpacity style={styles.exitIcon} onPress={() => goToFeed()}>
        <ExitXIcon />
      </TouchableOpacity>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          onPress={() => toggleCameraType()}
          style={styles.individualContainerOptions}
        >
          <FlipCamerIcon style={styles.flipCamera} />
          <Text style={styles.flipText}> Flip </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => toggleCameraType()}
          style={styles.individualContainerOptions}
        >
          <FilterIcon style={styles.flipCamera} />
          <Text style={styles.flipText}> Filter </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => toggleFlash()}
          style={styles.individualContainerOptions}
        >
          <TimerIcon style={styles.flashCamera} />
          <Text style={styles.flipText}> Timer </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => toggleFlash()}
          style={styles.individualContainerOptions}
        >
          {returnFlashSvg()}
          <Text style={styles.flipText}> Flash </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

CameraOptions.propTypes = {
  setFlash: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
};

export default CameraOptions;
