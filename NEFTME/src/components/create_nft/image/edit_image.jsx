import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ExitXIcon from '@assets/icons/exit_x.svg';
import BrushIcon from '@assets/icons/brush_edit_photo.svg';
import CropIcon from '@assets/icons/crop.svg';
import DiscardTrashIcon from '@assets/icons/discard_photo.svg';
import { ImageEditor } from 'expo-image-editor';
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
  image: {
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
});

const EditImage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedImage, setSelectedImage] = useState(route.params.resource);
  const [editorVisible, setEditorVisible] = useState(false);

  const goToNFTDetails = () => {
    if (!selectedImage) {
      navigation.navigate('CreateNFT', {
        screen: 'CreateNFTDetails',
        params: { resource: route.params.resource },
      });
    } else {
      navigation.navigate('CreateNFT', {
        screen: 'CreateNFTDetails',
        params: { resource: selectedImage },
      });
    }
  };

  return (
    <View
      style={editorVisible ? [innerStyles.container] : [innerStyles.container]}
    >
      {!editorVisible && (
        <View style={innerStyles.editImageContainer}>
          <ImageBackground
            source={{
              uri: route.params.resource,
            }}
            style={innerStyles.image}
          >
            <TouchableOpacity
              style={styles.exitIcon}
              onPress={() => navigation.goBack()}
            >
              <ExitXIcon style={innerStyles.exitIcon} />
            </TouchableOpacity>
          </ImageBackground>
          <View style={innerStyles.editingContainer}>
            <TouchableOpacity>
              <BrushIcon style={innerStyles.editingContainer} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setEditorVisible(true)}>
              <CropIcon style={innerStyles.editingContainer} />
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
      )}
      {editorVisible && (
        <ImageEditor
          asView={false}
          visible={editorVisible}
          onCloseEditor={() => {
            setSelectedImage(undefined);
            setEditorVisible(false);
          }}
          imageUri={route.params.resource || undefined}
          fixedCropAspectRatio={1.6}
          lockAspectRatio={false}
          minimumCropDimensions={{
            width: 100,
            height: 100,
          }}
          onEditingComplete={(result) => {
            if (result?.uri) {
              setSelectedImage(result.uri);
              goToNFTDetails();
            }
          }}
          throttleBlur={false}
          mode="crop-only"
        />
      )}
    </View>
  );
};

export default EditImage;
