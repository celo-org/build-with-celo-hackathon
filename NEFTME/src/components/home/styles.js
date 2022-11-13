import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainView: {
    marginLeft: 16,
  },
  header: {
    flexDirection: 'row',
    marginRight: 18,
  },
  subHeaderRight: {
    flex: 0.5,
  },
  subHeaderLeftContainer: {
    flex: 0.5,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  subHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 130,
    height: 56,
  },
  bellIcon: {
    marginRight: 28,
  },
  notificationBadge: {
    backgroundColor: '#FD0025',
    width: 9,
    height: 9,
    position: 'absolute',
    borderRadius: 20,
    left: 15,
    top: -2,
  },
  profilePhoto: {
    width: 48,
    height: 48,
  },
  profileImageContainer: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePhotoPlaceholder: {
    backgroundColor: '#232630',
    width: 48,
    height: 48,
    borderRadius: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonClose: {
    alignSelf: 'flex-end',
    paddingTop: 10,
    paddingRight: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
  },
});
