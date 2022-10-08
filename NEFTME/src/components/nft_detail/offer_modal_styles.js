import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  stakeModal: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  topBar: {
    marginHorizontal: 120,
    marginBottom: 10,
    height: 5,
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  insideAcceptDenyModalImage: {
    width: 68,
    height: 68,
    marginLeft: 8,
    marginRight: 20,
    marginBottom: 20,
  },
  stakeModalView: {
    backgroundColor: '#2C2C39',
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 18,
  },
  stakeTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  stakeContainer: {
    backgroundColor: '#41414A',
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  neftAmountText: {
    fontSize: 56,
    marginTop: 30,
    color: '#FFF',
    letterSpacing: 1,
  },
  availableNeftText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFF',
    marginTop: 32,
    marginBottom: 30,
  },
  percentageButtonsContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  stakePercentageButton: {
    flex: 0.25,
  },
  stakePercentageButtonMargin: {
    marginLeft: 16,
  },
  stakeButtonsActionContainer: {
    flexDirection: 'column',
    marginTop: 32,
  },
  acceptDenyContainer: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  reviewBox: {
    flexDirection: 'row',
    marginBottom: 8,
    borderRadius: 16,
    alignItems: 'center',
  },
  offerAndAmountBox: {
    flexDirection: 'row',
    marginBottom: 8,
    borderRadius: 16,
    alignItems: 'center',
  },
  description: {
    color: '#FCFCFC',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0.75,
    paddingTop: 10,
  },
  image: {
    width: 68,
    height: 68,
    marginTop: 8,
    marginLeft: 8,
    marginRight: 20,
    marginBottom: 8,
  },
  itemContainer: {
    backgroundColor: '#2B2F3A',
    flexDirection: 'row',
    marginBottom: 8,
    borderRadius: 16,
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: 'rgba(105, 210, 88, 1)',
    fontWeight: '700',
    fontSize: 16,
    alignContent: 'center',
  },
  denyButton: {
    backgroundColor: 'rgba(252, 84, 73, 1)',
  },
  acceptDenyText: {
    color: 'rgba(34, 34, 43, 1)',
    fontWeight: '700',
    fontSize: 16,
    alignContent: 'center',
  },
  stakeButtonAction: {
    flex: 0.5,
  },
  unstakeButtonAction: {
    flex: 1,
  },
  marginLeft10: {
    marginLeft: 10,
  },
  approveAcceptRow: {
    display: 'flex',
    flexGrow: 1,
  },
});
