import { Box, FlatList } from 'native-base'
import { LoanItem } from 'clixpesa/components'

export default function LoanRequestsScreen() {
  const requests = [
    {
      id: 0x01,
      loanee: 'Akimbo Keya',
      loaneeType: 'individual',
      principal: 300,
      interest: 5,
      duration: {
        min: 14,
        max: 21,
      },
      creditScore: {
        value: 4.5,
        status: 'Good',
      },
    },
    {
      id: 0x02,
      loanee: 'Wrong Rende',
      loaneeType: 'chamaa',
      principal: 1000,
      interest: 8,
      duration: {
        min: 14,
        max: 36,
      },
      creditScore: {
        value: 3.5,
        status: 'Fair',
      },
    },
    {
      id: 0x03,
      loanee: 'Wrong Rende',
      loaneeType: 'chamaa',
      principal: 1000,
      interest: 8,
      duration: {
        min: 14,
        max: 36,
      },
      creditScore: {
        value: 2.0,
        status: 'Risky',
      },
    },
  ]
  return (
    <Box flex={1} bg="#F5F5F5" alignItems="center">
      <FlatList
        width="95%"
        mt={2}
        data={requests}
        renderItem={({ item, index }) => (
          <Box
            bg="white"
            opacity={85}
            mt={1}
            roundedTop={index == 0 ? '2xl' : 'md'}
            roundedBottom={index == requests.length - 1 ? '2xl' : 'md'}
          >
            <LoanItem
              isOffer={false}
              itemTitle={item.loanee}
              type={item.loaneeType}
              principal={item.principal}
              interest={item.interest}
              duration={item.duration}
              creditScore={item.creditScore}
            />
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  )
}
