import { colors } from '../../utils/globalStyles'
import { Dimensions, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#fff',
    height: '100%',
  },
  wrapSpinner: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 80,
  },
  circleFloat: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.lightGreen,
    position: 'absolute',
    bottom: 80,
    right: 10,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  btntFloat: {
    width: 250,
    marginBottom: 22,
    opacity: 0.8,
  },
  floatingBox: {
    position: 'absolute',
    top: 0,
    padding: 16,
    paddingBottom: 24,
    zIndex: 2,
    marginTop: 8,
    backgroundColor: colors.secondary,
    opacity: 0.8,
    borderRadius: 8,
    minWidth: Dimensions.get('window').width - 100,
  },
  floatingBoxEcostory: {
    position: 'absolute',
    top: 0,
    marginTop: 16,
  },
  boxText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  floatActions: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    marginTop: 12,
    fontWeight: '500',
    color: colors.secondary,
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardForm: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
  },
  formInput: {
    width: '100%',
    marginVertical: 12,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
  routeIcon: {
    backgroundColor: colors.secondary,
    paddingLeft: 5,
    paddingTop: 5,
    marginRight: 15,
    borderRadius: 10,
    width: 50,
    height: 50,
  },
  topButtons: {
    backgroundColor: '#fff',
    display: 'flex',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  mapTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  flex1: {
    flex: 1,
  },
  cameraIcons: { color: '#fff', fontSize: 40 },
  cameraButtons: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  buttonsCameraCont: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 30 },
  actionBtns: {
    color: '#fff',
    fontSize: 20,
  },
})
