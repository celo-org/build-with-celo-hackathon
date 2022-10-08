import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Constants from 'expo-constants';
import { useGetCurrentUserQuery } from '@features/current_user';
import { selectNFTUserStakedAmount } from '@features/on_chain/nft';
import { Button } from '@library';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { useSmartContract } from '@hooks';
import { abbreviateNumber } from '@utils/numbers';
import StakeModal from '../action_modal';
import ActionButtons from './action_buttons';
import styles from './styles';

const Stake = ({ tokenId, owner }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [stakeModalVisible, setStakeModalVisible] = useState(false);
  const [neftBalance, setNeftBalance] = useState(0);
  const [tokensToStake, setTokensToStake] = useState('0');
  const connector = useWalletConnect();
  const { getContractMethods } = useSmartContract();
  const { data: currentUser } = useGetCurrentUserQuery();
  const userStakedAmount = useSelector((state) => selectNFTUserStakedAmount(state, tokenId));

  const getNEFTBalance = async () => {
    const contractMethods = await getContractMethods(
      Constants.manifest.extra.neftmeErc20NEFTAddress,
    );
    contractMethods.balanceOf(connector.accounts[0]).call()
      .then((balance) => {
        setNeftBalance(balance * 10 ** -18);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getNEFTBalance();
  }, []);

  return (
    <>
      <Button
        buttonStyle={[
          styles.stakeButton,
          userStakedAmount === 0
            && owner.toLowerCase() === currentUser.walletAddress.toLowerCase()
            ? { flex: 1 } : {},
        ]}
        onPress={() => setStakeModalVisible(true)}
        text="Stake $NEFT"
        textStyle={styles.stakeText}
      />
      <StakeModal
        actionModalVisible={stakeModalVisible}
        inputSubTitle={`Available: ${abbreviateNumber(neftBalance.toFixed(2))} $NEFT`}
        isLoading={isLoading}
        modalTitle="How much $NEFT do you want to stake?"
        neftBalance={neftBalance}
        setActionModalVisible={setStakeModalVisible}
        showPercentages
        tokensAmount={tokensToStake}
        setTokensAmount={setTokensToStake}
      >
        <ActionButtons
          tokenId={tokenId}
          setIsLoading={setIsLoading}
          setStakeModalVisible={setStakeModalVisible}
          tokensToStake={tokensToStake}
        />
      </StakeModal>
    </>
  );
};

Stake.propTypes = {
  tokenId: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
};

export default React.memo(Stake);
