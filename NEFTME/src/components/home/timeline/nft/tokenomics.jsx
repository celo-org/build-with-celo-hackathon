import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TokenIcon from '@assets/icons/token.svg';
import Constants from 'expo-constants';
import { abbreviateNumber } from '@utils/numbers';
import { useSmartContract } from '@hooks';
import { fetchNFTDetails, selectNFTDetails } from '@features/on_chain/nft';
import styles from './styles';

const Tokenomics = ({ tokenId }) => {
  const { getContractMethods } = useSmartContract();
  const dispatch = useDispatch();
  const nftDetails = useSelector((state) => selectNFTDetails(state, tokenId));

  useEffect(() => {
    const fetch = async () => {
      const contractMethods = await getContractMethods(
        Constants.expoConfig.extra.neftmeViewContractAddress
      );
      dispatch(fetchNFTDetails({ tokenId, contractMethods }));
    };

    fetch();
  }, []);

  return (
    <View style={styles.tokenomicsContainer}>
      <View style={styles.stakedContainer}>
        <TokenIcon width={34} height={34} />
        <View>
          <Text style={styles.stakedStyle}>Invested</Text>
          <Text style={styles.neftsAmountStyle}>
            {nftDetails?.data
              ? abbreviateNumber(nftDetails.data[1] * 10 ** -18, true)
              : 0}
          </Text>
        </View>
      </View>
      <View style={styles.verticalLine} />
      <View style={styles.supportersContainer}>
        <Text style={styles.economicDetails}>
          <Text style={styles.fontWeight700}>
            {`${nftDetails?.data?.[2] ? Number(nftDetails.data[2]) / 1000 : 0
              }% `}
          </Text>
          <Text>goes to</Text>
        </Text>
        <Text style={[styles.economicDetails, styles.fontWeight700]}>
          {`${nftDetails?.data?.[3] || 0} investors`}
        </Text>
      </View>
    </View>
  );
};

Tokenomics.propTypes = {
  tokenId: PropTypes.string.isRequired,
};

export default React.memo(Tokenomics);
