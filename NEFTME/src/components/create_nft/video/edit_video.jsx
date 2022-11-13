import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import { useNavigation, useRoute } from '@react-navigation/native';
import ExitXIcon from '@assets/icons/exit_x.svg';
import ScissorsIcon from '@assets/icons/scissors.svg';
import SpeakerIcon from '@assets/icons/speaker.svg';
import PlayIcon from '@assets/icons/play.svg';
import DiscardTrashIcon from '@assets/icons/discard_photo.svg';
import Button from '../../library/button';
import styles from '../image_video_shared/photo_video_styles';

const innerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21212b',
  },
  paddingTop60: {
    paddingTop: 60,
  },
  editImageContainer: {
    flex: 1,
    backgroundColor: '#21212b',
    position: 'relative',
  },
  exitContainer: {
    marginTop: 50,
    marginRight: 325,
    alignContent: 'center',
  },
  exitIcon: {
    paddingLeft: 20,
  },
  video: {
    height: 490,
    marginTop: 25,
  },
  editingContainer: {
    flexDirection: 'row',
    marginHorizontal: 50,
    marginTop: 10,
    marginLeft: 35,
  },
  editingIcon: {
    padding: 10,
  },
  createNFTButton: {
    fontWeight: '700',
    fontSize: 16,
    alignContent: 'center',
  },
  createNFTButtonContainer: {
    marginHorizontal: 20,
    marginTop: 25,
  },
  mintNFTText: {
    fontWeight: '600',
    fontSize: 16,
  },
  exit: {
    position: 'absolute',
  },
});

const EditVideo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [selectedVideo, setSelectedVideo] = useState(route.params.resource);

  const goToNFTDetails = () => {
    if (!selectedVideo) {
      navigation.navigate('CreateNFT', {
        screen: 'CreateNFTDetails',
        params: { resource: route.params.resource },
      });
    } else {
      navigation.navigate('CreateNFT', {
        screen: 'CreateNFTDetails',
        params: { resource: selectedVideo },
      });
    }
  };

  return (
    <View style={innerStyles.container}>
      <View style={innerStyles.editImageContainer}>
        <Video
          ref={video}
          style={innerStyles.video}
          source={{
            uri: route.params.resource,
          }}
          resizeMode="cover"
          isLooping
          onPlaybackStatusUpdate={(newStatus) => setStatus(() => newStatus)}
        />
        <TouchableOpacity
          style={[innerStyles.exit, styles.exitIcon]}
          onPress={() => navigation.goBack()}
        >
          <ExitXIcon style={innerStyles.exitIcon} />
        </TouchableOpacity>
        <View style={innerStyles.editingContainer}>
          <TouchableOpacity>
            <SpeakerIcon style={innerStyles.editingContainer} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log('ya')}>
            <ScissorsIcon style={innerStyles.editingContainer} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              status.isPlaying
                ? video.current.pauseAsync()
                : video.current.playAsync()
            }
          >
            <PlayIcon style={innerStyles.editingContainer} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <DiscardTrashIcon style={innerStyles.editingContainer} />
          </TouchableOpacity>
        </View>
        <View style={innerStyles.createNFTButtonContainer}>
          <Button
            buttonStyle={innerStyles.createNFTButton}
            onPress={() => goToNFTDetails()}
            text="Mint NFT"
            textStyle={innerStyles.makeOfferText}
          />
        </View>
      </View>
    </View>
  );
};

export default EditVideo;
