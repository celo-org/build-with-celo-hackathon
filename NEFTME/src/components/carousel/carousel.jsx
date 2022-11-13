import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Animated, Dimensions, FlatList, View,
} from 'react-native';
import CarouselItem from './carousel_item';
import Indicator from './indicator';
import styles from './styles';

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = width * 0.65;

const Carousel = ({ data }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [dataWithPlaceholders, setDataWithPlaceholders] = useState([]);
  const [currentTest, setCurrentTest] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    setDataWithPlaceholders([{ id: -1 }, ...data, { id: data.length }]);
    setCurrentTest(1);
  }, [data]);

  const handleOnViewableItemsChanged = ({ viewableItems }) => {
    const itemsInView = viewableItems.filter(({ item }) => item.image);

    if (itemsInView.length === 0) {
      return;
    }

    setCurrentTest(itemsInView[0].index);
  };

  const getItemLayout = (_data, index) => ({
    length: IMAGE_WIDTH,
    offset: IMAGE_WIDTH * (index - 1),
    index,
  });

  const viewabilityConfigCallbackPairs = useRef([{
    viewabilityConfig: {
      itemVisiblePercentThreshold: 50,
    },
    onViewableItemsChanged: handleOnViewableItemsChanged,
  }]);

  const updateCurrentIndex = (index) => {
    if (flatListRef?.current) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index,
      });
      setCurrentTest(index);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={dataWithPlaceholders}
        renderItem={({ item, index }) => (
          <CarouselItem item={item} index={index} scrollX={scrollX} />
        )}
        getItemLayout={getItemLayout}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        bounces={false}
        decelerationRate={0}
        renderToHardwareTextureAndroid
        contentContainerStyle={styles.flatListContent}
        snapToInterval={IMAGE_WIDTH}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
      <View style={styles.footer}>
        <Indicator
          data={dataWithPlaceholders}
          currentIndex={currentTest}
          setCurrentIndex={updateCurrentIndex}
        />
      </View>
    </View>
  );
};

Carousel.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.number.isRequired,
  })).isRequired,
};

export default Carousel;
