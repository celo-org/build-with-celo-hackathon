import { Box, Text, HStack, Icon, FlatList, Pressable } from 'native-base'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { useState } from 'react'

import { FeatureHomeCard, FeatureItem } from 'clixpesa/components'

export default function LoansHomeScreen({ navigation }) {
  const loanAddrs = useSelector((s) => s.wallet.walletBalances.tokenAddrToValue)
  const balances = useSelector((s) => s.wallet.walletBalances.tokenAddrToValue)
  const [tempBal, setTempBal] = useState(0.0)

  const loans = [
    {
      addr: '0x001',
      loanName: 'Majengo Nyumbani',
      party: 'Akimbo Kenya',
      initiated: false,
      value: 300,
      repaid: 10,
      dueDate: '14 Sep 2022',
    },
    {
      addr: '0x002',
      loanName: 'Mboga Stock',
      party: 'Dekan Kachi',
      initiated: true,
      value: 500,
      repaid: 200,
      dueDate: '24 Oct 2022',
    },
  ]
  return (
    <Box flex={1} bg="muted.100" alignItems="center">
      <FeatureHomeCard
        balance="30.3780"
        apprxBalance="3,037.80"
        expScreen="DummyModal"
        btn1={{
          icon: <Icon as={Feather} name="arrow-down-left" size="md" color="primary.600" mr="1" />,
          name: 'Borrow',
          screen: 'fromOffers',
        }}
        btn2={{
          icon: <Icon as={Feather} name="arrow-up-right" size="md" color="primary.600" mr="1" />,
          name: 'Repay',
          screen: 'AllLoans',
        }}
      />
      <FlatList
        width="95%"
        data={loans}
        renderItem={({ item, index }) => (
          <Box
            bg="white"
            opacity={85}
            roundedTop="md"
            roundedBottom={index == loans.length - 1 ? '2xl' : 'md'}
            mt={1}
          >
            {index == 0 ? (
              <HStack justifyContent="space-between" mx={4} mt={2} mb={1}>
                <Text fontWeight="medium" color="blueGray.600">
                  Loans
                </Text>
                <Pressable onPress={() => navigation.navigate('AllLoans')}>
                  <Text color="primary.600">See all</Text>
                </Pressable>
              </HStack>
            ) : null}
            <FeatureItem
              initiated={item.initiated}
              itemTitle={item.party}
              payProgress={
                item.repaid.toFixed(2).toString() + '/' + item.value.toFixed(2).toString() + ' Paid'
              }
              value={item.value.toFixed(2).toString() + ' cUSD'}
              dueDate={'Due: ' + item.dueDate}
              screen="LoanHome"
            />
          </Box>
        )}
        keyExtractor={(item) => item.addr}
      />
    </Box>
  )
}
