import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gallery } from '@library';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../header';

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

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState(undefined);
  const navigation = useNavigation();
  const route = useRoute();
  if (selectedVideo) {
    navigation.navigate('CreateNFT', {
      screen: 'CreateNFTDetails',
      params: {
        resource: selectedVideo.uri,
        origin: route.params,
      },
    });
    setSelectedVideo(undefined);
  }
  return (
    <View style={styles.container}>
      {!selectedVideo && <Header showNext onPress={null} step={1} />}
      {!selectedVideo && (
        <View style={styles.galleryContainer}>
          <Gallery
            setSelectedResource={(video) => {
              setSelectedVideo(video);
            }}
            isPhoto={false}
          />
        </View>
      )}
    </View>
  );
};

export default VideoGallery;
