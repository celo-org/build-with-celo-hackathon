import { Box, Button, FlatList, Stack, VStack, Spacer } from 'native-base'
import { LoanItem } from 'clixpesa/components'

import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { utils } from 'ethers'
import celoHelper from '../../blockchain/helpers/celoHelper'
import { fetchOffers } from './loansSlice'

export default function LoanOffersScreen({ navigation }) {
  const dispatch = useDispatch()
  const offers = useSelector((s) => s.loans.allOffers)
  useEffect(() => {
    if (offers.length < 1) {
      console.log('fetching')
      dispatch(fetchOffers())
    }
  }, [])

  return (
    <Box flex={1} bg="#F5F5F5" alignItems="center">
      <VStack width="95%" space={3}>
        <Stack>
          <FlatList
            mt={2}
            data={offers}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <Box
                bg="white"
                opacity={85}
                mt={1}
                roundedTop={index == 0 ? '2xl' : 'md'}
                roundedBottom={index == offers.length - 1 ? '2xl' : 'md'}
              >
                <LoanItem
                  isOffer={true}
                  itemTitle={item.lenderName}
                  type="individual"
                  principal={item.principal}
                  interest={item.interest}
                  duration={{
                    min: item.minDuration,
                    max: item.maxDuration,
                  }}
                  limit={{
                    min: item.minLimit,
                    max: item.maxLimit,
                  }}
                  screen="applyLoan"
                  scrnParams={item}
                />
              </Box>
            )}
            keyExtractor={(item) => item.id}
            ListFooterComponent={<Box minHeight="100px"></Box>}
          />
        </Stack>
        <Spacer />
        <Stack position="absolute" bottom={12} alignItems="center" space={3} width="95%">
          <Button
            rounded="3xl"
            w="60%"
            _text={{ color: 'primary.100', fontWeight: 'semibold', mb: '0.5' }}
            onPress={() => {
              navigation.navigate('createOffer')
            }}
          >
            Create an Offer
          </Button>
        </Stack>
      </VStack>
    </Box>
  )
}
