//import { JustifySelf } from './../../my-app/node_modules/csstype/index.d';
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  signBtn: {
    width: '90%',
  },
  signBtnText: {
    marginTop: 'auto',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    width: '100%',
    resizeMode: 'contain',
  },
})
