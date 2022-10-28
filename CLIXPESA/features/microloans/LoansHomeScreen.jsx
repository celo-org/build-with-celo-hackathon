import { Box, Text, HStack, Icon, FlatList, Pressable } from 'native-base'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getLoans } from './loansManager'
import { fetchLoans } from './loansSlice'
import { FeatureHomeCard, FeatureItem } from 'clixpesa/components'

export default function LoansHomeScreen({ navigation }) {
  const dispatch = useDispatch()
  const loanONRsAddr = useSelector((s) => s.loans.ONRsAddr)
  const [loans, setLoans] = useState([])
  const [tempBal, setTempBal] = useState(0.0)
  let totalBalance = 0.0

  useEffect(() => {
    const fetchMyLoans = async () => {
      const results = await getLoans()
      if (!results) {
        dispatch(fetchLoans())
      }
      setLoans(results)
    }
    fetchMyLoans()
  }, [])

  if (loans.length > 0) {
    loans.forEach((loan) => {
      if (!loan.pending) {
        totalBalance += loan.balance * 1
      }
    })
  }

  return (
    <Box flex={1} bg="muted.100" alignItems="center">
      <FeatureHomeCard
        balance={totalBalance.toFixed(4).toString()}
        apprxBalance={(totalBalance * 120.75).toFixed(2).toString()}
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
              initiated={false}
              itemTitle={item.name}
              payProgress={
                item.pending
                  ? 'Waiting for funds'
                  : (item.paid * 1).toFixed(2).toString() +
                    '/' +
                    (item.balance * 1).toFixed(2).toString() +
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
      <Text>{loanONRsAddr}</Text>
    </Box>
  )
}
