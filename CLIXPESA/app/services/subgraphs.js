import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { GraphQLClient, gql } from 'graphql-request'

export const client = new GraphQLClient(
  'https://api.thegraph.com/subgraphs/name/kachdekan/clixpesa-celo',
)

export const subgraphsApi = createApi({
  reducerPath: 'subgraphsApi',
  baseQuery: graphqlRequestBaseQuery({ client }),
  endpoints: (builder) => ({
    //Loans
    getUserLoans: builder.query({
      query: (addr) => ({
        document: gql`
        query GetUserLoans {
          user(id: "${addr}") {
            loans {
            name
            loan {
              id
              principal
              balance
              paid
              dueDate
              parties{
                user{
                  id
                }
              }
            }
            lender}
          }
        }
        `,
      }),
    }),
  }),
})

export const { useGetUserLoansQuery } = subgraphsApi
