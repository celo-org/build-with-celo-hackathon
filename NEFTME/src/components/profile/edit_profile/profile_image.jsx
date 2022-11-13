import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, View } from 'react-native';
import Avatar from '@assets/icons/profile_avatar.svg';

const styles = StyleSheet.create({
  avatarContainer: {
    margin: 16,
    padding: 24,
  },
  profileImage: {
    margin: 16,
    width: 112,
    height: 112,
    borderRadius: 70,
  },
});

const ProfileImage = ({ profileImage, profileColor }) => (
  <>
    {!profileImage && (
      <View style={[styles.avatarContainer, { backgroundColor: profileColor }]}>
        <Avatar style={{ width: 62, height: 62, borderRadius: 70 }} />
      </View>
    )}
    {profileImage && <Image source={{ uri: profileImage }} style={styles.profileImage} />}
  </>
);

ProfileImage.defaultProps = {
  profileImage: null,
};

ProfileImage.propTypes = {
  profileImage: PropTypes.string,
  profileColor: PropTypes.string.isRequired,
};

export default ProfileImage;
