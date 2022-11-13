import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Constants from 'expo-constants';
import { getData } from '@services/storage';

const baseQuery = async (args, api, extraOptions) => {
  const authToken = await getData('auth_token');
  if (!authToken) {
    return {
      error: {
        originalStatus: 403,
      },
    };
  }

  return fetchBaseQuery({
    baseUrl: Constants.manifest.extra.apiUrl,
    prepareHeaders: async (headers) => {
      headers.set('authorization', `Bearer ${authToken}`);
      headers.set('accept', 'application/json');
      return headers;
    },
  })(args, api, extraOptions);
};

// eslint-disable-next-line import/prefer-default-export
export const api = createApi({
  reducerPath: 'baseApi',
  baseQuery,
  endpoints: () => ({}),
});
