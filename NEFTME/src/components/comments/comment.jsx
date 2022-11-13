import React from 'react';
import PropTypes from 'prop-types';
import { NFTCommentPropTypes } from '@utils/proptypes';
import {
  Alert, Pressable, Text, View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import TimeAgo from 'javascript-time-ago';
import { fetchNFTByTokenID } from '@features/nft';
import { ProfileImage } from '@library';
import HeartIcon from '@assets/icons/heart.svg';
import FilledHeartIcon from '@assets/icons/heart_filled.svg';
import { abbreviateNumber } from '@utils/numbers';
import { addCommentLike, removeCommentLike } from '@services/nft/nft_comment';
import styles from './styles';

const Comment = ({ comment, nftTokenId, setIsLoading }) => {
  const dispatch = useDispatch();
  const timeAgo = new TimeAgo('en-US');
  const onHeartPress = async () => {
    setIsLoading(true);
    const result = comment.currentUserLikes
      ? await removeCommentLike(nftTokenId, comment.id)
      : await addCommentLike(nftTokenId, comment.id);

    setTimeout(() => setIsLoading(false), 500);
    if (result) {
      dispatch(fetchNFTByTokenID({ tokenId: nftTokenId, forceRefresh: true }));
    } else {
      Alert.alert('Error', 'Something went wrong. Please try again');
    }
  };

  return (
    <View style={styles.commentcontainer}>
      <ProfileImage
        profileImage={comment.authorProfileImage}
        containerStyle={{
          ...styles.profileImageContainer,
          backgroundColor: comment.authorProfileColor,
        }}
        imageStyle={styles.profilePhoto}
        avatarWidth={18}
        avatarHeight={18}
      />
      <View style={styles.authorCommentContent}>
        <View style={styles.flexDirectionRow}>
          <Text style={styles.authorText}>{comment.author}</Text>
          {comment.isNftCreator && (
            <View style={styles.creatorTextContainer}>
              <Text style={styles.creatorText}>creator</Text>
            </View>
          )}
        </View>
        <View style={styles.commentContentWrapper}>
          <Text style={styles.commentText}>
            {comment.comment}
            {' '}
            <Text style={styles.timeText}>{timeAgo.format(new Date(comment.date), 'twitter')}</Text>
          </Text>
        </View>
      </View>
      <View style={styles.likesContainer}>
        <Pressable onPress={onHeartPress}>
          {comment.currentUserLikes ? (
            <FilledHeartIcon width={14} height={12} />
          ) : <HeartIcon width={14} height={12} />}
        </Pressable>
        <Text style={styles.totalLikesText}>
          {
            comment.totalLikes > 999
              ? abbreviateNumber(comment.totalLikes, true) : comment.totalLikes
          }
        </Text>
      </View>
    </View>
  );
};

Comment.propTypes = {
  // eslint-disable-next-line react/require-default-props
  comment: NFTCommentPropTypes,
  nftTokenId: PropTypes.string.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

export default Comment;
