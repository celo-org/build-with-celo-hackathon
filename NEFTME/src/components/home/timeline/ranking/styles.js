import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  rankingContainer: {
    marginBottom: 32,
  },
  headerStyle: {
    marginTop: -8,
    marginBottom: 6,
  },
  rakingItemContainer: {
    marginTop: 10,
    backgroundColor: '#232630',
    borderRadius: 16,
    marginRight: 16,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  rankText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 32,
  },
  rankProfilePhoto: {
    width: 48,
    height: 48,
    borderRadius: 60,
    marginHorizontal: 16,
  },
  itemNameText: {
    color: '#FCFCFC',
    fontWeight: '700',
    fontSize: 18,
  },
  stakeContainer: {
    flexDirection: 'row',
    marginTop: 3,
  },
  itemStakedText: {
    marginLeft: 4,
    color: '#FCFCFC87',
    fontWeight: '700',
    fontSize: 14,
  },
});
