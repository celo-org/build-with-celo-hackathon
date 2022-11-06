import Constants from 'expo-constants';
import { setData, getData } from './storage';

export const doLogin = async (email, password) => {
  try {
    const response = await fetch(`${Constants.expoConfig.extra.apiUrl}/session`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response?.status !== 201) {
      return {
        success: false,
      };
    }
    const body = await response.json();
    await setData('newUser', 'true');
    return {
      success: await setData('auth_token', body.token),
    };
  } catch (err) {
    return {
      success: false,
    };
  }
};

export const doLogout = async () => {
  try {
    const response = await fetch(`${Constants.expoConfig.extra.apiUrl}/session`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${await getData('auth_token')}`,
      },
    });

    if (response?.status !== 200) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
};

export const doInstagramLogin = async (code) => {
  try {
    const response = await fetch(`${Constants.expoConfig.extra.apiUrl}/instagram_oauth`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ code }),
    });

    if (response?.status !== 200) {
      return {
        success: false,
      };
    }
    const body = await response.json();
    return {
      success: await setData('auth_token', body.token),
      newUser: await setData('newUser', String(body.newUser)),
    };
  } catch (err) {
    return {
      success: false,
    };
  }
};
