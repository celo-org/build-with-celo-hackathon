import Constants from 'expo-constants';
import { convertToNFTAmount } from '@utils/nft';
import { getData } from './storage';

const postAPINFT = async (nft) => {
  try {
    const filename = nft.resource.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : 'image';

    const formData = new FormData();
    formData.append('description', nft.description);
    formData.append('communityPercentage', nft.communityPercentage);
    formData.append('resource', { uri: nft.resource, name: filename, type });
    formData.append('resource_type', Constants.expoConfig.extra.mediaType.image);

    const response = await fetch(`${Constants.expoConfig.extra.apiUrl}/nft`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${await getData('auth_token')}`,
      },
    });

    if (response?.status !== 200) return null;

    return response.json();
  } catch (err) {
    return null;
  }
};

const bindTokenId = async (id, tokenId) => {
  const response = await fetch(`${Constants.expoConfig.extra.apiUrl}/nft/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ tokenId }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${await getData('auth_token')}`,
    },
  });

  if (response?.status !== 200) return false;

  return true;
};

const deleteAPINFT = async (id) => {
  const response = await fetch(`${Constants.expoConfig.extra.apiUrl}/nft/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${await getData('auth_token')}`,
    },
  });

  if (response?.status !== 200) return false;

  return true;
};

// eslint-disable-next-line import/prefer-default-export
export const mintNFT = async (contractMethods, nft, walletAddress) => {
  // Create NFT API;
  const apiNFT = await postAPINFT(nft);
  if (apiNFT === null) {
    return Promise.resolve({
      success: false,
      error: 'Error creating NFT on NEFTME API',
    });
  }

  // Mint NFT
  return contractMethods.mint(
    walletAddress,
    apiNFT.url,
    convertToNFTAmount(nft.communityPercentage),
  ).send({ from: walletAddress })
    .then(async (receipt) => {
      const tokenId = receipt?.events?.Transfer?.returnValues?.tokenId;
      if (tokenId === undefined) {
        throw new Error('Returned tokenId is undefined');
      } else {
        // Update apiNFT tokenId
        try {
          await bindTokenId(apiNFT.id, tokenId);
          return ({
            ...apiNFT,
            success: true,
          });
        } catch (error) {
          throw new Error('Error binding tokenId to API NFT');
        }
      }
    })
    .catch((error) => deleteAPINFT(apiNFT.id)
      .then(() => ({
        success: false,
        error,
      })));
};
