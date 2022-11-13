import React from 'react';
import PropTypes from 'prop-types';
import {
  Pressable, StyleSheet, Text, View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginRight: 30,
  },
  item: {
    flexDirection: 'row',
  },
  itemName: {
    fontSize: 15,
    fontWeight: '400',
    color: '#FFFFFF',
    marginRight: 8,
  },
  selected: {
    backgroundColor: '#F6C138',
    height: 4,
    width: '100%',
    marginTop: 12.5,
  },
});

const CarouselItem = ({
  index, item, selectedCategory, setSelectedCategory,
}) => (
  <View key={`icon_profile_${index}`} style={styles.container}>
    <Pressable style={styles.item} onPress={() => setSelectedCategory(item.id)}>
      <Text style={styles.itemName}>{item.name}</Text>
      <item.Icon width={item.width} height={item.height} />
    </Pressable>
    {item.id === selectedCategory && <View style={styles.selected} />}
  </View>
);

CarouselItem.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
};

export default React.memo(CarouselItem);
