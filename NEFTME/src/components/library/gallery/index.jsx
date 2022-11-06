import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Alert, Linking, ScrollView, StyleSheet, View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import ImageTile from './image';
import SelectMore from './select_more';
import Camera from './camera';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 80,
  },
});

const Gallery = ({ onCameraPress, setSelectedImage }) => {
  const [cameraRollStatus, setCameraRollStatus] = useState({});
  const [images, setImages] = useState([]);
  const [after, setAfter] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);

  const getPermissionsAsync = async () => {
    await ImagePicker.requestCameraPermissionsAsync();
    const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setCameraRollStatus(status);
    if (status?.status !== ImagePicker.PermissionStatus.GRANTED) {
      Alert.alert(
        'Permissions error',
        "NEFTME doesn't have access to your Camera Roll. Please go to the Settings page and update these settings",
        [
          { text: 'OK', onPress: () => { } },
          { text: 'Settings', onPress: () => Linking.openURL('app-settings:') }, // TODO: WE NEED TO ADD ANDROID LINKING (https://medium.com/toprakio/react-native-how-to-open-app-settings-page-d30d918a7f55);
        ],
      );
    }
  };

  const getImages = () => {
    const params = {
      first: 100,
      mediaType: [MediaLibrary.MediaType.photo],
      sortBy: [MediaLibrary.SortBy.creationTime],
    };
    if (after) params.after = after;
    if (!hasNextPage) return;
    MediaLibrary
      .getAssetsAsync(params)
      .then((data) => {
        if (cameraRollStatus?.accessPrivileges !== 'limited') {
          setImages(images.concat(data.assets));
        } else {
          setImages(data.assets);
        }
        setAfter(data.endCursor);
        setHasNextPage(data.hasNextPage);
      });
  };

  useEffect(() => {
    (async () => {
      await getPermissionsAsync();
      MediaLibrary.addListener((event) => {
        if (event?.hasIncrementalChanges === 0) {
          getImages();
        }
      });
      getImages();
    })();
  }, []);

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 200;
    return layoutMeasurement.height + contentOffset.y
      >= contentSize.height - paddingToBottom;
  };

  const onSelectedImage = async (image) => {
    const info = await MediaLibrary.getAssetInfoAsync(image.id);
    setSelectedImage({
      uri: info.localUri,
    });
  };

  return (
    <ScrollView
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          getImages();
        }
      }}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={400}
    >
      <View style={styles.container}>
        <Camera onCameraPress={onCameraPress} />
        {images.map((i) => (
          <ImageTile key={`img_${i.id}`} image={i} onPress={onSelectedImage} />
        ))}
        {cameraRollStatus?.accessPrivileges === 'limited' ? (
          <SelectMore onPress={MediaLibrary.presentPermissionsPickerAsync} />
        ) : null}
      </View>
    </ScrollView>
  );
};

Gallery.propTypes = {
  setSelectedImage: PropTypes.func.isRequired,
  onCameraPress: PropTypes.func.isRequired,
};

export default Gallery;
