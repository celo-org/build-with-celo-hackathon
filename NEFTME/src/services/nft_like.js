import Constants from 'expo-constants';
import { getData } from './storage';

export const addLike = async (nftId) => {
  try {
    const response = await fetch(`${Constants.manifest.extra.apiUrl}/nft/${nftId}/like`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${await getData('auth_token')}`,
      },
    });

    if (response?.status !== 201) return false;

    return true;
  } catch (err) {
    return false;
  }
};

export const removeLike = async (nftId) => {
  try {
    const response = await fetch(`${Constants.manifest.extra.apiUrl}/nft/${nftId}/like`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${await getData('auth_token')}`,
      },
    });

    if (response?.status !== 204) return false;

    return true;
  } catch (err) {
    return false;
  }
};
