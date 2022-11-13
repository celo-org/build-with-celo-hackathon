import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Linking, ScrollView, StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import SelectMore from './select_more';
import ResourceTile from './resource';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 80,
  },
});

const Gallery = ({ setSelectedResource, isPhoto }) => {
  const [cameraRollStatus, setCameraRollStatus] = useState({});
  const [resources, setResources] = useState([]);
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
          { text: 'OK', onPress: () => {} },
          { text: 'Settings', onPress: () => Linking.openURL('app-settings:') }, // TODO: WE NEED TO ADD ANDROID LINKING (https://medium.com/toprakio/react-native-how-to-open-app-settings-page-d30d918a7f55);
        ]
      );
    }
  };

  const getResources = () => {
    let params;
    if (isPhoto) {
      params = {
        first: 100,
        mediaType: [MediaLibrary.MediaType.photo],
        sortBy: [MediaLibrary.SortBy.creationTime],
      };
    } else {
      params = {
        first: 100,
        mediaType: [MediaLibrary.MediaType.video],
        sortBy: [MediaLibrary.SortBy.creationTime],
      };
    }

    if (after) params.after = after;
    if (!hasNextPage) return;
    MediaLibrary.getAssetsAsync(params).then((data) => {
      if (cameraRollStatus?.accessPrivileges !== 'limited') {
        setResources(resources.concat(data.assets));
      } else {
        setResources(data.assets);
      }
      setAfter(data.endCursor);
      setHasNextPage(data.hasNextPage);
    });
  };

  async function getPermissions() {
    await getPermissionsAsync();
    MediaLibrary.addListener((event) => {
      if (event?.hasIncrementalChanges === 0) {
        getResources();
      }
    });
  }

  useEffect(() => {
    getPermissions();
    // getAudioFiles();
    getResources();
  }, []);

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 200;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const onSelectedResource = async (resource) => {
    const info = await MediaLibrary.getAssetInfoAsync(resource.id);
    setSelectedResource(info);
  };

  return (
    <ScrollView
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          getResources();
        }
      }}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={400}
    >
      <View style={styles.container}>
        {resources.map((i) => (
          <ResourceTile
            key={`resource_${i.id}`}
            resource={i}
            onPress={onSelectedResource}
            isPhoto={isPhoto}
          />
        ))}
        {cameraRollStatus?.accessPrivileges === 'limited' ? (
          <SelectMore onPress={MediaLibrary.presentPermissionsPickerAsync} />
        ) : null}
      </View>
    </ScrollView>
  );
};

Gallery.propTypes = {
  setSelectedResource: PropTypes.func.isRequired,
  isPhoto: PropTypes.bool.isRequired,
};

export default Gallery;
