import { StyleSheet } from 'react-native';
import { COLORS } from './colors';
import { Platform } from 'react-native';
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  button: {
    borderRadius: 30
  },
  buttonGrey: {
    borderRadius: 30,
    backgroundColor: '#27292A',
    borderColor: '#27292A',
  },
  singleButton: {
    marginVertical: 2,
    width: '50%',
    borderRadius: 30
  },
  doubleButton: {
    marginVertical: 2,
    width: '45.45%',
    borderRadius: 30
  },
  card: {
    borderRadius: 20,
    backgroundColor: '#1F2122',
    borderColor: '#090E13',
    borderWidth: 1,
    padding: 5
  },
  outerCard: {
    borderRadius: 20,
    backgroundColor: '#1F2122',
    borderColor: '#090E13',
    borderWidth: 1,
    padding: 10
  },
  innerCard: {
    borderRadius: 15,
    backgroundColor: '#1F2122',
    borderColor: '#090E13',
    borderWidth: 1,
    padding: 20
  },
  rowButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 'auto'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerBarStyle: {
    backgroundColor: '#1d2023'
  },
  pageView: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#212427',
  },
  pageContent: {
    marginHorizontal: '4%',
    ...Platform.select({
      ios: {
        height: windowHeight - 180,
      },
      android: {
        height: windowHeight - 180,
      },
    }),
  },
  input: {
    flex: 1,
    margin: 4,
    borderWidth: 0,
    backgroundColor: '#212427',
    borderRadius: 16,
  },
  inputLabel: {
    color: '#9e9e9e',
    fontWeight: 'bold'
  },
  pageViewWithPadding: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlack,
    paddingHorizontal: '4%',
  },
  subScreenView: {
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.primaryBlack,
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.gradientPrimary,
    borderRadius: 24,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    shadowColor: COLORS.robinsEggBlue,
  },
  inputStyle: {
    height: 40,
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: COLORS.secondaryWhite,
    borderRadius: 16,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    shadowColor: COLORS.robinsEggBlue,
  },
  primaryButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 24,
    backgroundColor: COLORS.robinsEggBlue,
    borderRadius: 16,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    shadowColor: COLORS.primaryWhite,
  },
  primaryText: {
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 8,
    color: '#000',
  },
  primaryTextBlue: {
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 8,
    color: '#00C8BA',
  },
  secondaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
    color: '#fff',
  },
  secondaryTextBlue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
    color: '#00C8BA',
  },
  secondaryTextBlack: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
    color: '#000',
  },
  secondaryTextGrey: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
    color: '#6B6E77',
  },
  activeText: {
    textDecorationLine: 'underline',
    color: '#008bdb',
  },
  tertiaryText: {
    fontSize: 15,
    fontWeight: '500',
    marginVertical: 4,
    color: '#000',
  },
  tertiaryTextWhite: {
    fontSize: 15,
    fontWeight: '500',
    marginVertical: 4,
    color: '#fff',
  },
  smallText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  dividerStyle: {
    width: '100%',
    height: 1,
    backgroundColor: '#fff',
  },
  primaryTextOrange: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 4,
    color: '#E4C2A6',
  },
  secondaryTextOrange: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
    color: '#E4C2A6',
  },
  tertiaryTextOrange: {
    fontSize: 12,
    color: '#E4C2A6',
  },
  tertiaryTextGreen: {
    color: '#29A47E'
  },
  tertiaryTextRed: {
    color: '#C16068'
  },
  primaryTextGreen: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 4,
    color: '#609661',
  },
  primaryTextRed: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 4,
    color: '#C16068',
  },
  smallTextRed: {
    fontSize: 10,
    fontWeight: 'bold',
    marginHorizontal: 2,
    color: '#C16068',
  },
  primaryTextWhite: {
    fontSize: 23,
    fontWeight: 'bold',
    marginVertical: 2,
    color: '#ffffff',
  },
  tertiaryTextGrey: {
    fontSize: 12,
    marginVertical: 1,
    color: '#6B6E77',
  },
  tertiaryTextBlack: {
    fontSize: 15,
    marginVertical: 1,
    color: '#000000',
  },
  secondaryTextWhite: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
    color: '#FFFFFF',
  },
  primaryTextBlack: {
    fontSize: 23,
    fontWeight: 'bold',
    marginVertical: 2,
    color: 'rgba(0,0,0,0.5)',
  },
  warningContainer: {
    backgroundColor: 'rgba(255, 247, 171, 0.15)',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3
  },
  warningText: {
    color: 'rgb(255, 247, 171)'
  },
  linkText: {
    color: 'rgb(255, 247, 171)',
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  }
});
