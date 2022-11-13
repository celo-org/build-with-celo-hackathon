import Constants from 'expo-constants';
import { getData } from '../storage';

export const addComment = async (nftTokenId, comment) => {
  try {
    const response = await fetch(`${Constants.manifest.extra.apiUrl}/nft/${nftTokenId}/comment`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getData('auth_token')}`,
      },
      body: JSON.stringify({ comment }),
    });

    if (response?.status !== 200) {
      return false;
    }

    const body = await response.json();
    return body.success === true;
  } catch (err) {
    return false;
  }
};

export const addCommentLike = async (nftTokenId, commentId) => {
  try {
    const response = await fetch(`${Constants.manifest.extra.apiUrl}/nft/${nftTokenId}/comment/${commentId}/like`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getData('auth_token')}`,
      },
    });

    if (response?.status !== 200) {
      return false;
    }

    const body = await response.json();
    return body.success === true;
  } catch (err) {
    return false;
  }
};

export const removeCommentLike = async (nftTokenId, commentId) => {
  try {
    const response = await fetch(`${Constants.manifest.extra.apiUrl}/nft/${nftTokenId}/comment/${commentId}/like`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getData('auth_token')}`,
      },
    });

    if (response?.status !== 200) {
      return false;
    }

    const body = await response.json();
    return body.success === true;
  } catch (err) {
    return false;
  }
};
