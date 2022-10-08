import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  coverText: {
    marginVertical: 110,
    color: 'rgba(248, 248, 248, 0.5)',
    fontSize: 16,
    fontWeight: '400',
  },
  coverImage: {
    width: '100%',
    height: 235,
    borderRadius: 8,
  },
});

const CoverImage = ({ coverImage }) => (
  <>
    {!coverImage && <Text style={styles.coverText}>No cover set yet...</Text>}
    {coverImage && <Image source={{ uri: coverImage }} style={styles.coverImage} />}
  </>
);

CoverImage.defaultProps = {
  coverImage: null,
};

CoverImage.propTypes = {
  coverImage: PropTypes.string,
};

export default CoverImage;
