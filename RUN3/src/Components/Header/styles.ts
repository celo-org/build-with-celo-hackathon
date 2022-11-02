import { colors } from '../../utils/globalStyles'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logOut: {
    right: 50,
    color: colors.secondary,
  },
})
