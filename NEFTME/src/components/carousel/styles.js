import { Dimensions, StyleSheet } from 'react-native';

const { height } = Dimensions.get('window');

const IMAGE_HEIGHT = height * 0.40;
const CURRENT_ITEM_TRANSLATE_Y = 10;
const SPACING = 3;

export default StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  flatListContent: {
    height: CURRENT_ITEM_TRANSLATE_Y * 2 + IMAGE_HEIGHT,
    alignItems: 'center',
    marginBottom: CURRENT_ITEM_TRANSLATE_Y,
  },
  itemContent: {
    marginHorizontal: SPACING * 3,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  itemImage: {
    width: '100%',
    height: IMAGE_HEIGHT,
    resizeMode: 'cover',
  },
  indicatorView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIndicatorStyle: {
    height: 22,
    width: 22,
    borderRadius: 100,
    backgroundColor: '#5E4040',
    margin: 5,
  },
  inActiveIndicatorStyle: {
    height: 22,
    width: 22,
    borderRadius: 100,
    backgroundColor: '#C4C4C4',
    margin: 5,
  },
});
