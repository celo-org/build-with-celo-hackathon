import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, View } from 'react-native';
import Avatar from '@assets/icons/profile_avatar.svg';

const styles = StyleSheet.create({
  border: {
    borderRadius: 70,
  },
  centerAvatar: {
    alignSelf: 'center',
  },
});

const ProfileImage = ({
  profileImage, containerStyle, imageStyle, avatarWidth, avatarHeight,
}) => (
  <>
    {!profileImage ? (
      <View style={[styles.border, containerStyle]}>
        <Avatar width={avatarWidth} height={avatarHeight} style={styles.centerAvatar} />
      </View>
    ) : null}
    {profileImage
      ? <Image source={{ uri: profileImage }} style={[styles.border, imageStyle]} /> : null}
  </>
);

ProfileImage.defaultProps = {
  containerStyle: {},
  profileImage: '',
  imageStyle: {},
};

ProfileImage.propTypes = {
  containerStyle: PropTypes.instanceOf(Object),
  profileImage: PropTypes.string,
  imageStyle: PropTypes.instanceOf(Object),
  avatarWidth: PropTypes.number.isRequired,
  avatarHeight: PropTypes.number.isRequired,
};

export default ProfileImage;
