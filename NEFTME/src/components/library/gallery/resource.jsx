import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  imageStyle: {
    width: 103,
    height: 103,
    borderRadius: 8,
    margin: 8,
  },
});

const ResourceTile = ({ resource, onPress, isPhoto }) =>
  resource ? (
    <TouchableOpacity onPress={() => onPress(resource)}>
      <Image style={styles.imageStyle} source={{ uri: resource.uri }} />
    </TouchableOpacity>
  ) : null;

ResourceTile.defaultProps = {
  onPress: () => {},
};

ResourceTile.propTypes = {
  resource: PropTypes.shape({
    uri: PropTypes.string.isRequired,
  }).isRequired,
  onPress: PropTypes.func,
  isPhoto: PropTypes.bool,
};

export default ResourceTile;
