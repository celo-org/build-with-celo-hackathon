import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
  },
  inputSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#41414A',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 45,
    borderRadius: 10,
    margin: 10,
  },
  imageIconSearch: {
    padding: 10,
    margin: 10,
    height: 20,
    width: 20,
    resizeMode: 'stretch',
    alignItems: 'center',
    color: 'white'
  },
  headerContainerStyle: {
    marginTop: 36,
    marginBottom: 24,
    marginLeft: 20,  
  },
  profilesList: {
    flexDirection: 'row',
    height: 240,
    width: '100%',
    marginLeft: 20,
  },
  profilesListPlaceholder: {
    backgroundColor: '#232630',
    width: '100%',
    justifyContent: 'center',
  },
  trendingItem: {
    width: 145,
    height: 240,
    backgroundColor: '#232630',
    marginRight: 11,
    borderRadius: 16,
  },
  trendingItemImage: {
    height: '50%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  trendingTitle: {
    color: '#FCFCFC',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 5,
  },
  imageTrendingStyle: {
    width: '100%',
    height: '100%',
    marginTop: 0,
  },
  trendingItemStaked: {
    margin: 10,
    marginTop: 14,
    borderRadius: 4,
    borderColor: '#F6C138',
    borderWidth: 1,
  },
  trendingTextStaked: {
    color: '#FCFCFC',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
  trendingTextSupporters: {
    color: '#FCFCFC',
    fontSize: 10,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 10,
  },
});
