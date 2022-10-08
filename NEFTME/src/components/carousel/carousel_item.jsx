import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated, Dimensions, Image, View,
} from 'react-native';
import styles from './styles';

const { width } = Dimensions.get('window');

const IMAGE_WIDTH = width * 0.65;
const CURRENT_ITEM_TRANSLATE_Y = 10;

const CarouselItem = ({ item, index, scrollX }) => {
  if (!item.image) {
    return null;
  }

  const inputRange = [
    (index - 2) * IMAGE_WIDTH,
    (index - 1) * IMAGE_WIDTH,
    index * IMAGE_WIDTH,
  ];

  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [
      CURRENT_ITEM_TRANSLATE_Y * 2,
      CURRENT_ITEM_TRANSLATE_Y,
      CURRENT_ITEM_TRANSLATE_Y * 2,
    ],
    extrapolate: 'clamp',
  });

  return (
    <View style={{ width: IMAGE_WIDTH }}>
      <Animated.View
        style={[
          {
            transform: [{ translateY }],
          },
          styles.itemContent,
        ]}
      >
        <Image source={item.image} style={styles.itemImage} />
      </Animated.View>
    </View>
  );
};

CarouselItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
  scrollX: PropTypes.shape({
    interpolate: PropTypes.func.isRequired,
  }).isRequired,
};

export default CarouselItem;
