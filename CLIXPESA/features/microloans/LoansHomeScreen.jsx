import { Box, Text, HStack, Icon, FlatList, Pressable, Button } from 'native-base'
import { RefreshControl } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { FeatureHomeCard, FeatureItem } from 'clixpesa/components'
import { utils } from 'ethers'
import { useGetUserLoansQuery } from '../../app/services/subgraphs'

export default function LoansHomeScreen({ navigation }) {
  const [loans, setLoans] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const walletAddress = useSelector((s) => s.wallet.walletInfo.address)
  const { data, error, isLoading, refetch } = useGetUserLoansQuery(walletAddress)

  let totalBalance = 0.0

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    refetch()
    wait(2000).then(async () => {
      if (data && !isLoading) handleLoans()
      setRefreshing(false)
    })
  }, [data])

  if (loans.length > 0) {
    loans.forEach((loan) => {
      if (!loan.pending) {
        totalBalance += loan.balance * 1
      }
    })
  }

  const handleLoans = () => {
    if (typeof data.user === 'object' && data.user !== null) {
      const thisloans = []
      const thisResp = data.user.loans
      thisResp.forEach((resp) => {
        const dueDate = new Date(resp.loan.dueDate * 1)
        const balance = utils.formatUnits(resp.loan.balance, 'ether')
        const paid = utils.formatUnits(resp.loan.paid, 'ether')
        const loan = {
          name: resp.name,
          address: resp.loan.id,
          pending: balance == 0.0 && paid == 0.0 ? true : false,
          principal: utils.formatUnits(resp.loan.principal, 'ether'),
          balance:
            balance == 0.0 && paid == 0.0
              ? utils.formatUnits(resp.loan.principal, 'ether')
              : balance,
          paid,
          dueDate: dueDate.toDateString(),
          lender: resp.lender,
        }
        thisloans.push(loan)
      })
      setLoans(thisloans)
    }
  }

  useEffect(() => {
    if (data && !isLoading) handleLoans()
  }, [data, isLoading])

  return (
    <Box flex={1} bg="muted.100" alignItems="center">
      <FlatList
        width="95%"
        data={loans}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing || isLoading} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <>
            <FeatureHomeCard
              balance={totalBalance.toFixed(4).toString()}
              apprxBalance={(totalBalance * 120.75).toFixed(2).toString()}
              expScreen="DummyModal"
              btn1={{
                icon: (
                  <Icon as={Feather} name="arrow-down-left" size="md" color="primary.600" mr="1" />
                ),
                name: 'Borrow',
                screen: 'fromOffers',
              }}
              btn2={{
                icon: (
                  <Icon as={Feather} name="arrow-up-right" size="md" color="primary.600" mr="1" />
                ),
                name: 'Repay',
                screen: 'AllLoans',
              }}
              itemBottom={false}
            />
            {loans.length > 0 ? (
              <HStack justifyContent="space-between" mx={4} mt={3} mb={1}>
                <Text fontWeight="medium" color="blueGray.600">
                  Loans
                </Text>
                <Pressable onPress={() => navigation.navigate('AllLoans')}>
                  <Text color="primary.600">See all</Text>
                </Pressable>
              </HStack>
            ) : null}
          </>
        }
        renderItem={({ item, index }) => (
          <Box
            bg="white"
            opacity={85}
            roundedTop={index == 0 ? '2xl' : 'md'}
            roundedBottom={index == loans.length - 1 ? '2xl' : 'md'}
            mt={1}
          >
            <FeatureItem
              initiated={item.lender}
              itemTitle={item.name}
              payProgress={
                item.pending
                  ? item.lender
                    ? 'Please fund loan'
                    : 'Waiting for funds'
                  : (item.paid * 1).toFixed(2).toString() +
                    '/' +
                    (item.principal * 1).toFixed(2).toString() +
                    ' Paid'
              }
              value={(item.balance * 1).toFixed(2).toString() + ' cUSD'}
              dueDate={
                'Due: ' +
                item.dueDate.split(' ')[2] +
                ' ' +
                item.dueDate.split(' ')[1] +
                ' ' +
                item.dueDate.split(' ')[3]
              }
              screen="LoanHome"
              itemParams={item}
            />
          </Box>
        )}
        keyExtractor={(item) => item.address}
        ListFooterComponent={<Box bg="muted.100" h={20}></Box>}
      />

      {/*<Text>{loanONRsAddr}</Text>*/}
    </Box>
  )
}
