import { api } from './api';

const baseApiWithTag = api.enhanceEndpoints({
  addTagTypes: ['CurrentUser'],
});

export const currentUserApi = baseApiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => '/me',
      providesTags: ['CurrentUser'],
    }),
    updateCurrentUser: builder.mutation({
      query: (data) => ({
        url: '/me',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['CurrentUser'],
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
  useUpdateCurrentUserMutation,
} = currentUserApi;
