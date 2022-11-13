import Constants from 'expo-constants';
import { getData } from '@services/storage';

const headers = async () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${await getData('auth_token')}`,
});

export const getAllNFTs = async () => {
  const response = await fetch(`${Constants.manifest.extra.apiUrl}/nft`, {
    method: 'GET',
    headers: await headers(),
  });

  if (response?.status !== 200) {
    throw new Error('Wrong status returned');
  }

  return response.json();
};

export const getNFTByTokenId = async (nftTokenID) => {
  const response = await fetch(`${Constants.manifest.extra.apiUrl}/nft/${nftTokenID}`, {
    method: 'GET',
    headers: await headers(),
  });

  if (response?.status !== 200) {
    throw new Error('Wrong status returned');
  }

  return response.json();
};
