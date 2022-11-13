import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Text,
} from 'react-native';
import { format } from '../../../utils/time';
import { abbreviateNumber, removeDecimals } from '../../../utils/numbers';

const styles = StyleSheet.create({
  imageStyle: {
    width: 103,
    height: 103,
    borderRadius: 8,
    margin: 8,
  },
  textContainer: {
    position: 'relative',
    alignItems: 'center',
    marginTop: 85,
    marginLeft: 60,
    marginRight: 2,
    backgroundColor: 'rgba(51, 51, 51, 0.5)',
    borderRadius: 6,
  },
  text: {
    color: '#fff',
    marginLeft: 2,
    fontWeight: '500',
  },
});

const ResourceTile = ({ resource, onPress, isPhoto }) => {
  return resource ? (
    <TouchableOpacity onPress={() => onPress(resource)}>
      <ImageBackground style={styles.imageStyle} source={{ uri: resource.uri }}>
        {!isPhoto && (
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {format(
                removeDecimals(abbreviateNumber(resource.duration, true))
              )}
            </Text>
          </View>
        )}
      </ImageBackground>
    </TouchableOpacity>
  ) : null;
};
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
