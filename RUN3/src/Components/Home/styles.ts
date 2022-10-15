import { colors } from '../../utils/globalStyles'
//import { JustifySelf } from './../../my-app/node_modules/csstype/index.d';
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
  wrapper: { backgroundColor: '#fff', flex: 1, justifyContent: 'space-between' },
  refreshBtn: {
    marginBottom: 40,
    width: '70%',
    alignSelf: 'center',
  },
})
