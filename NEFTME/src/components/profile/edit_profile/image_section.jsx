import React from 'react';
import PropTypes from 'prop-types';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '@library';
import UploadIcon from '@assets/icons/upload.svg';
import CloseIcon from '@assets/icons/close_background.svg';

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#fff',
  },
  imageContainer: {
    marginTop: 8,
    backgroundColor: 'rgba(65, 65, 74, 0.5)',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  flex05: {
    flex: 0.5,
  },
  marginRight4: {
    marginRight: 4,
  },
  marginLeft4: {
    marginLeft: 4,
  },
  buttonIcon: {
    width: 22,
    height: 18,
    marginRight: 14,
  },
  clearImage: {
    position: 'absolute',
    right: 0,
    marginRight: 8,
    marginTop: 8,
  },
});

const ImageSection = ({
  title,
  children,
  onUploadPhotoPress,
  newImage,
  clearImage,
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.imageContainer}>
      {children}
      {newImage ? (
        <TouchableOpacity onPress={clearImage} style={styles.clearImage}>
          <CloseIcon width={40} height={40} />
        </TouchableOpacity>
      ) : null}
    </View>
    <View style={styles.buttonsContainer}>
      <View style={[styles.flex05, styles.marginRight4]}>
        <Button
          primary
          text="Select NFTs"
          onPress={() => Alert.alert('Available soon')}
        />
      </View>
      <View style={[styles.flex05, styles.marginLeft4]}>
        <Button
          primary={false}
          text="Upload"
          Icon={UploadIcon}
          iconStyle={styles.buttonIcon}
          onPress={onUploadPhotoPress}
        />
      </View>
    </View>
  </View>
);

ImageSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.instanceOf(Object).isRequired,
  onUploadPhotoPress: PropTypes.func.isRequired,
  newImage: PropTypes.bool.isRequired,
  clearImage: PropTypes.func.isRequired,
};

export default ImageSection;
