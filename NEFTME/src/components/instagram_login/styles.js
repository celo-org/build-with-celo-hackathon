import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  instagramButton: {
    backgroundColor: '#fff',
    width: 252,
  },
  instagramIcon: {
    marginVertical: 10,
    marginRight: 8,
  },
  instagramButtonText: {
    fontWeight: '500',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(16, 15, 18, 0.8)',
    justifyContent: 'space-around',
  },
  activityIndicatorWrapper: {
    height: 70,
    width: 70,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  webView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 40,
    paddingHorizontal: 10,
  },
  wrapper: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 5,
    borderColor: 'rgba(0, 0, 0, 0.6)',
  },
  close: {
    position: 'absolute',
    top: 35,
    right: 5,
    backgroundColor: '#000',
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.4)',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  imageClose: {
    width: 30,
    height: 30,
  },
});
