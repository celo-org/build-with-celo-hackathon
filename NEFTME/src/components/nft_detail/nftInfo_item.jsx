import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ProfileImage } from '@library';
import {
  StyleSheet, Text, View, Alert, Pressable,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import CopyIcon from '@assets/icons/copy.svg';
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
    color: '#F6C138',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 14,
    letterSpacing: 0.75,
    paddingTop: 10,
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
  walletPressable: {
    flexDirection: 'row',
  },
  copyIcon: {
    alignSelf: 'flex-end',
    marginLeft: 4,
  },
});

const NftInfoItem = ({ nftInfo, isCreator }) => {
  const [user, setUser] = useState({});
  const [addr, setAddr] = useState('0');
  const [text, setText] = useState('');

  const navigation = useNavigation();
  const navigateToProfile = () => navigation.navigate('CreatorProfile', { username: user.username });

  const creatorText = 'NFT Creator';
  const ownerText = 'NFT Owner';

  const loadOwnerCreator = async () => {
    if (nftInfo) {
      if (isCreator) {
        setUser(await getUserByWallet(nftInfo));
        setText(creatorText);
        setAddr(nftInfo);
      } else {
        setUser(await getUserByWallet(nftInfo));
        setText(ownerText);
        setAddr(nftInfo);
      }
    }
  };

  const copyWalletAddress = () => {
    Clipboard.setString(user.walletAddress);
    Alert.alert('Wallet address copied successfully');
  };

  useEffect(() => {
    const loadData = async () => {
      await loadOwnerCreator();
    };
    loadData();
  }, []);

  return (
    <View style={styles.itemContainer}>
      <Pressable
        onPress={navigateToProfile}
      >
        <ProfileImage
          profileImage={user.profileImage}
          imageStyle={styles.image}
          containerStyle={{
            ...styles.profileImageContainer,
            backgroundColor: user?.profileColor,
          }}
          avatarWidth={30}
          avatarHeight={30}
        />
      </Pressable>
      <View style={styles.textBox}>
        <Text style={styles.name}>{user.name}</Text>
        <View style={styles.descriptionAddress}>
          <Text style={styles.description}>{text}</Text>
          <Pressable onPress={copyWalletAddress} style={styles.walletPressable}>
            <Text style={styles.address}>
              {' '}
              •
              {' '}
              {`${addr?.slice(0, 5)}...${addr?.slice(-5)}`}
            </Text>
            <CopyIcon width={12.67} height={14.67} style={styles.copyIcon} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

NftInfoItem.propTypes = {
  nftInfo: PropTypes.string.isRequired,
  isCreator: PropTypes.bool.isRequired,
};

export default NftInfoItem;
