import Constants from 'expo-constants';
import { getData } from './storage';

// eslint-disable-next-line import/prefer-default-export
export const getCategories = async () => {
  try {
    const response = await fetch(`${Constants.expoConfig.extra.apiUrl}/categories`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${await getData('auth_token')}`,
      },
    });

    if (response?.status !== 200) {
      return [];
    }

    return await response.json();
  } catch (err) {
    return [];
  }
};
