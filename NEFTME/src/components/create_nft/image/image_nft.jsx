import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import { AutoFocus, Camera, CameraType, FlashMode } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import PhotoTakeIcon from '@assets/icons/photo_nft_start.svg';
import GreyRingIcon from '@assets/icons/video_photo_nft_grey_ring.svg';
import GalleryIcon from '@assets/icons/galery.svg';
import { useNavigation } from '@react-navigation/native';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import styles from '../image_video_shared/photo_video_styles';
import CameraOptions from '../image_video_shared/camera_options';

const ImageNFT = () => {
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

  const takePicture = async () => {
    const options = {
      quality: '1080p',
      isImageMirror: false,
    };

    cameraRef.current.takePictureAsync(options).then(async (newImage) => {
      // TODO - This is very heavy in processing but at time of writing expo
      // has a bug that auto mirrors front facing images
      if (type === CameraType.front) {
        const editedImage = await manipulateAsync(
          newImage.uri,
          [{ rotate: 180 }, { flip: FlipType.Vertical }],
          { compress: 1, format: SaveFormat.PNG }
        );
        setImage(editedImage);
      } else {
        setImage(newImage);
      }
    });
  };

  if (image) {
    navigation.navigate('CreateNFT', {
      screen: 'EditImage',
      params: {
        resource: image.uri,
      },
    });
    /* if this set is not present, if you take a picture,
       discard it and come back to the camera screen, when making any action (changing camera, flash)
       it will return to the editing screen
    */
    setImage(undefined);
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
      autoFocus={AutoFocus.on}
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
