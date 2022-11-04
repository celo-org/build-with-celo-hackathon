import { Box, Text, HStack, Icon, FlatList, Pressable, Button } from 'native-base'
import { RefreshControl } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState, useCallback } from 'react'
import { getLoans, getDefaultNewLoanName } from './loansManager'
import { fetchLoans, updateLoans } from './loansSlice'
import { FeatureHomeCard, FeatureItem } from 'clixpesa/components'
import celoHelper from '../../blockchain/helpers/celoHelper'
import { utils } from 'ethers'

export default function LoansHomeScreen({ navigation }) {
  const dispatch = useDispatch()
  const loanONRsAddr = useSelector((s) => s.loans.ONRsAddr)
  const [refreshing, setRefreshing] = useState(false)
  const [loans, setLoans] = useState([])

  const [tempBal, setTempBal] = useState(0.0)
  let totalBalance = 0.0
  useEffect(() => {
    const fetchMyLoans = async () => {
      const myLoans = await celoHelper.smartContractCall('Loans', {
        method: 'getMyLoans',
        methodType: 'read',
      })
      const results = await getLoans()
      setLoans(results)
      for (const idx in myLoans) {
        if (!results.find((ln) => ln.address === myLoans[idx][0])) {
          dispatch(fetchLoans())
          return
        }
      }
    }

    const unsubscribe = navigation.addListener('focus', () => {
      fetchMyLoans()
    })

    return unsubscribe
  }, [navigation])

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    dispatch(updateLoans())
    wait(2000).then(async () => {
      const results = await getLoans()
      setLoans(results)
      setRefreshing(false)
    })
  }, [])

  if (loans.length > 0) {
    loans.forEach((loan) => {
      if (!loan.pending) {
        totalBalance += loan.balance * 1
      }
    })
    wait(1000).then(() => dispatch(updateLoans()))
  }

  return (
    <Box flex={1} bg="muted.100" alignItems="center">
      <FlatList
        width="95%"
        data={loans}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
              initiated={item.initiated}
              itemTitle={item.name}
              payProgress={
                item.pending
                  ? item.initiated
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
      />

      {/*<Text>{loanONRsAddr}</Text>*/}
    </Box>
  )
}
