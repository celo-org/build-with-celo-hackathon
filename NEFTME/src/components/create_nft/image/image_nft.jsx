import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import PhotoTakeIcon from '@assets/icons/photo_nft_start.svg';
import GreyRingIcon from '@assets/icons/video_photo_nft_grey_ring.svg';
import GalleryIcon from '@assets/icons/galery.svg';
import { useNavigation } from '@react-navigation/native';
import styles from '../image_video_shared/photo_video_styles';
import CameraOptions from '../image_video_shared/camera_options';

const ImageNFT = () => {
  const [nft, setNft] = useState(null);
  const cameraRef = useRef();
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const navigation = useNavigation();
  const [image, setImage] = useState();

  const requestPermissions = async () => {
    await Camera.requestCameraPermissionsAsync();
  };

  useEffect(() => {
    requestPermissions();
  });

  const takePicture = () => {
    const options = {
      quality: '1080p',
    };

    cameraRef.current.takePictureAsync(options).then((newImage) => {
      setImage(newImage);
    });
  };

  if (image) {
    const saveVideo = () => {
      MediaLibrary.saveToLibraryAsync(image.uri).then(() => {
        setImage(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.video} source={{ uri: image.uri }} />
        <Button title="Save" onPress={saveVideo} />
        <Button title="Discard" onPress={() => setImage(undefined)} />
      </SafeAreaView>
    );
  }

  const goToGallery = () => {
    navigation.navigate('CreateNFT', {
      screen: 'ImageGallery',
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
          <TouchableOpacity onPress={() => takePicture()}>
            <PhotoTakeIcon style={styles.buttonContainer} />
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

export default ImageNFT;
