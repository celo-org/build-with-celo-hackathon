import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { withMainScrollView } from '@hocs';
import { useNavigation, useRoute } from '@react-navigation/native';
import { followUser, unfollowUser, getUserByUsername } from '@services/user';
import {
  getCreatedNfts, getNftDetails, getOwnedNfts, getStakedNfts,
} from '@services/user_nfts';
import { useSmartContract } from '@hooks';
import Constants from 'expo-constants';
import { Button, Loading } from '@library';
import { useGetCurrentUserQuery } from '@features/current_user';
import styles from './styles';
// Components
import ProfileHeader from '../shared/profile_header';
import ProfileData from '../shared/profile_data';
import SharedFollowers from './shared_followers';
import Stats from './stats';
import NftsList from '../shared/nfts_list';
import ShareButton from './share_button';

const CreatorProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { getContractMethods } = useSmartContract();
  const [profileData, setProfileData] = useState({});
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [nftsData, setNftsData] = useState({
    created: [],
    owned: [],
    supporting: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const { data: currentUser } = useGetCurrentUserQuery();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserByUsername(route.params.username);
      setProfileData(data);
      if (data?.walletAddress) {
        if (currentUser.username === profileData.username) {
          setIsCurrentUser(true);
        }

        const viewContractMethods = await getContractMethods(
          Constants.manifest.extra.neftmeViewContractAddress,
        );
        getCreatedNfts(viewContractMethods, data.walletAddress)
          .then((created) => setNftsData((prevData) => ({
            ...prevData,
            created,
          })));
        getOwnedNfts(viewContractMethods, data.walletAddress)
          .then((owned) => setNftsData((prevData) => ({
            ...prevData,
            owned,
          })));
        const contractMethods = await getContractMethods(
          Constants.manifest.extra.neftmeErc721Address,
        );
        getStakedNfts(contractMethods, data.walletAddress)
          .then(async (supporting) => {
            if (supporting.length > 0) {
              const nftsSupporting = await Promise.all(supporting.map(async (tokenId) => (
                getNftDetails(viewContractMethods, tokenId)
              )));
              setNftsData((prevData) => ({
                ...prevData,
                supporting: nftsSupporting,
              }));
            }
          });
      }
    };
    fetchData();
  }, []);

  if (Object.keys(profileData).length === 0) return null;

  const onFollow = async () => {
    setIsLoading(true);
    const res = profileData.isCurrentUserFollowing
      ? await unfollowUser(profileData.id) : await followUser(profileData.id);
    if (res) {
      // TODO: When in redux store,
      // Invalidate cache of user id profile (creator and featured profile)
      // dispatch(api.util.updateQueryData('getPosts'));
      setProfileData(await getUserByUsername(profileData.username));
      setIsLoading(false);
    } else {
      setIsLoading(false);
      Alert.alert('Something went wrong, please try again');
    }
  };

  return (
    <View>
      {isLoading && <Loading />}
      <ProfileHeader
        coverImage={profileData.coverImage}
        profileColor={profileData.profileColor}
        goBack={navigation.goBack}
        isCurrentUser={isCurrentUser}
      />
      <ProfileData profile={profileData} ProfileButton={ShareButton} />
      <SharedFollowers
        sharedFollowers={profileData.sharedFollowers}
        totalSharedFollowers={profileData.totalSharedFollowers}
      />
      <View style={styles.buttonsContainer}>
        <Button text={profileData.isCurrentUserFollowing ? 'Unfollow' : 'Follow'} buttonStyle={styles.followButton} onPress={onFollow} />
        <Button text="Message" primary={false} buttonStyle={styles.messageButton} onPress={() => Alert.alert('Available soon!')} />
      </View>
      <Stats userWalletAddress={profileData.walletAddress} />
      <NftsList name={profileData.name} nfts={nftsData} />
    </View>
  );
};

export default withMainScrollView(false, false)(CreatorProfile);
