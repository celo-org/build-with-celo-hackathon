import React from 'react';
import { NFTPropTypes } from '@utils/proptypes';
import { Image, Pressable, Text, View } from 'react-native';
// import SaveFavoriteIcon from '@assets/icons/save_favorite.svg';
import { useNavigation } from '@react-navigation/native';
import { ProfileImage, TruncatedText } from '@library';
import { pluralizeFollowers } from '@utils/words';
import SocialInfo from './social_info';
import Tokenomics from './tokenomics';
import styles from './styles';

const Nft = ({ nft }) => {
  const navigation = useNavigation();
  const navigateToProfile = () =>
    navigation.navigate('CreatorProfile', { username: nft.username });

  return (
    <View style={styles.headerContainer}>
      <View style={styles.nftHeader}>
        <Pressable onPress={navigateToProfile}>
          <ProfileImage
            profileImage={nft.profilePhoto}
            containerStyle={{
              ...styles.profileImageContainer,
              backgroundColor: nft.profileColor,
            }}
            imageStyle={styles.nftProfilePhoto}
            avatarWidth={30}
            avatarHeight={30}
          />
        </Pressable>
        <View style={styles.nftHeaderTitle}>
          <Text style={styles.nftHeaderName}>{nft.name}</Text>
          <Text style={styles.nftHeaderFollowers}>{`${
            nft.followers
          } ${pluralizeFollowers(nft.followers)}`}</Text>
        </View>
      </View>
      <View>
        {/* TODO: ADD Save Favorite feature;
        <SaveFavoriteIcon style={styles.saveFavoriteIcon} width={20} height={20} /> */}
        <Pressable
          onPress={() =>
            navigation.navigate('NFTDetail', { nftTokenId: nft.tokenId })
          }
        >
          <Image source={{ uri: nft.resource }} style={styles.nftNFTPhoto} />
        </Pressable>
      </View>
      <SocialInfo nft={nft} />
      <TruncatedText text={nft.description} textStyle={styles.nftDescription} />
      <View style={styles.horizontalLine} />
      <Tokenomics tokenId={nft.tokenId} />
    </View>
  );
};

Nft.propTypes = {
  nft: NFTPropTypes,
};

export default Nft;
