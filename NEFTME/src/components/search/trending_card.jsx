import React from 'react';
import PropTypes from 'prop-types';
import {
  Image, Pressable, Text, View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './stylesheet';

const TrendingCard = ({ trending }) => {
  const navigation = useNavigation();
  const navigateToProfile = () => navigation.navigate('CreatorProfile', { username: trending.username });

  return (
    <Pressable style={styles.trendingItem} onPress={navigateToProfile}>
      <View style={styles.trendingItemImage}>
        <Image style={styles.imageTrendingStyle} source={{ uri: 'https://www.playtoearn.online/wp-content/uploads/2021/10/Bored-Ape-Yacht-Club-NFT-avatar.png' }} />
      </View>
      <Text style={styles.trendingTitle}>{trending.name}</Text>

      <View style={styles.trendingItemStaked}>
        <Text style={styles.trendingTextStaked}>123 NEFTS</Text>
      </View>

      <Text style={styles.trendingTextSupporters}>10% goes to 5k supporters</Text>
    </Pressable>
  );
};

TrendingCard.propTypes = {
  trending: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    username: PropTypes.string,
    coverImage: PropTypes.string,
    followers: PropTypes.string,
    profileImage: PropTypes.string,
    profileColor: PropTypes.string,
  }).isRequired,
};

export default TrendingCard;
