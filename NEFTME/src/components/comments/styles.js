import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  commentModal: {
    justifyContent: 'flex-end',
    margin: 0,
    paddingTop: Platform.OS === 'ios' ? 70 : 0,
  },
  actionModalView: {
    backgroundColor: '#2B2F3A',
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
  },
  header: {
    paddingTop: 32,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '400',
    marginRight: 60,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  commentsContainer: {
    marginTop: 24,
    marginBottom: 29,
    paddingHorizontal: 16,
  },
  commentcontainer: {
    flexDirection: 'row',
    paddingVertical: 20,

  },
  profileImageContainer: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePhoto: {
    width: 32,
    height: 32,
  },
  authorCommentContent: {
    paddingLeft: 16,
    flex: 1,
  },
  authorText: {
    color: 'rgba(255,255,255, 0.7)',
    fontSize: 12,
    fontWeight: '400',
    paddingBottom: 3,
  },
  commentText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '400',
  },
  commentContentWrapper: {
    flexDirection: 'row',
  },
  timeText: {
    paddingLeft: 4,
    color: '#C4C4C4',
    alignSelf: 'flex-end',
  },
  likesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalLikesText: {
    color: '#FFF',
    fontSize: 10,
    marginTop: 3,
  },
  commentPlaceholderContainer: {
    paddingVertical: 23,
    paddingHorizontal: 34,
    borderTopColor: '#D0D1D3',
    borderTopWidth: 0.2,
  },
  addCommentContainer: {
    backgroundColor: '#333747',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  profileImageCommentContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newCommentTextInput: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingBottom: 10,
    paddingTop: 10,
    fontSize: 14,
    marginHorizontal: 8,
    borderRadius: 8,
    paddingHorizontal: 8,
    textAlignVertical: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  creatorTextContainer: {
    backgroundColor: '#F6C138',
    borderRadius: 8,
    marginLeft: 15,
    paddingHorizontal: 4,
    paddingVertical: 1,
    justifyContent: 'center',
  },
  creatorText: {
    textTransform: 'uppercase',
    fontSize: 8,
    fontWeight: '700',
    color: '#2B2F3A',
  },
});
