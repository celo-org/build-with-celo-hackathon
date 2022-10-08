import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  profileContainer: {
    position: 'absolute',
    top: 180,
    marginHorizontal: 16,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  profilePicture: {
    borderWidth: 3,
    borderColor: '#222222',
  },
  followsContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 96,
    marginHorizontal: 16,
  },
  followers: {
    marginRight: 16,
    flexDirection: 'row',
  },
  amount: {
    color: '#FCFCFC',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 18,
  },
  followLabel: {
    color: '#FFFFFF',
    opacity: 0.6,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
    marginLeft: 4,
    alignSelf: 'center',
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  usernameWalletView: {
    marginTop: 4,
    alignItems: 'center',
  },
  nameWalletContainer: {
    marginTop: 32,
    marginHorizontal: 16,
  },
  name: {
    fontWeight: '700',
    fontSize: 26,
    color: '#FCFCFC',
  },
  nameSubtext: {
    fontWeight: '400',
    fontSize: 14,
    textTransform: 'lowercase',
    color: '#FFFFFF',
  },
  separatorText: {
    color: '#FCFCFC',
    fontWeight: '600',
    lineHeight: 0,
    marginHorizontal: 8,
    top: -3,
  },
  walletAddress: {
    fontWeight: '400',
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.7,
    marginRight: 4,
  },

  bioContainer: {
    marginTop: 20,
    marginHorizontal: 16,
  },
  profileImageContainer: {
    padding: 24,
  },
  profileImageStyles: {
    width: 116,
    height: 116,
    borderWidth: 4,
    borderColor: '#2C2C39',
  },
});
