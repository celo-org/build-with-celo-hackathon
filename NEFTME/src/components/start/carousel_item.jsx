import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { height, width } = Dimensions.get('window');
const slideWidth = width * 0.65;
const slideHeight = height * 0.60;

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: slideWidth,
    height: slideHeight,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 19,
    fontWeight: '600',
    lineHeight: 30,
    color: '#FFF',
    textAlign: 'center',
  },
});

const CarouselItem = ({ item }) => (
  <View style={styles.imageContainer}>
    <Image style={styles.image} source={item.image} resizeMode="contain" />
    <View style={{
      width: slideWidth, paddingHorizontal: 16, alignItems: 'center', marginTop: 12,
    }}
    >
      <Text style={styles.text}>{item.desc}</Text>
    </View>
  </View>
);

CarouselItem.defaultProps = {
  item: {},
};

CarouselItem.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.number,
    desc: PropTypes.string,
  }),
};

export default CarouselItem;
