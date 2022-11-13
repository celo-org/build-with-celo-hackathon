import React from 'react';
import { View } from 'react-native';
import Carousel from './carousel';
import styles from './styles';

const image1 = require('@assets/monkey1.png');
const image2 = require('@assets/monkey2.png');

const carouselImages = [
  {
    id: 0,
    image: image1,
  },
  {
    id: 1,
    image: image2,
  },
];

const InitialSlider = () => (
  <View style={styles.container}>
    <Carousel data={carouselImages} />
  </View>
);

export default InitialSlider;
