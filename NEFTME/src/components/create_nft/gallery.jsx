import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Audio, Video } from 'expo-av';
import { postAPINFT } from '../../services/nft';
import VideoNFT from './video/video_nft';
import ImageNFT from './image/image_nft';
import AudioNFT from './audio/audio_nft';
import { getNFTByTokenId } from '../../features/neftme_api/nft';
import Header from './header';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21212b',
  },
  paddingTop60: {
    paddingTop: 60,
  },
  chip: {
    width: 103,
    height: 103,
    flexGrow: 1,
  },
  selectedImage: {
    marginTop: 26,
    marginBottom: 8,
    marginHorizontal: 16,
    width: width - 32,
    height: width - 32,
  },
  galleryContainer: {
    marginVertical: 18,
    marginHorizontal: 8,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    flex: 1,
    margin: 16,
  },
  button: {
    margin: 16,
  },
});

const MainGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const [nft, setNft] = useState(null);

  const goNext = (resourceURI) => {
    navigation.navigate('CreateNFT', {
      screen: 'CreateNFTDetails',
      params: { resource: resourceURI, origin: route.params },
    });
  };

  const onCameraPress = async () => {
    const photo = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
    });
    if (!photo.cancelled && photo.uri) {
      setSelectedImage(photo);
    }
  };

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );

        setRecording(recording);
      }
    } catch (err) {
      // ye
    }
  };

  const getDurationFormatted = (millis) => {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  };

  const stopRecording = async () => {
    // setRecording(undefined);
    await recording.stopAndUnloadAsync();

    // This setting is needed because otherwise the IOS system
    // will only play sound via the phone call speaker, and not the bottom ones
    // Big thanks to that guy on Github with the same issue
    Audio.setAudioModeAsync({ allowsRecordingIOS: false });

    const updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();

    updatedRecordings.push({
      sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
    });
    /*
    updatedRecordings.push({
      sound,
      duration: 20,
      file: 'https://neftme-test-bucket.s3.eu-west-2.amazonaws.com/sample3.m4a',
    }); */

    const communityPercentage = 10;
    const tempNFT = {
      title: 'teste teste 12',
      description: 'descricao',
      communityPercentage,
      resource: recording.getURI(),
      resource_type: 'm4a',
    };

    setNft(tempNFT);

    setRecordings(updatedRecordings);
  };

  const upload = async () => {
    if (nft != null) {
      await postAPINFT(nft);
    }
  };

  const streamFromAWS = async () => {
    const b = await getNFTByTokenId(66);

    const source = { uri: b?.resource };
    const initialStatus = {
      shouldPlay: false,
      rate: 1.0,
      volume: 1.0,
    };

    const { sound } = await Audio.Sound.createAsync(source, initialStatus);

    sound.replayAsync();
  };

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <View key={index} style={styles.row}>
        <Text style={styles.fill}>
          Recording
          {index + 1} -{recordingLine.duration}
        </Text>
        <Button
          style={styles.button}
          onPress={() => streamFromAWS()}
          title="Stream from AWS"
        />
        <Button
          style={styles.button}
          onPress={() => recordingLine.sound.stopAsync()}
          title="Stop"
        />
      </View>
    ));
  }

  return (
    <VideoNFT />
    /* <View style={styles.container}>
       <Header
        showNext
        onPress={selectedImage ? () => goNext(selectedImage.uri) : null}
        step={1}
      />
      {selectedImage ? (
        <Image
          style={styles.selectedImage}
          source={{ uri: selectedImage.uri }}
        />
      ) : null}
      <View style={styles.galleryContainer}>
        <Button onPress={() => startRecording()} title="PLAY">
          {' '}
        </Button>
        <Button onPress={() => stopRecording()} title="STOP">
          {' '}
        </Button>
        <Button onPress={() => upload()} title="Upload">
          {' '}
        </Button>
        {getRecordingLines()}
      </View>
    </View> */
  );

  /* ORIGINAL
  <View style={styles.container}>
      <Header showNext onPress={selectedImage ? () => goNext(selectedImage.uri) : null} step={1} />
      {selectedImage ? (
        <Image style={styles.selectedImage} source={{ uri: selectedImage.uri }} />
      ) : null}
      <View style={styles.galleryContainer}>
        <Gallery onCameraPress={onCameraPress} setSelectedImage={setSelectedImage} />
      </View>
    <View style={editorVisible ? [styles.container] : [styles.container, styles.paddingTop60]}>
      {!selectedImage && <Header showNext onPress={null} step={1} />}
      {selectedImage && (
        <ImageEditor
          asView
          visible={editorVisible}
          onCloseEditor={() => {
            setSelectedImage(undefined);
            setEditorVisible(false);
          }}
          imageUri={selectedImage?.uri || undefined}
          fixedCropAspectRatio={1.6}
          lockAspectRatio={false}
          minimumCropDimensions={{
            width: 100,
            height: 100,
          }}
          onEditingComplete={(result) => {
            if (result?.uri) {
              setSelectedImage(result.uri);
              navigation.navigate('CreateNFT', {
                screen: 'CreateNFTDetails',
                params: { nftImage: result.uri, origin: route.params },
              });
            }
          }}
          throttleBlur={false}
          mode="crop-only"
        />
      )}
      {!selectedImage && (
        <View style={styles.galleryContainer}>
          <Gallery
            onCameraPress={onCameraPress}
            setSelectedImage={(image) => {
              setSelectedImage(image);
              setEditorVisible(true);
            }}
          />
        </View>
      )}
    </View>

  */

  // CENAS DE RECORDING SONS
  /*
    <View style={styles.container}>
      <Header showNext onPress={selectedImage ? () => goNext(selectedImage.uri) : null} step={1} />
      {selectedImage ? (
        <Image style={styles.selectedImage} source={{ uri: selectedImage.uri }} />
      ) : null}
      <View style={styles.galleryContainer}>
        <Button onPress={() => startRecording()} title="PLAY"> </Button>
        <Button onPress={() => stopRecording()} title="STOP"> </Button>
        {getRecordingLines()}
      </View>
    </View> */
};

export default MainGallery;
