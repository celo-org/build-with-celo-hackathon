import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  FlatList, StyleSheet, Text, View,
} from 'react-native';
import categories from './categories';
import CategoryItem from './category_item';
import NftItem from './nft_item';

const styles = StyleSheet.create({
  menuContainer: {
    marginTop: 24,
    marginLeft: 16,
    flexDirection: 'row',
  },
  horizontalBar: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 16,
    flex: 1,
  },
  descriptionText: {
    fontWeight: '400',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.71)',
    marginTop: 29,
    marginHorizontal: 16,
  },
  listContainer: {
    marginTop: 26,
    marginBottom: 10,
    marginHorizontal: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

const NftsList = ({ myProfile, name, nfts }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const userCategories = Array.from(categories);

  if (!myProfile) userCategories.splice(-1, 1);

  return (
    <>
      <View style={styles.menuContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={userCategories}
          renderItem={({ item, index }) => (
            <CategoryItem
              key={`icon_profile_${index}`}
              item={item}
              index={index}
              selectedCategoryId={selectedCategory.id}
              setSelectedCategory={setSelectedCategory}
            />
          )}
        />
      </View>
      <View style={styles.horizontalBar} />
      <Text style={styles.descriptionText}>
        {selectedCategory.description(myProfile ? 'you' : name)}
      </Text>
      <View style={styles.listContainer}>
        {nfts[selectedCategory.id]?.map((nft) => <NftItem nft={nft} key={`nft_${selectedCategory.id}_item_${nft[0]}`} />)}
      </View>
    </>
  );
};

NftsList.defaultProps = {
  myProfile: false,
  name: '',
};

NftsList.propTypes = {
  name: PropTypes.string,
  myProfile: PropTypes.bool,
  nfts: PropTypes.shape({
    created: PropTypes.arrayOf(PropTypes.array),
  }).isRequired,
};

export default NftsList;
