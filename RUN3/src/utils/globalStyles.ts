//import { JustifySelf } from './../../my-app/node_modules/csstype/index.d';
import { StyleSheet } from 'react-native'

export const colors = {
  primary: '#1ECAD3',
  secondary: '#002B49',
  lightBlue: '#E5FFF9',
  lightGreen: '#00FFC2',
  yellow: '#FCFF6C',
  subtitles: '#444444',
}

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryColor: {
    color: colors.primary,
  },
  secondaryColor: {
    color: colors.secondary,
  },
  lightBlueColor: {
    color: colors.lightBlue,
  },
  lightGreenColor: {
    color: colors.lightGreen,
  },
  yellowColor: {
    color: colors.yellow,
  },
  subtitlesColor: {
    color: colors.subtitles,
  },
  primaryBg: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  secondaryBg: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  lightBlueBg: {
    backgroundColor: colors.lightBlue,
  },
  lightGreenBg: {
    backgroundColor: colors.lightGreen,
    borderColor: colors.lightGreen,
  },
  yellowBg: {
    backgroundColor: colors.yellow,
  },
  subtittlesBg: {
    backgroundColor: colors.subtitles,
  },
})
