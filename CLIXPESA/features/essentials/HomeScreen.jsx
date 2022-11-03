import {
  Box,
  Stack,
  Text,
  Heading,
  HStack,
  Button,
  Icon,
  Image,
  ScrollView,
  Spinner,
  Pressable,
  FlatList,
} from 'native-base'
import { Feather } from '@expo/vector-icons'
import RIcons from 'react-native-remix-icon'
import celoHelper from '../../blockchain/helpers/celoHelper'
import { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NativeTokensByAddress } from '../wallet/tokens'
import { fetchBalances } from '../wallet/walletSlice'
import { getWallets } from '../wallet/walletsManager'
import { shortenAddress, areAddressesEqual } from '../../blockchain/utils/addresses'
import { spacesIface } from '../../blockchain/contracts'
import { utils } from 'ethers'
import { useGetTokenTransfersQuery } from '../../app/services/blockscout'
import { SectionHeader, TransactionItem } from '../../components'
import { RefreshControl } from 'react-native'
import { nanoid } from 'nanoid'

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch()
  const tokenAddrs = Object.keys(NativeTokensByAddress)
  const { isSignerSet } = useSelector((s) => s.essential)
  const walletAddress = useSelector((s) => s.wallet.walletInfo.address)
  const balances = useSelector((s) => s.wallet.walletBalances.tokenAddrToValue)
  const [tempBal, setTempBal] = useState({ [tokenAddrs[1]]: 0.0 })
  const shortAddr = shortenAddress(walletAddress, true)
  const [transactions, setTransactions] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  useEffect(() => {
    if (!balances) {
      if (isSignerSet) {
        //handleGetBalances()
        dispatch(fetchBalances())
      }
    }
  }, [isSignerSet])

  const handleGetBalances = async () => {
    try {
      const result = await celoHelper.getBalances(walletAddress, NativeTokensByAddress)
      setTempBal(result)
    } catch (e) {
      console.log(e)
    }
  }
  //TODO! Get from previous stored block to current
  const { data, error, isLoading } = useGetTokenTransfersQuery(walletAddress)
  const handleGetTransactions = () => {
    const thisTxs = []
    const goodTxs = Array.prototype.filter.call(
      data.result,
      (txs) => txs.value.toString() * 1 >= utils.parseEther('0.0008').toString() * 1,
    )
    goodTxs.forEach((tx) => {
      const txDate = new Date(tx.timeStamp * 1000)
      const date = txDate.toDateString().split(' ')
      const txItem = {
        tx: tx.blockNumber,
        credited: areAddressesEqual(tx.to, walletAddress) ? true : false,
        title: areAddressesEqual(tx.to, walletAddress)
          ? shortenAddress(tx.from, true)
          : shortenAddress(tx.to, true),
        date: date[0] + ', ' + date[2] + ' ' + date[1] + ', ' + txDate.toTimeString().slice(0, 5),
        amount: utils.formatUnits(tx.value, 'ether'),
        token: 'cUSD',
      }
      thisTxs.push(txItem)
    })
    setTransactions(thisTxs)
  }

  useEffect(() => {
    if (data) handleGetTransactions()
  }, [data])

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    if (data) handleGetTransactions()
    wait(2000).then(() => setRefreshing(false))
  }, [])

  return (
    //<ScrollView showsVerticalScrollIndicator={false}>
    <Box flex={1} bg="muted.50" alignItems="center">
      <Box mt="2" bg="#fff" width="95%" rounded="2xl" shadow="none">
        <HStack justifyContent="space-between">
          <Stack mx="4" my="3">
            <Text _light={{ color: 'muted.700' }}>Actual Balance (cUSD)</Text>
            <Heading size="xl" letterSpacing="0.5" _light={{ color: 'muted.800' }}>
              {balances ? (balances[tokenAddrs[1]] * 1.0).toFixed(2) : tempBal[tokenAddrs[1]] * 1.0}
            </Heading>
            <Text _light={{ color: 'muted.700' }} lineHeight="sm">
              ≈{' '}
              {balances
                ? (balances[tokenAddrs[1]] * 120.75).toFixed(2)
                : tempBal[tokenAddrs[1]] * 120.75}{' '}
              KES
            </Text>
          </Stack>
          <Pressable
            width="20%"
            m={4}
            onPress={() => navigation.navigate('AllTokens', { tempBal: tempBal })}
          >
            <Box bg="muted.50" borderRadius="full" p={2} width="2/3" ml="1/3" alignItems="center">
              <RIcons size={32} name="qr-code-line" color="#737373" />
            </Box>
          </Pressable>
        </HStack>
        {balances ? null : <Spinner right="1/2" top={10} position="absolute" size="lg" />}
        <HStack mx="4" mb="2.5" space="2">
          <Button
            leftIcon={<Icon as={Feather} name="plus" size="md" color="primary.600" mr="1" />}
            variant="subtle"
            rounded="3xl"
            pr="4"
            _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
            onPress={() => console.log('deposit')}
          >
            Deposit
          </Button>
          <Button
            leftIcon={<Icon as={Feather} name="arrow-right" size="md" color="primary.600" mr="1" />}
            variant="subtle"
            rounded="3xl"
            pr="4"
            _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
            onPress={() => console.log('transfer')}
          >
            Transfer
          </Button>
          <Button
            //leftIcon={<Icon as={Feather} name="more-horizontal" size="lg" color="primary.600" />}
            variant="outline"
            rounded="3xl"
            px="4"
            _text={{ color: 'primary.500', fontWeight: 'semibold', mb: '0.5' }}
            onPress={() => navigation.navigate('AllTokens', { tempBal: tempBal })}
          >
            {shortAddr}
          </Button>
        </HStack>
      </Box>

      {/*Dummy shadow effect */}
      <Box bg="#fff" height={10} rounded="2xl" width="94.5%" shadow={1} mt="-10" zIndex={-1}>
        <Text color="#fff">Find a better way</Text>
      </Box>
      {/*news update*/}
      <Box bg="#fcfcfc" width="95%" rounded="md" mt="-5" zIndex="-2">
        <HStack space="3" m="3" mt="8">
          <Image
            source={{
              uri: 'https://wallpaperaccess.com/full/317501.jpg',
            }}
            alt="Alternate Text"
            rounded="md"
            width="52"
          />
          <Text maxW="70%">Get 5 cUSD with ClixCard and stand a chance to win 1 BTC</Text>
          <Icon as={Feather} name="list" size="lg" position="absolute" ml="92%" />
        </HStack>
      </Box>

      {/* Transactions */}
      <SectionHeader title="Transactions" />
      <FlatList
        data={transactions}
        refreshControl={
          <RefreshControl refreshing={refreshing || isLoading} onRefresh={onRefresh} />
        }
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
                (item.credited ? '+' : '-') + (item.amount * 1).toFixed(2) + ' ' + item.token
              }
              eqAmount={(item.amount * 120.75).toFixed(2) + ' KES'}
              screen="DummyModal"
            />
          </Box>
        )}
        keyExtractor={(item) => item.tx}
      />
      {/* Nuggets */}
      {/* Saving Spaces/Vault/Earnings */}
      {/* Rewards and Offers */}
    </Box>
    //</ScrollView>
  )
}
