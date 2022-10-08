import React from 'react';
import { View } from 'react-native';
import { withMainScrollView } from '@hocs';
import styles from './styles';
import Header from './header';
import FeaturedProfiles from './featured_profiles';
import Timeline from './timeline';

const Home = () => (
  <View style={styles.mainView}>
    <Header />
    <FeaturedProfiles />
    <Timeline />
  </View>
);

export default withMainScrollView(true, true)(Home);
