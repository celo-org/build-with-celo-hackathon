import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import { ProfileImage } from '@library';
import { Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { strIsEqual } from '@utils/words';
import { useGetCurrentUserQuery } from '@features/current_user';
import { getUserByWallet } from '@services/user';
import styles from './styles';

const ActivityItem = ({
  activityInfo, type, blockNumber, owner, setOfferModalVisible,
  setChosenEventInfo, setChosenUser, activity,
}) => {
  const [user, setUser] = useState({});
  const [amount, setAmount] = useState(0);
  const [text, setText] = useState('');
  const navigation = useNavigation();
  const navigateToProfile = () => navigation.navigate('CreatorProfile', { username: user.username });
  const { data: currentUser } = useGetCurrentUserQuery();

  const {
    staked, unstaked, mintedNft, madeOffer, bidAccepted,
  } = Constants.manifest.extra.nftActivity;
  const stakedText = 'Staked';
  const unstakedText = 'Unstaked';
  const makeOfferText = 'Made an Offer';
  const mintText = 'Minted NFT';
  const boughtText = 'Bought NFT';
  const bidAcceptedText = 'Accepted Offer';

  const loadOwnerCreator = async () => {
    if (activityInfo !== undefined) {
      switch (type) {
        case staked:
          setUser(await getUserByWallet(activityInfo?.staker));
          setText(stakedText);
          setAmount((activityInfo.amount * 10 ** -18).toLocaleString());
          break;

        case unstaked:
          setText(unstakedText);
          setUser(await getUserByWallet(activityInfo?.staker));
          setAmount((activityInfo.amount * 10 ** -18).toLocaleString());
          break;

        case mintedNft:
          if (strIsEqual(activityInfo[0], '0x0000000000000000000000000000000000000000')) {
            setText(mintText);
          } else {
            setText(boughtText);
          }
          setUser(await getUserByWallet(activityInfo.to));
          break;

        case madeOffer:
          setText(makeOfferText);
          setUser(await getUserByWallet(activityInfo.bidder));
          setAmount((activityInfo.amount * 10 ** -18).toLocaleString());
          break;
        case bidAccepted:
          setText(bidAcceptedText);
          setUser(await getUserByWallet(activityInfo?.owner));
          setAmount((activityInfo.amount * 10 ** -18).toLocaleString());
          break;

        default:
          setText('Something did not go as planned');
          break;
      }
    }
  };

  const selectEvent = () => {
    setOfferModalVisible(true);
    setChosenEventInfo(activityInfo);
    setChosenUser(user);
  };

  useEffect(() => {
    loadOwnerCreator();
  }, []);

  const alreadyAccepted = () => (
    activity.find((eventBlock) => (
      eventBlock.blockNumber > blockNumber
      && strIsEqual(eventBlock.eventName, 'Transfer')
      && strIsEqual(eventBlock.eventInfo.to, currentUser.walletAddress)
    )) !== undefined
  );

  return (
    <View style={styles.itemContainer}>
      <Pressable
        onPress={navigateToProfile}
      >
        <ProfileImage
          profileImage={user.profileImage}
          imageStyle={styles.image}
          avatarWidth={30}
          avatarHeight={30}
        />
      </Pressable>
      <View style={styles.reviewBox}>
        <Text style={styles.description}>{text}</Text>
        <View style={styles.descriptionAddress}>
          {
            [staked, madeOffer, unstaked, bidAccepted].includes(type) && (
              <Text style={styles.descriptionNumber}>
                {`${amount} NEFTS`}
              </Text>
            )
          }
        </View>
      </View>
      {(text === makeOfferText
        && strIsEqual(owner, currentUser.walletAddress))
        && !alreadyAccepted()
        && (
          <Pressable style={styles.reviewButton} onPress={selectEvent}>
            <Text style={styles.reviewText}>Review</Text>
          </Pressable>
        )}
    </View>
  );
};
ActivityItem.propTypes = {
  activity: PropTypes.arrayOf(PropTypes.shape({
    blockNumber: PropTypes.number.isRequired,
    eventInfo: PropTypes.instanceOf(Object).isRequired,
    eventName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
  activityInfo: PropTypes.shape({
    staker: PropTypes.string,
    amount: PropTypes.string,
    to: PropTypes.string,
    bidder: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
  blockNumber: PropTypes.number.isRequired,
  setOfferModalVisible: PropTypes.func.isRequired,
  setChosenEventInfo: PropTypes.func.isRequired,
  setChosenUser: PropTypes.func.isRequired,
  owner: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default ActivityItem;
