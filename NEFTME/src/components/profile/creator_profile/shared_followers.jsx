import React from 'react';
import PropTypes from 'prop-types';
import {
  Image, StyleSheet, Text, View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 26,
    flexDirection: 'row',
    marginHorizontal: 16,
    alignItems: 'center',
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  profilePhoto: {
    width: 30.23, height: 30.23, borderRadius: 70, borderWidth: 1, borderColor: '#FFFFFF',
  },
  profile1: {
    left: -9,
  },
  profile2: {
    left: -15,
  },
  flex: {
    flex: 1,
  },
  followedBy: {
    color: 'rgba(255, 255, 255, 0.6)',
  },
  followersNames: {
    color: '#FCFCFC',
  },
});

const SharedFollowers = ({ sharedFollowers, totalSharedFollowers }) => (
  <View style={styles.container}>
    {sharedFollowers.length > 0
      && (
        <>
          <View style={styles.flexDirectionRow}>

            {sharedFollowers.map((profile, index) => (
              <Image
                key={`sharedFollowerPicture${profile.name}`}
                style={[styles.profilePhoto, styles[`profile${index}`]]}
                source={{ uri: profile.profile_photo }}
              />
            ))}
            {sharedFollowers.length === 1 && <Text>{'   '}</Text>}
          </View>
          <View style={styles.flex}>

            <Text style={styles.followedBy}>Mutual friends following</Text>
            <Text style={styles.followersNames}>
              {`${sharedFollowers.map((p) => p.name).join(', ')}`}
              {totalSharedFollowers - sharedFollowers.length > 0 && ` and ${totalSharedFollowers - sharedFollowers.length} ${totalSharedFollowers - sharedFollowers.length === 1 ? 'other' : 'others'}`}
            </Text>
          </View>
        </>
      )}
  </View>
);

SharedFollowers.propTypes = {
  sharedFollowers: PropTypes.arrayOf(PropTypes.shape({
    profile_photo: PropTypes.string.isRequired,
  })).isRequired,
  totalSharedFollowers: PropTypes.number.isRequired,
};

export default SharedFollowers;
