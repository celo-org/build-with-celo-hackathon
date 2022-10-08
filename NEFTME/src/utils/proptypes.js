import PropTypes from 'prop-types';

export const ProfileDataDefaultProps = {
  bio: '',
  profileImage: '',
  walletAddress: '',
};

export const ProfileDataPropTypes = PropTypes.shape({
  bio: PropTypes.string,
  id: PropTypes.number.isRequired,
  isCurrentUserFollowing: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  profileColor: PropTypes.string.isRequired,
  profileImage: PropTypes.string,
  totalFollowers: PropTypes.string.isRequired,
  totalFollowing: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  walletAddress: PropTypes.string,
}).isRequired;

export const NFTCommentPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  isNftCreator: PropTypes.bool.isRequired,
  authorProfileImage: PropTypes.string.isRequired,
  authorProfileColor: PropTypes.string.isRequired,
  totalLikes: PropTypes.number.isRequired,
  currentUserLikes: PropTypes.bool.isRequired,
  date: PropTypes.string.isRequired,
}).isRequired;

export const NFTCommentsPropTypes = PropTypes.arrayOf(NFTCommentPropTypes).isRequired;

export const NFTPropTypes = PropTypes.shape({
  comments: NFTCommentsPropTypes,
  currentUserLike: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  followers: PropTypes.number.isRequired,
  resource: PropTypes.string.isRequired,
  resource_type: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  profileColor: PropTypes.string.isRequired,
  profilePhoto: PropTypes.string,
  profitPercentage: PropTypes.string.isRequired,
  tokenId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}).isRequired;
