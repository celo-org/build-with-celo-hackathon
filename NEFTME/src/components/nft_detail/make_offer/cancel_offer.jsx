import React, { useState } from 'react';
import {
  Alert, Text, TouchableOpacity, View,
} from 'react-native';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import { useDispatch } from 'react-redux';
import { useGetCurrentUserQuery } from '@features/current_user';
import { convertFromETH18 } from '@utils/nft';
import { strIsEqual } from '@utils/words';
import { useSmartContract } from '@hooks';
import { fetchNFTBids } from '@features/on_chain/nft';
import { Loading } from '@library';
import styles from './styles';

const CancelOffer = ({ currentUserBid, tokenId }) => {
  const { data: currentUser } = useGetCurrentUserQuery();
  const { getContractMethods } = useSmartContract();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const cancelOffer = async () => {
    setIsLoading(true);
    const contractMethods = await getContractMethods(
      Constants.manifest.extra.neftmeErc721Address,
    );
    // TODO: Para esta fase dos contratos temos de fazer assim
    // Primeiro fazer get bids e depois encontrar o index da bid que tem o address
    // do user que fez a oferta
    // Necessita de ser melhorado na próxima iteração com a PREXIs
    try {
      const bidList = await contractMethods.getBids(0).call();
      const bidIndex = bidList?.findIndex((element) => (
        strIsEqual(element[0], currentUser.walletAddress) && element[5]
      ));

      contractMethods.cancelBidERC20(tokenId, bidIndex).send(
        { from: currentUser.walletAddress },
      ).then((response) => {
        if (response?.status) {
          dispatch(fetchNFTBids({ tokenId, contractMethods, forceRefresh: true }));
          setIsLoading(false);
          Alert.alert('Success!', 'The bid was successfully cancelled!');
        }
      });
    } catch (err) {
      setIsLoading(false);
      // log something
    }
  };

  return (
    <View style={styles.cancelOfferContainer}>
      <Loading visible={isLoading} />
      <Text style={styles.offeredText}>{`You offered ${convertFromETH18(currentUserBid[2])} $NEFTS`}</Text>
      <TouchableOpacity onPress={cancelOffer}>
        <Text style={styles.cancelOfferButton}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

CancelOffer.propTypes = {
  currentUserBid: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  ).isRequired,
  tokenId: PropTypes.string.isRequired,
};

export default CancelOffer;
