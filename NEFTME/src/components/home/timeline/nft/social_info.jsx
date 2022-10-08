import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NFTPropTypes } from '@utils/proptypes';
import {
  Alert, Pressable, Text, TouchableOpacity, View,
} from 'react-native';
import { Loading } from '@library';
import CommentIcon from '@assets/icons/comment.svg';
import ShareIcon from '@assets/icons/share.svg';
import HeartIcon from '@assets/icons/heart.svg';
import HeartFilledIcon from '@assets/icons/heart_filled.svg';
import { addLike, removeLike } from '@services/nft_like';
import { fetchNFTByTokenID } from '@features/nft';
import CommentsModal from '@components/comments';
import styles from './styles';

const SocialInfo = ({ nft }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);

  const onLikePress = async () => {
    setIsLoading(true);
    if (nft.currentUserLike) {
      if (!await removeLike(nft.tokenId)) {
        Alert.alert('Something went wrong, please try again');
      }
    } else if (!await addLike(nft.tokenId)) {
      Alert.alert('Something went wrong, please try again');
    }
    dispatch(fetchNFTByTokenID({ tokenId: nft.tokenId, forceRefresh: true }));
    setIsLoading(false);
  };

  return (
    <View style={styles.detailsContainer}>
      <Loading visible={isLoading} />
      <View style={styles.iconTextContainer}>
        <Pressable style={styles.iconTextContainer} onPress={() => setShowCommentsModal(true)}>
          <CommentIcon width={18} height={17} />
          <Text style={styles.detailText}>{`${nft.comments.length} comments`}</Text>
        </Pressable>
        {showCommentsModal && (
          <CommentsModal
            comments={nft.comments}
            closeModal={() => setShowCommentsModal(false)}
            nftTokenId={nft.tokenId}
          />
        )}
      </View>
      <View style={[styles.iconTextContainer, styles.marginLeft16]}>
        <TouchableOpacity onPress={onLikePress}>
          {nft.currentUserLike
            ? <HeartFilledIcon width={18.34} heigth={16} />
            : <HeartIcon width={18.34} height={16} />}
        </TouchableOpacity>
        <Text style={styles.detailText}>{nft.likes}</Text>
      </View>
      <Pressable style={[styles.iconTextContainer, styles.shareContainer]} onPress={() => Alert.alert('Available soon')}>
        <Text style={styles.shareText}>Share</Text>
        <ShareIcon width={12.8} heigth={16} />
      </Pressable>
    </View>
  );
};

SocialInfo.propTypes = {
  // eslint-disable-next-line react/require-default-props
  nft: NFTPropTypes,
};

export default React.memo(SocialInfo);
