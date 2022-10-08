import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity } from 'react-native';

const ImageTile = ({ image, onPress }) => (
  image ? (
    <TouchableOpacity onPress={() => onPress(image)}>
      <Image
        style={{
          width: 103, height: 103, borderRadius: 8, margin: 8,
        }}
        source={{ uri: image.uri }}
      />
    </TouchableOpacity>
  ) : null
);

ImageTile.defaultProps = {
  onPress: () => { },
};

ImageTile.propTypes = {
  image: PropTypes.shape({
    uri: PropTypes.string.isRequired,
  }).isRequired,
  onPress: PropTypes.func,
};

export default ImageTile;
