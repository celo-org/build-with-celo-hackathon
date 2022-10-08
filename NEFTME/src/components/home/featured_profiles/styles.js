import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  headerContainerStyle: {
    marginTop: 36,
    marginBottom: 24,
  },
  profilesList: {
    flexDirection: 'row',
    height: 203,
    width: '100%',
  },
  profilesListPlaceholder: {
    backgroundColor: '#232630',
    width: '100%',
    justifyContent: 'center',
  },
  profileItem: {
    width: 145,
    height: 203,
    backgroundColor: '#232630',
    marginRight: 11,
    borderRadius: 16,
  },
  profileItemHeaderImageWrapper: {
    width: 145,
    height: '50%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  profileItemHeaderImage: {
    width: 145,
    height: '50%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  profileItemName: {
    color: '#FCFCFC',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: '32%',
  },
  profileItemFollowers: {
    fontSize: 14,
    color: '#FCFCFC',
    opacity: 0.6,
    textAlign: 'center',
    marginTop: 8,
  },
  profileItemUserView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageContainer: {
    width: 67,
    height: 67,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 67,
    height: 67,
  },
  profileCoverImageGradient: {
    height: '100%',
  },
});
