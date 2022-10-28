import { Box, Text, Icon, VStack, HStack, Spacer, Progress, FlatList, Alert } from 'native-base'
import { FeatureHomeCard } from 'clixpesa/components'
import { Feather } from '@expo/vector-icons'
import { SectionHeader, TransactionItem } from 'clixpesa/components'
import { getDaysBetween } from 'clixpesa/utils/time'
import { HeaderBackButton } from '@react-navigation/elements'
import { useLayoutEffect, useState } from 'react'

export default function LoanInfoScreen({ navigation, route }) {
  const routes = navigation.getState().routes
  const prevRoute = routes[routes.length - 2].name
  const [loan, setLoan] = useState({})
  const transactions = [
    {
      credited: true,
      title: 'Loan credited to Account',
      date: 'Mon, 26 Jul, 11:26',
      amount: '500',
      token: 'cUSD',
    },
    {
      credited: false,
      title: 'Bought BTC with cKES',
      date: 'Mon, 26 Jul, 11:26',
      amount: '500',
      token: 'cUSD',
    },
    {
      credited: false,
      title: 'Bought BTC with cKES',
      date: 'Mon, 26 Jul, 11:26',
      amount: '500',
      token: 'cUSD',
    },
  ]
  useLayoutEffect(() => {
    if (prevRoute === 'Main') {
      const thisLoan = { ...route.params, name: 'Loan Ingine' }
      setLoan(thisLoan)
    } else {
      const thisLoan = route.params
      setLoan(thisLoan)
    }
    if (prevRoute === 'applyLoan') {
      navigation.setOptions({
        headerLeft: (props) => {
          return (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigation.navigate('YourLoans')
              }}
            />
          )
        },
      })
    }
  }, [navigation])
  const prog = (loan.paid / loan.balance) * 100
  const daysTo = getDaysBetween(Date.now(), Date.parse(loan.dueDate))

  return (
    <Box flex={1} bg="muted.100" alignItems="center">
      <FeatureHomeCard
        balance={(loan.balance * 1).toFixed(4).toString()}
        apprxBalance={(loan.balance * 120.75).toFixed(2).toString()}
        expScreen="DummyModal"
        btn1={{
          icon: <Icon as={Feather} name="arrow-up-right" size="md" color="primary.600" mr="1" />,
          name: 'Repay',
          screen: 'fromOffers',
        }}
        btn2={{
          icon: <Icon as={Feather} name="list" size="md" color="primary.600" mr="1" />,
          name: 'Details',
          screen: 'LoanDetails',
        }}
      />
      <Box bg="white" roundedTop="md" roundedBottom="2xl" width="95%" mt={1}>
        <VStack space={2} my={3}>
          <HStack mx="5">
            <Text fontWeight="semibold" fontSize="md">
              Payed: {prog.toFixed(1)}%
            </Text>
            <Spacer />
            <Text _light={{ color: 'muted.500' }} fontWeight="medium" pt={1}>
              {loan.paid} / {loan.balance}
            </Text>
          </HStack>
          <Progress colorScheme="primary" value={prog} mx="4" bg="primary.100" />
          <HStack mx="5">
            <Text fontWeight="medium" color="muted.500">
              Due: {loan.dueDate}
            </Text>
            <Spacer />
            <Text _light={{ color: 'muted.500' }} fontWeight="medium">
              {daysTo} days to go
            </Text>
          </HStack>
        </VStack>
      </Box>
      <Box mt={2} width="95%">
        {loan.pending ? (
          <Box bg="primary.100" opacity={85} rounded="2xl" mt={1} py={3} px={6}>
            <HStack>
              <Icon as={Feather} name="alert-circle" size="md" color="black" />
              <Text mx={2} fontWeight="medium">
                Waiting for loan to be credited...
              </Text>
            </HStack>
            <Text color="primary.800">
              Keep calm. Loan will be credited once your lender releases the funds!
            </Text>
          </Box>
        ) : (
          <>
            <SectionHeader title="Transactions" />
            <FlatList
              data={transactions}
              renderItem={({ item, index }) => (
                <Box
                  bg="white"
                  opacity={85}
                  roundedTop={index == 0 ? '2xl' : 'md'}
                  roundedBottom={index == transactions.length - 1 ? '2xl' : 'md'}
                  mt={1}
                >
                  <TransactionItem
                    credited={item.credited}
                    trTitle={item.title}
                    trDate={item.date}
                    spAmount={
                      (item.credited ? '-' : '+') + (item.amount * 1).toFixed(2) + ' ' + item.token
                    }
                    eqAmount={(item.amount * 120.75).toFixed(2) + ' KES'}
                    screen="DummyModal"
                  />
                </Box>
              )}
              keyExtractor={(item) => item.addr}
            />
          </>
        )}
      </Box>
    </Box>
  )
}
