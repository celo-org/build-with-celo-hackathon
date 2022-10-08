import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 56,
  },
  walletButton: {
    backgroundColor: '#fff',
    width: 252,
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  disabledButton: {
    opacity: 0.2,
  },
  noWalletButton: {
    backgroundColor: 'rgba(65, 65, 74, 0.4)',
    width: 252,
    marginTop: 24,
  },
  image: {
    width: 32,
    height: 32,
    marginVertical: 10,
    marginRight: 8,
  },
  walletButtonText: {
    fontWeight: '500',
    fontSize: 16,
  },
  noWalletButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  learMoreContainer: {
    marginTop: 16,
    flexDirection: 'row',
  },
  baseText: {
    fontSize: 14,
    fontWeight: '400',
  },
  newToWalletTxt: {
    color: 'rgba(255, 255, 255, 0.6)',
  },
  learnMoreTxt: {
    color: '#F6C138',
    marginLeft: 8,
  },
});
