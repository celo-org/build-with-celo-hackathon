import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { getFeaturedProfiles } from '@services/user';
import { SectionHeader } from '@library';
import ProfileCard from './profile_card';
import styles from './styles';

const FeaturedProfiles = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    (async () => setProfiles(await getFeaturedProfiles()))();
  }, []);

  return (
    <>
      <SectionHeader
        title="Trending"
        containerStyle={styles.headerContainerStyle}
      />
      <View style={styles.profilesList}>
        {profiles.length === 0 ? (
          <View style={styles.profilesListPlaceholder}>
            <ActivityIndicator size="large" color="white" />
          </View>
        ) : (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={profiles}
            keyExtractor={(item) => item.username}
            renderItem={({ item, index }) => (
              <ProfileCard profile={item} index={index} />
            )}
          />
        )}
      </View>
    </>
  );
};

export default FeaturedProfiles;
