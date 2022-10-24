import { colors } from '../../utils/globalStyles'
import { Dimensions, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#fff',
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
    bottom: 10,
    right: 10,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  btntFloat: {
    width: 250,
    marginBottom: 22,
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
    maxWidth: '95%',
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
})
