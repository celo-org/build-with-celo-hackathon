import React from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const CoverImage = ({
  coverImage, coverImageWrapperStyle, coverImageStyle,
  coverGradientStyle, profileColor, bottomCoverColor,
}) => (
  <>
    {!coverImage ? (
      <View style={coverImageWrapperStyle}>
        <LinearGradient
          colors={[profileColor, bottomCoverColor]}
          start={[0, 0]}
          end={{ x: 0, y: 1 }}
          style={coverGradientStyle}
        />
      </View>
    ) : null}
    {coverImage ? <Image source={{ uri: coverImage }} style={coverImageStyle} /> : null}
  </>
);

CoverImage.defaultProps = {
  coverImage: null,
  coverImageStyle: {},
  coverImageWrapperStyle: {},
  coverGradientStyle: {},
  bottomCoverColor: '#141316',
};

CoverImage.propTypes = {
  coverImage: PropTypes.string,
  coverImageWrapperStyle: PropTypes.instanceOf(Object),
  coverImageStyle: PropTypes.instanceOf(Object),
  coverGradientStyle: PropTypes.instanceOf(Object),
  profileColor: PropTypes.string.isRequired,
  bottomCoverColor: PropTypes.string,
};

export default CoverImage;
