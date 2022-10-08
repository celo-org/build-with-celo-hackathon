import React from 'react';
import PropTypes from 'prop-types';
import { ProfileDataDefaultProps, ProfileDataPropTypes } from '@utils/proptypes';
import {
  Alert, Pressable, Text, View,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { ProfileImage, TruncatedText } from '@library';
import CopyIcon from '@assets/icons/copy.svg';
import { abbreviateNumber } from '@utils/numbers';
import { pluralizeFollowers } from '@utils/words';
import styles from './profile_data_styles';
import SocialLinks from './social_links';

const ProfileData = ({ profile, ProfileButton }) => {
  const copyWalletAddress = () => {
    Clipboard.setString(profile.walletAddress);
    Alert.alert('Wallet address copied successfully');
  };

  return (
    <>
      <View style={styles.profileContainer}>
        <ProfileImage
          profileImage={profile.profileImage}
          containerStyle={{
            ...styles.profileImageContainer,
            backgroundColor: profile.profileColor,
          }}
          imageStyle={styles.profileImageStyles}
          avatarWidth={64}
          avatarHeight={64}
        />
        <ProfileButton profile={profile} />
      </View>
      <View style={styles.followsContainer}>
        <View style={styles.followers}>
          <Text style={styles.amount}>{abbreviateNumber(profile.totalFollowers, false)}</Text>
          <Text style={styles.followLabel}>{pluralizeFollowers(profile.totalFollowers)}</Text>
        </View>
        <View style={styles.flexDirectionRow}>
          <Text style={styles.amount}>{abbreviateNumber(profile.totalFollowing, false)}</Text>
          <Text style={styles.followLabel}>Following</Text>
        </View>
        <SocialLinks socialMediaLinks={profile.socialMediaLinks} />
      </View>
      <View style={styles.nameWalletContainer}>
        <Text style={styles.name}>{profile.name}</Text>
        <View style={[styles.flexDirectionRow, styles.usernameWalletView]}>
          <Text style={styles.nameSubtext}>{`@${profile.username}`}</Text>
          {profile.walletAddress ? (
            <>
              <Text style={[styles.nameSubtext, styles.separatorText]}>.</Text>
              <Text style={styles.walletAddress}>{`${profile.walletAddress.slice(0, 5)}...${profile.walletAddress.slice(-5)}`}</Text>
              <Pressable onPress={copyWalletAddress}>
                <CopyIcon width={12.67} height={14.67} />
              </Pressable>
            </>
          ) : null}
        </View>
      </View>
      {profile.bio ? (
        <View style={styles.bioContainer}>
          <TruncatedText text={profile.bio} />
        </View>
      ) : null}
    </>
  );
};

ProfileData.defaultProps = ProfileDataDefaultProps;
ProfileData.propTypes = {
  ...ProfileDataPropTypes,
  ProfileButton: PropTypes.func.isRequired,
};

export default ProfileData;
