import { Feather } from '@expo/vector-icons'
import { Box, Text, Pressable, Icon, Center, Spacer, FlatList } from 'native-base'

import { LoanCard } from 'clixpesa/components'

export default function AllLoansScreen({ navigation, route }) {
  const loans = [
    {
      addr: '0x001',
      loanName: 'Majengo Nyumbani',
      party: 'Akimbo Kenya',
      lenderType: 'individual',
      initiated: false,
      value: 300,
      balance: 290,
      repaid: 10,
      dueDate: '14 Sep 2022',
    },
    {
      addr: '0x002',
      loanName: 'Mboga Stock',
      party: 'Dekan Kachi',
      lenderType: 'individual',
      initiated: true,
      value: 500,
      balance: 300,
      repaid: 200,
      dueDate: '24 Oct 2022',
    },
  ]
  return (
    <Box flex={1} bg="muted.100" alignItems="center">
      <Spacer maxHeight={8} />
      <Box flexDirection="row" flexWrap="wrap" ml="2%">
        {loans.map((loan, index) => {
          return (
            <LoanCard
              loanTitle={loan.party}
              type={loan.lenderType}
              principal={loan.value}
              repaid={loan.repaid}
              dueDate={loan.dueDate}
              screenOptions={{
                screen: 'fundLoan',
                params: {
                  address: loan.addr,
                  balance: loan.balance,
                  initiated: loan.initiated,
                },
              }}
            />
          )
        })}

        <Pressable
          width="46%"
          borderRadius="2xl"
          maxHeight="90%"
          m={1}
          pt={2}
          onPress={() => navigation.navigate('fromOffers')}
        >
          <Center>
            <Box
              bg="primary.600"
              height="48%"
              rounded="full"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={Feather} name="plus" size="2xl" color="primary.100" mx={3} />
            </Box>
            <Text mt={3}>Get New Loan</Text>
          </Center>
        </Pressable>
      </Box>
    </Box>
  )
}
