import React from 'react';
import PropTypes from 'prop-types';
import {
  Pressable, StyleSheet, Text, View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginRight: 32,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '400',
    marginRight: 8,
    letterSpacing: 1,
  },
  alignCenter: {
    alignSelf: 'center',
  },
  selected: {
    backgroundColor: '#F6C138',
    height: 2,
    width: '100%',
  },
});

const CategoryItem = ({
  index, item, selectedCategoryId, setSelectedCategory,
}) => (
  <View key={`icon_profile_${index}`} style={styles.container}>
    <Pressable style={styles.item} onPress={() => setSelectedCategory(item)}>
      <Text style={styles.itemName}>{item.name}</Text>
      <item.Icon width={item.width} height={item.height} style={styles.alignCenter} />
    </Pressable>
    {item.id === selectedCategoryId && <View style={styles.selected} />}
  </View>
);

CategoryItem.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  selectedCategoryId: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
};

export default CategoryItem;
