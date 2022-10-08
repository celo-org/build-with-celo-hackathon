import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectNFTUserStakedAmount } from '@features/on_chain/nft';
import { Button } from '@library';
import { abbreviateNumber } from '@utils/numbers';
import ActionButtons from './action_buttons';
import UnstakeModal from '../action_modal';
import styles from './styles';

const Stake = ({ tokenId }) => {
  const [unstakeModalVisible, setUnstakeModalVisible] = useState(false);
  const [tokensToUnstake, setTokensToUnstake] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const userStakedAmount = useSelector((state) => selectNFTUserStakedAmount(state, tokenId));

  if (userStakedAmount === 0) return null;

  return (
    <>
      <Button
        buttonStyle={styles.secondButton}
        onPress={() => setUnstakeModalVisible(true)}
        text="Unstake $NEFT"
        textStyle={styles.stakeText}
      />
      <UnstakeModal
        actionModalVisible={unstakeModalVisible}
        inputSubTitle={`Staked: ${abbreviateNumber(userStakedAmount.toFixed(2))} $NEFT`}
        isLoading={isLoading}
        modalTitle="How much $NEFT do you want to unstake?"
        neftBalance={userStakedAmount}
        setActionModalVisible={setUnstakeModalVisible}
        showPercentages
        tokensAmount={tokensToUnstake}
        setTokensAmount={setTokensToUnstake}
      >
        <ActionButtons
          tokenId={tokenId}
          setIsLoading={setIsLoading}
          setUnstakeModalVisible={setUnstakeModalVisible}
          tokensToUnstake={tokensToUnstake}
        />
      </UnstakeModal>
    </>
  );
};

Stake.propTypes = {
  tokenId: PropTypes.string.isRequired,
};

export default Stake;
