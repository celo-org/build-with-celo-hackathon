import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import { Button } from '@library';
import { convertToETH18 } from '@utils/nft';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { useSmartContract } from '@hooks';
import { fetchNFTBids } from '@features/on_chain/nft';
import styles from './styles';

const ActionButtons = ({
  tokenId, setIsLoading, setShowOfferModal, tokensToOffer,
}) => {
  const [transactionApproved, setTransactionApproved] = useState(false);
  const connector = useWalletConnect();
  const { getContractMethods } = useSmartContract();
  const dispatch = useDispatch();

  const approveNeft = async () => {
    try {
      if (transactionApproved) return;

      if (Number.isNaN(tokensToOffer) || Number(tokensToOffer) === 0) {
        Alert.alert('Invalid amount to offer');
        return;
      }

      setIsLoading(true);
      const contractMethods = await getContractMethods(
        Constants.manifest.extra.neftmeErc20NEFTAddress,
      );
      contractMethods.increaseAllowance(
        Constants.manifest.extra.neftmeErc721Address,
        convertToETH18(tokensToOffer),
      ).send({ from: connector.accounts[0] })
        .then((receipt) => {
          setIsLoading(false);
          if (receipt?.status) {
            Alert.alert('Transaction approved, you can now make your offer');
            setTransactionApproved(true);
          } else {
            Alert.alert('Transaction not approved, please try again');
          }
        })
        .catch(() => {
          setIsLoading(false);
          Alert.alert('Something went wrong, please try again');
        });
    } catch (err) {
      setIsLoading(false);
      Alert.alert('Something went wrong, please try again');
    }
  };

  const makeOffer = async () => {
    try {
      if (!transactionApproved) {
        Alert.alert('Please approve your transaction first');
        return;
      }

      if (Number.isNaN(tokensToOffer) || Number(tokensToOffer) === 0) {
        Alert.alert('Invalid amount to offer');
        return;
      }

      setIsLoading(true);
      const contractMethods = await getContractMethods(
        Constants.manifest.extra.neftmeErc721Address,
      );

      contractMethods.bidERC20(
        Number(tokenId),
        Constants.manifest.extra.neftmeErc20NEFTAddress,
        convertToETH18(tokensToOffer),
      ).send({ from: connector.accounts[0] })
        .then(() => {
          dispatch(fetchNFTBids({ tokenId, contractMethods, forceRefresh: true }));
          Alert.alert('Success!', 'Your offer was successful submitted', [{
            text: 'Ok',
            onPress: () => {
              setIsLoading(false);
              setShowOfferModal(false);
            },
          }]);
        })
        .catch(() => {
          setIsLoading(false);
          Alert.alert('Something went wrong, please try again');
        });
    } catch (err) {
      setIsLoading(false);
      Alert.alert('Something went wrong, please try again');
    }
  };

  return (
    <View style={styles.actionButtonsContainer}>
      <Button
        primary={!transactionApproved}
        buttonStyle={styles.flex05}
        onPress={approveNeft}
        text="Approve"
      />
      <Button
        primary={transactionApproved}
        buttonStyle={[styles.flex05, styles.marginLeft8]}
        onPress={makeOffer}
        text="Make Offer"
      />
    </View>
  );
};

ActionButtons.propTypes = {
  tokenId: PropTypes.string.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  setShowOfferModal: PropTypes.func.isRequired,
  tokensToOffer: PropTypes.string.isRequired,
};

export default ActionButtons;
