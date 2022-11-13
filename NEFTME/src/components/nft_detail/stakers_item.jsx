import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ProfileImage } from '@library';
import {
  StyleSheet, Text, View, Pressable,
} from 'react-native';
import TokenIcon from '@assets/icons/token.svg';
import { abbreviateNumber } from '@utils/numbers';
import { useNavigation } from '@react-navigation/native';
import { getUserByWallet } from '../../services/user';

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#2B2F3A',
    flexDirection: 'row',
    marginBottom: 8,
    borderRadius: 16,
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginLeft: 8,
    marginRight: 20,
    marginBottom: 8,
  },
  image: {
    width: 48,
    height: 48,
    marginTop: 8,
    marginLeft: 8,
    marginRight: 20,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    color: '#FCFCFC',
    fontWeight: '600',
  },
  description: {
    color: '#FCFCFC',
    opacity: 72,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0.75,
    paddingTop: 10,
  },
  icon: {
    paddingTop: 30,
  },
  textBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 0,
    flexGrow: 0,
  },
  address: {
    color: '#FCFCFC',
    fontWeight: '400',
    opacity: 70,
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0.75,
    paddingTop: 10,
  },
  descriptionAddress: {
    flexDirection: 'row',
  },
});

const StakerItem = ({ stakerInfo }) => {
  const [staker, setStaker] = useState(null);
  const [amount, setAmount] = useState(0);

  const navigation = useNavigation();
  const navigateToProfile = () => navigation.navigate('CreatorProfile', { username: staker.username });

  const loadStaker = async () => {
    if (stakerInfo) {
      setStaker(await getUserByWallet(stakerInfo[0]));
      setAmount(abbreviateNumber(stakerInfo[1] * 10 ** -18, true));
    }
  };

  useEffect(() => {
    (async () => { await loadStaker(); })();
  }, []);

  if (!staker) return null;

  return (
    <View style={styles.itemContainer}>
      <Pressable
        onPress={navigateToProfile}
      >
        <ProfileImage
          profileImage={staker.profileImage}
          imageStyle={styles.image}
          avatarWidth={30}
          avatarHeight={30}
          containerStyle={{
            ...styles.profileImageContainer,
            backgroundColor: staker?.profileColor,
          }}
        />
      </Pressable>
      <View style={styles.textBox}>
        <Text style={styles.name}>{staker.name}</Text>
        <View style={styles.descriptionAddress}>
          <Text style={styles.description}>
            {amount}
            {' '}
            NEFTS
            {' '}
          </Text>
          <TokenIcon style={styles.icon} width={25} height={25} />
        </View>
      </View>
    </View>
  );
};

StakerItem.propTypes = {
  stakerInfo: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])).isRequired,
};

export default StakerItem;
