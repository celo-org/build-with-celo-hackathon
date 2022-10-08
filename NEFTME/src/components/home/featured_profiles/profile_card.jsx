import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CoverImage, ProfileImage } from '@library';
import { pluralizeFollowers } from '@utils/words';
import styles from './styles';

const ProfileCard = ({ profile }) => {
  const navigation = useNavigation();
  const navigateToProfile = () => navigation.navigate('CreatorProfile', { username: profile.username });

  return (
    <Pressable style={styles.profileItem} onPress={navigateToProfile}>
      <CoverImage
        coverImage={profile.coverImage}
        coverImageWrapperStyle={styles.profileItemHeaderImageWrapper}
        coverImageStyle={styles.profileItemHeaderImage}
        coverGradientStyle={styles.profileCoverImageGradient}
        profileColor={profile.profileColor}
        bottomCoverColor="#232630"
      />
      <Text style={styles.profileItemName}>{profile.name}</Text>
      <Text style={styles.profileItemFollowers}>
        {`${profile.followers} ${pluralizeFollowers(profile.followers)}`}
      </Text>
      <View style={styles.profileItemUserView}>
        <ProfileImage
          profileImage={profile.profileImage}
          containerStyle={{
            ...styles.profileImageContainer,
            backgroundColor: profile.profileColor,
          }}
          imageStyle={styles.profileImage}
          avatarWidth={35}
          avatarHeight={35}
        />
      </View>
    </Pressable>
  );
};

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    username: PropTypes.string,
    coverImage: PropTypes.string,
    followers: PropTypes.number,
    profileImage: PropTypes.string,
    profileColor: PropTypes.string,
  }).isRequired,
};

export default ProfileCard;
