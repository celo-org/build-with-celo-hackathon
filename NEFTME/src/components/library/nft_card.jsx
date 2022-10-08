import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import { abbreviateNumber } from '@utils/numbers';
import { convertFromNFTAmount } from '@utils/nft';
import TokenIcon from '@assets/icons/token.svg';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: 4,
    width: (width - 40) / 2,
    marginBottom: 10,
    backgroundColor: '#2B2F3A',
    borderRadius: 16,
    paddingBottom: 16,
  },
  image: {
    height: 162,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  nftTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 8,
    marginHorizontal: 8,
    color: '#fff',
  },
  tokenContainer: {
    borderWidth: 2,
    borderColor: '#F6C138',
    borderRadius: 8,
    marginHorizontal: 8,
    marginTop: 3,
  },
  stakedContainer: {
    flexDirection: 'row',
    top: -8,
    justifyContent: 'center',
  },
  tokenIcon: {
    backgroundColor: '#313141',
    alignSelf: 'center',
  },
  stakedText: {
    fontWeight: '700',
    fontSize: 12,
    color: 'rgba(252, 252, 252, 0.5)',
    backgroundColor: '#313141',
    paddingLeft: 3,
  },
  totalStaked: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(252, 252, 252, 1)',
    textAlign: 'center',
    top: -5,
  },
  neftsText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(252, 252, 252, 1)',
  },
  supportersContainer: {
    marginTop: 8,
  },
  tokenomicsText: {
    fontWeight: '400',
    fontSize: 13,
    color: '#FCFCFC',
    textAlign: 'center',
    lineHeight: 18,
  },
});

const NftCard = ({ nft }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.itemContainer}>
      <Pressable
        onPress={() =>
          navigation.navigate('NFTDetail', { nftTokenId: nft.tokenId })
        }
      >
        <Image source={{ uri: nft.resource }} style={styles.image} />
      </Pressable>
      <View style={styles.tokenContainer}>
        <View style={styles.stakedContainer}>
          <TokenIcon width={13.56} height={13.1} style={styles.tokenIcon} />
          <Text style={styles.stakedText}>STAKED</Text>
        </View>
        <Text style={styles.totalStaked}>
          {nft.totalStaked} <Text style={{ fontWeight: '400' }}>NEFTS</Text>
        </Text>
      </View>
      <View style={styles.supportersContainer}>
        <Text style={styles.tokenomicsText}>
          <Text style={{ fontWeight: '700' }}>{`${convertFromNFTAmount(
            nft.royalty
          )}%`}</Text>{' '}
          goes to
        </Text>
        <Text style={styles.tokenomicsText}>
          {`${abbreviateNumber(nft.totalSupporters, false)} supporters`}
        </Text>
      </View>
    </View>
  );
};

NftCard.propTypes = {
  nft: PropTypes.shape({
    tokenId: PropTypes.string.isRequired,
    resource: PropTypes.string.isRequired,
    totalStaked: PropTypes.string.isRequired,
    royalty: PropTypes.string.isRequired,
    totalSupporters: PropTypes.string.isRequired,
  }).isRequired,
};

export default NftCard;
