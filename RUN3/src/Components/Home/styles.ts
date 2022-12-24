import { colors } from '../../utils/globalStyles'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  celoLogo: {
    height: 50,
    padding: 33,
    width: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  btnItem: {
    width: 110,
  },
  wrapper: { backgroundColor: '#fff', flex: 1, justifyContent: 'space-between', paddingTop: 20 },
  refreshBtn: {
    marginBottom: 40,
    width: '70%',
    alignSelf: 'center',
  },
})
