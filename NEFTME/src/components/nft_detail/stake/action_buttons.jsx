import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@library';
import { convertToETH18 } from '@utils/nft';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { useSmartContract } from '@hooks';
import { strIsEqual } from '@utils/words';
import {
  fetchNFTDetails, fetchStakers, fetchUserStakes, selectNFTDetails,
} from '@features/on_chain/nft';
import styles from './styles';

const ActionButtons = ({
  tokenId, setIsLoading, setStakeModalVisible, tokensToStake,
}) => {
  const dispatch = useDispatch();
  const [transactionApproved, setTransactionApproved] = useState(false);
  const connector = useWalletConnect();
  const { getContractMethods } = useSmartContract();
  const nftDetails = useSelector((state) => selectNFTDetails(state, tokenId));

  const approveNeft = async () => {
    try {
      if (transactionApproved) return;

      if (Number.isNaN(tokensToStake) || Number(tokensToStake) === 0) {
        Alert.alert('Invalid amount to stake');
        return;
      }

      setIsLoading(true);
      const contractMethods = await getContractMethods(
        Constants.manifest.extra.neftmeErc20NEFTAddress,
      );
      contractMethods.approve(
        Constants.manifest.extra.neftmeErc721Address,
        convertToETH18(tokensToStake),
      ).send({ from: connector.accounts[0] })
        .then((receipt) => {
          setIsLoading(false);
          if (receipt?.status) {
            Alert.alert('Transaction approved, you can now stake your $NEFT');
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

  const stakeNEFT = async () => {
    try {
      if (strIsEqual(connector.accounts[0], nftDetails.data[4])) {
        Alert.alert('You can not stake in your own NFTs');
        return;
      }

      if (!transactionApproved) {
        Alert.alert('Please approve your transaction first');
        return;
      }

      if (Number.isNaN(tokensToStake) || Number(tokensToStake) === 0) {
        Alert.alert('Invalid amount to stake');
        return;
      }

      setIsLoading(true);
      const contractMethods = await getContractMethods(
        Constants.manifest.extra.neftmeErc721Address,
      );

      contractMethods.stake(
        Number(tokenId),
        convertToETH18(tokensToStake),
      ).send({ from: connector.accounts[0] })
        .then(() => {
          setIsLoading(false);
          Alert.alert('Success!', 'Your $NEFT were successfully staked', [{
            text: 'Ok',
            onPress: async () => {
              const viewContractMethods = await getContractMethods(
                Constants.manifest.extra.neftmeViewContractAddress,
              );
              const baseParams = { contractMethods, tokenId, forceRefresh: true };
              dispatch(fetchNFTDetails({ ...baseParams, contractMethods: viewContractMethods }));
              dispatch(fetchStakers({ ...baseParams }));
              dispatch(fetchUserStakes({ ...baseParams, account: connector.accounts[0] }));
              setStakeModalVisible(false);
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
    <View style={styles.stakeButtonsActionContainer}>
      <Button
        primary={!transactionApproved}
        buttonStyle={styles.stakeButtonAction}
        onPress={approveNeft}
        text="Approve"
      />
      <Button
        primary={transactionApproved}
        buttonStyle={[styles.stakeButtonAction, styles.marginLeft10]}
        onPress={stakeNEFT}
        text="Stake $NEFT"
      />
    </View>
  );
};

ActionButtons.propTypes = {
  tokenId: PropTypes.string.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  setStakeModalVisible: PropTypes.func.isRequired,
  tokensToStake: PropTypes.string.isRequired,
};

export default ActionButtons;
