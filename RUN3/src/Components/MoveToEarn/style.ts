import { colors } from '../../utils/globalStyles'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  stepsView: {
    marginTop: 30,
  },
  stepsLabel: {
    flexDirection: 'row',
    width: 120,
    justifyContent: 'center',
  },
  stepsText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 24,
    marginTop: 10,
    color: colors.secondary,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 12,
    color: colors.secondary,
  },
  runnerBox: {
    borderRadius: 40,
    padding: 8,
    zIndex: 2,
    top: 50,
    backgroundColor: colors.primary,
  },
  okBtn: {
    width: '70%',
    bottom: 20,
    zIndex: 2,
  },
  pedBox: { flexDirection: 'row', alignItems: 'flex-end' },
  pedStatus: { fontSize: 20, fontWeight: '400', marginTop: 12, marginRight: 5 },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: 'red',
    bottom: 3,
  },
  loading: { fontSize: 22, fontWeight: '600', color: colors.secondary },
  congratsMsg: {
    fontWeight: 'bold',
    width: 280,
    fontSize: 22,
    color: colors.yellow,
    textAlign: 'center',
  },
  circleText: {
    fontSize: 30,
    fontWeight: '400',
    color: colors.secondary,
    textAlign: 'center',
  },
  btnRewards: {
    marginTop: 16,
  },
})
