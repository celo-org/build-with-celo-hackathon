import React, { useEffect, useState } from 'react';
import { withMainScrollView } from '@hocs';
import {
  Text, FlatList, Pressable, Image, SafeAreaView, TextInput, View,
} from 'react-native';
import BackIcon from '@assets/icons/back.svg';
import { useNavigation } from '@react-navigation/native';
import { SectionHeader } from '@library';
import { getFeaturedProfiles } from '@services/user';
import TrendingCard from './trending_card';
import styles from './stylesheet';

const search_icon = require('@assets/search.png');

const Search = () => {
  const navigation = useNavigation();
  const [text, onChangeText] = React.useState('Search');
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    (async () => { setProfiles(await getFeaturedProfiles()); })();
  }, []);

  return (
    <View>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.inputSection}>
            <Image
              source={search_icon}
              style={styles.imageIconSearch}
            />

            <TextInput
              style={{ flex: 1, color: 'white' }}
              onChangeText={onChangeText}
              value={text}
              placeholder="Search"
              underlineColorAndroid="transparent"
            />
          </View>
        </View>
      </SafeAreaView>

      <SectionHeader title="Trending" containerStyle={styles.headerContainerStyle} />

      <View style={styles.profilesList}>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={profiles}
          keyExtractor={(item) => item.username}
          renderItem={({ item, index }) => <TrendingCard trending={item} index={index} />}
        />
      </View>

    </View>
  );
};

export default withMainScrollView(true, true)(Search);
