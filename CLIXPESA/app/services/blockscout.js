import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { config } from 'clixpesa/blockchain/configs/celo.config'

// Define a service using a base URL and expected endpoints
export const blockscoutApi = createApi({
  reducerPath: 'blockscoutApi',
  baseQuery: fetchBaseQuery({ baseUrl: config.blockscoutUrl + '/api' }),
  endpoints: (builder) => ({
    //Account
    getTxsByAddr: builder.query({
      query: (addr) => `?module=account&action=txlist&address=${addr}`,
    }),
    getTokenTransfers: builder.query({
      query: (addr) => `?module=account&action=tokentx&address=${addr}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTxsByAddrQuery, useGetTokenTransfersQuery } = blockscoutApi
