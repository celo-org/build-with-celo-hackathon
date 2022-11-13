/* eslint-disable global-require */
import React, { useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { getData, setData } from '@services/storage';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatListSlider } from 'react-native-flatlist-slider';
import { Button } from '@library';
import CarouselItem from './carousel_item';

const SLIDER_IMAGES = [
  {
    image: require('@assets/start_carousel/slide1.png'),
    desc: 'Create your NFT Live & Free.',
  },
  {
    image: require('@assets/start_carousel/slide2.png'),
    desc: 'Choose the % of your NFT that goes to the community.',
  },
  {
    image: require('@assets/start_carousel/slide3.png'),
    desc: 'Stake your NFT.',
  },
];
const { height, width } = Dimensions.get('window');

const InfoScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      if (await getData('info_screen_skipped') === 'done') {
        navigation.dispatch(CommonActions.reset({
          index: 0,
          routes: [{
            name: 'Start',
            params: { screen: 'ChooseLogin' },
          }],
        }));
      }
    })();
  }, []);

  const onSkipPress = async () => {
    await setData('info_screen_skipped', 'done');
    navigation.dispatch(CommonActions.reset({
      index: 0,
      routes: [{
        name: 'Start',
        params: { screen: 'ChooseLogin' },
      }],
    }));
  };

  return (
    <LinearGradient colors={['#303040', '#141316']} style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ width: '65%', height: '74%', alignSelf: 'center' }}>
        <FlatListSlider
          data={SLIDER_IMAGES}
          local
          onPress={() => { }}
          width={width * 0.65}
          height={height * 0.60}
          autoscroll={false}
          component={<CarouselItem />}
          loop={false}
          indicatorActiveColor="#F6C138"
          indicatorInActiveColor="#41414A"
        />
      </View>
      <Button text="Skip" primary={false} buttonStyle={{ marginTop: 64, marginHorizontal: 62 }} onPress={onSkipPress} />
    </LinearGradient>
  );
};

export default InfoScreen;
