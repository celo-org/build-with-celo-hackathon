import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { withMainScrollView } from '@hocs';
import { useNavigation } from '@react-navigation/native';
import { useGetCurrentUserQuery } from '@features/current_user';
import { Button } from '@library';
import {
  getCreatedNfts, getNftDetails, getOwnedNfts, getStakedNfts,
} from '@services/user_nfts';
import { useSmartContract } from '@hooks';
import Constants from 'expo-constants';
import StatsIcon from '@assets/icons/stats.svg';
// Components
import ProfileHeader from '../shared/profile_header';
import ProfileData from '../shared/profile_data';
import NftsList from '../shared/nfts_list';
import EditButton from './edit_button';

const styles = StyleSheet.create({
  myStatsStyle: {
    marginTop: 20,
    marginHorizontal: 16,
  },
  myStatsText: {
    marginLeft: 8,
  },
});

const CreatorProfile = () => {
  const navigation = useNavigation();
  const { getContractMethods } = useSmartContract();
  const { data: currentUser } = useGetCurrentUserQuery();

  const [nftsData, setNftsData] = useState({
    created: [],
    owned: [],
    supporting: [],
    saved: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser?.walletAddress) {
        const viewContractMethods = await getContractMethods(
          Constants.manifest.extra.neftmeViewContractAddress,
        );
        getCreatedNfts(viewContractMethods, currentUser.walletAddress)
          .then((created) => setNftsData((prevData) => ({
            ...prevData,
            created,
          })));
        getOwnedNfts(viewContractMethods, currentUser.walletAddress)
          .then((owned) => setNftsData((prevData) => ({
            ...prevData,
            owned,
          })));
        const contractMethods = await getContractMethods(
          Constants.manifest.extra.neftmeErc721Address,
        );
        getStakedNfts(contractMethods, currentUser.walletAddress)
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

  if (!currentUser) return null;

  return (
    <View>
      <ProfileHeader
        coverImage={currentUser.coverImage}
        profileColor={currentUser.profileColor}
        goBack={navigation.goBack}
        isCurrentUser
        currentUser={currentUser}
      />
      <ProfileData profile={currentUser} ProfileButton={EditButton} />
      <Button
        primary
        buttonStyle={styles.myStatsStyle}
        text="My Stats"
        textStyle={styles.myStatsText}
        Icon={StatsIcon}
        onPress={() => Alert.alert('Available soon')}
      />
      <NftsList nfts={nftsData} myProfile />
    </View>
  );
};

export default withMainScrollView(false, false)(CreatorProfile);
