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
