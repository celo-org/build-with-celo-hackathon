import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { Video } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import { shareAsync } from 'expo-sharing';
import VideoStartIcon from '@assets/icons/video_start.svg';
import VideoStopIcon from '@assets/icons/stop_video_nft.svg';
import GreyRingIcon from '@assets/icons/video_photo_nft_grey_ring.svg';
import FlipCamerIcon from '@assets/icons/flip_camera.svg';
import FlashIcon from '@assets/icons/flash.svg';
import TimerIcon from '@assets/icons/timer.svg';
import FilterIcon from '@assets/icons/filters.svg';
import ExitXIcon from '@assets/icons/exit_x.svg';
import GalleryIcon from '@assets/icons/galery.svg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    alignItems: 'center',
    marginHorizontal: 110,
    marginTop: 8,
  },
  stopButton: {
    position: 'absolute',
    alignItems: 'center',
    marginHorizontal: 127,
    marginTop: 25,
  },
  greyRing: {
    marginHorizontal: 102,
    marginBottom: 100,
  },
  gallery: {
    marginHorizontal: 10,
    marginBottom: 1,
  },
  flipCamera: {
    marginLeft: 320,
    marginTop: 10,
  },
  optionsContainer: {
    marginTop: 100,
  },
  flashCamera: {
    marginLeft: 325,
    marginTop: 10,
  },
  flipText: {
    marginLeft: 320,
    marginTop: 5,
    color: '#FFFFFF',
  },
  recordButtonsContainer: {
    alignItems: 'center',
    marginTop: 300,
  },
  video: {
    flex: 1,
    alignSelf: 'stretch',
  },
});

const VideoNFT = () => {
  const [nft, setNft] = useState(null);
  const cameraRef = useRef();
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission =
        await Camera.requestMicrophonePermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();

      setHasCameraPermission(cameraPermission.status === 'granted');
      setHasMicrophonePermission(microphonePermission.status === 'granted');
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
    })();
  }, []);

  if (
    hasCameraPermission === undefined ||
    hasMicrophonePermission === undefined
  ) {
    return <Text>Requestion permissions...</Text>;
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted.</Text>;
  }

  const recordVideo = () => {
    setIsRecording(true);
    const options = {
      quality: '1080p',
      maxDuration: 60,
      mute: false,
    };

    cameraRef.current.recordAsync(options).then((recordedVideo) => {
      setVideo(recordedVideo);
      setIsRecording(false);
    });
  };

  const stopRecording = () => {
    setIsRecording(false);
    cameraRef.current.stopRecording();
  };

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  function toggleFlash() {
    setFlash((current) =>
      current === FlashMode.off ? FlashMode.torch : FlashMode.off
    );
  }

  if (video) {
    const shareVideo = () => {
      shareAsync(video.uri).then(() => {
        setVideo(undefined);
      });
    };

    const saveVideo = () => {
      MediaLibrary.saveToLibraryAsync(video.uri).then(() => {
        setVideo(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Video
          style={styles.video}
          source={{ uri: video.uri }}
          useNativeControls
          resizeMode="contain"
          isLooping
        />
        <Button title="Share" onPress={shareVideo} />
        {hasMediaLibraryPermission ? (
          <Button title="Save" onPress={saveVideo} />
        ) : undefined}
        <Button title="Discard" onPress={() => setVideo(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <Camera
      style={styles.container}
      ref={cameraRef}
      type={type}
      flashMode={flash}
    >
      <View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity onPress={() => toggleCameraType()}>
            <FlipCamerIcon style={styles.flipCamera} />
            <Text style={styles.flipText}> Flip </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleCameraType()}>
            <FilterIcon style={styles.flipCamera} />
            <Text style={styles.flipText}> Filter </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleFlash()}>
            <TimerIcon style={styles.flashCamera} />
            <Text style={styles.flipText}> Timer </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleFlash()}>
            <FlashIcon style={styles.flashCamera} />
            <Text style={styles.flipText}> Flash </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.recordButtonsContainer}>
          <TouchableOpacity onPress={isRecording ? stopRecording : recordVideo}>
            {isRecording ? (
              <VideoStopIcon style={styles.stopButton} />
            ) : (
              <VideoStartIcon style={styles.buttonContainer} />
            )}
            <GreyRingIcon style={styles.greyRing} />
          </TouchableOpacity>
        </View>
      </View>
    </Camera>
  );
};

export default VideoNFT;
