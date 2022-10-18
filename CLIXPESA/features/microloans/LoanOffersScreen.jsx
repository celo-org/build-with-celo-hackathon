import { Box, FlatList } from 'native-base'
import { LoanItem } from 'clixpesa/components'

export default function LoanOffersScreen() {
  const offers = [
    {
      id: 0x01,
      lender: 'Akimbo Keya',
      lenderType: 'individual',
      principal: 300,
      interest: 5,
      duration: {
        min: 14,
        max: 21,
      },
      limit: {
        min: 50,
        max: 300,
      },
    },
    {
      id: 0x02,
      lender: 'Wrong Rende',
      lenderType: 'chamaa',
      principal: 1000,
      interest: 8,
      duration: {
        min: 14,
        max: 36,
      },
      limit: {
        min: 50,
        max: 250,
      },
    },
    {
      id: 0x03,
      lender: 'Wrong Rende',
      lenderType: 'chamaa',
      principal: 1000,
      interest: 8,
      duration: {
        min: 14,
        max: 36,
      },
      limit: {
        min: 50,
        max: 250,
      },
    },
  ]
  return (
    <Box flex={1} bg="#F5F5F5" alignItems="center">
      <FlatList
        width="95%"
        mt={2}
        data={offers}
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
              itemTitle={item.lender}
              type={item.lenderType}
              principal={item.principal}
              interest={item.interest}
              duration={item.duration}
              limit={item.limit}
            />
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  )
}
