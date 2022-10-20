import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { Video } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import { shareAsync } from 'expo-sharing';
import VideoStartIcon from '@assets/icons/video_start.svg';
import VideoStopIcon from '@assets/icons/stop_video_nft.svg';
import GreyRingIcon from '@assets/icons/video_photo_nft_grey_ring.svg';
import GalleryIcon from '@assets/icons/galery.svg';
import { useNavigation } from '@react-navigation/native';
import styles from '../image_video_shared/photo_video_styles';
import CameraOptions from '../image_video_shared/camera_options';

const VideoNFT = () => {
  const [nft, setNft] = useState(null);
  const cameraRef = useRef();
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState();
  const navigation = useNavigation();

  const requestPermissions = async () => {
    await Camera.requestCameraPermissionsAsync();
    await Camera.requestMicrophonePermissionsAsync();
  };
  useEffect(() => {
    requestPermissions();
  });

  const recordVideo = () => {
    setIsRecording(true);
    const options = {
      quality: '1080p',
      maxDuration: 300,
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
        <Button title="Save" onPress={saveVideo} />
        <Button title="Discard" onPress={() => setVideo(undefined)} />
      </SafeAreaView>
    );
  }

  const goToGallery = () => {
    navigation.navigate('CreateNFT', {
      screen: 'VideoGallery',
    });
  };

  return (
    <Camera
      style={styles.container}
      ref={cameraRef}
      type={type}
      flashMode={flash}
    >
      <View>
        <CameraOptions flash={flash} setFlash={setFlash} setType={setType} />
        <View style={styles.recordButtonsContainer}>
          <TouchableOpacity onPress={isRecording ? stopRecording : recordVideo}>
            {isRecording ? (
              <VideoStopIcon style={styles.stopButton} />
            ) : (
              <VideoStartIcon style={styles.buttonContainer} />
            )}
            <GreyRingIcon style={styles.greyRing} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.gallery}
            onPress={() => goToGallery()}
          >
            <GalleryIcon />
            <Text style={styles.galleryText}>Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Camera>
  );
};

export default VideoNFT;
