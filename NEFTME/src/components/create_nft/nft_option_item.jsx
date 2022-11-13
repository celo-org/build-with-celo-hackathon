import React from 'react';
import PropTypes from 'prop-types';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginRight: 32,
  },
  item: {
    flex: 0,
    flexDirection: 'row',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '500',
    letterSpacing: 1.5,
  },
  alignCenter: {
    alignSelf: 'center',
    marginHorizontal: 6,
  },
  selected: {
    backgroundColor: '#F6C138',
    height: 2,
    width: '100%',
  },
});

const NFTOptionItem = ({
  index,
  item,
  selectedNFTOptionId,
  setSelectedNFTOption,
}) => (
  <View key={`icon_profile_${index}`} style={styles.container}>
    <TouchableOpacity
      style={styles.item}
      onPress={() => setSelectedNFTOption(item)}
    >
      <item.Icon
        width={item.width}
        height={item.height}
        style={styles.alignCenter}
      />
      <Text style={styles.itemName}>{item.name}</Text>
    </TouchableOpacity>
    {item.id === selectedNFTOptionId && <View style={styles.selected} />}
  </View>
);

NFTOptionItem.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  selectedNFTOptionId: PropTypes.string.isRequired,
  setSelectedNFTOption: PropTypes.func.isRequired,
};

export default NFTOptionItem;
