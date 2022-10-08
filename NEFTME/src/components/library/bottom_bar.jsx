import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeIcon from '@assets/icons/home.svg';
import CreateIcon from '@assets/icons/create_nft.svg';
import SearchIcon from '@assets/icons/search.svg';

const styles = StyleSheet.create({
  bottomBar: {
    width: '100%',
    height: 78,
    backgroundColor: '#313141',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createNftIcon: {
    marginHorizontal: 75,
  },
});

const BottomBar = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.bottomBar}>
      <HomeIcon width={32} height={33} onPress={() => navigation.navigate('Home')} />
      <CreateIcon style={styles.createNftIcon} width={43.35} height={44} onPress={() => navigation.navigate('CreateNFT')} />
      <SearchIcon width={32} height={33} onPress={() => navigation.navigate('Search')} />
    </View>
  );
};

export default BottomBar;
